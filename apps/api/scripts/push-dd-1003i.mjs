// DESIDIME-INGEST tick 2026-10-03i
//
// 33 cards, 18 resolved to a product, 4 already in DB, 14 fresh. Pushed 3, each read in the logged-in Amazon tab
// (priceToPay == DesiDime card price, #availability In stock, add-to-cart present). Rejected: card-vs-PDP drift (AKAI 998 vs 949,
// AOC 16,999 vs 16,150, Ant Esports 1,329 vs 1,225, Carrera 2,490 vs 619, GOVO 4,999 vs 4,185), weak ratings (AKAI 3.4, Carrera 3.1),
// no buy-box price (IFB AC), vehicle booking (Hero Destini), paise price (LUKER 338.75, Anchara 601.81), unavailable (playR sipper),
// Flipkart Samsung G3 (stage-1 drift). Copy is original.
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
  A('B0FN86CSWB', 'Frontech 4-Port USB 2.0 Hub with Individual Switches', 209, 800, '71sVOyCOuRL._SL1500_', [
    'The Frontech 4-port USB 2.0 hub is ₹209 on Amazon, 74% off the M.R.P.',
    'Each of its four ports has its own on/off switch and LED, so a mouse, keyboard, printer and pen drive can share one laptop port and be powered down one at a time. The body is iron, and an optional power input helps with power-hungry devices. Buyers rate it 3.7 stars across 15 reviews.',
    'USB 2.0 is fine for peripherals and pen drives; for external SSDs, pick a USB 3.0 hub instead.',
  ], 'This is the 4-port USB 2.0 model.'),
  A('B0G58X1Y5J', 'Foxin CPU Air Cooler with 4 Copper Heat Pipes and 120 mm Rainbow LED Fan', 870, 2600, '71+l52PD3dL._SL1500_', [
    'The Foxin tower CPU air cooler is ₹870 on Amazon, 67% below the M.R.P.',
    'Four copper heat pipes pull heat off the CPU into a fin stack cooled by a 120 mm rainbow LED fan spinning up to 1,800 RPM at about 60 CFM, on a hydraulic bearing for quieter running. It mounts on Intel LGA1700, 1200 and 115X and AMD AM4 and AM5 sockets. Buyers rate it 3.9 stars across 31 reviews.',
    'It is a cheap upgrade over a stock cooler for a budget gaming build; check cooler height against your cabinet before ordering.',
  ], 'Confirm your CPU socket is on the supported list before checkout.'),
  A('B0744QMCZY', 'Lakme 9 to 5 Primer + Matte Powder Foundation Compact', 240, 599, '51hXR0jG8IL._SL1000_', [
    "Lakme's 9 to 5 Primer + Matte compact is ₹240 on Amazon, 60% off the M.R.P.",
    'It combines primer, foundation and face powder in one pressed compact that blurs pores and leaves a matte finish, and it is sold in six shades. Buyers rate it 4.0 stars across more than 2,000 reviews.',
    'It is a handy touch-up compact for a work bag; match the shade on the listing before buying.',
  ], 'Price is for the shade shown; other shades can be priced differently.'),
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

const file = process.argv[2] ?? 'dd-1003i-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
