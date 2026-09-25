// DEAL-INGEST indiafreestuff tick 2026-09-26b
//
// 107 slugs -> 68 new -> 59 candidates -> 6 DB dups -> 43 after dropping coupon / card-offer / min-buy deals.
// Amazon: 39 checked in the logged-in tab, 31 pass; rejected 5 unavailable (B092T5R2Y9, B07HHXGH8J, B0BZC7T884,
// B0F3NS98MT, B0CJR9TWX6) and 3 drift (B0DFBTXSSM 369->870, B0H41MJZYP 797->1499, B0DQXQXL68 559->1390).
// Flipkart: 3 checked via ld+json in a Playwright tab, 3 pass. Myntra 21084086: available:false -> rejected.
// Amazon price / M.R.P. / image / stock come from the PDP read in az0926h.json (repo root) — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../az0926h.json', import.meta.url), 'utf8'));
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
  A('B0CD2GZ7XJ', 'Joker & Witch Hazel & Augustus Couple Analogue Watches, White Dial, Black Strap', [
    "Matching his-and-hers watches are an easy anniversary, engagement or Karva Chauth gift, and buying them as a pair costs less than two separate watches.",
    "This Joker & Witch set pairs two analogue watches, Hazel and Augustus, each with a white dial and a black strap.",
    "Check the case size and strap material on the listing, and whether the straps can be shortened to fit smaller wrists. Analogue fashion watches like these are usually not built for swimming, so take them off before washing up or showering. The M.R.P. is high, so judge the deal by the price you pay, not the discount.",
  ], 'Confirm the couple set with the white dial and black strap is selected.'),
  A('B0BVMGHV54', "Puma Men's Anzarun Krick Sneakers", [
    "A plain pair of branded sneakers covers college, casual office days and weekend walks, and Puma's everyday Anzarun line regularly drops well below its M.R.P.",
    "These are Puma's men's Anzarun Krick sneakers, a low-top casual shoe.",
    "Only one pair was left at this price when we checked, and stock changes size by size, so your size may already be gone. Puma usually fits true to UK sizing, but check the size chart first. Wipe the upper with a damp cloth rather than machine-washing, which weakens the glue.",
  ], SIZE),
  A('B0BVMBFQ7W', 'Puma Unisex Adult Feetmax Sneakers', [
    "Unisex sneakers are the simplest pick when buying shoes as a gift or for the whole family, because the same style works for anyone and only the size changes.",
    "These are Puma's Feetmax sneakers, sold as a unisex adult style.",
    "Only one pair was left at this price when we checked, and stock differs by size. Unisex shoes are usually listed in men's UK sizes, so women should usually go one to two sizes down. Check the size chart before ordering. Let them air-dry away from direct sun after cleaning.",
  ], SIZE),
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

const file = process.argv[2] ?? 'ifs-0926h-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
