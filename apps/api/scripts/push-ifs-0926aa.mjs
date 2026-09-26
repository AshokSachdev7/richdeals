// DEAL-INGEST indiafreestuff tick 2026-09-26aa
//
// 5 IFS listing pages → 69 unseen slugs → 64 single-product candidates, every base64 ?rto= Buy Now resolved to the store URL.
// 3 already in the DB (VCLGGQGGWSY2ZUKM, Lakmé CBKGUZ3N6DEV8X6G, B0G5PN6HHY). Every Amazon price was re-read on the PDP
// (#centerCol) in the logged-in tab: 19 kept, the rest rejected for clip coupons, 1-left stock, inflated M.R.P., no price
// read or no image. Flipkart prices come from the PDP ld+json in a browser tab: 3 kept (Kenstar NEXO 3-pack, TVS Ronin
// helmet, VGR V-761). Copy is written only from the PDP title + feature bullets — no invented specs.
// Amazon price / M.R.P. / image / stock come from the PDP read in az0926aa.json (repo root) — never retyped.
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { readFileSync, writeFileSync } from 'node:fs';

const kebab = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const AZ = (asin) => `https://www.amazon.in/dp/${asin}?tag=ashoksachdev-21`;
const FK = (path, pid) => `https://www.flipkart.com/${path}?pid=${pid}&affid=djhackraj`;
const MY = (url) => `https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;
const NO_COUPON = 'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.';

let pdp = JSON.parse(readFileSync(new URL('../../../az0926aa.json', import.meta.url), 'utf8'));
if (typeof pdp === 'string') pdp = JSON.parse(pdp);
const byAsin = Object.fromEntries(pdp.map((r) => [r.a, r]));

const HOWTO = (what, variant, store = 'Amazon') => [
  `Tap Grab Deal to open the ${what} on ${store} at the live price.`,
  variant,
  `Add to cart and check out. ${store} prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.`,
  NO_COUPON,
];
const SAME = 'Confirm this exact variant is selected — other colours, sizes or pack options on the same page are priced differently.';
const SIZE = 'Pick your size from the size chart first — this price applies to the listed colour, and some sizes may already be sold out.';

const A = (productId, name, description, variant = SAME) => {
  const r = byAsin[productId];
  if (!r) throw new Error(`no PDP read ${productId}`);
  const left = r.av.match(/only (\d+) left/i);
  return {
    store: 'Amazon', productId, name, description, variant,
    price: r.p, mrp: r.mrp, exp: r.exp, av: r.av,
    // ponytail: every rendition (_SY355_, _SL1254_ …) normalised to the full-size _SL1500_ of the same image id
    image: r.img.replace(/\._[^/]+_\.jpg$/, '._SL1500_.jpg'),
    stock: left ? `only ${left[1]} left in stock at this price when checked` : undefined,
  };
};

const DEALS = [
  A('B0GXYN91N7', 'American Tourister Cleva S 67 cm Hard-Side Check-in Trolley', [
    "A medium check-in suitcase from American Tourister at ₹3,499 on Amazon, well under half its M.R.P.",
    "The Cleva S has a polypropylene hard shell, 360° double spinner wheels and a mounted TSA lock, so it can be locked for international flights without cutting the lock at security.",
    "At 67 cm it fits a week of clothes for one person or a shorter family trip. It is a check-in size, not a cabin bag, so it goes in the hold on most airlines.",
  ], 'Confirm the 67 cm (medium) Cleva S is selected — the cabin and large sizes and other colours are priced differently.'),
  A('B0H1N57TVL', 'Aristocrat Altitude 8-Wheel Large Check-in Trolley, Surf Spray', [
    "A large Aristocrat check-in trolley at ₹1,999 on Amazon, one of the lowest prices we have seen for a large hard-shell case.",
    "It has a scratch- and water-resistant polypropylene shell, eight spinner wheels, a flush combination lock and a fabric-lined main compartment.",
    "A large case suits long trips or packing for two. Being a budget line, treat it as a case for a few trips a year rather than weekly business travel.",
  ], 'Confirm the Large size in Surf Spray is selected — other sizes and colours are priced differently.'),
  A('B0GSWH4QPN', 'DROGO Pulse Ergonomic Gaming Chair with Headrest & Lumbar Support, White', [
    "An ergonomic gaming and work chair from DROGO at ₹8,998 on Amazon, about a third of its M.R.P.",
    "It has a headrest and lumbar cushion, a backrest that reclines from 90° to 165°, an extendable footrest, padded armrests that move with the recline, and high-density foam seating.",
    "It suits long desk sessions for work, study or gaming, and the footrest lets you lean back between tasks. Check your desk height against the chair's seat range before you order.",
  ], 'Confirm the White Pulse variant is selected — other colours are priced differently.'),
  A('B0HHSGXXVJ', 'GOBOULT Mustang Nitro TWS Earbuds, 32 dB ANC, 72 h Playtime', [
    "GOBOULT's Mustang-branded ANC earbuds at ₹1,999 on Amazon, roughly a third of the M.R.P.",
    "They claim up to 32 dB of active noise cancellation, up to 72 hours of total playtime with the case, Google Fast Pair for quick Android pairing, and Mustang-style tri-bar tail lights on the case.",
    "Good for a commute or office where ANC matters at a budget price. Fast Pair works only with compatible Android phones; iPhones pair the normal Bluetooth way.",
  ]),
  A('B0GK1GSRLJ', 'GOBOULT Mustang Torq TWS Earbuds, 60 h Playtime, Quad-Mic ENC', [
    "The cheaper of GOBOULT's two Mustang earbuds at ₹1,499 on Amazon, 75% below the M.R.P.",
    "They offer up to 60 hours of total playtime, quad-mic environmental noise cancellation for calls, and the Amp app for EQ and touch-gesture settings.",
    "These do ENC for calls rather than ANC for music, so pick them for call clarity and battery life. If you want noise cancellation while listening, the Mustang Nitro is the one to look at.",
  ]),
  A('B0FG356FYS', 'Haier 630 L Lumiere 4-Door French Door Refrigerator HRB-700KGU1', [
    "Haier's 630-litre French door refrigerator at ₹1,41,990 on Amazon, well below its ₹2,25,000 M.R.P.",
    "The capacity splits into 425 L fresh food, a 102 L freezer and a 103 L convertible section. It uses a triple inverter compressor and a temperature range of -20°C to 5°C. The listing states a 10-year motor warranty and a 2-year comprehensive warranty, claimed with the Amazon invoice.",
    "It is sized for families of five or more. Measure the kitchen space and door clearance before buying, because a four-door unit this size needs much more room than a regular double-door fridge.",
  ]),
  A('B0HHPPNFFD', 'HRX Helium Cabin Hard-Side Trolley Suitcase with 8 Spinner Wheels', [
    "A cabin-size HRX suitcase at ₹1,399 on Amazon, a small fraction of its listed M.R.P.",
    "It has a flexible polypropylene shell, eight spinner wheels, a flush-mounted combination lock and a water-resistant body.",
    "A low-cost cabin bag for short trips and weekend travel. Check your airline's cabin dimensions against the listing before you fly.",
  ], 'Confirm the Cabin size is selected — the medium and large sizes and other colours are priced differently.'),
  A('B0HHQ1ZHCZ', 'HRX Parabola Medium Hard-Side Check-in Trolley Suitcase', [
    "A medium check-in suitcase from HRX at ₹1,599 on Amazon, far below the listed M.R.P.",
    "It uses a flexible polypropylene shell with eight spinner wheels, a flush-mounted combination lock and a water-resistant body.",
    "A medium case suits one person for about a week. It pairs well with the HRX Helium cabin bag if you want a matching two-bag set on a budget.",
  ], 'Confirm the Medium size is selected — other sizes and colours are priced differently.'),
  A('B0DB1VXGS9', 'INALSA Kratos Plus Stand Mixer, 1200 W, 5.3 L Bowl, Pink', [
    "INALSA's 1200 W stand mixer at ₹6,999 on Amazon, just over half its M.R.P.",
    "It has a copper motor with 8 speeds, metal gears, a 5.3 L stainless-steel bowl and planetary mixing, where the head moves while the bowl turns for an even mix.",
    "A stand mixer earns its space if you bake often or knead dough every week. For occasional cakes, a hand mixer is cheaper and takes up far less counter room.",
  ], 'Confirm the Kratos Plus in Pink is selected — other colours are priced differently.'),
  A('B0HJ2PR3FN', 'itel Zeno 300 (4 GB RAM, 64 GB), 6000 mAh, 90 Hz Display', [
    "A budget itel phone at ₹9,649 on Amazon, well below its M.R.P.",
    "It has a 6000 mAh battery with 18 W Type-C charging, a Unisoc T7100 octa-core processor, a 6.56-inch HD+ 90 Hz display, and 4 GB RAM with 64 GB storage (itel quotes up to 12 GB with virtual Memory Fusion).",
    "It suits a first phone, a backup handset or a parent who mainly calls, messages and watches videos. It is not meant for heavy gaming.",
  ]),
  A('B0C5XM2F8R', 'KEI Homecab 0.5 sq mm Single-Core House Wire, 90 m, Red', [
    "A 90 m coil of KEI Homecab house wire at ₹1,170 on Amazon, under half its M.R.P.",
    "It is a single-core insulated wire in 0.5 sq mm with fire-resistant insulation, sold as a 90 m roll in red.",
    "0.5 sq mm is a light gauge, used for low-load lighting points. Ask a licensed electrician which gauge each circuit needs before buying in bulk.",
  ], 'Confirm the 0.5 sq mm, 90 m, Red option is selected — other gauges, lengths and colours are priced differently.'),
  A('B0DN5N4514', 'MOKOBARA The Aisle Trunk Set of 2 (Cabin 55.5 cm + Check-in 65 cm), Black', [
    "A Mokobara two-piece luggage set at ₹9,799 on Amazon, well under half its M.R.P.",
    "The set pairs a 55.5 cm, 40 L cabin case with a 65 cm, 70 L check-in case. Both have a Makrolon polycarbonate shell, eight silent-run wheels, YKK zippers and a TSA lock.",
    "Mokobara pitches the pair for trips of about 18 to 21 days. Buying the set usually costs less than the two pieces bought separately.",
  ], 'Confirm the Set of 2 in Black is selected — single pieces and other colours are priced differently.'),
  A('B0GYRR1HKW', 'MSI MAG 275UPD E14 27-inch 4K Dual-Mode Gaming Monitor, 288 Hz IPS', [
    "MSI's dual-mode 27-inch gaming monitor at ₹29,999 on Amazon, under half its M.R.P.",
    "The IPS panel runs 4K UHD at 144 Hz or switches to Full HD at 288 Hz, with 1 ms (MPRT) response, up to 130% sRGB colour and a 1500:1 native contrast ratio.",
    "Dual mode lets you play fast shooters at 288 Hz and switch to sharp 4K for slower games and work. To use it fully, you need a GPU that can drive 4K at high frame rates.",
  ]),
  A('B0BMLMCQWX', 'Parker Ambient Ball Pen, Dark Grey Black Metal Trim', [
    "A Parker Ambient ball pen at ₹1,310 on Amazon, about half its M.R.P.",
    "It has a dark grey body with black metal trim, a finish suited to office use.",
    "A good pick as a gift for a new job or graduation. It takes standard Parker ball pen refills.",
  ]),
  A('B0FQ2XZFM6', 'Parker Aster Deluxe Pen and Notebook Gift Set', [
    "A Parker Aster gift set with a pen and notebook at ₹1,620 on Amazon, about 46% off the M.R.P.",
    "The box pairs a Parker Aster pen with a notebook, ready to give.",
    "Handy for Diwali or corporate gifting when you want a branded set without assembling one yourself.",
  ]),
  A('B09HTQGQ11', 'Parker Aster Ball Pen, Shiny Black with Chrome Trim', [
    "The Parker Aster ball pen at ₹679 on Amazon, half its M.R.P.",
    "It has a shiny black body with chrome trim, made for everyday writing at the office or college.",
    "At this price it is an easy entry into Parker pens for yourself, or a small gift.",
  ]),
  A('B0H6JY3SGF', 'Skybags Zephyre 55 cm Cabin Trolley with Laptop Compartment & TSA Lock', [
    "A Skybags cabin trolley with a front laptop pocket at ₹3,069 on Amazon, well under half its M.R.P.",
    "The Zephyre has a front-opening laptop compartment, a 50:50 two-way main opening, 360° dual wheels, a push-button trolley handle and a flush TSA-approved lock.",
    "Made for work trips: you can reach the laptop at security without opening the whole case. At 55 cm it is cabin size on most domestic airlines.",
  ], 'Confirm the 55 cm cabin size is selected — other sizes and colours are priced differently.'),
  A('B0GMXTKFLN', 'Torche Ironwood Height-Adjustable Laptop Table with Lockable Wheels', [
    "A height-adjustable laptop and study table from Torche at ₹2,396 on Amazon, about a third of its M.R.P.",
    "It has an adjustable height mechanism and two lockable casters, and can work as a laptop table, study desk or sofa-side table. Torche says assembly takes under 10 minutes.",
    "Useful for working from a sofa or bed, or as a small movable desk in a tight room. Lock the wheels before you lean on it.",
  ]),
  A('B0CG178YCP', 'Wipro Vesta FS101 Cold Press Slow Juicer, 240 W', [
    "Wipro's cold-press juicer at ₹8,999 on Amazon, well under half its M.R.P.",
    "It squeezes at a low 55 RPM instead of spinning, using a 240 W copper DC motor. It has a 76 mm wide chute for whole fruit, a reverse function to clear stuck pulp, and comes with a cleaning brush.",
    "Worth it if you juice daily and want drier pulp and less prep chopping. Slow juicers take longer per glass than centrifugal ones.",
  ]),
  {
    store: 'Flipkart', productId: 'WGYHQU9ENHHZFSDH',
    name: 'Kenstar NEXO 5.9 L Instant Water Geyser (Pack of 3)',
    description: [
      "Three Kenstar instant geysers for ₹9,069 on Flipkart, about ₹3,023 each.",
      "Each Kenstar NEXO is a 5.9 L instant water geyser. The pack of 3 covers a kitchen and two bathrooms in one order.",
      "Instant geysers suit short hand-wash or kitchen use more than a full bucket bath. Budget for installation, which is usually charged separately.",
    ],
    variant: 'Confirm the Pack of 3 is selected — the single unit is priced differently.', price: 9069, mrp: 22470, exp: 9069, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/water-geyser/h/s/j/2026-nexo-pack-of-3-3000-kenstar-5-9-original-imahqu9drjzj9fqt.jpeg?q=70',
    affiliateUrl: FK('kenstar-nexo-pack-3-5-9-l-instant-water-geyser/p/itm89e3526489d1e', 'WGYHQU9ENHHZFSDH'),
  },
  {
    store: 'Flipkart', productId: 'HLMGJCSBHVRWA4H2',
    name: 'TVS Ronin Edition Motorbike Helmet',
    description: [
      "A TVS-branded Ronin Edition helmet at ₹807 on Flipkart.",
      "It is sold by TVS as a motorbike helmet with Ronin Edition styling.",
      "Check the size chart against your head circumference before ordering. A loose helmet protects far less in a fall.",
    ],
    variant: SIZE, price: 807, mrp: 1069, exp: 807, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/helmet/j/h/p/half-face-m-1-kl300301hfbm-58-full-face-tvs-original-imahfv62stznndsg.jpeg?q=70',
    affiliateUrl: FK('tvs-ronin-motorbike-helmet/p/itmcf32e2e84325d', 'HLMGJCSBHVRWA4H2'),
  },
  {
    store: 'Flipkart', productId: 'TMRHH6UVH9JAHYNU',
    name: "VGR V-761 4-in-1 Women's Body & Bikini Trimmer, Waterproof, 90 min Runtime",
    description: [
      "VGR's 4-in-1 women's grooming trimmer at ₹1,570 on Flipkart.",
      "The V-761 is fully waterproof, runs up to 90 minutes per charge and has 4 length settings. It is made for body, bikini and other sensitive areas.",
      "Being waterproof, it can be used in the shower and rinsed clean. Use a fresh, clean head for sensitive areas.",
    ],
    variant: SAME, price: 1570, mrp: 2799, exp: 1570, av: 'InStock',
    image: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/trimmer/t/8/a/-original-imahpthztzzdphbz.jpeg?q=70',
    affiliateUrl: FK('vgr-v-761-female-4-in-1-body-sensitive-bikini-fully-waterproof-trimmer-90-min-runtime-4-length-settings/p/itmf5f790e59e5c6', 'TMRHH6UVH9JAHYNU'),
  },
];
// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of DEALS) {
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const description = [...d.description, `Live ${d.store} price is ₹${inr(d.price)} against an M.R.P. of ₹${inr(d.mrp)} — ${discountPct}% off, ${d.stock ?? 'In stock'}.`].join('\n\n');
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – ${d.store}`,
    description, howTo: HOWTO(d.name.split(',')[0], d.variant, d.store), image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: d.store, productId: d.productId, affiliateUrl: d.affiliateUrl ?? AZ(d.productId),
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (!Number.isInteger(row.price) || row.price >= row.mrp) throw new Error(`bad price ${d.productId}`);
  if (Math.abs(d.price - d.exp) > 1) throw new Error(`drift vs IFS ${d.productId}`);
  if (!/in ?stock|only \d+ left/i.test(d.av)) throw new Error(`not in stock ${d.productId}`);
  // hand-typed ₹ in copy must match the PDP price (title-rupee-vs-price rule)
  for (const m of description.matchAll(/\bat ₹([\d,]+)/gi)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (v !== d.price) throw new Error(`copy ₹${v} != price ₹${d.price} ${d.productId}`);
  }
  const imgOk = {
    Flipkart: /^https:\/\/rukmini\d\.flixcart\.com\/image\/1500\/1500\//,
    Myntra: /^https:\/\/assets\.myntassets\.com\/h_1440,q_90,w_1080\//,
    Amazon: /^https:\/\/m\.media-amazon\.com\/images\/I\/[\w+%-]+\._SL1500_\.jpg$/,
  }[d.store].test(row.image);
  if (!imgOk) throw new Error(`bad image ${d.productId} ${row.image}`);
  if (d.store === 'Flipkart' && !/\/p\/itm\w+\?pid=\w+&affid=djhackraj$/.test(row.affiliateUrl)) throw new Error(`fk url ${d.productId}`);
  if (d.store === 'Myntra' && !row.affiliateUrl.startsWith('https://inr.deals/track?id=inr678975705&')) throw new Error(`myntra url ${d.productId}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');
if (new Set(out.map((r) => r.productId)).size !== out.length) throw new Error('duplicate ASIN');

const file = process.argv[2] ?? 'ifs-0926aa-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
