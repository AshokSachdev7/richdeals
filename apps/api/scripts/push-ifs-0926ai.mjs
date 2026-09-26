// DEAL-INGEST indiafreestuff tick 2026-09-26ai
//
// 20 IFS rows resolved from base64 ?rto= Buy Now ids, all Amazon. Every ASIN was re-read on the PDP in the logged-in tab
// (core price block, add-to-cart presence, #landingImage data-old-hires, bullets). Rejects (dedup, no buy box, clip
// coupon, bank-offer price, only 1 left, 2-star, ambiguous listing) are listed in reports/tick-2026-09-26ai-ifs.md.
// Copy is written from the PDP title + bullets only. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
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

const DEALS = [
  A('B0H74N32QB', 'COLORBEE Airtight 3-Compartment Bento Tiffin Box, 350 ml, Pista', 199, 999, '61tHyb1KX0L._SL1445_', [
    'A leakproof three-compartment lunch box from COLORBEE for ₹199 on Amazon, 80% below the M.R.P.',
    'The clear lid has a steam-release vent for reheating, and the three sections keep sabzi, roti and a snack apart. Capacity is 350 ml and it weighs about 300 g, so it slides into a school bag or office backpack.',
    'The seller lists it as dishwasher safe; hand-washing keeps the lid seal lasting longer.',
  ], 'Confirm the pista (sea-green) colour is selected.'),
  A('B08GJ76FWJ', 'Amazon Brand Symactive Men\'s Regular Track Pants', 749, 1999, '71MIzv72bML._SL1500_', [
    'Amazon\'s own Symactive track pants are ₹749, 63% off the M.R.P.',
    'A regular-fit training bottom for gym sessions, walks and lounging, from Amazon\'s in-house activewear label.',
    'Stock was down to the last couple of pieces in the size we checked, and price varies by size and colour — pick yours before you check out.',
  ], 'Pick your size and colour; the price can change between variants.'),
  A('B0BTD4S4XF', 'American Tourister Valex 28L Laptop Backpack, 17 inch, Black', 849, 2500, '51yfw2JIxwL._SL1080_', [
    'The American Tourister Valex 28-litre backpack drops to ₹849 on Amazon, 66% off.',
    'It has two main compartments, a padded sleeve for laptops up to 17 inches and a front organiser for chargers, pens and small items.',
    '28 L is a sensible daily size for college or office without the bulk of a travel pack, and the brand lists a one-year global warranty.',
  ], 'Confirm the black Valex 28L is selected.'),
  A('B0C7MQJBYC', 'Baseus UltraJoy 5-in-1 USB-C Hub with 4K HDMI and 100W PD, Grey', 459, 2899, '61It2f40TjL._SL1200_', [
    'The Baseus UltraJoy 5-in-1 USB-C hub is ₹459 on Amazon, 84% below its M.R.P.',
    'You get one HDMI port (4K at 30 Hz), three USB 3.0 ports at up to 5 Gbps, and a USB-C port with 100 W Power Delivery pass-through so the laptop charges while the hub is in use.',
    'Useful for thin laptops and MacBooks with only USB-C ports. 4K is capped at 30 Hz, so it suits office screens more than gaming monitors.',
  ], 'Check the grey 5-in-1 model before adding to cart.'),
  A('B0FQCKVHB7', 'Geonix eForce i13 27W USB-C to Lightning Fast Charging Cable, 1.2 m', 119, 899, '71seOEf8A6L._SL1500_', [
    'A 1.2 m USB-C to Lightning (8-pin) cable from Geonix for ₹119 on Amazon.',
    'It is rated for 27 W fast charging and supports data sync, so it works with a USB-C power adapter for iPhones and iPads that still use the Lightning port.',
    'Reviews on the listing are mixed, so treat it as a cheap spare cable for a bag or car rather than your main one.',
  ], 'Confirm the eForce i13 USB-C to 8-pin cable.'),
  A('B0FJS7LTDB', 'Highlander Men\'s Jeans', 583, 2699, '71VFLI3uI5L._SL1500_', [
    'Highlander men\'s jeans are ₹583 on Amazon, 78% off the M.R.P.',
    'Highlander is an Amazon-sold casualwear label; these are everyday denim jeans.',
    'The listed price applies to the size and wash we checked. Other sizes may cost more, so select yours and compare before paying.',
  ], 'Pick your waist size and wash; price can differ by variant.'),
  A('B000QF9NCK', 'Intex Underwater Fun Swimming Pool, 6 Feet', 970, 1999, '8191S-oYvYL._SL1200_', [
    'The Intex 6-foot inflatable Underwater Fun pool is ₹970 on Amazon, about half its M.R.P.',
    'It is a round kids\' paddling pool with a printed underwater design — inflate it on a terrace, balcony or lawn for summer water play.',
    'Always supervise children in the water, and lay a mat underneath on rough floors to avoid punctures.',
  ], 'Confirm the 6 ft Underwater Fun pool.'),
  A('B0GHP4WMZ7', 'Philips 2.8W LED Frosted Candle Bulb, E27, Warm White, Pack of 4', 287, 640, '5163a-nfZrL._SL1080_', [
    'A pack of four Philips 2.8 W frosted candle LED bulbs for ₹287 on Amazon, working out to about ₹72 a bulb.',
    'They fit a standard E27 screw base and give 3000K warm white light — suited to chandeliers, wall sconces and decorative fittings.',
    'At 2.8 W each they draw far less power than old incandescent candle bulbs.',
  ], 'Confirm the E27 warm-white pack of 4.'),
  A('B0G74584QX', 'Treo by Milton Roarr 4-Piece Glass Serving Set, 2 Mugs and 2 Bowls', 343, 685, '71NO-CzSeDL._SL1500_', [
    'Treo by Milton\'s Roarr serving set is ₹343 on Amazon, half its M.R.P.',
    'The box holds two 405 ml glass mugs with thick handles and two 170 ml Tetris bowls for snacks, dry fruits or dessert.',
    'A handy small set for serving guests, or as a gift.',
  ], 'Confirm the 4-piece Roarr set.'),
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

const file = process.argv[2] ?? 'ifs-0926ai-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
