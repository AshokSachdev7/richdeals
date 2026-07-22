/**
 * Imports ingest-agent JSON files from data/deals/*.json into Postgres.
 * Idempotent: upserts Store by slug and Deal by (storeId, productId) or slug.
 * Run: npm run import:deals -w @deals/api
 */
import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient, DealStatus } from '@prisma/client';

// Minimal .env loader — PrismaClient (unlike the prisma CLI) does not read .env.
// ponytail: hand-rolled parse; swap for dotenv only if the file grows options.
function loadEnv(file: string) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    const key = m[1];
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

const DATA_DIR = path.resolve(__dirname, '../../../data/deals');

interface DealFile {
  slug: string;
  sourceSlug?: string;
  title: string;
  description?: string | null;
  howTo?: string[];
  image?: string | null;
  store: string;
  mrp?: number | null;
  price?: number | null;
  discountPct?: number | null;
  couponCode?: string | null;
  couponNote?: string | null;
  productId?: string | null;
  affiliateUrl: string;
  status?: string;
}

const STATUS_MAP: Record<string, DealStatus> = {
  'pending-review': DealStatus.PENDING_REVIEW,
  draft: DealStatus.DRAFT,
  live: DealStatus.LIVE,
  expired: DealStatus.EXPIRED,
};

function mapStatus(s?: string): DealStatus {
  return (s ? STATUS_MAP[s] : undefined) ?? DealStatus.PENDING_REVIEW;
}

function toStoreSlug(store: string): string {
  return store.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function titleCase(s: string): string {
  return s.replace(/(^|[\s-])(\w)/g, (_, p, c) => p + c.toUpperCase());
}

async function main() {
  loadEnv(path.resolve(__dirname, '../.env'));
  const prisma = new PrismaClient();

  if (!fs.existsSync(DATA_DIR)) {
    console.log(`No data dir at ${DATA_DIR} — nothing to import.`);
    await prisma.$disconnect();
    return;
  }

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'index.json');

  let imported = 0;
  let skipped = 0;
  const storeCache = new Map<string, number>();

  for (const file of files) {
    let data: DealFile;
    try {
      data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
    } catch (e) {
      console.warn(`skip ${file}: invalid JSON`);
      skipped++;
      continue;
    }

    if (!data.title || !data.affiliateUrl || !data.slug || !data.store) {
      console.warn(`skip ${file}: missing required fields`);
      skipped++;
      continue;
    }

    // Upsert store by slug.
    const storeSlug = toStoreSlug(data.store);
    let storeId = storeCache.get(storeSlug);
    if (storeId === undefined) {
      const store = await prisma.store.upsert({
        where: { slug: storeSlug },
        update: {},
        create: { slug: storeSlug, name: titleCase(data.store) },
      });
      storeId = store.id;
      storeCache.set(storeSlug, storeId);
    }

    const dealData = {
      slug: data.slug,
      sourceSlug: data.sourceSlug ?? null,
      title: data.title,
      description: data.description ?? null,
      howTo: data.howTo ?? [],
      image: data.image ?? null,
      mrp: data.mrp ?? null,
      price: data.price ?? null,
      discountPct: data.discountPct ?? null,
      couponCode: data.couponCode ?? null,
      couponNote: data.couponNote ?? null,
      status: mapStatus(data.status),
      productId: data.productId ?? null,
      affiliateUrl: data.affiliateUrl,
      storeId,
    };

    // Match an existing row by (storeId, productId) first, then by unique slug.
    const existing =
      (data.productId
        ? await prisma.deal.findUnique({
            where: { store_product: { storeId, productId: data.productId } },
          })
        : null) ?? (await prisma.deal.findUnique({ where: { slug: data.slug } }));

    if (existing) {
      // Preserve human/DB state: never downgrade an approved status back to
      // pending-review, and never null out an image we already fetched.
      const { status: _s, image: _i, ...rest } = dealData;
      const update: Record<string, unknown> = { ...rest };
      if (data.image) update.image = data.image; // only overwrite with a real image
      await prisma.deal.update({ where: { id: existing.id }, data: update });
    } else {
      await prisma.deal.create({ data: dealData });
    }
    imported++;
  }

  console.log(`Imported ${imported} deal(s), skipped ${skipped}, from ${files.length} file(s).`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
