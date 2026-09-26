// TELEGRAM-DEAL-MONITOR tick 2026-09-26bg
//
// 2 new single-product rows from the group sidebar: Dealdost Swiss Beauty Glow Fusion serum (amzn.to) and
// CoolzTricks realme TechLife 32" QLED TV (fkrt.cc). Swiss Beauty re-read on the PDP in the logged-in tab (#centerCol
// ₹249 / M.R.P. ₹499, add-to-cart, no clip coupon); realme read from Flipkart ld+json (₹9,899, InStock, 4.3★).
// Skipped: SB Wipro bell push (id 7988) + Dealzone Panasonic bulb (id 246) already live, handbag + Syska power bank
// already seen, Roff Cera Clean already pushed in 26bd, cashew (grocery), Supercoins/Instamart/join-channel posts.
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
const RK = (p) => `https://rukmini1.flixcart.com/image/1500/1500/xif0q/${p}?q=70`;
const DEALS = [
  A('B0FLXKG1QV', 'Swiss Beauty Glow Fusion Face Serum with 10% Vitamin C, 30 ml', 249, 499, '51lYsGft0aL._SL1500_', [
    'Swiss Beauty\'s Glow Fusion face serum with 10% vitamin C and sakura extract is ₹249 on Amazon, half its M.R.P. and the lowest price in 30 days.',
    'The 30 ml serum targets dark spots and dullness, adds hyaluronic acid for hydration, and has a light, non-sticky texture that absorbs quickly. Buyers rate it 4.3 stars.',
    'Vitamin C serums work best in the morning under sunscreen; patch-test first if your skin is sensitive.',
  ], 'Check the listing shows the 30 ml Glow Fusion serum before checkout.'),
  F('TVSHPCXWC8Y9UYSU', 'realme TechLife 80 cm (32 inch) QLED HD Ready Smart Android TV, 20W Speakers', 9899, 22999, RK('television/3/p/e/-original-imahrhqdyzyhsubx.jpeg'), [
    'The realme TechLife 32-inch QLED HD Ready smart TV is ₹9,899 on Flipkart, 57% below its M.R.P.',
    'It runs Thunder OS with live TV, Netflix and over 100 apps, pairs a bezel-less QLED panel rated at 300 nits with a 60 Hz refresh rate, and has 20 W speakers. Buyers rate it 4.3 stars across more than 8,900 ratings.',
    'Flipkart lists this TV as replacement-only within 7 days, with no returns, so check the model before ordering.',
  ], 'Confirm the 32-inch QLED variant is selected on the product page.'),
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

const file = process.argv[2] ?? 'tg-0926bg-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
