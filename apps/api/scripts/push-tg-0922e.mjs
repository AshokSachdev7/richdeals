// telegram tick 2026-09-22e: 6 Amazon deals scraped out of ONLINE SHOPPING DEALS
// message history (sidebar was stale). Every price/MRP/stock flag re-read on the
// live PDP — the channel numbers were wrong on two of them, and the fetched-HTML
// a-text-price is a UNIT price on grocery/beauty listings, so #centerCol innerText
// is the only MRP worth trusting.
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
    productId: 'B0FK3R485M',
    slug: 'aarika-women-knitted-cardigan-sweater',
    title: 'Aarika Women Knitted Cardigan Sweater at ₹399 (68% Off) – Amazon',
    description:
      'A button-front knitted cardigan is the layer most Indian winters actually need — warm enough for a north-Indian December morning, light enough to pull off by noon, and it works over a kurta as easily as over a tee. This one is the long-sleeve full-front kind rather than a cropped shrug, so it covers properly when the office AC is the problem instead of the weather. Sizing on knitwear runs snug, so check the chest measurement on the Amazon size chart rather than going by your usual label size. At ₹399 against a ₹1,249 list price it sits below what an unbranded market cardigan costs.',
    image: img('71MilldtQrL'),
    mrp: 1249,
    price: 399,
    discountPct: 68,
    howTo: howTo('size and colour on the size chart'),
  },
  {
    productId: 'B0BG88FS1G',
    slug: 'puma-women-gina-sneakers',
    title: 'Puma Women Gina Sneakers at ₹1,247 (71% Off) – Amazon',
    description:
      'The Gina is Puma\'s plain lifestyle sneaker — a low-profile lace-up built for walking around in, not for running. That is the point: it goes with jeans, it goes with joggers, and the rubber outsole handles the everyday pavement-and-mall routine without the chunky midsole that dates a shoe in a year. Puma\'s women sizing runs true to UK size, so order the number you normally wear. ₹1,247 against a ₹4,299 list price is genuinely low for a branded sneaker — the unbranded shelf in the same store sits around this number.',
    image: img('51PYlGLjktL'),
    mrp: 4299,
    price: 1247,
    discountPct: 71,
    howTo: howTo('UK size and colourway'),
  },
  {
    productId: 'B0B1J91BCD',
    slug: 'wonderchef-venice-serving-casserole-set-of-2',
    title: 'Wonderchef Venice Serving Casserole Set of 2 at ₹549 (72% Off) – Amazon',
    description:
      'Insulated casseroles are the one kitchen buy that earns itself back every single dinner — rotis stay soft and dal stays hot for the hour between the last person cooking and the last person eating. This is a two-piece Wonderchef Venice set, so you get one for the bread and one for the curry instead of the single-bowl packs that sell for nearly the same money. Stainless inner, double-wall body, twist-lock lid. Two pieces at ₹549 against a ₹1,960 list price works out to under ₹275 a casserole.',
    image: img('61VtuJfPHuL'),
    mrp: 1960,
    price: 549,
    discountPct: 72,
    howTo: howTo('capacity of the two pieces in the set'),
  },
  {
    productId: 'B0DM28ZYKN',
    slug: 'conscious-chemist-berry-bright-sunscreen-spf50',
    title: 'Conscious Chemist Berry Bright Sunscreen SPF50 at ₹126 (49% Off) – Amazon',
    description:
      'A daily SPF50 gel sunscreen in a 20g tube — the travel-size format, which is the honest way to try a sunscreen before committing to a full bottle. Conscious Chemist builds this one as a lightweight no-white-cast formula, which is the specific complaint most Indian buyers have with mineral sunscreens. SPF only works if it is reapplied, so a small tube that fits a bag is arguably more useful than a big one that stays on the shelf. ₹126 against a ₹249 MRP; verify the tube size on the Amazon page, because the listing also carries larger variants at different prices.',
    image: img('517WEu3nVIL'),
    mrp: 249,
    price: 126,
    discountPct: 49,
    howTo: howTo('20g tube size — larger variants cost more'),
  },
  {
    productId: 'B0C2J1BT96',
    slug: 'auradecor-fragrance-heat-diffuser-gift-set-lavender',
    title: 'AuraDecor Fragrance Heat Diffuser Gift Set at ₹215 (46% Off) – Amazon',
    description:
      'A ceramic heat diffuser set — the tealight kind that warms the oil rather than the electric ultrasonic type, so there is nothing to plug in and nothing to break. It ships as a gift set with the burner and lavender fragrance oil together, which is what makes it a reasonable ₹215 buy rather than a burner you then have to source oil for separately. Lavender is the standard bedroom scent for a reason; the same burner takes any fragrance oil once this bottle runs out. Note the channel price for this one had gone stale — the live Amazon price is ₹215, not lower.',
    image: img('71QIUzqI5wL'),
    mrp: 399,
    price: 215,
    discountPct: 46,
    howTo: howTo('fragrance variant included in the set'),
  },
  {
    productId: 'B07RNY24QH',
    slug: 'kohler-brive-slow-close-toilet-seat',
    title: 'Kohler Brive Slow Close Toilet Seat at ₹846 (63% Off) – Amazon',
    description:
      'A slow-close seat is the cheapest upgrade a bathroom takes — no slam at 2am, and the hinge stops being the part that cracks first. This is Kohler\'s Brive, so the quick-release hinges come off for cleaning instead of trapping grime in a fixed bracket. Toilet seats are not one-size: measure the bolt-hole spacing and the bowl length on your existing pan before you order, because a seat that fits an elongated bowl will overhang a round one. ₹846 against a ₹2,310 list price puts a branded seat at unbranded-hardware-shop money.',
    image: img('41etWO5RxBL'),
    mrp: 2310,
    price: 846,
    discountPct: 63,
    howTo: howTo('bowl shape and bolt-hole spacing of your pan'),
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
