// Insert blog posts that were written as split files: <slug>.md (body) + <slug>.meta.json.
// Used to recover posts whose combined JSON had unescaped control chars.
// Usage: cd apps/api && node scripts/insert-blog-mdmeta.mjs <dir> <slug> [<slug> ...]
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const [dir, ...slugs] = process.argv.slice(2);
if (!dir || !slugs.length) { console.error('usage: node scripts/insert-blog-mdmeta.mjs <dir> <slug>...'); process.exit(1); }

const url = (process.env.DATABASE_URL || '') + (process.env.DATABASE_URL?.includes('?') ? '&' : '?') + 'connection_limit=1';
const p = new PrismaClient({ datasources: { db: { url } } });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function withRetry(fn, label) {
  for (let i = 0; i < 8; i++) {
    try { return await fn(); }
    catch (e) {
      if (!/Too many database connections|connection slots|P1001|Timed out/i.test(e.message) || i === 7) throw e;
      const wait = 2000 + i * 1500;
      console.error(`  retry ${label} (${i + 1}/8) after ${wait}ms: slots full`);
      await sleep(wait);
    }
  }
}

// Hard rule is 2-3 posts/day, never >4. On 2026-07-27 thirteen shipped in one
// day because nothing counted. Guard here (not in the agent) since every
// publish path is required to go through this script for the IndexNow ping.
// ponytail: counts createdAt, so a re-run that only updates an old post is
// still blocked — set BLOG_FORCE=1 for a deliberate backfill.
const istNow = new Date(Date.now() + 19800000);
const dayStart = new Date(
  Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate()) - 19800000,
);
const todayCount = await withRetry(
  () => p.post.count({ where: { createdAt: { gte: dayStart } } }),
  'day-count',
);
if (!process.env.BLOG_FORCE && todayCount + slugs.length > 4) {
  console.error(
    `REFUSED: ${todayCount} posts already published today (IST) + ${slugs.length} requested > cap 4. BLOG_FORCE=1 to override.`,
  );
  await p.$disconnect();
  process.exit(1);
}

const now = new Date();
const ok = [];
for (const slug of slugs) {
  const body = readFileSync(join(dir, `${slug}.md`), 'utf8');
  const meta = JSON.parse(readFileSync(join(dir, `${slug}.meta.json`), 'utf8'));
  const { tags = [], ...m } = meta;
  const data = {
    slug: m.slug || slug, title: m.title, body,
    excerpt: m.excerpt ?? null, seoTitle: m.seoTitle ?? null, seoDesc: m.seoDesc ?? null,
  };
  const row = await withRetry(() => p.post.upsert({
    where: { slug: data.slug },
    // only write cover when meta carries one — gen-blog-covers.mjs writes it back to the DB, not the meta file,
    // so a re-publish of an existing slug must NOT null the live cover
    update: { ...data, ...(m.cover ? { cover: m.cover } : {}), publishedAt: now },
    create: { ...data, cover: m.cover ?? null, author: 'RichDeals Editorial', publishedAt: now },
  }), data.slug);
  for (const t of tags) {
    const ts = String(t).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!ts) continue;
    const tag = await withRetry(() => p.tag.upsert({ where: { slug: ts }, update: {}, create: { slug: ts, name: ts.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) } }), `tag:${ts}`);
    await withRetry(() => p.postTag.upsert({ where: { postId_tagId: { postId: row.id, tagId: tag.id } }, update: {}, create: { postId: row.id, tagId: tag.id } }), `postTag:${ts}`);
  }
  ok.push(data.slug);
  console.log(`  upserted: ${data.slug} (id ${row.id}, ${body.length} chars, ${tags.length} tags)`);
}
await p.$disconnect();

const KEY = '33f3a9d63ca15676bbd90586ea80e65f', BASE = 'https://richdeals.in';
const urlList = ['/blog', ...ok.map((s) => `/blog/${s}`)].map((u) => BASE + u);
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ host: 'richdeals.in', key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList }),
  });
  console.log(`DONE: ${ok.length} inserted. IndexNow -> HTTP ${res.status}`);
} catch (e) { console.log(`DONE: ${ok.length} inserted. IndexNow failed: ${e.message}`); }
