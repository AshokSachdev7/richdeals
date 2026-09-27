// TELEGRAM-DEAL-MONITOR tick 2026-09-27zt
//
// Sidebar read of the 13 source groups. New single-product posts: HRX Transit cabin trolley (link.amazon/B0c9dIy14 -> B0HHNSQVZQ,
// PDP 1999, in stock, add-to-cart) and Lotus WhiteGlow gel creme 50 g (fkrt.co/o6bD5X -> FRNGW2M7JRQHU57D, ld+json 233 InStock).
// Rejected: Hero XTREME 125R booking and SHARP ACs (SBI card price only). Treo beer mugs skipped (sidebar link truncated).
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
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
  A('B0HHNSQVZQ', 'HRX Transit Cabin Size Polycarbonate Hard Shell Trolley with Front Laptop Compartment, Black', 1999, 10999, '71PrqgBEGaL._SL1500_', [
    'The HRX Transit cabin-size hard-shell trolley is ₹1,999 on Amazon, 82% below its M.R.P.',
    'It has a polycarbonate shell, eight 360-degree spinner wheels, a built-in number lock and a zipped front compartment for a laptop, so the laptop comes out at security without opening the main case. It is sized for standard carry-on limits on 2-3 day trips. This is a new listing with no ratings yet.',
    'Check your airline cabin size and weight limits before flying with it as carry-on.',
  ], 'Confirm the black cabin-size model is selected.'),
  F('FRNGW2M7JRQHU57D', 'Lotus Herbals WhiteGlow Vitamin-C Radiance Gel Creme SPF 20 PA+++, 50 g', 233, 495, 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/fairness/8/x/j/50-lotus-whiteglow-vitamin-c-radiance-gel-creme-spf-20-pa-1-resized-original-imagw2m7sfs85bun.jpeg?q=70', [
    'The 50 g Lotus Herbals WhiteGlow Vitamin-C Radiance gel creme is ₹233 on Flipkart, 53% off the M.R.P.',
    'It is a light gel day cream with vitamin C and SPF 20 PA+++ sun protection, suited to oily and combination skin that finds regular creams heavy. Buyers rate it 4.3 stars across nearly 1,600 ratings.',
    'SPF 20 is fine for office days; for long hours outdoors, layer a dedicated sunscreen of SPF 30 or more on top.',
  ], 'Confirm the 50 g size is selected, not the 100 g pack.'),
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

const file = process.argv[2] ?? 'tg-0927zt-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
