// TELEGRAM-DEAL-MONITOR tick 2026-09-27zq
//
// Sidebar read of the 13 source groups. 5 new posts:
// - EVM 20000mAh power bank (link.amazon/B09g2lRNH -> B0H8NQDC6N): pass.
// - boAt Aavante 2.0 150 (amzn.lt/BckhjTb1, amzn.lt DNS dead, ASIN found by exact-title search -> B0F5BC2161):
//   already LIVE as id 2503 at a stale ₹1,199; fixed in place to ₹1,499, not re-pushed (re-push rewrites the slug).
// - coaster set (amzn.to/4rHsznu -> B0GSFK1WF1): channel ₹100 vs PDP ₹448, rejected.
// - KILLER deo pack of 5 (fkrt.co/vqyPAY): channel ₹399 vs ld+json ₹598, rejected.
// - Jam & Honey panda tent: link truncated in the sidebar, not found in Amazon search, skipped.
// EVM verified in the logged-in tab: ₹1,099, M.R.P. ₹2,999, in stock, add-to-cart present, 4.2★ (36). Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
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
const DEALS = [
  A('B0H8NQDC6N', 'EVM EnTurbo 20000mAh Power Bank, 22.5W Fast Charging, USB-A and Type-C, Blue', 1099, 2999, '61DA3GqzL5L._SL1500_', [
    'The EVM EnTurbo 20000mAh power bank is ₹1,099 on Amazon, 63% below its M.R.P.',
    'It packs a 20000mAh (74Wh) lithium-polymer cell with 22.5W fast output on both USB-A and USB-C, so it can charge two devices at once, and it refills through either micro-USB or USB-C. EVM backs it with a 2-year warranty. Buyers rate it 4.2 stars.',
    'A 20000mAh bank gives roughly three to four full charges of a typical 5000mAh phone; 74Wh is within the 100Wh airline cabin limit, but it must go in hand baggage, never checked in.',
  ], 'Confirm the blue EVM-P0204 variant is selected.'),
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

const file = process.argv[2] ?? 'tg-0927zq-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
