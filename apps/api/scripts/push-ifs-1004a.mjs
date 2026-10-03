// DEAL-INGEST indiafreestuff tick 2026-10-04a
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 23 new slugs, 17 single-product candidates resolved
// (13 Amazon, 4 Flipkart). Pushed 4 Amazon, each read in the logged-in Amazon tab (core price == IFS card price,
// #availability In stock, add-to-cart present). Rejected: paise prices (Amazon Basics multi kadai 1,762.79, Solimo strainer
// pot 1,218.48), no add-to-cart (VOLITO personalised tumbler), weak/too few ratings (KASHIVAL 3.3, adhesive hook, DDecora,
// DIY desk, dental floss, Laviland 3.4), only 1 left (RL sling bag), FreeCultr (card 231 vs PDP 224), Caprese (out of
// stock), Ambrane (already LIVE at 1,299). Skipped pre-resolve: upto-N% hubs, HDFC-card Lenovo, coupon-gated, min-buy-2.
// Copy is original.
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
const DEALS = [
  A('B0GYFG1FSS', 'Amazon Basics Health Faucet Set, Jet Spray Gun with Pipe', 499, 1999, '71XG7V1MvBL._SL1500_', [
    "Amazon Basics' health faucet set, a toilet jet spray gun with its hose, is ₹499 on Amazon, 75% below the M.R.P.",
    'The trigger spray gives a strong, controllable jet, the body resists corrosion, and the seals are built to stop drips. It fits most standard toilet spray connections and goes on without a plumber. Buyers rate it 4.7 stars across 16,504 reviews.',
    'Beyond the toilet it doubles as a hose for rinsing the bathroom floor, washing pets or cleaning a balcony.',
  ], 'This listing is a pack of 1 with the pipe included.'),
  A('B0FGXKNRF2', 'Solitude Heavy Duty Stainless Steel Kitchen Scissors with Bottle Opener', 199, 999, '71CyfKOtNnL._SL1500_', [
    "Solitude's heavy-duty kitchen scissors are ₹199 on Amazon, 80% off the M.R.P.",
    'The high-carbon stainless-steel blades have micro-serrated edges that grip chicken, fish and herbs without slipping, and the blade has a built-in bottle opener plus a grip notch for tight caps. Soft non-slip handles work for right- and left-handed use, and a blade cover is included. Buyers rate them 4.9 stars across 13 reviews.',
    'A dedicated pair of kitchen shears keeps raw meat off your stationery scissors and is faster than a knife for snipping coriander or opening milk packets.',
  ], 'This is the single multi-purpose scissor with blade cover.'),
  A('B0DVLRF2HN', 'SATVIKAYA Airtight Kitchen Storage Containers, 1500 ml, Set of 2', 179, 1999, '71V4uJpQFoL._SL1254_', [
    'This set of two SATVIKAYA 1.5-litre airtight containers is ₹179 on Amazon.',
    'The flip-top lids seal with a silicone gasket to keep dal, rice, cereals and dry fruits dry, and the BPA-free plastic is see-through so you can spot what is running low. The square shape stacks neatly on pantry shelves or in the fridge. Buyers rate it 3.9 stars across 1,722 reviews.',
    'Two 1.5-litre boxes hold roughly a kilo of most pulses each, a good size for daily-use staples next to the stove.',
  ], 'This listing is the 1500 ml size, pack of 2.'),
  A('B0FYQJB5ML', 'Boldfit DripBloc Air Mesh Casual Sneakers for Men', 899, 4499, '61wyIknxy9L._SL1500_', [
    "Boldfit's DripBloc casual sneakers for men are ₹899 on Amazon, 80% under the M.R.P.",
    'They use a breathable air-mesh upper, a soft cushioned insole and a lace-up fit, built light for daily wear, college and walks. Buyers rate them 3.8 stars across 386 reviews.',
    'Check the size chart on the listing before ordering, since sneaker sizing varies between brands.',
  ], 'Price applies to the size and colour shown; other sizes can cost more.'),
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

const file = process.argv[2] ?? 'ifs-1004a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
