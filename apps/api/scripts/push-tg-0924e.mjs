// TELEGRAM-DEAL-MONITOR tick 2026-09-24e
//
// Sidebar read: 3 fresh single-product posts (Dealdost fkrt.cc, CoolzTricks amzn.to, Dealzone link.amazon).
// PDP-verified: MAGIK 20W LED 4-pack (Amazon, ₹729 live) and Adilqadri Lazina EDP 20 ml (Flipkart
// ld+json ₹198 = posted ₹198, InStock). Rejected: Aksmit Alto 800 fender light (₹296 posted, ₹849.57 live).
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;

const HOWTO = (store, what, variant) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B0H4H6WT3F', name: 'MAGIK Grande 20W LED Bulb, Cool White 6500K, B22, Pack of 4',
    price: 729, mrp: 1899, image: IMG('8102i1jPgdL._SL1500_.jpg'),
    affiliateUrl: 'https://www.amazon.in/dp/B0H4H6WT3F?tag=ashoksachdev-21',
    description: [
      "A 20-watt LED is the bulb you put where a room actually needs light: a living room ceiling holder, a kitchen, a study table lamp with a B22 socket, or a shop counter. It gives the kind of output an old 100-watt incandescent or a long tube used to, while drawing a fraction of the power, so it is the obvious swap for any fitting that still feels dim in the evening.",
      "This MAGIK Grande pack carries four bulbs rated at 20 W each, in cool white (6500K) with the standard B22 push-and-twist base used in most Indian homes. Cool white is the bright, slightly bluish daylight tone — good for kitchens, work desks and bathrooms where you want to see detail. The brand pitches it for wide light spread and long life, and the listing carries a one-year warranty.",
      "Before you buy, check two things: that your holder is B22 (bayonet pins) and not E27 (screw), and that you want daylight rather than a warm yellow tone for bedrooms. The same listing also offers 5 W to 15 W wattages and packs of 1 to 10, and each combination is priced separately — the price here is for the 20 W pack of 4, which works out to about ₹182 per bulb. Keep the box and invoice for a warranty claim.",
      `Live Amazon price is ₹${inr(729)} against an M.R.P. of ₹${inr(1899)} — 62% off, In stock.`,
    ],
    variant: 'Make sure the page shows Size: Pack of 4 and Wattage: 20 Watts — other packs and wattages are priced differently.',
  },
  {
    store: 'Flipkart', productId: 'PERHFQ4SKJDCH2RU', name: 'Adilqadri Lazina Eau de Parfum 20 ml, Unisex Fruity Floral',
    price: 198, mrp: 699,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/perfume/u/b/p/20-lazina-perfume-for-men-women-long-lasting-fruity-floral-resized-original-imahfq4sngm9wkjh.jpeg?q=70',
    affiliateUrl: 'https://www.flipkart.com/adilqadri-lazina-perfume-men-women-long-lasting-fruity-floral-fragrance-eau-de-parfum-20-ml/p/itmf3bfbf3fe389c?pid=PERHFQ4SKJDCH2RU&affid=djhackraj',
    description: [
      "A 20 ml bottle is the sensible way to try a new scent. It is small enough to carry in a pocket, bag or gym kit, and cheap enough that you are not stuck with a full-size bottle of something that turns out not to suit your skin. It also makes an easy low-cost gift for someone whose taste you are not sure of.",
      "Lazina comes from Adilqadri, a brand known in India for attars and budget perfumes. This one is an eau de parfum — a higher oil concentration than an eau de toilette or a body spray — with a fruity and floral profile that the brand pitches as unisex and long-lasting. On Flipkart it holds a 4.1-star average from several hundred ratings, and it is sold directly by Adilqadri's own seller account.",
      "Two things to know before ordering. Flipkart lists this item as non-returnable, so if you are unsure about fruity florals, read a few recent reviews first. And fragrance lasts longest on moisturised skin: spray on pulse points rather than clothes, and keep the bottle out of heat and direct sunlight so the oils do not break down. Flipkart may show a slightly lower figure after card offers; the price below is before any bank discount.",
      `Live Flipkart price is ₹${inr(198)} against an M.R.P. of ₹${inr(699)} — 72% off, In stock.`,
    ],
    variant: 'Confirm the page shows the 20 ml Lazina variant sold by Adilqadri before adding it to cart.',
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
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant), image: d.image,
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
  const pctLine = description.match(/— (\d+)% off/);
  if (!pctLine || Number(pctLine[1]) !== discountPct) throw new Error(`pct line ${d.productId}: ${pctLine?.[1]} vs ${discountPct}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0924e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
