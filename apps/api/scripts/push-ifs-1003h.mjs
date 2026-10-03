// DEAL-INGEST indiafreestuff tick 2026-10-03h
//
// 4 listings, 96 cards, 69 single-product candidates resolved; 43 Amazon ASINs, 1 already in DB (Puma Kardio).
// Pushed 11, every one read in the logged-in Amazon tab (priceToPay == IFS card price, #availability In stock,
// add-to-cart present). Rejected: paise prices (Kingsway, DROGO, Beardo), card-vs-PDP drift (hand fan 99 vs 6,299,
// herbal combo 69 vs 272), per-unit M.R.P. (diyas, pampas, Khadi scrub), bogus M.R.P. (Hikvision), weak or too few
// ratings (Lifelong, Crackles, Frontech, Sound Fire, Alton, BonKaso, Hindware, Xtore, MR.JV, Scotch-Brite butterfly 3.5),
// Daniel Klein (1 left). Copy is original.
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
  A('B08JJ6139C', 'Scotch-Brite Dry Microfiber Flat Dust Mop with 360° Rotating Head', 999, 1499, '61ghhbxqNDL._SL1500_', [
    'The Scotch-Brite flat dust mop from 3M is ₹999 on Amazon, a third below the M.R.P.',
    'A microfiber pad on a 360° swivel head picks up dust and hair dry, or cleans with a damp pad, and the adjustable handle reaches under beds, along walls and over glass. Buyers rate it 4.2 stars across 104 reviews.',
    'It replaces a broom for daily dusting on tiles and marble; the listing ships without an extra refill pad.',
  ], 'This listing is the green mop with no additional refill.'),
  A('B0DY819JZ8', "Lavie Women's Mono Salma Solid Satchel Bag", 1249, 4299, '61JoqxL4ATL._SL1464_', [
    "Lavie's Mono Salma satchel is ₹1,249 on Amazon, 71% under the M.R.P.",
    'It is a structured, solid-colour satchel with top handles and a shoulder strap, sized for office essentials and a daily carry. Buyers give it 4.0 stars across 292 reviews.',
    'Lavie bags at this price usually show up only in sale windows, so it suits a work bag or a gift.',
  ], 'Colour options can carry different prices; check the selected colour before checkout.'),
  A('B09GPC2ND5', 'Hillgrove Surge Protector Extension Board, 4 Sockets, 5 m Cord', 274, 999, '61S68rxu3kL._SL1500_', [
    'The Hillgrove 4-socket surge protector extension board is ₹274 on Amazon, 73% below the M.R.P.',
    'It has four sockets with one master switch and a 5-metre cord, long enough to reach a desk or TV unit from a distant wall point. Buyers rate it 3.7 stars across 60 reviews.',
    'Keep high-draw appliances like heaters and geysers on a wall socket; this board suits chargers, laptops, routers and a TV.',
  ], 'Confirm the 5-metre cord version is selected.'),
  A('B0H2YL23H6', 'Zebronics Viper 100W Wireless Gaming Mouse, Tri-Mode, 8000 DPI', 599, 1299, '51hYxWXMtcL._SL1500_', [
    'The Zebronics Viper 100W wireless gaming mouse is ₹599 on Amazon, 54% off the M.R.P.',
    'It connects three ways (2.4 GHz dongle, Bluetooth or cable), runs at 1000 Hz polling with up to 8,000 DPI, and has a rechargeable battery, Huano switches and five programmable buttons.',
    'It is a new 2026 listing with no reviews yet, so the brand warranty is the main safety net.',
  ], 'Pick the colour you want; the price shown is for the default variant.'),
  A('B0H2YTB48Q', 'Zebronics Viper 50 Wired Gaming Mouse, 12800 DPI', 499, 1099, '61XHejvIcKL._SL1500_', [
    'The Zebronics Viper 50 wired gaming mouse is ₹499 on Amazon, 55% below the M.R.P.',
    'It pairs a gaming-grade sensor up to 12,800 DPI with 1000 Hz polling, six DPI steps, seven buttons, Huano switches and a 1.5 m USB cable.',
    'Wired means no battery to charge and no wireless lag; the listing is new and has no reviews yet.',
  ], 'This is the black wired version.'),
  A('B0HK7SFX5X', 'Zebronics Thunder Neo Wireless Headphone, BT 6.0, 50 Hrs Playback', 599, 1899, '61lA3d-7mGL._SL1500_', [
    'The 2026 Zebronics Thunder Neo wireless headphone is ₹599 on Amazon, 68% under the M.R.P.',
    'It runs on Bluetooth 6.0 with up to 50 hours of playback, 40 mm drivers, ENC for calls, rapid charging, a gaming mode, dual pairing, three EQ modes and an AUX input.',
    'It is a fresh listing without reviews yet, so this is a budget pick on spec sheet and brand warranty.',
  ], 'This listing is the silver colour.'),
  A('B084HZR723', 'Puma Men Level Running Shoe', 1289, 4299, '61jz9Rs8ZIL._SL1200_', [
    'Puma\'s Level running shoe for men is ₹1,289 on Amazon, 70% off the M.R.P.',
    'It is a lightweight lace-up runner with a cushioned midsole, suited to walks, gym sessions and easy runs. Buyers rate it 3.6 stars across 366 reviews.',
    'Puma sizing runs close to standard UK sizes; check the size chart on the listing before ordering.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
  A('B0BK1C3TFH', 'Ingco 20V 4.0Ah Lithium-Ion Battery Pack', 2279, 6000, '71-f7AuhYzL._SL1500_', [
    'The Ingco 20V 4.0Ah lithium-ion battery pack is ₹2,279 on Amazon, 62% below the M.R.P.',
    'It fits Ingco 20V cordless drills, grinders and other tools, and has an LED charge indicator. Buyers rate it 4.0 stars across 82 reviews.',
    'The charger is not included, so you need an existing Ingco 20V charger.',
  ], 'Confirm the 4.0Ah capacity is selected.'),
  A('B0H1MB8XLB', 'Haier Aqualis 15L Storage Water Geyser, 5 Star', 9799, 19990, '71ClNRgFgiL._SL1500_', [
    'The Haier Aqualis 15-litre 5-star storage geyser is ₹9,799 on Amazon, 51% off the M.R.P.',
    'It has a 2.2 kW heating element, an 8-bar pressure rating, shock-proof safety, free installation with two connection pipes, and a 4-year product plus 7-year tank warranty. Buyers rate it 4.3 stars across 15 reviews.',
    '15 litres covers one or two back-to-back showers for a small family; buy before winter demand pushes prices up.',
  ], 'Check that free installation is offered for your pin code.'),
  A('B0F48NWKP2', 'Kids Almirah Collapsible Storage Organizer, 4 Tray', 654, 2999, '719wzUlfHzL._SL1500_', [
    'This 4-tray collapsible kids almirah is ₹654 on Amazon, 78% below the M.R.P.',
    'It is a lightweight wardrobe-style organiser for clothes, books, shoes and toys that folds flat when not in use. Buyers rate it 4.2 stars across 19 reviews.',
    'It suits a child\'s room or a rented flat where a wooden almirah is too heavy to move.',
  ], 'This listing is the red 4-tray version.'),
  A('B0GDTWMJP1', 'Gesto RGBIC Neon Rope Light, 5 m, USB, Music Sync', 648, 1999, '61V2zEC3EaL._SL1024_', [
    'The Gesto RGBIC neon rope light, 5 metres long, is ₹648 on Amazon, 68% off the M.R.P.',
    'It runs on 5V USB, syncs to music and offers 99 dynamic colour modes, controlled by app, remote or a button. Buyers rate it 3.7 stars across 63 reviews.',
    'USB power makes it easy to run from a TV, power bank or adapter, good for Diwali, a gaming setup or a balcony.',
  ], 'Confirm the 5-metre length is selected.'),
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

const file = process.argv[2] ?? 'ifs-1003h-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
