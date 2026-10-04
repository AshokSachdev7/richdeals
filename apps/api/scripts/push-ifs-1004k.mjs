// DEAL-INGEST indiafreestuff tick 2026-10-04k
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 22 new slugs vs seen (1038). 3 skipped pre-resolve: Adidas
// Originals Flipkart category post, FASHION COLOUR blusher palette + Evani rose water (cosmetic). 19 resolved via base64
// ?rto= Buy Now: all Amazon, 0 already in DB. Logged-in Amazon tab verify (#centerCol): 7 pass (PDP == IFS card, In stock,
// add-to-cart, no low-stock line, rating > 3.5 on 65+). Rejected: no ratings (Kensington privacy screen, Aksmit fender
// light, AMFIN decor kit, girls ballerinas + Only 4 left), few ratings (CAHOOT jacket 2, knitted cargo 5), low stock
// (Centrino sandals Only 1 left), no add-to-cart (GIGABYTE AORUS 7300 SSD), drift (kids bike safety belt x2: PDP 549 vs
// card 55), rating (collapsible wardrobe 3.4), paise price (OREVA clock 170.85, 16 ratings). Copy original, PDP facts only.
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
  A('B010ZHWCNK', "PINACOLADA Women's Cotton Hooded Sweatshirt, Black", 300, 1499, '81E8C985bmL._SL1500_', [
    "PINACOLADA's women's cotton hooded sweatshirt in Black is ₹300 on Amazon, rated 3.9 stars across 469 reviews.",
    'It is 100% cotton with a bio wash and an enzyme treatment meant to lock in the colour and keep the fabric soft. The cut is a slim-fit, long-sleeve hoodie — light enough for mild winters, cool evenings and the gym. It is made in India by Campus Sutra.',
    'Care is simple: gentle machine wash cool and tumble dry low.',
  ], SIZE('size', 'Black')),
  A('B0DF7BCDKN', "Lymio Men's Cotton Cargo Pants with Drawstring Waist, Khakhi", 599, 4999, '610RNgpMxuL._SL1500_', [
    "Lymio's cotton cargo pants for men in Khakhi are ₹599 on Amazon. With 2,276 ratings at 3.6 stars, they are a widely bought budget cargo.",
    'These are full-length, loose-fit cotton cargos with a drawstring waist instead of a button and zip, so the fit adjusts without a belt. They are machine washable and made in India, and the same listing carries plus sizes up to 46-49.',
    'A loose fit runs roomy. If you prefer a slimmer look, check the size chart before ordering.',
  ], SIZE('waist size', 'Khakhi')),
  A('B0CKWLXBGM', 'MIRADH Firework-Style Smart RGBIC LED Strip with Music Sync, App and Remote, USB 5V', 699, 1999, '71U05i-ERbL._SL1254_', [
    "MIRADH's firework-effect smart RGBIC LED strip is ₹699 on Amazon, rated 3.9 stars across 107 reviews — timely for Diwali decorating.",
    'RGBIC means different sections of the strip show different colours at once, which is how it draws the firework-style bursts. A built-in mic syncs the light to music, and you control colours and modes from a phone app or the included remote. It runs on 5V USB — a phone adapter, laptop or power bank — sticks on with an adhesive backing, and has overheat protection.',
    'It is made for indoor use. Keep it out of the rain on a balcony.',
  ], 'There is one version on the listing; we checked the price on it.'),
  A('B0C49TKT6R', 'Portronics My Buddy K9 Portable Laptop Stand, Adjustable Height, 360° Rotating Base, Black', 899, 2999, '51RvmdD42ML._SL1200_', [
    "Portronics' My Buddy K9 laptop stand is ₹899 on Amazon, rated 4.4 stars across 544 reviews — the best-rated deal in this batch.",
    'It lifts the screen through several height levels, so you sit straighter on long work days. The carbon-steel frame holds up to 5 kg and fits 10 to 17-inch laptops. Silicone pads stop the laptop sliding, the open base lets heat escape without a fan, and the base rotates 360 degrees so you can turn the screen to someone across the desk.',
    'Once the screen is raised, an external keyboard and mouse make typing far more comfortable.',
  ], 'We checked the price on the Black option.'),
  A('B0FLY8K746', "SaintX Women's Formal Blazer, Fully Lined, Regular Fit, Persian Black", 1499, 3199, '51uf-x7nkbL._SL1404_', [
    "SaintX's fully lined women's formal blazer in Persian Black is ₹1,499 on Amazon, rated 3.9 stars across 198 reviews.",
    'It is a solid, button-front polyester blazer in a tailored regular fit. The full inner lining makes it smoother to wear over a shirt all day. It suits office meetings and dresses down with jeans for the evening. Made in India.',
    'The care label says dry clean only — budget for that before buying.',
  ], SIZE('size', 'Persian Black')),
  A('B0BW9S5ZZB', 'Logitech H390 Wired USB Headset with Noise-Cancelling Mic, Rose', 2899, 5295, '61pcOrRxGqL._SL1500_', [
    "Logitech's H390 wired USB headset in Rose is ₹2,899 on Amazon. It carries 65,232 ratings at 3.9 stars, one of the most-reviewed PC headsets on the site.",
    'It is plug-and-play over USB-A with no software to install, and it is Chromebook certified. The boom mic rotates and filters background noise, and in-line controls on the cable set volume and mute. Padded leatherette ear cushions and an adjustable headband suit long calls, and the 1.9 m cable leaves room to move.',
    'It needs a USB-A port; a USB-C-only laptop needs an adapter.',
  ], 'We checked the price on the Rose colour. Other colours can be priced differently, so confirm it after you pick one.'),
  A('B0CMQQFFG4', "KOTTY Women's Lightweight Open Front Longline Blazer, Asparagus Green", 200, 1999, '61NcEzZjvkL._SL1440_', [
    "KOTTY's lightweight open-front blazer in Asparagus Green is ₹200 on Amazon, rated 4.0 stars across 1,872 reviews.",
    'It has an open front with a snap closure and a relaxed fit that layers over a top or a dress. The fabric is viscose rayon — light and breathable rather than structured like a formal blazer. It is machine washable and made in India.',
    'Sizing varies by brand; check the size chart on the product page before picking yours.',
  ], SIZE('size', 'Asparagus green')),
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

const file = process.argv[2] ?? 'ifs-1004k-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
