// TELEGRAM-DEAL-MONITOR tick 2026-09-25as
//
// Sidebar scan of 13 groups -> 4 new links. All resolved; 3 Amazon ASINs already LIVE in the DB.
// GO DESi laddu B0FDB6YRGK unchanged at ₹116, Double Cleanser B07K7CFTDJ unchanged at ₹699 (channel ₹399 is post-₹300 coupon) -> skipped.
// Myntra 38976654 Cetaphil water gel: page reads ₹899 / M.R.P. ₹1,799 vs channel ₹611 -> rejected (drift).
// SB Loots amazn.lt -> B0BZWBFQR2 Solimo cookware: PDP ₹277 / M.R.P. ₹1,999, In stock, RetailEZ, down from ₹328 -> refresh.
// Slug pinned because the upsert overwrites slug — the URL must not move.
import { writeFileSync } from 'node:fs';

const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const d = { productId: 'B0BZWBFQR2', slug: 'solimo-2-piece-stainless-steel-cookware-set-b0bzwbfqr2', was: 328,
  name: 'Amazon Brand Solimo 2-Piece Stainless Steel Cookware Set (18 cm Tope, 14 cm Sauce Pan)', price: 277, mrp: 1999,
  img: 'https://m.media-amazon.com/images/I/51bhZ6HgF+L._SL1500_.jpg' };

const discountPct = Math.round((1 - d.price / d.mrp) * 100);
const description = [
  "A steel tope and a small saucepan are the two vessels an Indian kitchen reaches for most: the tope for dal, rice or boiling milk, the saucepan for chai, tadka and reheating a single portion. Uncoated stainless steel has no non-stick layer to scratch or peel, so it takes steel spoons and scrubbers without a second thought.",
  "This set is Solimo, Amazon's own home brand, and has two pieces: an 18 cm tope and a 14 cm saucepan. The listing says the body is food-grade stainless steel with a glossy finish and no coating, that it works on both gas stoves and induction cooktops, and that it is dishwasher safe. It is not oven safe. The whole set weighs about 564 g, so these are light everyday vessels rather than heavy tri-ply.",
  "Thin steel heats fast and can scorch milk or thick dal at the bottom, so cook on medium flame and stir. Add salt to water after it boils, not before, to avoid pitting marks on the base. Stubborn stains lift with a paste of baking soda and water rather than harsh scouring.",
  `Live Amazon price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock. Down from ₹${inr(d.was)} when we last listed it.`,
].join('\n\n');

const row = {
  slug: d.slug,
  title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
  description,
  howTo: [
    'Tap Grab Deal to open the Solimo cookware set on Amazon at the live price.',
    'Confirm the 2-piece set (18 cm tope + 14 cm sauce pan) is selected — other sets on the same page are priced differently.',
    'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
    NO_COUPON,
  ],
  image: d.img, price: d.price, mrp: d.mrp, discountPct,
  isSuper: d.price <= 250, isHot: d.price <= 500,
  status: 'live', store: 'Amazon', productId: d.productId, affiliateUrl: AZ(d.productId),
};
const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
if (t !== row.price) throw new Error('title/price mismatch');
if (!Number.isInteger(row.price) || row.price >= row.mrp || row.price >= d.was) throw new Error('bad price');
if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error('thumbnail');
if (description.length < 900) console.log(`description too thin: ${description.length}`);

const file = process.argv[2] ?? 'tg-0925as-payload.json';
writeFileSync(file, JSON.stringify({ deals: [row] }));
console.log(`pre-flight OK, 1 row -> ${file}`);
console.log(`SLUGS: ${row.slug}`);
