// DEAL-INGEST indiafreestuff tick 2026-09-26bf
//
// 4 new single-product rows from the IFS /deals/index + homepage sweep (17 new slugs, 14 resolved via the base64
// ?rto= Buy Now id). Amazon rows re-read on the PDP in the logged-in tab (#centerCol price + M.R.P., add-to-cart,
// no clip coupon, data-old-hires image). Rejected: three Bata sneakers (3.0★/3.4★/no rating), tadka pan (IFS ₹399
// vs PDP ₹499 + clip coupon), LadyZeal pads (IFS ₹283 vs Flipkart ₹440), Home Centre dining set (bank-card price),
// bunny toy / DDecora spice box / charan paduka (no rating), DDecora chopper (one review). Copy is original. Writes a
// {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com/product/p/itme?pid=${id}&affid=djhackraj`,
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
const F = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const RK = (p) => `https://rukmini1.flixcart.com/image/1500/1500/xif0q/${p}?q=70`;

const DEALS = [
  A('B07VQ1MCSH', 'Bambalio 40W Hot Melt Glue Gun with 2 Glue Sticks, BG-200', 189, 399, '61i8SMhtw6L._SL1500_', [
    'The Bambalio BG-200 40-watt hot melt glue gun is ₹189 on Amazon, 53% below its M.R.P.',
    'It uses a PTC heater that warms up in three to five minutes and holds a steady temperature, with an on/off switch, an LED ready light and a trigger feed so the glue flow stays under control. Two glue sticks come in the box.',
    'Handy for school projects, craft work and quick household fixes; park it on its stand while hot, because the nozzle and melted glue burn.',
  ], 'Check the listing shows the BG-200 40W model before checkout.'),
  A('B0D9YMRHLL', 'Lifelong LLKS17 Foldable 3-Wheel Kids Scooter with LED Wheels', 999, 4999, '61o8W-Omt3L._SL1500_', [
    'Lifelong\'s foldable three-wheel kick scooter for children aged 3 and up is ₹999 on Amazon, 80% off the M.R.P.',
    'The deck carries up to 50 kg, the handlebar height adjusts as the child grows, and the PU wheels light up as they roll. It folds flat for the car boot and is rated 4.2 stars across more than 8,300 reviews.',
    'Three wheels make balancing easy for first-time riders; a helmet is still a good idea on any outdoor ride.',
  ], 'Pick the colour you want on the product page; the price can differ between colours.'),
  A('B0887QSHQC', 'Patriot Signature Line DDR4 16GB (2x8GB) 3200MHz Desktop RAM Kit', 10599, 23000, '81cJYDXJGcL._SL1500_', [
    'Patriot\'s Signature Line DDR4 16 GB kit (two 8 GB sticks at 3200 MHz) is listed at ₹10,599 on Amazon, 54% below the M.R.P.',
    'These are 288-pin non-ECC unbuffered desktop DIMMs running PC4-25600 at CL22 timings, sold as a matched pair for dual-channel use. Buyers rate the kit 4.5 stars across 134 reviews.',
    'Check your motherboard supports DDR4 desktop DIMMs before ordering; laptops need SO-DIMM modules, which this kit is not.',
  ], 'Confirm the part number PSD416G3200K on the product page.'),
  A('B01ENGBJX8', 'Sattva Classic XXXL Bean Bag Cover without Beans, Black-Purple', 692, 4299, '81lzsLOJ54L._SL1500_', [
    'The Sattva Classic XXXL bean bag cover in black and purple is ₹692 on Amazon, 84% off its M.R.P.',
    'It is the outer cover only, sold without filling, in a two-tone design that is washable. Buyers rate it 3.8 stars across 139 reviews.',
    'Filling is bought separately; an XXXL cover takes roughly 1.5 to 2 kg of beans for a firm seat.',
  ], 'This listing is the cover only; beans are not included.'),
];

// ------------------------------------------------------------------- derive + gate
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini1\.flixcart\.com\/image\/\S+)$/;
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

const file = process.argv[2] ?? 'ifs-0926bf-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
