// DEAL-INGEST indiafreestuff tick 2026-10-03w
//
// 4 listings, 96 cards, 43 new slugs, 29 single-product candidates resolved; VM BOND rack already LIVE (#12435).
// Pushed 9, each read live (Amazon in the logged-in tab twice: priceToPay == card, #availability In stock, add-to-cart;
// Flipkart via ld+json InStock + price == card). Rejected: paise prices (Black+Decker car fridge, BabyMoon knee pads),
// card-vs-PDP drift (Kratos neckband 399 vs 349, Soni stamp pad, Kerala saree, Rhythm mattress 100 vs 830), bogus ₹4,999
// M.R.P. on no-name trousers (3 listings), weak/no ratings (body scrubber, DH-1106, Wonderchef mug, lunch bag, Just Herbs,
// lipstick, BlissClub), low stock / no price (Haute Sauce watch, KOTTY jacket), AKIA CCA wire (3.5, aluminium sold as
// "copper wire"). Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com/${d.itm}?pid=${d.productId}&affid=djhackraj`,
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
const F = (productId, itm, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, itm, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const DEALS = [
  A('B0GQSZ4KWW', 'Borosil Best 4.5 L Air Fryer, 1380W, Black', 3759, 7990, '612Nl0cj2ML._SL1000_', [
    "Borosil's Best 4.5-litre air fryer is ₹3,759 on Amazon, 53% under the M.R.P.",
    'It is a 1380W four-in-one unit that fries, grills, bakes and roasts up to 200°C, with a 60-minute timer and auto shut-off, a non-stick pan with a stay-cool handle, and a safety cut-off that stops heating when the pan is pulled out. Buyers rate it 4.2 stars across 75 reviews.',
    'A 4.5 L basket suits a family of three or four, and Borosil covers it with a 2-year warranty.',
  ], 'This listing is the black 4.5-litre model.'),
  A('B0FCSGG5P2', 'ZEISS Lens Wipes with 70% Alcohol, 20 Count', 129, 249, '61J5lJvkLtL._SL1500_', [
    'ZEISS pre-moistened lens wipes are ₹129 on Amazon, 48% off the M.R.P.',
    'Each wipe is a cellulose tissue soaked in a 70% alcohol solution that dries fast and leaves no streaks, and it is safe on anti-reflective coatings. They work on spectacles, camera lenses, and binoculars. Buyers rate them 4.4 stars across 2,361 reviews.',
    'Individually sealed wipes fit in a wallet or camera bag, which makes them handier than a spray bottle on the go.',
  ], 'Check the pack count on the listing before checkout.'),
  A('B0GV76DB3Y', "Men's Cotton Cargo Pants, Relaxed Fit, Multi-Pocket", 599, 1499, '41B8I6UoO3L._SL1024_', [
    "These men's cotton cargo pants are ₹599 on Amazon, 60% below the M.R.P.",
    'They are solid cotton utility trousers with a straight, relaxed fit, a pull-on drawstring waist and multiple cargo pockets, made in India and machine-washable. Buyers rate them 3.6 stars across 123 reviews.',
    'Cargos at this price suit travel, treks and weekend wear; check the size chart, as relaxed fits run loose.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
  A('B0FKB46S1P', 'Nivia Aero Unisex Sports Cap, Adjustable', 179, 599, '51K69AQlK-L._SL1500_', [
    "Nivia's Aero unisex sports cap is ₹179 on Amazon, 70% off the M.R.P.",
    'It has a dobby-weave crown with mesh vent zones for airflow during runs and matches, and an adjustable strap so one size fits most heads. Buyers rate it 3.6 stars across 719 reviews.',
    'It is a light, machine-washable cap from an Indian sports brand, handy for morning runs, cricket and travel in the sun.',
  ], 'Price is for the colour shown; other colours can be priced differently.'),
  A('B0F1Y5PNCZ', 'Ceptics 3-in-1 Universal Travel Adapter with 2 USB Ports, White', 449, 999, '61l8sr+RKiL._SL1500_', [
    'The Ceptics 3-in-1 universal travel adapter is ₹449 on Amazon, 55% under the M.R.P.',
    'It takes one universal plug input plus two 2.4A USB-A ports, ships with Type A, I and C plug options, and works on 100–250V with surge protection and a child safety lock. Buyers rate it 4.3 stars across 12,087 reviews, and it carries a 3-year warranty.',
    'Note that it is a plug adapter, not a voltage converter: check that high-wattage appliances like hair dryers are rated for the local voltage before plugging in abroad.',
  ], 'This listing is the white 3-in-1 model.'),
  A('B0CQM9NKFZ', "Amazon Brand Symbol Premium Men's Leather Derby Shoes", 1199, 4999, '61m8ehwQJmL._SL1500_', [
    "Symbol Premium's leather derby shoes for men, from Amazon's own brand, are ₹1,199 on Amazon, 76% below the M.R.P.",
    'They have a leather upper, lace-up derby styling, a flat EVA sole and a made-in-India build, sitting between formal and smart-casual. Buyers rate them 3.5 stars across 354 reviews.',
    'Derbies work with chinos as well as trousers; they are not water-resistant, so keep them off rainy commutes.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
  A('B0CQM93DRW', "Amazon Brand Symbol Premium Men's Leather Oxford Formal Shoes", 1199, 4699, '71U8LoQBt-L._SL1500_', [
    "Symbol Premium's leather oxford formal shoes for men are ₹1,199 on Amazon, 74% off the M.R.P.",
    'They have a leather upper, closed oxford lacing and a block heel on a Thunit sole, built for office wear and functions. Buyers rate them 3.8 stars across 168 reviews.',
    'Oxfords are the more formal choice of the two Symbol styles in this sale; check the size chart before ordering.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
  F('ACCHM8NJQG83Z6BB', 'motorola-68-w-gan-6-5-a-single-port-mobile-charger-detachable-cable/p/itm100aaf0d61545',
    'MOTOROLA 68W GaN Single Port Mobile Charger with Detachable Cable', 1549, 6999,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/battery-charger/p/c/b/-original-imahnfvkpp7wrthk.jpeg?q=70', [
    "Motorola's 68W GaN wall charger is ₹1,549 on Flipkart, 78% below the M.R.P.",
    'It is a single-port charger rated up to 6.5A, built on gallium nitride so it stays smaller and cooler than older silicon bricks of the same wattage, and it ships with a detachable cable. Buyers rate it 4.3 stars across 80 ratings.',
    'Phones only draw what they support, so the full 68W applies only to phones that support 68W charging; other phones still charge at their own rated speed.',
  ], 'This listing is the 68W single-port charger with cable.'),
  F('BKPHMKUWHBU6RNTF', 'gear-small-15-l-backpack-game-on-15-blue/p/itm599e852962e0e',
    'Gear GAME ON 15 L Small Backpack, Blue', 329, 1399,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/backpack/j/o/h/-resized-original-imahnq7mnggfkvg2.jpeg?q=70', [
    "Gear's GAME ON 15-litre backpack is ₹329 on Flipkart, 76% off the M.R.P.",
    'It is a lightweight 300 g polyester bag with a graphic print, two compartments, two pockets and a bottle pocket, sized at about 11 x 15 inches with a 6-inch depth. Buyers rate it 4.2 stars across 166 ratings.',
    'At 15 litres it suits a primary-school child or a light day trip; it has no laptop sleeve or rain cover.',
  ], 'This listing is the blue GAME ON print.'),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|assets\.myntassets\.com\/h_1440,q_90,w_1080\/\S+|rukmini1\.flixcart\.com\/image\/\d+\/\d+\/\S+\.jpe?g\?q=\d+)$/;
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

const file = process.argv[2] ?? 'ifs-1003w-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
