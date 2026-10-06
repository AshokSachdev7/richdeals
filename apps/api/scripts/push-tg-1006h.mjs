// TELEGRAM-DEAL-MONITOR tick 2026-10-06h
//
// Pushed 1 (Flipkart): PUMA Fire Run Sneakers For Men, SHOG8VF7SDE4U76U (CoolzTricks fkrt.cc/hFU3sdB + Dealzone fktr.in/Bj6RPI8).
//   Posted at ₹776 "+ apply coupon"; ld+json live price is ₹859, pushed at ₹859 (the verified figure).
// Dropped:
//   - SINGER Venti X BLDC exhaust fan FANHQGWQM7EHHHZH (Dealdost): price matches ₹1,169 but 0 ratings.
//   - Lloyd 1.5T AC B0GJDVGS6P: already seen, and the price needs an SBI card offer.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Flipkart: (d) => `https://www.flipkart.com/p/${d.itm}?pid=${d.productId}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Flipkart', productId: 'SHOG8VF7SDE4U76U', itm: 'itmb8344ec58d9b3', name: 'PUMA Fire Run Sneakers For Men Quarry Vibrant Orange', price: 859, mrp: 2999,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shoe/j/p/w/-watermarked-original-imahgctk8yzguaph.jpeg',
    variant: 'The link opens the size we checked; other sizes can be priced differently, so check the selected size before paying.',
    description: [
      "PUMA's Fire Run sneaker for men is ₹859 on Flipkart, rated 4.0 stars by 28,744 buyers.",
      'This is the Quarry / Vibrant Orange colourway (style 380614), a lightweight lace-up running-style sneaker for daily wear and gym use.',
      'Flipkart sometimes shows an extra product-page coupon on this listing; if one appears at checkout it lowers the price further.',
    ],
  },
];
const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini\w*\d\.flixcart\.com\/image\/[\w/.-]+\.jpe?g)$/;
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  for (const m of d.description.join(' ').matchAll(/₹([\d,]+)/g)) {
    if (Number(m[1].replace(/,/g, '')) !== d.price) throw new Error(`copy ₹${m[1]} != price ₹${d.price} ${d.productId}`);
  }
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

const file = process.argv[2] ?? 'tg-1006h-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
