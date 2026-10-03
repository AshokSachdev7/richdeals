// DEAL-INGEST indiafreestuff tick 2026-10-04d
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 10 new slugs, all resolved via base64 ?rto= Buy Now (9 Amazon,
// 1 Flipkart), 0 already in DB. Pushed 3 Amazon (logged-in Amazon tab: whole-rupee priceToPay == IFS card, #availability
// In stock, add-to-cart present, no low-stock line). Rejected: Treo Milton mug set drift (IFS 399 vs PDP 706), URBN power bank
// paise price (721.05), low stock (Cahoot jeans only 1 left + 3.4 stars, Nivia backpack only 3 left), rating <=3.5 (ArtzFolio
// MDF boards 3.0 / 4 ratings, RAYMOX wire dish cloth 3.5), Flipkart Abros SOLAR shoes OutOfStock in ld+json. Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com/${d.fkPath}?pid=${d.productId}&affid=djhackraj`,
};
const IMG = {
  Amazon: /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/,
  Flipkart: /^https:\/\/rukmini[m\d]?\d?\.flixcart\.com\/image\//,
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
  A('B07ZFBHPYM', 'Beverly Hills Polo Club Gardenia No.1 Body Mist for Women, 200 ml', 262, 750, '71mMbAElLUL._SL1500_', [
    'A 200 ml bottle of Beverly Hills Polo Club Gardenia No.1 body mist is ₹262 on Amazon, 65% below the M.R.P.',
    'It is a light floral mist built around a gardenia note, meant to be sprayed after a shower or over clothes for a softer scent than a perfume. Buyers rate it 4.1 stars across 26 reviews.',
    'A large 200 ml bottle lasts through months of daily use, and a body mist can be reapplied during the day without the heaviness of an eau de parfum.',
  ], 'This listing is the single 200 ml Gardenia No.1 bottle.'),
  A('B0CYLGS47W', 'Fastrack Active Rugged Smartwatch with 1.83-inch Display and Bluetooth Calling', 2399, 7995, '71HDlFVRCNL._SL1500_', [
    "Fastrack's Active rugged smartwatch is ₹2,399 on Amazon, 70% off the M.R.P.",
    'It pairs a 1.83-inch UltraVU HD screen with Bluetooth calling, a functional crown, 100+ sports modes with automatic multisport recognition, an AI voice assistant, a 24x7 health suite and IP68 water and dust resistance. Buyers rate it 3.8 stars across 12 reviews.',
    'The rugged case suits people who wear a watch to the gym, on treks or on work sites, where a slim fashion smartwatch picks up scratches quickly.',
  ], 'Check the strap colour on the product page before ordering; the price shown is for this listing.'),
  A('B0HF451MDX', 'ZEBRONICS Heat Buster 1500 BLDC Bladeless Rechargeable Desktop Fan', 2999, 6999, '61NvV1TDy0L._SL1500_', [
    "ZEBRONICS' Heat Buster 1500 bladeless desktop fan is ₹2,999 on Amazon, 57% below the M.R.P.",
    'A BLDC motor runs up to 3000 RPM across 9 speed modes, and a 3500 mAh battery gives up to 8 hours of cordless use, charged over Type-C. It also has an LED display and 3-step ambient lighting. Buyers rate it 3.9 stars across 267 reviews.',
    'The bladeless design leaves no exposed blades for small fingers, and the battery keeps it running on a desk through a power cut.',
  ], 'This listing is the Dark Grey model.'),
];
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
  if (!IMG[d.store].test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1004d-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
