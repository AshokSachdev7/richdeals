// Upsert ONE blog post from a JSON file into the Post table (+ tags).
// Used by the CONTENT-SEO cron. Post shows on /blog within ISR (no redeploy).
// Usage: cd apps/api && node scripts/insert-post.mjs <path-to-post.json>
// JSON shape: { slug, title, body, excerpt, seoTitle, seoDesc, cover?, tags:[..] }
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('usage: node insert-post.mjs <post.json>'); process.exit(1); }
const post = JSON.parse(readFileSync(file, 'utf8'));
if (!post.slug || !post.title || !post.body) { console.error('post needs slug, title, body'); process.exit(1); }

const p = new PrismaClient();
const { tags = [], ...data } = post;
const now = new Date();
const row = await p.post.upsert({
  where: { slug: post.slug },
  update: { ...data, publishedAt: now },
  create: { ...data, author: data.author || 'RichDeals Editorial', publishedAt: now },
});
for (const t of tags) {
  const tag = await p.tag.upsert({
    where: { slug: t },
    update: {},
    create: { slug: t, name: t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) },
  });
  await p.postTag.upsert({
    where: { postId_tagId: { postId: row.id, tagId: tag.id } },
    update: {},
    create: { postId: row.id, tagId: tag.id },
  });
}
await p.$disconnect();
console.log(`upserted post: ${post.slug} (id ${row.id})`);
