// TELEGRAM-DEAL-MONITOR tick 2026-09-25au
//
// Sidebar scan of 13 groups -> 6 links resolved.
// Rejected: Dealdost fkrt.it -> Flipkart furniture collection page; ONLINE SHOPPING link.amazon -> /s? search (kurta "starts ₹299").
// Already seen: Syska power bank PWBGGD4THDQZYAY6, Lavie handbag B0G38DGNKM (LIVE ₹3,459).
// SB Loots Wonderchef kadhai B0BR5J92KX: PDP ₹549, same as LIVE id 5407 -> skipped.
// CoolzTricks amzn.to -> B0F6Z571RW Homeor 6 x 900 ml jar set: PDP ₹232 / M.R.P. ₹1,199, In stock, RetailEZ -> new.
import { writeFileSync } from 'node:fs';

const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const d = { productId: 'B0F6Z571RW', slug: 'homeor-airtight-kitchen-storage-jar-set-6x900ml-b0f6z571rw',
  name: 'Homeor Airtight Plastic Storage Jar Set (6 x 900 ml, Blue)', price: 232, mrp: 1199,
  img: 'https://m.media-amazon.com/images/I/51pHtdpLu1L._SL1500_.jpg' };

const discountPct = Math.round((1 - d.price / d.mrp) * 100);
const perJar = Math.round(d.price / 6 * 100) / 100;
const description = [
  "Loose dal, rice, poha and sugar in half-open packets are how a kitchen shelf ends up with ants, damp lumps and stale snacks. A matched set of airtight jars fixes that for staples you use every day, and lets you see at a glance what is running low before the next grocery order.",
  "This Homeor set has six identical 900 ml containers in blue. The listing describes them as food-grade, BPA-free plastic with a clear body, a flip-top lid and a silicone gasket that seals the lid airtight. The jars are stackable, so six of them take up a single shelf footprint rather than six. 900 ml suits dry goods such as dal, pulses, oats, pasta, sugar, tea, coffee, nuts and dried fruit; it is on the small side for a family's monthly rice or atta, which need a larger bin.",
  "Wash and fully dry the jars and gaskets before the first fill, since trapped moisture is what spoils dry staples. Keep them away from the gas stove, because plastic near heat can warp, and label each lid if several staples look alike.",
  `Live Amazon price is ₹${inr(d.price)} for the set of six against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, about ₹${perJar} per jar, In stock.`,
].join('\n\n');

const row = {
  slug: d.slug,
  title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
  description,
  howTo: [
    'Tap Grab Deal to open the Homeor jar set on Amazon at the live price.',
    'Confirm the 900 ml, set of 6, Blue option is selected — other sizes and colours on the same page are priced differently.',
    'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
    NO_COUPON,
  ],
  image: d.img, price: d.price, mrp: d.mrp, discountPct,
  isSuper: d.price <= 250, isHot: d.price <= 500,
  status: 'live', store: 'Amazon', productId: d.productId, affiliateUrl: AZ(d.productId),
};
const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
if (t !== row.price) throw new Error('title/price mismatch');
if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error('bad price');
if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error('thumbnail');
if (description.length < 900) console.log(`description too thin: ${description.length}`);

const file = process.argv[2] ?? 'tg-0925au-payload.json';
writeFileSync(file, JSON.stringify({ deals: [row] }));
console.log(`pre-flight OK, 1 row -> ${file}`);
console.log(`SLUGS: ${row.slug}`);
