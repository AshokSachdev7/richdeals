// DEAL-INGEST indiafreestuff tick 2026-10-06a
//
// 96 new IFS slugs -> 55 after junk filter (category "upto X% off", bank-card, coupon, food, personal care).
// 45 resolved to Amazon ASINs, none in DB. PDP-verified (#centerCol price, add-to-cart, rating >= 3.5 on >= ~20
// reviews): 18 pass. Assembly Stark marble (B0CT2RCGMP) dropped: title says 20" cabin, bullets say 24" check-in.
// Myntra (Snitch, Kopa, Police) skipped: ld+json shows M.R.P. only / OutOfStock. Flipkart cards resolve to the
// /indiafreestuff/p/indiafreestuff placeholder, so there is no real /p/itm path to use.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const ONE = 'The link opens the exact listing we checked; pick another colour or size only if you want it, as variants can be priced differently.';
const az = (productId, name, price, mrp, img, stars, reviews, lead, p2, p3) => ({
  store: 'Amazon', productId, name, price, mrp,
  image: `https://m.media-amazon.com/images/I/${img}.jpg`,
  variant: ONE,
  description: [`${lead} is ₹${inr(price)} on Amazon, ${Math.round((1 - price / mrp) * 100)}% below M.R.P., rated ${stars} stars across ${inr(reviews)} reviews.`, p2, p3],
});
const DEALS = [
  az('B0DKJ64PBP', 'Mr. TRU Smart Grill Electric Sandwich Maker 800W', 999, 2599, '61NWci8PlRL._SL1080_', 4.1, 39,
    'The Mr. TRU Smart Grill 800W sandwich maker',
    'It has die-cast aluminium plates with a PFOA-free non-stick coating, so it grills and toasts without butter sticking to the plates.',
    'An automatic cut-off and LED indicator lights tell you when it is heated and when it is done, which suits quick weekday breakfasts.'),
  az('B09B57KGHV', 'Maharaj Mall 3-Speed Stainless Steel Electric Chopper 3L', 1395, 2999, '518FTYjteHL._SL1100_', 3.5, 77,
    "Maharaj Mall's 3-speed stainless steel electric chopper",
    'It uses a 304 stainless steel bowl of about 3 litres and four steel blades, so it handles onions, vegetables and minced meat in one batch.',
    'Three speed buttons switch between a coarse chop and a finer mince. The rating is middling at 3.5 stars, so read the recent reviews before ordering.'),
  az('B0FYFGJRVB', 'Zebronics 50W Bluetooth Tower Speaker with 10.16cm Subwoofer', 2499, 4499, '61lnAGswwNL._SL1500_', 3.7, 195,
    'The Zebronics 50W tower speaker',
    'It pairs a 10.16 cm subwoofer driver with two 7.62 cm full-range drivers in a two-way design, and connects over Bluetooth.',
    'At 3.7 stars the reviews are mixed, so read the recent ones before ordering.'),
  az('B094QBJHGQ', 'adidas Men Adiglide M Running Shoe', 1719, 4299, '71UWY+VcbML._SL1500_', 4.0, 1262,
    "adidas' Adiglide M running shoe for men",
    'It is an everyday running shoe for men.',
    'With more than a thousand reviews averaging 4 stars, it is a well-tested budget adidas runner. Check the size chart on the listing before you order.'),
  az('B0DBZL87XP', 'adidas Mens Snugpro M Running Shoes', 1599, 3999, '51+N1-916lL._SL1500_', 4.1, 89,
    "adidas' Snugpro M running shoe for men",
    'It is a running shoe for men.',
    'Prices and stock change by size on shoe listings, so confirm your size is still at this price before checking out.'),
  az('B0D1VGR73V', 'Amazon Brand Solimo Drawer Storage Box with Lid', 373, 1399, '71rF2+iZVFL._SL1500_', 4.0, 18,
    "Amazon Brand Solimo's drawer storage box",
    'It is a clothes organiser with a handle and a transparent lid that closes with Velcro, so you can see what is inside without opening it.',
    'The listing calls out moisture control, which suits folded clothes stored on a shelf.'),
  az('B0CWLBYH1K', 'CR18 Collection 3-Tier Metal Standing Rack', 399, 999, '51Vf-snZdnL._SL1111_', 3.8, 141,
    "CR18 Collection's 3-tier metal standing rack",
    'It is a powder-coated iron countertop rack with three tiers for spice jars and condiments.',
    'It is a free-standing rack, so it sits on the counter rather than mounting on a wall.'),
  az('B0H94K9DBW', 'BSB HOME Tufted Chair Pad Cushion with Tie Straps', 139, 799, '81PwoOV7yrL._SL1500_', 3.9, 132,
    "BSB HOME's tufted chair pad cushion",
    'It is a tufted seat cushion with tie straps that hold it to the chair so it does not slide.',
    'It makes hard dining or wooden chairs more comfortable to sit on.'),
  az('B0FHWVNVVK', 'HIKVISION Extreme 128GB microSDXC Memory Card', 1699, 3999, '61CWZmo9CnL._SL1500_', 4.1, 749,
    'The HIKVISION Extreme 128GB microSDXC card',
    'It is a Class 10, V30 card rated for up to 92 MB/s read and 50 MB/s write, suited to phones, cameras and CCTV recorders.',
    'The listing includes a 3-year warranty.'),
  az('B083TCRC56', 'AEROHAVEN Abstract Multicolour 4 Seater Table Runner', 150, 499, '81Y29EXBKtL._SL1357_', 4.1, 75,
    "AEROHAVEN's abstract multicolour table runner",
    'It is a synthetic-cotton runner with an HD digital print, sized 13 x 60 inches (about 32 x 150 cm) for a 4-seater dining table.',
    'The bright yellow abstract print suits a dining table that needs a single splash of colour.'),
  az('B09YRM7J1S', 'WLIVE Engineered Wood White TV Stand for 55 Inch TV', 4049, 24999, '71TnyZxEPrL._SL1500_', 4.3, 2214,
    "WLIVE's white engineered-wood TV stand for TVs up to 55 inches",
    'It has two cabinets with soft-close doors.',
    'It is one of the best-reviewed TV units in this price range, with more than 2,000 ratings.'),
  az('B0BCGNCL9L', "Janasya Women's Mustard Cotton Floral Print Flared Kurta", 349, 3949, '91xt8wJZrxL._SL1500_', 4.0, 127,
    "Janasya's mustard cotton floral-print flared kurta for women",
    'It is a cotton kurta with a flared silhouette and floral print, suited to daily and office wear.',
    'Kurta prices change by size, so confirm your size is at this price before checking out.'),
  az('B0BVB5H5WJ', 'Assembly Stark 20 Inch Cabin Trolley Bag', 2999, 5999, '51Eo1W6Kq3L._SL1500_', 4.4, 179,
    "Assembly's Stark 20-inch (55 cm) cabin trolley",
    'It is a hard-shell German polycarbonate suitcase with eight spinner wheels and a built-in combination lock.',
    'The cabin size packs roughly 2 to 3 days of clothes.'),
  az('B0FQ46J2PV', 'Assembly Oblique 20 Inch Cabin Trolley Bag', 3299, 7499, '61ZodgjCdbL._SL1500_', 4.4, 23,
    "Assembly's Oblique 20-inch cabin trolley",
    'It is a hard-shell suitcase with eight spinner wheels and a TSA-approved lock.',
    'It is rated 4.4 stars, though on only 23 reviews so far.'),
  az('B0D7QHXDVF', 'Assembly Rover 20 Inch Cabin Trolley Bag with Packing Cubes', 4499, 7499, '51K3K6-idsL._SL1440_', 4.2, 124,
    "Assembly's Rover 20-inch (55 cm) cabin trolley",
    'It is a hard-shell suitcase with a wide trolley handle and a TSA-approved lock.',
    'It ships with three packing organiser cubes for clothes, shoes and travel kit.'),
  az('B0F3JDBCQZ', 'Assembly Odyssey Pro 20 Inch Cabin Trolley Bag with Laptop Compartment', 4499, 8099, '61jUxuh2lsL._SL1440_', 4.3, 82,
    "Assembly's Odyssey Pro 20-inch (55 cm) cabin trolley",
    'It is a lightweight hard-shell suitcase with a laptop compartment and a TSA-approved lock.',
    'It ships with three packing organiser cubes.'),
  az('B0FRS8XN9N', 'Assembly Vintage 20 Inch Cabin Trolley Bag', 4499, 6599, '51ihlisoTCL._SL1440_', 4.2, 62,
    "Assembly's Vintage 20-inch (55 cm) cabin trolley",
    'It is a retro-styled hard-shell suitcase with eight silent spinner wheels.',
    'It has a TSA-approved lock.'),
  az('B07Z2217G2', "Olivia Burton Celestial Black Dial Women's Watch", 3979, 12000, '61Ot3lUnf2L._SL1000_', 4.1, 40,
    "Olivia Burton's Celestial women's analog watch",
    'It has a black glitter round dial under mineral glass, a quartz movement and an ionic-plated rose-gold stainless steel bracelet.',
    'Stock was down to the last unit when we checked, so it may sell out.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
    if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price} ${d.productId}`);
  }
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description: [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n'),
    howTo: [
      `Tap Grab Deal to open the ${d.name} on ${d.store} at the live price.`,
      d.variant,
      `Add to cart and check out. ${d.store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
      NO_COUPON,
    ],
    image: d.image, price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  if (Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, '')) !== row.price) throw new Error(`title/price ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1006a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
