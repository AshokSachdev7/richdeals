// TELEGRAM-DEAL-MONITOR tick 2026-09-24h
//
// Sidebar read -> SB Loots Aroma NB121 Pro Pods2 (fktr.in -> linkredirect dl -> /p/itm) and Dealdost
// JABON BAGNO wall-hung commode (fkrt.cc). Both verified in Playwright tab: ld+json price + InStock,
// MRP from the price block. Dealzone Feather tissue (post 78 vs live 299) + CoolzTricks Nike range rejected.
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
    store: 'Flipkart', productId: 'ACCHP5YXXSMJCJSS', name: 'Aroma NB121 Pro Pods2 Wireless Earbuds with ENC and Dual Pairing',
    price: 300, mrp: 1499,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/headphone/3/k/n/nb121-pro-pods2-upto-40-h-playtime-enc-with3d-spatial-audio-dual-original-imahp5yxjxm3efqd.jpeg?q=70',
    affiliateUrl: FK('aroma-nb121-pro-pods2-upto-40-h-playtime-enc-with3d-spatial-audio-dual-pairing-bluetooth/p/itm07f71fd662016', 'ACCHP5YXXSMJCJSS'),
    description: [
      "At ₹300 a pair of true wireless earbuds stops being a considered purchase and becomes a spare: one set for the gym bag, one for the office drawer, one for a teenager who loses them every month. The question at this price is not audiophile sound but whether the basics work, meaning a stable Bluetooth link, usable call quality and a case that lasts a few days between charges.",
      "Aroma's NB121 Pro Pods2 are listed with up to 40 hours of total playtime including the case, ENC (environmental noise cancellation) for calls, 3D spatial audio and dual pairing, so they can stay connected to a phone and a laptop together. Flipkart shows the pair at 3.7 stars across more than 21,000 ratings and flags the current figure as the lowest price since launch.",
      "Read the specs for what they are. ENC cleans up your voice on calls; it is not ANC, and it will not block bus or train noise for you. The 40-hour figure counts the case recharges and assumes moderate volume. Treat budget earbuds as a convenience buy: pair them once, keep the case charged, and use the Flipkart return window if the fit or connection disappoints.",
    ],
    variant: 'Confirm the listing still shows the NB121 Pro Pods2 at ₹300 — Flipkart adds a small Protect Promise fee at checkout.',
  },
  {
    store: 'Flipkart', productId: 'CMDHGKABGCHCFAGZ', name: 'JABON BAGNO Ceramic Wall-Hung Western Commode with Soft-Close Seat, P-Trap, White',
    price: 2091, mrp: 4999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/commode/m/y/u/36-18-wall-hung-jabon-bagno-37-enriched-2-original-imahgs9pdhspyj4g.jpeg?q=70',
    affiliateUrl: FK('jabon-bagno-ceramic-western-toilet-wall-hung-commode-soft-closing-toilet-seat-p-trap-white-wall-commode/p/itm42f39a57c87ae', 'CMDHGKABGCHCFAGZ'),
    description: [
      "A wall-hung commode is the fitting that makes a small Indian bathroom look bigger: the bowl is mounted off the floor, so the tiles run unbroken underneath and mopping takes one pass instead of working around a pedestal. It is a popular choice in bathroom renovations and new flats, and branded wall-hung pans in showrooms usually cost several times this price.",
      "This JABON BAGNO unit is a white ceramic wall-hung western commode with a soft-closing seat that lowers itself rather than slamming, and a P-trap outlet, which exits into the wall rather than the floor. Flipkart lists it at 4.3 stars on a small base of ratings, and the page shows a bank offer that can bring the bill down further than the price here.",
      "Check the plumbing before ordering. A P-trap needs a wall outlet at the right height, and a wall-hung bowl needs a concealed cistern and a frame or a strong wall to carry the load, so confirm with your plumber what the listing includes and what you will need to buy separately. Measure the space from the finished wall and inspect the ceramic for chips on delivery, before the installer starts work.",
    ],
    variant: 'Confirm the listing shows the white wall-hung model with P-trap, and read the bank offers before paying.',
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
