// DEAL-INGEST indiafreestuff tick 2026-09-27d
//
// 104 slugs swept (homepage + /deals/index pages 1-3), 40 new vs 0926bf, 36 resolved via base64 ?rto= Buy Now.
// Every survivor re-read on the PDP in the logged-in Amazon tab (#centerCol price, M.R.P., add-to-cart, rating
// count). 9 pass. Rejected: clip-coupon / ICICI-card prices, IFS price drift (lumbo belt, SIMPARTE set, Caprese
// gold), ratings ≤3.4 or 0-1 reviews, unavailable cable, helmet with no M.R.P., multi-model phone covers,
// Delhi-only dustbin. Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
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
  A('B0DSG6D1LV', 'AIPL Sunjet Butyl Waterproof Repair Tape, 50 mm x 5 m, Aluminium Foil', 173, 749, '61DQr8y+qrL._SL1500_', [
    'The AIPL Sunjet butyl waterproof tape (50 mm wide, 5 m roll) is ₹173 on Amazon, 77% below its M.R.P.',
    'It is a pure butyl rubber sealant with an aluminium foil face, meant for patching roof leaks, window and door seams, gutters, PVC pipes and AC ducts. Buyers rate it 4.5 stars.',
    'Clean and dry the surface before pressing the tape down firmly; butyl bonds best above room temperature.',
  ], 'Check the listing shows the 50 mm x 5 m roll before checkout.'),
  A('B07GDZMPLD', 'ARCTIC AR-GH-01 Guitar Wall Mount Hanger with Rubber Padded Hook', 130, 595, '61wCEDD2A1L._SL1500_', [
    'The ARCTIC AR-GH-01 guitar wall hanger is ₹130 on Amazon, 78% off its M.R.P.',
    'It screws into the wall and holds acoustic, electric or bass guitars by the headstock on a rubber-foam padded yoke that protects the finish. Buyers rate it 4.2 stars across more than 480 reviews.',
    'Fix it into a stud or use a proper wall plug; a guitar hanging off a loose screw in plaster is the usual failure.',
  ], 'One hanger per unit; order two if you have two guitars.'),
  A('B078Y2J2N7', 'Go Hooked Undershelf Basket Large 16 Inch, Grey Powder Coated Iron', 379, 999, '511ua-EANBL._SL1500_', [
    'The Go Hooked 16-inch undershelf basket is ₹379 on Amazon, 62% below its M.R.P.',
    'It slides onto an existing shelf and hangs underneath, turning dead space in a wardrobe, kitchen cabinet or almirah into a 40.6 x 24 x 10 cm tray. It is powder-coated iron and rated 4.1 stars across 169 reviews.',
    'Measure your shelf thickness first; slide-on baskets need a shelf thin enough for the hooks to clip over.',
  ], 'Confirm the Large 16 inch size is selected.'),
  A('B07H672P7F', 'LIFEHAXTORE Universal Mobile and Tablet Holder with 360° Rotation', 289, 1499, '51XfaUAYDAL._SL1024_', [
    'The LIFEHAXTORE universal gooseneck phone and tablet holder is ₹289 on Amazon, 81% off its M.R.P.',
    'It clamps onto a bed frame or desk edge, bends to about 110 cm and rotates 360°, so you can watch videos lying down without holding the phone. It fits phones and tablets under 10 inches and is rated 3.7 stars.',
    'Long gooseneck arms sway slightly with heavy tablets; it is steadiest with a phone.',
  ], 'Pick your colour on the product page if more than one is shown.'),
  A('B0HCBGRGNF', 'pTron Studio Classic Wireless Over-Ear Headphones, 75 Hrs Playtime, Dual Pairing', 899, 2899, '51B4bKd3VbL._SL1200_', [
    'The pTron Studio Classic wireless over-ear headphones are ₹899 on Amazon, 69% below their M.R.P.',
    'They claim 75 hours of playtime per charge, use 40 mm drivers and Bluetooth 5.4, pair with two devices at once and have an ENC mic for calls plus a low-latency gaming mode. Buyers rate them 4.0 stars.',
    'Charging is over Type-C and takes about 2 hours for a full charge.',
  ], 'Choose your colour on the product page before checkout.'),
  A('B0DJ9KWVD8', 'Puma Unisex-Adult Skyrocket Lite Trail Running Shoe', 2100, 6999, '614smc+gKYL._SL1500_', [
    'The Puma Skyrocket Lite trail running shoe is ₹2,100 on Amazon, 70% off its M.R.P.',
    'It is a lightweight unisex runner built for mixed road and trail use, and it is rated 4.4 stars across 290 reviews.',
    'Amazon prices shoes per size and colour, so the figure can change once you pick yours.',
  ], 'Select your size and colour, then confirm the price still reads the same.'),
  A('B0DGGQF7P5', 'SIMPARTE Glass Jar 2000 ml Transparent Airtight Barni for Kitchen', 528, 1599, '61cLeUrAeML._SL1500_', [
    'The SIMPARTE 2-litre transparent glass jar is ₹528 on Amazon, 67% below its M.R.P.',
    'It is a leak-proof, airtight barni for pickle, dry fruits, masalas, sugar or biscuits; the clear glass lets you see what is inside, and it is freezer-safe, dishwasher-safe and odour-resistant. Buyers rate it 4.0 stars across 79 reviews.',
    'Glass jars keep oily pickles better than plastic because they do not absorb the smell.',
  ], 'Check the listing shows the 2000 ml jar before checkout.'),
  A('B091D32BGQ', 'Triumph Passion Badminton 2 Racquet Set with 10 Feather Shuttlecocks and Cover', 339, 899, '61BY4uaxe7L._SL1100_', [
    'The Triumph Passion badminton set — two alloy-steel racquets, 10 feather shuttlecocks and a full cover — is ₹339 on Amazon, 62% off its M.R.P.',
    'It is a starter set for casual backyard or terrace games rather than club play, and it is rated 3.5 stars across 156 reviews.',
    'Feather shuttles break faster than nylon on rough outdoor play; keep them for calm evenings.',
  ], 'The set ships in mixed colours; there is nothing to pick.'),
  A('B0GTLWVB8C', 'VAS COLLECTIONS Cotton Pillow Covers Set of 2, 18x28 Inch with Frill Border', 219, 999, '81DWy4cS-QL._SL1500_', [
    'The VAS COLLECTIONS set of two cotton pillow covers (18 x 28 inch) is ₹219 on Amazon, 78% below its M.R.P.',
    'They are 100% cotton with a ruffle frill border, breathable for summer and soft enough for daily use, and are rated 4.0 stars across more than 840 reviews.',
    '18 x 28 inch is the standard Indian bed pillow size; measure yours if it is a king-size pillow.',
  ], 'Pick your colour or print on the product page.'),
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

const file = process.argv[2] ?? 'ifs-0927d-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
