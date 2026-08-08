// One-off: import the full inrdeals store directory (data/inrdeals-stores.json)
// into our DB as store hubs — even 0-deal stores, for the traffic those /stores/<slug>
// pages pull. Rehost each logo to OUR Spaces (never hotlink a competitor CDN) and
// upsert by slug. Existing rows (amazon/ajio/myntra/shopsy) get logo-only updates.
// Run: cd apps/api && node scripts/import-inrdeals-stores.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const { SPACES_KEY: KEY, SPACES_SECRET: SECRET } = process.env;
const REGION = process.env.SPACES_REGION || 'sfo3';
const BUCKET = process.env.SPACES_BUCKET || 'richdeals';
const CDN = process.env.SPACES_CDN || `https://${BUCKET}.${REGION}.digitaloceanspaces.com`;
if (!KEY || !SECRET) { console.error('missing SPACES_KEY/SECRET'); process.exit(1); }

const s3 = new S3Client({ endpoint: `https://${REGION}.digitaloceanspaces.com`, region: 'us-east-1', forcePathStyle: false, credentials: { accessKeyId: KEY, secretAccessKey: SECRET } });
const prisma = new PrismaClient();

const ext = (u) => (u.split('?')[0].match(/\.(png|jpe?g|webp|svg)$/i)?.[1] || 'png').toLowerCase();
const ctype = (e) => ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml' }[e] || 'image/png');

// slug = first MEANINGFUL label of the hostname (amazon.in -> amazon,
// myntra.com -> myntra, in.iherb.com -> iherb) — lines up with the slugs our
// existing DB stores already use. Strip a leading generic subdomain prefix so
// brand hosts like in.iherb / web.jupiter / shop.timex don't all collide.
const SUBDOM = new Set(['in', 'web', 'shop', 'store', 'm', 'apply', 'applyonline', 'go', 'my', 'buy', 'www']);
const slugFor = (host) => {
  const labels = host.toLowerCase().split('.');
  while (labels.length > 2 && SUBDOM.has(labels[0])) labels.shift();
  return labels[0].replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};
const netFor = (host) => (host.includes('amazon') ? 'amazon' : host.includes('flipkart') ? 'flipkart' : 'cuelinks');

const inr = JSON.parse(fs.readFileSync(path.join(__dir, '../../../data/inrdeals-stores.json'), 'utf8'));

// dedup by slug — first host wins; log collisions so nothing is silently dropped
const seen = new Set();
const rows = [];
for (const s of inr) {
  const slug = slugFor(s.host);
  if (!slug || seen.has(slug)) { if (slug) console.log(`slug collision, skip: ${s.host} -> ${slug}`); continue; }
  seen.add(slug);
  rows.push({ ...s, slug });
}
console.log(`${rows.length} unique-slug stores to import`);

async function rehost(slug, src) {
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const e = ext(src);
    const key = `stores/${slug}.${e}`;
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: ctype(e), ACL: 'public-read', CacheControl: 'public, max-age=31536000' }));
    return `${CDN}/${key}`;
  } catch { return null; }
}

// re-run: skip fetch+upload for stores that already carry OUR logo
const existing = Object.fromEntries((await prisma.store.findMany({ select: { slug: true, logo: true } })).map((s) => [s.slug, s.logo]));

// small concurrency pool so 245 fetch+upload+upsert don't run one-at-a-time
let i = 0, ok = 0, nologo = 0;
async function worker() {
  while (i < rows.length) {
    const r = rows[i++];
    const logo = existing[r.slug]?.startsWith(CDN) ? existing[r.slug] : await rehost(r.slug, r.logo);
    if (!logo) nologo++;
    await prisma.store.upsert({
      where: { slug: r.slug },
      create: { name: r.name, slug: r.slug, logo, affiliateNetwork: netFor(r.host) },
      update: logo ? { logo } : {}, // don't clobber a good logo with null on re-run
    });
    ok++;
    if (ok % 25 === 0) console.log(`${ok}/${rows.length} (nologo ${nologo})`);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`done: ${ok} upserted, ${nologo} without a rehosted logo`);
const total = await prisma.store.count();
console.log(`DB store count now: ${total}`);
await prisma.$disconnect();
