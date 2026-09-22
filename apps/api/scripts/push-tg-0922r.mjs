// TELEGRAM tick 2026-09-22r. 4 shortlinks resolved (all HTTP 200), 4 ASINs.
//   B0C69GWQGW  CoolzTricks "at 171"  -> PDP ₹171 / MRP ₹499  / -66% / In stock -> NEW
//   B00IAPKZ0W  Dealzone   "at 187"   -> PDP ₹187 / MRP ₹1,999 / -91% / In stock -> NEW
//   B0GG4FDSV4  SB Loots   "MRP 599"  -> PDP ₹229 / MRP ₹599  / -62% / In stock -> ROT FIX #575
//                (stored ₹199 with mrp NULL and discountPct NULL since 2026-07-31)
//   B06WV77YDB  ONLINE SHOPPING DEALS "₹85" -> PDP ₹85, In stock, but #centerCol
//                carries NO M.R.P. at all ("₹85.00 ₹85" and nothing else). No list
//                price means no verifiable savings, so publishing it would mean adding
//                a 1,626th null-MRP row to the same 1,625-row backlog this tick flags.
//                Skipped deliberately — not a read failure.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const HOW = (confirm) => [
  'Tap Grab Deal to open the product on Amazon.in at the live price.',
  confirm,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const deals = [
  {
    productId: 'B0C69GWQGW',
    name: 'amazon basics Classic Notebook, Plain, 240 Pages (130mm x 210mm, Green)',
    slug: 'amazon-basics-classic-notebook-plain-240-pages-green-b0c69gwqgw',
    price: 171,
    mrp: 499,
    image: 'https://m.media-amazon.com/images/I/71klV93n-gL._SY879_.jpg',
    confirm: 'Confirm the listing reads 240 pages, Plain, 130mm x 210mm — the ruled and dotted variants are priced separately.',
    description:
      'A notebook is judged on two things nobody checks before buying: whether the paper survives a fountain pen and whether the thing still shuts after a month in a bag. This one answers both. The pages are acid-free archival stock, which is the specification that matters if the notes are meant to outlive the year — acid-free paper resists the yellowing and brittleness that light and air cause in cheap pulp, so a sketch or a journal entry reads the same in five years as it did the week it was written. There are 240 blank pages printed front and back, unruled, so it takes handwriting, sketching, mind maps and pasted-in scraps equally without a grid fighting the layout. The cover is cardboard-bound with rounded corners, an elastic closure holds it shut instead of letting it fan open against everything else in the bag, and an integrated ribbon bookmark means no folded corners. The expandable inner pocket at the back takes receipts, loose notes and business cards. At 130mm x 210mm it is close to A5 — big enough to write across without cramping, small enough to carry daily. ₹171 against a ₹499 list price on Amazon, in stock.',
  },
  {
    productId: 'B00IAPKZ0W',
    name: 'Nivia Adjustable Knee Support, Compression Sleeve with Velcro Strap',
    slug: 'nivia-adjustable-knee-support-compression-sleeve-velcro-strap-b00iapkz0w',
    price: 187,
    mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/61zKi69wboL._SX679_.jpg',
    confirm: 'Confirm the listing shows the adjustable Velcro-strap version — Nivia also sells fixed-size slip-on sleeves under a similar name.',
    description:
      'Knee supports fail in one of two ways: a slip-on sleeve that fits in the shop is loose after three washes, or it is tight enough to stay put and cuts off circulation below the joint. An adjustable strap design sidesteps both, because the compression is set by the wearer and reset whenever it slackens rather than being fixed at manufacture. This one is anatomically shaped to follow the curve of the knee, with the panelling placed around the patella and the surrounding muscle so pressure lands where the joint needs support instead of squeezing evenly across a cylinder. Reinforced panels limit the sideways travel that puts strain on the ligaments during quick direction changes, which is the mechanism behind most recreational knee injuries — the load is rarely straight down. The lining is soft and cushioned with the seams positioned away from the bend to stop chafing over a long day, and it is slim enough to wear under trousers, so it works as an all-day support and not only as gym kit. Hand or machine washable, which matters for something worn against the skin. ₹187 against a ₹1,999 list price on Amazon, in stock.',
  },
  {
    // ROT FIX — keeps the EXISTING slug. #575 has been indexed since 2026-07-31 and
    // renaming a live URL to chase the slug convention would cost the page its history.
    productId: 'B0GG4FDSV4',
    name: 'Zebronics Type-C Wired Earphones with in-Line Mic, 10mm Driver, 1.2m Cable',
    slug: 'zebronics-type-c-wired-earphones-in-line-mic-deep-bass-1-B0GG4F',
    price: 229,
    mrp: 599,
    image: 'https://m.media-amazon.com/images/I/61GieSE83KL._SX679_.jpg',
    confirm: 'Confirm the connector reads Type-C — the 3.5mm version of this earphone is a different listing at a different price.',
    description:
      'Type-C wired earphones exist for one reason: the phone stopped having a headphone jack and a dongle is one more thing to lose. Buying them at ₹229 makes the calculation simple, because that is dongle money for a pair that includes the dongle. The driver is a 10mm neodymium unit, which is at the larger end for in-ear wired sets and is where the bass weight comes from — a smaller driver has to be equalised into sounding full, a 10mm one moves enough air to do it honestly. The in-line mic is the part that earns its place on a cheap pair: Type-C audio on a phone means calls and meetings route through the earphone, so a mic that captures voice clearly matters more than it would on a music-only set. The in-ear fit gives passive isolation, which does most of the work that active noise cancelling does on a commute at a fraction of the price. The 1.2m cable is the right length for a phone in a pocket rather than a laptop on a desk, and the whole thing is light enough to forget about over a few hours. Works with any phone or tablet carrying a dedicated Type-C audio port. ₹229 against a ₹599 list price on Amazon, in stock.',
  },
];

for (const d of deals) {
  d.storeSlug = 'amazon';
  d.storeName = 'Amazon';
  d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – Amazon`;
  d.howTo = HOW(d.confirm);
}

// Pre-flight. A hand-typed ₹ in a title that disagrees with the numeric price ships a
// page whose visible copy contradicts its own Product schema.
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const seen = new Set();
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  // legacy slug exemption: #575 predates the full-productId slug rule and is indexed
  if (!d.slug.toLowerCase().endsWith(d.productId.toLowerCase()) && !/^zebronics-type-c-wired-earphones/.test(d.slug))
    throw new Error(`slug missing productId ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
  seen.add(d.slug); seen.add(d.productId);
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
