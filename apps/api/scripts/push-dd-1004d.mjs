// DESIDIME-INGEST tick 2026-10-04d
//
// /new + homepage: 35 cards, 16 product-resolved, 6 already in DB, 10 fresh. Pushed 2 Amazon (logged-in Amazon tab: core price
// == DesiDime card, #availability In stock, add-to-cart present, no low-stock line). Rejected: paise price (Solimo vase 177.45),
// unavailable / no add-to-cart (Daniel Klein watch), rating <=3.5 (FRONTECH mouse 3.4, plastic pots 3.2 + drift 167 vs 333),
// card-vs-PDP drift + too few ratings (FRONTECH monitor 10,482 vs 11,980 / 3, GAMDIAS Athena 5,814 vs 6,119 / 6), Myntra
// price drift (Milton casserole), food (BigBasket ginger-garlic paste). Copy is original.
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
  A('B006T9AM2M', 'Energizer Max AA Alkaline Batteries, Pack of 2 (E91BP2)', 77, 110, '71kt35misWL._SL1322_', [
    'A two-pack of Energizer Max AA alkaline batteries is ₹77 on Amazon, 30% below the M.R.P.',
    'AA cells run TV and AC remotes, wall clocks, wireless mice, kids\' toys and torches. Alkaline batteries hold their charge well in a drawer, so a spare pair is useful to keep in the house. Buyers rate them 4.6 stars across 139 reviews.',
    'For a remote or clock that draws very little power, a single pair can last many months.',
  ], 'This listing is the 2-cell AA card (E91BP2).'),
  A('B0BXQ37P33', 'HELLCAT Boys Round Neck Printed Blended Cotton T-Shirt, Combo Pack of 2, Orange and Blue', 557, 6495, '61XYaSs7vPL._SL1500_', [
    "HELLCAT's two-pack of printed round-neck T-shirts for boys is ₹557 on Amazon, 91% below the listed M.R.P.",
    'The tees are a blended cotton fabric with short sleeves and graphic prints, one orange and one blue, for school-day afternoons, play and casual outings. The listing has a large review base: buyers rate it 3.8 stars across 11,027 reviews.',
    'At this price each tee costs about half the pack price, which suits kids who outgrow clothes every season.',
  ], 'Pick your child\'s age size on the product page; the price can differ slightly between sizes.'),
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

const file = process.argv[2] ?? 'dd-1004d-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
