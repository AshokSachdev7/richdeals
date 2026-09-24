// TELEGRAM-DEAL-MONITOR tick 2026-09-24g
//
// ONLINE SHOPPING DEALS (loaded to bottom): Solimo 16pc dinner set + ONCH frock 6-pack (also Rogerkart,
// same listing). CADLEC fan already LIVE (id 4291); Halonix amzn.lt dead (DNS). PDP-verified via #centerCol.
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last ?? 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];


const DEALS = [
  {
    store: 'Amazon', productId: 'B0B7S4T6WD', name: 'Amazon Brand Solimo Ceramic 16 Piece Dinner Set, Red Strip, Serves 4',
    price: 1709, mrp: 5099, image: IMG('61O0mVzM68L._SL1500_.jpg'),
    affiliateUrl: 'https://www.amazon.in/dp/B0B7S4T6WD?tag=ashoksachdev-21',
    description: [
      "A 16-piece dinner set is the practical starter kit for a small household: enough plates, bowls and mugs for four people to eat together, without the cupboard space a 30- or 40-piece set demands. It suits a couple setting up a first home, a working professional replacing mismatched steel and melamine, or anyone who wants a matching table before the festive season brings guests over.",
      "This Solimo set is Amazon's own brand, in ceramic with a plain white body and a red strip at the rim. The box holds four dinner plates, four quarter plates, four mugs and four small bowls — so one full place setting per person, covering rice-and-curry meals, snacks, and morning tea. It carries a 4.4-star average on Amazon across roughly 90 ratings and an Amazon's Choice badge, and the listing flagged this as its lowest price in 30 days when checked.",
      "Two things to check before ordering. First, the size selector: this price is for the Serves 4 option; the Serves 6 and other variants cost noticeably more. Second, ceramic chips if it knocks against steel in the sink, so wash it separately from heavy utensils. Amazon offers 10-day replacement, which covers breakage in transit — open and inspect every piece on delivery. Card offers on the page may take a little more off; the price below is before any bank discount.",
      `Live Amazon price is ₹${inr(1709)} against an M.R.P. of ₹${inr(5099)} — 66% off, In stock.`,
    ],
    variant: 'Select Size: SERVES 4 — the Serves 6 and standard options are priced higher.',
  },
  {
    store: 'Amazon', productId: 'B0DCBBMSNS', name: 'ONCH Girls Cotton A-Line Printed Frock Dress, Pack of 6',
    price: 200, mrp: 1999, image: IMG('81mBXMXf0cL._SL1500_.jpg'),
    affiliateUrl: 'https://www.amazon.in/dp/B0DCBBMSNS?tag=ashoksachdev-21',
    description: [
      "Toddlers go through clothes fast — spills, crayons, a growth spurt every few months — so for everyday home and playschool wear, parents usually want a stack of cheap, soft cotton pieces rather than one or two expensive outfits. A multi-pack of simple frocks is exactly that: something clean to change into after every mess, without worrying when one gets stained.",
      "This ONCH pack contains six sleeveless, knee-length A-line frocks in printed 100% cotton with a round neck, made in India. Cotton is the right fabric for Indian weather at this age: it breathes, it is gentle on sensitive skin, and it survives frequent machine washing. The seller highlights double-needle stitching at the sleeves and hem, the points that usually give way first on budget kidswear. At this price it works out to about ₹33 per frock.",
      "Check the size before ordering: the listing checked here showed the 2-3 years size, and other sizes may be priced differently or out of stock. Stock was down to the last unit when verified, so this price may not last. Prints in multi-packs can vary from the photos. Amazon lists 10-day return and exchange, so size up if your child is at the top of the range. An extra 5% clip coupon was also showing on the page.",
      `Live Amazon price is ₹${inr(200)} against an M.R.P. of ₹${inr(1999)} — 90% off, In stock.`,
    ],
    variant: 'Pick the size for your child (2-3 years was the size at this price) — other sizes may be priced differently.',
    last: 'Nothing to apply on our side. If Amazon shows the 5% clip coupon on the page, tick it before checkout — it is optional and not included in the price shown here.',
  },
];

// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\// };
const out = [];
for (const d of DEALS) {
  const description = d.description.join('\n\n');
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.last), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl,
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(d.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  const pctLine = description.match(/— (\d+)% off/);
  if (!pctLine || Number(pctLine[1]) !== discountPct) throw new Error(`pct line ${d.productId}: ${pctLine?.[1]} vs ${discountPct}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0924g-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
