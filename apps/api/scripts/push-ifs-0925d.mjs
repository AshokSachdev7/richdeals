// DEAL-INGEST indiafreestuff tick 2026-09-25d
//
// /deals listing -> 53 candidates -> Buy Now ?rto= resolved (36 Amazon, 16 Flipkart, 1 Myntra).
// Amazon verified in logged-in tab (#corePrice/#centerCol); Flipkart + Myntra in a Playwright tab (ld+json price/stock,
// and the product's own /p/itm path carrying the same pid). 12 pass; coupon-dependent / drifting / OOS rows rejected.
//
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
    store: 'Amazon', productId: 'B0DBDTG3TW', name: 'LA VERNE Sherpa Reversible Blanket, King Size, Blue',
    price: 329, mrp: 4999, image: IMG('61U5o0HNsAL._SL1500_.jpg'),
    description: [
      "A sherpa blanket has two faces: a smooth flannel side and a thick, fleecy side that looks like sheep's wool. The fleece side traps warm air and is what you want against you on cold nights. The flannel side is lighter and works on its own during the milder weeks of October and March.",
      "This LA VERNE blanket is king size and can be used either way up, so one blanket covers the whole winter. It is also light enough to leave folded at the foot of the bed through the rest of the year. At ₹329 it costs about as much as a basic single fleece throw, and it is king size.",
      "Wash it cold on a gentle cycle and air-dry it in the shade. Hot water and tumble drying mat sherpa pile and make it go flat. Shake it out after washing so the fleece fluffs back up. Blue hides everyday marks better than cream or grey, which suits a blanket that gets used on the sofa as well as the bed.",
    ],
    variant: 'Confirm King size and Blue are selected — other sizes and colours on the same page are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0H42BJQPH', name: 'Core Set of 2 Trolley Bags, Cabin + Medium, PP Hard Shell, 8 Spinner Wheels',
    price: 2199, mrp: 20998, image: IMG('51aIYYisnzL._SL1500_.jpg'),
    description: [
      "A cabin bag and a medium check-in bag between them cover almost every trip. The cabin bag alone is enough for a weekend. Together they cover a week-long family holiday or a wedding trip, with the medium bag checked in and the cabin bag carried on board.",
      "This Core set gives you both, in a polypropylene (PP) hard shell with eight spinner wheels. PP bends a little under a hard knock and then springs back, so it takes baggage-belt handling better than a cheap rigid ABS shell. Eight wheels let each bag stand upright and roll in any direction without being tipped.",
      "At ₹2,199 for both bags, the set costs less than many single branded cabin trolleys. Before flying, check your airline's cabin size and weight limits. IndiGo and Air India both allow a 7 kg cabin bag on domestic flights, and a soft shell that is overpacked can bulge past the size limit. Keep the wheels clear of dust and hair so they keep spinning freely.",
    ],
    variant: 'Make sure the set of 2 (cabin + medium) is selected, not a single bag, and confirm the colour you want.',
  },
  {
    store: 'Amazon', productId: 'B0GHYLQF4T', name: 'Soul & Scents Ocean Fragrance Oil, 15 ml',
    price: 199, mrp: 499, image: IMG('81DedYAlCiL._SL1500_.jpg'),
    description: [
      "Fragrance oil is concentrated scent in an oil base. It is made for electric diffusers, reed diffusers and ceramic burners, and for adding scent to homemade candles or soap. A few drops at a time is enough, so a small bottle lasts well beyond its size.",
      "This is Soul & Scents in the Ocean note, a clean, airy scent that suits bathrooms, wardrobes and small bedrooms better than heavy floral or oud blends. The bottle is 15 ml. In an ultrasonic diffuser, 3-5 drops in the water tank scents a room for a session, which makes this ₹199 bottle last for weeks of regular use.",
      "Fragrance oil is not the same as pure essential oil, so do not apply it to your skin or use it for aromatherapy. Keep it capped and away from sunlight so the scent does not fade. If you are adding it to candle wax, check the recommended load on the label. Too much stops the wick burning cleanly.",
    ],
    variant: 'Confirm the Ocean fragrance and the 15 ml bottle are selected — other scents on the page may be priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0H41XPLWK', name: 'Meridian Set of 2 Trolley Bags, Cabin + Medium',
    price: 2499, mrp: 22998, image: IMG('51mY2eKXCDL._SL1500_.jpg'),
    description: [
      "Buying luggage as a pair is usually the cheaper way to do it. One cabin and one medium trolley cover a short solo trip, a week-long holiday, or two people sharing a check-in allowance. Sets also match, which makes them easy to spot on the baggage belt.",
      "This Meridian set pairs a cabin trolley with a medium check-in trolley for ₹2,499 in total. That is about what a single mid-range branded cabin bag costs on sale, so the second bag is effectively the saving. The medium size suits 5-7 days of clothes for one person.",
      "Check your airline's cabin dimensions before relying on the smaller bag as hand luggage, especially on low-cost carriers, which measure strictly. Pack heavy items near the wheels so the bag stays balanced when it rolls. After each trip, wipe the shell and let the lining dry before storing the bags nested one inside the other.",
    ],
    variant: 'Make sure the set of 2 is selected, not a single trolley, and confirm the colour before adding to cart.',
  },
  {
    store: 'Amazon', productId: 'B0GWLTV2N2', name: 'Hydra BOOMBAR 2.1 Soundbar, 180W, with Wired Subwoofer',
    price: 7238, mrp: 25999, image: IMG('71d7JGpeEhL._SL1500_.jpg'),
    description: [
      "Flat TVs have thin, rear-firing speakers, which is why dialogue sounds muddy and explosions sound flat. A 2.1 soundbar fixes both problems. The bar handles voices and effects across the front of the room, and a separate subwoofer handles the low end that small TV speakers cannot reproduce.",
      "The Hydra BOOMBAR is a 2.1 system rated at 180 W, with a wired subwoofer. A wired sub does not drop out or lag the way cheap wireless subs sometimes do, but it needs a cable run to where you put it. The corner of the room or next to the TV unit usually gives the fullest bass.",
      "At ₹7,238 it sits well below its listed MRP of ₹25,999. Before buying, check which inputs the bar has (HDMI ARC, optical, Bluetooth or AUX) against the ports on the back of your TV. HDMI ARC is the easiest option, because the TV remote then controls the volume. Keep the bar clear of the screen's IR sensor so the remote keeps working.",
    ],
    variant: 'Confirm the BOOMBAR 2.1 with subwoofer is selected, then check the price still reads ₹7,238.',
  },
  {
    store: 'Amazon', productId: 'B0BGPN4GGH', name: 'Lifelong Dyno 800W Quartz Room Heater, ISI Marked, 2 Rod',
    price: 549, mrp: 2000, image: IMG('715uJuy+41L._SL1500_.jpg'),
    description: [
      "A quartz rod heater is the cheapest way to take the chill off one spot, such as your feet under a study desk or the bathroom before a morning bath. It heats you directly, like sunlight, instead of slowly warming the whole room, so you feel it within seconds of switching on.",
      "The Lifelong Dyno has two quartz rods and draws up to 800 W, so you can run one rod or both. It carries the ISI mark, which is mandatory for room heaters sold in India. At ₹549 it is priced like an unbranded heater from a local shop, but with a certified build.",
      "Quartz heaters dry the air and get very hot on the grille, so keep them at least a metre from curtains, bedding and clothes. Do not leave one running unattended or while you sleep, and keep children and pets away from it. On one rod it uses about 400 W, which costs very little for short bursts of heat.",
    ],
    variant: 'Confirm the Dyno 800W two-rod model is selected — other Lifelong heaters on the page are priced differently.',
  },
  {
    store: 'Amazon', productId: 'B0D9JN9HZ9', name: 'Nerf Super Soaker Mega Dunk-Fill Water Blaster, 1005 ml',
    price: 349, mrp: 1799, image: IMG('61FwF0kz2XL._SL1500_.jpg'),
    description: [
      "Holi and summer pool days are when a water blaster gets its money's worth. Hasbro's Super Soaker is the brand most children ask for by name. The Mega line is its larger-tank range, built to hold enough water for a long play session.",
      "This Mega Dunk-Fill blaster holds 1005 ml, just over a litre. As the name says, you fill it by dunking it in a bucket or pool instead of unscrewing a cap under a tap. That makes refills much quicker in the middle of a game. At ₹349 it costs about a fifth of its listed MRP.",
      "Buying now, well ahead of Holi, avoids the usual March price rise. Use only clean water in it. Colour, gulal and sticky liquids clog the pump, and a clogged pump is what kills most water blasters. After play, empty it fully and let it dry with the fill opening facing down so no water is left standing inside. Stored dry, the seals last for several seasons.",
    ],
    variant: 'Confirm the Mega Dunk-Fill 1005 ml model is selected — other Super Soaker models on the page cost more.',
  },
  {
    store: 'Amazon', productId: 'B0GD1SF3CL', name: 'Lifelong Air Fryer Oven 10L, 12 Presets, 1350W',
    price: 4999, mrp: 17999, image: IMG('71cC5sLbpGL._SL1500_.jpg'),
    description: [
      "A basket air fryer is fine for one or two people, but a 3-4 litre basket fills up fast with a family's worth of fries or tikka. An air fryer oven has trays instead of a basket. You spread food out in a thin layer, so it crisps evenly without being shaken halfway through.",
      "This Lifelong unit has a 10-litre capacity, runs at 1350 W and has 12 presets. The presets cover the common jobs, so you can start cooking without guessing at times and temperatures. The oven shape also takes things a basket cannot hold well, such as a small pizza, a tray of cookies, or paneer and vegetable skewers.",
      "At ₹4,999 it costs about the same as a mid-range basket fryer while holding much more. It needs a 15 A socket or a sturdy 16 A extension, and some space around the vents while it runs, because the sides get hot. Let the trays cool before washing, and wipe the heating element area gently once it is cold.",
    ],
    variant: 'Confirm the 10L air fryer oven is selected, then check the price still reads ₹4,999.',
  },
  {
    store: 'Amazon', productId: 'B0FRNQ5QT6', name: 'Tokyo Talkies Women Tops',
    price: 194, mrp: 1499, image: IMG('81SALkJffzL._SL1500_.jpg'),
    description: [
      "Tokyo Talkies is a fast-fashion label known for trend-led tops and dresses priced for students and first jobbers. Its tops usually sell in the ₹400-800 range, so under ₹200 is a clearance-level price for the brand.",
      "At ₹194 this top is 87% below its listed MRP of ₹1,499. That makes it an easy pick for casual wear, college or layering under a jacket. Price and stock on fashion listings like this change by size and colour. The Amazon page showed only 3 left when we checked, so the price may not last.",
      "Fast-fashion sizing runs small, so check the brand's size chart against a top you already own rather than going by your usual size. Wash it inside out in cold water and dry it in the shade to keep the print and colour. Amazon fashion usually allows easy returns, but confirm the return window on the product page before ordering.",
    ],
    variant: 'Pick your size and colour, then confirm the price still reads ₹194 — other combinations can cost more.',
  },
  {
    store: 'Flipkart', productId: 'PSLHQEJZW4ME2ZDS', name: 'Nutrabay Gold Pea Protein Powder, 25g Protein, 4.6g BCAA, Plant-Based',
    price: 1149, mrp: 1899,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/protein-supplement/n/z/h/-original-imahqkbsdyutuvfm.jpeg?q=70',
    affiliateUrl: FK('nutrabay-gold-pea-protein-powder-25g-protein-4-6g-bcaa-5g-soluble-fiber-plant-based/p/itm3db3fccac49ab', 'PSLHQEJZW4ME2ZDS'),
    description: [
      "Pea protein is the go-to option for anyone who cannot take whey. That includes vegans, people who are lactose intolerant, and those who get bloated on milk-based shakes. It is made from yellow peas, so it contains no dairy, and it mixes into a thicker, earthier shake than whey does.",
      "Nutrabay's Gold pea protein lists 25 g of protein per serving, along with 4.6 g of BCAAs and 5 g of soluble fibre. Most plain pea isolates do not include the fibre, and it helps keep you full between meals. Nutrabay is an Indian sports nutrition brand that sells its own products on Flipkart and its own site.",
      "At ₹1,149 it is well below its listed MRP of ₹1,899. Blend or shake it hard with water or plant milk, since pea protein clumps more than whey when stirred with a spoon. Check the flavour and pack size on the product page before ordering. If you have a medical condition, check with a doctor before starting any supplement.",
    ],
    variant: 'Confirm the flavour and pack size — the price shown is for the variant on the linked page.',
  },
  {
    store: 'Flipkart', productId: 'SHKGZN77YYZJ7YMG', name: 'STELITE 5 Layer Plastic Shoe Rack',
    price: 248, mrp: 1826,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shoe-rack/r/t/l/18-15-0-5-rr-1054-1055d-r-r-enterprise-white-30-original-imahgg26qmh76mns.jpeg?q=70',
    affiliateUrl: FK('stelite-5-layer-shoes-rack-plastic-shoe-stand/p/itme7a26f57d77be', 'SHKGZN77YYZJ7YMG'),
    description: [
      "Shoes piled by the front door are the first thing visitors see. A tiered rack stacks the same pairs upwards in about a quarter of the floor space. Five shelves usually hold 10-15 pairs of everyday footwear, which covers a small family's chappals, school shoes and sneakers.",
      "This STELITE rack is plastic and has five layers. Plastic suits an Indian entryway better than cheap metal racks because it does not rust from wet monsoon footwear, and it wipes clean in seconds. It goes together by hand with no tools, and it is light enough to move when you mop.",
      "At ₹248 it costs a fraction of a wooden or steel rack. Plastic racks are meant for everyday shoes, not heavy boots on every shelf. Put the heaviest pairs on the bottom tier so the rack stays steady, and stand it against a wall. Leave wet shoes to dry before racking them to avoid a smell building up.",
    ],
    variant: 'Confirm the 5-layer rack is selected, then check the price still reads ₹248.',
  },
  {
    store: 'Flipkart', productId: 'SHRG4WPHKNAXVC8Z', name: 'LetsShave Evior Reusable Face Razor for Women',
    price: 99, mrp: 857,
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/shaving-razor/t/h/d/-original-imahrbzznvr656ru.jpeg?q=70',
    affiliateUrl: FK('letsshave-evior-reusable-face-razor-women/p/itm3333ed02f6334', 'SHRG4WPHKNAXVC8Z'),
    description: [
      "A face razor, sometimes sold as a dermaplaning tool, removes fine facial hair and the dead top layer of skin in one gentle pass. Many women use one instead of threading the upper lip or waxing the cheeks, because it is painless, takes a minute and can be done at home.",
      "LetsShave is an Indian shaving brand, and the Evior is its reusable face razor for women. It has a slim handle and a fine blade sized for the brow line, upper lip and cheeks. Because it is reusable, you are not throwing away a whole plastic razor after every few uses.",
      "Flipkart sells this listing with a minimum order of 2, at ₹99 each, so budget for two. That works out well, since one can live in a travel kit. Use it on clean, dry or lightly oiled skin, hold the skin taut, and make short, light strokes downwards. Do not use it over active acne or broken skin, and rinse and dry the blade after each use.",
    ],
    variant: 'Flipkart sets a minimum order of 2 on this listing — the ₹99 price is per razor.',
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

const file = process.argv[2] ?? 'ifs-0925d-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
