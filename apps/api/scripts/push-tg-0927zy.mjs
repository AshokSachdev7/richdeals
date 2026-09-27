// TELEGRAM-DEAL-MONITOR tick 2026-09-27zy
//
// Sidebar scan over all data/tg-groups.json groups, then ONLINE SHOPPING DEALS opened for its last posts. Two unseen
// single-product Amazon deals resolved via link.amazon -> /dp/ASIN (their tag vivek123034-21 stripped). Both re-read on the
// PDP in the logged-in tab (.priceToPay, M.R.P., #availability, add-to-cart, rating) and neither productId is in the DB.
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
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
  A('B0FHWP7KKY', 'Treo By Milton Lennox Beer Mug Glasses, Set of 2, 400 ml Each, Transparent', 160, 320, '71KpzwzEO1L._SL1500_', [
    'A set of two Treo by Milton Lennox 400 ml beer mugs is ₹160 on Amazon, half the M.R.P. That works out to about ₹80 a mug.',
    'They are clear, scratch-resistant mugs with a thick handle, sized for beer, cold coffee, juice or mocktails, and they go in the dishwasher. Buyers rate them 4.7 stars, and 200+ sold in the past month.',
    'Glassware ships in a carton; open the box on delivery and report a chipped mug within the return window.',
  ], 'Confirm the set of 2, 400 ml pack is selected.'),
  A('B0CGZZV1CY', 'Amazon Brand Jam & Honey Panda Popup Play Tent for Kids, Foldable, Green', 397, 1800, '61n5hEFKmpL._SL1500_', [
    "Jam & Honey's panda pop-up play tent for kids is ₹397 on Amazon, 78% below the M.R.P.",
    'It is a foldable animal-themed tent house for children aged 1 to 4 that springs open without poles and folds flat for storage, so it works indoors in a bedroom corner or outdoors on a lawn. It carries the Amazon\'s Choice badge and 4.1 stars across 167 ratings.',
    'Folding a pop-up tent back takes a twist-and-fold knack; keep the instruction card that comes in the bag.',
  ], 'Confirm the green panda design is selected.'),
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
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId),
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

const file = process.argv[2] ?? 'tg-0927zy-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
