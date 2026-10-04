// DESIDIME-INGEST tick 2026-10-04m
//
// /new + homepage: 32 cards, 13 resolved, 1 already in DB, 12 fresh; script skipped DANIEL KLEIN watch (price drift) +
// Glucoplus (no ld+json). Rejected: Instamart oats (food), Lakme serum (skincare FMCG), VIVO Big Billion Days (category
// hub), Stysol scrubber set + Foxin DDR5 RAM (0 ratings), Spyder Craft table (drift: PDP 1,709 vs card 1,439), HP
// Deskjet 2931 (no add-to-cart, 2.6 stars). Amazon tab verify: Acer DreamWave 998 == card; kids bike belt PDP 549 (the
// card's 54 was the -54% badge mis-read as a price; MRP 1,199, 4.1 stars from 29). Myntra perfume: productLd 220
// InStock, page JSON 4.4 stars from 22,832 ratings; InRDeals link (Cuelinks is deactivated for Myntra).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Myntra: (d) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(d.page)}`,
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
const SIZE = (thing, colour) => `Pick your ${thing} on the product page. We checked the price on the ${colour} option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B0GKHYTGB3', 'Acer DreamWave Bluetooth 5W Speaker with Night Light and White Noise, 1500mAh', 998, 4000, '714pN+PB1jL._SL1500_', [
    "Acer's DreamWave 5-watt Bluetooth speaker is ₹998 on Amazon, rated 3.9 stars across 23 reviews.",
    'It is a bedside speaker more than a party speaker. It plays over Bluetooth 5.0, from a microSD (TF) card or through an AUX cable, and it projects a water-ripple RGB light on the wall. A built-in white-noise mode and a sleep-to-music mode make it a small sleep aid as well.',
    'The 1500mAh battery is rated for about 4-6 hours of Bluetooth playback and 6-8 hours of white noise. At 5 W, it fills a bedroom, not a hall.',
  ], 'We checked the price on the listing as shown; there are no colour options.'),
  A('B0HGMY6YVM', 'Kids Safety Belt for Two Wheeler, Bike and Scooty, Adjustable Child Harness, 2-12 Years, Spider Blue', 549, 1199, '61YkBh+f3OL._SL1254_', [
    'This child safety belt for bikes and scooters in Spider Blue is ₹549 on Amazon, rated 4.1 stars across 29 reviews.',
    'It straps your child to you as the rider, so a sleepy child on the school run does not slump sideways. The straps are adjustable from about 2 to 12 years, the buckle is a heavy-duty quick-release type, and reflective strips make the pair more visible on night rides.',
    'A harness is not a replacement for a helmet. Children riding pillion still need one that fits.',
  ], SIZE('print', 'Spider Blue')),
  { store: 'Myntra', productId: 'b8c6e60582de', page: 'https://www.myntra.com/38312140', name: 'BLA BLI BLU Men Hustler Long Lasting Perfume, 90ml', price: 220, mrp: 1299, exp: 220, av: 'InStock',
    image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/MARCH/20/FmFDeQxo_73e6577d256d4d62922ba181a9288017.jpg', description: [
    "BLA BLI BLU's Hustler long-lasting perfume for men, in a 90 ml bottle, is ₹220 on Myntra. It is rated 4.4 stars from 22,832 ratings, which is a large base for a budget fragrance.",
    'At 90 ml it is a full-size bottle, not a travel vial, so it lasts a few months of daily use. A budget perfume like this suits office and college wear, and makes an easy gift.',
    'Scent is personal. If you have never tried this brand, read a few recent reviews for how long it lasts on skin before you order.',
  ], variant: 'The 90 ml bottle is the size we checked; other sizes are priced separately.' },
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

const file = process.argv[2] ?? 'dd-1004m-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
