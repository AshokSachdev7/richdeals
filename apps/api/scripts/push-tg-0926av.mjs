// TELEGRAM-DEAL-MONITOR tick 2026-09-26av
//
// 1 new single-product row from the CoolzTricks group (amzn.to/3VAvUbL → B0FLQ4135Z). Re-read on the PDP in the logged-in
// Amazon tab: #centerCol ₹389 vs M.R.P. ₹599, add-to-cart present, no clip coupon, 4.0★, data-old-hires image. Other group
// posts were already seen/live or junk — see reports/tick-2026-09-26av-telegram.md. Copy is original. Writes a
// {deals:[...]} payload for POST /admin/deals/bulk (status live).
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
  A('B0FLQ4135Z', 'Kesh King Gold Advanced Hair Growth Serum, 30 ml', 389, 599, '61TzkWQ+LTL._SL1080_', [
    'Kesh King\'s Gold hair growth serum in the 30 ml bottle is down to ₹389 on Amazon, 35% under its M.R.P.',
    'The lightweight leave-on formula pairs Redensyl, Anagain, Procapil and Kopexil with an Ayurvedic herb blend that includes Bhringraj, Amla, Hibiscus and Brahmi, and is meant for daily scalp application where hair is thinning or falling. Buyers rate it 4.0 stars.',
    'Scalp serums need a few months of steady use before you can judge them, so treat one bottle as a trial run rather than a quick fix.',
  ], 'Confirm the listing is the 30 ml Gold serum before checkout.'),
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

const file = process.argv[2] ?? 'ifs-0926au-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
