// TELEGRAM-DEAL-MONITOR tick 2026-09-26ad
//
// Sidebar sweep of 13 groups turned up 3 new links. Dealzone link.amazon/B07ft6Sfr and Dealdost amzn.to/4ybXNW1 both
// resolved to B0G8JVRTGK (Samsung 215 L Hydrangea Plum). The PDP shows ₹20,890 plus a ₹750 clip coupon; the channel's ₹18,390
// only exists after that coupon and an SBI EMI offer, so it was rejected (clip-coupon rule).
// SB Loots amazn.lt/HBrkSaQj resolved to B0FDFVQLRD (Story@Home 20-pack microfibre cloth). #centerCol in the logged-in tab
// shows ₹215 against an M.R.P. of ₹699, no coupon, in stock — the same as the channel. Copy uses only the PDP title + bullets.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
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
    store: 'Amazon', productId: 'B0FDFVQLRD',
    name: 'Story@Home Microfiber Cleaning Cloth Roll, Pack of 20, 360 GSM, Yellow',
    description: [
      "A tear-off roll of 20 reusable microfibre cloths, now at ₹215 on Amazon, 69% below its M.R.P. — about ₹11 a cloth.",
      "Each Story@Home cloth is 25 x 25 cm, cut from 360 GSM microfibre and pre-perforated on a roll, so you pull off one sheet at a time like kitchen paper. The maker rates each cloth for up to 200 washes.",
      "It suits kitchens that burn through paper towels, and works on glass, furniture, cars, bikes and electronics. These are thin wipe-down cloths, not heavy bath or hand towels.",
    ],
    variant: 'Confirm the yellow 20-piece roll is selected — other pack sizes and colours on the same page are priced differently.',
    price: 215, mrp: 699, exp: 215, av: 'In stock',
    image: 'https://m.media-amazon.com/images/I/810nYdUWiJL._SL1500_.jpg',
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

const file = process.argv[2] ?? 'tg-0926ad-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
