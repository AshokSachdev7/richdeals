// TELEGRAM tick 2026-09-22p. 3 shortlink candidates -> 2 dedup'd against this
// same morning's own work (B0744R95BT #10864, B01BBNF6NK #3961 — Dealzone
// reposted both at our exact prices, free cross-channel confirmation), 1 fresh.
//   B088TZC4B7  channel "@161 Min. 2 Qty" -> PDP ₹209.00 / MRP ₹440 / -53% / In stock
// The "Min. 2 Qty" claim did NOT verify: #promotions_feature_div is empty, no
// coupon node, no #vpcButton / quantity-discount widget, and the strings
// "Buy 2" / "Min. qty" / "Quantity Discount" / "Save extra with" are absent
// from the whole document. The only 161 in the HTML is an unrelated GST link.
// So the channel's per-unit number is not reachable on this listing today, and
// we publish OUR verified price, never theirs: ₹209 at a real 53% off.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const deals = [
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B088TZC4B7',
    affiliateUrl: 'https://www.amazon.in/dp/B088TZC4B7?th=1&psc=1&tag=ashoksachdev-21',
    slug: 'littles-soft-cleansing-baby-wipes-with-lid-160-wipes-pack-of-2',
    title: "Little's Soft Cleansing Baby Wipes with Lid, 80 Wipes x Pack of 2 (160 Wipes) at ₹209 (53% Off) – Amazon",
    description:
      'Baby wipes are bought on price per wipe and regretted on thickness, and the two are not the same number. A thin wipe tears on the first pass and you use three; a thick one does the job once, which is why 160 wipes at ₹209 is worth reading as ₹1.31 a wipe rather than as a pack price. These are the extra-thick, high-moisture kind — the sheet stays wet to the last wipe in the pack because the lid seals rather than relying on a sticker flap, which is the single thing that decides whether the bottom half of a pack is still usable a fortnight after opening. Sticker flaps peel, stop sealing, and the remaining wipes dry into a solid block; a hinged lid does not. The cloth is loaded with aloe vera, vitamin E and jojoba oil, so the intended job is the whole nappy-change cycle rather than a wet tissue: aloe and jojoba are there to keep the skin barrier intact through repeated wiping, which is what actually causes rash and redness in the folds, not the nappy itself. Use them warm rather than cold in winter and you get far less protest. Pack of two 80-wipe tubs, so one lives in the changing station and one in the bag. ₹209 against a ₹440 list price on Amazon, in stock and fulfilled by Amazon.',
    image: 'https://m.media-amazon.com/images/I/61jeS1UR41L._SL1500_.jpg',
    mrp: 440,
    price: 209,
    discountPct: 53,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the listing reads 80 Wipes x Pack of 2 (160 wipes) — single tubs and the 72-wipe packs are priced separately.',
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
