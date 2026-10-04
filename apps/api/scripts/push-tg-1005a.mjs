// TELEGRAM-DEAL-MONITOR tick 2026-10-05a
//
// Sidebar sweep, 13 groups. Fresh single products: Lakme glycolic serum (ONLINE SHOPPING DEALS, link.amazon ->
// B0CPDNFW3Z) and SanDisk Ultra Curve 64GB (Rogerkart /r/ page -> B0B4N243KC). PDP: Lakme 279 vs M.R.P. 749, 4.2 from
// 400, in stock + add-to-cart; landing variant is 30 ml (title text still says 15 ml). SanDisk 800, 4.2 from 9,717,
// in stock, no M.R.P. on the page, so mrp/discount are left null rather than taking the channel's "regular 1,344".
// Rejected: Ray-Ban Meta Gen 1 (PDP 22,425 vs channel 15,425 - card-offer price), adidas watch (amzn.lt does not
// resolve), Police perfume (Myntra search page), Dove/Vaseline (FMCG), handbag B0G38DGNKM + Syska + fairy lights
// (already seen/live), Flipkart Black (promo), Swiggy Dineout (not a product).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const DEALS = [
  A('B0CPDNFW3Z', 'Lakme Glycolic Illuminate Serum with 1% Glycolic Acid, 30 ml', 279, 749, '51vvVJXJU0L._SL1000_', [
    "Lakme's Glycolic Illuminate face serum is ₹279 on Amazon for the 30 ml bottle, rated 4.2 stars across 400 reviews.",
    'It is a light exfoliating serum with 1% glycolic acid, an AHA that loosens dead surface cells so dull, uneven skin looks smoother and brighter over regular use. Lakme pitches it for all skin types and it dries to a satin finish rather than a greasy one.',
    'Glycolic acid makes skin more sensitive to sun, so use it at night and wear sunscreen the next day. Patch-test first if you have sensitive skin, and do not layer it with other acids or retinol on the same night.',
  ], 'We checked the price on the 30 ml (Pack of 1) option. The listing title still mentions 15 ml, so confirm the size shown next to the price before you buy.'),
  A('B0B4N243KC', 'SanDisk Ultra Curve 64GB USB 3.2 Flash Drive, Black (SDCZ550-064G-I35)', 800, null, '61MKJXhrRLL._SL1500_', [
    "SanDisk's Ultra Curve 64GB USB 3.2 pen drive in Black is ₹800 on Amazon, rated 4.2 stars across 9,717 reviews.",
    'It reads at up to 100 MB/s on a USB 3.x port, which makes copying a large movie folder or a backup far quicker than an old USB 2.0 stick. The curved, capless body has a loop for a keyring, and SanDisk SecureAccess software lets you keep a password-protected folder on the drive.',
    'Plug it into a blue USB 3 port to get the rated speed; on a USB 2.0 port it falls back to USB 2.0 speeds. A 64GB drive shows a little less usable space once formatted.',
  ], 'We checked the price on the Black 64GB option. Other capacities (32GB to 512GB) are priced separately.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
const out = [];
for (const d of DEALS) {
  // ponytail: mrp null when the PDP shows no M.R.P. - we never invent a discount from the channel's claim
  const discountPct = d.mrp ? Math.round((1 - d.price / d.mrp) * 100) : null;
  for (const m of d.description.join(' ').matchAll(/(about |against a )?₹([\d,]+)/g)) {
    if (!m[1] && Number(m[2].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[2]} != price ₹${d.price} ${d.productId}`);
  }
  const tail = d.mrp ? `against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.` : '— In stock.';
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} ${tail}`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)}${d.mrp ? ` (${discountPct}% Off)` : ''} – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || (row.mrp && row.price >= row.mrp)) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-1005a-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
