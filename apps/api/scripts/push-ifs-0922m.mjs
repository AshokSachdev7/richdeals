// DEAL-INGEST indiafreestuff tick 2026-09-22m.
// 41 listing cards -> 35 resolved -> 23 DB dups -> 12 fresh -> 7 publishes, 5 rejects.
// Every price below is Amazon PDP truth, never the IFS card number. The card was
// wrong on 9 of 12 (see reports/tick-2026-09-22m-deal-ingest-ifs.md); the mechanism
// is clip-coupons — B0HDPZ94HM card said 549, PDP says 999 with a "45% off coupon
// applied" banner, and 999 * 0.55 = 549.45. The card quotes post-coupon, we quote
// the price the Offer schema can defend.
//
// Rejects: B0GG9VHVGG / B0F4FL29LQ / B09P8K152F all read "Currently unavailable";
// B0GLYZ6TB3 read an EMPTY #availability (a third state, not in-stock) on top of a
// 2319-vs-10048 card divergence; B0GJZY4PT9 read "Only 1 left in stock" and is a
// size sibling of live #10817.
//
// hiRes[0] is VARIANT-dependent — it must be re-read under the same ?th=1&psc=1
// used for the price read. Reconstructing it from an earlier sweep put the wrong
// image on 2 of these 7 (B0BP59HGC7, B0HBXB7MV4). Also: suffixes are not confined
// to _SL1500_/1200/1080/1000 — this batch returned _SL1236_, _SL1445_, _SL1254_,
// so any whitelist regex on the suffix silently drops the image.
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const az = (asin) => `https://www.amazon.in/dp/${asin}?th=1&psc=1&tag=ashoksachdev-21`;

const deals = [
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0BP59HGC7',
    affiliateUrl: az('B0BP59HGC7'),
    slug: 'colgate-gentle-ultrafoam-toothbrush-2pcs-sensitive-toothpaste-combo',
    title: 'Colgate Gentle Ultrafoam Toothbrush 2 Pcs + Sensitive Toothpaste 160g at ₹322 (32% Off) – Amazon',
    description:
      'Oral care is the category where buying the combo actually makes sense, because the two halves are on the same replacement clock — a brush is meant to be retired at three months and a 160g tube runs roughly the same length, so a pack that pairs two brushes with two tubes covers about half a year for one household without a second order. The brush here is the ultra-soft end of the Colgate range rather than the medium most people default to, and that matters if your gums bleed a little when you brush: soft tapered filaments carried at the right angle remove plaque at the gum line, while stiff bristles pushed hard are the usual cause of the receding line people blame on age. The paste is the sensitivity formula, which works by occluding the exposed dentine tubules that make cold water hurt, so it needs consistent twice-daily use rather than a one-off application to do anything. Both carry Indian Dental Association endorsement. ₹322 against a ₹473 bundle list price — the sort of number where stocking up beats a per-item chemist run.',
    image: 'https://m.media-amazon.com/images/I/61axlv57l+L._SL1236_.jpg',
    mrp: 473,
    price: 322,
    discountPct: 32,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the listing reads the 2-brush + twin-pack-toothpaste bundle — Colgate lists several brush counts on near-identical pages at different prices.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0BP4W3JYP',
    affiliateUrl: az('B0BP4W3JYP'),
    slug: 'colgate-gentle-enamel-toothbrush-4pcs-sensitive-toothpaste-combo',
    title: 'Colgate Gentle Enamel Toothbrush 4 Pcs + Sensitive Toothpaste 160g at ₹311 (37% Off) – Amazon',
    description:
      'Four brushes and two tubes is the pack size that fits a family of four rather than a single user, and at roughly ₹78 a brush it is cheaper per unit than buying singles at a chemist counter. The Gentle Enamel brush differs from the more common Ultrafoam in head geometry: a wider head with dual-layer bristles covers more tooth surface per stroke, which suits anyone who brushes quickly and misses the outer molars, while the ultra-soft tapered filaments are the part that protects enamel from the abrasion that hard brushing causes. Enamel does not regrow, so the case for a soft brush is preventive rather than restorative — the damage a stiff brush does over a decade is the thing being avoided. The paired paste is the sensitivity variant, which needs consistent twice-daily use to seal the exposed dentine that makes cold drinks sharp. Replace brushes at three months or sooner if the bristles splay; a flared brush cleans worse than no brush at the gum line. ₹311 against a ₹491 bundle list price.',
    image: 'https://m.media-amazon.com/images/I/61UIcV2fBsL._SL1445_.jpg',
    mrp: 491,
    price: 311,
    discountPct: 37,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the pack reads 4 brushes + twin-pack toothpaste — the 2-brush version is a separate listing at a different price.',
      'Prices move fast — add to cart and check out while it holds.',
      'Deal auto-applies at checkout; no coupon code needed.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0GHMS8C9V',
    affiliateUrl: az('B0GHMS8C9V'),
    slug: 'go-well-herbal-bamboo-vinegar-foot-pads-10-pieces',
    title: 'GO WELL Herbal Bamboo Vinegar Foot Pads, 10 Pieces at ₹179 (64% Off) – Amazon',
    description:
      'Worth being straight about what these are: adhesive pads holding a bamboo-vinegar and herb powder that you stick to the soles before bed and peel off in the morning. The pads darken overnight, and the marketing across this entire category reads that as toxins being drawn out — it is not. The powder is hygroscopic, it absorbs the sweat your feet produce inside an occlusive patch, and that is what the colour change is. No detox claim here survives contact with evidence, and anyone selling one is selling a story. What the pads do deliver is real but smaller: a warm, mildly astringent patch held against the sole for eight hours, which people find pleasant after a day standing, and a dry-feeling foot in the morning. If that is what you want, ₹179 for ten pads is a reasonable price for five nights. If you have diabetes, neuropathy or any break in the skin on your feet, do not put an adhesive occlusive patch on them without asking a doctor first. ₹179 against a ₹499 list price.',
    image: 'https://m.media-amazon.com/images/I/61a18SzLReL._SL1000_.jpg',
    mrp: 499,
    price: 179,
    discountPct: 64,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the listing reads Pack of 1 / 10 pieces — larger multipacks are priced separately.',
      'Skip this if you have diabetes, reduced foot sensation or broken skin — check with a doctor before using any adhesive foot patch.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0HDPZ94HM',
    affiliateUrl: az('B0HDPZ94HM'),
    slug: 'pascia-rgb-neon-rope-light-16-4ft-app-remote',
    title: 'PASCIA RGB Neon Rope Light, 16.4ft with App + Remote at ₹999 (66% Off) – Amazon',
    description:
      'Neon rope is the LED format that reads as a continuous glowing line instead of a row of visible dots, which is the whole reason it looks like signage and a bare strip looks like a strip. The silicone jacket diffuses the emitters along its length, so it photographs well against a wall — the actual reason most of these get bought for a gaming desk or a bedroom corner. Sixteen and a half feet covers one wall run or a desk perimeter with slack; two walls needs two. It is bendable side-to-side but not sharply, so plan curves rather than corners, and cut only at the marked points if you trim it. Control is app plus remote over the usual RGB colour wheel and effect presets. Two practical notes: the adhesive backing on this class of light gives up on distempered or textured Indian walls within a few weeks, so buy a strip of mounting clips, and the IP67 rating covers splashes, not submersion. ₹999 against a ₹2,899 list price, and the listing was carrying a clippable coupon on top.',
    image: 'https://m.media-amazon.com/images/I/71KMBEQX1TL._SL1500_.jpg',
    mrp: 2899,
    price: 999,
    discountPct: 66,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Look for a "clip coupon" checkbox above the Buy button — this listing was running an extra 45% off coupon that only applies if you tick it before adding to cart.',
      'Check the length variant reads 16.4ft; shorter and longer runs are priced differently on the same page.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0G3GW9HFL',
    affiliateUrl: az('B0G3GW9HFL'),
    slug: 'callas-shoe-rack-storage-bench-10-pairs-5-tier',
    title: 'Callas 5-Tier Shoe Rack Storage Bench, Holds 10 Pairs at ₹3839 (52% Off) – Amazon',
    description:
      'A shoe rack that doubles as a bench solves the actual problem at an Indian front door, which is not storage but the thirty seconds of balancing on one leg while a strap goes on. The padded seat is the feature; the ten-pair capacity is the specification. Worth reading the layout before ordering: five tiers split into an open bottom shelf and a closed cabinet above, which is the right way round — everyday footwear goes in the open shelf where you can reach it without opening a door, and the cabinet takes the pairs you wear monthly and would rather not see. Closed storage does need airflow, so leave damp shoes out overnight before shutting them in, otherwise the cabinet holds the smell. Ten pairs assumes flats and sneakers; boots and heels eat the vertical clearance faster. Engineered wood body, so keep it off a wall that gets monsoon seepage. Assembly is on you and takes the better part of an hour. ₹3,839 against a ₹7,999 list price, in brown, model SR-15.',
    image: 'https://m.media-amazon.com/images/I/71bppoAgBlL._SL1500_.jpg',
    mrp: 7999,
    price: 3839,
    discountPct: 52,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Confirm the variant reads Brown / SR-15 — other finishes and capacities on the Callas page are priced higher.',
      'Measure your entryway width before ordering; a bench-depth rack blocks a narrow passage.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0HBXB7MV4',
    affiliateUrl: az('B0HBXB7MV4'),
    slug: 'rk-aqua-fresh-ro-uv-uf-tds-water-purifier-12l',
    title: 'R.K. Aqua Fresh RO+UV+UF+TDS Water Purifier, 12L at ₹4559 (82% Off) – Amazon',
    description:
      'The number that decides whether you need this unit is your incoming TDS, and it is worth measuring rather than guessing — a cheap TDS meter costs a few hundred rupees. Below about 200 ppm an RO membrane strips minerals you wanted and wastes water for no benefit; above 500 ppm, which is most borewell and a lot of tanker supply in Indian cities, RO is the only stage that actually brings dissolved salts down. This one stacks the full set: RO for dissolved solids, UV for bacterial and viral load, UF for turbidity, and a TDS adjuster that blends a little unfiltered water back in so the output is not flat-tasting. A 100 GPD membrane and 12-litre tank is sized for a family rather than a single person. Budget for the real running cost before the sticker price: membrane and filter changes run yearly and are most of what a purifier costs over five years, and a high-TDS input shortens membrane life. ₹4,559 against a ₹24,999 list price — that MRP is Amazon\'s own field and reads inflated, so judge the ₹4,559 on its own.',
    image: 'https://m.media-amazon.com/images/I/71ZN4Va-BkL._SL1254_.jpg',
    mrp: 24999,
    price: 4559,
    discountPct: 82,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Measure your tap water TDS first — below ~200 ppm an RO stage costs you minerals and water for no gain.',
      'Ask the seller what an annual filter + membrane service costs in your city before ordering; it is the larger half of the five-year bill.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
  {
    storeSlug: 'amazon',
    storeName: 'Amazon',
    productId: 'B0F1VBXD82',
    affiliateUrl: az('B0F1VBXD82'),
    slug: 'raddzy-foldable-pilates-reformer-home-gym-board',
    title: 'RADDZY Foldable Pilates Reformer Home Gym Board at ₹6459 (35% Off) – Amazon',
    description:
      'A reformer board is not a studio reformer, and the gap is worth naming before six thousand rupees changes hands: a real reformer runs a wheeled carriage on a rail under spring tension, while this is a flat board with a sliding platform and resistance bands. The movement pattern is close enough for footwork, leg circles and the ab series to transfer; anything that needs true carriage travel under load does not. What it is good at is the thing a studio cannot be, which is available at 6am in a flat with no commute — and the foldable frame is the difference between a board that gets used and one that lives behind a cupboard. The 330 lb rating means the frame is not the limit for most users; the bands are. Two honest cautions: resistance bands lose tension in eight to twelve months of regular use and are the consumable here, and Pilates is a form-dependent discipline where a few sessions with an instructor before working solo prevents the lower-back complaints that usually follow self-taught practice. ₹6,459 against a ₹9,999 list price.',
    image: 'https://m.media-amazon.com/images/I/71z7buy98jL._SL1500_.jpg',
    mrp: 9999,
    price: 6459,
    discountPct: 35,
    howTo: [
      'Tap Grab Deal to open the product on Amazon.in at the live price.',
      'Check the folded dimensions against your storage space — the board is long, and folding shortens it rather than making it small.',
      'Confirm what the box includes; band sets and accessory counts differ between variants on this listing.',
      'Prices move fast — add to cart and check out while it holds.',
    ],
  },
];

// Pre-flight. A hand-typed ₹ in a title that disagrees with the numeric price
// ships a page whose visible copy contradicts its own Product schema.
const HOSTS = /^https:\/\/(m\.media-amazon\.com|rukmini\d?\.flixcart\.com|img\.tatacliq\.com)\//;
for (const d of deals) {
  const t = +(d.title.match(/₹([\d,]+)/) || [])[1].replace(/,/g, '');
  if (t !== d.price) throw new Error(`title/price mismatch ${d.productId}: title ${t} vs price ${d.price}`);
  if (d.price >= d.mrp) throw new Error(`no discount ${d.productId}`);
  if (!HOSTS.test(d.image)) throw new Error(`bad image host ${d.productId}`);
  const pct = Math.round((1 - d.price / d.mrp) * 100);
  if (Math.abs(pct - d.discountPct) > 1) throw new Error(`discountPct off ${d.productId}: computed ${pct} vs ${d.discountPct}`);
}

let created = 0, updated = 0; const slugs = [];
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
  if (existing) { await p.deal.update({ where: { id: existing.id }, data }); updated++; console.log('UPD', existing.id, d.slug); }
  else {
    const row = await p.deal.create({ data });
    await p.priceHistory.create({ data: { dealId: row.id, price: d.price } });
    created++; slugs.push(d.slug); console.log('NEW', row.id, d.slug);
  }
}
console.log(`\ncreated=${created} updated=${updated}`);
console.log('SLUGS:', slugs.join(' '));
await p.$disconnect();
