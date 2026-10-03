// DEAL-INGEST indiafreestuff tick 2026-10-04c
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 36 new slugs, 25 single-product candidates resolved
// (21 Amazon, 2 Myntra, 1 Flipkart, 1 already rejected). Pushed 5 Amazon (logged-in Amazon tab: whole-rupee core price,
// #availability In stock, add-to-cart present, no low-stock line) + 1 Flipkart (browser tab ld+json price 1842 == IFS card,
// InStock, 3.7 stars / 311 ratings). Rejected: paise prices (Negi toy 117.09, Cortina sofa cover 312.49, Solimo net 239.84,
// LifeWear knee cap 200.19, Madhabi adapter 234.59 + only 2 left), unavailable / no add-to-cart (FCUK watch, DIY drill,
// Kingdomino, Laxeric shirt, Fastrack watch), rating <=3.5 (lip mousse 3.4, Adilqadri attar, lip crayons, myPAPERCLIP
// journal, table-tennis trainer 3.2), no ratings (Pot and Bloom), Myntra drift (Nike cargo 1998 vs 2498, Adidas kids
// 599 vs 1999). Skipped pre-resolve: bank-card, apply-coupon, upto-N% hubs, FMCG. Copy is original.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com/${d.fkPath}?pid=${d.productId}&affid=djhackraj`,
};
const IMG = {
  Amazon: /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/,
  Flipkart: /^https:\/\/rukmini[m\d]?\d?\.flixcart\.com\/image\//,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const DEALS = [
  A('B0DZX69TYT', 'Fashion Colour Splash Dual Side Mascara for Women, Sakura Pink and Black', 157, 349, '71u7RmIM1WL._SL1500_', [
    "Fashion Colour's Splash dual-side mascara is ₹157 on Amazon, 55% below the M.R.P.",
    'One tube carries two wands: one end builds volume and the other lengthens and separates lashes, so a single product covers a quick daytime look and a heavier evening one. Buyers rate it 4.1 stars across 32 reviews.',
    'A two-in-one tube also saves space in a travel pouch, where carrying two mascaras is rarely worth it.',
  ], 'This listing is the Sakura Pink and Black dual-side tube.'),
  A('B07QXBQ9YC', 'INOVERA 24-Compartment Acrylic Lipstick Organizer, Pack of 2', 299, 799, '7141G59w21L._SL1500_', [
    'A pair of INOVERA 24-slot acrylic lipstick organizers is ₹299 on Amazon, 63% off the M.R.P.',
    'Each clear stand holds 24 lipsticks, lip crayons or nail polish bottles upright, so every shade is visible at a glance instead of buried in a drawer. Buyers rate them 4.4 stars across 368 reviews.',
    'Two units side by side on a dresser hold close to 50 tubes; one can also go in the bathroom for skincare tubes and pens.',
  ], 'This is the transparent pack of 2.'),
  A('B0GJSKGZT2', 'INOVERA Mushroom Blanket Clips for Duvets, Quilts and Bedsheets, 16 Pieces', 289, 799, '61PKZiFhBeL._SL1500_', [
    "INOVERA's 16-piece mushroom-shaped blanket clips are ₹289 on Amazon, 64% below the M.R.P.",
    'The clips pin a quilt or duvet to its cover so the filling does not bunch into one corner, and they also hold a bedsheet in place on a slippery mattress. The anti-slip design grips fabric without needle holes. Buyers rate them 4.7 stars across 18 reviews.',
    'Sixteen pieces cover four corners on up to four quilts, which is enough for a whole household before winter.',
  ], 'This listing is the 16-piece pack.'),
  A('B0DXBR6Z8N', 'Makeup Brush Set, 13 Brushes with 4 Beauty Blenders and Silicone Brush Cleaner', 213, 1199, '711JxDo0IBL._SL1500_', [
    'This 13-brush makeup kit with four blender sponges and a silicone cleaning pad is ₹213 on Amazon, 82% off the M.R.P.',
    'The brushes cover foundation, powder, blush, eyeshadow and blending, the sponges handle liquid foundation and concealer, and the textured silicone pad scrubs product out of bristles during washing. Buyers rate the set 3.9 stars across 153 reviews.',
    'It is a sensible starter kit for someone building a first makeup collection, or a spare set to keep in a travel bag.',
  ], 'This listing ships as the 3-item combo: brushes, sponges and cleaner.'),
  A('B08X4KSTB4', 'De Jure Fitness PVC Dumbbells, 1 kg, Set of 2', 499, 699, '81poJBWoppL._SL1500_', [
    'A pair of De Jure Fitness 1 kg PVC dumbbells is ₹499 on Amazon, 29% below the M.R.P.',
    'Light 1 kg weights suit toning, rehab exercises, aerobics and warm-ups rather than heavy lifting. The PVC coating will not scratch a floor and is easy to wipe after a sweaty session. Buyers rate them 3.7 stars across 17 reviews.',
    'Light dumbbells are the usual first step for beginners and older adults starting home exercise.',
  ], 'This listing is the 1 kg pair (one weight in each hand).'),
  { store: 'Flipkart', productId: 'DBLGRDVR7XKP5GVH', fkPath: 'krx-3-1-convertible-30-kg-pvc-adjustable-dumbbell/p/itmea62792362c17',
    name: 'KRX 3-in-1 Convertible 30 kg PVC Adjustable Dumbbell Set', price: 1842, mrp: 9999, exp: 1842, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/dumbbell/p/a/m/3-in-1-convertible-30-kg-pvc-30-krx-original-imagrdsfazzxygyu.jpeg?q=70',
    description: [
      "KRX's 3-in-1 convertible 30 kg PVC weight set is ₹1,842 on Flipkart, 82% under the M.R.P.",
      'The plates and bars reconfigure into a pair of adjustable dumbbells, a single barbell or a kettlebell, so one box covers curls, presses, rows, squats and swings. Buyers rate it 3.7 stars across 311 ratings.',
      'PVC-filled plates are bulkier than cast iron for the same weight, so check that the plates fit the exercises you plan before buying.',
    ],
    variant: 'This listing is the 30 kg total-weight kit. Flipkart may add a small Protect Promise fee at checkout.' },
];
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
  if (!IMG[d.store].test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1004c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
