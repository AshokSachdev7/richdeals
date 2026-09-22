// TELEGRAM tick 2026-09-22s. 3 shortlinks resolved, 1 publishable.
//   B0CTYMGCPV  SB Loots  "MRP - 1860" (no deal price) -> PDP Rs.649 / MRP Rs.1,860 / -65% / In stock -> NEW
//                Channel MRP matches the PDP M.R.P. exactly; the deal price came from our own read.
//   B0hLf0C6s   Dealzone  "Upto 68% Off On Lakme"  -> resolved to /s?k=lakme (SEARCH page) -> skip
//   B06WV77YDB  ONLINE SHOPPING DEALS "Yonex ET 901 grip Rs.85" -> PDP Rs.85, In stock, but
//                #centerCol still reads only "Rs.85.00 Rs.85" with NO M.R.P. and no
//                .savingsPercentage node. Second consecutive tick with the same defect, read
//                45 min apart -> not a transient read failure. No list price means no
//                verifiable savings claim, so it stays dropped rather than becoming another
//                null-MRP row in the 1,624-row backlog.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const kebab = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const HOW = (confirm) => [
  'Tap Grab Deal to open the product on Amazon.in at the live price.',
  confirm,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const deals = [
  {
    productId: 'B0CTYMGCPV',
    name: 'Wonderchef Bellagio Sauce Pan, 16 cm, 1.4 L, Non-Stick Ceramic, PFAS and PFOA Free',
    price: 649,
    mrp: 1860,
    image: 'https://m.media-amazon.com/images/I/51RG+9HLHmL._SX679_.jpg',
    confirm: 'Confirm the listing reads 16 cm / 1.4 L — Wonderchef sells the Bellagio sauce pan in several sizes at different prices.',
    description:
      'Non-stick cookware splits into two populations and the label rarely tells you which one you are holding: coatings built on PTFE chemistry, and coatings built on ceramic. This pan is the second kind, and the specification that matters is printed plainly — the ceramic coating is free of PFAS and PFOA, and free of heavy metals and nickel. Those are the compounds that persist in the environment for decades and the reason older non-stick pans carry a do-not-overheat warning; a coating without them is a different proposition for a pan that lives on a daily flame. The body is pure virgin aluminium, which conducts heat roughly nine times better than stainless steel, so the base comes up to temperature fast and evenly instead of holding a hot ring under the burner and a cold margin at the edge — the usual cause of milk catching in a sauce pan. At 3 mm the wall is thick enough to resist warping, which is what ends the life of most cheap pans long before the coating fails. The two-tone soft-touch handle and knob stay cool enough to grip while cooking. 16 cm and 1.4 L is the single-portion size: tea, one-pot maggi, a small tempering, reheating gravy. Two-year warranty. ₹649 against a ₹1,860 list price on Amazon, in stock.',
  },
];

for (const d of deals) {
  d.slug = `${kebab(d.name).slice(0, 80).replace(/-$/, '')}-${d.productId.toLowerCase()}`;
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
  if (!d.slug.toLowerCase().endsWith(d.productId.toLowerCase())) throw new Error(`slug missing productId ${d.productId}`);
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
