// telegram tick 2026-09-22g: 4 deals out of Loot Deals 24x7 message history
// (the sidebar preview was byte-identical for the third tick running). Two
// stores this time — one Amazon, three Flipkart. Every price re-read on the
// PDP: the channel was wrong on both Flipkart prices it quoted (Panasonic
// said 11,240 / real 13,900; Maharaja said 899 / real 1,079), so the channel
// number is used nowhere. Flipkart productId is the pid, matching the rows
// already in the DB; affiliateUrl keeps the real /p/itm… path.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const TAG = 'ashoksachdev-21';
const azAff = (asin) => `https://www.amazon.in/dp/${asin}?th=1&psc=1&tag=${TAG}`;
const fkAff = (itm, pid) => `https://www.flipkart.com/product/p/${itm}?pid=${pid}&affid=djhackraj`;
const azImg = (id) => `https://m.media-amazon.com/images/I/${id}._SL1000_.jpg`;

const howTo = (store, thing) => [
  `Tap Grab Deal to open the product on ${store} at the live price.`,
  `Confirm the ${thing} and seller on the product page before you pay.`,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const deals = [
  {
    store: 'amazon',
    productId: 'B09V2KNSTH',
    affiliateUrl: azAff('B09V2KNSTH'),
    slug: 'jialto-self-adhesive-broom-mop-holder-pack-of-3',
    title: 'JIALTO Self-Adhesive Broom & Mop Holder, Pack of 3 at ₹275 (72% Off) – Amazon',
    description:
      'Every Indian kitchen has the same corner where the jhadu, the pocha stick and the wiper all lean against the wall and fall over the moment someone walks past. These are the stick-on clamp holders that fix that — a spring-loaded gripper you press the handle into, no drilling, no rawl plugs, no landlord conversation. Three in a pack is the right number: broom, mop, wiper, done, and you can spread them across the kitchen and the bathroom. The adhesive holds on tile, painted wall and the back of a door, but it needs a genuinely clean dry surface to bond, so wipe the spot down and leave it a few hours before you hang weight on it. ₹275 for three against a ₹999 list price.',
    image: azImg('71xUokksBnL'),
    mrp: 999,
    price: 275,
    discountPct: 72,
    howTo: howTo('Amazon.in', 'pack size and adhesive type'),
  },
  {
    store: 'flipkart',
    productId: 'MRCEGZ8Y8X6FNTQU',
    affiliateUrl: fkAff('itmegz8zzy66feze', 'MRCEGZ8Y8X6FNTQU'),
    slug: 'panasonic-27l-convection-microwave-oven-black-mirror',
    title: 'Panasonic 27 L Convection Microwave Oven at ₹13,900 (21% Off) – Flipkart',
    description:
      'Twenty-seven litres is the size that stops being a reheating box and starts replacing an oven — a whole chicken fits, a 9-inch cake tin fits, and the turntable is wide enough that a full thali plate turns without catching. This is the convection model, so it bakes and grills as well as microwaves; the Magic Grill mode is Panasonic\'s combination setting, which is what gets a browned top on something that would otherwise steam. The cavity is stainless steel rather than painted, which matters over five years because painted cavities chip around the door and start rusting. Note the price: this listing is at ₹13,900 against a ₹17,500 MRP — a lower figure doing the rounds on deal channels is stale.',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/microwave-new/8/c/x/-original-imahcaufzxgyzjgh.jpeg',
    mrp: 17500,
    price: 13900,
    discountPct: 21,
    howTo: howTo('Flipkart', 'capacity and convection mode on the variant listed'),
  },
  {
    store: 'flipkart',
    productId: 'HBLFZYRZHXE5QTMA',
    affiliateUrl: fkAff('itmefeb08d0e2aad', 'HBLFZYRZHXE5QTMA'),
    slug: 'maharaja-whiteline-175w-hand-blender-blue',
    title: 'MAHARAJA WHITELINE 175 W Hand Blender at ₹1,079 (26% Off) – Flipkart',
    description:
      'A stick blender earns its shelf space on soups, lassi and the tomato-onion gravy base you would otherwise cool down, pour into a mixer jar and wash three parts of. This one runs 175 W, which is the honest range for a hand blender — enough for purees, batters and milkshakes, not a substitute for a mixer grinder on dry masala or hard spices. The detachable stem is the part to care about: it comes off for washing, so nothing wet goes anywhere near the motor housing. ₹1,079 against a ₹1,449 MRP. Deal channels are quoting ₹899 on this; the live Flipkart price is ₹1,079, which is the number used here.',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/hand-blender/i/g/b/-original-imagg9s4j8qhzdvw.jpeg',
    mrp: 1449,
    price: 1079,
    discountPct: 26,
    howTo: howTo('Flipkart', 'wattage and colour of the variant listed'),
  },
  {
    store: 'flipkart',
    productId: 'MRCDWK8TTHVHW3WY',
    affiliateUrl: fkAff('itmdwmvzgvtbzcnz', 'MRCDWK8TTHVHW3WY'),
    slug: 'ifb-23l-convection-microwave-oven-air-fry',
    title: 'IFB 23 L Convection Microwave Oven at ₹11,690 (30% Off) – Flipkart',
    description:
      'Twenty-three litres suits a two-to-four person kitchen — big enough to bake in, small enough that it does not eat half the counter. The useful part of this IFB is the air-fry mode, which is a high-speed convection cycle: it will crisp frozen snacks and tikka without a separate air fryer sitting next to it, which is the appliance most kitchens buy twice. Seventy-one preset cook menus sounds like marketing and mostly is, but steam clean and weight defrost are the two that get used weekly. Convection microwaves need metal-free cookware in microwave mode and oven-safe cookware in convection mode, so check what you already own before ordering. ₹11,690 against a ₹16,790 MRP.',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/microwave-new/a/b/e/-original-imahqycahfhjdces.jpeg',
    mrp: 16790,
    price: 11690,
    discountPct: 30,
    howTo: howTo('Flipkart', 'capacity and that the air-fry mode is on this variant'),
  },
];

// title-rupee-vs-price: the hand-typed ₹ in each title must equal the numeric price
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!/^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com)\//.test(d.image)) throw new Error(`bad image host ${d.productId}`);
}

const stores = {
  amazon: await p.store.upsert({ where: { slug: 'amazon' }, update: {}, create: { slug: 'amazon', name: 'Amazon' } }),
  flipkart: await p.store.upsert({ where: { slug: 'flipkart' }, update: {}, create: { slug: 'flipkart', name: 'Flipkart' } }),
};

let created = 0, updated = 0; const slugs = [];
for (const d of deals) {
  const store = stores[d.store];
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: d.affiliateUrl, storeId: store.id,
  };
  const existing = await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: d.productId } } })
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
