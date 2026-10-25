import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `https://www.flipkart.com${d.itm}?pid=${d.productId}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const SIZE = 'The link opens the exact size and colour we checked; other sizes can be priced differently, so check the selected size before paying.';
const ONE = 'The link opens the exact variant we checked; other colours can be priced differently, so check the selected option before paying.';
const F = (productId, itm, name, price, mrp, image, description) => ({ store: 'Flipkart', productId, itm, name, price, mrp, image, variant: ONE, description });
const DEALS = [
  F('CASHPCXPUB5NHZ9G', '/evofox-warhammer-2-semi-mechanical-wired-keyboard-mouse-magnetic-wrist-pad-7200-dpi-usb-standard-laptop-compatible-desktop-laptop-tablet-ipad-mac/p/itm8d7f74ada6d99', 'EvoFox Warhammer 2 Semi-Mechanical Wired Keyboard and Mouse Combo', 1149, 1999, 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/computer-acc-combo/v/d/o/warhammer-2-semi-mechanical-wired-keyboard-mouse-magnetic-wrist-original-imahpcxzdtp3jh8x.jpeg', [
    'The EvoFox Warhammer 2 keyboard and mouse combo is ₹1,149 on Flipkart, 43% below M.R.P., rated 4.3 stars across 118 ratings.',
    'It pairs a semi-mechanical wired keyboard with a wired gaming mouse that goes up to 7200 DPI, and a magnetic wrist pad comes in the box.',
    'Both plug in over standard USB, so the set works with a desktop or laptop without any driver setup.']),
  F('TMRGXN7SBZ4ZF7HG', '/sffizeex-nose-hair-trimmer-ear-trimmer-men-women-cordless-180-min-runtime-1-length-settings/p/itm686f595c061ea', 'Sffizeex Cordless Nose and Ear Hair Trimmer for Men and Women', 195, 792, 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/trimmer/h/z/x/0-5-20-mm-2-in-1-eyebrow-trimmer-for-women-hair-removal-trimmer-original-imahhyy96c3byhpq.jpeg', [
    'The Sffizeex cordless nose and ear hair trimmer is ₹195 on Flipkart, 75% below M.R.P., rated 3.6 stars across 5,594 ratings.',
    'It is a small unisex grooming trimmer for nose and ear hair, and the listing also shows it handling eyebrow touch-ups.',
    'The 3.6-star average is middling, so treat it as a budget pick for occasional use rather than a premium groomer.']),
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini\w*\d\.flixcart\.com\/image\/[\w/.-]+\.jpe?g)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
    if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price} ${d.productId}`);
  }
  if (!d.description[0].includes(`${discountPct}% below`)) throw new Error(`copy pct ${d.productId}`);
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description: [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n'),
    howTo: [
      `Tap Grab Deal to open the ${d.name} on ${d.store} at the live price.`,
      d.variant,
      `Add to cart and check out. ${d.store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
      NO_COUPON,
    ],
    image: d.image, price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d),
  };
  if (Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, '')) !== row.price) throw new Error(`title/price ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1026c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
