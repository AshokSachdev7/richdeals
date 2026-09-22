// TELEGRAM tick 2026-09-22o. 3 shortlink candidates -> 1 exact-match DB dup
// (B0B4GYZ4FR #3262 ₹127 == channel ₹127), 1 DB row with stale price fixed
// separately (#3961), 1 publish.
//   B0744R95BT  channel 173 -> PDP ₹173.00 / MRP ₹395 / -56% / In stock (exact)
// PRICE READ TRAP (again, worse than usual): the .a-offscreen nodes inside
// #corePriceDisplay_desktop_feature_div returned ["", "₹346", "₹395"] — the
// per-unit rate and the MRP, and NOT the ₹173 selling price. Reading offscreen[0]
// or [1] would have published a ₹346 sunscreen. #centerCol innerText is the only
// honest read: "₹173.00 with 56 percent savings -56% ₹173 ₹346.00 per g".
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const deals = [
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0744R95BT',
    affiliateUrl: 'https://www.amazon.in/dp/B0744R95BT?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'lakme-water-light-gel-sunscreen-spf-50-niacinamide-50g',
    title: 'Lakmē Water Light Gel Sunscreen SPF 50 PA++++ with Niacinamide 50g at ₹173 (56% Off) – Amazon',
    description:
      'The PA rating is the half of a sunscreen label most people never read, and it is the half that decides whether the product is doing anything about ageing: SPF 50 is the UVB number, PA++++ is the UVA number, and UVA is what drives pigmentation and photoageing through a window and on a cloudy day. This one carries both at the top of their respective scales, which is uncommon at a sub-₹200 price. The gel-water base is the reason it works on oily skin in Indian humidity — a cream sunscreen at 3pm in July is the reason most people stop reapplying, and a sunscreen nobody reapplies is a sunscreen that does not work. It absorbs without the grey cast that mineral filters leave on deeper skin tones, so it sits under makeup rather than fighting it. The niacinamide is a genuine addition rather than a label ingredient here: it works on the same post-inflammatory pigmentation that sun exposure causes, so it is pointed at the same problem as the filters. Two fingers-worth for the face and neck is the honest dose — a pea-sized amount gets you a fraction of the labelled SPF, which is the single most common way a good sunscreen underperforms. Reapply every three hours outdoors. ₹173 against a ₹395 list price, and Amazon flags it as the lowest in 30 days.',
    image: 'https://m.media-amazon.com/images/I/51e1sHG5-UL._SL1000_.jpg',
    mrp: 395,
    price: 173,
    discountPct: 56,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the listing reads the 50g Water Light Gel — the larger and the tinted variants are priced higher.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
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
  if (Math.round((1 - d.price / d.mrp) * 100) !== d.discountPct) throw new Error(`pct drift ${d.productId}`);
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
