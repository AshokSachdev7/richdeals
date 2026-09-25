// TELEGRAM-DEAL-MONITOR tick 2026-09-25am
//
// Sidebar scan of 13 groups -> 4 new link.amazon shortlinks (ONLINE SHOPPING DEALS x3, Dealzone x1), 1 myntr.it (category listing, rejected).
// All 4 resolved + verified in the logged-in tab (#corePriceDisplay, #centerCol M.R.P., #availability, buy box, hiRes image).
// All 4 ASINs are already LIVE in the DB. Wonderchef B0CH34WWFR unchanged at ₹1,190 -> skipped.
// The other 3 dropped in price -> refresh rows via /admin/deals/bulk (upsert on store+productId, logs priceHistory).
// Existing slugs are pinned because the upsert overwrites slug — the URLs must not move.
import { writeFileSync } from 'node:fs';

const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  { productId: 'B07P8KPQJ1', slug: 'solimo-glass-lunch-box-set-2x400ml-with-bag-b07p8kpqj1', was: 499,
    name: 'Solimo Glass Lunch Box Set with Sliding Air Vents and Bag (2 x 400 ml)', price: 467, mrp: 1060, img: '811I0PbY0JL._SL1500_.jpg',
    variant: 'Confirm the 2 Pieces, 400 ml option is selected — other sizes on the same page are priced differently.', description: [
    "A glass tiffin solves the two complaints people have with plastic lunch boxes: the smell and stain that curry leaves behind, and the worry about heating food in plastic. Glass does not hold on to haldi or oil, and it goes straight from the fridge to the office microwave.",
    "This Solimo set, from Amazon's own home brand, has two 400 ml borosilicate glass containers with airtight plastic lids and a carry bag. Each lid has a silicone gasket to stop leaks and a sliding air vent — slide it open before microwaving and the steam escapes, so the lid lifts off without a fight. The glass is listed as lead- and cadmium-free, freezer-safe and dishwasher-friendly.",
    "Two 400 ml boxes fit a typical office lunch: sabzi or dal in one, rice or rotis in the other. Remove the lid before microwaving, or at least open the vent, since the lid itself is plastic. Avoid moving a box straight from the freezer into a hot oven — borosilicate handles heat well, but sudden large jumps can still crack it.",
  ] },
  { productId: 'B0GGB2RWF3', slug: 'lakme-peptide-lip-iv-with-5-peptide-niacinamide-complex-for-intense-hydration-with-a-serum-like-texture-that-visibly-plumps-smoothens-and-repairs-peptalk-pink-10g', was: 199,
    name: 'Lakme Peptide Lip IV, 5% Peptide-Niacinamide Lip Treatment, Peptalk Pink, 10 g', price: 163, mrp: 399, img: '51yhkT-hbmL._SL1000_.jpg',
    variant: 'Confirm the Peptalk Pink, 10 g shade is selected — other shades on the same page can be priced differently.', description: [
    "Lip treatments sit somewhere between a lip balm and a tinted gloss: they are meant to repair dry, flaky lips over time while adding a little colour and shine. Peptides and niacinamide are the ingredients skincare brands now use to make that repair claim, borrowed from face serums.",
    "Lakme's Peptide Lip IV lists a 5% peptide and niacinamide complex, hyaluronic acid for a plumper look, and a blend of butters including shea for moisture. It has a soft silicone applicator and a serum-like texture rather than a waxy stick. Peptalk Pink is a sheer pink shade, and the tube holds 10 g.",
    "Apply a thin layer before bed and again in the morning under or instead of lipstick. Dry, cracked lips improve faster if you stop licking them and drink enough water — no balm fixes dehydration on its own. Patch-test on the inner wrist first if you react to new cosmetics, and close the cap tightly so the applicator does not dry out.",
  ] },
  { productId: 'B0GSZ2PHQF', slug: 'lakme-blush-and-glow-jelly-face-wash-150-g-b0gsz2phqf', was: 247,
    name: 'Lakme Blush & Glow Jelly Face Wash with Avocado, Matcha & Salicylic Acid, 150 g', price: 195, mrp: 490, img: '51jCzumBBTL._SL1000_.jpg',
    variant: 'Confirm the 150 g pack is selected — other sizes on the same page are priced differently.', description: [
    "Oily skin needs a face wash that removes sebum without stripping the skin so hard that it overproduces oil to compensate. Salicylic acid is the usual answer, because it dissolves inside pores rather than only cleaning the surface.",
    "This Lakme Blush & Glow face wash is a jelly-textured cleanser with salicylic acid, avocado and matcha. The brand pitches it for oily and acne-prone skin in both men and women, for unclogging pores and cutting shine, while the jelly base is meant to leave skin comfortable rather than tight. The tube holds 150 g, which lasts about two months with twice-daily use.",
    "Use a coin-sized amount on wet skin, massage for 30 to 60 seconds, and rinse with lukewarm water. Twice a day is enough — washing more often dries skin out. Salicylic acid can make skin more sensitive to sun, so pair it with sunscreen during the day, and skip it on broken or freshly waxed skin.",
  ] },
];

const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live Amazon price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock. Down from ₹${inr(d.was)} when we last listed it.`].join('\n\n');
  const row = {
    slug: d.slug,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
    description, howTo: HOWTO('Amazon', d.name.split(',')[0], d.variant, NO_COUPON), image: IMG(d.img),
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: 'Amazon', productId: d.productId, affiliateUrl: AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp || row.price >= d.was) throw new Error(`bad price ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) console.log(`description too thin ${d.productId}: ${description.length}`);
  out.push(row);
}

const file = process.argv[2] ?? 'tg-0925am-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
