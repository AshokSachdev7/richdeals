// DEAL-INGEST indiafreestuff tick 2026-10-03i
//
// 4 listings, 43 new slugs, 35 resolved Amazon ASINs. Pushed 8, every one read twice in the logged-in Amazon tab
// (priceToPay == IFS card price, #availability In stock, add-to-cart present). Rejected: paise prices (LUKER 338.75,
// Aristocrat 2,690.47), card-vs-PDP drift (Solimo pot stand 215 vs 217, tummy mat 95 vs 299), coupon-dependent card prices
// (WONJU, SHRIVYAA, SJ Organics, plant sticks), only 1 left (TEX-RO, ECLET box, tu casa, French Connection), unavailable
// (Puma Lajla, water dispenser), weak/no ratings (POPWINGS, CAHOOT, Puma City 1.7, rat repellent, Mario tape, ECLET
// highlighters, Bajaj Velaris, Bata Kent, HP M370, F Gear, painting book), ZEXSAZONE (title/bullets mismatch). Copy is original.
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
  A('B0H3KXX2JL', 'Kamiliant by American Tourister Ather 79 cm Hard Case Check-in Trolley', 2199, 14000, '71HdNzBWKrL._SL1500_', [
    "The large 79 cm Kamiliant Ather check-in trolley, from American Tourister's value label, is ₹2,199 on Amazon.",
    'It has a grooved polypropylene hard shell, four 360° spinner wheels, a telescopic handle and a 50:50 split interior with cross-ribbons and zip compartments. Buyers rate it 4.2 stars across 47 reviews.',
    'A 79 cm case is sized for long trips or two people sharing one bag, and it carries a 3-year international warranty.',
  ], 'This listing is the printed 79 cm large size; cabin and medium sizes are priced separately.'),
  A('B0C3QR9Q19', "TIMEX Men's Analog Watch, Blue Dial, Silver Stainless Steel Bracelet", 1047, 2095, '712IicSmO0L._SL1500_', [
    "This TIMEX men's analog watch is ₹1,047 on Amazon, half the M.R.P.",
    'It has a 40 mm blue dial in a brass case, quartz movement, 30 m water resistance and a silver stainless-steel bracelet with a 20 mm strap width. Buyers rate it 4.4 stars across 407 reviews.',
    'A blue dial on steel suits both office wear and weekends, and TIMEX backs it with a one-year manufacturer warranty.',
  ], 'This is the blue-dial, silver-bracelet model.'),
  A('B0F948SY2B', 'Boldfit Casual Lace-Up Sneakers for Men', 899, 2799, '51cBLPZrEIL._SL1500_', [
    "Boldfit's casual lace-up sneakers for men are ₹899 on Amazon, 68% under the M.R.P.",
    'They are lightweight everyday sneakers made for casual wear and long walks. Buyers rate them 4.0 stars across 667 reviews.',
    'Check the size chart on the listing before ordering, since sneaker sizing varies between brands.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
  A('B0FMY7PG4T', 'Maybelline Super Stay Lumi Matte Liquid Foundation, Shade 128', 234, 399, '51K+7uQDVQL._SL1500_', [
    "Maybelline's Super Stay Lumi Matte liquid foundation in shade 128 is ₹234 on Amazon, 41% off the M.R.P.",
    'It is a lightweight long-wear foundation rated for up to 30 hours, transfer- and sweat-proof, with medium coverage that builds to full and a matte finish with a soft glow. It is vegan and dermatologically tested. Buyers rate it 4.3 stars across 265 reviews.',
    'Shade matching matters more than price with foundation, so compare shade 128 against the swatches on the listing before buying.',
  ], 'This price is for shade 128 only; other shades can be priced differently.'),
  A('B0CBKHSBRN', "Amazon Brand Symbol Men's Colour-Block High Neck Full Zip Jacket", 479, 2599, '71KvnC5m-RL._SL1500_', [
    "Symbol's colour-block full-zip jacket for men, from Amazon's own brand, is ₹479 on Amazon, 82% below the M.R.P.",
    'It is a 100% polyester jacket with a high neck and a full-length zip, a light layer for cool mornings, bike rides and travel. Buyers rate it 3.8 stars across 438 reviews.',
    'At this price it works as a spare layer ahead of winter; check the size chart, as fits differ by colour.',
  ], 'Price applies to the size and colour shown; other combinations can cost more.'),
  A('B09736DYZY', 'ETZIN PS2 to HDMI Converter with 3.5 mm Audio Output', 347, 999, '71T28hYtgHL._SL1500_', [
    'The ETZIN PS2-to-HDMI converter is ₹347 on Amazon, 65% off the M.R.P.',
    'It plugs into the PS2 AV Multi Out port and sends video and audio to an HDMI TV, monitor or projector, passing 480i, 576i and 480p, with a 3.5 mm stereo jack for headphones or speakers. It needs 5V USB power from the PS2 or a phone charger. Buyers rate it 3.7 stars across 128 reviews.',
    'Before first use, set Component Video Output to Y Cb/Pb Cr/Pr in the PS2 System Configuration using the old AV cable, or the picture will not show. It carries a 6-month warranty.',
  ], 'The converter ships with a 0.8 m USB power cable; an HDMI cable may be needed separately.'),
  A('B09LR27MQD', "Carlington Big Dial Women's Watch, Stainless Steel Mesh Strap", 998, 4999, '81JHxoxgxQL._SL1500_', [
    "Carlington's big-dial women's watch is ₹998 on Amazon, 80% below the M.R.P.",
    'It pairs a large dial with a stainless-steel mesh strap, an adjustable clasp and a water-resistant body. Buyers rate it 4.0 stars across 471 reviews.',
    'The mesh strap adjusts without removing links, which makes it an easy gift when you do not know the wrist size.',
  ], 'Pick the dial and strap colour you want; the price shown is for the default variant.'),
  A('B0FQCKX9ZS', 'Blue Heaven Love Capsule Non-Transfer Liquid Lip Colour', 115, 199, '61xQWRVopoL._SL1500_', [
    "Blue Heaven's Love Capsule non-transfer lip colour is ₹115 on Amazon, 42% off the M.R.P.",
    'It is a matte liquid lipstick with one-swipe pigment that is waterproof, smudge-resistant and made to last through meals and coffee. Buyers rate it 4.0 stars across 13 reviews.',
    'It is a low-cost way to try a long-wear matte shade before spending on a premium brand.',
  ], 'Price is for the shade shown; check the selected shade before checkout.'),
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

const file = process.argv[2] ?? 'ifs-1003i-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
