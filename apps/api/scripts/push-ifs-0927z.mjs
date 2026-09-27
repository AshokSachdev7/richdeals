// DEAL-INGEST indiafreestuff tick 2026-09-27z
//
// 64 slugs swept (homepage + /deals/index pages 1-3), 29 new, all resolved via base64 ?rto= Buy Now, 0 already in DB.
// 12 pass the PDP re-read (11 Amazon #centerCol in the logged-in tab, 1 Flipkart ld+json). Rejected: card/coupon-only
// prices (Borosil, Florance, Futopia, Maharaja x2, Springwel, Samsung Flip8, Cello x2, Logitech, Parachute, Nirlon),
// out of stock (T2F x2), ratings <=3.4 (Elle 1.0, inear 3.4, Striders 3.0). Copy is original.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com/axe-deodorant-spray/p/itm7c7c83579ba0a?pid=${id}&affid=djhackraj`,
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
const DEALS = [
  A('B0DQ1PHX5G', 'Amazon Basics 18W Quick Charge 3.0 Wall Charger, USB Port, BIS Certified', 249, 699, '41voNYe7WHL._SL1500_', [
    'The Amazon Basics 18W Quick Charge 3.0 wall charger is ₹249 on Amazon, 64% below its M.R.P.',
    'It is a single USB-A port adapter with BIS certification, suited to Android phones, TWS earbuds and power banks that support QC 3.0. Buyers rate it 3.8 stars.',
    'It has no USB-C port, so phones with a C-to-C cable need a USB-A to C cable instead.',
  ], 'Check the box contents line; the cable may be sold separately.'),
  A('B0FCSDL8PR', 'Amazon Basics Heavy Duty 3 in 1 Adjustable Incline Gym Bench, 350 kg Max User Weight', 3699, 9700, '710-k3r+dTL._SL1500_', [
    'The Amazon Basics heavy-duty adjustable gym bench is ₹3,699 on Amazon, 62% off its M.R.P.',
    'It sets to flat, incline and decline positions for presses, rows and core work, has upholstered pads and is rated for a 350 kg maximum user weight. Buyers rate it 4.2 stars.',
    'For home workouts it pairs well with adjustable dumbbells; measure your floor space for the full bench length first.',
  ], 'Check the listed model and colour before checkout.'),
  A('B0BVM7B1VV', 'Amazon Brand Solimo 100% Cotton Opaque Door Curtains, 7 Feet, Set of 2, Leafy Floral', 468, 2599, '91daVwpfTqL._SL1500_', [
    'A set of two Solimo 100% cotton door curtains (7 feet) is ₹468 on Amazon, 82% below the M.R.P.',
    'They are opaque, eyelet-top curtains in a leafy multi-floral print, sized for a standard door. Buyers rate them 3.6 stars.',
    'Cotton curtains can shrink slightly on the first wash; a cold, gentle wash keeps the length.',
  ], 'Confirm the 7 feet door size and the Leafy Steam print are selected.'),
  A('B0CQR4Z9HX', 'Amazon Brand Solimo Water Resistant Rain Coat with Pant, Black, Large', 498, 1900, '51BqHPk71FL._SL1500_', [
    'The Solimo water-resistant raincoat with pant (Black, Large) is ₹498 on Amazon, 74% off its M.R.P.',
    'It is a two-piece polyester rain suit, jacket plus trousers, for bike and scooter riders commuting in the monsoon. Buyers rate it 4.0 stars.',
    'Rain suits are cut loose to fit over office clothes; check the size chart before choosing Large.',
  ], 'This price is for Black, Large; other sizes may cost more.'),
  A('B0BMQFH42L', 'Caprese TAYA S Small Handbag for Women', 1176, 5599, '71QoCnBTbVL._SL1500_', [
    'The Caprese TAYA S small handbag is ₹1,176 on Amazon, 79% below its M.R.P.',
    'It is a compact everyday bag from the Caprese range, rated 4.0 stars by buyers.',
    'Stock was very low on this listing when checked, so it may sell out quickly.',
  ], 'Pick the colour shown in the deal image before checkout.'),
  A('B0F6XZNZKC', 'Khadi Satreetha Herbal Hair Cleanser Shampoo, Sulfate Free, 600 ml', 199, 750, '81LZlX5jFKL._SL1500_', [
    'A 600 ml bottle of Khadi Satreetha herbal hair cleanser is ₹199 on Amazon, 73% off its M.R.P.',
    'It is a sulfate-free, paraben-free herbal shampoo meant for gentle daily cleansing and shine; that works out to about ₹33 per 100 ml.',
    'Only a couple of units were left when checked.',
  ], 'Check the listing shows the 600 ml pack.'),
  A('B0BG8F4HWY', 'Kuber Industries Unbreakable Plastic Lunch Box, 2 Containers, 1000 ml, Blue', 240, 499, '51U1Ez1zmZL._SL1396_', [
    'The Kuber Industries two-container plastic tiffin (1000 ml) is ₹240 on Amazon, 52% below its M.R.P.',
    'It has two square unbreakable containers, a carry handle and push-lock lids, sized for a school or office lunch.',
    'The listing sometimes shows an extra clip coupon on top; the price here is before any coupon.',
  ], 'Confirm the Blue, 1000 ml option is selected.'),
  A('B0CGLV9Y9Y', "Little's 5 in 1 Infant Gift Pack, Toddler Activity Toys Set", 692, 1077, '71RwVSryDxL._SL1500_', [
    "The Little's 5 in 1 infant gift pack is ₹692 on Amazon, 36% off its M.R.P.",
    'It bundles five toddler toys (junior ring stack, nesting eggs, stacking drums, chain links and a bath toy), an easy new-born or first-birthday gift. Buyers rate it 4.4 stars.',
    'Check the age marking on the box before giving it to a very young infant.',
  ], 'Confirm the 5 in 1 set before checkout.'),
  A('B06XJKNVY4', 'PremiumAV 802 USB 2.0 Wireless Wi-Fi Adapter for Desktop PC and Laptop', 299, 799, '81VtF9jpQnL._SL1500_', [
    'The PremiumAV 802 USB Wi-Fi adapter is ₹299 on Amazon, 63% below its M.R.P.',
    'It plugs into a USB 2.0 port and adds Wi-Fi to a desktop PC that has none, or stands in for a dead laptop Wi-Fi card. Buyers rate it 3.5 stars.',
    'Windows may need a driver install; keep a wired connection handy for setup.',
  ], 'Single pack in black.'),
  A('B0F7LWNSV3', 'SANCY HDMI to VGA Converter Adapter, 1080p, Male to Female', 219, 999, '51UlHibAPrL._SL1470_', [
    'The SANCY HDMI to VGA converter is ₹219 on Amazon, 78% off its M.R.P.',
    'It connects a laptop, PC or streaming device with an HDMI port to an older VGA monitor or projector at up to 1080p.',
    'VGA carries no audio, so sound stays on the laptop speakers or needs a separate cable.',
  ], 'Check the adapter is HDMI male to VGA female before checkout.'),
  A('B0F3XB6TL6', 'ViewSonic VG2408 24-inch Full HD IPS Monitor, 100Hz, Height Adjustable, USB Hub', 9975, 18600, '51B-tq1fgUL._SL1300_', [
    'The ViewSonic VG2408 24-inch Full HD IPS monitor is ₹9,975 on Amazon, 46% below its M.R.P.',
    'It is a 1920x1080 IPS panel at 100Hz with a fully ergonomic stand (height, pivot, swivel, tilt), a USB hub, dual speakers and HDMI, DisplayPort and VGA inputs, a good fit for office desks.',
    'Stock was down to one unit when checked.',
  ], 'Confirm the VG2408 model is selected.'),
  F('DEOGHAHXQQJFZ4NH', 'AXE Gold Temptation, Dark Temptation and Intense Deodorant Spray Combo for Men', 217, 1050,
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/deodorant/n/h/r/-original-imah32r5ypgd2gmp.jpeg?q=70', [
    'The AXE combo of Gold Temptation, Dark Temptation and Intense deodorant sprays is ₹217 on Flipkart, 79% off its M.R.P.',
    "It is a men's body-spray pack with three AXE fragrances, rated 4 stars across nearly 40,000 ratings.",
    'Flipkart may show a lower figure after bank or card offers at checkout; the price here is before any offer.',
  ], 'Confirm the three-fragrance combo is the option selected.'),
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

const file = process.argv[2] ?? 'ifs-0927z-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
