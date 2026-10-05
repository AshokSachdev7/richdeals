// DESIDIME-INGEST tick 2026-10-05e
//
// 33 cards -> 13 fresh. Pushed 4: Philips HR2612 mini blender (Amazon PDP 2,429 vs 3,295, 4.0 from 104, add-to-cart),
// Vihat kurta set, Lyamay Kasavu saree and Nirvika copper-bottom urli set (Shopsy page state Total = card price, ratings
// 3.8/1,694, 4.0/783, 4.1/1,220). Rejected: Bajaj MX 45 iron (3.4 stars), POPWINGS trouser (1 rating), ASUS TUF A15
// (PDP 1,04,990 vs card 93,740, 3 ratings), Graco car seat (PDP 8,121 vs 7,716), Mia Fashion jackets x2 (3.3/3 and
// 3.0/8), Yashoda toran (Shopsy shows both 206 and 174 totals - price ambiguous), rosemary hair spray (health),
// Cadbury Celebrations (food).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Shopsy: (d) => `https://linksredirect.com/?cid=527&source=linkkit&url=${encodeURIComponent(d.url)}`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const DEALS = [
  {
    store: 'Amazon', productId: 'B0H4BTVWTB', name: 'Philips HR2612/00 Mini Blender with 2 Unbreakable PC Jars', price: 2429, mrp: 3295,
    image: 'https://m.media-amazon.com/images/I/61GNGiGlFXL._SL1254_.jpg',
    variant: 'There is a single configuration on this listing: the blender base with two jars.',
    description: [
      "Philips' HR2612/00 mini blender is ₹2,429 on Amazon, rated 4.0 stars across 104 reviews.",
      'It is a compact personal blender that comes with two unbreakable, food-grade polycarbonate jars, so you can blend a smoothie, shake or chutney and carry it in the same jar. It suits a single person or a couple who want quick drinks without pulling out a full mixer grinder.',
      'A mini blender is built for soft fruit, liquids and small batches. It is not a replacement for a mixer grinder for dry masalas or hard grains, so keep that job for a bigger appliance.',
    ],
  },
  {
    store: 'Shopsy', productId: 'SEVHCSV2RHD9FM3D', name: 'Vihat Fashion Women Kurta, Churidar & Dupatta Set', price: 439, mrp: 1999,
    url: 'https://www.shopsy.in/vihat-fashion-women-kurta-churidar-dupatta-set/p/itm1f77b73067b68?pid=SEVHCSV2RHD9FM3D',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shopsy-ethnic-set/v/m/s/xl-vansi-vihat-fashion-enriched-0-original-imahcstxgfrz4g4z.jpeg',
    variant: 'Pick your size on the product page; the price can differ slightly between sizes, so check it after selecting.',
    description: [
      "Vihat Fashion's three-piece women's set with kurta, churidar and dupatta is ₹439 on Shopsy, rated 3.8 stars by 1,694 buyers.",
      'Buying the kurta, bottom and dupatta together as a matched set saves the hunt for a dupatta in the right shade, and it works for daily office wear, college or a small family function.',
      'Budget ethnic sets vary in fit, so compare the size chart against a kurta you already own rather than going by your usual size label. Wash the dupatta separately the first few times in case the colour bleeds.',
    ],
  },
  {
    store: 'Shopsy', productId: 'XPSHDXHQVEJD6HR7', name: 'Lyamay Kasavu Pure Cotton Saree with Unstitched Blouse', price: 251, mrp: 1999,
    url: 'https://www.shopsy.in/lyamay-solid-self-design-kasavu-pure-cotton-saree-unstitched-blouse/p/itm1397f3529f180?pid=XPSHDXHQVEJD6HR7',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shopsy-sari/h/u/r/free-xxkeiaia-white-lyamay-unstitched-original-imahjgxh9pfesuym.jpeg',
    variant: 'The saree is free size; the blouse piece comes unstitched, so plan for tailoring.',
    description: [
      "Lyamay's Kasavu-style pure cotton saree with an unstitched blouse piece is ₹251 on Shopsy, rated 4.0 stars by 783 buyers.",
      'Kasavu is the off-white saree with a contrasting border traditionally worn in Kerala for Onam, Vishu and temple visits. Cotton keeps it breathable for long days in warm weather.',
      'Cotton sarees crease easily and may shrink slightly on the first wash, so soak and dry it in shade, then iron before wearing. Budget for blouse stitching on top of the saree price.',
    ],
  },
  {
    store: 'Shopsy', productId: 'COZG9GVXRBGJKPMC', name: 'Nirvika Copper Bottom Handi/Urli with Lid, 5-Piece Serving Set', price: 676, mrp: 1299,
    url: 'https://www.shopsy.in/nirvika-copper-bottom-handi-urli-lid-serving-cooking-gifting-set-5-piece-cookware/p/itmdac6fc227b8f3?pid=COZG9GVXRBGJKPMC',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/kwwfte80/shopsy-cookware-set/5/c/y/10-copperurli-05-nirvika-original-imag9gvxfmawycx4.jpeg',
    variant: 'This is the 5-piece set listing; check the pieces and sizes shown in the photos before you order.',
    description: [
      "Nirvika's copper-bottom handi and urli serving set with lids is ₹676 on Shopsy, rated 4.1 stars by 1,220 buyers.",
      'A copper base spreads heat more evenly than plain steel, which helps dal, sabzi and rice cook without hot spots, and the handi shape looks good enough to take straight to the table. It is also a common pick for a housewarming or wedding gift.',
      'Copper bottoms darken with use; clean them with lemon and salt or a copper cleaner to bring the shine back. Avoid harsh scrubbers on the polished surfaces.',
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
      `Tap Grab Deal to open the ${d.name.split(',')[0]} on ${d.store} at the live price.`,
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

const file = process.argv[2] ?? 'dd-1005e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
