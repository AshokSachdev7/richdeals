// TELEGRAM-DEAL-MONITOR tick 2026-09-22an.
// 24 sidebar rows -> 12 of 13 tracked groups present (NonStopDeals absent) -> 5 shortlinks
// resolved -> 4 single-product candidates -> 3 writes:
//   A. Amazon B0DJQV7JDB Story@Home king bedsheet — fresh, new page.
//   B. Flipkart PSLHPCVGVGSGBYHN Nutrabay pea isolate — dedup hit on deal 8952, content refresh.
//   C. Amazon B0G38DGNKM Lavie Luxe Quaro26 satchel — dedup hit on deal 7110, content refresh.
// The fourth, Amazon B0CG16N3P4 (Parachute Advansed cocoa body lotion, deal 7314), verified
// clean on the PDP at ₹192 / M.R.P. ₹575 with a 1,022-char description and a 4-step howTo
// already stored. Nothing to write, so it is NOT in this script and NOT in the IndexNow ping —
// submitting an unchanged URL is what IndexNow treats as spam.
//
// A: PDP read in the logged-in Amazon tab. ₹848.00, M.R.P. ₹3,499.00, -76%, In stock,
// 4.1 from 3,645 ratings, #1 in Flat Bed Sheets. The Rogerkart post shouted ₹806 — that is the
// THIRD price category, neither right nor wrong but POST-COUPON: the PDP carries "Apply 5%
// coupon" and 848 x 0.95 = 805.6. We ship the price a buyer sees on the page and put the coupon
// in howTo, because the coupon is a checkbox that can be withdrawn without the listing changing.
// Merchant contradicts itself on fabric: the bullets say "Material : Cloud Cotton", the spec
// table says Fabric Type Microfiber and Enclosure Material Microfiber. Description says so.
//
// B: Flipkart ld+json read in a Playwright tab (curl gets the 403 reCAPTCHA). price 2699,
// availability InStock, image rukmini1 1500x1500, ldDesc states "for Rs.4499.0", rating 3.9 from
// 5,730. Stored 2699/4499 confirmed EXACTLY, so no PriceHistory row will be written. The refresh
// is justified on content rot alone: description 253 chars, howTo 0 steps.
// Source URL carried the poster's own affiliate freight — affid=rohanpouri,
// affExtParam1=ENKR20260801A2106739812, affExtParam2=95, lid=..., marketplace=FLIPKART — all
// stripped before ours went on.
//
// C: PDP read in the logged-in Amazon tab. ₹3,459.00, M.R.P. ₹6,299.00, -45%, In stock. The
// channel's "₹3,500/-" was rounding, not a wrong price. #feature-bullets came back EMPTY — bag
// and apparel PDPs simply do not carry them — so the copy was built from the spec tables instead
// (27 x 11 x 18.5 cm, 5.5 L, 4 pockets, 2 sections, 500 g, spot-clean only, 4.6 from 38 ratings,
// #12 in Women's Satchels). Stored price 3459 confirmed; rot was description 326 chars.
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ------------------------------------------------------------------ A. Amazon, new page
const A = {
  productId: 'B0DJQV7JDB',
  storeSlug: 'amazon',
  storeName: 'Amazon',
  name: 'Story@Home King Size Bedsheet with 2 Pillow Covers, 210 TC Floral (Off White)',
  price: 848,
  mrp: 3499,
  image: 'https://m.media-amazon.com/images/I/91Ox5MTUOzL._SL1500_.jpg',
  description: [
    'A king flat bedsheet of 270 x 250 cm with two matching pillow covers of 46 x 69 cm, three pieces in the pack, in an off-white and yellow floral print. Flat, not fitted — there is no elastic skirt, so it lies over the mattress rather than gripping it, and it will cover a king mattress of any depth instead of fitting one depth well. That is the first thing to check against your bed, because a flat sheet and a fitted sheet are not interchangeable no matter what the size label says.',
    'Thread count is 210, which is the honest middle of the Indian bedsheet market — above the 144 TC sheets that go thin after a dozen washes, below the 300 TC and up range that costs several times more. The listing is worth reading carefully on fabric, because it contradicts itself: the feature bullets call the material Cloud Cotton, while the manufacturer spec table on the same page reads Fabric Type Microfiber and Enclosure Material Microfiber. Treat it as a microfiber-blend sheet — that is what the structured product data says, and it is also what a 917 g king set at this price weighs like.',
    'Microfiber behaves differently from pure cotton and the difference decides whether you will like it. It dries much faster, resists creasing so it looks made without ironing, holds colour through repeated washes, and costs less. It also breathes less than cotton, which is noticeable on a hot, still night in May. The brand rates it for all seasons; a fair reading is that it is excellent in an air-conditioned room and merely acceptable without one.',
    'Care is machine wash in cold water with mild detergent, wash separately for the first few cycles so the yellow does not bleed onto lighter laundry, tumble dry low, no bleach and no high heat. High heat is what actually kills a microfiber sheet — the fibres are synthetic and a hot dryer or a hot iron will glaze and pill them permanently.',
    'Made by Elite Decor Pvt Ltd in Vadodara, Gujarat, model CU4005, country of origin India. The listing is rated 4.1 from 3,645 ratings and currently sits at #1 in Amazon India’s Flat Bed Sheets and #258 across Home & Kitchen, so this is a high-volume listing rather than an obscure one.',
    'Live Amazon price is ₹848 against an M.R.P. of ₹3,499 — 76% off, In stock. A clippable 5% coupon is showing on the page on top of that; see the steps below, because that coupon is what a deal channel quoted as the headline price.',
  ].join('\n\n'),
  howTo: [
    'Tap Grab Deal to open the Story@Home king bedsheet on Amazon.in at the live price.',
    'Clip the 5% coupon on the product page BEFORE you add to cart. The page shows an "Apply 5% coupon" checkbox — that is where the ₹806 figure circulating on deal channels comes from (848 x 0.95 = 805.6). The listed price is ₹848; the coupon is a separate tick box that can be withdrawn by the seller at any time, so treat ₹806 as a bonus, not as the price.',
    'Check that you want a FLAT sheet, not a fitted one. There is no elastic skirt — this sheet lies over the mattress. You get 1 bedsheet of 270 x 250 cm plus 2 pillow covers of 46 x 69 cm, and nothing else: no comforter, no fitted sheet, no bedskirt.',
    'Add to cart and check out. Amazon prices, coupons and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
  ],
};
A.discountPct = Math.round((1 - A.price / A.mrp) * 100);
A.slug = `${kebab(A.name).slice(0, 80).replace(/-+$/, '')}-${A.productId.toLowerCase()}`;
A.title = `${A.name} at ₹${A.price.toLocaleString('en-IN')} (${A.discountPct}% Off) – Amazon`;
A.affiliateUrl = `https://www.amazon.in/dp/${A.productId}?tag=ashoksachdev-21`;

// -------------------------------------------------------- B. Flipkart 8952, content refresh
const B = {
  id: 8952,
  productId: 'PSLHPCVGVGSGBYHN',
  price: 2699, // ld+json offers.price — matches the stored figure exactly
  mrp: 4499, // ld+json description states "for Rs.4499.0 online"
  image:
    'https://rukmini1.flixcart.com/image/1500/1500/xif0q/protein-supplement/q/i/2/-original-imahpz3rhy6zqx7p.jpeg?q=70',
  affiliateUrl:
    'https://www.flipkart.com/nutrabay-pure-100-pea-isolate-plant-based-protein/p/itm55bbcdceff8b9?pid=PSLHPCVGVGSGBYHN&affid=djhackraj',
};
B.discountPct = Math.round((1 - B.price / B.mrp) * 100);
B.title = `Nutrabay Pure 100% Pea Isolate Plant-Based Protein 4 kg, Unflavoured at ₹${B.price.toLocaleString('en-IN')} (${B.discountPct}% Off) – Flipkart`;
B.description = [
  'A 4 kg tub of pea protein isolate, unflavoured, with nothing else in it — no whey, no dairy, no added flavouring, no sweetener. Isolate is the higher-purity grade: pea concentrate runs around 70-80% protein by weight, isolate sits above that because more of the starch and fibre has been removed. For anyone who reacts badly to whey, or who does not eat dairy at all, this is the straightforward plant substitute rather than a blend that hides a little dairy inside.',
  'The 4 kg pack is the only reason to look at this listing rather than a smaller one. Flipkart shows the per-kilo rate on the page itself: roughly ₹675 per kg on the 4 kg tub against about ₹1,050 per kg on the small pack of the same product. That is a 36% lower rate for buying the big tub, and it is the whole argument — the powder does not change, only the quantity does. It is also the catch: 4 kg is between three and five months of daily use for one person, so this only makes sense if you already know you tolerate pea protein.',
  'Buyer ratings are honest about where it wins and where it does not. 3.9 overall from 5,730 verified ratings, with the sub-scores split sharply: Nutrition 3.9, Genuineness 3.9, Effect on Body 3.8, Quality 3.8, Mixability 3.6 — and Flavour 2.7. Unflavoured pea protein tastes earthy and chalky, and the reviews say so repeatedly; the common fix in the review thread is to blend it into a milk, banana or cocoa shake rather than shaking it with plain water. Buy it for the protein and the price per kilo, not for the taste.',
  'Two answered buyer questions worth knowing before you order: it is completely dairy-free, and no shaker is included in the box.',
  `Live Flipkart price is ₹${B.price.toLocaleString('en-IN')} for the 4 kg tub against an M.R.P. of ₹${B.mrp.toLocaleString('en-IN')} — ${B.discountPct}% off, in stock. If the page shows "not deliverable in your location", that is a pincode-level serviceability message on your address, not a stock problem — the listing itself reads InStock.`,
].join('\n\n');
B.howTo = [
  'Tap Grab Deal to open the Nutrabay Pure 100% Pea Isolate listing on Flipkart at the live price.',
  'Confirm the pack size selector says 4 kg before you add to cart. The same listing also sells 2 lb and 0.5 kg packs, and switching the selector changes the price — ₹2,699 is the 4 kg tub, which works out to about ₹675 a kilo against roughly ₹1,050 a kilo on the small pack.',
  'Expect an earthy, chalky taste and plan for it. This is the unflavoured variant and buyers rate Flavour 2.7 out of 5 while rating Nutrition 3.9 — blend it into milk, a banana shake or cocoa rather than shaking it with plain water. It is fully dairy-free, and no shaker comes in the box.',
  'Add to cart and check out. Nothing to apply on our side — no coupon, no code, no cashback step; the discount is already in the listed price. Flipkart prices on bulk supplements move without notice, so confirm the figure on the page still matches what is shown here.',
];

// ---------------------------------------------------------- C. Amazon 7110, content refresh
const C = {
  id: 7110,
  productId: 'B0G38DGNKM',
  price: 3459,
  mrp: 6299,
  image: 'https://m.media-amazon.com/images/I/61FrCUOjwEL._SL1500_.jpg',
  affiliateUrl: 'https://www.amazon.in/dp/B0G38DGNKM?tag=ashoksachdev-21',
};
C.discountPct = Math.round((1 - C.price / C.mrp) * 100);
C.title = `Lavie Luxe Quaro26 Women's Satchel Handbag, Off White at ₹${C.price.toLocaleString('en-IN')} (${C.discountPct}% Off) – Amazon`;
C.description = [
  'A structured faux-leather satchel from Lavie Luxe, the brand’s upper line rather than its everyday range, in off white with a debossed pattern across the body. Rectangular shape, zipper closure, a top handle and a detachable adjustable strap — so it carries by hand, in the crook of the arm, or crossbody, which is the practical reason to pick a satchel over a tote.',
  'The size is the thing to check before buying, because photographs flatter bags. It measures 27 cm wide, 18.5 cm tall and 11 cm deep, holding about 5.5 litres. That takes a phone, a wallet, keys, sunglasses, a compact umbrella and a small water bottle comfortably. It will not take a 13-inch laptop, an A4 folder or a lunch box — this is an evening and day-out bag, not a work bag.',
  'Inside there is one main compartment split into two sections with four pockets between them, which is more internal structure than most bags at this price carry and is what keeps a satchel from becoming a single bucket you dig through. The whole bag weighs 500 grams empty, so it does not add meaningfully to what you are already carrying.',
  'Care is the real constraint on an off-white faux-leather bag and the brand is blunt about it: wipe clean with a damp cloth for spot cleaning, do not machine wash and do not dry clean. A light-coloured bag picks up denim transfer and handling marks, so budget for wiping it down regularly rather than assuming it will stay pristine.',
  `Model Lx Quaro26 (HSGJ2851106M2), made in India by Bagzone Lifestyles Pvt Ltd, Andheri, Mumbai, first listed in October 2025. It is rated 4.6 from 38 ratings and sits at #12 in Amazon India’s Women’s Satchels and #2,348 across Shoes & Handbags. Live price ₹${C.price.toLocaleString('en-IN')} against an M.R.P. of ₹${C.mrp.toLocaleString('en-IN')} — ${C.discountPct}% off, In stock.`,
].join('\n\n');
C.howTo = [
  'Tap Grab Deal to open the Lavie Luxe Quaro26 satchel on Amazon.in at the live price.',
  'Measure what you actually carry against 27 x 11 x 18.5 cm and 5.5 litres before you order. A phone, wallet, keys, sunglasses and a small bottle fit; a 13-inch laptop, an A4 folder or a lunch box does not. This is a day-out and evening bag, not a work bag.',
  'Read the care line if you are choosing the off-white colour. Lavie specifies wipe clean with a damp cloth only — no machine wash, no dry clean — and a light faux-leather body will pick up marks from dark denim. A darker shade of the same bag is the lower-maintenance choice if that matters to you.',
  'Add to cart and check out. Nothing to apply on our side — no coupon, no code, no cashback step; the discount is already in the listed price. Handbag prices swing hard on Amazon, so confirm the figure on the product page still matches what is shown here.',
];

// ------------------------------------------------------------------------- pre-flight
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukminim?\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const THUMB = /_(SX\d+|SY\d+|SX\d+_SY\d+)_/;
for (const d of [A, B, C]) {
  const t = Number((d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, ''));
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (THUMB.test(d.image)) throw new Error(`low-res thumbnail ${d.productId}: ${d.image}`);
  if (d.description.length < 900) throw new Error(`description too thin ${d.productId}: ${d.description.length}`);
  if (!Array.isArray(d.howTo) || d.howTo.length !== 4) throw new Error(`howTo must be a 4-step array ${d.productId}`);
}
if (!A.slug.endsWith(A.productId.toLowerCase())) throw new Error('slug missing productId');
// Amazon rows: ours is the ONLY tag, and no foreign tracking freight may survive.
for (const d of [A, C]) {
  if (!d.affiliateUrl.endsWith('?tag=ashoksachdev-21')) throw new Error(`amazon tag missing ${d.productId}`);
  if (/affiliate_id|affid=|[?&]lid=|marketplace=|affExtParam/.test(d.affiliateUrl))
    throw new Error(`foreign tracking param in affiliateUrl ${d.productId}`);
}
// Flipkart row: pid + OUR affid, and none of the poster's EarnKaro freight.
if (!/^https:\/\/www\.flipkart\.com\/[^?]+\/p\/itm/.test(B.affiliateUrl)) throw new Error('flipkart url must be a /p/itm PDP');
if (!B.affiliateUrl.includes(`pid=${B.productId}`)) throw new Error('flipkart url missing pid');
if (!B.affiliateUrl.endsWith('&affid=djhackraj')) throw new Error('flipkart affid missing');
if (/affExtParam|[?&]lid=|marketplace=|rohanpouri/.test(B.affiliateUrl)) throw new Error('source tracking survived on the flipkart url');
console.log('pre-flight OK, 1 create + 2 refreshes\n');

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

for (const d of [B, C]) {
  const before = await p.deal.findUnique({ where: { id: d.id } });
  if (!before) throw new Error(`deal ${d.id} is gone`);
  if (before.productId !== d.productId) throw new Error(`productId moved on ${d.id}: ${before.productId}`);

  const after = await p.deal.update({
    where: { id: d.id },
    data: {
      title: d.title, description: d.description, howTo: d.howTo, image: d.image,
      price: d.price, mrp: d.mrp, discountPct: d.discountPct, affiliateUrl: d.affiliateUrl,
      isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    },
  });
  if (before.price !== d.price) {
    await p.priceHistory.create({ data: { dealId: d.id, price: d.price } });
    console.log(`priceHistory written ${before.price} -> ${d.price}`);
  } else {
    console.log(`id=${d.id} price unchanged at ${after.price} — no PriceHistory row`);
  }
  slugs.push(after.slug);
  console.log(`refreshed id=${d.id} desc=${before.description.length}->${d.description.length} howTo=${before.howTo.length}->${d.howTo.length} img=${before.image !== d.image ? 'swapped' : 'same'} aff=${before.affiliateUrl !== d.affiliateUrl ? 'rebuilt' : 'same'}`);
}

console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
