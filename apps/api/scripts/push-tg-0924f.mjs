// TELEGRAM-DEAL-MONITOR tick 2026-09-24f
//
// Sidebar read: 4 fresh single-product posts (SB Loots fktr.in, Dealdost amzn.to, Rogerkart fkrt.co,
// CoolzTricks fkrt.cc). PDP-verified: Onida 55" Mini LED QLED TV (Amazon ₹43,499 live; post quoted
// ₹39,749 after a ₹3,750 bank offer — listed at the pre-bank price) and Adrenex Stryker 24T cycle
// (Flipkart ld+json ₹3,095 = posted, InStock). Rejected: Zebronics Zeb-Jet headphone (₹799 posted,
// ₹1,699 live) and CoolzTricks cabin suitcase (category page, not a product).
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
    store: 'Amazon', productId: 'B0FJ8FW86L', name: 'ONIDA 55 inch Nexg 4K QLED Mini LED Google TV MZ55MIN',
    price: 43499, mrp: 69990, image: IMG('816ga6oxehL._SL1500_.jpg'),
    affiliateUrl: 'https://www.amazon.in/dp/B0FJ8FW86L?tag=ashoksachdev-21',
    description: [
      "A 55-inch screen is the size most Indian living rooms settle on: big enough to feel like an upgrade from a 43-inch set at a normal 8-to-10-foot viewing distance, without dominating the wall. The question at this size is less about resolution — everything is 4K now — and more about the backlight, because that decides how deep blacks look and how bright HDR highlights get in a lit room.",
      "This Onida Nexg model uses a Mini LED backlight behind a QLED panel, the combination that has pushed contrast and brightness well past ordinary edge-lit LED TVs. It runs 4K (3840x2160) at 60 Hz with HDR10, HLG and Dolby Vision support plus MEMC motion smoothing, and ships with Google TV, so apps, Google Assistant voice search and Chromecast casting are built in. Connectivity is two HDMI 2.0 ports and one HDMI 2.1 port, two USB 2.0 ports, and 20 W of speaker output (2 x 10 W) with Dolby Atmos.",
      "Before buying, note three things. The 60 Hz panel is fine for films, cricket and casual console gaming, but it is not a 120 Hz gaming TV. The listing showed only one unit left in stock when checked, so the price may not hold for long. And the channel post quoted a lower figure that assumes a bank card discount of about ₹3,750 — the price below is before any bank offer, so check whether your card qualifies at checkout. Onida lists a one-year comprehensive warranty; keep the invoice.",
      `Live Amazon price is ₹${inr(43499)} against an M.R.P. of ₹${inr(69990)} — 38% off, In stock.`,
    ],
    variant: 'Make sure the page shows the 139 cm (55 inch) MZ55MIN Mini LED model — other Onida sizes are priced separately.',
    last: 'Nothing to apply on our side. If you hold an eligible bank card, Amazon may take roughly ₹3,750 more off at checkout — that bank offer is optional and not included in the price shown here.',
  },
  {
    store: 'Flipkart', productId: 'CCEHMZBVQHXGK4M3', name: 'Adrenex Stryker 24T Mountain Cycle, 85% Pre-Assembled, 16 inch Frame',
    price: 3095, mrp: 10499,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/cycle/q/f/2/stryker-24t-85-pre-assembled-24-16-adrenex-105-single-speed-resized-original-imahn96ej6kzzz7a.jpeg?q=70',
    affiliateUrl: 'https://www.flipkart.com/adrenex-stryker-24t-85-pre-assembled-24-t-inch-mountain-cycle/p/itmbe5689fd9bfc5?pid=CCEHMZBVQHXGK4M3&affid=djhackraj',
    description: [
      "A 24-inch wheel cycle is the usual step up for a child who has outgrown a 20-inch bike — roughly ages 9 to 14 — and it also suits shorter teenagers and adults who find a full 26-inch frame too tall. It is the size most families buy for school commutes and neighbourhood rides, where a light, simple single-speed bike is easier to live with than a geared one.",
      "The Adrenex Stryker 24T is a mountain-style, single-speed cycle with 24-inch wheels and a 16-inch frame, finished in sea blue with black. It arrives about 85% pre-assembled, so the remaining work at home is typically fitting the handlebar, pedals and front wheel with basic tools — Flipkart lists installation as do-it-yourself. On Flipkart it holds a 3.9-star average across more than 1,100 ratings, with buyers scoring looks and value higher than gears and brakes.",
      "Check two things before ordering. First, pick the right size: the listing also offers a 26-inch wheel and an 18-inch frame at different prices, and the price below is for the 24-inch wheel with the 16-inch frame. Second, since the brakes score lower in reviews, plan to have them adjusted at a local cycle shop after assembly. The seller offers 7-day replacement. Flipkart may show a lower figure after card offers; the price below is before any bank discount.",
      `Live Flipkart price is ₹${inr(3095)} against an M.R.P. of ₹${inr(10499)} — 71% off, In stock.`,
    ],
    variant: 'Select Wheel Size 24 inches and Frame Size 16 inch before adding to cart — other sizes are priced differently.',
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

const file = process.argv[2] ?? 'tg-0924f-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
