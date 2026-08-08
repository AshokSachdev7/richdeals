// Download store logos from a source CDN, re-upload to OUR DO Spaces, and point
// store.logo at ours (never hotlink a competitor CDN). Matches data/inrdeals-stores.json
// entries to our DB stores by exact host; only stores with a real logo get set —
// the rest keep the google-favicon fallback in stores/[slug]/page.tsx.
// Run: cd apps/api && node scripts/rehost-store-logos.mjs
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

// slug in our DB -> exact host in the inrdeals dataset
const HOST = { amazon: 'amazon.in', myntra: 'myntra.com', ajio: 'ajio.com', shopsy: 'shopsy.in' };

const ext = (u) => (u.split('?')[0].match(/\.(png|jpe?g|webp|svg)$/i)?.[1] || 'png').toLowerCase();
const ctype = (e) => ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml' }[e] || 'image/png');

const inr = JSON.parse(fs.readFileSync(path.join(__dir, '../../../data/inrdeals-stores.json'), 'utf8'));
const byHost = Object.fromEntries(inr.map((x) => [x.host, x]));

let done = 0;
for (const [slug, host] of Object.entries(HOST)) {
  const src = byHost[host]?.logo;
  if (!src) { console.log(`${slug}: no source logo, skip`); continue; }
  const res = await fetch(src);
  if (!res.ok) { console.log(`${slug}: fetch ${res.status}, skip`); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  const e = ext(src);
  const key = `stores/${slug}.${e}`;
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: ctype(e), ACL: 'public-read', CacheControl: 'public, max-age=31536000' }));
  const url = `${CDN}/${key}`;
  await prisma.store.update({ where: { slug }, data: { logo: url } });
  console.log(`${slug}: ${buf.length}B -> ${url}`);
  done++;
}
console.log(`rehosted ${done} logo(s)`);
await prisma.$disconnect();
