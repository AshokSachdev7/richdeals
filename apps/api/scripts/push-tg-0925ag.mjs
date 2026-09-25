// TELEGRAM tick 2026-09-25ag — 13 groups scanned via .chat-list sidebar read.
// Candidates: Preethi Boltz (Dealzone, link.amazon/B02TNgFBZ -> B08N6DZ668) accepted.
// Rejected: Lavie handbag B0G38DGNKM + Homeor trolley B0CR1MK3T9 (already live), Syska power bank
// PWBGGD4THDQZYAY6 (channel ₹799 vs Flipkart PDP ₹1,799), Wonderchef B0CH34WWFR (pushed last IFS tick),
// Anjeer (seen), rest non-deal chatter / Swiggy vouchers / loot joins.
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

const DEALS = [
  A('B08N6DZ668', 'Preethi Boltz 1000 Watts Mixer Grinder, 4 Jars (3 Stainless Steel + Blender Jar), Black', 4909, 14399, '51ffKSnuQaL._SL1080_.jpg', [
    "A 1000W mixer grinder handles the heavy daily jobs of an Indian kitchen — idli and dosa batter, dry masalas, coconut chutney and wet pastes — without stalling or overheating halfway. Lower-wattage 500W or 750W models often struggle with thick batter or whole spices, so 1000W is the sensible pick for a family that grinds every day.",
    "This Preethi Boltz has a 1000W SIGMA W2 motor and four jars: three stainless steel jars for dry and wet grinding and chutneys, plus a blender jar for shakes and juices. The listing mentions a redesigned blade for tough ingredients, 3D air cooling that pushes hot air out of the motor to extend its life, and superfine grinding in about 90 seconds. It carries a 2-year product guarantee and lifelong free service with no labour charge.",
    "Run the mixer in short bursts of 30 to 60 seconds with a pause in between for hard ingredients, instead of one long run — that keeps the motor cool. Never fill a jar past its marked line, and add a little water to wet grinds. Wash the jars and blades right after use so masala stains and smells do not set, and keep the lifelong-service card with the invoice.",
  ], 'Confirm the Boltz 1000W, 4 Jars, Black option is selected — other Preethi models on the same page are priced differently.'),
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

const file = process.argv[2] ?? 'tg-0925ag-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
