// DEAL-INGEST indiafreestuff tick 2026-10-04g
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 12 new slugs. 7 skipped pre-resolve as [Apply N% Coupon] posts
// (post-coupon price cannot be verified on fetched HTML). 5 resolved via base64 ?rto= Buy Now, all Amazon, 0 already in DB.
// Pushed 1 (logged-in Amazon tab: whole-rupee priceToPay 1,048 == IFS card, #availability In stock, add-to-cart present,
// no low-stock line, 4.0 stars / 179). Rejected: WARMEO Legend lunch box 3.5 stars, Lify 17L backpack only 2 left + 2 ratings,
// Sanjeev Kapoor glass set paise price (699.73, no ratings), Amazon Basics granite fry pan paise price (846.43). Copy is original.
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
  A('B0B8HCXL9D', 'TVS Ronin Edition Open Face Helmet, ISI & DOT Certified, UV-Resistant Visor', 1048, 1069, '71EL-EGQMyL._SL1500_', [
    "TVS's Ronin Edition open-face helmet is ₹1,048 on Amazon. That is only a small cut below the M.R.P., so treat this as a fair price on a certified helmet rather than a steep discount.",
    'It carries both ISI and DOT certification. Indian law requires the ISI mark on any two-wheeler helmet sold here, and the DOT mark is the US standard. The shell is high-impact ABS, the visor is UV-resistant, and a metal quick-release buckle closes the chin strap. The padding is ventilated for city commutes. Buyers rate it 4.0 stars across 179 reviews.',
    'An open-face helmet suits short scooter and city rides in hot weather. For highway riding, a full-face helmet protects the jaw and chin as well.',
  ], 'Pick your size on the product page. Measure around your head just above the eyebrows and choose the size that matches that measurement.'),
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

const file = process.argv[2] ?? 'ifs-1004g-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
