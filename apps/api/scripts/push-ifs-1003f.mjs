// DEAL-INGEST indiafreestuff tick 2026-10-03f
//
// Sweep: /deals 1-3 + /deals/superdeals, 96 cards, 26 unseen. 8 verified in the logged-in Amazon tab (priceToPay, M.R.P.,
// In stock, add-to-cart present, rating): American Tourister Qubiz, Bergner TriPro cooker, Celary pyjama set, Dixcy Scott tee,
// JioTag 2nd gen, KENT air fryer, Puma Cliff, Vaseline Gluta Hya lotion. Rejected: Daniel Klein (1 left, 4 ratings), Libas
// (0 ratings), Popwings (2 ratings), 5 Dreamy Designs + Rozi (coupon-dependent), 4 Nasher Miles (ICICI card), Abbott Libre
// (medical), Govind whitener (food), Abros/Puma/Kuber sale hubs. None in the DB by productId or affiliateUrl. Copy is original.
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
  A('B0GPNBFJ6J', 'American Tourister Qubiz Cabin Trolley Bag, 55 cm, 8 Wheel, Lime Turquoise', 2249, 6900, '61YIJtuTB2L._SL1500_', [
    'The American Tourister Qubiz 55 cm cabin trolley is ₹2,249 on Amazon, 67% below the M.R.P.',
    'It is a hard-case polypropylene cabin suitcase with eight 360° spinner wheels and a recessed combination lock, sized for domestic airline cabin allowances. Buyers rate it 4.2 stars across 777 reviews.',
    'Check your airline\'s cabin dimension limit against the listed bag size before flying; 55 cm is the common Indian domestic carry-on height.',
  ], 'Confirm the Lime Turquoise colour is selected; other Qubiz colours are priced differently.'),
  A('B0FCRPJT9F', 'Bergner TriPro Triply Outer Lid Pressure Cooker, 5 Litres', 1999, 3995, '61tHmKZdGWL._SL1500_', [
    'The Bergner TriPro 5 litre triply pressure cooker is ₹1,999 on Amazon, 50% below the M.R.P.',
    'Its 2.5 mm tri-ply body spreads heat evenly and works on both induction and gas stoves, with an outer-lid design and Bakelite grip handles. Buyers rate it 4.1 stars across 224 reviews.',
    'A 5 litre cooker suits a family of four to five for dal, rice and curries; triply steel also skips the coating-wear issue of non-stick cookers.',
  ], 'Confirm the 5 litre size is selected; other capacities are priced differently.'),
  A('B0H23VRFRY', 'Celary Korean Womens Pyjama Set, Half Sleeve T-Shirt and Printed Pyjama', 599, 1499, '61nxBAIvJRL._SL1067_', [
    'The Celary Korean-style women\'s night suit is ₹599 on Amazon, 60% below the M.R.P.',
    'It is a two-piece set — a half-sleeve tee and a printed full-length pyjama — in a soft cotton blend, offered in sizes M to 4XL and sold by Cocoblu Retail. Buyers rate it 4.1 stars across 264 reviews.',
    'Check the size chart on the listing before ordering; sleepwear sets are usually cut relaxed, so most buyers stay with their regular size.',
  ], 'Pick your size first — the deal price was read on size M, and other sizes may price differently.'),
  A('B0CGV7BZ9F', 'Dixcy Scott Men V Neck Long Sleeve T-Shirt', 299, 665, '71oKbiWGqIL._SL1500_', [
    'The Dixcy Scott men\'s V-neck long-sleeve tee is ₹299 on Amazon, 55% below the M.R.P.',
    'It is a plain everyday long-sleeve from Dixcy\'s Scott line, useful as a base layer under shirts or as winter loungewear. Buyers rate it 3.9 stars across 52 reviews.',
    'Stock up early if you want it for the cooler months; basic innerwear-brand tees like this tend to sell out in common sizes first.',
  ], 'Pick your size and colour first — the deal price applies to the variant you see it on.'),
  A('B0H5W2R1S7', 'JioTag 2nd Generation Item Finder, Olive, Android and iOS Compatible', 1099, 2999, '61VnkOs9rgL._SL1500_', [
    'The second-generation JioTag item finder in Olive is ₹1,099 on Amazon, 63% below the M.R.P.',
    'It clips to keys, wallets, bags or luggage and works with both Android and iOS phone-finding networks, so a lost item can be located beyond Bluetooth range. It is IP64 rated against dust and splashes, needs no SIM, and runs about a year on its battery. Buyers rate it 3.9 stars across 308 reviews.',
    'Useful in checked luggage on flights — the tag reports where the bag is even after it leaves your phone\'s Bluetooth range.',
  ], 'Confirm the Olive colour and 2nd Generation model are selected; the older JioTag is a different listing.'),
  A('B0GCHJMCJR', 'KENT Digital Air Fryer 5L, 1400W, 8 Preset Menu', 4199, 10500, '719pRXCZDYL._SL1500_', [
    'KENT\'s 5 litre digital air fryer is ₹4,199 on Amazon, 60% below the M.R.P.',
    'It runs at 1400 W with rapid hot-air circulation, eight preset menus, a touch control panel with digital display, and a glass window with an inside light so you can check food without opening the basket. It can bake, grill and roast as well as air-fry. Buyers rate it 4.0 stars across 4,452 reviews.',
    'A 5 litre basket handles snacks for three to four people in one batch; it is sold directly by KENT RO Systems.',
  ], 'Confirm the 5L digital model is selected; KENT\'s manual-dial fryers are separate listings.'),
  A('B0B56ZJNQZ', 'Puma Unisex Cliff Sneaker', 1102, 3499, '61uxswNEXkL._SL1200_', [
    'Puma\'s Cliff unisex sneaker is ₹1,102 on Amazon, 69% below the M.R.P.',
    'It is a low-top casual lace-up sneaker, sold by Cocoblu Retail. Buyers rate it 3.8 stars across 558 reviews.',
    'Being unisex, it follows men\'s UK sizing — women usually go one to one-and-a-half sizes down from their regular size.',
  ], 'Pick your shoe size first — the deal price applies to the size you see it on, and other sizes may price differently.'),
  A('B0H25YRKN5', 'Vaseline Gluta Hya AHA BHA Exfoliating Lotion, 200 ml', 225, 499, '51Zhri-l-nL._SL1000_', [
    'Vaseline\'s Gluta Hya AHA BHA exfoliating body lotion in the 200 ml bottle is ₹225 on Amazon, 55% below the M.R.P. — about ₹112 per 100 g.',
    'It combines AHA and BHA exfoliants with Vaseline\'s Gluta-Hya moisturising base to clear dead skin and smooth rough patches on elbows, knees and arms. Buyers rate it 4.8 stars across 82 reviews.',
    'Exfoliating acids make skin more sun-sensitive, so pair daytime use with sunscreen on exposed areas.',
  ], 'Confirm the 200 ml bottle is selected; other sizes are priced differently.'),
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

const file = process.argv[2] ?? 'ifs-1003f-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
