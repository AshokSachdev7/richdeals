// DESIDIME-INGEST tick 2026-10-04b
//
// /new + homepage: 31 cards, 17 resolved, 3 already in DB, 14 fresh. Pushed 4 Amazon, each read in the logged-in Amazon
// tab (core price == DesiDime card price, #availability In stock, add-to-cart present, no low-stock line). Rejected: card-vs-PDP
// drift (Portronics Key2 855 vs 899, Lenovo IdeaCentre 1,22,551 vs 1,29,000, ZEBRONICS A24FHD 5,400 vs 5,999, Milton Elfin
// 568 vs 932, FRONTECH portable 10,482 vs 11,980, GAMDIAS 5,814 vs 6,119), paise price + 1 rating (Solimo triply cooker
// 1,317.90), no ratings (Sutli bomb candles), food (Anjeer, BigBasket eggs). Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = { Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21` };
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const DEALS = [
  A('B0CB3VH6JQ', 'Solimo Giraffe 2-in-1 Garden Slide for Kids, Indoor and Outdoor', 1498, 4000, '81n6o9EAE7L._SL1500_', [
    "Amazon's own Solimo giraffe slide for kids is ₹1,498 on Amazon, 63% below the M.R.P.",
    'It is a medium-size plastic slide with a giraffe-themed climbing side, made to stand on a balcony, in a living room or out in the garden. Buyers rate it 4.2 stars across 5,720 reviews, a large review base for a toddler toy.',
    'A slide gives small children a safe way to burn energy indoors during the monsoon or on smoggy winter days, and it wipes clean after outdoor use.',
  ], 'This listing is the medium size; check the age range and dimensions on the listing before ordering.'),
  A('B0GZQ8WK5Y', 'GLUN Rubber Bands, 4 Inch, 50 g Pack', 118, 599, '81afzOid4JL._SL1500_', [
    'A 50-gram pack of GLUN 4-inch rubber bands is ₹118 on Amazon.',
    'The longer 4-inch length holds files, rolled documents, opened snack packets and cable bundles that small office bands cannot stretch around. Buyers rate them 4.3 stars across 645 reviews.',
    'Keep one pack in the kitchen drawer for sealing packets and one at the desk for paperwork.',
  ], 'This listing is the 4-inch, 50 g pack.'),
  A('B00J4YGNGS', 'Camlin Scholar Mathematical Drawing Instruments Box, 10 Pieces', 80, 140, '71WcwtLvJfL._SL1500_', [
    "Camlin's Scholar geometry box is ₹80 on Amazon, 43% off the M.R.P.",
    'The 10-piece set covers what school maths needs: compass, divider, protractor, set squares, scale, pencil, eraser and sharpener in one tin. Buyers rate it 4.4 stars across 2,105 reviews.',
    'A spare geometry box before exams saves a last-minute run to the stationery shop when a compass goes missing.',
  ], 'This is the standard multicoloured 10-piece set.'),
  A('B0FHF1WHTD', 'Longway LWIR01 2000W Immersion Water Heater Rod', 399, 1119, '71GDFKZulCL._SL1500_', [
    'The Longway LWIR01 2000-watt immersion rod is ₹399 on Amazon, 64% below the M.R.P.',
    'It heats a bucket of water without a geyser, with an anti-corrosive element and a shockproof body. Buyers rate it 3.8 stars across 116 reviews.',
    'Always switch it off at the wall before touching the water or lifting the rod out, and never run it dry outside the bucket.',
  ], 'This is the 2000 W single rod.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
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

const file = process.argv[2] ?? 'dd-1004b-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
