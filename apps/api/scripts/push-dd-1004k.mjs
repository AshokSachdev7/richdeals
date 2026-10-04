// DESIDIME-INGEST tick 2026-10-04k
//
// /new + homepage: 37 cards, 24 junk/other dropped (W festive edit admitad link, Libas /s? search). 11 resolved, 3 already
// in DB, 8 fresh. Rejected: 5 grocery/food (Instamart mochi, Yogabar shake, Mysore pak, Amul cream; Digihaat moong), kids
// bike safety belt B0HGMY6YVM (card 54 vs PDP 549 - same drift as IFS 1004k). Logged-in Amazon tab verify (#centerCol):
// 2 pass (PDP == card, In stock, add-to-cart, no low-stock line). Copy original, PDP facts only.
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
const SIZE = (thing, colour) => `Pick your ${thing} on the product page. We checked the price on the ${colour} option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B081X46PYN', 'TrustBasket Indigo 24-Inch Metal Plant Stand, Anti-Rust, Black, Set of 4', 700, 2299, '61QeBlETrNL._SL1024_', [
    "A set of four TrustBasket Indigo 24-inch metal plant stands is ₹700 on Amazon. That is about ₹175 per stand, and the set is rated 4.2 stars across 14,424 reviews.",
    'Each stand is made of anti-rust metal, so it can sit on a balcony that gets rain as well as in a living room. The legs are built not to bend under a heavy pot, and TrustBasket lists a combined load capacity of 120 kg for the set. They are light enough to move around when you rearrange your plants.',
    'Before ordering, measure the base of your largest planter so it sits flat on the ring.',
  ], 'We checked the price on the Black-Indigo pack of 4.'),
  A('B0FLPX38HF', 'Boldfit Stainless Steel Water Bottle, 1 Litre, Leakproof, Black', 239, 799, '610yF3AA4tL._SL1500_', [
    "Boldfit's 1-litre stainless steel water bottle in Black is ₹239 on Amazon. It has 7,684 ratings at 3.9 stars.",
    'The body is food-grade stainless steel with a BPA-free plastic lid. Boldfit says it is leakproof and rust-free, so it can go into a school bag, an office bag or a gym kit. It is single-walled, which keeps it light.',
    'A single wall does not insulate. Water will not stay cold or hot for hours the way it does in a vacuum flask.',
  ], 'We checked the price on the Black Quest 1 L option. Other colours can be priced differently.'),
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

const file = process.argv[2] ?? 'dd-1004k-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
