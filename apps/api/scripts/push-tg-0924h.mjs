// TELEGRAM-DEAL-MONITOR tick 2026-09-24h
//
// Sidebar read of all groups -> SB Loots Lifelong walking pad (fktr.in) resolved to its Flipkart
// /p/itm path; ld+json 7999 InStock, MRP 35,999. Rasayanam (collection page), TRESemme (dup 1098),
// CoolzTricks (amazon /ax/claim loot) rejected.
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const COUPON = (n) => `Tick the ${n}% coupon box on the product page before adding to cart — it comes off at checkout, below the price shown here.`;

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  {
    store: 'Flipkart', productId: 'TRDHHY3P8NFN6U3J', name: 'Lifelong Walking Pad Treadmill, 3 HP Motor, 2-Level Manual Incline',
    price: 7999, mrp: 35999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/treadmill/m/g/x/walking-pad-treadmill-3-hp-motor-2-level-manual-incline-led-resized-original-imahnkhrqddzww7t.jpeg?q=70',
    affiliateUrl: FK('lifelong-walking-pad-treadmill-3-hp-motor-2-level-manual-incline-led-display-max-weight-110-kg/p/itmb74051f2d57b6', 'TRDHHY3P8NFN6U3J'),
    description: [
      "A walking pad is the treadmill for people who do not have a spare room for a treadmill. It has no tall handlebar or console, so it slides under a bed or sofa when you are done, and it is built for steady walking while you take calls, watch a show or work at a standing desk rather than for sprinting. For anyone trying to hit a daily step count without leaving home in traffic, heat or rain, it is the lowest-effort way to add 30 to 60 minutes of movement.",
      "This Lifelong model pairs a 3 HP motor with a two-position manual incline and an LED display for speed, time and distance, and it is rated for users up to 110 kg. The manual incline is a simple mechanical setting rather than a motorised one, so you choose flat or raised before you start. Lifelong is a common Indian home-fitness and appliance brand, which makes after-sales service easier to find than for unbranded imports.",
      "Check the weight limit against every person who will use it, and leave clear space behind the belt. Walking pads need a flat, hard floor; a thick rug makes the motor work harder. Lubricate the belt as the manual says and keep it centred, which is most of the maintenance. The price here is the plain Flipkart price; the post that flagged it mentions a bank offer, so a card discount may cut the final bill further.",
    ],
    variant: 'Confirm the listing shows the Lifelong walking pad with the 2-level manual incline, and read the bank offers before paying.',
  },
];

// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\// };
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? COUPON(d.coupon) : NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0924f-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
