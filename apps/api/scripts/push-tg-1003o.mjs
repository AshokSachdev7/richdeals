// TELEGRAM-DEAL-MONITOR tick 2026-10-03o
//
// Pushed 2: GRAPHENE 67-pc electric train set B0HKD9QSN6 (CoolzTricks), read in the logged-in Amazon tab (₹1,299, M.R.P.
// ₹5,999, In stock, add-to-cart present, new listing with no reviews yet); VM BOND 4-layer kitchen rack FVBHFAGFYKS5ZHZY
// (SB Loots, fktr.in), Flipkart ld+json ₹244 InStock, M.R.P. ₹999, 4.1 stars from 18,701 ratings. Rejected: Deniklo
// link.amazon/B01PXHH7C (resolves to /s? search). Copy is original.
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
  A('B0HKD9QSN6', 'GRAPHENE 67 Pcs Electric Train Set with 3D Flexible Cube Tracks', 1299, 5999, '71qfzM3mZKL._SL1254_', [
    'The GRAPHENE 67-piece electric train set is ₹1,299 on Amazon, 78% below its listed M.R.P.',
    'Kids snap the flexible cube tracks together into loops, climbs and anti-gravity curves, and a battery-powered car runs the circuit. Because the track pieces connect like building blocks, the same set gives a different layout every time it comes out of the box.',
    'It is a new listing with no customer reviews yet, so check the age rating and the battery type on the product page before you order it as a gift.',
  ], 'There is only one variant, the 67-piece set. Batteries for the car may not be included, so check the listing.'),
  F('FVBHFAGFYKS5ZHZY', 'vm-bond-kitchen-rack-4-layer-multipurpose-shelf-stand-basket-plastic-fruit-vegetable/p/itm1d1cb860151ac',
    'VM BOND Kitchen Rack 4 Layer Multipurpose Plastic Fruit & Vegetable Basket', 244, 999,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/fruit-vegetable-basket/5/l/7/vm-1185-vm-bond-original-imahfagfzgu6uz4g.jpeg?q=70', [
    'The VM BOND four-tier plastic kitchen rack is ₹244 on Flipkart, 76% below its M.R.P.',
    'Four stacked open baskets keep onions, potatoes, fruit and packets off the counter while letting air reach them, so produce stays dry. The plastic baskets are light enough to move when you clean, and they wipe down easily.',
    'It is one of the better-reviewed racks in this price band, with a 4.1-star average from 18,701 ratings. Flipkart shows a lower figure with bank offers, but that needs a specific card.',
  ], 'Pick your colour on the product page. Blue is the default, and other colours can be priced differently.'),
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

const file = process.argv[2] ?? 'dd-1003e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
