// TELEGRAM-DEAL-MONITOR tick 2026-09-26y
//
// Sidebar sweep of 13 groups turned up 4 new links. Dealzone link.amazon/B01c0jaiX resolved to B0GRB91ML6 (Lifelong Nutri
// Blender); the PDP shows ₹1,199, the same as the channel. SB Loots fktr.in/XeVfvSn resolved to Flipkart VCLGGQGGWSY2ZUKM
// (Eureka Forbes 2-in-1 vacuum); ld+json shows ₹1,799 InStock, the same as the channel, and the page M.R.P. is ₹6,000.
// ONLINE SHOPPING DEALS link.amazon/B0dZWkCIM resolved to B09STBLLSK (Garnier), already LIVE as id 9653, so it was skipped.
// Dealdost fkrt.cc/hnUyh8F is an Aristocrat "starting at" brand listing, not a single product.
// Amazon price / M.R.P. / image / stock come from the PDP read in az0926y.json (repo root) — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../az0926y.json', import.meta.url), 'utf8'));
if (typeof pdp === 'string') pdp = JSON.parse(pdp);
const byAsin = Object.fromEntries(pdp.map((r) => [r.a, r]));

const HOWTO = (what, variant, store = 'Amazon') => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const SAME = 'Confirm this exact variant is selected — other colours, sizes or pack options on the same page are priced differently.';
const SIZE = 'Pick your size from the size chart first — this price applies to the listed colour, and some sizes may already be sold out.';

const A = (productId, name, description, variant = SAME) => {
  const r = byAsin[productId];
  if (!r) throw new Error(`no PDP read ${productId}`);
  const left = r.av.match(/only (\d+) left/i);
  return {
    store: 'Amazon', productId, name, description, variant,
    price: r.p, mrp: r.mrp, exp: r.exp, av: r.av,
    // ponytail: every rendition (_SY355_, _SL1254_ …) normalised to the full-size _SL1500_ of the same image id
    image: r.img.replace(/\._[^/]+_\.jpg$/, '._SL1500_.jpg'),
    stock: left ? `only ${left[1]} left in stock at this price when checked` : undefined,
  };
};

const DEALS = [
  A('B0GRB91ML6', 'Lifelong Nutri Blender with 2 Jars (300 ml + 500 ml), 450 W', [
    "A personal blender for smoothies, shakes and small chutney batches, now 40% below its M.R.P.",
    "This Lifelong Nutri Blender has a 450 W motor and two leak-proof jars, 300 ml and 500 ml. It ships with two stainless-steel blades, a 4-leaf one for blending and a 2-leaf one for grinding, plus a regular lid and a sprinkler lid.",
    "It suits one or two people who want a quick morning smoothie or a small masala grind without pulling out a full mixer grinder. The jar can double as a carry cup. It is not built for large family batches or heavy wet grinding such as idli batter.",
  ], 'Confirm the 2-jar (300 ml + 500 ml) Nutri Blender is selected — other jar sets are priced differently.'),
  {
    store: 'Flipkart', productId: 'VCLGGQGGWSY2ZUKM',
    name: 'Eureka Forbes 2-in-1 Handheld & Stick Vacuum Cleaner, 13,500 Pa',
    description: [
      "A corded 2-in-1 vacuum for quick daily pick-ups, now at ₹1,799 on Flipkart, 70% below its listed M.R.P.",
      "This Eureka Forbes unit works as a handheld and as a stick vacuum and is rated at 13,500 Pa of suction. It has a 16 ft cord and a dust container you empty straight into the bin.",
      "It suits flats where you want a light cleaner for floors, sofas, car seats and corners without a full canister vacuum. Being corded, it will not run out of battery mid-clean, but you will need a socket within reach of each room.",
    ],
    variant: SAME, price: 1799, mrp: 6000, exp: 1799, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/vacuum-cleaner/b/g/b/-resized-original-imaha7bjmypdxp8j.jpeg?q=70',
    affiliateUrl: FK('eureka-forbes-2-1-hand-held-vacuum-cleaner/p/itm886d8482f8b0e', 'VCLGGQGGWSY2ZUKM'),
  },
];
// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs IFS ${d.productId}`);
  if (!/in ?stock|only \d+ left/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  // hand-typed ₹ in copy must match the PDP price (title-rupee-vs-price rule)
  for (const m of description.matchAll(/\bat ₹([\d,]+)/gi)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (v !== d.price) throw new Error(`copy ₹${v} != price ₹${d.price} ${d.productId}`);
  }
  const imgOk = {
    Flipkart: /^https:\/\/rukmini\d\.flixcart\.com\/image\/1500\/1500\//,
    Myntra: /^https:\/\/assets\.myntassets\.com\/h_1440,q_90,w_1080\//,
    Amazon: /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL1500_\.jpg$/,
  }[d.store].test(row.image);
  if (!imgOk) throw new Error(`bad image ${d.productId} ${row.image}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate ASIN');

const file = process.argv[2] ?? 'tg-0926y-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
