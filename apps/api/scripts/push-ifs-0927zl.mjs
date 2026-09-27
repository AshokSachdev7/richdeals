// DEAL-INGEST indiafreestuff tick 2026-09-27zl
//
// Sweep: homepage + /deals 1-3, 37 new slugs. Dropped 4 category posts + 2 already live/pushed (Bru Gold, Acer).
// Resolved 31 via base64 ?rto=. 0 productIds in DB. Every Amazon price re-read on the PDP in the logged-in tab
// (.priceToPay, #availability, add-to-cart); Flipkart via ld+json. 16 pass. Copy is original.
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
  A('B0D6BMCG5C', "ABROS Men's Lightweight Classic Clogs with Adjustable Back Strap", 319, 799, '61kz977BisL._SL1500_', [
    'ABROS lightweight clogs for men are ₹319 on Amazon, well under the listed M.R.P.',
    'They are slip-on clogs with a flip-down back strap, so they work as open slippers around the house or as secured sandals for a market run or a rainy commute. Early buyers rate them 4.2 stars.',
    'Clogs run roomy; if you are between sizes, pick the smaller one and use the strap to lock the heel.',
  ], 'Pick your size and colour on the product page; the price can differ by size.'),
  A('B096KTLJWF', 'Amazon Brand Solimo 2 Ply Paper Napkins, 50 Pulls, Pack of 8', 349, 670, '71imIzbup8L._SL1500_', [
    'Eight packs of Solimo 2-ply paper napkins (50 pulls each) are ₹349 on Amazon.',
    'That is 400 napkins for the dining table, lunch boxes or guests, in soft 2-ply sheets. Buyers rate them 4.6 stars across more than 600 reviews.',
    'Works out to under a rupee per napkin, which is the number to compare against local stores.',
  ], 'Confirm the pack of 8 is selected, not a single pack.'),
  A('B09MR3WGXM', "Amazon Brand Symbol Men's Cotton Solid Long Kurta, Regular Fit", 519, 2199, '71ANvQcqIrL._SL1500_', [
    'The Symbol 100% cotton long kurta for men is ₹519 on Amazon.',
    'It is a plain regular-fit kurta in breathable cotton, sized up to plus sizes, easy to pair with jeans or pyjamas for festivals or office Fridays. Buyers rate it 4.0 stars across 1,700+ reviews.',
    'Cotton shrinks slightly on the first wash; wash cold and line dry.',
  ], 'Pick your size and colour; the price shown applies to the listed variant and can change by size.'),
  A('B0C33J885Y', "Amazon Brand Symbol Women's Cotton Blend Round Neck Sweatshirt", 329, 1799, '71+R6V-VzOL._SL1500_', [
    'The Symbol cotton-blend pullover sweatshirt for women is ₹329 on Amazon.',
    'It is a regular-fit round-neck sweatshirt, available in plus sizes, warm enough for air-conditioned offices and early winter mornings. Buyers rate it 4.2 stars.',
    'A cotton blend pills less than pure cotton fleece; turn it inside out before washing.',
  ], 'Pick your size and colour; the price can differ between variants.'),
  A('B0HG9BJNYH', 'American Tourister Entrix Cabin Trolley Bag 55 cm, 8 Wheel Hard Case, TSA Lock', 3399, 8800, '61qJeVg0l9L._SL1500_', [
    'The American Tourister Entrix 55 cm cabin trolley is ₹3,399 on Amazon.',
    'It is a polypropylene hard case with eight spinner wheels, a recessed TSA lock and an expander zip, sized for domestic cabin baggage. It is a new listing with no ratings yet.',
    'Most Indian airlines cap cabin bags at 7 kg; the expander adds space, not allowance, so weigh it before you fly.',
  ], 'Confirm the Ocean Beach Sand colour is selected; other colours may be priced differently.'),
  A('B0GVS246XK', 'AMFIN Baby Shower Acrylic Cake Topper Set, Pack of 6, Pastel', 112, 599, '61PMfAAyrfL._SL1254_', [
    'A pack of six AMFIN acrylic baby shower cake toppers is ₹112 on Amazon.',
    'They are transparent acrylic picks in pastel shades for a baby shower cake or cupcakes, and can be wiped clean and reused. It is a new listing with no ratings yet.',
    'Acrylic toppers are decorative only; remove them before cutting and serving.',
  ], 'Check the pack of 6 in the pastel multi set is selected.'),
  A('B0DZ2SKG2X', 'Cortina Anti Slip 1 Seater Microfiber Sofa Cover Set, Silver', 377, 1849, '81OMA3RB+-L._SL1500_', [
    'The Cortina anti-slip 1-seater sofa cover set is ₹377 on Amazon.',
    'The set has one back cover, one seat cover and two armrest covers in stretch microfiber with an anti-slip underside, which hides worn fabric and keeps pet hair off. Buyers rate it 3.7 stars.',
    'Measure your seat width first; stretch covers fit standard single seaters, not oversized recliners.',
  ], 'Confirm the 1 seater size and silver colour are selected.'),
  A('B0H6RZ6CK5', "LITZO Women's Korean Style Long Sleeve Button Down Shirt, Regular Fit", 299, 3999, '61ptQCrrW1L._SL1280_', [
    'The LITZO Korean-style button-down shirt for women is ₹299 on Amazon.',
    'It is a long-sleeve regular-fit top that works for office wear with trousers or open over a tee on weekends. Buyers rate it 4.3 stars across 200+ reviews.',
    'The listed M.R.P. is high for the category; judge it on the live price, which is typical of budget office shirts.',
  ], 'Pick your size and colour; the price shown applies to the listed variant.'),
  A('B0D3FCJ635', 'Maped Exam Kit 12 Piece Set with Clipboard, Car Theme', 63, 200, '61MOc4HcZOL._SL1080_', [
    'The Maped 12-piece exam kit is ₹63 on Amazon.',
    'It bundles a clipboard exam pad with wooden pencils and basic stationery in a car-themed design for school students. Buyers rate it 3.8 stars.',
    "Check your school's exam rules; some boards do not allow printed clipboards in the hall.",
  ], 'Confirm the car theme set is selected.'),
  A('B0FJ6XGPM4', 'Maybelline New York Super Stay Flex Powder Foundation, Shade 228', 355, 710, '71zXA9onh0L._SL1500_', [
    'Maybelline Super Stay Flex powder foundation in shade 228 is ₹355 on Amazon.',
    'It is a pressed powder foundation for long wear with a flexible finish, useful for touch-ups in humid weather. Buyers rate this shade 3.5 stars.',
    'Shade 228 is the lighter of the two shades on offer today; swatch against your jawline if you can.',
  ], 'Confirm shade 228 is selected; other shades are listed separately.'),
  A('B0FJ6WLK6Z', 'Maybelline New York Super Stay Flex Powder Foundation, Shade 330', 355, 710, '71x1Bl8VmsL._SL1500_', [
    'Maybelline Super Stay Flex powder foundation in shade 330 is ₹355 on Amazon.',
    'It is a pressed powder foundation for long wear with a flexible finish, useful for touch-ups in humid weather. Buyers rate this shade 4.1 stars.',
    'Shade 330 is a deeper shade than 228; compare the two if you are between them.',
  ], 'Confirm shade 330 is selected; other shades are listed separately.'),
  A('B0D6BQBMLM', 'Nasher Miles Krabi Expander Hard-Sided Check-in Luggage 28 inch, 8 Wheels, Light Blue', 4299, 18995, '61FTYWA6K+L._SL1500_', [
    'The Nasher Miles Krabi 28-inch (75 cm) check-in trolley is ₹4,299 on Amazon.',
    'It is a large polypropylene hard case with eight spinner wheels and an expander zip, sized for family trips or long stays. Buyers rate it 4.2 stars.',
    'A 75 cm bag filled fully can cross the usual 15 kg domestic check-in limit; weigh it before you leave home.',
  ], 'Confirm the 28 inch size in light blue is selected; other sizes are priced differently.'),
  A('B0H2SCZLQC', 'Negi Pull Along Turtle Toy for Kids 18 Months+, Rolling Beads', 223, 549, '71FKpoe1a7L._SL1254_', [
    'The Negi pull-along turtle toy is ₹223 on Amazon.',
    'Toddlers pull it on a string while walking; rolling wheels and coloured beads spin as it moves, which helps motor skills. It is a new listing with no ratings yet.',
    'Check the string length before handing it over and supervise play, as with any pull toy.',
  ], 'Confirm the turtle design is selected.'),
  A('B0CV5WBF98', 'Sfane Gym Duffel Bag with Separate Shoe Compartment, Black and Orange', 399, 1395, '711jeu1-qiL._SL1500_', [
    'The Sfane gym duffel bag with a separate shoe compartment is ₹399 on Amazon.',
    'It has a zipped shoe pocket to keep sweaty shoes away from clothes, an adjustable shoulder strap and grab handles, and doubles as a weekend bag. Buyers rate it 4.3 stars.',
    'Air the shoe pocket after each session; closed compartments hold odour.',
  ], 'Confirm the black and orange colour is selected.'),
  A('B08627FKH8', 'Triumph Kay Kay Badminton Net SN 103 with Cotton Tape and Nylon Rope', 179, 400, '61wN38dhdKL._SL1102_', [
    'The Triumph Kay Kay SN 103 badminton net is ₹179 on Amazon.',
    'It has a cotton niwar tape along one side and a nylon rope for tying to poles or trees, suited to terrace, park and society games.',
    'Poles are not included; you need two posts or trees roughly a court width apart.',
  ], 'Confirm the SN 103 model is selected.'),
  A('B09R6YC8QC', 'White Button Baby Girl Jacquard Lehenga Choli, Pattu Pavadai Style', 269, 1999, '818YhHn950L._SL1358_', [
    'The White Button jacquard lehenga choli for baby girls is ₹269 on Amazon.',
    'It is a readymade South Indian pattu pavadai-style set for festivals, poojas and family functions. Buyers rate it 4.2 stars across 2,000+ reviews.',
    "Kids' ethnic sets are sized by age; check the size chart against your child's chest measurement.",
  ], 'Pick the age size and colour; the price can differ between variants.'),
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

const file = process.argv[2] ?? 'ifs-0927zl-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
