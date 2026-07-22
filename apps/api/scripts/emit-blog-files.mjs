// Read the seo-blog-batch workflow output (JSON array of posts) → write
// <slug>.md + <slug>.meta.json into a dir, print the slug list for insert.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [srcFile, outDir] = process.argv.slice(2);
if (!srcFile || !outDir) { console.error('usage: node emit-blog-files.mjs <workflow-output.json> <outDir>'); process.exit(1); }
mkdirSync(outDir, { recursive: true });

const parsed = JSON.parse(readFileSync(srcFile, 'utf8'));
const posts = Array.isArray(parsed) ? parsed : (parsed.result || []);

const slugs = [];
for (const p of posts) {
  if (!p || !p.slug || !p.body) continue;
  const slug = String(p.slug).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
  writeFileSync(join(outDir, `${slug}.md`), p.body, 'utf8');
  writeFileSync(join(outDir, `${slug}.meta.json`), JSON.stringify({
    slug, title: p.title, excerpt: p.excerpt ?? null,
    seoTitle: p.seoTitle ?? null, seoDesc: p.seoDesc ?? null,
    cover: p.cover ?? null, tags: p.tags ?? [],
  }, null, 2), 'utf8');
  slugs.push(slug);
}
console.log(slugs.join(' '));
console.error(`wrote ${slugs.length} blogs to ${outDir}`);
