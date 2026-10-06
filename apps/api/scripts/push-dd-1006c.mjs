// DESIDIME-INGEST tick 2026-10-06c
//
// Stage 1: 34 cards -> 18 product-resolved -> 3 already in DB -> 15 fresh. Pushed 4, all Shopsy
// (no ld+json; price from finalPrice, stock from the absent Sold Out widget, Cuelinks affiliate).
// Dropped:
//   - Digihaat pooja thali: random item, no ld+json.
//   - THE MAN COMPANY perfume: cosmetics.
//   - Ajio Netplay polo x2: no ld+json, unverifiable.
//   - Walkaroo flats x2: effectively 0% off.
//   - RIVARAJ "study table": the image is a different product.
//   - HP backpack: likely knock-off listing.
//   - Ant Esports AE200M: rating 3.5.
//   - BISSELL SpotClean: ₹8,810 on the PDP vs ₹7,692 on the card.
//   - Philips TAT1179: rating 3.3.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Shopsy: (d) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(d.url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const ONE = 'The link opens the exact listing we checked; other sizes or colours can be priced differently, so check the selected option before paying.';
const DEALS = [
  {
    store: 'Shopsy', productId: 'XWAHMSFZSU54NXQH', name: 'IRU Creation Analog Wall Clock 20 cm', price: 170, mrp: 999,
    url: 'https://www.shopsy.in/iru-creation-analog-wall-clock/p/itm934f464204944?pid=XWAHMSFZSU54NXQH',
    image: 'https://rukminim3.flixcart.com/image/1114/972/xif0q/shopsy-wall-clock/9/f/r/analog-20-cm-x-20-cm-wall-clock-20-mac-analog-iru-creation-20-original-imahmsfzfxh9dwac.jpeg',
    variant: ONE,
    description: [
      "IRU Creation's 20 cm analog wall clock is ₹170 on Shopsy, rated 4.0 stars by 2,681 buyers.",
      'It is a 20 x 20 cm clock with a brown plastic frame and a white dial, sold as a single piece.',
      'A low-cost pick for a kitchen, bedroom or office wall where a basic analog clock is all you need.',
    ],
  },
  {
    store: 'Shopsy', productId: 'XZYHMM4ZSWGJGNQ7', name: 'AMK Enterprise Mixer Grinder Jar Combo 400 ml and 600 ml Stainless Steel', price: 344, mrp: 999,
    url: 'https://www.shopsy.in/amk-enterprise-mixer-grinder-jar-combo-400ml-600ml-stainless-steel-multipurpose-set-juicer/p/itmf296f505ca374?pid=XZYHMM4ZSWGJGNQ7',
    image: 'https://rukminim3.flixcart.com/image/1114/972/xif0q/shopsy-mixer-juicer-jar/l/y/g/mixer-grinder-jar-combo-400ml-600ml-stainless-steel-multipurpose-original-imahmm4zs7wezmzj.jpeg',
    variant: ONE,
    description: [
      "AMK Enterprise's two-jar mixer grinder combo is ₹344 on Shopsy, rated 4.0 stars by 32 buyers.",
      'The set has two stainless steel jars, 400 ml and 600 ml, each with its blade and lid included.',
      'These are replacement jars, not a mixer: check that the coupler fits your mixer grinder base before ordering.',
    ],
  },
  {
    store: 'Shopsy', productId: 'XPSGH3MHVNJ3X4HU', name: 'SHUBHSWAR Daily Wear Georgette Saree with Unstitched Blouse', price: 248, mrp: 999,
    url: 'https://www.shopsy.in/shubhswar-daily-wear-georgette-saree-unstitched-blouse/p/itme4e8f92457d9a?pid=XPSGH3MHVNJ3X4HU',
    image: 'https://rukminim3.flixcart.com/image/1114/972/xif0q/sari/5/2/q/free-grey-1682-4-anand-sarees-unstitched-enriched-0-original-imag9gcpvuj6xdxg.jpeg',
    variant: ONE,
    description: [
      "SHUBHSWAR's daily-wear georgette saree is ₹248 on Shopsy, rated 4.0 stars by 134 buyers.",
      'The saree is 5.2 m long and comes with a 0.8 m unstitched blouse piece. The listing says hand wash only.',
      'A light georgette regular saree for everyday and office wear.',
    ],
  },
  {
    store: 'Shopsy', productId: 'SNDHFY5T9HHZ5ZEJ', name: 'ZIYARAT COLLECTION Women Casual Mesh Sandals', price: 165, mrp: 999,
    url: 'https://www.shopsy.in/ziyarat-collection-women-casual/p/itm32a1c9972a231?pid=SNDHFY5T9HHZ5ZEJ',
    image: 'https://rukminim3.flixcart.com/image/1114/972/xif0q/sandal/y/j/k/5-319345352-pink-blue-ziyarat-collection-pink-blue-original-imahfy5sy6eswabu.jpeg',
    variant: ONE,
    description: [
      "ZIYARAT COLLECTION's women's casual sandals are ₹165 on Shopsy, rated 3.8 stars by 138 buyers.",
      'They are flat sandals with a mesh upper in pink and blue, listed for casual and party wear.',
      'The listing we checked is UK/India size 5. Pick your size on the page, as stock and price can differ by size.',
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
  if (!/\/p\/itm\w+\?pid=/.test(d.url)) throw new Error(`bad shopsy url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'dd-1006c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
