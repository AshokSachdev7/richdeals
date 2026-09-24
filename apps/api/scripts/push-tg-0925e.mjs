// TELEGRAM-DEAL-MONITOR tick 2026-09-25e
//
// Sidebar read of 13 tg groups -> 8 deal posts -> shortlinks resolved (amzn.to, link.amazon, fkrt.it, fkrt.co, rogerkart /r/).
// 2 dup (Lavie handbag in DB, Syska power bank in seen), Xiaomi 17 coupon-only price unreadable -> skip.
// 3 verified: Amazon via logged-in tab (#corePrice), Flipkart via visible PDP price block (no ld+json served on this pid).
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const DEALS = [
  {
    store: 'Amazon', productId: 'B0CR1MK3T9', name: 'Homeor 3 Layer Rotating Mesh Trolley Storage Organizer for Kitchen',
    price: 1161, mrp: 5999, image: IMG('71Kyp-Z7JOL._SL1500_.jpg'),
    description: [
      "Onions, potatoes, garlic and tomatoes last longer when air can move around them. Stacked in a plastic box or a closed drawer they sweat, sprout and rot faster. A tiered mesh trolley keeps each vegetable in its own open basket and moves the whole lot off the counter.",
      "This Homeor organizer has three mesh layers on a rotating frame, so you can turn it to reach the back basket without pulling everything out. It rolls on wheels, which makes it easy to move out of the way to clean under it. Outside the kitchen it works as a bathroom caddy for towels and toiletries, or as a craft or stationery cart in a study.",
      "At ₹1,161 it costs well under a fifth of its listed MRP of ₹5,999. Keep potatoes and onions in separate baskets, since onions make potatoes sprout sooner. Put the heaviest vegetables on the bottom layer so the trolley stays steady when it rolls. Wipe the mesh with a damp cloth every week to clear dust and loose onion skins.",
    ],
    variant: 'Confirm the 3-layer rotating model is selected — other sizes on the same page can be priced differently.',
  },
  {
    store: 'Amazon', productId: 'B07438SX12', name: 'Eveready 9W LED Bulb, Cool Day Light 6500K, B22 Base',
    price: 85, mrp: 300, image: IMG('719HoVVugVL._SL1500_.jpg'),
    description: [
      "A 9W LED gives about the same light as an old 60W incandescent bulb while using roughly a sixth of the power. For a bedroom, a passage or a kitchen light that stays on for hours every evening, swapping even one old bulb shows up as a small but steady saving on the electricity bill.",
      "This Eveready bulb is cool day light at 6500K, the crisp white light that suits kitchens, study tables and bathrooms where you need to see clearly. It has a B22 base, the standard push-and-twist fitting used in most Indian homes. Check your holder before ordering, because screw-type E27 holders need a different bulb.",
      "At ₹85 it costs well under a third of its listed MRP of ₹300. Eveready is a long-running Indian lighting and battery brand, and its LEDs are sold widely in local shops at close to full price. Switch the power off at the wall before changing a bulb, and let the old bulb cool first. Buying a spare now saves a trip to the shop when one blows.",
    ],
    variant: 'Confirm the 9W, cool day light, B22 single bulb is selected — packs of 2, 4 or other wattages cost more.',
  },
  {
    store: 'Flipkart', productId: 'VSLHQSFPARJYYNKK', name: 'Nutriburst Korean Marine Collagen with Hyaluronic Acid, Pineapple, 100g',
    price: 417, mrp: 999,
    image: 'https://rukminim2.flixcart.com/image/800/1070/xif0q/vitamin-supplement/f/6/a/100-korean-marine-collagen-hyaluronic-acid-pineapple-flovour-original-imahqu942hy7jywv.jpeg?q=90',
    affiliateUrl: FK('nutriburst-korean-marine-collagen-hyaluronic-acid-pineapple-flovour/p/itme22f04e1a8884', 'VSLHQSFPARJYYNKK'),
    description: [
      "Marine collagen is collagen peptide taken from fish skin and scales. It is broken down into small peptides so it dissolves in water, and it is one of the more popular skin-care supplements. Many people take it alongside hyaluronic acid, a compound that holds moisture in the skin.",
      "This Nutriburst tub is a 100 g powder that combines marine collagen with hyaluronic acid, in a pineapple flavour. You stir it into water or juice rather than swallowing capsules. Nutriburst is an Indian supplement brand that sells directly on Flipkart. The listing shows an expiry date of January 2028, so there is plenty of shelf life.",
      "At ₹417 it is 58% below its listed MRP of ₹999. Because it is made from fish, it is not vegetarian, and it is not suitable for anyone with a fish or seafood allergy. Follow the serving size on the pack, keep the lid tightly closed so the powder does not clump, and check with a doctor first if you are pregnant or take medication.",
    ],
    variant: 'Confirm the Pineapple 100g pack is selected, then check the price still reads ₹417 — bank offers can lower it further.',
  },
];

// ------------------------------------------------------------------- derive + gate
const HOSTS = { Amazon: /^https:\/\/m\.media-amazon\.com\//, Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\// };
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, In stock.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0925e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
