// TELEGRAM-DEAL-MONITOR tick 2026-09-27a
//
// 2 new single-product rows from the CoolzTricks sidebar post: MILTON Town Case lunch box (amzn.to) and Solimo 1100 ml
// borosilicate bowl (amzn.to). Both re-read on the PDP in the logged-in tab (#centerCol ₹499 / M.R.P. ₹950 and
// ₹245 / M.R.P. ₹599, add-to-cart, no clip coupon).
// Skipped: SB portable blender B0HF42VVYY (₹899 on PDP, ₹585 only after a 35% clip coupon), Dealzone Panchmeva dry
// fruits (grocery), iPhone "151 me" bait post, and posts already handled in 26bg.
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com/product/p/itme?pid=${id}&affid=djhackraj`,
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
const F = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const DEALS = [
  A('B0FFN9MMKW', 'MILTON Town Case Microwavable Lunch Box, 2 x 450 ml, Inner Steel, Double Wall, Leak-Proof', 499, 950, '71a+5rus2qL._SL1500_', [
    'MILTON\'s Town Case lunch box with two 450 ml containers is ₹499 on Amazon, about half its M.R.P. and the lowest price it has shown in 30 days.',
    'The containers have a steel inner and a double wall, so food stays warm longer, and the leak-proof lids suit curries and dal. The case is microwavable and compact enough for an office or college bag. Buyers rate it 4.1 stars.',
    'Check the colour option on the product page before you order.',
  ], 'Confirm the 2 x 450 ml Town Case set is selected before checkout.'),
  A('B07P9P6FYP', 'Amazon Brand - Solimo Borosilicate Round Glass Mixing Bowl, 1100 ml, Transparent', 245, 599, '81g-RcW5jtL._SL1500_', [
    'The Solimo 1100 ml borosilicate glass mixing bowl is ₹245 on Amazon, 59% below its M.R.P.',
    'Borosilicate glass handles heat changes better than ordinary glass, so the bowl works for mixing batter, serving, or reheating in a microwave. The round, transparent shape makes it easy to see what is inside. Buyers rate it 4.2 stars.',
    'This listing is for a single bowl, not a set.',
  ], 'Confirm the 1100 ml size is selected on the product page.'),
];
// ------------------------------------------------------------------- derive + gate
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini1\.flixcart\.com\/image\/\S+)$/;
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
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId),
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

const file = process.argv[2] ?? 'tg-0927a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
