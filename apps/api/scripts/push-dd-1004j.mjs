// DESIDIME-INGEST tick 2026-10-04j
//
// Stage 1: 36 discovered, 13 resolved, 4 already in DB, 9 fresh. Logged-in Amazon tab verify: 1 pass (SanDisk Ultra Curve
// 64GB B0B4N243KC, #centerCol ₹800 == card, #availability In stock, add-to-cart present, 4.2 / 9,716; PDP shows no M.R.P.).
// Rejected Amazon: Carlton London + French Connection watches (no add-to-cart / no buy box), Intex IT-KB335 keyboard (0 ratings),
// Graco Airpop car seat (drift: PDP 8121 vs card 7716). Non-Amazon: Instamart cheese (food), Instamart Lenovo keyboard (no
// ld+json), Bigbasket Cetaphil (no ld+json, cosmetic), Superbottoms giveaway (not a product).
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
  A('B0B4N243KC', 'SanDisk Ultra Curve 64GB USB 3.2 Pen Drive, Black', 800, null, '61MKJXhrRLL._SL1500_', [
    'The SanDisk Ultra Curve 64GB USB 3.2 pen drive (model SDCZ550-064G-I35) is ₹800 on Amazon in black.',
    'It is a USB 3.2 flash drive rated for read speeds of up to 100MB/s, so moving a folder of photos or a few HD videos takes seconds rather than minutes on a USB 3.x port. It still works on older USB 2.0 ports, just at the slower USB 2.0 speed. The curved, compact body suits a keychain or laptop bag, and SanDisk is one of the most widely bought storage brands in India: this listing holds 4.2 stars from more than 9,700 ratings.',
    'Pick 64GB if you mainly carry documents, a phone-photo backup or a few movies. Format it to exFAT if you need to copy single files larger than 4GB, such as long videos or disk images.',
  ], 'The ₹800 price is for the 64GB Black variant. Other capacities are listed on the same page at different prices, so check the selected size before checkout.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
const out = [];
for (const d of DEALS) {
  const discountPct = d.mrp ? Math.round((1 - d.price / d.mrp) * 100) : 0;
  // every ₹ figure in our copy must be the live price, except per-unit ("about ₹") and M.R.P. ("against a ₹") mentions
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const description = [...d.description, (d.mrp ? `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.` : `Live ${d.store} price is ₹${inr(d.price)}, In stock.`)].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)}${discountPct ? ` (${discountPct}% Off)` : ''} – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || (row.mrp != null && row.price >= row.mrp)) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'dd-1004j-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
