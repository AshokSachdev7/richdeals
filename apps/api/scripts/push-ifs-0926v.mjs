// DEAL-INGEST indiafreestuff tick 2026-09-26v
//
// 136 slugs -> 53 new -> 52 resolved -> 36 card/CC offers + 1 brand hub dropped -> 16 -> 2 DB dups (B07L3ZFV39, B0HD7VSFZ3) -> 14.
// Amazon: 10 checked in the logged-in tab, 6 pass; rejected coupon-only prices B0G2RZZF9S (2399 vs 1999), B0FHBRFVD4 (99 vs 96),
// B0B5H87CGZ (6900, no M.R.P., 3% coupon), and B0GH1XW61R (no buybox).
// Flipkart: 4 checked via ld+json, all drift (bank-offer prices): ACCHKB3JD2XC4BC8 4499 vs 3099, ACCGSUTCPGSCZSFF 3899 vs 2899,
// BEMGHA9Z7AGUMVY5 5499 vs 4949, BEMFU62MW5SEM3JD 5299 vs 4769.
// Amazon price / M.R.P. / image / stock come from the PDP read in az0926v.json (repo root) — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../az0926v.json', import.meta.url), 'utf8'));
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
  A('B094QD9NW2', "adidas Men's Adiglide M Running Shoes", [
    "An entry-level adidas running shoe for daily jogs, gym sessions and long walking days, now at well under half its M.R.P.",
    "The Adiglide M is a lightweight men's road-running shoe with a cushioned midsole and a breathable mesh upper.",
    "It suits beginners and casual runners covering short to mid distances on roads or treadmills. Serious long-distance runners will want a more cushioned trainer. adidas generally fits true to UK sizing, but check the size chart first, and air-dry the shoes after a wash instead of using a machine.",
  ], SIZE),
  A('B0D6KSRPQB', 'ARISTO 90 Litre Plastic Dustbin with Wheels and Metal Pedal, Red', [
    "A large pedal dustbin with wheels solves the society-lobby, office-floor or big-kitchen waste problem without hand contact, and this one is 58% below its M.R.P.",
    "The ARISTO 90-litre bin measures about 49 x 55 x 77 cm and has a metal foot pedal, two rear wheels and a tight-fitting curved lid.",
    "The lid keeps smells in and rain out, and the UV-protected plastic suits verandas and building compounds. At 90 litres it is too big for most home kitchens, so it fits housing societies, shops, offices and garden waste better. Check the red colour is selected before checkout.",
  ], 'Confirm the 90-litre red variant is selected — other sizes and colours are priced differently.'),
  A('B0G3X682G6', 'lavya Core i3 4th Gen Desktop PC, 8GB RAM, 256GB SSD, Windows 11 Pro', [
    "A budget ready-to-use desktop for billing counters, school homework, office documents and video calls, with an SSD so it boots fast.",
    "The lavya desktop runs a 4th-gen Intel Core i3 (i3-4770/90 class on an H81 board) with 8 GB RAM, a 256 GB NVMe SSD, HDMI and VGA out, gigabit Ethernet, Wi-Fi and USB 3.0. Windows 11 Pro and Office come preinstalled.",
    "The processor is from 2013, so this PC is fine for browsing, documents and light multitasking but not for gaming or video editing. A monitor, keyboard and mouse are not implied, so check the box contents on the listing. Ask the seller how the Windows and Office licences are supplied before relying on them for a business.",
  ]),
  A('B0FJMBWN1Z', 'Lenovo 350 Bluetooth Silent Mouse, Dual Device, 2400 DPI, Cloud Grey', [
    "A quiet Bluetooth mouse is the easy upgrade for shared offices, libraries and late-night work, and this Lenovo model is half its M.R.P.",
    "The Lenovo 350 has silent clicks, Bluetooth 5.3 pairing for two devices at once, three DPI levels up to 2400, and a claimed 36-month battery life.",
    "Switching between a laptop and a tablet takes one button press. It needs Bluetooth on the host device because there is no USB receiver in the box, so check that older desktops have Bluetooth before ordering.",
  ], 'Confirm the Cloud Grey colour is selected — other colours may be priced differently.'),
  A('B0HFRG95L6', 'Nilkamal Freedom FMM Wave Plastic Storage Cabinet, Haze Grey and Charcoal Grey', [
    "A plastic wardrobe does the job of a steel almirah for renters and kids' rooms at a fraction of the weight, and this Nilkamal model is 38% below M.R.P.",
    "The Freedom FMM Wave has a wave-pattern embossed door, three adjustable shelves, and a 3-year warranty from Nilkamal.",
    "The plastic body doesn't rust and resists termites and damp, so it suits humid or ground-floor rooms. It is light enough to move when you shift house, but it is not meant for heavy loads on each shelf. Check the listed height and width against your wall space before ordering.",
  ], 'Confirm the Haze Grey and Charcoal Grey variant is selected — other colours are priced differently.'),
  A('B0D5QVPGWX', 'Sunsilk Lusciously Thick & Long Shampoo 1L, Pack of 2', [
    "Two 1-litre bottles of a household-name shampoo at 59% below M.R.P. works out cheaper per millilitre than buying smaller bottles at the shop.",
    "Sunsilk Lusciously Thick & Long is made with keratin, yoghurt protein and macadamia oil, and has no added parabens. This listing is a pack of two 1 L bottles.",
    "It is a daily-use thickening shampoo for long or thin hair. Anyone with a sensitive scalp should patch-test a new formula first. Two litres lasts a family several months, so check the expiry date when it arrives.",
  ], 'Confirm the pack of 2 x 1 L is selected — single bottles and smaller sizes are priced differently.'),
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

const file = process.argv[2] ?? 'ifs-0926v-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
