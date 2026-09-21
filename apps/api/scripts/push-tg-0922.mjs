// telegram tick 2026-09-22: 3 Amazon deals off the group sidebar, every price and
// stock flag read on the PDP in the logged-in browser (channel prices are often
// post-coupon, so the card number is never trusted).
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const TAG = 'ashoksachdev-21';
const aff = (asin) => `https://www.amazon.in/dp/${asin}?th=1&psc=1&tag=${TAG}`;
const img = (id) => `https://m.media-amazon.com/images/I/${id}._SL1000_.jpg`;
const howTo = (unit = 'variant shown') => [
  'Tap Grab Deal to open the product on Amazon.in at the live price.',
  `Confirm the ${unit} and seller on the Amazon page before you pay.`,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const deals = [
  {
    productId: 'B0D95QS6DQ',
    slug: 'hp-travel-hub-usb-c-g3-multiport-adapter',
    title: 'HP Travel Hub USB-C G3 Multiport Adapter at ₹1,186 (90% Off) – Amazon',
    description:
      'HP\'s Travel Hub USB-C G3 turns one Type-C port on a thin laptop back into a full desk of connections, which is the whole reason these adapters sell. It is the palm-sized aluminium kind you leave in a laptop sleeve rather than a docking station you screw to a desk, so it suits anyone moving between a home table, an office hot desk and a client meeting room. Pass-through charging means the single cable still feeds the laptop while the display and drives stay attached. At ₹1,186 against a ₹11,999 list price it is well under what branded hubs normally sit at.',
    image: img('61OPjF1Z7XL'),
    mrp: 11999,
    price: 1186,
    discountPct: 90,
    howTo: howTo('port layout and laptop compatibility'),
  },
  {
    productId: 'B0GSKLW894',
    slug: 'clensta-anti-dandruff-shampoo-conditioner-250ml',
    title: 'Clensta Anti-Dandruff Shampoo + Conditioner 250ml at ₹399 (50% Off) – Amazon',
    description:
      'A shampoo and conditioner pair aimed squarely at flaking and an itchy scalp, sold as one 250ml bundle rather than two separate buys. Clensta builds the formula around an imported active and skips parabens, so it is a reasonable pick if sulphate-heavy medicated bottles have left your scalp dry before. Anti-dandruff care only works on repetition — a single wash does nothing — which is why a two-step pack at ₹399 instead of ₹799 matters more than a one-off discount on a single bottle. Suits normal to dry scalps and everyday use.',
    image: img('61iIgqmvEfL'),
    mrp: 799,
    price: 399,
    discountPct: 50,
    howTo: howTo('250ml pack size'),
  },
  {
    productId: 'B0GS9N5KRP',
    slug: 'police-origine-65l-cabin-trolley-tsa-lock',
    title: 'Police Origine 65L Cabin Trolley with TSA Lock at ₹1,599 (84% Off) – Amazon',
    description:
      'A hard-shell polypropylene cabin trolley with the things that actually decide whether luggage survives a few years: eight 360° spinner wheels, a telescopic handle and a built-in TSA lock that airport security can open without cutting it off. The 20-inch body is the size most Indian carriers accept as cabin baggage, and at 65L of packed volume it covers a long weekend or a week if you pack tight. Beige and tan shell hides scuffs better than gloss black. ₹1,599 against a ₹9,999 list price is squarely in unbranded-luggage territory.',
    image: img('61H5KzGAMYL'),
    mrp: 9999,
    price: 1599,
    discountPct: 84,
    howTo: howTo('colour variant and cabin size limit of your airline'),
  },
];

// title-rupee-vs-price: the hand-typed ₹ in each title must equal the numeric price
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
}

const store = await p.store.upsert({ where: { slug: 'amazon' }, update: {}, create: { slug: 'amazon', name: 'Amazon' } });
let created = 0, updated = 0; const slugs = [];
for (const d of deals) {
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: aff(d.productId), storeId: store.id,
  };
  const existing = await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: d.productId } } })
    ?? await p.deal.findUnique({ where: { slug: d.slug } });
  if (existing) { await p.deal.update({ where: { id: existing.id }, data }); updated++; console.log('UPD', d.slug); }
  else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug); console.log('NEW', d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
