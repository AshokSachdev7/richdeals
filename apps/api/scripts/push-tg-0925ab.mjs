// TELEGRAM-DEAL-MONITOR tick 2026-09-25ab
//
// Sidebar read of 13 tg groups -> 3 new-looking posts. Onida QLED (B0FJ8GYB2L, id 1522) + Elevate study table
// (B0HC469Y9L, id 11114) already in DB. Maybelline B0FL411HHN new: verified in logged-in Amazon tab
// (#corePrice 259, #centerCol M.R.P. 749, ships 1-2 days, no coupon).
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B0FL411HHN', name: 'Maybelline New York Superstay Matte Ink Liquid Lipstick, Warrior',
    price: 259, mrp: 749, image: IMG('41MlAQ8kxKL._SL1000_.jpg'),
    description: [
      "Superstay Matte Ink is Maybelline's long-wear liquid lipstick: it goes on as a thin liquid film and dries down to a flat matte finish that is rated for up to 16 hours. It is the lipstick people pick for long office days, weddings and travel, when there is no chance to touch up after every cup of chai or meal.",
      "This listing is the shade Warrior, one of 36 shades in the current range. The formula is described as smudge-proof, transfer-proof and waterproof, and the arrow-shaped applicator lets you line and fill the lips in one go without a separate liner. The tube uses the newer lightweight packaging; the formula inside is unchanged.",
      "Apply to clean, dry lips and let the first layer set for a minute before pressing the lips together. Because it is a true matte, it can feel drying, so a thin lip balm an hour before helps. Remove it with an oil-based or bi-phase makeup remover rather than scrubbing, since plain water and face wash will not lift it.",
    ],
    variant: 'Confirm the shade Warrior is selected — other shades on the same page can be priced differently.',
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
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, NO_COUPON), image: d.image,
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

const file = process.argv[2] ?? 'tg-0925ab-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
