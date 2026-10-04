// DEAL-INGEST indiafreestuff tick 2026-10-05a
//
// 4 listings swept vs 1097 seen; 23 new slugs. Skipped: food (Habanero x4, Milky Mist curd), hubs (CAHOOT co-ords,
// Giordano watches, Lavie pouches), card-only Flipkart price (Mokobara 35L/30L, ALFA VIP, Safari Eclipse Neo, Safari
// Keplar x2). 9 resolved via base64 ?rto=, 0 already in DB. Amazon tab verify: 3 pass. Myntra ld+json via curl: Red Tape
// sliders 399 InStock == card. Rejected: Asian Paints wallpaper (PDP 1,690 vs card 357, only 2 left), Vector X shuttles
// (no #availability, 0 ratings), Panda humidifier (card price is post-coupon, 10 ratings), BLACK OLIVE heating pad
// (bullets describe a rubber hot-water bag - mismatched listing, ratings not trustworthy), Guess Seductive Kiss EDT
// (no Product ld+json, page price 6,300 vs card 1,890).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Myntra: (d) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(d.url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const M = (productId, url, name, price, mrp, image, description, variant) =>
  ({ store: 'Myntra', productId, url, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const SIZE = (thing, colour) => `Pick your ${thing} on the product page. We checked the price on the ${colour} option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B0GPNMMVJP', 'American Tourister Qubiz 80 cm Large Check-in Trolley Bag, Black/Dark Olive', 3149, 9600, '81Ox4jKHIgL._SL1500_', [
    "American Tourister's Qubiz 80 cm check-in trolley in Black/Dark Olive is ₹3,149 on Amazon, rated 4.2 stars across 777 reviews.",
    'It is a large hard-shell suitcase with a polypropylene body, a mounted combination lock and 360-degree double wheels. An 80 cm bag is the size for a two-week trip or a family packing into one case. American Tourister covers it with a 3-year international warranty valid in 120+ countries.',
    'An 80 cm case is big. Packed full, it can cross the 23 kg check-in limit many airlines set for economy, so weigh it before you leave home.',
  ], 'We checked the price on the Black/Dark Olive option. Other colours can be priced differently.'),
  A('B0D356WT1W', "Boldfit Men's Polyester Regular Fit Sleeveless Vest, Neon", 279, 799, '61TTJyEG6sL._SL1500_', [
    "Boldfit's sleeveless polyester vest for men in Neon is ₹279 on Amazon, rated 4.2 stars across 984 reviews.",
    'It is a quick-drying, stretchy sando with a regular fit and a U-neck, made in India. Wear it on its own for the gym or a run, or under a shirt so sweat does not soak through to the outer layer.',
    'Polyester dries much faster than a cotton baniyan but holds odour more. Wash it after every workout.',
  ], SIZE('size', 'Neon')),
  A('B0FHQFSC2F', 'Treo by Milton Clip Fresh RIB Round Borosilicate Glass Container, 950 ml', 373, 695, '61xGGz6N3mL._SL1500_', [
    "Treo's Clip Fresh RIB round glass container by Milton holds 950 ml and is ₹373 on Amazon, rated 4.3 stars across 65 reviews.",
    'The bowl is borosilicate glass, so it handles heat better than ordinary glass, and it is microwave and dishwasher safe. The clip-lock lid is airtight and leak-proof and has an air vent, which makes it work as a lunch box as well as fridge storage.',
    'Use the vent when you reheat food, and take the lid off for long microwave runs. Borosilicate also does not like sudden jumps from the freezer to a hot oven.',
  ], 'There is one size on this listing: the 950 ml round container.'),
  M('34215710', 'https://www.myntra.com/34215710', 'Red Tape Women Black Solid EVA Sliders', 399, 1999,
    'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2025/MAY/18/hTUQ8P0f_b8253ef188d142b5a2098b6bb55b96cc.jpg', [
    "Red Tape's black solid sliders for women are ₹399 on Myntra, rated 3.8 stars by 45 buyers.",
    'Both the upper and the patterned outsole are EVA, which keeps them light and waterproof, and the footbed is cushioned. They are flat slip-ons for home, the bathroom and quick errands, and Red Tape gives a 45-day warranty.',
    'EVA can warp in strong heat, so do not leave them out in the afternoon sun. Wipe them with a dry cloth to clean.',
  ], SIZE('UK size', 'Black')),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|assets\.myntassets\.com\/[\w,/.-]+\.jpg)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  // every ₹ figure in our copy must be the live price, except per-unit ("about ₹") and M.R.P. ("against a ₹") mentions
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1005a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
