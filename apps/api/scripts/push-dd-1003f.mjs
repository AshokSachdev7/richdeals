// DESIDIME-INGEST tick 2026-10-03f
//
// Stage 1: 33 cards, 13 resolved, 3 in DB, 10 fresh. Pushed 2, both read in the logged-in Amazon tab: XTRIM wrist support
// B0CMCSQNTD (priceToPay ₹98, M.R.P. ₹699, In stock, add-to-cart, 4.2 from 2,130) and TECHNOVIBES study table B0GP83XVS5
// (₹948, M.R.P. ₹1,499, In stock, add-to-cart, 3.7 from 5,688). Rejected: BATCHONE case (₹109 vs ₹100), Home Centre shelf
// (₹5,999 vs ₹3,712), Max joggers (2 left), HRX luggage (₹3,599 vs ₹3,140, 2 ratings), 3 Shopsy items (finalPrice drift),
// Jiomart charger category. Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com/${d.itm}?pid=${d.productId}&affid=djhackraj`,
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
const F = (productId, itm, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, itm, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const DEALS = [
  A('B0CMCSQNTD', 'XTRIM Wrist Support for Men & Women, Gym Fitness Band, Pack of 2', 98, 699, '61NBhgSEFZL._SL1500_', [
    'A pair of XTRIM wrist support bands is ₹98 on Amazon, 86% below the M.R.P. — about ₹49 per band.',
    'The wraps are elastic sports-grade nylon with a simple closure, so one size fits most adult wrists. They add stability for pressing, pull-ups, lifting and cross-training sessions. Buyers rate them 4.2 stars across 2,130 reviews.',
    'Wrap firmly but not tight enough to numb the fingers, and take them off between sets so the wrist can move freely.',
  ], 'Confirm the Black & Grey pack of 2 is selected; other colours can be priced differently.'),
  A('B0GP83XVS5', 'TECHNOVIBES Foldable Study Table / Bed Table, Portable Wooden Writing Desk', 948, 1499, '61xQQdV5WHL._SL1500_', [
    'The TECHNOVIBES foldable study and bed table is ₹948 on Amazon, 37% below the M.R.P.',
    'It has an MDF top on powder-coated steel legs that fold flat, so it works as a laptop desk on the bed, a study table for kids on the floor or a breakfast tray, then slides under a bed or sofa. Buyers rate it 3.7 stars across 5,688 reviews.',
    'Check the table dimensions on the listing against your laptop and the space you have before ordering.',
  ], 'Confirm the Wooden with Black Leg variant is selected; other finishes can be priced differently.'),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|assets\.myntassets\.com\/h_1440,q_90,w_1080\/\S+|rukmini1\.flixcart\.com\/image\/\d+\/\d+\/\S+\.jpe?g\?q=\d+)$/;
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

const file = process.argv[2] ?? 'dd-1003f-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
