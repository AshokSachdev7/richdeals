// TELEGRAM-DEAL-MONITOR tick 2026-09-24c
//
// ONLINE SHOPPING DEALS burst: 19 link.amazon posts -> 17 new vs tg-multi-seen -> 14 after DB
// productId dedup. PDP-read all 14 in the logged-in Amazon tab; 7 pass.
// Rejected: shower cap (₹99 posted, ₹127 live), Skechers (₹10,214 live), gym towel (₹378 vs ₹179),
// Puma Vellfire (unavailable), LOYKA hamper (no buy box), anjeer figs (perishable food),
// TRIXY chandelier (₹399 vs ₹24,999 M.R.P. — price glitch, orders likely cancelled).
//
// Writes a {deals:[...]} payload for POST /admin/deals/bulk (status live).
import { writeFileSync } from 'node:fs';

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const inr = (n) => n.toLocaleString('en-IN');
const IMG = (id) => `https://m.media-amazon.com/images/I/${id}`;

const STD_HOWTO = (what, variant) => [
  `Tap Grab Deal to open the ${what} on Amazon.in at the live price.`,
  variant,
  'Add to cart and check out. Amazon prices and stock move without notice, so confirm the figure on the product page still matches what is shown here.',
  'Nothing to apply on our side — no coupon, no code, no cashback step. The discount is already in the listed price.',
];

const AMZ = [
  {
    productId: 'B073X4H6BG', name: "Amazon Brand Symbol Men's Cotton Rich Solid Polo T-Shirt",
    price: 199, mrp: 1099, image: IMG('710vk255SSL._SL1500_.jpg'),
    description: [
      "A plain polo is the one T-shirt that works for both a casual Friday at the office and a weekend out. The collar and button placket make it look a notch smarter than a round-neck tee, while the knit keeps it as easy to wear as one.",
      "This one comes from Symbol, Amazon's own menswear label. It is a cotton-rich solid polo with half sleeves, a ribbed collar and a regular fit, so it sits straight on the body rather than hugging it. Symbol sells the same polo in a long run of solid colours, which makes it an easy buy-several basic.",
      "Sizing on regular-fit polos runs true for most buyers, but check the size chart against a polo you already own — chest width matters more than the S/M/L letter. Wash dark colours inside out in cold water the first few times to keep the shade from fading, and skip the tumble dryer to avoid shrinkage in a cotton-rich knit.",
      `Live Amazon price is ₹${inr(199)} against an M.R.P. of ₹${inr(1099)} — 82% off, In stock.`,
    ],
    howTo: STD_HOWTO('Symbol polo T-shirt', 'Pick your colour and size on the product page — Symbol prices each colour and size separately, so the ₹199 figure may apply only to some combinations.'),
  },
  {
    productId: 'B09P6F3MDB', name: 'ishro home 3D Printed Anti-Skid Bedside Runner Carpet',
    price: 299, mrp: 3899, image: IMG('71C15xMHWXL._SL1200_.jpg'),
    description: [
      "A runner is the cheapest way to take the chill off a cold floor where you actually stand: beside the bed, in front of the kitchen counter, or along a hallway. It also catches the grit and water that would otherwise track across the rest of the room.",
      "This ishro home runner has a 3D-printed top on a velvet-feel cloth and a rubber latex backing meant to grip the floor, so it stays put on tiles or stone even when the floor is damp. The brand lists it as machine washable, wrinkle resistant and waterproof, and pitches it for the bedroom, kitchen, living room or an office entrance.",
      "Measure the spot before ordering, because runners are long and narrow and the listing offers more than one size and print. Rubber-backed mats last longer if you wash them on a gentle cycle and air-dry them flat rather than in a hot dryer, which can crack the backing over time.",
      `Live Amazon price is ₹${inr(299)} against an M.R.P. of ₹${inr(3899)} — 92% off, In stock.`,
    ],
    howTo: STD_HOWTO('ishro home runner carpet', 'Check the size and print selected on the product page before adding to cart — other sizes on the same listing are priced differently.'),
  },
  {
    productId: 'B00K5KC2E2', name: 'Organic India Triphala Powder 100g',
    price: 120, mrp: 240, image: IMG('61f0N1l3lxL._SL1500_.jpg'),
    description: [
      "Triphala is one of the best-known Ayurvedic blends in Indian homes: a mix of three dried fruits — amalaki, bibhitaki and haritaki — traditionally taken for digestion. Organic India, now a Tata Consumer brand, sells it as a loose powder.",
      "This is the 100g pack. The brand describes it as made from certified organic ingredients, free of artificial additives, and produced in a LEED Platinum certified facility with batch testing. It is usually stirred into warm water, often at night; follow the dosage printed on the pack rather than a generic figure.",
      "It is a herbal supplement, not a medicine. Anyone who is pregnant, nursing, on regular medication or managing a digestive condition should check with a doctor before taking it daily. Keep the pouch sealed tight after opening — loose powders pick up moisture and clump in humid weather.",
      `Live Amazon price is ₹${inr(120)} against an M.R.P. of ₹${inr(240)} — 50% off, In stock.`,
    ],
    howTo: STD_HOWTO('Organic India Triphala powder', 'Make sure the 100g pack is selected — Organic India lists capsule and larger pack options at different prices.'),
  },
  {
    productId: 'B0GYXBHKRK', name: "BHARVITA Women's Cotton Embroidered Anarkali Kurta, Palazzo and Dupatta Set",
    price: 835, mrp: 2199, image: IMG('71a1tEol1WL._SL1440_.jpg'),
    description: [
      "A three-piece Anarkali set solves the what-to-wear question for festivals, pujas and family functions in one order: the flared kurta, matching palazzo and dupatta are already coordinated, so there is nothing to pair up.",
      "This BHARVITA set is cotton with embroidery on the kurta, which keeps it breathable for long days of Diwali visiting and daytime functions, when heavier fabrics get uncomfortable. The Anarkali cut flares from the waist, and the wide palazzo keeps the whole look easy to move in.",
      "Stock at this price is thin — the product page showed only one piece left in the size read — so check your size first. Compare the brand's size chart against a kurta you already own, since Anarkali fits are judged at the bust and shoulder. Hand-wash or use a gentle cycle, and wash separately the first time in case the dye bleeds.",
      `Live Amazon price is ₹${inr(835)} against an M.R.P. of ₹${inr(2199)} — 62% off, In stock.`,
    ],
    howTo: STD_HOWTO('BHARVITA Anarkali kurta set', 'Select your size on the product page — stock was down to the last piece when this was checked, and other sizes may be priced differently or sold out.'),
  },
  {
    productId: 'B0GQXYPFSX', name: 'Caffiora Instant Black Coffee Liquid Concentrate 5 x 20ml Sachets',
    price: 89, mrp: 219, image: IMG('71Qt-fj8IUL._SL1254_.jpg'),
    description: [
      "Liquid coffee concentrate sits between instant powder and a proper brew: no machine, no grinder, but a smoother cup than most jar instant. Tear a sachet, add water or milk, and it is ready.",
      "Caffiora packs its concentrate in five single-serve 20ml sachets. The brand describes it as a 100% Arabica coffee extract with no chicory, no added sugar and no preservatives. The suggested mix is one sachet to about 80ml of hot water for black coffee, or cold milk and ice for an iced coffee.",
      "At this price the five-pack works best as a trial — enough to find out whether you like concentrate before committing to a bigger box. Because each sachet is sealed separately, they suit an office drawer, a travel bag or a gym kit. Check the best-before date on delivery, as with any food product, and add sugar or milk to taste since the base is unsweetened.",
      `Live Amazon price is ₹${inr(89)} against an M.R.P. of ₹${inr(219)} — 59% off, In stock.`,
    ],
    howTo: STD_HOWTO('Caffiora coffee concentrate', 'Confirm the 5 x 20ml pack is selected — larger sachet counts on the same listing are priced separately.'),
  },
  {
    productId: 'B0D3L77Z46', name: 'Bagsy Malone Handcrafted Tote Bag and Handbag Set of 2, Croco Pink',
    price: 263, mrp: 2999, image: IMG('71gisfvDHeL._SL1500_.jpg'),
    description: [
      "A two-bag set covers two jobs at once: a roomy tote for the office or college that swallows a water bottle, a charger and a notebook, and a smaller handbag for days when you only carry a phone and a wallet.",
      "This Bagsy Malone set is made of synthetic material with a croco-textured finish in pink. Both bags close with a zip and carry by the handles. The brand pitches it for office, college and casual outings, and as a gift for birthdays or anniversaries.",
      "Synthetic croco-finish bags are easy to care for — wipe them with a dry or barely damp cloth, and keep them away from direct heat, which can make the coating crack. Check the listing dimensions against what you carry daily, since tote sizes vary a lot between brands. Stuff the bags with paper when storing them so they keep their shape, and avoid overloading the handles with a laptop every day — handle stitching is where budget totes give way first.",
      `Live Amazon price is ₹${inr(263)} against an M.R.P. of ₹${inr(2999)} — 91% off, In stock.`,
    ],
    howTo: STD_HOWTO('Bagsy Malone tote bag set', 'This price was read on the Croco Pink colour. Bagsy Malone prices each colour separately, so another shade may cost more.'),
  },
  {
    productId: 'B0BHWQFSDK', name: "Layer'r Wottagirl Wildberry Chamomile & Rose Shower Gel 300ml x 2",
    price: 370, mrp: 782, image: IMG('51YYfplfq1L._SL1080_.jpg'),
    description: [
      "Layer'r Wottagirl is best known for its body mists, and the shower gels are built to layer with them: wash with the same scent family, then spray, so the fragrance lasts longer through the day.",
      "This is a twin pack of two 300ml bottles in the Wildberry Chamomile & Rose variant, with vitamin E. The brand lists the gels as paraben-free, vegan-friendly, cruelty-free and suited to daily use on all skin types. Use it on a wet loofah or in the palms, lather, and rinse off.",
      "Anyone with sensitive skin should patch-test a new fragrance first, since scented washes are a common trigger for irritation. Buying it as a twin pack is the cheaper way to keep a spare, and it sits well alongside a matching Wottagirl mist as a small gift. Keep the bottles closed and out of direct sunlight in the bathroom — heat and light fade fragrance oils faster than most people expect, so a gel stored on a sunny windowsill loses its scent well before it runs out.",
      `Live Amazon price is ₹${inr(370)} against an M.R.P. of ₹${inr(782)} — 53% off, In stock.`,
    ],
    howTo: STD_HOWTO("Layer'r Wottagirl shower gel twin pack", 'Check that the 300ml x 2 pack in the Wildberry Chamomile & Rose variant is selected — other scents and single bottles are priced differently.'),
  },
];

// ------------------------------------------------------------------- derive + gate
const out = [];
for (const d of AMZ) {
  const description = d.description.join('\n\n');
  const discountPct = Math.round((1 - d.price / d.mrp) * 100);
  const row = {
    slug: `${kebab(d.name).slice(0, 80).replace(/-+$/, '')}-${d.productId.toLowerCase()}`,
    title: `${d.name} at ₹${inr(d.price)} (${discountPct}% Off) – Amazon`,
    description, howTo: d.howTo, image: d.image,
    price: d.price, mrp: d.mrp, discountPct,
    isSuper: d.price <= 250, isHot: d.price <= 500,
    status: 'live', store: 'Amazon', productId: d.productId,
    affiliateUrl: `https://www.amazon.in/dp/${d.productId}?tag=ashoksachdev-21`,
  };
  const t = Number(row.title.match(/₹([\d,]+)/)[1].replace(/,/g, ''));
  if (t !== row.price) throw new Error(`title/price mismatch ${d.productId}`);
  if (row.price >= row.mrp) throw new Error(`no discount ${d.productId}`);
  if (!/^https:\/\/m\.media-amazon\.com\//.test(row.image)) throw new Error(`bad image host ${d.productId}`);
  if (/_(SX\d+|SY\d+)_/.test(row.image)) throw new Error(`thumbnail ${d.productId}`);
  if (description.length < 900) throw new Error(`description too thin ${d.productId}: ${description.length}`);
  if (row.howTo.length !== 4) throw new Error(`howTo not 4 steps ${d.productId}`);
  const pctLine = description.match(/— (\d+)% off/);
  if (!pctLine || Number(pctLine[1]) !== discountPct) throw new Error(`pct line ${d.productId}: ${pctLine?.[1]} vs ${discountPct}`);
  out.push(row);
}
if (new Set(out.map((r) => r.slug)).size !== out.length) throw new Error('duplicate slug');

const file = process.argv[2] ?? 'tg-0924c-payload.json';
writeFileSync(file, JSON.stringify({ deals: out }));
console.log(`pre-flight OK, ${out.length} rows -> ${file}`);
console.log(`SLUGS: ${out.map((r) => r.slug).join(' ')}`);
