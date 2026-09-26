// TELEGRAM-DEAL-MONITOR tick 2026-09-26ap
//
// Sidebar sweep of 13 groups turned up 2 new single-product links. SB Loots resolved to B0H2ZBPWYH (Zebronics Keypad X3);
// #centerCol in the logged-in tab shows ₹899 vs M.R.P. ₹1,699, in stock, 4.3★ (350), no clip coupon — same as channel.
// Dealdost fkrt link resolved to Flipkart PERH5FF6YZH4GZAE (Bellavita Night Fever 100 ml); ld+json ₹299 InStock, page
// M.R.P. ₹899 — same as channel. Copy uses only the PDP title, bullets and ratings.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B0H2ZBPWYH',
    name: 'Zebronics Keypad X3 Wireless Keyboard, 2.4GHz + Bluetooth, 102 Keys, Black',
    description: [
      "A full-size dual-mode wireless keyboard from Zebronics, now at ₹899 on Amazon, 47% below its M.R.P.",
      "The Keypad X3 connects over a 2.4GHz USB nano receiver or over Bluetooth, so one keyboard can switch between a desktop and a phone or tablet. It has the full 102-key layout, 12 multimedia keys for volume and playback, and a dedicated ₹ rupee key.",
      "A built-in holder props up a phone or tablet while you type, and a retractable stand sets the typing angle. The keycaps are UV coated to keep the legends from wearing off. It is rated 4.3 out of 5 from about 350 Amazon reviews.",
    ],
    variant: 'Confirm the Black Keypad X3 is selected — other colours or bundles on the same page can be priced differently.',
    price: 899, mrp: 1699, exp: 899, av: 'In stock',
    image: 'https://m.media-amazon.com/images/I/71WtXWuDrbL._SL1500_.jpg',
  },
  {
    store: 'Flipkart', productId: 'PERH5FF6YZH4GZAE',
    name: 'Bellavita Night Fever Eau de Parfum 100 ml, Unisex, Citrusy & Fruity',
    description: [
      "Bellavita's Night Fever eau de parfum in the 100 ml bottle is down to ₹299 on Flipkart, 67% below its listed M.R.P.",
      "It is sold as a unisex scent for men and women, with citrusy and fruity notes, and is an eau de parfum rather than a lighter eau de toilette. The 100 ml size works out far cheaper per ml than the 20 ml bottle listed on the same page.",
      "It is rated 4.3 out of 5 from over 11,000 Flipkart ratings. Scent is personal, so if you have not tried Bellavita before, the listing's notes are the best guide to whether a fresh, fruity profile suits you.",
    ],
    variant: 'Select the 100 ml size — the 20 ml bottle on the same page has its own price.',
    price: 299, mrp: 899, exp: 299, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/perfume/6/o/l/100-night-fever-perfume-for-men-women-citrusy-fruity-notes-long-resized-original-imahghffet6n2jd2.jpeg?q=70',
    affiliateUrl: FK('bellavita-night-fever-perfume-men-women-citrusy-fruity-notes-long-lasting-scent-eau-de-parfum-100-ml/p/itm41a6d1e00bf93', 'PERH5FF6YZH4GZAE'),
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
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs channel ${d.productId}`);
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

const file = process.argv[2] ?? 'tg-0926ap-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
