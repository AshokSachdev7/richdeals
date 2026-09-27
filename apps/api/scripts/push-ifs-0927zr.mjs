// DEAL-INGEST indiafreestuff tick 2026-09-27zr
//
// Sweep: homepage + /deals 1-3, 28 new slugs. Dropped 2 before resolve (min-buy-2 crayons, rakhi hamper). Resolved 26 via the
// base64 ?rto= Buy Now; 0 productIds already in the DB. Every Amazon price re-read on the PDP in the logged-in tab (.priceToPay,
// M.R.P., #availability, add-to-cart, rating); Flipkart via ld+json. 11 pass, 14 rejected (coupon-only, no buy box, price drift,
// low rating, thin listing). Copy is original. Writes a {deals:[...]} payload for POST /admin/deals/bulk.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (id) => `https://www.amazon.in/dp/${id}?tag=ashoksachdev-21`,
  Flipkart: (id) => `https://www.flipkart.com/product/p/itme?pid=${id}&affid=djhackraj`,
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
const F = (productId, name, price, mrp, image, description, variant) =>
  ({ store: 'Flipkart', productId, name, price, mrp, exp: price, av: 'InStock', image, description, variant });
const DEALS = [
  A('B097MQSKR3', "Amazon Brand Symbol Men's Cotton Rich Stretch Jogger Jeans, Relaxed Fit", 549, 2299, '71vBzmnxGGL._SL1500_', [
    "Symbol's stretch jogger jeans for men are ₹549 on Amazon, 76% below the M.R.P.",
    'They are cotton-rich denim with a little stretch, cut relaxed with a cuffed jogger hem, so they sit between jeans and track pants for travel days and weekends. Buyers rate them 3.8 stars across nearly 1,000 reviews.',
    'Jogger cuffs make the leg look shorter; if you are between waist sizes, size up rather than down.',
  ], 'Pick your waist size and wash; the price can differ by size.'),
  A('B0BHLNL89G', 'Brustro Semi-Auto Electric Pencil Sharpener, Battery and Manual Mode', 425, 597, '71xv0xdLn7L._SL1500_', [
    'The Brustro semi-automatic pencil sharpener is ₹425 on Amazon.',
    'It sharpens pencils from 6 to 8 mm thick with a small motor that spins the blade, runs on two AA cells and still works by hand when the batteries die. The blade is replaceable. Buyers rate it 4.2 stars across 660+ reviews.',
    'Good for art students who go through colour pencils fast; younger kids should use it with an adult around.',
  ], 'There is a single variant; check whether batteries are included before checkout.'),
  A('B0G3WP86H1', 'CP PLUS 2U Wall Mount CCTV DVR/NVR Rack with Lockable Door and 3-Socket PDU', 999, 1600, '51HYc-s5rmL._SL1500_', [
    'The CP PLUS 2U value-series wall-mount rack is ₹999 on Amazon.',
    'It is a CRCA steel box (450 mm wide, 350 mm deep) that holds a DVR or NVR, a PoE switch and the power supply behind a lockable front door, with a built-in 3-socket power strip. Buyers rate it 3.7 stars.',
    'A locked rack stops anyone from simply unplugging the recorder, which is the most common way CCTV footage goes missing in shops and offices.',
  ], 'Confirm the 2U wall-mount model is selected.'),
  A('B0FCYZPV2S', 'Eveready Ultima Alkaline AAA Battery, Pack of 4', 59, 170, '71WliAl8UEL._SL1500_', [
    'A 4-pack of Eveready Ultima alkaline AAA cells is ₹59 on Amazon, 65% below the M.R.P.',
    "Ultima is Eveready's top alkaline line, meant for power-hungry devices such as toys, torches and wireless mice, with an anti-leak seal and up to 10 years of shelf life. Buyers rate it 4.4 stars across 700+ reviews.",
    'The long shelf life makes this a sensible pack to keep in a drawer for remotes and clocks.',
  ], 'Confirm the AAA pack of 4 is selected, not the AA version.'),
  A('B0F38HVZF3', 'Fire Turtle Vintage 10W Bluetooth Speaker with Type-C Charging, White', 602, 1999, '61UeDQzKu5L._SL1024_', [
    'The Fire Turtle retro Bluetooth speaker is ₹602 on Amazon, 70% off the M.R.P.',
    'It pairs a vintage radio look with 10W output, Bluetooth 5.0, USB, AUX and a memory-card slot, recharges over Type-C and is rated for up to 8 hours of playback. Buyers rate it 4.0 stars across 250+ reviews.',
    'Playback time drops at high volume; expect the full 8 hours only at room level.',
  ], 'Confirm the white 636 model is selected.'),
  A('B0H42296JX', 'Meridian Set of 3 Hard Trolley Bags, Cabin + Medium + Large, 8 Spinner Wheels, Pink', 3999, 37997, '51EXw0UEarL._SL1080_', [
    'A matched set of three Meridian hard-shell suitcases (55, 65 and 75 cm) is ₹3,999 on Amazon.',
    'All three roll on eight 360-degree spinner wheels, lock with a recessed number lock and have a two-pocket zipped organiser inside, and they carry a 5-year warranty. Buyers rate the set 3.9 stars across 100+ reviews.',
    'Check that the 55 cm piece fits your airline cabin limit before relying on it as carry-on.',
  ], 'Confirm the Blossom Pink set of 3 is selected.'),
  A('B0FP9SSVGF', 'One94Store 14 LED Lotus Flower String Lights, 3 Meter, Multicolor, Plug-in', 199, 499, '516aIoXpytL._SL1500_', [
    'One94Store lotus flower string lights (3 m, 14 LEDs) are ₹199 on Amazon, 60% off.',
    'Each LED sits inside a double-layer silicone lotus, runs off a wall plug so there are no batteries to replace, and is rated waterproof. Buyers rate them 4.1 stars across nearly 700 reviews.',
    'Order early for Diwali: decorative lights are the category that sells out first in the festive rush.',
  ], 'There is one multicolour variant; it needs a wall socket nearby.'),
  A('B0GSR3Z2S7', 'PANCA Automatic Open-Close 3-Fold Travel Umbrella', 299, 999, '61352Nzv7BL._SL1500_', [
    'The PANCA automatic 3-fold umbrella is ₹299 on Amazon, 70% below the M.R.P.',
    'One button opens and closes it, and it folds small enough for an office bag or a bike seat compartment. Buyers rate it 3.5 stars across 250+ reviews.',
    'Auto-close umbrellas snap shut fast; keep fingers clear of the shaft when you press the button.',
  ], 'Pick the colour you want; the price can differ by colour.'),
  A('B0D7J4KSRK', 'TRIDENT 100% Cotton 500 GSM Face Towel Set of 4, Red Wine', 278, 499, '618yWeVvd7L._SL1500_', [
    'A set of four Trident 500 GSM cotton face towels is ₹278 on Amazon.',
    'Each towel is 30.5 x 30.5 cm, woven in 100% cotton and OEKO-TEX certified, so it works as a gym-bag or guest-room set. Buyers rate it 4.3 stars across 600+ reviews.',
    'Wash new towels once before first use without fabric softener; softener coats the loops and cuts absorbency.',
  ], 'Confirm the Red Wine set of 4 is selected.'),
  A('B0GWJRXLGH', 'Zebronics Cat 6 Ethernet Cable, 1.5 Meter, UTP RJ45, PC4PCAT6', 134, 499, '61hnoohmA4L._SL1500_', [
    'A 1.5 m Zebronics Cat 6 LAN cable is ₹134 on Amazon.',
    'The unshielded twisted-pair cable is rated for up to 10 Gbps and works with routers, PoE switches, IP phones, PCs and laptops. Buyers rate it 4.4 stars across 250+ reviews.',
    'A wired link to a smart TV or work laptop usually fixes buffering and video-call drops faster than a new router.',
  ], 'Confirm the 1.5 m length is selected.'),
  F('HDRF97Q8ZDV3BXMX', 'Kemei 1600W Hair Dryer with Health Mode and Overheating Protection', 634, 1699, 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/hair-dryer/6/k/t/1600w-health-mode-overheating-protection-kemei-original-imah2h2wbqtxnynu.jpeg?q=70', [
    'The Kemei 1600W hair dryer is ₹634 on Flipkart, 63% off the M.R.P.',
    'It is a full-size 1600W dryer with a gentler health mode and overheating protection that cuts power before the motor gets too hot. Buyers rate it 4.1 stars across 230+ ratings.',
    'Keep the nozzle a hand-width from your hair and finish on the cool setting to reduce frizz.',
  ], 'There is a single variant on the product page.'),
];

const IMG = /^https:\/\/(m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL\d+_\.jpg|rukmini1\.flixcart\.com\/image\/\S+)$/;
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
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: AFF[d.store](d.productId),
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

const file = process.argv[2] ?? 'ifs-0927zr-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
