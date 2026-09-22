// IFS tick 2026-09-22h. Discovery was byte-identical to the 05:00 run (38/38,
// zero new cards), so the only live question was whether the 6 residue
// candidates had changed state on the PDP. One had: B0H2JQ28G8 was
// "currently unavailable" at 05:00 and is back in stock at 66% off. The IFS
// card price (₹103) is wrong as usual — ₹205 is the PDP truth and is what
// ships. ₹10.25 in the price block is the per-unit rate, not the price.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const deals = [
  {
    store: 'amazon',
    productId: 'B0H2JQ28G8',
    affiliateUrl: 'https://www.amazon.in/dp/B0H2JQ28G8?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'amfin-17-inch-love-anniversary-foil-balloon-bouquet-pack-of-20',
    title: 'AMFIN 17" Love & Anniversary Foil Balloon Bouquet, Pack of 20 at ₹205 (66% Off) – Amazon',
    description:
      'Twenty 17-inch balloons is enough to actually dress a room, which is the part most decoration kits get wrong — a pack of six looks thin the moment it is up on the wall. This set mixes chrome-finish foil with latex and confetti in gold and rose, so it photographs well under warm indoor light rather than going flat like plain party balloons do. Foil balloons are the ones worth having here: they hold air for days instead of hours, so a setup done the night before a birthday or anniversary is still standing the next evening. The heart and love shapes carry the theme without needing a banner. Blow the latex ones by mouth and keep a straw or the supplied nozzle for the foil, and tape the chrome pieces at the seam rather than the neck so they do not tear. ₹205 for twenty against a ₹599 list price.',
    image: 'https://m.media-amazon.com/images/I/618egWRn1LL._SL1254_.jpg',
    mrp: 599,
    price: 205,
    discountPct: 66,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the pack size (20 pieces) and the 17-inch size on the product page before you pay.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
    ],
  },
];

for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!/^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com)\//.test(d.image)) throw new Error(`bad image host ${d.productId}`);
}

const amazon = await p.store.upsert({ where: { slug: 'amazon' }, update: {}, create: { slug: 'amazon', name: 'Amazon' } });

let created = 0, updated = 0; const slugs = [];
for (const d of deals) {
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: d.affiliateUrl, storeId: amazon.id,
  };
  const existing = await p.deal.findUnique({ where: { store_product: { storeId: amazon.id, productId: d.productId } } })
    ?? await p.deal.findUnique({ where: { slug: d.slug } });
  if (existing) { await p.deal.update({ where: { id: existing.id }, data }); updated++; console.log('UPD', d.slug); }
  else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug); console.log('NEW', row.id, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
