// DEAL-INGEST indiafreestuff tick 2026-09-22ab.
// 36 cards discovered off /deals + /deals/superdeals -> 27 resolved to a real product URL
// -> 25 fresh after dedup vs the live DB -> verified on the PDP -> 11 publishable here
// (8 Amazon creates + 3 Myntra creates) plus 1 in-place refresh at the bottom.
//
// 14 Amazon candidates rejected on the PDP: 10 price drift > Rs.1 (their card price is
// stale, which is the normal case for this source), 2 Currently unavailable, 2 thin
// listings with near-zero stock. Their card price is advisory only, never published.
//
// Myntra is readable by plain curl with a browser UA, but its Product ld+json block
// carries UNESCAPED double quotes inside merchant marketing copy, so JSON.parse throws
// and productLd() used to return no-ld-json for a priced, in-stock product. Fixed this
// tick in scripts/lib/ingest-common.mjs with a positional field-scrape fallback.
// MRP is not in Myntra ld+json at all - it comes off the embedded pdpData.
//
// Myntra goes through InRDeals, not Cuelinks (owner 2026-09-22: the Cuelinks account is
// deactivated for Myntra). The InRDeals url is built off the CLEAN page url -
// indiafreestuff's own affiliate_id=zhXQPl71a7 was riding inside our wrapper until this
// tick's strip fix, so the pre-flight below now refuses any url still carrying it.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const HOW = (store, confirm) => [
  `Tap Grab Deal to open the product on ${store} at the live price.`,
  confirm,
  'Prices move fast - add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const slugFor = (name, productId) =>
  `${kebab(name).slice(0, 80).replace(/-+$/, '')}-${productId.toLowerCase()}`;

const INR = (u) =>
  'https://inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=' +
  encodeURIComponent(u);

const deals = [
  {
    productId: 'B0C4LHRS6S',
    name: 'Philips Full Glow 15W Round LED Surface Downlighter 3-in-1 Tunable White',
    price: 1028,
    mrp: 1375,
    image: 'https://m.media-amazon.com/images/I/512OacWwdlL._SL1080_.jpg',
    confirm:
      'Check the wattage on the listing before you add to cart - the same product page also sells a 12W version, and only the 15W is at this price.',
    description:
      'A surface downlighter mounts flat on the ceiling, which makes this the fitting to buy when there is no false ceiling to recess a panel into - a mount plate and two screws, no cutting. The scene-switch behaviour is the reason to pick it over a plain LED disc: flicking the wall switch off and back on within one to five seconds cycles the light between cool daylight, natural white and warm white, so one fitting covers a work-bright kitchen and a warm living room with no driver, no remote and no app. Philips rates the output at 100 lumens per watt, putting the 15W version near 1500 lumens - enough for a small bedroom on its own, or a corridor with room to spare - and claims roughly twice the light spread of an ordinary surface light, which is the usual complaint about cheap round downlighters that throw one hot spot straight down. Rs.1,028 against a Rs.1,375 list price.',
  },
  {
    productId: 'B0H1BVMZC4',
    name: 'Enakshi Kids Ski Winter Gloves Windproof Waterproof Fleece Lined Blue Small',
    price: 376,
    mrp: 2442,
    image: 'https://m.media-amazon.com/images/I/61zHNCO71wL._SL1024_.jpg',
    confirm:
      'Size S is the variant on offer - measure the palm first, kids gloves are sized by age band and a loose glove is worse than none on a slope.',
    description:
      'Winter gloves for children built to take snow rather than only look warm. The shell is an ABS-coated fabric with a water-resistant surface, so light rain and packed snow bead off instead of soaking through, and the lining is soft fleece chosen for moisture wicking - the real failure of cheap kids gloves is not cold getting in, it is sweat staying in and then chilling. The full palm is textured for grip, which matters when a child is holding a ski pole, a cycle handlebar or a sled rope with wet hands. Thumb tips carry a conductive coating, so a phone or a smartwatch still responds without pulling a glove off and losing it in the snow. Sold as one pair, sized small, unisex, and intended for skiing, snowboarding, climbing, running or plain driveway shovelling. Rs.376 against a Rs.2,442 list price - a little over what one replacement glove costs at retail.',
  },
  {
    productId: 'B0DFHKPWL5',
    name: 'GEONIX 24-inch IPS Full HD Monitor 75Hz HDMI and VGA White',
    price: 5879,
    mrp: 14999,
    image: 'https://m.media-amazon.com/images/I/716AUnXf5aL._SL1500_.jpg',
    confirm:
      'Inputs are HDMI and VGA only - there is no DisplayPort and no USB-C, so a laptop with USB-C alone needs an adapter you buy separately.',
    description:
      'A 24-inch (60.4 cm) Full HD panel under Rs.6,000 is the size most desks actually want - big enough for two windows side by side at 1080p with no scaling, small enough to sit at arm length without turning your head. Viewing angle is quoted at 178 degrees both horizontally and vertically, the number that separates a usable IPS-class panel from a cheap TN one where colour shifts the moment you lean back, and it drives 16.7 million colours in a native 16:9 aspect. Power draw is rated at 24W, so it runs cool and costs almost nothing to leave on all day. The bezel is ultra-slim on three sides, which is what makes a two-monitor setup read as one screen instead of two, and the chassis is wall-mountable if the desk space is worth more than the stand. Covered by a three-year warranty. Rs.5,879 against a Rs.14,999 list price.',
  },
  {
    productId: 'B0H63FTDWV',
    name: 'Acer Nano Pad Slim Wireless Backlit Keyboard Bluetooth 5.0 420mAh',
    price: 899,
    mrp: 1599,
    image: 'https://m.media-amazon.com/images/I/716iMZtEMjL._SL1500_.jpg',
    confirm:
      'Bluetooth only - there is no 2.4GHz USB dongle in the box, so a desktop without built-in Bluetooth needs its own adapter.',
    description:
      'A slim Bluetooth 5.0 keyboard meant to live in a bag rather than on a desk. The profile is thin and light enough to slide into a laptop sleeve, which is the whole point for anyone who types on a tablet or a phone often enough to resent the on-screen keyboard. Range is quoted up to 10 metres, and dedicated system-switch keys remap the shortcut row for Windows, Android and iOS, so the same keyboard behaves correctly whether it is paired to a Windows laptop, an Android tablet, an iPad or a Mac instead of leaving you guessing which key is Command. The backlight is multi-colour LED with switchable colour and adjustable brightness - useful at a desk at night, and switched off it buys back runtime. Power is a built-in 420mAh lithium-polymer cell charged over Type-C, with auto-sleep to stretch the interval between charges, and the switches are rated past three million keystrokes. Rs.899 against a Rs.1,599 list price.',
  },
  {
    productId: 'B0CZT73BS1',
    name: 'Amazon Basics Tough Armor Back Cover for iPhone 13 TPU and Polycarbonate Navy Blue',
    price: 183,
    mrp: 2799,
    image: 'https://m.media-amazon.com/images/I/61Fqy0s0omL._SL1500_.jpg',
    confirm:
      'Fits the iPhone 13 only - the 13 mini, 13 Pro and 13 Pro Max all have different camera cut-outs and will not seat correctly.',
    description:
      'A dual-layer case for the iPhone 13 at Rs.183, roughly what a bare silicone sleeve costs. The construction is the one that actually survives a drop: a soft TPU inner shell to absorb and spread the shock, wrapped in a rigid polycarbonate outer to stop the impact point from ever reaching the glass. A single-material case does one of those two jobs, never both. Bezels stand proud of the screen and of the camera ring, so the phone can be set face-down on a table or camera-down on a desk with neither surface touching, and the raised lip manages that without eating the swipe-from-edge gestures. The sides carry a textured pattern for grip, the failure mode on glossy cases being that they slide off exactly the sofa arm you thought was flat. Port cut-outs are precise and the buttons sit under tactile moulded covers rather than being left open. Navy blue, and slim enough that the phone still pockets normally.',
  },
  {
    productId: 'B0DGXVC63D',
    name: 'Shryoan Butter Luxe Satin Matte Liquid Lipstick Shade 12 6ml',
    price: 83,
    mrp: 249,
    image: 'https://m.media-amazon.com/images/I/611q+KCgYLL._SL1500_.jpg',
    confirm:
      'Shade 12 is the one at this price - the listing carries a shade dropdown and the other shades are priced separately.',
    description:
      'A liquid lipstick at Rs.83 for 6ml, which is under a rupee and a half per wear if you get the fifty-odd applications a tube this size usually gives. The finish is satin matte rather than flat matte, and the distinction matters: a true matte at this price almost always means a formula that dries tight and shows every line on the lip, while a satin matte keeps some slip and reads smooth. Shryoan builds it on a creamy, heavily pigmented base that goes down opaque in one pass, so there is no patchy second coat, and the doe-foot applicator with a rich formula is what makes a clean edge possible without a separate lip liner. It is sold on a non-transfer claim, which in practice means giving it the two minutes it needs to set before a cup or a mask touches it. Made in India by Kanero Cosmetic, net quantity 6.0 ml, shade 12, currently ranked #1,866 in Lipsticks on Amazon and rated 3.4 out of 5 across 58 reviews. Rs.83 against a Rs.249 list price.',
  },
  {
    productId: 'B0FNDDRC88',
    name: 'Safari Genius Theo 8 Wheel 66cm Medium Check-in Polycarbonate Trolley Bag Pearl Blue',
    price: 1861,
    mrp: 9599,
    image: 'https://m.media-amazon.com/images/I/51jyLS-ZYuL._SL1500_.jpg',
    confirm:
      'This is the 66cm medium check-in size, not cabin - at 66cm it goes in the hold, so do not buy it expecting to carry it into the aircraft.',
    description:
      'A 66 cm medium check-in trolley at Rs.1,861 is a hard-shell bag priced like a soft duffel. The shell is polycarbonate, the material worth paying for in hard luggage because it flexes under a drop and comes back instead of cracking the way cheap ABS does after one rough belt. It rolls on eight spinner wheels - four twin-wheel sets, so the load is spread and the bag tracks straight beside you rather than dragging behind on two wheels, and Safari rates the Duratech wheels for rough ground and not only airport marble. Security is a three-digit combination lock set into the shell itself, not a padlock threaded through the zip pulls, with heavy zippers around the perimeter. The 66 cm case is the standard medium check-in size that fits airline hold allowances without inviting the oversize surcharge, which is the single most expensive mistake in buying luggage. Made in India and covered by a three-year international warranty against manufacturing defects. Pearl blue, against a Rs.9,599 list price.',
  },
  {
    productId: 'B0C7QZ54WX',
    name: 'Mokobara The Transit Cabin Hard-Sided 8 Wheel Luggage We Meet Again Sunray',
    price: 5999,
    mrp: 23999,
    image: 'https://m.media-amazon.com/images/I/61fTt-R+l+L._SL1500_.jpg',
    confirm:
      'Cabin size - check your airline cabin allowance by weight too, a hard-shell cabin case eats into the 7kg limit before anything goes in it.',
    description:
      'Mokobara at Rs.5,999 is the interesting part here, because this case normally sits at several times that. The shell is unbreakable polycarbonate in a premium gloss texture, and the difference from a budget hard case shows in the parts you touch rather than the parts you see: an aviation-grade telescopic handle with a feather-touch release that does not rattle when extended, and premium zippers that keep their teeth aligned after a season of being over-packed. It runs on eight silent-run Japanese spinner wheels - Mokobara calls them ninja wheels - which is the feature that stops a hard case from announcing itself down a hotel corridor at 6am, and gives it genuine 360-degree movement through a crowded terminal. The lock is a TSA number lock, so a US or connecting-airport inspection can be opened and re-locked instead of cut off. Cabin sized, in the We Meet Again Sunray colourway with yellow detailing. Rs.5,999 against a Rs.23,999 list price.',
  },
  {
    store: 'myntra',
    productId: 'adb945ffe366',
    page: 'https://www.myntra.com/trolley-bag/teakwood+leathers/teakwood-leathers-360-degree-rotation-hard-sided-cabin-sized-trolley-bag-32l/29321774/buy',
    name: 'Teakwood Leathers 360 Degree Rotation Hard Sided Cabin Trolley Bag 32L',
    price: 1249,
    mrp: 8199,
    image:
      'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/SEPTEMBER/10/c13492fc6e1c474391601d8fbc305297.jpg',
    confirm:
      'At 55 x 35 x 20 cm this clears most cabin size gauges, but check your airline - a few budget carriers cap the depth at 20 cm exactly.',
    description:
      'A 32-litre hard-sided cabin trolley in a lime green textured finish, sized 55 cm high by 35 cm wide by 20 cm deep - the dimension set matters more than the litre count here, because cabin gauges measure the box and not the volume. Thirty-two litres is a genuine four to five day pack for one person, or a week if you are disciplined about shoes. It stands on eight corner-mounted skate wheels with full 360-degree rotation, so it pushes alongside you in an aisle instead of towing behind, and carries both a top grab handle and a retractable trolley handle. Inside is one main zip compartment with a zipped lining, two compression straps to stop clothes shifting into a crumpled heap mid-flight, and a separate zip sub-compartment for documents and cables. The shell is water-resistant and closes on a built-in number lock rather than a padlock. Rs.1,249 against a Rs.8,199 list price on Myntra.',
  },
  {
    store: 'myntra',
    productId: 'b1468affbb23',
    page: 'https://www.myntra.com/36356431',
    name: 'Priority Unisex Textured 360 Degree Rotation Hard Cabin Trolley Bag 48L',
    price: 999,
    mrp: 2899,
    image:
      'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/MAY/27/lbcpkR2n_5c84ca418f7b45f5901c9c8eb85590ad.jpg',
    confirm:
      'Listed as cabin but it measures 56 x 36 x 24 cm at 48.38 litres, which is over the cabin gauge on most Indian carriers - treat it as a small check-in.',
    description:
      'A 48.38-litre hard-sided suitcase at Rs.999, roughly what a decent backpack costs. The shell is polypropylene - more flexible than polycarbonate and far tougher than the brittle ABS most sub-thousand-rupee cases use - in a white textured finish that hides scuffs better than gloss, and it cleans with a dry cloth. It rolls on eight corner-mounted skate wheels with 360-degree rotation, carries a top handle and a retractable trolley handle, and closes on a TSA lock, so an airport inspection can be opened and re-secured rather than cut open. Inside there is one main compartment with a zipped lining, two compression straps and a zip sub-compartment. Rated to carry up to 10 kg of contents against about 2.5 kg of dead weight, so most of what you are wheeling is your own luggage and not the case. Water-resistant, unisex, and covered by a three-year brand-owner warranty. Rs.999 against a Rs.2,899 list price on Myntra.',
  },
  {
    store: 'myntra',
    productId: 'a7e839a01bb4',
    page: 'https://www.myntra.com/trolley-bag/safari/safari-accent-vanilla-hard-sided-8-wheel-medium-trolley-bag-suitcase-66cm/34199526/buy',
    name: 'Safari Accent Vanilla Hard Sided 8 Wheel Medium Trolley Bag Suitcase 66cm',
    price: 2249,
    mrp: 10999,
    image:
      'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2026/MAY/26/StNPLndF_da57b26cd0f24ae49a74321f3679f495.jpg',
    confirm:
      'Medium check-in at 66 x 44 x 27 cm - this is a hold bag, and the lock is a combination lock rather than a TSA one, so a US inspection may cut it open.',
    description:
      'Safari Accent in vanilla, a 66 cm medium check-in suitcase in the 51-to-100 litre band, measuring 66 x 44 x 27 cm. The shell is polycarbonate with a textured finish, the right material for a bag that will be thrown onto a belt - it takes a drop by flexing and returns to shape instead of cracking at the corner. It carries three handles rather than the usual two: one on the top, one on the side for lifting it into a car boot or an overhead rack, and a top-mounted retractable trolley handle. Eight corner-mounted wheels give smooth 360-degree rotation under a full load. Inside is a single main zip compartment with a zipped lining pocket and two elasticated compression tabs on a click clasp, so the contents stay packed flat. Maximum carrying capacity is rated up to 23 kg against about 2.5 to 4.4 kg of dead weight, which lines up with a standard 23 kg airline hold allowance. Closes on a combination lock, backed by a three-year manufacturer warranty. Rs.2,249 against a Rs.10,999 list price on Myntra.',
  },
];

for (const d of deals) {
  const myn = d.store === 'myntra';
  d.storeSlug = myn ? 'myntra' : 'amazon';
  d.storeName = myn ? 'Myntra' : 'Amazon';
  d.slug ??= slugFor(d.name, d.productId);
  d.affiliateUrl = myn
    ? INR(d.page)
    : `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – ${d.storeName}`;
  d.howTo = HOW(d.storeName, d.confirm);
}

// Pre-flight. Same checks as every push path, plus the affiliate_id leak guard.
// Host allow-list instead of a regex: a backslashed pattern does not survive being
// written into this file through a heredoc, and a list reads the same anyway.
const HOSTS = [
  'm.media-amazon.com',
  'rukmini1.flixcart.com',
  'rukmini2.flixcart.com',
  'img.tatacliq.com',
  'assets.myntassets.com',
];
const okHost = (u) => {
  try {
    const x = new URL(u);
    return x.protocol === 'https:' && HOSTS.includes(x.hostname);
  } catch {
    return false;
  }
};
const titlePrice = (t) => +((t.split('₹')[1] || '').split(' ')[0].split(',').join(''));

const seen = new Set();
for (const d of deals) {
  const t = titlePrice(d.title);
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!okHost(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  if (!d.slug.toLowerCase().endsWith(d.productId.toLowerCase()))
    throw new Error(`slug missing productId ${d.productId}`);
  if (d.affiliateUrl.includes('affiliate_id'))
    throw new Error(`source affiliate id leaked into affiliateUrl ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
  seen.add(d.slug);
  seen.add(d.productId);
}
console.log(`pre-flight OK, ${deals.length} rows\n`);

let created = 0;
let updated = 0;
const slugs = [];
for (const d of deals) {
  const store = await p.store.upsert({
    where: { slug: d.storeSlug },
    update: {},
    create: { slug: d.storeSlug, name: d.storeName },
  });
  const data = {
    slug: d.slug,
    title: d.title,
    description: d.description,
    howTo: d.howTo,
    image: d.image,
    mrp: d.mrp,
    price: d.price,
    discountPct: d.discountPct,
    isSuper: d.price <= 250,
    isHot: d.price <= 500,
    status: 'LIVE',
    productId: d.productId,
    affiliateUrl: d.affiliateUrl,
    storeId: store.id,
  };
  const existing =
    (await p.deal.findUnique({
      where: { store_product: { storeId: store.id, productId: d.productId } },
    })) ?? (await p.deal.findUnique({ where: { slug: d.slug } }));
  if (existing) {
    // keep the indexed slug, never rename it for cosmetics
    await p.deal.update({ where: { id: existing.id }, data: { ...data, slug: existing.slug } });
    if (existing.price !== d.price)
      await p.priceHistory.create({ data: { dealId: existing.id, price: d.price } });
    updated++;
    slugs.push(existing.slug);
    console.log('UPD', existing.id, existing.slug, existing.price, '->', d.price);
  } else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++;
    slugs.push(d.slug);
    console.log('NEW', row.id, d.slug);
  }
}

// deal 1746 (B0H18M1KZ5) came back as a dedup hit. The card said Rs.999, the PDP reads
// Rs.698 / MRP 1999 / -65%, in stock, sold by Clicktech - so the live row is stale and
// gets refreshed in place instead of skipped. The slug is indexed and stays; the title
// carries the price, so it is rebuilt off the stored product name.
const R = {
  price: 698,
  mrp: 1999,
  image: 'https://m.media-amazon.com/images/I/71lSEaT0jsL._SL1500_.jpg',
};
const row = await p.deal.findUnique({ where: { id: 1746 }, include: { store: true } });
if (!row) {
  console.log('refresh: deal 1746 not found, skipped');
} else if (!row.title.includes(' at ₹')) {
  console.log('refresh: deal 1746 title carries no price tail, skipped -', row.title);
} else {
  if (!okHost(R.image)) throw new Error('refresh: bad image host');
  const name = row.title.split(' at ₹')[0];
  const pct = Math.round((1 - R.price / R.mrp) * 100);
  const title = `${name} at ₹${R.price.toLocaleString('en-IN')} (${pct}% Off) – ${row.store.name}`;
  if (titlePrice(title) !== R.price) throw new Error('refresh: title/price mismatch');
  await p.deal.update({
    where: { id: row.id },
    data: {
      title,
      price: R.price,
      mrp: R.mrp,
      discountPct: pct,
      image: R.image,
      isSuper: R.price <= 250,
      isHot: R.price <= 500,
      status: 'LIVE',
    },
  });
  if (row.price !== R.price)
    await p.priceHistory.create({ data: { dealId: row.id, price: R.price } });
  updated++;
  slugs.push(row.slug);
  console.log('REFRESH', row.id, row.slug, row.price, '->', R.price, `(-${pct}%)`);
}

console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
