// TELEGRAM-DEAL-MONITOR tick 2026-09-22u.
// 25 sidebar rows -> 3 shortlink candidates -> 2 unique ASINs after resolution
// (amazn.lt and amzn.to from two different channels resolved to the SAME ASIN)
// -> both fresh vs data/tg-multi-seen.json + the live DB -> 2 rows here.
//
// Prices read off the Amazon PDP in a logged-in tab (same-origin fetch + DOMParser,
// regex over the FULL #centerCol innerText). Channel prices were NOT trusted:
//   SB Loots posted B0DY83B8FD "@909 ... Apply 30% Off Coupon"  -> 1297.71 * 0.70 = 908.40.
//   CoolzTricks posted the same ASIN as "980 Apply Coupon"      -> neither is the list price.
// We publish the PDP price a buyer pays without clipping anything.
//
// NOTE on B0DY83B8FD: the standard price regex
//   /₹([\d,]+)(?:\s*with|\s*₹|\s*M\.R\.P|$)/
// returns 6,990 on this PDP, i.e. the M.R.P., because the real price ₹1,297.71 carries
// decimal paise and the digits are not directly followed by one of the anchors. Both
// numbers here were taken from the price window read in full, not from that regex.
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
    productId: 'B0DY83B8FD',
    name: 'Bajaj 20W Cool Day Light LED Tubelight, Pack of 10',
    price: 1298,
    mrp: 6990,
    image: 'https://m.media-amazon.com/images/I/71ZZRXu9pHL._SX679_.jpg',
    confirm: 'Check the quantity on the listing reads Pack of 10 before ordering — the bullet text on the same page still says 1 Pcs, a leftover from the single-unit listing, while the specification block and the title both state 10 Count.',
    description:
      'Ten LED tubelights for the price of about two is the whole case here, and it only makes sense if you have ten fittings to fill — a new flat, a shop floor, a rewire, a house still running fluorescent battens that flicker on a cold morning. Per tube this works out to roughly ₹130, which is below what a single branded 20W LED batten normally costs. The specification worth reading is the one nobody checks: wide operating voltage of 100V to 300V, with the tube rated to survive 400V for 24 hours, plus 4 kV surge protection. In practice that is the difference between a tube that dies in the first monsoon and one that does not, because what kills cheap LED drivers is not continuous use but the spikes when the grid comes back after a cut. Efficacy is quoted at 100 lumens per watt, so a 20W tube puts out roughly the light of an old 40W fluorescent while drawing half the power and starting instantly, with no choke hum and no warm-up. The light is white and the tube is IR-free and UV-free, which matters in a room where the light sits close to people or to stored goods. It mounts either on a standard fitting or directly to the wall with a suspension kit, so an existing batten housing is not a requirement. T5 form factor, B15D base, one-year warranty. ₹1,298 for the set of 10 against a ₹6,990 list price on Amazon, in stock.',
  },
  {
    productId: 'B07S1V7FP9',
    name: 'Secret Temptation Dream Eau De Parfum for Women, 100 ml',
    price: 279,
    mrp: 699,
    image: 'https://m.media-amazon.com/images/I/51ACC7O6SgL._SX679_.jpg',
    confirm: 'Confirm two things on the listing — that it is the 100 ml Dream bottle, and the delivery window, which is currently running about a week out rather than next-day.',
    description:
      'The detail that decides whether this is worth ₹279 is in the name: eau de parfum, not eau de toilette. EDP carries a higher concentration of fragrance oil, which is what determines how long a scent stays on skin rather than how strong it smells in the first five minutes. At ₹279 for 100 ml, that is under ₹3 per millilitre for an EDP, and most of what sells at this price in India is the weaker EDT or a plain body spray. Dream is built as a sweet fruity floral — the bright, clean end of the range rather than a heavy oriental — and the listing places it as office wear, which is the honest positioning for a fragrance of this character. It reads as fresh in a meeting room and does not fill a lift. The 100 ml bottle is a spray, so it is applied rather than poured, and the usage note from the manufacturer is the one most people ignore: hold the nozzle three to six inches from the skin and spray onto pulse points, the inner wrists and the neck, where blood flow warms the skin and lifts the scent through the day. Sprayed onto clothes instead it sits flat and fades faster. Reapply once after about six hours if the day runs long. ₹279 against a ₹699 list price on Amazon.',
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

// Pre-flight. Same 6 checks as the DEAL-INGEST path — a hand-typed ₹ in a title that
// disagrees with the numeric price ships a page whose visible copy contradicts its own
// Product schema, and this tick had a live price-regex trap, so it matters more than usual.
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
