// DESIDIME-INGEST tick 2026-10-04l
//
// /new + homepage: 36 cards, 22 junk/other dropped (ASUS/KODAK/Lenovo Flipkart, Minutes SuperCoin landing). 10 resolved,
// 2 already in DB, 8 fresh; script skipped Myntra pair watch (price drift) + Dabur Glucoplus (no ld+json). Rejected:
// Kidsmate tricycle (price needs Prime reward credit card), Huggies diapers (FMCG), YogaBar muesli (food), toy phone
// B0FR4WTQVM (Currently unavailable, no add-to-cart). Logged-in Amazon tab verify (#centerCol + #availability +
// add-to-cart): 2 pass, PDP == card. Copy original, PDP facts only.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = { Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21` };
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const SIZE = (thing, colour) => `Pick your ${thing} on the product page. We checked the price on the ${colour} option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B0C86BDB1F', 'Morphy Richards Icon Superb 750W Mixer Grinder, 4 Jars incl. Juicer, Dark Grey', 3006, 8495, '613bIa31o6L._SL1500_', [
    "Morphy Richards' Icon Superb 750-watt mixer grinder in Dark Grey is ₹3,006 on Amazon, rated 4.1 stars across 7,380 reviews.",
    'It comes with four jars: a 1.5-litre liquidising jar, a 1-litre dry and wet grinding jar, a 0.4-litre chutney jar and a 1.8-litre juicer jar with a pulp and seed filter. The 750 W motor runs at up to 20,000 RPM, with three speeds and a pulse setting for short bursts.',
    'Morphy Richards gives a 1-year brand warranty. The juicer jar makes this a mixer and juicer in one, so you do not need a separate juicer for fruit and vegetables.',
  ], 'We checked the price on the Dark Grey option.'),
  A('B0H6JP1SM4', 'Skybags Brat Pro Max 35L Laptop Backpack (Up to 15.6 inch), 3 Compartments, Black', 799, 2100, '71FlP-n8xNL._SL1500_', [
    "Skybags' Brat Pro Max 35-litre laptop backpack in Black is ₹799 on Amazon, rated 4.6 stars across 230 reviews. Amazon marks it as the lowest price in 30 days.",
    'It has three compartments, including a padded sleeve for laptops up to 15.6 inches, a quick-access front pocket and two side bottle pockets. Inside there is an organiser with a key holder and a hidden pocket for valuables. A rain cover is included.',
    'The shoulder straps are padded and the back panel is air mesh, so it suits a daily college or office commute. Skybags backs it with a 12-month international warranty against manufacturing defects.',
  ], 'We checked the price on the Black option. Other colours are listed at different prices, so confirm it after you pick yours.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  // every ₹ figure in our copy must be the live price, except per-unit ("about ₹") and M.R.P. ("against a ₹") mentions
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'dd-1004l-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
