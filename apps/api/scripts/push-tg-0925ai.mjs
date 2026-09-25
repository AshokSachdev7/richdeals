// TELEGRAM tick 2026-09-25ai — 13 groups scanned via .chat-list sidebar read.
// Accepted: Bajaj Maxima 600mm fan (SB Loots, amazn.lt/ve8zhrun -> B00KL56N8C, PDP ₹1,284 / M.R.P. ₹2,890);
// BOLTT EVO 64GB (Dealdost/CoolzTricks, fkrt.cc/hpIqM5c -> MOBHPP59WKSV4FYG, PDP ₹9,999 / M.R.P. ₹17,999;
// channel ₹8,999 is after a ₹1,000 coupon, we list the pre-coupon PDP price).
// Rest unchanged since tick 0925ag (already handled) or chatter / Swiggy vouchers / loot joins.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const INR = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const CLIP = 'If a clip coupon shows under the price on the product page, tick it before checkout — it comes off at payment, on top of the price listed here.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const A = (productId, name, price, mrp, img, description, variant, extra = {}) =>
  ({ store: 'Amazon', productId, name, price, mrp, image: IMG(img), description, variant, ...extra });
const FK = (productId, name, price, mrp, image, url, description, variant, extra = {}) =>
  ({ store: 'Flipkart', productId, name, price, mrp, image, affiliateUrl: `${url}?pid=${productId}&affid=djhackraj`, description, variant, ...extra });

const DEALS = [
  A('B00KL56N8C', 'Bajaj Maxima 600 MM Ceiling Fan, High Speed, Double Ball Bearing, Brown', 1284, 2890, '61jYLkPbVdL._SL1500_.jpg', [
    "A 600mm (24-inch) ceiling fan is the right size for small rooms that a standard 1200mm fan would overpower — bathrooms, kitchens, balconies, puja rooms, store rooms and compact study corners. A smaller sweep still moves enough air in a tight space without the wobble and blade clearance problems of a full-size fan.",
    "This Bajaj Maxima has a 600mm sweep, a 66W motor that runs at 870 RPM and an air delivery of 110 CMM, with 3 speed settings. The listing mentions a double ball bearing for better load capacity and quieter running, a quick-start high torque motor, automatic winding for consistent build quality, good air delivery even at low voltage, and superior-grade electrical steel lamination for lower power use. It has 4 metal blades, a downrod mount and a 2-year product warranty.",
    "Check the ceiling hook and downrod length before you install: in a low-ceiling kitchen or bathroom, keep at least 7 feet between the blades and the floor. In a kitchen, wipe the blades every couple of weeks so grease and dust do not build up and throw the fan off balance. Keep the invoice for the 2-year warranty claim.",
  ], 'Confirm the Maxima 600 MM, Brown option is selected — other sweeps and colours on the same page are priced differently.'),
  FK('MOBHPP59WKSV4FYG', 'BOLTT EVO (Sky Blue, 64 GB) (4 GB RAM)', 9999, 17999,
    'https://rukminim2.flixcart.com/image/800/1070/xif0q/mobile/2/y/p/-original-imahqk5pqpypfdnv.jpeg?q=90',
    'https://www.flipkart.com/boltt-evo-sky-blue-64-gb/p/itmf046d663a1fd7', [
    "A budget smartphone under ₹10,000 is still what most first-time buyers, students and parents need: a big screen for video calls and YouTube, a battery that lasts a full day, and enough storage for WhatsApp and photos. At this price the two specs that matter most day to day are battery size and screen size.",
    "The BOLTT EVO has a 6000mAh battery and a large 6.79-inch display, with 4 GB RAM and 64 GB storage in this Sky Blue variant. It is rated 4.5 on Flipkart from over 600 ratings. A 128 GB + 6 GB variant is listed on the same page at ₹11,499 if you want more room for apps and photos.",
    "Flipkart also shows bank and coupon offers on this phone: a ₹500 cashback on Flipkart Axis and Flipkart SBI credit cards, and some deal channels report a ₹1,000 coupon that can bring the effective price near ₹8,999. Coupons and bank offers depend on your account and card, so check which ones apply on the product page before you pay. An exchange offer of up to ₹7,400 is also listed for an old phone.",
  ], 'Confirm the Sky Blue, 64 GB + 4 GB variant is selected — the 128 GB + 6 GB variant costs more.', { coupon: true }),
];
// ------------------------------------------------------------------- derive + gate
const HOSTS = {
  Amazon: /^https:\/\/m\.media-amazon\.com\//,
  Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\//,
  Myntra: /^https:\/\/assets\.myntassets\.com\//,
};
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? CLIP : NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) console.log(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0925ai-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
