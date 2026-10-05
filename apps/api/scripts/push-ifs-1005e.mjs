// DEAL-INGEST indiafreestuff tick 2026-10-05e
//
// 96 cards -> 41 after filters -> PDP-verified. Pushed 15: 12 Amazon + 3 Flipkart (Alibaba mixer dropped, its
// /p/itm path could not be resolved). Rejections (price drift, no buybox, thin ratings, OOS) are in
// reports/ifs-2026-10-05e.md.
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AFF = {
  Amazon: (d) => `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  Flipkart: (d) => `${d.url}&affid=djhackraj`,
};
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';
const SIZE = 'Pick your size on the product page; the price can differ between sizes, so check it after selecting.';
const ONE = 'This listing has a single configuration, so there is nothing to choose before adding to cart.';
const COLOUR = 'Check the colour selected on the product page; other colours can carry a different price.';
const FK = 'https://www.flipkart.com/';
const DEALS = [
  { store: 'Amazon', productId: 'B0DNQXD7FM', name: 'Nasher Miles Manhattan 40L Laptop Backpack', price: 5499, mrp: 14995,
    image: 'https://m.media-amazon.com/images/I/715w7rNcydL._SL1500_.jpg', variant: COLOUR,
    description: [
      "Nasher Miles' Manhattan 40-litre laptop backpack is ₹5,499 on Amazon, rated 4.5 stars by 14 buyers.",
      'At 40 litres it sits between a daily office bag and a cabin-size travel pack, with room for a laptop, a change of clothes and chargers for a two-day work trip.',
      'Before buying, measure your laptop diagonally and match it against the sleeve size in the listing photos. A bag this size gets heavy when full, so use both straps and the chest strap if your back starts to complain.',
    ] },
  { store: 'Amazon', productId: 'B0BDGXX7MP', name: 'PINACOLADA Women Printed Crop Sweatshirt', price: 340, mrp: 1699,
    image: 'https://m.media-amazon.com/images/I/61N86AbBtUL._SL1500_.jpg', variant: SIZE,
    description: [
      "PINACOLADA's printed crop sweatshirt for women is ₹340 on Amazon, rated 3.7 stars by 15 buyers.",
      'A cropped sweatshirt pairs with high-waist jeans or joggers and works as a light layer for winter mornings, college or travel, without the bulk of a full-length hoodie.',
      'Crop fits vary a lot between brands, so compare the length in the size chart with a top you already own. Wash inside-out in cold water to keep the print from cracking.',
    ] },
  { store: 'Amazon', productId: 'B0H65QR6WX', name: 'Zebronics Sound Feast 45 Wireless Speaker', price: 1535, mrp: 3999,
    image: 'https://m.media-amazon.com/images/I/81qlkJlB9VL._SL1500_.jpg', variant: ONE,
    description: [
      "Zebronics' Sound Feast 45 wireless speaker is ₹1,535 on Amazon, rated 4.0 stars across 22 reviews.",
      'It is a portable Bluetooth speaker meant for a bedroom, a small hall or an outdoor get-together, where a phone speaker is too thin and a soundbar is overkill.',
      'Battery life on portable speakers drops sharply at full volume, so plan for a charge before a long party. Check the listing for the inputs you need, such as AUX, USB or a microphone port.',
    ] },
  { store: 'Amazon', productId: 'B0BLNS4PMS', name: 'Puma Men Unleash Sneaker', price: 1289, mrp: 4299,
    image: 'https://m.media-amazon.com/images/I/611S840qg8L._SL1200_.jpg', variant: SIZE,
    description: [
      "Puma's Unleash sneaker for men is ₹1,289 on Amazon, rated 3.7 stars by 81 buyers.",
      'It is a low-top casual sneaker for daily wear with jeans or chinos, and a branded pair at this price is a sensible replacement for worn-out everyday shoes.',
      'Read the recent reviews for fit comments before ordering, and keep the box until you have tried them on indoors in case you need an exchange.',
    ] },
  { store: 'Amazon', productId: 'B0GN34LC1H', name: 'Zebronics Blanc 100 Rechargeable Dual-Mode Wireless Mouse', price: 449, mrp: 1099,
    image: 'https://m.media-amazon.com/images/I/614vxBSyfrL._SL1500_.jpg', variant: COLOUR,
    description: [
      "Zebronics' Blanc 100 rechargeable wireless mouse is ₹449 on Amazon, rated 4.2 stars by 97 buyers.",
      'Dual mode means it connects through Bluetooth or a USB receiver, so one mouse can switch between a laptop and a tablet. A built-in battery removes the cost of buying AA cells.',
      'Charge it fully before first use and keep the receiver in its slot when travelling so it does not get lost. Bluetooth mode needs your device to support it; the receiver works on almost anything with a USB port.',
    ] },
  { store: 'Amazon', productId: 'B0CTR19K73', name: 'Monte Carlo Men Genuine Leather Slip-On Loafers', price: 1879, mrp: 4999,
    image: 'https://m.media-amazon.com/images/I/51WvXxyBqfL._SL1400_.jpg', variant: SIZE,
    description: [
      "Monte Carlo's genuine leather slip-on loafers for men are ₹1,879 on Amazon, rated 3.6 stars by 46 buyers.",
      'Leather loafers cover office days, weddings and dinners with one pair, and slip-ons are quicker to wear than lace-ups.',
      'Leather stretches slightly with wear, so a snug first fit is normal; a pair that feels loose on day one will feel looser later. Use a shoe cream every few weeks to stop the leather drying and cracking.',
    ] },
  { store: 'Amazon', productId: 'B0FH26NHWR', name: "Reebok Women's Quick-Dry Gym T-Shirt", price: 533, mrp: 1299,
    image: 'https://m.media-amazon.com/images/I/61KxAl4o3oL._SL1500_.jpg', variant: SIZE,
    description: [
      "Reebok's quick-dry gym T-shirt for women is ₹533 on Amazon, rated 3.9 stars by 20 buyers.",
      'Quick-dry polyester pulls sweat away from the skin, which makes it better than cotton for workouts, running or yoga in humid weather.',
      'Wash synthetic activewear in cold water and skip fabric softener, which clogs the fabric and slows drying. Air-dry instead of using a hot dryer.',
    ] },
  { store: 'Amazon', productId: 'B0DJFPDGLY', name: 'Digitek DTR-555 SS Tripod Selfie Stick', price: 1099, mrp: 1995,
    image: 'https://m.media-amazon.com/images/I/612t02Xig1L._SL1500_.jpg', variant: ONE,
    description: [
      "Digitek's DTR-555 SS tripod selfie stick is ₹1,099 on Amazon, rated 3.8 stars across 2,563 reviews.",
      'It works as a selfie stick for travel and opens into a tripod for group photos, video calls and recording reels without someone holding the phone.',
      'Check that the phone clamp fits your phone with its case on. Spread the tripod legs fully on uneven ground and do not extend it to full height in strong wind.',
    ] },
  { store: 'Amazon', productId: 'B0BNLMJ4RD', name: 'The Indian Garage Co Men Puffer Jacket', price: 779, mrp: 4099,
    image: 'https://m.media-amazon.com/images/I/71M-F0JCaFL._SL1500_.jpg', variant: SIZE,
    description: [
      "The Indian Garage Co's puffer jacket for men is ₹779 on Amazon, rated 3.8 stars by 54 buyers.",
      'A puffer is the warm, light option for north Indian winters, hill trips and early-morning bike rides, and it packs down smaller than a woollen coat.',
      'Order with room for a sweater underneath if you plan to layer. Wash on a gentle cycle and dry flat so the padding does not clump.',
    ] },
  { store: 'Amazon', productId: 'B0GKF84HBP', name: 'Mivi DuoPods Wave Wireless Earbuds', price: 999, mrp: 5499,
    image: 'https://m.media-amazon.com/images/I/71xTDAhKD+L._SL1500_.jpg', variant: COLOUR,
    description: [
      "Mivi's DuoPods Wave wireless earbuds are ₹999 on Amazon, rated 4.3 stars by 12 buyers.",
      'Mivi is a Hyderabad-based audio brand, and its DuoPods line is aimed at buyers who want true-wireless earbuds for calls, commuting and music without paying for a premium brand name.',
      'The rating comes from a small number of reviews, so read the most recent ones for comments on fit and call quality. Try the different ear-tip sizes in the box to get a better seal and more bass.',
    ] },
  { store: 'Amazon', productId: 'B07TVJMNGP', name: 'Satyam Kraft Panda Marquee LED Night Lamp', price: 99, mrp: 1200,
    image: 'https://m.media-amazon.com/images/I/71y7diedsNL._SL1500_.jpg', variant: ONE,
    description: [
      "Satyam Kraft's panda-shaped marquee LED night lamp is ₹99 on Amazon, rated 4.1 stars by 72 buyers.",
      'It gives a soft, low glow for a kids room, a bedside table or a study shelf, and works as a small decor piece or a return gift.',
      'Check the listing for the power source; many marquee lamps run on AA batteries that are not included in the box, so keep a set ready.',
    ] },
  { store: 'Amazon', productId: 'B0D3616NRV', name: 'WORKPRO WP200504 6-Piece Screwdriver Set', price: 334, mrp: 700,
    image: 'https://m.media-amazon.com/images/I/51IuJdxF01L._SL1000_.jpg', variant: ONE,
    description: [
      "WORKPRO's WP200504 six-piece screwdriver set is ₹334 on Amazon, rated 4.6 stars by 11 buyers.",
      'A mix of flat and Phillips screwdrivers covers most home jobs, from tightening furniture hinges to opening battery covers on toys and remotes.',
      'Match the tip size to the screw head; a tip that is too small strips the screw. Switch the mains off before touching any switchboard or electrical fitting.',
    ] },
  { store: 'Flipkart', productId: 'MIXHMECM5RQF7TNE', name: 'Longway 750 W Juicer Mixer Grinder', price: 1398, mrp: 3939,
    url: `${FK}longway-powerful-motor-grinding-mixing-juicing-up-750-w-juicer-mixer-grinder/p/itm2565e72088e82?pid=MIXHMECM5RQF7TNE`,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/mixer-grinder-juicer/5/u/q/-resized-original-imahz4hybr66cmsb.jpeg', variant: COLOUR,
    description: [
      "Longway's 750 W juicer mixer grinder is ₹1,398 on Flipkart, rated 4.1 stars across a very large review base of more than two lakh ratings.",
      'A 750 W motor handles wet idli and dosa batter, dry masalas and chutneys, and the juicer attachment adds fresh juice without buying a separate appliance.',
      'Run the motor in short bursts for hard grinding and let it rest between batches to avoid overheating. Do not fill jars past the marked line with hot liquids.',
    ] },
  { store: 'Flipkart', productId: 'MIXHHSDBRSYFJVKU', name: 'Bluemix Super Smart 750 W Mixer Grinder', price: 1296, mrp: 3999,
    url: `${FK}bluemix-super-smart-750-w-mixer-grinder/p/itm3747a6030a596?pid=MIXHHSDBRSYFJVKU`,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/mixer-grinder-juicer/9/b/e/lily-750w-daily-collection-powerful-mixer-grinder-bluemix-resized-original-imahhsdaskzzrfse.jpeg', variant: COLOUR,
    description: [
      "Bluemix's Super Smart 750 W mixer grinder is ₹1,296 on Flipkart, rated 3.8 stars by 1,407 buyers.",
      'It is a budget 750 W mixer for daily Indian cooking, covering batter, chutney and dry spice grinding in the same set of jars.',
      'At this price, read recent reviews for comments on noise and jar lids. Keep the original box until the warranty period has passed in case it needs service.',
    ] },
  { store: 'Flipkart', productId: 'MIXFHMRSVZXXUZ6B', name: 'Philips Daily Collection HL7505 500 W Mixer Grinder, 3 Jars', price: 2499, mrp: 3195,
    url: `${FK}philips-daily-collection-500-w-mixer-grinder/p/itm79ffc542e1fd0?pid=MIXFHMRSVZXXUZ6B`,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/mixer-grinder-juicer/s/6/v/-resized-original-imagrvesttvef8rh.jpeg', variant: ONE,
    description: [
      "Philips' Daily Collection HL7505 mixer grinder with three jars is ₹2,499 on Flipkart, rated 4.3 stars by 7,728 buyers.",
      'A 500 W Philips mixer suits a small family: it handles chutneys, dry masalas and moderate batches of batter, and Philips has a wide service network across India.',
      'A 500 W motor is slower on large batches of urad dal batter than a 750 W one, so grind in smaller loads and let the motor rest between long runs.',
    ] },
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
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=/.test(d.url)) throw new Error(`bad flipkart url ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'ifs-1005e-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
