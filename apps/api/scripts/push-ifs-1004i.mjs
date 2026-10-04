// DEAL-INGEST indiafreestuff tick 2026-10-04i
//
// 4 listings (/deals p1-3 + /deals/superdeals), 96 cards, 39 new slugs vs seen (982). 6 skipped pre-resolve: Fastrack
// "upto 60%" category post, 3 [Apply N% Coupon] posts (SilverArrow, KWW bulbs, Daiko gummies), TIMEX bank-card-only price,
// Bio Essence cream (cosmetic). 33 resolved via base64 ?rto= Buy Now: 32 Amazon + 1 Flipkart, 0 already in DB.
// Logged-in Amazon tab verify: 9 pass (whole-rupee priceToPay == IFS card, In stock, add-to-cart, no low-stock line).
// Rejected: paise price (Fastrack Stunners 1738.35 vs card 1337, Vector X 396.40, Clay Craft 2770.78, birthday decor 129.28,
// CareFoam 376.80, Crackles pens 183.33, Dr. Pets 372.87), drift (ZEORGIA hub 4999 vs 1564, Crackles table cover 400 vs 126),
// low stock (Tokyo Talkies, 3 POPWINGS colours, YOHO, Pepe Jeans), ratings (TYB 2.7, ROWLANS x2 1-2 ratings, POPWINGS 4,
// SATYAM 4, Triumph bat 8 + no image), no price/unavailable (ABROS, Symbol thermal). Flipkart Bata lace-up: ld+json
// price 449 matched but availability OutOfStock. Copy is original, facts from the PDP bullets/overview only.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = { Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21` };
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const HOWTO = (what, variant, store) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const A = (productId, name, price, mrp, img, description, variant) =>
  ({ store: 'Amazon', productId, name, price, mrp, exp: price, av: 'In stock', image: `https://m.media-amazon.com/images/I/${img}.jpg`, description, variant });
const SIZE = (thing) => `Pick your ${thing} on the product page. We checked the price on the default option; it can differ between sizes and colours, so confirm it after you select yours.`;
const DEALS = [
  A('B0H1WWB797', 'Ekhasa Small Polyester Potli Bags for Return Gifts, Pack of 30', 138, 499, '81NPGnlp+rL._SL1500_', [
    'A pack of 30 Ekhasa potli bags is ₹138 on Amazon. That is about ₹5 per pouch, which makes it a cheap way to wrap return gifts in bulk.',
    'The pouches are lightweight polyester in assorted bright colours with traditional golden foil patterns, and each one closes with a drawstring. They are sized for small things: dry fruits, sweets, coins, chocolates, jewellery or pooja items. Typical uses are weddings, baby showers, pooja functions, festivals and birthday return gifts. Buyers rate the pack 4.3 stars across 15 reviews.',
    'The drawstring keeps small items in, but the fabric is not waterproof. Wrap loose sweets in butter paper before filling the pouch.',
  ], 'The pack has 30 pouches in mixed colours. Colours are assorted, so you cannot pick specific shades.'),
  A('B07J5QX9FX', 'Redgear MP44 Control-Type Gaming Mousepad, Black and Red', 199, 799, '715w7oOSzBL._SL1500_', [
    "Redgear's MP44 gaming mousepad is ₹199 on Amazon, about a quarter of its M.R.P. With more than 1,900 ratings at 4.5 stars, it is one of the best-reviewed budget mousepads in India.",
    'It measures 440 × 350 mm and is 4 mm thick, large enough for wide low-sensitivity swipes in shooters. The surface is a control-type weave, which adds a little friction so the cursor stops where you aim instead of gliding past. The base is non-slip rubber, and the top coating is tuned to reflect light back to optical and laser sensors. It works with any mouse.',
    'Control surfaces suit precise aiming. If you play fast-flick games and want more glide, a speed-type pad is the other option.',
  ], 'There is one size and one colour (black with red). Nothing to choose.'),
  A('B09KVCN2G2', "KOTTY Women's Fleece Hooded Neck Sweatshirt", 200, 1999, '7159zqiyYgL._SL1440_', [
    "KOTTY's fleece hooded sweatshirt for women is ₹200 on Amazon, a deep cut from its M.R.P. ahead of winter.",
    'It is a regular-fit, long-sleeve fleece sweatshirt with a hood and a standard length that sits at the hip. Fleece is soft on the inside and warm enough for cool evenings and travel. It is made in India by Kotty Lifestyle. Buyers rate it 3.9 stars across 12 reviews.',
    'Fleece can pill with heavy friction. Wash it inside out on a gentle cycle and skip the dryer to keep the surface smooth.',
  ], SIZE('size and colour')),
  A('B0HFFRQMX8', 'AERYS Digital Study and Kitchen Timer with Large LCD and Magnetic Back', 175, 999, '61ooIoXMCcL._SL1254_', [
    'The AERYS digital timer is ₹175 on Amazon, well under its M.R.P., for a small timer that works as both a stopwatch and a countdown.',
    'It has a large 24-hour LCD display, a loud alarm and a flashing light, so you notice it from across a room. The back is magnetic for a fridge door, and a fold-out stand lets it sit on a desk. Common uses are timed study sessions, cooking, workouts and exam practice. It weighs about 150 g. Buyers rate it 4.4 stars across 10 reviews.',
    'Batteries are not included. Buy them with the timer so it works the day it arrives.',
  ], 'The timer comes in black. Order the batteries separately.'),
  A('B0FK2SPZMZ', 'Puma Men Softride Slide', 1049, 3499, '41B9xEp7ixL._SL1200_', [
    "Puma's Softride slides for men are ₹1,049 on Amazon, well below the M.R.P. for branded slides.",
    'They are flat slip-on slides with a synthetic upper and the Softride cushioned footbed, made for casual wear, the gym bag or around the house. The pair weighs about 700 g, and they are made in India. With 213 ratings at 3.9 stars, they are a well-reviewed option at this price.',
    'Slides have no heel strap, so a loose fit slips off. If you are between sizes, choose the smaller one.',
  ], SIZE('UK size and colour')),
  A('B0C6VDB4C8', "KOTTY Women's Lightweight Loose Fit Casual Wear Pants", 200, 1999, '517ymo9u+wL._SL1440_', [
    "KOTTY's lightweight loose-fit pants for women are ₹200 on Amazon. With 3.5 stars across more than 1,700 ratings, they are a heavily reviewed budget pair.",
    'They are a cotton blend with a relaxed fit, a button closure and a standard length, cut for everyday casual wear, college or travel. They are machine washable and made in India.',
    'Loose-fit pants hide a size difference better than slim cuts. Go by your waist measurement, not your hip.',
  ], SIZE('waist size and colour')),
  A('B0BV32TC9Y', 'LUX VENUS Men\'s White 100% Cotton Vest, Pack of 5', 354, 705, '71P-P7tIHCL._SL1500_', [
    'A pack of five LUX VENUS white cotton vests for men is ₹354 on Amazon. That is about ₹71 per vest, roughly half the M.R.P.',
    'They are sleeveless, round-neck vests in 100% cotton with a regular fit, made by Lux Industries in Kolkata. Cotton breathes in Indian heat and absorbs sweat under a shirt. With more than 9,800 ratings at 4.0 stars, this is one of the most-reviewed innerwear packs on Amazon India.',
    'Cotton vests shrink slightly after the first hot wash. Wash in cold or warm water to keep the fit.',
  ], SIZE('size')),
  A('B0C6VZN9GD', "KOTTY Women's High Waist Pleated Wide Leg Trousers", 220, 1999, '51eQ6FmCUvL._SL1440_', [
    "KOTTY's high-waist pleated wide-leg trousers for women are ₹220 on Amazon. Buyers rate them 3.7 stars across more than 2,800 ratings.",
    'The front pleats and wide leg give a formal drape that works for office wear as well as casual outings. The fabric is a polyester blend, which resists creasing better than cotton. They have a high waist, a button closure and a standard length. They are machine washable and made in India.',
    'Wide-leg trousers look best with the hem just above the floor in your usual footwear. Check the length before cutting the tags.',
  ], SIZE('waist size and colour')),
  A('B0CNPQGZLK', 'Cellux 2X Ultra Cover Fluorescent Yellow Gloss Spray Paint, 400 ml', 110, 330, '61V2E+hGQ7L._SL1200_', [
    'A 400 ml can of Cellux 2X Ultra Cover spray paint in fluorescent yellow is ₹110 on Amazon, a third of its M.R.P. It has more than 3,300 ratings at 3.9 stars.',
    'It is an all-in-one aerosol that works as primer, undercoat and topcoat, so small DIY jobs need one product. It dries quickly to a gloss finish and works on metal, wood, glass, canvas and walls. Cellux says it can go directly onto rust, which suits gates, grills and old furniture.',
    'Spray outdoors or in a well-ventilated room, in two or three light coats rather than one heavy one. Heavy coats drip on vertical surfaces.',
  ], 'The can is 400 ml in fluorescent yellow. Other colours on the same page may be priced differently.'),
];
const IMG = /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg$/;
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

const file = process.argv[2] ?? 'ifs-1004i-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
