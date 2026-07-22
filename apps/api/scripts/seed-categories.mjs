// Seed the 12 SHOPPING_CATEGORY categories. Idempotent (upsert by type+slug).
// Run: node scripts/seed-categories.mjs  (from apps/api)
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// node doesn't auto-load .env for scripts; read DATABASE_URL ourselves and
// cap the pool (DB connection limit is tight — see CLAUDE.md).
const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', '.env');
const url =
  readFileSync(envPath, 'utf8').match(/^DATABASE_URL="?(.+?)"?$/m)[1] +
  '&connection_limit=3&pool_timeout=20';
const p = new PrismaClient({ datasources: { db: { url } } });

const CATEGORIES = [
  ['Electronics', 'electronics'],
  ['Mobiles', 'mobiles'],
  ['Fashion', 'fashion'],
  ['Footwear', 'footwear'],
  ['Home & Kitchen', 'home-kitchen'],
  ['Appliances', 'appliances'],
  ['Beauty & Grooming', 'beauty-grooming'],
  ['Grocery & Gourmet', 'grocery-gourmet'],
  ['Toys & Baby', 'toys-baby'],
  ['Sports & Fitness', 'sports-fitness'],
  ['Books & Stationery', 'books-stationery'],
  ['Accessories', 'accessories'],
];

let done = 0;
for (const [name, slug] of CATEGORIES) {
  await p.category.upsert({
    where: { type_slug: { type: 'SHOPPING_CATEGORY', slug } },
    update: { name },
    create: { name, slug, type: 'SHOPPING_CATEGORY' },
  });
  done++;
  console.log(`  upserted: ${slug}`);
}
await p.$disconnect();
console.log(`DONE: ${done} categories seeded`);
