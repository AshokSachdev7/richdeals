// TELEGRAM tick 2026-09-22l. 9 candidates -> 2 DB dups, 1 /s? search-page skip,
// 2 quality rejects, 4 publishes. Every price is PDP truth, never channel text:
//   B0HJDXX7F6        channel 399  -> PDP 399/1499  -73% (exact)
//   B0B6PTQFDQ        channel 179  -> PDP 179/599   -70% (exact)
//   B0GK1HT8JT        channel "Lowest : 4685" -> PDP 5784/7590 -24%
//                     (drift is never a reject reason; we publish PDP truth)
//   MSCGSHFNGKHRXKCP  channel 178  -> PDP 208/650   -68% (Flipkart ld+json)
// Flipkart MRP TRAP: a /₹[\d,]+\s*₹([\d,]+)/ scan over document.body.innerText
// returned 324 for the lotion. Wrong. Flipkart PDPs embed sponsored "AD" product
// rows that each carry their own price + MRP + %-off, and line-through / %off
// element scans are equally polluted. Correct read: find the leaf node whose
// textContent equals the ld+json price ('₹208'), walk ~5 ancestors, and the real
// price block's innerText reads "68% | 650 | ₹208". Real MRP is 650, not 324.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const FK_URL =
  'https://www.flipkart.com/parachute-advansed-cocoa-repair-body-lotion-pure-coconut-milk-butter/p/itm74724c815a26c?pid=MSCGSHFNGKHRXKCP&affid=djhackraj';

const deals = [
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0HJDXX7F6',
    affiliateUrl: 'https://www.amazon.in/dp/B0HJDXX7F6?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'graphene-8-ring-stacking-toy-babies-6-months',
    title: 'GRAPHENE 8-Ring Stacking Toy for Babies 6+ Months at ₹399 (73% Off) – Amazon',
    description:
      'A stacking-ring set is the one toy almost every developmental-psychology reading list agrees on, and the reason is mechanical rather than educational: a baby who wants the rings on the post has to hold one thing still with one hand while aiming with the other, and that is the whole foundation of fine motor control. This set gives eight rings plus eight stackable cups on a weighted base, so it stays useful well past the six-month mark — the rings come first, the cup-nesting is what a toddler graduates to, and the colour naming starts somewhere in between. The rattle inside gives the sound feedback that keeps a six-month-old interested for more than a minute, which is the real difference between a toy that gets played with and a toy that gets photographed once. Plastic with rounded edges and no small detachable parts, which matters at an age when everything goes in the mouth. Wipe it down rather than soaking it; the rattle chamber holds water. ₹399 against a ₹1,499 list price, and at that number it is worth having as the standing gift for every first birthday rather than buying one at a time.',
    image: 'https://m.media-amazon.com/images/I/81JJGmTGqzL._SL1500_.jpg',
    mrp: 1499,
    price: 399,
    discountPct: 73,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the listing reads the 8-ring set with base — the smaller ring counts in the same range are priced differently.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0B6PTQFDQ',
    affiliateUrl: 'https://www.amazon.in/dp/B0B6PTQFDQ?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'tiefit-mens-accupressure-non-slip-slipper',
    title: "TieFit Men's Accupressure Non-Slip Slipper at ₹179 (70% Off) – Amazon",
    description:
      'House slippers are bought on price and then worn every single day for a year, which is why the two things worth checking are the sole and the strap anchor — a slipper fails at the point where the strap meets the base, long before the footbed wears out. The accupressure nubs on this one are the selling line, and the honest version is that they are pleasant underfoot on a tiled floor rather than therapeutic: standing in a kitchen for twenty minutes feels different on a textured footbed than on flat rubber, and that is most of the value. The non-slip tread is the part that actually matters in an Indian bathroom-adjacent floor plan, where the usual failure mode is a smooth slipper on wet marble. Flip-flop construction means nothing to fasten and nothing to trap water, so it dries out overnight instead of holding damp. Buy true to size — a thong slipper that is half a size large drags at the heel and the strap goes first. ₹179 against a ₹599 list price.',
    image: 'https://m.media-amazon.com/images/I/71iBfOAIHAL._SL1500_.jpg',
    mrp: 599,
    price: 179,
    discountPct: 70,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Pick your size on the product page before adding to cart — the discount is per size and other sizes are priced higher.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0GK1HT8JT',
    affiliateUrl: 'https://www.amazon.in/dp/B0GK1HT8JT?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'microtek-super-power-new-900-inverter-800va-home-ups',
    title: 'Microtek Super Power NEW 900 Inverter 800VA/675W Home UPS at ₹5784 (24% Off) – Amazon',
    description:
      'An 800VA inverter is the size most Indian homes actually need rather than the size they get sold: it carries a few lights, two or three fans, a router and a television through a cut, which is what a power failure in a flat really costs you. The number worth understanding here is the 675W — VA is the headline, watts is the load ceiling, and running close to the ceiling is what shortens a battery. Pure digital wave output is the reason to pick this over a square-wave unit at a lower price: square wave makes fans hum and is genuinely unkind to switched-mode supplies, which now means every laptop charger, router and LED TV in the house. The CCCV charging stage is the other real feature — it tapers the charge current as the battery fills instead of holding it flat, which is the single biggest factor in whether a tubular battery lasts four years or seven. Input range goes down to 80V in inverter mode, which matters on a weak rural or late-evening supply where a narrower unit simply drops to battery and drains. Note it is the inverter only; the battery is bought separately and is usually the larger half of the bill. Three-year manufacturer warranty. ₹5,784 against a ₹7,590 list price.',
    image: 'https://m.media-amazon.com/images/I/51OB6Y58lUL._SL1080_.jpg',
    mrp: 7590,
    price: 5784,
    discountPct: 24,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'This is the inverter only — a 12V tubular, flat plate or SMF battery is a separate purchase.',
      'Check your household load against the 675W ceiling before ordering; VA is not the usable figure.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
  {
    storeSlug: 'flipkart',
    storeName: 'Flipkart',
    productId: 'MSCGSHFNGKHRXKCP',
    affiliateUrl: FK_URL,
    slug: 'parachute-advansed-cocoa-repair-body-lotion-coconut-milk',
    title: 'Parachute Advansed Cocoa Repair Body Lotion at ₹208 (68% Off) – Flipkart',
    description:
      'Body lotion is bought in winter and then abandoned in March, and the cocoa-butter end of the shelf is the part that earns its keep on the dry patches that outlast the season — shins, elbows and heels, where a light lotion soaks in and does nothing. Cocoa butter is solid at room temperature and melts at skin temperature, so it sits as an occlusive layer that slows water loss rather than adding water, which is the mechanism that actually fixes flaking skin. The coconut milk base is what keeps it from feeling like the heavy petroleum-adjacent creams that do the same job: it spreads thin enough to use on the arms in the morning without leaving a film on a shirt sleeve. Apply it on skin that is still slightly damp from a shower, not dry skin — that is the difference between trapping water and just coating over dryness, and it is the single change that makes any lotion work better. Dry skin needs it twice a day in December and once in April; the bottle lasts accordingly. ₹208 against a ₹650 list price on Flipkart, sold by SURICYBCOMBazaar.',
    image:
      'https://rukmini1.flixcart.com/image/1500/1500/xif0q/moisturizer-cream/s/u/h/-original-imahqnngarf7uhbn.jpeg?q=70',
    mrp: 650,
    price: 208,
    discountPct: 68,
    howTo: [
      'Tap Grab Deal to open the product on Flipkart at the live price.',
      'Check the pack size on the product page — the same lotion is listed in several volumes at different prices.',
      'Seller reads SURICYBCOMBazaar; other sellers on the listing are priced higher.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
];

// Pre-flight. A hand-typed ₹ in a title that disagrees with the numeric price
// ships a page whose visible copy contradicts its own Product schema.
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com)\//;
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
}

let created = 0, updated = 0; const slugs = [];
for (const d of deals) {
  const store = await p.store.upsert({
    where: { slug: d.storeSlug },
    update: {},
    create: { slug: d.storeSlug, name: d.storeName },
  });
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: d.affiliateUrl, storeId: store.id,
  };
  const existing =
    (await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: d.productId } } })) ??
    (await p.deal.findUnique({ where: { slug: d.slug } }));
  if (existing) { await p.deal.update({ where: { id: existing.id }, data }); updated++; console.log('UPD', existing.id, d.slug); }
  else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug); console.log('NEW', row.id, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
