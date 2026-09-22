// TELEGRAM-DEAL-MONITOR tick 2026-09-22af.
// 24 sidebar rows -> 12 of 13 tracked groups present -> 3 shortlinks resolved ->
// 3 single-product candidates -> dedup killed 1 -> 2 survivors:
//   A. Shopsy mehendi cone  — fresh, new page.
//   B. Amazon B0DQ5FZX9X    — dedup hit on deal 8902, in-place refresh (indexed slug kept).
//
// A: Shopsy serves no ld+json. Price read from the embedded listing JSON block carrying
// this listing's fetchId: "pricing":{"finalPrice":{"value":156},"fsp":178,"mrp":599},
// IN_STOCK, "listingState":"current". The channel shouted ₹180 — that is the ₹178 FSP,
// not the live selling price. PDP wins. Shopsy is NOT Flipkart, so the affiliate wrapper
// is Cuelinks (cid=527), never affid=djhackraj.
//
// B: PDP read in the logged-in Amazon tab (curl is bot-blocked): ₹6,490.00,
// M.R.P. ₹13,700.00, badge -53%, In stock. Stored row held ₹6,499 — a ₹9 drop, so
// price + pct + a PriceHistory row have to be written.
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

// ---------------------------------------------------------------- A. Shopsy, new page
const SHOPSY_URL =
  'https://www.shopsy.in/meenakshi-amar-suhag-fast-mehandi-cone-natural-mehendi/p/itm960598b128a68?pid=MEHHAJGJBVMF7XKU';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const A = {
  productId: 'MEHHAJGJBVMF7XKU',
  storeSlug: 'shopsy',
  storeName: 'Shopsy',
  name: 'Meenakshi Amar Suhag Fast Mehandi Cone, Pack of 12 (300 g)',
  price: 156,
  mrp: 599,
  image:
    'https://rukminim3.flixcart.com/image/1114/972/xif0q/mehendi/2/d/b/300-amar-suhag-fast-mehandi-cone-meenakshi-original-imahajgjgkeqpyts.jpeg',
  description: [
    'Twelve ready-to-use mehendi cones in one box, 300 g of paste across the pack — about 25 g a cone, which is the size most people finish on two palms or one full forearm design. Buying cones by the box is the only sensible way to buy them: a cone is a single-use item once the tip is cut, and a lone cone bought before a function always costs several times the per-unit price here.',
    'The paste is listed as natural henna, red-toned, and the brand states vegan, cruelty-free and sulphate/paraben-free processing. Form factor is the standard squeeze cone, so nothing has to be mixed, strained or loaded into an applicator — snip the tip and draw. Shelf life is marked at 48 months from manufacture, which is why a 12-pack is not a commitment to use it all this month.',
    'Country of origin is India. The listing is cash-on-delivery eligible with a 3-day dispatch SLA, and returns on this item are restricted, so it is worth being sure about the quantity before ordering rather than after.',
    'Live Shopsy price is ₹156 against an M.R.P. of ₹599 — 74% off, and ₹13 per cone, which is the figure worth holding against any single cone on a shop counter.',
  ].join('\n\n'),
  howTo: [
    'Tap Grab Deal — it opens the Shopsy listing for this mehendi cone box at the live price.',
    'Check the pack on the listing page before you order. A deal channel quoted this at ₹180; that ₹180 is the listing selling price, not the current one — the live price is ₹156, and what ships is the 12-cone box totalling 300 g, not a single cone.',
    'Add to cart and check out. Shopsy prices on low-ticket items move daily, so confirm the figure on the page still matches what is shown here.',
    'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
  ],
};

A.discountPct = Math.round((1 - A.price / A.mrp) * 100);
A.slug = `${kebab(A.name).slice(0, 80).replace(/-+$/, '')}-${A.productId.toLowerCase()}`;
A.title = `${A.name} at ₹${A.price.toLocaleString('en-IN')} (${A.discountPct}% Off) – Shopsy`;
// Cuelinks: Shopsy is not Flipkart. affid / lid / marketplace already absent from the clean URL.
A.affiliateUrl = `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(SHOPSY_URL)}`;

// ---------------------------------------------------------- B. Amazon 8902, in-place refresh
const B = {
  id: 8902,
  productId: 'B0DQ5FZX9X',
  price: 6490,
  mrp: 13700,
  image: 'https://m.media-amazon.com/images/I/71JwKnROg8L._SL1500_.jpg',
};
B.discountPct = Math.round((1 - B.price / B.mrp) * 100);
B.title = `Samsung 22" (54.6 cm) S3 Flat Monitor FHD 100Hz IPS at ₹${B.price.toLocaleString('en-IN')} (${B.discountPct}% Off) – Amazon`;
B.description = [
  'A 22-inch (54.6 cm) IPS panel at 1920x1080 running 100 Hz — the refresh rate is the part that matters at this price, because the default on a budget 22-inch is still 60 Hz or 75 Hz, and 100 Hz is visible the moment a window is dragged, not just in games. Response time is 5 ms GtG, with a Game Mode preset that lifts contrast for darker scenes.',
  'IPS rather than TN means the colour does not wash out when the screen is viewed from the side, which is the practical difference on a desk shared by two people or a monitor angled away from the chair. Samsung ships it as the Essential S3 line with a super-slim borderless design on three sides, so two of them sit side by side without a thick bar between the images.',
  'Inputs are HDMI and D-Sub (VGA) — worth reading twice, because there is no DisplayPort and no USB-C, so a laptop with only Type-C output needs an adapter. It is VESA wall-mountable, and carries Eye Saver Mode plus flicker-free backlighting for long sessions.',
  `Live Amazon price is ₹${B.price.toLocaleString('en-IN')} against an M.R.P. of ₹${B.mrp.toLocaleString('en-IN')} — ${B.discountPct}% off, In stock.`,
].join('\n\n');
B.howTo = [
  'Tap Grab Deal to open the Samsung S3 22-inch monitor on Amazon.in at the live price.',
  'Check the ports against your machine before adding to cart. This model carries HDMI and VGA only — no DisplayPort, no USB-C — so a Type-C-only laptop needs an adapter, and the 27-inch and 24-inch S3 variants are separate listings at their own prices.',
  'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];

// ------------------------------------------------------------------------- pre-flight
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukminim?\d?\.flixcart\.com|img\.tatacliq\.com)\//;
for (const d of [A, B]) {
  const t = Number((d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, ''));
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.description.length < 600) throw new Error(`description too thin ${d.productId}`);
  if (!Array.isArray(d.howTo) || d.howTo.length !== 4) throw new Error(`howTo must be a 4-step array ${d.productId}`);
}
if (!A.slug.endsWith(A.productId.toLowerCase())) throw new Error('slug missing productId');
if (/affiliate_id|affid=|[?&]lid=/.test(A.affiliateUrl)) throw new Error('foreign affiliate id in affiliateUrl');
if (!A.affiliateUrl.startsWith('https://linksredirect.com/?cid=527&')) throw new Error('shopsy must go through Cuelinks');
console.log('pre-flight OK, 1 create + 1 refresh\n');

// ------------------------------------------------------------------------------ write
const slugs = [];

const store = await p.store.upsert({
  where: { slug: A.storeSlug },
  update: {},
  create: { slug: A.storeSlug, name: A.storeName },
});
const dataA = {
  slug: A.slug, title: A.title, description: A.description, howTo: A.howTo,
  image: A.image, mrp: A.mrp, price: A.price, discountPct: A.discountPct,
  isSuper: A.price <= 250, isHot: A.price <= 500, status: 'LIVE',
  productId: A.productId, affiliateUrl: A.affiliateUrl, storeId: store.id,
};
const existingA =
  (await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: A.productId } } })) ??
  (await p.deal.findUnique({ where: { slug: A.slug } }));
if (existingA) {
  await p.deal.update({ where: { id: existingA.id }, data: dataA });
  if (existingA.price !== A.price) await p.priceHistory.create({ data: { dealId: existingA.id, price: A.price } });
  slugs.push(existingA.slug);
  console.log('UPD', existingA.id, existingA.slug);
} else {
  const row = await p.deal.create({ data: dataA });
  await p.priceHistory.create({ data: { dealId: row.id, price: A.price } });
  slugs.push(row.slug);
  console.log('NEW', row.id, row.slug);
}

const before = await p.deal.findUnique({ where: { id: B.id } });
if (!before) throw new Error('deal 8902 is gone');
if (before.productId !== B.productId) throw new Error(`productId moved: ${before.productId}`);

const after = await p.deal.update({
  where: { id: B.id },
  data: {
    title: B.title, description: B.description, howTo: B.howTo, image: B.image,
    price: B.price, mrp: B.mrp, discountPct: B.discountPct,
    isSuper: B.price <= 250, isHot: B.price <= 500, status: 'LIVE',
  },
});
if (before.price !== B.price) {
  await p.priceHistory.create({ data: { dealId: B.id, price: B.price } });
  console.log(`priceHistory written ${before.price} -> ${B.price}`);
}
slugs.push(after.slug);
console.log(`refreshed id=${B.id} price=${before.price}->${after.price} mrp=${before.mrp}->${after.mrp} pct=${after.discountPct}`);

console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
