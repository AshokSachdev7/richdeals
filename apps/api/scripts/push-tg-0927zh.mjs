// TELEGRAM-DEAL-MONITOR tick 2026-09-27zh
//
// Sidebar read of the 13 source groups. 7 single-product posts, 2 already in tg-multi-seen (handbag, Syska).
// Resolved 5: T2F girls + T2F boys = Currently unavailable (reject), amzn.lt/MjVfIf0t dead (no redirect, skip).
// 2 pass PDP re-read: Parachute Honey 400 ml (Amazon, #centerCol, no coupon) and BOLDFIT jacket (Flipkart ld+json).
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const FK_PATH = {
  JCKHPHTZGSZVH9H7: '/boldfit-full-sleeve-solid-men-jacket/p/itmd5fdc7a94f7fe',
};
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com${FK_PATH[id]}?pid=${id}&affid=djhackraj`,
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
  A('B00CBRJ1SM', 'Parachute Advansed Honey Soft Body Lotion for Dry Skin, 400 ml', 142, 425, '51dOuh5FY8L._SL1500_', [
    'The 400 ml bottle of Parachute Advansed Honey Soft body lotion is ₹142 on Amazon, 67% below its M.R.P.',
    'It is a honey-based moisturiser for dry skin with a light, non-greasy finish, sized to last a family through the winter months. Buyers rate it 4.2 stars.',
    'Telegram groups posted this at a higher figure; the live Amazon price read at the time of publishing is lower.',
  ], 'Confirm the 400 ml size is selected, not the smaller bottle.'),
  F('JCKHPHTZGSZVH9H7', 'BOLDFIT Full Sleeve Solid Men Sports Jacket', 598, 1599,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/jacket/h/c/v/m-1-no-4130-boldfit-original-imahqeu4t3m6rjek.jpeg?q=70', [
    'The BOLDFIT full-sleeve solid sports jacket for men is ₹598 on Flipkart, 63% off its M.R.P.',
    'It is a lightweight zip-up jacket for running, gym warm-ups and cool evenings, offered in several colours. Buyers rate it 4.3 stars.',
    'Flipkart may show a lower figure after a bank offer at checkout; the price here is before any offer.',
  ], 'Pick your size and colour on the product page; the price shown applies to the listed variant.'),
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

const file = process.argv[2] ?? 'tg-0927zh-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
