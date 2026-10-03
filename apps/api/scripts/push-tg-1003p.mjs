// TELEGRAM-DEAL-MONITOR tick 2026-10-03p
//
// Sidebar sweep of the tg-groups.json chats + a reload of ONLINE SHOPPING DEALS. 4 fresh single-product Amazon deals, all
// read in the logged-in Amazon tab (priceToPay, #availability In stock, add-to-cart present): DOCAT book stand B0GKFH23KX,
// French Connection watch B097PWJD2V, Beardo perfume combo B0CG1WX5YC (M.R.P. read from #centerCol; the a-text-price was
// the ₹3.57/ml rate), Skechers MI jersey B0GR9VRL6W (channel's ₹220 is after a 50% clip coupon; we list the ₹440 PDP price).
import { writeFileSync } from 'node:fs';
// Skipped: Dealdost anjeer + aloe gel (food/health, 2-in-1 post), loot/category/app posts, already-seen shortlinks. Copy is original.

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com/${d.itm}?pid=${d.productId}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant, coupon) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant, coupon });
const F = (productId, itm, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, itm, name, price, mrp, exp: price, av: 'InStock', image, description, variant, coupon });
const DEALS = [
  A('B0GKFH23KX', 'DOCAT Wooden Book Stand with 360° Rotating Base, Adjustable Angle', 1999, 4999, '61TJzW3jhsL._SL1024_', [
    'The DOCAT adjustable book stand is ₹1,999 on Amazon, 60% below the M.R.P.',
    'A natural-wood reading panel sits on a steel support bar and a base that turns a full 360°, and the angle and height adjust to bring a book, cookbook or tablet up to eye level. It folds flat for a drawer. Buyers rate it 4.0 stars across 88 reviews.',
    'It suits long study sessions, recipe reading in the kitchen or propping a tablet for video calls, and takes strain off the neck compared with reading flat on a desk.',
  ], 'The listing has a single wooden finish; check the size against your books or tablet in the photos.'),
  A('B097PWJD2V', "French Connection Analog Women's Watch, Coloured Strap", 1079, 6950, '61BQdIZlebS._SL1440_', [
    "French Connection's analog women's watch is ₹1,079 on Amazon, 84% off the M.R.P.",
    'It is a simple analog piece with a coloured dial and matching strap, made for everyday wear with western or ethnic outfits. Buyers rate it 4.1 stars across 271 reviews.',
    'A branded watch at this price works well as a gift; the seller is VRP Telematics.',
  ], 'Check the strap colour in the photos before ordering.'),
  A('B0CG1WX5YC', 'Beardo Whisky Smoke and Mariner Perfume Combo for Men, 50 ml Each', 357, 1698, '71khhqBXQlL._SL1500_', [
    'The Beardo Whisky Smoke plus Mariner perfume combo for men is ₹357 on Amazon, 79% below the M.R.P.',
    'You get two 50 ml eau de parfum bottles: Whisky Smoke, a spicy-woody scent with oud, tobacco and cinnamon for evenings, and Mariner, a fresher daytime fragrance. Buyers rate it 4.1 stars across 979 reviews.',
    'Two full-size EDPs for the price of one budget deodorant makes this a strong pick for daily office wear or a gift.',
  ], 'Make sure the two-bottle combo is selected, not a single perfume.'),
  A('B0GR9VRL6W', 'Skechers Mumbai Indians 2026 Official IPL Fan Jersey for Men', 440, 999, '61ImWEJ6-GL._SL1500_', [
    'The official Skechers Mumbai Indians 2026 fan jersey for men is ₹440 on Amazon, 56% under the M.R.P.',
    'It is a regular-fit polyester jersey in the 2026 team kit, light and quick-drying for match days, stadium visits or the gym. Buyers rate it 4.2 stars across 114 reviews.',
    'The product page also shows a 50% clip-on coupon, which can bring the price at checkout down further while it lasts.',
  ], 'Pick your size; tick the 50% coupon box on the product page before adding to cart.', 'Tick the 50% clip-on coupon shown on the Amazon product page. It is an Amazon coupon, not a code from us, and it can end without notice.'),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|assets\.myntassets\.com\/h_1440,q_90,w_1080\/\S+|rukmini1\.flixcart\.com\/image\/\d+\/\d+\/\S+\.jpe?g\?q=\d+)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  // every ₹ figure in our copy must be the live price, except per-unit ("about ₹") and M.R.P. ("against a ₹") mentions
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store).map((s) => (s === NO_COUPON && d.coupon ? d.coupon : s)), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-1003p-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
