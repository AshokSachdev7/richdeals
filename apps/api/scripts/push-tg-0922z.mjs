// TELEGRAM-DEAL-MONITOR tick 2026-09-22z.
// 25 sidebar rows -> 2 new vs tick y -> 1 candidate (SB Loots, amazn.lt/e3oYpEET ->
// amazon.in/dp/B082JN1FZC). Fresh in data/tg-multi-seen.json, but already LIVE in the DB
// as deal 1883 -- so this is an in-place refresh, not a create.
//
// PDP read in the logged-in Amazon tab (same-origin fetch + DOMParser):
//   #corePriceDisplay_desktop_feature_div -> "₹154.00 with 55 percent savings -55% ₹154
//    ₹38.50 per g(₹38.50₹38.50 /100 g) M.R.P.: ₹340.00"
//   #buybox -> "... Ships from: Amazon Sold by: RK World Infocom Pvt Ltd FREE delivery
//    Thursday, 24 September" (in stock)
// Channel claimed "MRP - 340" and the PDP agrees exactly. Live price ₹154 vs DB ₹166 =>
// real drop, PriceHistory row follows.
//
// TRAP: the price window carries "₹38.50 per g" -- a per-100g unit rate, not the price.
// Published figure is the leading ₹154.00, cross-checked against -55% and
// round(1 - 154/340) = 55.
//
// LEGACY ROT this row was carrying, fixed in the same update:
//   - title "Santoor Talc, Pack of 400 GM Rs.150" -- the hand-typed ₹150 never matched
//     the stored 166 (schema/visible-copy mismatch, the exact thing the pre-flight
//     title-vs-price check exists to catch).
//   - image was a _SY355_ thumbnail, not the real CDN asset. Now data-old-hires _SL1500_.
//   - isSuper/isHot both false at ₹166, though the rules are <=250 / <=500.
//   - description 126 chars -- below the indexable floor.
// SLUG IS DEPRECATED ON PURPOSE: santoor-talc-pack-of-400-gm-rs-150-B082JN carries a
// truncated productId, but it is the indexed URL. Renaming it would 404 a live page for
// a cosmetic win, so it stays.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const deals = [
  {
    id: 1883,
    slug: 'santoor-talc-pack-of-400-gm-rs-150-B082JN',
    productId: 'B082JN1FZC',
    name: 'Santoor Beauty Talc with Sandalwood Extracts, 400 g',
    price: 154,
    mrp: 340,
    image: 'https://m.media-amazon.com/images/I/51jJc2w7MaL._SL1500_.jpg',
    description:
      'A 400 g tin of Santoor Beauty Talc at ₹154 works out to about ₹38.50 per 100 g, which is the number worth holding on to, because talc is sold in 50 g, 100 g, 200 g and 400 g packs at wildly different unit rates and the big tin is usually the only one that beats a supermarket shelf. Fragrance is a sandal-rose-musk-geranium mint blend, and the geranium mint is doing real work here: it is the cooling note, which is why this reads as a summer talc rather than a winter one. Sandalwood extracts are the marketing headline, but the functional claim is moisture absorption -- the reason anyone puts talc on after a shower in Indian humidity is to stop sweat sitting on skin, and a 400 g tin lasts a full season of daily use. Dermatologically tested and rated for all skin types. Made by Wipro Enterprises in Bengaluru, country of origin India, net quantity 400 g, tin measuring 7.8 x 18.3 x 15 cm. Currently #1,478 in Amazon Beauty, and the listing has been live since December 2019, so the pricing history is long rather than a launch promo. ₹154 against a ₹340 MRP, sold by RK World Infocom, in stock with free delivery.',
    howTo: [
      'Tap Grab Deal to open the Santoor Beauty Talc listing on Amazon.in at the live price.',
      'Check the pack size on the listing before you add to cart -- this ASIN is the 400 g tin, and the 50 g/100 g variants sit on the same page at a much worse per-gram rate.',
      'Talc pricing on Amazon moves with the festive slots, so check out while ₹154 holds.',
      'Price applies at checkout; no coupon to clip and no code to enter.',
    ],
  },
];

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
for (const d of deals) {
  d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – Amazon`;
}

// Pre-flight. Same 6 checks as every push path (slug check relaxed to the legacy prefix).
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com|assets\.myntassets\.com)\//;
const seen = new Set();
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  if (!d.productId.toLowerCase().startsWith(d.slug.split('-').pop().toLowerCase()))
    throw new Error(`slug not tied to productId ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
  seen.add(d.slug); seen.add(d.productId);
}
console.log(`pre-flight OK, ${deals.length} rows\n`);

let created = 0, updated = 0; const slugs = [];
for (const d of deals) {
  const store = await p.store.upsert({ where: { slug: 'amazon' }, update: {}, create: { slug: 'amazon', name: 'Amazon' } });
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: d.affiliateUrl, storeId: store.id,
  };
  const existing =
    (await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: d.productId } } })) ??
    (await p.deal.findUnique({ where: { slug: d.slug } }));
  if (existing) {
    const before = { price: existing.price, mrp: existing.mrp, pct: existing.discountPct };
    await p.deal.update({ where: { id: existing.id }, data });
    if (existing.price !== d.price) await p.priceHistory.create({ data: { dealId: existing.id, price: d.price } });
    updated++; slugs.push(existing.slug);
    console.log('UPD', existing.id, existing.slug, JSON.stringify(before), '->', JSON.stringify({ price: d.price, mrp: d.mrp, pct: d.discountPct }));
  } else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug);
    console.log('NEW', row.id, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
