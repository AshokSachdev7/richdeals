// TELEGRAM-DEAL-MONITOR tick 2026-09-27zzm
//
// Sidebar scan over all data/tg-groups.json groups. One unseen single-product deal passed: a Shopsy macrame wall shelf
// (their affid=inf_... stripped), re-read from the Shopsy PDP with curl (no ld+json on Shopsy: SPECIAL_PRICE / Final Price,
// Maximum Retail Price, availabilityStatus IN_STOCK + isAvailable, rating), productId not in the DB. Shopsy is not Flipkart,
// so it goes through Cuelinks. Rejected: Vaku power bank (coupon-code price), Clazkit soap tray (channel ₹83 vs PDP ₹166),
// two dry-fruit packs (grocery). Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Shopsy: (_id, url) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const DEALS = [
  {
    store: 'Shopsy', productId: 'UQNGVGCNUBKEDZGT',
    name: 'ZAWI Craft Macrame Wall Hanging Shelf (Made in India), Wooden Wall Shelf',
    url: 'https://www.shopsy.in/zawi-craft-macrame-wall-hanging-shelf-made-india-wooden/p/itmf591d3384bbe3?pid=UQNGVGCNUBKEDZGT',
    price: 242, mrp: 1899, exp: 242, av: 'In stock',
    image: 'https://rukminim3.flixcart.com/image/1114/972/xif0q/wall-decoration/r/v/6/craft-macrame-wall-hanging-shelf-made-in-india-1-rakan10-macarme-enriched-0-original-imagub4zgjnphkyf.jpeg?q=70',
    description: [
      "ZAWI Craft's macrame wall hanging shelf is ₹242 on Shopsy, 87% below the M.R.P.",
      'It is a single wooden plank slung in hand-knotted cotton macrame cord, made in India, that hangs from one hook and holds light pieces such as a small plant, candles, photo frames or a few books. Buyers rate it 4.2 stars across 79 ratings.',
      'It is a decor shelf, not a load-bearing one; keep heavy items off it and use a wall hook rated for the weight.',
    ],
    variant: 'Confirm the single-shelf macrame design is selected.',
  },
];
const IMG = /^https:\/\/rukminim\d\.flixcart\.com\/image\/[\w/.+%-]+\.jpe?g\?q=\d+$/;
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
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId, d.url),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs PDP ${d.productId}`);
  if (!/in ?stock/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  if (!IMG.test(row.image)) throw new Error(`bad image ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (/affid|inf_/i.test(row.affiliateUrl)) throw new Error(`source tag left in url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0927zzm-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
