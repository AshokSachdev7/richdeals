// DESIDIME-INGEST tick 2026-10-06g
//
// Stage 1: 10 candidates after junk/grocery filter + DB dedup -> 2 pushed (Amazon, Myntra).
// Dropped:
//   - French Connection men's watch B0FHWS3JTJ: no buy box.
//   - FC women's watch B09M6CQWV4: rating 3.4, only 3 left.
//   - BISSELL B0DHS41MPF: ₹8,810 on PDP vs ₹7,692 card.
//   - Flipkart DJ light mixer SNMHGBEWT9EVHA5R: out of stock.
//   - Flipkart Whirlpool fridge: price drift.
//   - Philips TAT1179 (Flipkart): rating 3.3.
//   - JioMart Globus face wash, Instamart saucepan: no ld+json (unverifiable), cosmetics.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Myntra: (d) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(d.url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0FPCZZWHT', name: 'Nippon Paint n-Shield Wax-n-Shine Car Wash Shampoo 250 ml', price: 155, mrp: 525,
    image: 'https://m.media-amazon.com/images/I/51oXQuPjOYL._SL1500_.jpg',
    variant: 'The link opens the 250 ml single pack we checked; multi-packs are priced differently, so check the selected size before paying.',
    description: [
      "Nippon Paint's n-Shield Wax-n-Shine car wash shampoo (250 ml) is ₹155 on Amazon, 70% below M.R.P., rated 3.8 stars across 156 reviews.",
      'It is a wash-and-wax formula that leaves a gloss from the first wash without a separate waxing step. It is phosphate-free and biodegradable, and safe on clear coats and ceramic coatings.',
      'It is concentrated: 25 ml goes into 2.5 litres of water, so one bottle covers several washes.',
    ],
  },
  {
    store: 'Myntra', productId: 'd5fc670dfbc7', name: 'Daniel Klein Men Brass Dial Leather Strap Analogue Watch DK.1.14291-1', price: 2310, mrp: 3255,
    url: 'https://www.myntra.com/watches/danielklein/daniel-klein-men-brass-dial--leather-straps-analogue-watch-dk114291-1/33700365/buy',
    image: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2025/OCTOBER/14/DReeFVnQ_21e54c9cc9cb4a5bb648de77f796110f.jpg',
    variant: 'The link opens the exact model we checked (DK.1.14291-1); other Daniel Klein dials are priced differently.',
    description: [
      "Daniel Klein's DK.1.14291-1 analogue watch for men is ₹2,310 on Myntra, 29% below M.R.P., rated 4.1 stars by 176 buyers.",
      'It pairs a brass-toned dial with a leather strap, a classic dress-watch look for office and formal wear.',
      'Myntra lists the price directly on the product page, so no bank offer is needed to get it.',
    ],
  },
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini\w*\d\.flixcart\.com\/image\/[\w/.-]+\.jpe?g|assets\.myntassets\.com\/[\w/,.-]+\.jpe?g)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
    if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price} ${d.productId}`);
  }
  if (!d.description[0].includes(`${discountPct}% below`)) throw new Error(`copy pct ${d.productId}`);
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description: [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n'),
    howTo: [
      `Tap Grab Deal to open the ${d.name} on ${d.store} at the live price.`,
      d.variant,
      `Add to cart and check out. ${d.store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
      NO_COUPON,
    ],
    image: d.image, price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  if (Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, '')) !== row.price) throw new Error(`title/price ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'dd-1006g-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
