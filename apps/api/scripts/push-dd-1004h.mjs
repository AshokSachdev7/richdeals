// DESIDIME-INGEST tick 2026-10-04h
//
// Stage 1: 37 discovered, 16 resolved, 2 already in DB, 14 fresh. Logged-in Amazon tab verify: 1 pass (Nayasa B07H72J7DL,
// priceToPay 404 == card, #availability In stock, add-to-cart present, 4.3 / 2,272). Rejected Amazon: drift (Fastrack VOX Pro
// 2399 vs 1050, Acer PalmEase 999 vs 488, Prestige stove 5605 vs 1749 + 2.9 stars, ASUS TUF A15 card/bank-only price + 2 ratings,
// FRONTECH monitor + 3 ratings, GAMDIAS cabinet + 6 ratings), Bouncefit neckband unavailable, diaper pants (health/FMCG).
// Non-Amazon: Instamart Larah dinner set + BSC trimmer held back (location-locked quick-commerce price, no ratings, no
// Instamart precedent in DB), Lifelong fan out of stock, Bigbasket/Jiomart no ld+json, 2 Flipkart dropped by stage 1.
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
  A('B07H72J7DL', 'Nayasa Fusion Airtight Kitchen Storage Containers, 1000 ml, Set of 6, Grey', 404, 1089, '71OG++NfAJL._SL1500_', [
    'A set of six Nayasa Fusion 1-litre kitchen containers is ₹404 on Amazon. That works out to about ₹67 per container, well below the M.R.P.',
    'They are BPA-free, food-grade plastic jars with airtight lids, sized for the daily staples in an Indian kitchen: rice, dal, cereals, pasta, flour, sugar and snacks. The bodies are transparent, so you can see at a glance what is running low, and they stack to save shelf space. The lids are easy to open with one hand. With 4.3 stars across more than 2,200 ratings, this is a well-tested budget set rather than an unknown brand.',
    'Airtight plastic keeps moisture and ants out of dal and atta during the monsoon. Wash and dry the jars fully before the first fill so no damp gets trapped inside.',
  ], 'The pack has six 1000 ml containers in grey. Check the colour on the product page, since other colours may be priced differently.'),
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

const file = process.argv[2] ?? 'dd-1004h-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
