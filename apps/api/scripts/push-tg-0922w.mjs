// TELEGRAM-DEAL-MONITOR tick 2026-09-22w.
// 25 sidebar rows -> 6 shortlinks resolved -> 4 candidate product ids -> 1 fresh after
// dedup vs data/tg-multi-seen.json + the live DB -> 1 row here.
//
// Price read off the Amazon PDP in a logged-in tab (same-origin fetch + DOMParser over
// the FULL #centerCol innerText). CoolzTricks posted "@328" and the PDP agreed exactly,
// which is unusual enough to be worth recording.
//
// TRAP on this PDP: the price window reads
//   "₹328.00 with 45 percent savings -45% ₹328 ₹54.67 per count(₹54.67₹54.67 / count)
//    M.R.P.: ₹594.00"
// A naive "first ₹ after the price" read returns ₹54.67 — that is the PER-UNIT rate for
// one vest out of six, not the price. Published figure is the window's leading ₹328.00,
// cross-checked against the -45% badge and round(1 - 328/594) = 45.
//
// #feature-bullets came back EMPTY on this ASIN (apparel listing, bullets are rendered
// client-side) — the description below is written off #detailBullets_feature_div specs
// and the title, never channel text.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const HOW = (confirm) => [
  'Tap Grab Deal to open the product on Amazon.in at the live price.',
  confirm,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const kebab = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const slugFor = (name, productId) =>
  `${kebab(name).slice(0, 80).replace(/-+$/, '')}-${productId.toLowerCase()}`;

const deals = [
  {
    productId: 'B0DZP3V36B',
    name: 'Amul Comfy Men Cotton Sleeveless Vest, Pack of 6',
    price: 328,
    mrp: 594,
    image: 'https://m.media-amazon.com/images/I/819phY3S1sL._SX679_.jpg',
    confirm:
      'Pick your size on the listing before adding to cart — the default variant loads as size S, and the title carries the seller own "Color May Vary" caveat, so the six vests may not all arrive in the shade shown in the photo.',
    description:
      'Six cotton vests for ₹328 works out to about ₹55 each, which is roughly what a single branded vest costs at a counter, and that is the entire case for buying innerwear in a pack of six rather than two. The fabric is 100% cotton single jersey — the knit matters more than the fibre content here, because single jersey is thin and open enough to keep passing air rather than trapping it, which is what a vest is actually for in an Indian summer. A heavier interlock or rib knit in the same cotton sits warmer under a shirt. Cut as a U-neck sleeveless with a seamless body, so there is no side seam to press a ridge into the skin or to fray after a few dozen washes — the usual first failure point on cheap vests is the stitched side seam, not the fabric. The neck is low enough to stay hidden under an open collar. Net quantity is 6 count, packed weight 400 g for the set, which puts each vest at under 70 g. Made by J.G. Hosiery in Tirupur, Tamil Nadu, the hosiery cluster most Indian innerwear comes out of, with country of origin India. Amazon currently ranks it #8 in Men Undershirt Tank Tops. ₹328 for the pack of 6 against a ₹594 list price, in stock with free delivery.',
  },
];

for (const d of deals) {
  d.slug ??= slugFor(d.name, d.productId);
  d.storeSlug = 'amazon';
  d.storeName = 'Amazon';
  d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – Amazon`;
  d.howTo = HOW(d.confirm);
}

// Pre-flight. Same 6 checks as every push path.
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const seen = new Set();
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  if (!d.slug.toLowerCase().endsWith(d.productId.toLowerCase()))
    throw new Error(`slug missing productId ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
  seen.add(d.slug); seen.add(d.productId);
}
console.log(`pre-flight OK, ${deals.length} rows\n`);

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
