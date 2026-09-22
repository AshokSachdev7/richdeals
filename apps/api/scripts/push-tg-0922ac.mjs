// TELEGRAM-DEAL-MONITOR tick 2026-09-22ac
// One row survived the sidebar sweep: Livon Professional Smoothening Serum 100ml,
// already live as deal 2982 at a stale 189 with a null MRP. Dedup hit, so this is
// an in-place refresh (indexed slug preserved), not a new page.
// PDP read in the logged-in Amazon tab: 170.00, M.R.P. 495.00, In stock, 66% off.
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

const ID = 2982;
const PRICE = 170;
const MRP = 495;
const PCT = Math.round((1 - PRICE / MRP) * 100);
const IMAGE = 'https://m.media-amazon.com/images/I/61P64IwGbSL._SL1500_.jpg';
const TITLE = `Livon Professional Smoothening Hair Serum 100ml at ₹${PRICE} (${PCT}% Off) – Amazon`;

const DESC = [
  'Livon Professional Smoothening Serum is the 100ml leave-in bottle, not the small sachet pack — a thin, non-sticky liquid built to be worked through damp hair after a wash and left in, so it finishes the hair instead of sitting on it like an oil.',
  'The blend is vitamin E with avocado and almond oil, and the label is explicit about what it leaves out: no paraben, no sulphate, no mineral oil. That matters more here than in a rinse-off product, because a leave-in stays on the strand until the next wash.',
  'What it actually does is reduce friction. Frizz and tangles come from a roughened cuticle, and a serum that coats the strand lets a comb pass without dragging, which is the real reason detangling stops pulling hair out at the root. It is rated for all hair types, and the same bottle works on a blow-dry finish as on air-dried hair.',
  `Live Amazon price is ₹${PRICE} against an M.R.P. of ₹${MRP} — ${PCT}% off, and ₹${(PRICE / 100).toFixed(2)} per ml, which is the number worth comparing against the smaller pack sizes before you buy.`,
].join('\n\n');

const HOW = [
  'Open the Buy Now link — it lands on the Amazon product page for the 100ml Livon Professional Smoothening Serum.',
  `Check the pack size on the page before adding to cart. Livon sells this serum in several sizes and the ₹${PRICE} price is the 100ml bottle only — the 50ml and sachet listings are separate pages at their own prices.`,
  'Add to cart and check out. Price and stock on Amazon move without notice, so confirm the figure on the product page matches what is shown here.',
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];

// Pre-flight: the title rupee figure must equal the numeric price, the price must
// beat the MRP, and the image must come off the Amazon CDN.
const t = Number((TITLE.match(/₹([\d,]+)/) || [])[1].replace(/,/g, ''));
if (t !== PRICE) throw new Error(`title/price mismatch: title ${t} vs price ${PRICE}`);
if (PRICE >= MRP) throw new Error('no discount');
if (new URL(IMAGE).hostname !== 'm.media-amazon.com') throw new Error('bad image host');
if (DESC.length < 600) throw new Error('description too thin');
if (!Array.isArray(HOW) || HOW.length !== 4) throw new Error('howTo must be a 4-step array');

const before = await p.deal.findUnique({ where: { id: ID } });
if (!before) throw new Error('deal 2982 is gone');
if (before.productId !== 'B0CTHK1FS1') throw new Error(`productId moved: ${before.productId}`);

const after = await p.deal.update({
  where: { id: ID },
  data: {
    title: TITLE,
    description: DESC,
    howTo: HOW,
    image: IMAGE,
    price: PRICE,
    mrp: MRP,
    discountPct: PCT,
    isSuper: PRICE <= 250,
    isHot: PRICE <= 500,
    status: 'LIVE',
  },
});

if (before.price !== PRICE) {
  await p.priceHistory.create({ data: { dealId: ID, price: PRICE } });
  console.log(`priceHistory written ${before.price} -> ${PRICE}`);
}

console.log(`refreshed id=${ID} price=${before.price}->${after.price} mrp=${before.mrp}->${after.mrp} pct=${after.discountPct}`);
console.log(`SLUGS: ${after.slug}`);
await p.$disconnect();
