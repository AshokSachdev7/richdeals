// DEAL-INGEST indiafreestuff tick 2026-09-22q.
// 40 cards off /pages/getdeals -> 31 non-junk -> 15 newest -> 15 ?rto= resolved
// (all Amazon, all carrying their tag dealhind-21) -> 11 fresh + 4 DB dups.
// PDP read in the logged-in amazon.in tab (#centerCol innerText, never
// .a-offscreen). Results:
//   - 1 REJECTED on stock depth: B0DN1PK2L2 "Only 1 left in stock."
//   - 2 cards carried an INFLATED MRP the PDP does not support:
//       B0D9NXDW79 card MRP 10000 -> real 1999 (85% claim -> real 26%)
//       B0GF81BZ65 card 280/599   -> real 160/200 (the [Apply 3% Coupon] row)
//     We publish the PDP numbers, never the card's.
//   - 4 DB dups all carried a stale price; fixed in the same pass
//     (#6924, #8668, #10631, #3536). Their slugs are PRESERVED - changing a
//     live slug breaks the indexed URL.
// discountPct is recomputed from price/mrp everywhere, never copied.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const HOW = (confirm) => [
  'Tap Grab Deal to open the product on Amazon.in at the live price.',
  confirm,
  'Prices move fast — add to cart and check out while it holds.',
  'Deal auto-applies at checkout; no coupon code needed.',
];

const deals = [
  {
    productId: 'B081KGV7V6',
    slug: 'lavie-womens-archer-textured-dome-sling-bag-b081kgv7v6',
    name: "Lavie Women's Archer Textured Dome Sling Bag",
    price: 699, mrp: 2299,
    image: 'https://m.media-amazon.com/images/I/81-1a6miSHL._SY695_.jpg',
    description:
      'A dome sling sits differently from a flat one: the curved base gives the bag depth without width, so a phone, a folded stole, keys and a compact all stand upright instead of sliding into one flat heap at the bottom. That is the practical case for this shape over the envelope slings that dominate the price band. The body is a textured synthetic rather than a smooth coated finish, which matters more than it sounds — texture hides the scuffs and fingernail marks that make a cheap smooth bag look old in a month, and it does not shine under a flash. The strap is adjustable, so it works as a crossbody on a commute and shortened to a shoulder bag with an outfit that a long strap would cut across. Zip closure rather than a magnetic flap, which is the right call for a bag carried in a crowd. At ₹699 against a ₹2,299 list price this is in impulse territory for a brand that usually asks four figures, and the dome shape is the part you cannot get from an unbranded sling at the same money.',
    confirm: 'Confirm the listing reads the Archer textured dome sling — Lavie lists several Archer variants at different prices.',
  },
  {
    productId: 'B0D1FQSZGK',
    slug: 'sparkmate-by-crystal-floor-and-tile-brush-with-easy-cloth-pack-of-2-b0d1fqszgk',
    name: 'Sparkmate by Crystal Floor & Tile Brush with Easy Cloth (Pack of 2)',
    price: 81, mrp: 195,
    image: 'https://m.media-amazon.com/images/I/51lQpE7i2IL._SX679_.jpg',
    description:
      'Two tools for two jobs, which is the whole point of the pack: a stiff-bristle tile brush for grout lines and the corners a flat mop rides straight over, and a cloth head for the wipe-down afterwards. Grout is where bathroom floors actually look dirty — the tile face cleans with almost anything, the recessed line between tiles needs bristles short and stiff enough to reach into it, and a mop never does. The bristle block here is sized for that rather than for scrubbing broad area, so it is a finishing tool, not a replacement for your mop. At ₹40.50 per piece this is consumable pricing: bristles splay and cloth heads go grey, and the honest way to use them is to replace rather than nurse them. ₹81 for the pair against a ₹195 list price, which is roughly what a single branded grout brush costs on its own.',
    confirm: 'Confirm the listing reads Pack of 2 (brush + cloth) — the single brush is listed separately.',
  },
  {
    productId: 'B0CGVF5P13',
    slug: 'kuber-industries-soft-cotton-hand-kitchen-towel-with-hanging-loop-b0cgvf5p13',
    name: 'Kuber Industries Soft Cotton Hand & Kitchen Towel with Hanging Loop',
    price: 104, mrp: 499,
    image: 'https://m.media-amazon.com/images/I/71AcNfzof4L._SX679_.jpg',
    description:
      'A kitchen towel lives or dies on two things: whether it actually absorbs, and whether it dries out again before it starts smelling. Cotton handles the first — a synthetic microfibre pushes water around rather than taking it up, which is why it feels fast and leaves a wet counter. The hanging loop handles the second, and it is not a decorative detail: a towel that hangs flat on a hook dries through, a towel folded on a slab stays damp at the fold and that fold is what goes sour by the third day. Use it on hands and dishes, keep a separate one for the hob, and wash hot every few days rather than waiting for it to announce itself. Cotton loses a little size on the first wash, so buy the size you want after shrinkage, not before. ₹104 against a ₹499 list price on Amazon, in stock.',
    confirm: 'Confirm the pack size and colour on the listing — Kuber sells this towel in several multipacks at different prices.',
  },
  {
    productId: 'B0GJSQCJYN',
    slug: 'mak7-4-in-1-pet-grooming-deshedding-brush-for-dogs-and-cats-b0gjsqcjyn',
    name: 'MAK7 4-in-1 Pet Grooming & Deshedding Brush for Dogs and Cats',
    price: 299, mrp: 3000,
    image: 'https://m.media-amazon.com/images/I/51hOk8i9CFL._SX679_.jpg',
    description:
      'Deshedding is a two-stage job and most single brushes only do one of them. The undercoat of a double-coated dog — a Lab, an Indie with a thick winter coat, a Husky in an Indian summer — sheds in clumps that sit trapped under the guard hairs, and a slicker brush glides over the top of that without lifting any of it. A deshedding edge reaches through and pulls the dead undercoat out; the softer heads then finish the guard coat so the dog does not look tufted. Having both in one handle is the actual convenience here, not the head count. Work in the direction of the coat, short strokes, and stop when the tool stops filling — over-brushing the same patch is how you get a bald spot and a dog that hides when it sees the brush. Loose hair caught in the tool is loose hair not on the sofa, which is the honest return on grooming little and often. ₹299 on Amazon, in stock.',
    confirm: 'Confirm the listing reads the 4-in-1 set — the single-head versions are cheaper and are a different product.',
  },
  {
    productId: 'B0F4W9RPZ2',
    slug: 'vaseline-cloud-soft-light-moisturiser-300-ml-b0f4w9rpz2',
    name: 'Vaseline Cloud Soft Light Moisturiser 300 ml',
    price: 292, mrp: 649,
    image: 'https://m.media-amazon.com/images/I/41VRiYYYhaL._SX679_.jpg',
    description:
      'The reason a "light" lotion is worth paying for is compliance, not chemistry. A heavy body lotion in Indian humidity sits on the skin, marks a shirt and gets skipped by the second week, and a lotion nobody applies moisturises nothing. This is the thin, fast-absorbing end of the range — meant for daily use after a shower on skin that is normal to slightly dry rather than for cracked heels in December, which is a different product entirely. Apply it while the skin is still damp: you are trapping the water that is already there, which is most of what a moisturiser does, and on dry skin you get a fraction of the effect. 300 ml at ₹292 works out to about ₹97 per 100 ml, which is the number worth comparing across pack sizes — the 100 ml tubes of the same family rarely land under that. Against a ₹649 list price, in stock and shipped by Amazon.',
    confirm: 'Confirm the listing reads the 300 ml Cloud Soft — the 200 ml and 400 ml packs are priced separately.',
  },
  {
    productId: 'B0GXVBTFJP',
    slug: 'halonix-25w-led-bulb-white-6500k-with-4kv-surge-protection-b0gxvbtfjp',
    name: 'Halonix 25W LED Bulb, White 6500K, with 4kV Surge Protection',
    price: 184, mrp: 599,
    image: 'https://m.media-amazon.com/images/I/51UGIBTuSCL.jpg',
    description:
      'Surge protection is the spec that decides how long an LED bulb lasts on an Indian line, and it is the one nobody reads. An LED is a driver circuit with a light attached; the light almost never fails, the driver does, and what kills the driver is the spike that arrives when the power comes back after a cut. A 4kV rating means the driver is built to absorb that rather than die of it, which is worth more over three years than a few extra lumens. 25W is bright for a single-bulb room — treat it as a living room or kitchen fitting rather than a bedside one. 6500K is cool daylight white, the right colour for a kitchen, a study or a bathroom where you want to see clearly, and the wrong one for a bedroom, where 3000K warm white is what you actually want. B22 pin base, so it drops into a standard Indian holder with no adapter. ₹184 against a ₹599 list price.',
    confirm: 'Confirm the listing reads 25W 6500K cool white — Halonix lists the same body in warm white and at other wattages.',
  },
  {
    productId: 'B0D9NXDW79',
    slug: 'blissbells-modern-3-ring-gold-chandelier-b0d9nxdw79',
    name: 'blissbells Modern 3-Ring Gold Chandelier',
    price: 1479, mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/51k3idLxd+L._SX679_.jpg',
    description:
      'A ring chandelier is bought for the shape it throws on the ceiling, not for lumens, and three concentric rings is the version that reads as a light fixture from below rather than as a hoop. Gold finish rather than chrome, which is the easier one to live with — it warms the light passing through it and does not fingerprint visibly the way polished chrome does. The sensible places for this are above a dining table or in a stairwell drop, where you look up at it and where there is height to give the rings air; in a low room with a fan it competes for the same ceiling. Hang height is the part people get wrong: roughly 75-85 cm above a dining table top, so it lights the table without sitting in your eyeline across it. Installation needs a ceiling hook and an electrician for the point, not a bulb change. ₹1,479 against a ₹1,999 list price on Amazon.',
    confirm: 'Confirm the listing reads the 3 Ring Gold Inner variant — the 2-ring and chrome versions are priced differently.',
  },
  {
    productId: 'B0C81W99ZL',
    slug: 'd-link-33w-dual-port-fast-charger-usb-c-and-usb-a-with-pd-3-0-b0c81w99zl',
    name: 'D-Link 33W Dual Port Fast Charger, USB-C and USB-A, with PD 3.0',
    price: 449, mrp: 3199,
    image: 'https://m.media-amazon.com/images/I/61rDDTKHwJL._SX679_.jpg',
    description:
      'The useful number on a dual-port charger is not the headline wattage, it is how it splits. 33W goes to one port when only one device is plugged in — enough for a PD fast charge on a phone or a fast top-up on a tablet — and divides when both are in use, so plan on one fast charge plus one slow one, never two fast ones. PD 3.0 on the USB-C port is what lets a modern phone negotiate its full charging speed instead of falling back to 5V; the USB-A port is there for the old cable you still own and for earbuds and a watch dock, which do not care. One brick for two devices is the real reason to carry this instead of two chargers, and 33W is the sweet spot for that job — high enough to be fast, small enough to stay a single-plug wall unit. ₹449 against a ₹3,199 list price.',
    confirm: 'Confirm the listing reads the 33W dual-port model — D-Link sells 20W and 65W bricks that look similar.',
  },
  {
    productId: 'B0G4812L84',
    slug: 'amazon-brand-symbol-women-rayon-flared-shorts-with-self-fabric-belt-b0g4812l84',
    name: 'Amazon Brand Symbol Women Rayon Flared Shorts with Self-Fabric Belt',
    price: 323, mrp: 1199,
    image: 'https://m.media-amazon.com/images/I/61drOEpvHSL._SY879_.jpg',
    description:
      'Rayon is the reason to look at these rather than the cut. It drapes like a woven rather than clinging like a jersey, it breathes in heat far better than a poly blend, and on a flared shorts pattern that drape is what keeps the leg opening falling straight instead of ballooning. The trade is care: rayon is weakest when wet, so it wants a gentle wash and a flat dry rather than a spin and a hard line-dry, and it will shrink slightly the first time regardless. The self-fabric belt matters on a flared waist — it is what stops the pattern reading as shapeless, and because it is cut from the same cloth it does not date the way a contrast belt does. Size on the waist, not the hip, on a flared cut. ₹323 against a ₹1,199 list price, in stock on Amazon.',
    confirm: 'Confirm the size and colour on the listing before checkout — the price varies by variant on this style.',
  },
  {
    productId: 'B0DXL1B7DB',
    slug: 'dime-store-engineered-wood-floating-wall-shelves-b0dxl1b7db',
    name: 'Dime Store Engineered Wood Floating Wall Shelves',
    price: 338, mrp: 5999,
    image: 'https://m.media-amazon.com/images/I/51FFph+Xa4L._SX679_.jpg',
    description:
      'Floating shelves earn their place where a standing unit will not fit — above a study table, along a stairwell wall, over a washbasin — because they take zero floor and the wall does the work. Engineered wood is the right expectation setter here: it is flat, it takes a clean laminate finish, and it is dimensionally stable in humidity in a way solid wood is not, but it does not forgive water sitting on it and it does not like being drilled twice in the same hole. That makes the mounting the whole job. Anchor into the wall plug supplied, check it is level before the second bracket goes in, and load it with books, frames, plants and speakers rather than with anything you would not want to catch. Keep heavy items near the bracket ends, not at the middle of the span, which is where an engineered-wood shelf bows first. ₹338 against a ₹5,999 list price.',
    confirm: 'Confirm the pack size and shelf length on the listing — Dime Store sells this shelf in several set sizes.',
  },

  // --- 4 existing rows, stale price fixed. Slugs preserved. ---
  {
    productId: 'B0BP7Y3ZS2',
    slug: 'amazon-basics-undated-2026-planner-a5',
    name: 'Amazon Basics Undated 2026 Planner with Daily, Weekly and Monthly Sections',
    price: 149, mrp: 1999,
    image: 'https://m.media-amazon.com/images/I/41sDUULA4VL.jpg',
    description:
      'Undated is the feature, not a shortcoming. A dated planner bought in September is two-thirds waste paper and a guilt trip; an undated one starts the day you open it and survives the fortnight in March when you stop writing in it, because there are no printed dates sitting empty to shame you back. The three layers — daily, weekly, monthly — are the useful combination: the monthly spread for deadlines and travel, the weekly for what actually has to happen, the daily for the list you work off. Most people only genuinely use two of the three, and which two is personal, so having all three is cheaper than guessing. Paper planners still beat a phone for one specific thing: writing a task down by hand decides whether you meant it, and nothing on a lock screen does that. ₹149 against a ₹1,999 list price on Amazon.',
    confirm: 'Confirm the listing reads the undated 2026 planner — Amazon Basics sells dated and undated versions side by side.',
  },
  {
    productId: 'B0GWMLDVJF',
    slug: 'dove-pro-ceramide-repair-body-serum',
    name: 'Dove Pro-Ceramide + Repair Body Serum Lotion',
    price: 326, mrp: 699,
    image: 'https://m.media-amazon.com/images/I/418O-wwWJvL._SX679_.jpg',
    description:
      'Ceramides are the part of this worth understanding. Skin holds water using a barrier of lipids between the cells, ceramides are the main one, and dry skin is mostly a barrier with gaps in it rather than skin that needs more oil on top. A lotion carrying ceramides is topping up the material the barrier is actually built from, which is why the effect on genuinely dry skin outlasts the application in a way a mineral-oil lotion does not. "Body serum" in the name signals the texture rather than a different category: thinner and faster-absorbing than a classic body butter, so it goes on after a shower without the twenty minutes of tackiness. That is also the right time to use it — damp skin, within a few minutes of towelling off, because you are sealing water in rather than adding it. Elbows, shins and the back of the arms are where the ceramide version earns the price over a plain lotion. ₹326 against a ₹699 list price.',
    confirm: 'Confirm the pack size on the listing — the Pro-Ceramide serum lotion comes in more than one bottle size.',
  },
  {
    productId: 'B0GF81BZ65',
    slug: 'himalaya-turmeric-serum-face-cleanser-180ml-b0gf81bz65',
    name: 'Himalaya Turmeric Serum Cleanser with Niacinamide and Vitamin E',
    price: 160, mrp: 200,
    image: 'https://m.media-amazon.com/images/I/51Gj5wU4DFL._SX679_.jpg',
    description:
      'A serum cleanser is a cleanser first and everything else second, and that is the honest way to judge one: actives in a product you rinse off after forty seconds get a fraction of the contact time they get in a leave-on serum. What they can do in that window is keep the wash itself from stripping the skin, which is where most of the damage from cleansing actually comes from. Turmeric and niacinamide are both pointed at the same thing here — post-inflammatory marks and uneven tone — and vitamin E is there to keep the barrier from feeling tight afterwards. The test for any cleanser is the two minutes after you dry your face: skin that feels squeaky has been stripped, skin that feels normal has been cleaned. Use it morning and night, lukewarm water, and keep the exfoliating step separate rather than expecting the cleanser to do both. ₹160 against a ₹200 list price on Amazon.',
    confirm: 'Confirm the pack size on the listing before checkout — the cleanser is sold in more than one tube size.',
  },
  {
    productId: 'B00JQ4FUW4',
    slug: 'wet-n-wild-color-icon-lip-liner-plumberry-b00jq4fuw4',
    name: 'Wet n Wild Color Icon Lip Liner in Plumberry',
    price: 65, mrp: 225,
    image: 'https://m.media-amazon.com/images/I/51dZuuW3YtL._SX679_.jpg',
    description:
      'A lip liner does two separate jobs and the second is the reason to own one: it draws the edge, and it gives lipstick something to grip so the colour stops migrating into the fine lines around the mouth after an hour. Skipping the liner is the single most common reason a good lipstick looks worn out by lunch. Plumberry is a deep berry-plum — a shade that works as an outline under a red or a wine lipstick, and equally as a full lip on its own with a balm pressed over it, which is the cheapest way to own a berry lip. Creamy rather than dry, so it drags less at the corners, and it wants sharpening to a point rather than a chisel for a clean edge. At ₹65 this is the price of a single-use sachet, for a product that lasts months. Against a ₹225 list price on Amazon.',
    confirm: 'Confirm the shade reads Plumberry — the Color Icon liners are listed shade by shade at different prices.',
  },
];

for (const d of deals) {
  d.storeSlug = 'amazon';
  d.storeName = 'Amazon';
  d.affiliateUrl = `https://www.amazon.in/dp/${d.productId}?th=1&psc=1&tag=ashoksachdev-21`;
  d.discountPct = Math.round((1 - d.price / d.mrp) * 100);
  d.title = `${d.name} at ₹${d.price.toLocaleString('en-IN')} (${d.discountPct}% Off) – Amazon`;
  d.howTo = HOW(d.confirm);
}

// Pre-flight. A hand-typed ₹ in a title that disagrees with the numeric price
// ships a page whose visible copy contradicts its own Product schema.
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com)\//;
const seen = new Set();
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  if (d.discountPct < 20 && d.description.length < 200) throw new Error(`not indexable ${d.productId}`);
  if (!d.slug.endsWith(d.productId.toLowerCase()) && !/^(amazon-basics-undated|dove-pro-ceramide)/.test(d.slug))
    throw new Error(`slug missing productId ${d.productId}`);
  if (seen.has(d.slug) || seen.has(d.productId)) throw new Error(`dup in batch ${d.productId}`);
  seen.add(d.slug); seen.add(d.productId);
}

let created = 0, updated = 0; const slugs = [], fixed = [];
for (const d of deals) {
  const store = await p.store.upsert({
    where: { slug: d.storeSlug },
    update: {},
    create: { slug: d.storeSlug, name: d.storeName },
  });
  const data = {
    slug: d.slug, title: d.title, description: d.description, howTo: d.howTo,
    image: d.image, mrp: d.mrp, price: d.price, discountPct: d.discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500, status: 'LIVE',
    productId: d.productId, affiliateUrl: d.affiliateUrl, storeId: store.id,
  };
  const existing =
    (await p.deal.findUnique({ where: { store_product: { storeId: store.id, productId: d.productId } } })) ??
    (await p.deal.findUnique({ where: { slug: d.slug } }));
  if (existing) {
    await p.deal.update({ where: { id: existing.id }, data });
    if (existing.price !== d.price) await p.priceHistory.create({ data: { dealId: existing.id, price: d.price } });
    updated++; fixed.push(d.slug);
    console.log('UPD', existing.id, `Rs${existing.price}/${existing.mrp} -> Rs${d.price}/${d.mrp} (${d.discountPct}%)`, d.slug);
  } else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug);
    console.log('NEW', row.id, `Rs${d.price}/${d.mrp} ${d.discountPct}%`, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('NEW SLUGS:', slugs.join(' '));
console.log('FIXED SLUGS:', fixed.join(' '));
await p.$disconnect();
