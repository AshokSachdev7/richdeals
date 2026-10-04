// DESIDIME-INGEST tick 2026-10-04i
//
// Stage 1: 34 discovered, 10 resolved, 4 already in DB, 6 fresh. Logged-in Amazon tab verify: 1 pass (UCB Ming backpack
// B0CHS75QYV, priceToPay 659 == card, #availability In stock, add-to-cart present, 4.3 / 505). Rejected Amazon: Tokyo Talkies
// cargo jeans + POPWINGS hoodie B0CM98GJJV (Only 1 left; POPWINGS also 4 ratings), ZEORGIA hub (drift 4999 vs 1564, Only 1 left,
// no ratings). Non-Amazon: Shopsy Eveready bulbs (price drift), Jiomart Colgate (FMCG, no ld+json). Play-store app promos dropped.
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
  A('B0CHS75QYV', 'UNITED COLORS OF BENETTON Ming 25L Laptop Backpack, Beige', 659, 2199, '41uyGASl3uL._SL1000_', [
    'The United Colors of Benetton Ming 25-litre laptop backpack is ₹659 on Amazon in beige, against a ₹2,199 M.R.P.',
    'It is a polyester daypack of about 48 cm tall, 31.5 cm wide and 16.5 cm deep, with three compartments plus a pocket, so a laptop, charger, notebooks and a water bottle each get their own space. That size suits college, office commutes and short trips. It carries a 1-year manufacturer warranty, and it holds 4.3 stars from over 500 ratings, which is solid for a branded bag in this price band.',
    'Wipe it with a dry cloth to clean it, as the care label says. Do not machine-wash it. A light-coloured bag shows dust sooner, so wipe it every week or two.',
  ], 'The ₹659 price is for the Beige colour. Other colours such as Navy are listed separately and may cost more, so check the selected colour before checkout.'),
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

const file = process.argv[2] ?? 'dd-1004i-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
