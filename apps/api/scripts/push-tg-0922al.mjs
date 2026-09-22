// TELEGRAM-DEAL-MONITOR tick 2026-09-22al.
// 28 sidebar rows -> 13 of 13 tracked groups present -> 4 shortlinks resolved ->
// 2 single-product candidates -> 2 survivors:
//   A. Shopsy S-GUARD padlock 2-pack — fresh, new page.
//   B. Amazon B07QX21WZQ           — dedup hit on deal 5825, in-place refresh (indexed slug kept).
//
// A: Shopsy serves no ld+json. Price read from the embedded listing JSON block carrying this
// listing's own id (LSTLQZGRXY2QRGQH4GXFR3LPI): "pricing":{"finalPrice":{"value":137},"fsp":172,
// "mrp":449}, "totalDiscount":69, availabilityStatus IN_STOCK, "listingState":"current".
// The channel's number was RIGHT this time (₹137 = the live special price, not the ₹172 FSP) —
// the opposite of tick af. Its product wording was also right: the spec block reads
// "Sales Package: 2 Locks, 6 Keys", "Net Quantity: 2", while the listing TITLE says only
// "Active Black", which is what would mislead a buyer reading the title alone.
// Shopsy is NOT Flipkart, so the wrapper is Cuelinks (cid=527), never affid=djhackraj.
//
// B: PDP read in the logged-in Amazon tab (curl is bot-blocked): ₹549.00, In stock, no M.R.P.
// block on the page any more. NonStopDeals shouted ₹151 — a 72% gap against a PDP that has not
// moved. Channel price rejected, stored price 549 confirmed, mrp 1009 left as stored. The row
// still needed rewriting: howTo was EMPTY, the description was 261 chars, and the image was the
// low-ID 412FgqYM0vL asset rather than the PDP's own 71ai9fuNHEL landing image.
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

// ---------------------------------------------------------------- A. Shopsy, new page
const SHOPSY_URL =
  'https://www.shopsy.in/s-guard-active-black-52mm-7-levers-padlocks-door-padlock/p/itm56d39241d6983?pid=LQZGRXY2QRGQH4GX';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const A = {
  productId: 'LQZGRXY2QRGQH4GX',
  storeSlug: 'shopsy',
  storeName: 'Shopsy',
  name: 'S-GUARD Active 7-Lever 52 mm Iron Padlock, Pack of 2 (Black, Gold)',
  price: 137,
  mrp: 449,
  image:
    'https://rukminim2.flixcart.com/image/1114/972/xif0q/shopsy-lock/n/j/z/key-active-black-52mm-7-levers-padlocks-for-door-s-guard-original-imagrxy2dh4m8bz2.jpeg',
  description: [
    'Two 52 mm iron padlocks in one box, six keys between them — three keys per lock, which is the detail that decides whether a lock is usable in a house where more than one person needs to open the same gate. The listing title names one colour, but the sales package is two locks, one black and one gold-finish, so this is a pair and not a single unit.',
    'Seven levers is the mechanism grade here. A lever lock resists casual picking better than the three- and four-lever budget padlocks that sit at the same price, and the 52 mm body is the common middle size — big enough for a main gate hasp or a shop shutter, small enough that it still closes on a standard cupboard or window latch.',
    'Body and shackle are iron, so this belongs on a door, gate, office cabinet or window rather than on a sea-facing balcony rail where a brass or stainless body would last longer. Ideal usage listed by the brand is gate, door, office and window, and the key-operated mechanism means there is no combination to forget and nothing battery-powered to fail.',
    'Live Shopsy price is ₹137 against an M.R.P. of ₹449 — 69% off, which works out to roughly ₹69 a lock. The listing is in stock, cash-on-delivery eligible, carries Shopsy’s 7-day return policy and a 3-day dispatch SLA, and is rated 3.7 from 2,085 buyers.',
  ].join('\n\n'),
  howTo: [
    'Tap Grab Deal — it opens the S-GUARD padlock listing on Shopsy at the live price.',
    'Read the sales package, not the title, before you order. The title says "Active Black", but the spec block reads 2 Locks and 6 Keys with a net quantity of 2 — one black and one gold — so ₹137 buys the pair, not a single padlock.',
    'Add to cart and check out. Shopsy prices on low-ticket hardware move daily, and this listing already shows three price tiers (₹449 M.R.P., ₹172 selling price, ₹137 live), so confirm the figure on the page still matches what is shown here.',
    'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
  ],
};

A.discountPct = Math.round((1 - A.price / A.mrp) * 100);
A.slug = `${kebab(A.name).slice(0, 80).replace(/-+$/, '')}-${A.productId.toLowerCase()}`;
A.title = `${A.name} at ₹${A.price.toLocaleString('en-IN')} (${A.discountPct}% Off) – Shopsy`;
// Cuelinks: Shopsy is not Flipkart. marketplace / affid already stripped from the clean URL.
A.affiliateUrl = `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(SHOPSY_URL)}`;

// ---------------------------------------------------------- B. Amazon 5825, in-place refresh
const B = {
  id: 5825,
  productId: 'B07QX21WZQ',
  price: 549, // PDP confirms the stored figure; the channel's ₹151 is wrong
  mrp: 1009, // no M.R.P. block on the PDP today — stored value kept, not invented
  image: 'https://m.media-amazon.com/images/I/71ai9fuNHEL._SL1500_.jpg',
};
B.discountPct = Math.round((1 - B.price / B.mrp) * 100);
B.title = `TrustBasket UV-Treated Plastic Round Pot 6 Inch, Set of 12 (Black) at ₹${B.price.toLocaleString('en-IN')} (${B.discountPct}% Off) – Amazon`;
B.description = [
  'Twelve 6-inch round plastic pots in one pack, which is the size most people use for the middle stage of a plant’s life — past the seedling tray, before the 10- or 12-inch pot a mature plant needs. At that size a set of twelve covers a full balcony row of herbs, succulents or young ornamentals without buying pots one at a time at a nursery counter.',
  'The plastic is UV-treated and moulded from virgin plastic rather than recycled scrap. That matters on an Indian balcony or terrace specifically: untreated plastic pots left in direct sun go chalky and brittle inside a season, and a brittle pot cracks at the rim the first time it is lifted while wet. UV treatment is what keeps the black from fading and the wall from going crisp.',
  'Each pot carries large drain holes, which is the single most common failure point in cheap plastic pots — a pot with one small hole waterlogs and rots roots no matter how carefully it is watered. They are light and they stack, so the twelve store flat when they are not planted and can be moved with one hand when they are.',
  `Live Amazon price is ₹${B.price.toLocaleString('en-IN')} for the set of 12 — about ₹46 a pot — against an M.R.P. of ₹${B.mrp.toLocaleString('en-IN')}, ${B.discountPct}% off, In stock.`,
].join('\n\n');
B.howTo = [
  'Tap Grab Deal to open the TrustBasket 6-inch pot set on Amazon.in at the live price.',
  'Check what the price covers before you add to cart. ₹549 is the whole set of 12 pots, roughly ₹46 each — a deal channel circulated ₹151 for this listing, and the product page does not show that figure. These are pots only: no soil, no drip trays and no plants are included.',
  'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page matches what is shown here.',
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];

// ------------------------------------------------------------------------- pre-flight
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukminim?\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const THUMB = /_(SX\d+|SY\d+|SX\d+_SY\d+)_/;
for (const d of [A, B]) {
  const t = Number((d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, ''));
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (THUMB.test(d.image)) throw new Error(`low-res thumbnail ${d.productId}: ${d.image}`);
  if (d.description.length < 900) throw new Error(`description too thin ${d.productId}: ${d.description.length}`);
  if (!Array.isArray(d.howTo) || d.howTo.length !== 4) throw new Error(`howTo must be a 4-step array ${d.productId}`);
}
if (!A.slug.endsWith(A.productId.toLowerCase())) throw new Error('slug missing productId');
if (/affiliate_id|affid=|[?&]lid=|marketplace=/.test(A.affiliateUrl)) throw new Error('foreign tracking param in affiliateUrl');
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
if (!before) throw new Error('deal 5825 is gone');
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
} else {
  console.log(`price unchanged at ${after.price} — no PriceHistory row`);
}
slugs.push(after.slug);
console.log(`refreshed id=${B.id} desc=${before.description.length}->${B.description.length} howTo=${before.howTo.length}->${B.howTo.length} img=${before.image !== B.image ? 'swapped' : 'same'}`);

console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
