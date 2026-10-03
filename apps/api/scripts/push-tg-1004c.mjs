// TELEGRAM-DEAL-MONITOR tick 2026-10-04c
//
// Sidebar sweep of 13 groups. Pushed 1: Rogerkart's Philips 20-pack tubelight (rogerkart.com/r/MnYYRKs -> B0CR6HH3D4),
// read in the logged-in Amazon tab (core price 4,151 == channel price, In stock, add-to-cart present, 4.1 stars / 377).
// Rejected: SB Loots "Fast 4297" (fktr.in/Rfrze7W -> Flipkart WAPHQCH5QPRJKVHJ, an Aqua Frisch RO purifier at 4,297
// against an inflated 20,000 M.R.P., service complaints, no returns). Skipped: Lee Cooper / Daniel Klein / Bata / beauty
// hubs, Swiggy, supercoins, Lavie and Syska repeats, hair-oil comb (low ticket, no link). Copy is original.
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
  A('B0CR6HH3D4', 'Philips 20W LED Batten Tubelight, 2 ft Slimline, Cool Day Light, Pack of 20', 4151, 9800, '616ws2eOxHL._SL1080_', [
    "Philips' 20-watt 2-foot LED batten in a factory pack of 20 is ₹4,151 on Amazon, 58% off the M.R.P., which works out to about ₹208 a light.",
    'Each batten is a slim, compact 2-foot fitting in cool daylight white, meant to replace old fluorescent tubes in living rooms, bedrooms, kitchens and corridors. Buyers rate the pack 4.1 stars across 377 reviews.',
    'Twenty identical fittings suit a full-home or new-flat switch-over, a shop or an office, where buying single battens costs noticeably more per piece.',
  ], 'This listing is the cool daylight colour, pack of 20.'),
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

const file = process.argv[2] ?? 'tg-1004c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
