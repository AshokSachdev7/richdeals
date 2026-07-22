// Auto-assign LIVE deals to 1-2 SHOPPING_CATEGORY categories by keyword-matching
// the deal title. Idempotent (createMany skipDuplicates). Deals matching nothing
// are left uncategorized. Run: node scripts/assign-categories.mjs  (from apps/api)
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', '.env');
const url =
  readFileSync(envPath, 'utf8').match(/^DATABASE_URL="?(.+?)"?$/m)[1] +
  '&connection_limit=3&pool_timeout=20';
const p = new PrismaClient({ datasources: { db: { url } } });

// Priority order: most specific first so "redmi phone" -> mobiles (not electronics),
// "running shoe" -> footwear (not fashion). Each deal takes at most the first 2.
const RULES = [
  // \bphone\b so "headphone"/"earphone" don't false-match into mobiles.
  ['mobiles', /\bphone\b|smartphone|redmi|iphone|samsung galaxy|oneplus|realme|\bvivo\b|\boppo\b|\bpoco\b|moto\b|nothing phone/],
  ['appliances', /fridge|refrigerator|washing machine|\bac\b|air conditioner|microwave|geyser|water heater|air fryer|vacuum|chimney|dishwasher|cooler/],
  ['footwear', /shoe|sneaker|sandal|slipper|flip.?flop|loafer|\bheel|\bboot/],
  ['beauty-grooming', /cream|shampoo|lipstick|serum|perfume|deodorant|trimmer|face wash|moisturi|sunscreen|kajal|foundation|conditioner|\bnykaa/],
  ['toys-baby', /\btoy\b|\bkids\b|\bbaby\b|\bdoll\b|diaper|stroller|\blego\b|puzzle/],
  ['sports-fitness', /treadmill|dumbbell|\byoga\b|cricket|football|\bgym\b|protein|fitness|\bcycle\b|badminton|skipping|sports/],
  ['books-stationery', /\bbook\b|\bpen\b|notebook|stationery|diary|pencil|marker/],
  ['grocery-gourmet', /\batta\b|\boil\b|coffee|snack|biscuit|dry fruit|almond|cashew|\btea\b|chocolate|honey|masala|\bghee\b|juice|\bnuts\b/],
  ['electronics', /laptop|headphone|earbud|earphone|\btv\b|monitor|\bmouse\b|keyboard|speaker|smartwatch|tablet|\bipad\b|router|\bssd\b|pendrive|power bank|charger|neckband|\bwatch\b/],
  ['fashion', /shirt|t-?shirt|jeans|kurta|dress|saree|\btop\b|trouser|jacket|hoodie|leggings|innerwear|nightwear/],
  ['home-kitchen', /kitchen|cookware|bottle|container|mixer|grinder|\bpan\b|kadai|pressure cooker|dinner set|bedsheet|curtain|storage box/],
  ['accessories', /\bwallet\b|\bbelt\b|sunglass|backpack|handbag|jewel|earring|necklace|\bbag\b/],
];

const cats = await p.category.findMany({ where: { type: 'SHOPPING_CATEGORY' } });
const idBySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id]));
for (const [slug] of RULES) {
  if (!idBySlug[slug]) throw new Error(`Category not seeded: ${slug} (run seed-categories.mjs first)`);
}

// Clear prior shopping-category assignments so re-runs fully re-derive (fixes
// stale matches from earlier keyword rules). Only touches these 12 categories.
const cleared = await p.dealCategory.deleteMany({
  where: { categoryId: { in: cats.map((c) => c.id) } },
});
console.log(`Cleared ${cleared.count} prior assignments`);

const counts = Object.fromEntries(RULES.map(([slug]) => [slug, 0]));
let cursor = 0;
let scanned = 0;
let uncategorized = 0;
const rows = [];

for (;;) {
  const batch = await p.deal.findMany({
    where: { status: 'LIVE', id: { gt: cursor } },
    select: { id: true, title: true },
    orderBy: { id: 'asc' },
    take: 200,
  });
  if (batch.length === 0) break;
  cursor = batch[batch.length - 1].id;
  scanned += batch.length;

  for (const d of batch) {
    const t = d.title.toLowerCase();
    const matched = [];
    for (const [slug, re] of RULES) {
      if (re.test(t)) {
        matched.push(slug);
        if (matched.length === 2) break;
      }
    }
    if (matched.length === 0) {
      uncategorized++;
      continue;
    }
    for (const slug of matched) {
      counts[slug]++;
      rows.push({ dealId: d.id, categoryId: idBySlug[slug] });
    }
  }
}

// One bulk insert; skipDuplicates makes re-runs safe.
const res = await p.dealCategory.createMany({ data: rows, skipDuplicates: true });
await p.$disconnect();

console.log(`Scanned ${scanned} LIVE deals`);
console.log(`Assignments written (new): ${res.count} / attempted ${rows.length}`);
console.log(`Uncategorized: ${uncategorized}`);
console.log('Per-category matches:');
for (const [slug, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${slug.padEnd(18)} ${n}`);
}
