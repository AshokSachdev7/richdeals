// DESIDIME-INGEST tick 2026-10-04g
//
// Stage 1: 33 cards, 13 product-resolved, 4 already in DB, 9 fresh (7 Amazon, 1 Myntra, 1 JioMart).
// Pushed 1 (logged-in Amazon tab: whole-rupee priceToPay 69 == DesiDime card, #availability In stock, add-to-cart present,
// no low-stock line, 3.7 stars / 43). Rejected: Fastrack Noir Charm watch 3.3 stars, Solimo vase paise price (177.45),
// Daniel Klein watch #outOfStock, FRONTECH gaming mouse 3.4 stars, FRONTECH 17.3" monitor drift (card 10,482 vs PDP 11,980)
// + 3 ratings, GAMDIAS Athena cabinet drift (card 5,814 vs PDP 6,119) + 6 ratings, Milton casserole (Myntra) stage-1 drift,
// Colgate gel (JioMart) FMCG + no ld+json. Copy is original.
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
  A('B0CRL6SXTQ', 'FRONTECH HDMI Cable 1.5 Metre, Copper Clad Steel, for TV, Monitor and Console', 69, 399, '71uxB-zmLaL._SL1500_', [
    'A 1.5-metre FRONTECH HDMI cable is ₹69 on Amazon, well under its listed M.R.P. At this price it is a cheap spare for a TV, set-top box, monitor or games console.',
    'The conductor is copper-clad steel: a steel core with a copper coating. It costs less than solid copper and is fine over a short 1.5 m run like this one, for example from a set-top box to a TV on the same unit. Buyers rate it 3.7 stars across 43 reviews.',
    'Check the ports first. This is a standard full-size HDMI-to-HDMI cable, so a laptop with mini-HDMI or USB-C video out needs an adapter as well.',
  ], 'There is only one length on this listing, 1.5 metres. Measure the distance between your two devices before ordering.'),
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

const file = process.argv[2] ?? 'dd-1004g-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
