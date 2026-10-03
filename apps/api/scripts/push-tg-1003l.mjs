// TELEGRAM-DEAL-MONITOR tick 2026-10-03l
//
// Pushed 2 Tresemme 1L shampoos (Dealzone + CoolzTricks), read in the logged-in Amazon tab: priceToPay, M.R.P.,
// #availability In stock, add-to-cart present. Milton air fryer repost = LIVE row 2293, re-priced via prisma (₹2,990 -> ₹3,199).
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
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
  A('B0C45WQNND', 'Tresemme Keratin Repair Bond Strength Shampoo, 1L', 480, 1370, '51P8FYOdWXL._SL1500_', [
    'A one-litre bottle of TRESemme Keratin Repair Bond Strength shampoo is ₹480 on Amazon, 65% below the M.R.P. — about ₹48 per 100 ml.',
    'It is built around the brand\'s Protein Bond Plex formula; TRESemme says it strengthens hair up to 20X against signs of damage and cuts breakage by up to 98%. Buyers rate it 4.2 stars across 516 reviews.',
    'The 1L pump bottle suits a shared bathroom or anyone who colours, irons or blow-dries often; pair it with the matching conditioner if your lengths are dry.',
  ], 'Confirm the 1 l (Pack of 1) size is selected; smaller bottles carry a different price.'),
  A('B085TW6G85', 'TRESemme Smooth & Shine Shampoo, 1L', 480, 1278, '51EQtXHGl8L._SL1000_', [
    'TRESemme Smooth & Shine shampoo in the one-litre bottle is ₹480 on Amazon, 62% below the M.R.P. — about ₹48 per 100 ml.',
    'It is a paraben-free formula with Vitamin H and silk protein that the brand pitches for taming frizz and easier detangling. With 4.3 stars from over 12,000 reviews, it is one of the most-rated shampoos in this size.',
    'Good pick for frizz-prone or humid-weather hair; the litre bottle works out far cheaper per wash than the 340 ml pack.',
  ], 'Confirm the 1000 ml size is selected; other sizes are priced differently.'),
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

const file = process.argv[2] ?? 'tg-1003l-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
