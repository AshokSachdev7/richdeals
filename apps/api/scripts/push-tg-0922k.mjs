// TELEGRAM tick 2026-09-22k. 8 candidates -> 2 DB dups, 1 loot-skip, 2 quality
// rejects, 3 publishes. All three prices are PDP truth, not channel text:
//   B0GC7F9165  channel 400  -> PDP 400/999   (exact)
//   B0GG9GVVFS  channel 318  -> PDP 318.72/799 (price col is Int -> 319)
//   Tata Cliq   channel 1073 -> API 1245/2190  (drift is never a reject reason;
//                                               we publish what the PDP says)
// Tata Cliq serves an SPA shell to curl (no Product ld+json), so the price came
// from its JSON product API, where the PID must be UPPER-CASE:
//   /marketplacewebservices/v2/mpl/products/productDetails/MP000000008093500?isPwa=true&isMDE=true
// Note winningSellerPrice.value is the price field — d.price is undefined there.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const TC_URL =
  'https://www.tatacliq.com/apple-20w-usb-c-power-adapter-white-for-iphone-ipad-airpods/p-mp000000008093500';

const deals = [
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0GC7F9165',
    affiliateUrl: 'https://www.amazon.in/dp/B0GC7F9165?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'levis-women-regular-fit-cotton-t-shirt',
    title: "Levi's Women Regular Fit Cotton T-Shirt at ₹400 (60% Off) – Amazon",
    description:
      "A plain cotton tee from Levi's at ₹400 is the part of a wardrobe that gets worn twice a week and never thought about, which is exactly why the brand matters more here than it does on a statement piece — the collar and the hem are what fail first on cheap knitwear, and those are the two things a 170-year-old denim house has no excuse for getting wrong. Regular fit means it skims rather than clings, so it layers under a shirt or a jacket without bunching at the waist, and it does not need the body underneath it to be doing anything in particular. Cotton breathes through an Indian summer where a poly blend traps heat against the skin. Wash it cold and inside out and the print on the chest survives the first twenty cycles instead of flaking after five; tumble drying is what shrinks a cotton tee half a size, not the washing. ₹400 against a ₹999 list price, and at that number it is worth buying the colour you will actually reach for rather than the one on offer.",
    image: 'https://m.media-amazon.com/images/I/51aYX46KrhL._SL1200_.jpg',
    mrp: 999,
    price: 400,
    discountPct: 60,
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
    productId: 'B0GG9GVVFS',
    affiliateUrl: 'https://www.amazon.in/dp/B0GG9GVVFS?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'lakme-9to5-hya-matte-liquid-lipstick-werk-rose',
    title: 'Lakme 9to5 Hya Matte Liquid Lipstick, Werk Rose at ₹319 (60% Off) – Amazon',
    description:
      'Matte liquid lipsticks earn their reputation for drying the lip out, and the hyaluronic acid in this one is the whole reason it is a different proposition — it holds water in the lip while the pigment sets flat, so the finish is matte without the cracking that shows up four hours in. Werk Rose is the safe end of the range: a muted rose that reads as neutral in daylight and does not fight a work shirt, which is what the 9to5 line is built around. A liquid applicator lays down more pigment in one pass than a bullet does, so one coat is usually the whole job — building a second coat on top of a set first coat is what makes any matte formula patchy. Blot once with a tissue before you add anything and it stays put through lunch. ₹319 against a ₹799 list price, which is roughly what a single refill of a department-counter matte costs.',
    image: 'https://m.media-amazon.com/images/I/41uKCJ8MlpL._SL1000_.jpg',
    mrp: 799,
    price: 319,
    discountPct: 60,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the shade reads "Werk Rose" on the product page — other shades in the range are priced differently.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
    ],
  },
  {
    storeSlug: 'tatacliq',
    storeName: 'TataCliq',
    productId: 'mp000000008093500',
    affiliateUrl:
      'https://linksredirect.com/?cid=527&source=linkkit&url=' + encodeURIComponent(TC_URL),
    slug: 'apple-20w-usb-c-power-adapter-white',
    title: 'Apple 20W USB-C Power Adapter at ₹1245 (43% Off) – Tata Cliq',
    description:
      'Apple stopped putting a charger in the box years ago, so the 20W USB-C brick is the accessory almost every recent iPhone owner ends up buying separately — and it is the smallest adapter that actually triggers fast charging, taking a drained iPhone to roughly half in half an hour where a 5W cube needs most of a morning. The same brick fast-charges an iPad and tops up AirPods, so one adapter covers a household of Apple devices instead of one per device. It is a genuine Apple unit rather than a third-party clone, which matters more on a power supply than on almost any other accessory: the cheap ones skip the protection circuitry and are the reason a battery ages fast. Note it is the adapter only — the USB-C to Lightning or USB-C to USB-C cable is separate, so check which one your phone takes before you order. ₹1,245 against a ₹2,190 list price, sold by ClickBuy on Tata Cliq.',
    image:
      'https://img.tatacliq.com/images/i7/1348Wx2000H/MP000000008093500_1348Wx2000H_202101160056371.jpeg',
    mrp: 2190,
    price: 1245,
    discountPct: 43,
    howTo: [
      'Tap Grab Deal to open the product on Tata Cliq at the live price.',
      'Check the seller reads ClickBuy — other sellers on the same listing are priced higher.',
      'This is the adapter only; add a USB-C cable if you do not already have one.',
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
