// TELEGRAM-DEAL-MONITOR tick 2026-09-26af
//
// Sidebar sweep of 13 groups: 3 new single-product links. SB Loots amazn.lt/HQ9KiMbG and CoolzTricks amzn.to/3TNgz7g
// both resolved to B097G96VT8 (Safari Pentagon Pro set of 3). ONLINE SHOPPING DEALS link.amazon/B0itwoBHb resolved to
// B097MRKJDX (Symbol jogger jeans). #centerCol in the logged-in tab: Safari ₹4,499 vs M.R.P. ₹33,997; Symbol ₹499 vs
// ₹2,199 — both match the channel, no clip coupon, no "only N left". Dealdost Croma open-box sale = sale hub, skipped.
// Copy uses only the PDP title + bullets. Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B097G96VT8',
    name: 'Safari Pentagon Pro 8-Wheel Trolley Bag Set of 3 (Cabin + Medium + Large), Luxury Beige',
    description: [
      "A three-piece Safari hard-case luggage set — cabin, medium check-in and large check-in — now at ₹4,499 on Amazon, about ₹1,500 a suitcase.",
      "The Pentagon Pro shells are polypropylene, which keeps the bags light, and each one rolls on eight 360-degree spinner wheels. A built-in 3-digit combination lock guards the main compartment.",
      "It is made in India and Safari lists a 3-year international warranty against manufacturing defects. A set like this suits a family that flies with one cabin bag and checks in the two larger pieces.",
    ],
    variant: 'Confirm the Luxury Beige set of 3 is selected — single bags and other colours on the same page are priced differently.',
    price: 4499, mrp: 33997, exp: 4499, av: 'In stock',
    image: 'https://m.media-amazon.com/images/I/61OR-2SKxdL._SL1500_.jpg',
  },
  {
    store: 'Amazon', productId: 'B097MRKJDX',
    name: "Amazon Brand Symbol Men's Stretch Jogger Jeans, Relaxed Fit, Light Grey",
    description: [
      "Symbol's cotton-rich stretch jogger jeans are down to ₹499 on Amazon, 77% below their M.R.P.",
      "They are cut with a relaxed hip and thigh and a tapered leg, and finish in cuffed hems with an elasticated waistband and drawcord. Classic 5-pocket styling and a zip fly with button keep them looking like regular denim.",
      "The fabric is a cotton-poly stretch blend. The indigo dye can bleed, so wash the first few times separately. Check the size chart in the listing images before ordering.",
    ],
    variant: 'The ₹499 price was read on the light grey, waist 32 variant — other sizes and shades can be priced differently, so check yours before paying.',
    price: 499, mrp: 2199, exp: 499, av: 'In stock',
    image: 'https://m.media-amazon.com/images/I/71+dt9Vm65L._SL1500_.jpg',
  },
];
// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs channel ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  for (const m of description.matchAll(/\bat ₹([\d,]+)/gi)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (v !== d.price) throw new Error(`copy ₹${v} != price ₹${d.price} ${d.productId}`);
  }
  if (!/^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL1500_\.jpg$/.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}

const file = process.argv[2] ?? 'tg-0926af-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
