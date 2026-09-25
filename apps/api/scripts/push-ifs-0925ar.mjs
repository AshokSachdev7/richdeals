// DEAL-INGEST indiafreestuff tick 2026-09-25ar
//
// /deals p1-3 + homepage -> 78 slugs -> 16 new -> 1 sale hub + 1 supplement dropped -> 14 resolved -> 0 DB dups.
// Amazon verified in the logged-in tab: #corePriceDisplay (style/script stripped) + #centerCol M.R.P. + buy box + hiRes image.
// Rejected on PDP: door draft stopper B0G1YTF3RG (PDP ₹149 vs IFS ₹86).
// Stylus B0FJ1WFYDJ reads ₹142 (IFS ₹145) — published at the PDP price. Dot & Key reads ₹439 with a 5% clip coupon (~₹417 after).
// Myntra 38066232: page-state discountedPrice 72 / mrp 99, size "Pack" available:true.
// Flipkart DIGISMART: IFS pid was an itm id; rendered PDP gives pid ICTGTS8GHFHXHS5Y, ₹2,198 / ₹8,990, Buy now present.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const INR = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const FK = (path, pid) => `https://www.flipkart.com${path}?pid=${pid}&affid=djhackraj`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const CLIP = 'If a clip coupon shows under the price on the product page, tick it before checkout — it comes off at payment, on top of the price listed here.';
const FK_OFFER = 'Flipkart may show a lower "Buy at" figure after bank or UPI offers at checkout — the price listed here is before any of those offers.';

const HOWTO = (store, what, variant, last) => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  last,
];

const A = (productId, name, price, mrp, img, description, variant, extra = {}) =>
  ({ store: 'Amazon', productId, name, price, mrp, image: IMG(img), description, variant, ...extra });

const DEALS = [
  A('B09NY84WLC', 'ALIFIYA 3-Layer Travel Gadget Organizer Pouch for Cables, Chargers & Hard Disk, Pack of 2, Black', 247, 499, '71uCjh5M+rL._SL1500_.jpg', [
    "Chargers, cables, earphones and a power bank loose in a backpack end up tangled, scratched or left behind. A gadget organizer pouch gives each of them a fixed slot, so you can see at a glance whether everything is packed before you leave a hotel room or office.",
    "This ALIFIYA pouch has three layers with mesh pockets and elastic loops for cables, chargers, a mouse and a portable hard disk, and the listing is a pack of 2 in black. At ₹247 for two, each pouch costs about ₹124 — one can live in the laptop bag and the other in the travel suitcase.",
    "Coil cables loosely instead of wrapping them tight around the charger, which strains the joint where the wire meets the plug. Keep the hard disk in the padded layer away from metal chargers. A pouch this size will not fit a full laptop brick plus a hard disk and a mouse all at once, so pack the heaviest item first.",
  ], 'Confirm the Black, Pack of 2 option is selected — other colours and pack sizes on the same page are priced differently.'),
  A('B0GHNTD4NC', 'Amazon Brand Solimo Plastic Container Set with Airtight Lids, BPA Free, Set of 21', 849, 1599, '71-LdluW1vL._SL1500_.jpg', [
    "Airtight containers are the cheapest way to keep dal, rice, snacks and spices fresh through the monsoon, when humidity turns biscuits soft and brings ants into open packets. A matched set also stacks neatly, which matters more than it sounds in a small Indian kitchen.",
    "This is Solimo, Amazon's own brand, with 21 containers with airtight lids in the set. The listing says the plastic is BPA free and the containers are microwave and dishwasher safe. At ₹849, that works out to about ₹40 a container, which is less than a single branded steel dabba of similar size.",
    "Microwave-safe means the container can warm food — take the lid off first so steam can escape, and avoid heating oily curries in plastic for long. Wash new containers once before use. Label the lids with contents and date so the older stock gets used first.",
  ], 'Confirm the set of 21 is selected — other set sizes on the same page are priced differently.'),
  A('B0CX1W81RM', 'Dot & Key Strawberry Dew Tinted Sunscreen SPF 50 PA+++ with Niacinamide, 50 ml, 01 Porcelain', 439, 549, '61J4gIiXEaL._SL1500_.jpg', [
    "A tinted sunscreen does two jobs in one step: SPF protection and a light wash of colour that evens out skin tone, so many people skip foundation on regular days. For Indian summers, where a thick base melts by noon, that one lightweight layer is easier to wear.",
    "This Dot & Key Strawberry Dew tinted sunscreen is SPF 50 with a PA rating, in a 50 ml tube, and the listing says it contains niacinamide and newer UV filters with an ultra-light, non-sticky natural finish. This is the 01 Porcelain shade, the lightest in the range. The product page shows a 5% clip coupon, which brings the ₹439 price down to about ₹417 at checkout.",
    "Use about two finger-lengths for the face and neck, and reapply every two to three hours outdoors or after sweating. Tint shades look different on screens — if you are unsure between shades, the lighter one usually blends better. Patch-test behind the ear first if you have sensitive skin.",
  ], 'Confirm the 01 Porcelain shade in 50 ml is selected — other shades on the same page are priced differently.', { coupon: true }),
  A('B0GSJTCXH1', 'Gizga Essentials Aluminium Laptop Stand with 7 Adjustable Angles, Foldable, Silver', 299, 1499, '71eezgc-RPL._SL1500_.jpg', [
    "Working on a laptop flat on the desk pulls your head down and forward for hours. A stand lifts the screen closer to eye level, which is easier on the neck, and the gap underneath lets the laptop breathe instead of cooking on a table surface.",
    "This Gizga Essentials stand is aluminium with 7 adjustable angles, a cooling vent, non-slip pads and a foldable design, and the listing says it works with laptops, tablets and iPads. At ₹299 against a ₹1,499 M.R.P., it costs about as much as a basic plastic stand while being metal.",
    "Raising a laptop means the built-in keyboard also goes up, which is awkward for long typing sessions — pair it with a cheap external keyboard and mouse if you work on it all day. Put the heaviest part of the laptop, the hinge side, towards the back of the stand, and test that it does not wobble at the steepest angle.",
  ], 'Confirm the Silver stand is selected — other colours on the same page are priced differently.'),
  A('B0GSGHZBBC', 'Gizga Essentials 2.5-inch SATA SSD/HDD Enclosure, USB 3.0, Tool-Free, Up to 6TB', 289, 599, '7171U3S3SSL._SL1500_.jpg', [
    "An old laptop hard disk or SSD sitting in a drawer is a free external drive waiting to happen. A 2.5-inch enclosure turns it into a USB drive for backups, photo archives or moving files between machines, for much less than buying a new portable disk.",
    "This Gizga Essentials enclosure takes 2.5-inch SATA SSDs and hard disks, connects over USB 3.0 with speeds up to 5 Gbps, and is tool-free, so the drive slides in without a screwdriver. The listing says it supports drives up to 6 TB and works with laptops, PCs and Macs.",
    "It fits only 2.5-inch SATA drives — not 3.5-inch desktop disks and not M.2 NVMe sticks, which need a different enclosure. Plug it into a blue USB 3.0 port for full speed. If the drive does not show up, it may need to be initialised and formatted in Disk Management first; back up anything on it before you do that.",
  ], 'Confirm the 2.5-inch SATA enclosure is selected — other models on the same page are priced differently.'),
  A('B0GN9KL88Z', 'Gizga Essentials 25L Laptop Backpack for up to 15.6-inch Laptops with Number Lock & USB Port', 669, 2899, '61l186RJfQL._SL1500_.jpg', [
    "A college or office backpack has one job above all: carry a laptop safely every day for a couple of years. After that, it is about how many compartments you need and whether the straps stay comfortable on a crowded metro or bus.",
    "This Gizga Essentials backpack has a 25 litre capacity and fits laptops up to 15.6 inches. The listing lists a number lock, a USB charging port, a water-resistant body, multiple compartments, padded straps and a bottle holder. At ₹669 against a ₹2,899 M.R.P., it sits in the budget range for a bag with a lock.",
    "The USB port is only a pass-through — you still need your own power bank inside the bag, connected to the internal cable. Set the number lock code before the first trip and write it down somewhere safe. Water-resistant is not waterproof: in heavy monsoon rain, keep the laptop in a sleeve or plastic cover inside.",
  ], 'Confirm this 25L laptop backpack is selected — other models on the same page are priced differently.'),
  A('B0GSG2SL88', 'Gizga Essentials Extended Mouse Pad Desk Mat, 250 x 210 x 2 mm, Black', 99, 299, '71d5pLE0FuL._SL1500_.jpg', [
    "Optical mice track badly on glass, glossy laminate and some wood finishes, and a bare desk wears out the mouse feet over time. A simple cloth mouse pad fixes both, and it keeps the mouse from sliding when you only need small, precise movements.",
    "This Gizga Essentials mat measures 250 x 210 x 2 mm, with a smooth cloth surface, a non-slip rubber base, stitched edges and a water-resistant finish, in black. Despite the 'extended' name, at 25 cm wide it is a regular mouse pad size, not a full desk mat — it fits the mouse, not the keyboard.",
    "Stitched edges stop the cloth from peeling up at the corners, which is where cheap pads usually fail first. Wipe spills straight away rather than soaking the pad. If it arrives rolled, lay it flat under a book overnight so the edges settle before use.",
  ], 'Confirm the black 250 x 210 mm size is selected — larger sizes on the same page are priced differently.'),
  A('B0FJ1WFYDJ', 'Gizga Essentials 2-in-1 Universal Stylus Pen with Disc Tip & Rubber Tip, White', 142, 199, '61oJXB+PcyL._SL1500_.jpg', [
    "A basic stylus makes touchscreens easier to use for signing documents, sketching, playing games or tapping small buttons with a gloved or oily hand. It also keeps fingerprints off the screen, which helps anyone who shares a tablet with kids.",
    "This Gizga Essentials stylus is 2-in-1, with a fine-point clear disc tip on one end and a soft rubber tip on the other, in white. The listing says it works with any capacitive touchscreen, including iPad, iPhone, Android phones and tablets. The Amazon page reads ₹142, a little below the ₹145 quoted elsewhere.",
    "This is a passive stylus — no Bluetooth, no pressure sensitivity and no palm rejection, so it will not replace an Apple Pencil for serious drawing. The disc tip is precise for small targets; the rubber tip is better for swiping. The listing is marked minimum buy 2, so check the cart quantity before paying.",
  ], 'Confirm the White stylus is selected — the listing is marked minimum buy 2, so the cart may need a quantity of two.'),
  A('B0HCJJYLVC', 'Rechargeable Karaoke Mic with Built-in Bluetooth Speaker and LED Lights', 449, 999, '61aVDEARTPL._SL1254_.jpg', [
    "A karaoke mic with a built-in speaker is a party in one handheld gadget: pair it with a phone, play the track from YouTube or a karaoke app, and sing over it without any separate speaker or wiring. It is a common birthday gift for kids and a hit at family get-togethers.",
    "This rechargeable karaoke mic has a wireless mini Bluetooth speaker and LED lights built in, and the listing pitches it as a gift for boys and girls. At ₹449 against a ₹999 M.R.P., it is priced as a toy-level gadget rather than a stage microphone.",
    "Expect fun, not studio sound: the small speaker will not fill a large hall, and the echo effect is what makes voices sound good. Charge it fully before the party. Keep the volume moderate for young children, since the speaker sits right next to the face while singing.",
  ], 'Confirm this karaoke mic listing is selected — other colours or models on the same page are priced differently.'),
  A('B0BRKCCBXQ', "Reebok Men's Sprinter M Sneaker, UK 8", 1154, 3299, '51kYYgdGVYL._SL1500_.jpg', [
    "A branded everyday sneaker for well under ₹1,500 is rare. Reebok's Sprinter M is a lightweight running-style shoe built for walks, gym days and daily wear rather than serious marathon training.",
    "This listing is the Reebok Men's Sprinter M sneaker in UK size 8. At ₹1,154 against a ₹3,299 M.R.P., it is 65% off. The product page was showing only 1 left in stock at this price when checked, so the deal may end the moment that pair sells.",
    "Price and stock differ by size — other sizes on the same page may cost more or be sold out. Reebok sizing is usually true to UK size; if you are between sizes, go up half a size for running shoes. Air them out after use and avoid the washing machine, which weakens the sole glue.",
  ], 'Pick UK 8 on the product page — this price is for that size; other sizes on the same page are priced differently.', { stock: 'only 1 left in stock at this price when checked' }),
  A('B0H4WBBM7Z', 'Xtore Geometric Ceramic Planter Set of 3 with Drainage Saucers', 399, 1999, '61fDTE2kC-L._SL1024_.jpg', [
    "Ceramic planters make indoor plants look like decor instead of nursery stock in black plastic bags. A matched set of three also looks deliberate on a shelf, desk or balcony ledge, where odd pots look cluttered.",
    "This Xtore set has 3 ceramic planters in a geometric design, each with a drainage saucer, in a multicolour print. At ₹399 for three, each planter costs about ₹133. The listing is for planters only — no plants or soil are included.",
    "Drainage matters more than the pot: water that pools at the roots rots them within weeks. Empty the saucer an hour after watering. Small ceramic planters suit money plants, succulents, snake plants and small herbs; for anything that grows big, repot into a larger container after a season.",
  ], 'Confirm the Multicolor set of 3 is selected — other prints on the same page are priced differently.'),

  { store: 'Myntra', productId: '38066232', name: 'Whisper Super Absorbent Period Panty, 2 L-XL Pants', price: 72, mrp: 99,
    image: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2026/MARCH/18/rHeaZTN6_1e7448f9bb184d12baecdb10d1261371.jpg',
    affiliateUrl: INR('https://www.myntra.com/38066232'), description: [
    "Period panties are disposable pant-style pads: you wear them like underwear, so there are no wings to fold and no pad that shifts overnight. Many women keep a pack for heavy-flow nights, long travel days and the first days after childbirth.",
    "This Whisper pack has 2 super absorbent period panties in the L-XL size. At ₹72 for two, each one costs about ₹36, which is a low-risk way to try period panties before buying a larger pack. Myntra lists the pack as available at this price.",
    "Check the size chart on the product page against your hip size — a panty that is too loose can leak at the leg openings. Wrap a used panty in its packing or old newspaper before throwing it in the dustbin. Do not flush it. Change it every few hours on heavy days, even if it still feels dry.",
  ], variant: 'Confirm the L-XL pack of 2 is selected — other sizes on Myntra are priced differently.' },

  { store: 'Flipkart', productId: 'ICTGTS8GHFHXHS5Y', name: 'DIGISMART 2200 W Infrared Cooktop, Touch Panel, Black Emerald', price: 2198, mrp: 8990,
    image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/induction-cook-top/u/5/e/emerald-emerald-2200-watts-auto-off-infrared-digismart-original-imahkpykquxyfwsa.jpeg',
    affiliateUrl: FK('/digismart-2200-w-infrared-cooktop-touch-panel/p/itme8c0e5f4a4d8e', 'ICTGTS8GHFHXHS5Y'), offer: true, description: [
    "An infrared cooktop heats with a radiant element under the glass, so unlike induction it works with any flat-bottomed vessel — steel, aluminium, glass or clay — not only magnetic pans. That makes it an easy backup when the LPG cylinder runs out, without buying new cookware.",
    "This DIGISMART cooktop is rated at 2200 W with a touch panel and auto-off, in black with an emerald finish. At ₹2,198 against an ₹8,990 M.R.P., Flipkart shows it at 76% off during its Big Billion Days sale, and some bank cards take a further ₹110 off at checkout.",
    "The glass stays hot for a while after switching off, so let it cool before wiping it. Use flat-bottomed pots for even heating. Plug it into a 16A socket with proper earthing — 2200 W is too much load for a thin extension board. Infrared is a little slower and less efficient than induction, so expect a slightly higher electricity bill for the same cooking.",
  ], variant: 'Confirm the 2200 W touch-panel model is selected — other models on Flipkart are priced differently.' },
];
// ------------------------------------------------------------------- derive + gate
const HOSTS = {
  Amazon: /^https:\/\/m\.media-amazon\.com\//,
  Flipkart: /^https:\/\/rukmini\w*\.flixcart\.com\//,
  Myntra: /^https:\/\/assets\.myntassets\.com\//,
};
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.store, d.name.split(',')[0], d.variant, d.coupon ? CLIP : d.offer ? FK_OFFER : NO_COUPON), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (!HOSTS[d.store].test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) console.log(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`flipkart url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-0925ar-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
