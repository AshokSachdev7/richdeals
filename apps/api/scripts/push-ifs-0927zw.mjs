// DEAL-INGEST indiafreestuff tick 2026-09-27zw
//
// Sweep: homepage + /deals 1-3, 37 new slugs. Dropped 2 before resolve (Lotus gel creme already live from TG 27zt, Christmas
// plush). Resolved 35 via the base64 ?rto= Buy Now; 3 productIds already live (JVX jeans, ALYNE boyshorts, Symbol night suit),
// skipped so the bulk upsert cannot rewrite their slugs. Every Amazon price re-read on the PDP in the logged-in tab (.priceToPay,
// M.R.P., #availability, add-to-cart, rating); Flipkart via ld+json; Myntra via the PDP state JSON. 13 pass, 19 rejected.
// Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  // Myntra goes through InRDeals (Cuelinks is deactivated for Myntra)
  Myntra: (id) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(`https://www.myntra.com/${id}`)}`,
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
const M = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Myntra', productId, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const DEALS = [
  A('B08TM6XQ46', 'adidas Men Clear Factor M Running Shoe', 1443, 3799, '71t4kM+QdfL._SL1500_', [
    'The adidas Clear Factor M running shoe for men is ₹1,443 on Amazon, 62% below the M.R.P.',
    'It is an everyday road runner with a mesh upper and a cushioned foam midsole, built for walks, gym sessions and easy runs rather than racing. Buyers rate it 4.1 stars across 900+ reviews.',
    'Stock is thin in some sizes; if yours shows a higher price, that size is being sold by a different seller.',
  ], 'Pick your UK size; the price differs by size and colour.'),
  A('B0CB334CC5', 'Amazon Brand Symbol Men Cotton Rich Heavy Weight Crew Neck Sweatshirt, Regular Fit', 379, 1999, '71D1uhpmVcL._SL1500_', [
    "Symbol's heavyweight crew-neck sweatshirt for men is ₹379 on Amazon, 81% off the M.R.P.",
    'It is a cotton-rich fleece pullover cut in a regular fit, warm enough for early-winter mornings and for layering under a jacket. Buyers rate it 3.9 stars.',
    'Heavyweight fleece shrinks a little in a hot wash; wash cold and dry in shade.',
  ], 'Pick your size and colour; the price can differ by size.'),
  A('B09YRXZZMM', "Amazon Brand Symbol Men's Cotton High Neck Sweatshirt, Plus Sizes Available", 599, 2399, '71wv55SNenL._SL1500_', [
    "Symbol's cotton high-neck sweatshirt for men is ₹599 on Amazon, 75% below the M.R.P.",
    'The raised neck keeps the throat warm without a scarf, and it comes in sizes up to plus. Buyers rate it 3.9 stars across nearly 900 reviews.',
    'Worth buying before winter demand pushes sweatshirt prices back up in November.',
  ], 'Pick your size and colour; the price can differ by size.'),
  A('B0FV31X9MG', "Amazon Brand Symbol Men's Cotton Rich Zipper Polo T-Shirt, Half Sleeves, Regular Fit", 449, 1199, '71i8+oaIYFL._SL1500_', [
    "Symbol's zipper-collar polo for men is ₹449 on Amazon, 63% off.",
    'It is a plain cotton-rich half-sleeve polo with a short zip placket instead of buttons, cut in a regular fit. Buyers rate it 4.1 stars.',
    'The zip collar looks smarter than a round-neck tee for casual office days.',
  ], 'Pick your size and colour; the price can differ by size.'),
  A('B0D3HRCP3V', 'BlissClub Zip-Up Sports Bra with Front Zip, Adjustable Straps and Removable Cups', 1199, 2399, '61A73bqPGWL._SL1500_', [
    'The BlissClub front-zip sports bra is ₹1,199 on Amazon, half its M.R.P.',
    'A front zip makes it easy to put on and take off after a sweaty workout, the straps adjust and the cups come out for washing. Buyers rate it 3.7 stars.',
    'Front-zip bras fit firm; check the brand size chart against your underbust measurement.',
  ], 'Pick your size and colour; the price can differ by size.'),
  A('B0G48KDVHW', 'boAt Airdopes 138 Gen 2 TWS Earbuds, 13mm Drivers, 70H Battery, ENx, Carbon Black', 890, 2990, '51ngeolR8NL._SL1000_', [
    'boAt Airdopes 138 Gen 2 earbuds are ₹890 on Amazon, 70% below the M.R.P.',
    'They use 13 mm drivers, claim up to 70 hours of total playback with the case, and add ENx noise reduction for calls plus a low-latency mode for games. Buyers rate them 3.7 stars.',
    'The 70-hour figure counts case recharges; a single charge of the buds lasts far less.',
  ], 'Confirm the Carbon Black colour is selected.'),
  A('B0F881HSBV', 'Juarez JJ10GR Harmonica, 10-Hole Diatonic in C Key, Green', 192, 690, '61xbipYhLqL._SL1500_', [
    'The Juarez JJ10GR 10-hole harmonica in C is ₹192 on Amazon, 72% off.',
    'C is the key most beginner harmonica lessons and songbooks are written for, which makes this a sensible first instrument. Buyers rate it 4.1 stars across 430+ reviews.',
    'A pocket-sized gift for kids or anyone who wants to try an instrument without a big spend.',
  ], 'Confirm the green C-key model is selected.'),
  A('B07G4DKT5G', 'Larah by Borosil Mimosa Fluted Opalware Pudding Set, 5 Pieces, White', 342, 665, '51LknGGm68L._SL1000_', [
    'The Larah by Borosil Mimosa fluted 5-piece pudding set is ₹342 on Amazon, 49% off.',
    'It is white opalware with a fluted edge, safe in the microwave and dishwasher. Buyers rate it 4.3 stars.',
    'Opalware is lighter and more chip-resistant than ceramic, which makes it a practical festive gift.',
  ], 'Confirm the Mimosa 5-piece pudding set is selected.'),
  A('B083Y46JG2', 'Larah by Borosil Opalware Veg Bowl, Set of 6, White', 313, 565, '71PlM6NUUSL._SL1500_', [
    'A set of six Larah by Borosil opalware veg bowls is ₹313 on Amazon, 45% below the M.R.P.',
    'The plain white bowls are sized for dal, sabzi or raita and go in the microwave and dishwasher. Buyers rate them 4.2 stars across 1,500+ reviews.',
    'Opalware survives daily use better than ceramic, so it works as an everyday set.',
  ], 'Confirm the set of 6 is selected.'),
  A('B0GWD8ZBMP', 'Noise ALT Buds S TWS Earbuds, 45H Playtime, Quad Mic ENC, Dual Pairing, Chosen White', 1499, 1899, '51FYTC0DpnL._SL1500_', [
    'Noise ALT Buds (S) are ₹1,499 on Amazon.',
    'They claim 45 hours of total playback, use four mics with ENC for clearer calls and pair with two devices at once. Buyers rate them 3.9 stars.',
    'Dual pairing lets one set switch between your phone and laptop without re-pairing.',
  ], 'Confirm the Chosen White colour is selected.'),
  A('B0BS3HKX58', 'POPWINGS Floral Printed Sleeveless Maxi Fit and Flare Dress for Women', 159, 1299, '71a35evaUVL._SL1500_', [
    'The POPWINGS floral sleeveless maxi dress is ₹159 on Amazon, 88% off the M.R.P.',
    'It is a light floral-print fit-and-flare maxi for warm days and casual outings. Buyers rate it 4.2 stars across nearly 300 reviews.',
    'Few pieces are left at this price and it usually applies to only some sizes and prints.',
  ], 'Pick your size and print; the price differs by size.'),
  A('B0FP4QXWWY', "Samfor Men's Corduroy Pants, Relaxed Fit, Stretch Waist", 399, 2999, '71EqqfXr8jL._SL1500_', [
    "Samfor's relaxed-fit corduroy trousers for men are ₹399 on Amazon, 87% below the M.R.P.",
    'They have a stretch waist for all-day comfort and a relaxed cut for weekends and casual office days. Buyers rate them 3.6 stars across 1,100+ reviews.',
    'Corduroy is heavier than chino cotton, so it suits cooler months better than summer.',
  ], 'Pick your waist size and colour; the price can differ by size.'),
  M('23315822', 'Sonata Men Digital Multi-Function Watch 77097PP01', 719, 2249, 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23315822/2023/6/26/1de71023-7c92-44f2-bb7a-ce24ef1494461687765334969SonataMenRegularStrapsDigitalMultiFunctionWatch77097PP011.jpg', [
    'The Sonata 77097PP01 digital multi-function watch for men is ₹719 on Myntra, 68% off.',
    "It is a digital sports-style watch from Titan's Sonata brand on a regular strap. Buyers rate it 4.3 stars on Myntra.",
    'A dependable everyday or gym watch at a price where scratches do not matter.',
  ], 'There is one size; confirm model 77097PP01 is shown.'),
];

const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|assets\.myntassets\.com\/h_1440,q_90,w_1080\/\S+)$/;
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

const file = process.argv[2] ?? 'ifs-0927zw-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
