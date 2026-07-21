// Migrate deal images from Amazon CDN hotlinks → DigitalOcean Spaces.
// For each deal whose image is on m.media-amazon.com: download bytes,
// PutObject to Spaces (img/<asin>.jpg), rewrite DB image → Spaces CDN URL.
// Run: cd apps/api && node scripts/migrate-images-to-spaces.mjs
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { execFileSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const { SPACES_KEY: KEY, SPACES_SECRET: SECRET } = process.env;
const REGION = process.env.SPACES_REGION || 'sfo3';
const BUCKET = process.env.SPACES_BUCKET || 'richdeals';
const CDN = process.env.SPACES_CDN || `https://${BUCKET}.${REGION}.digitaloceanspaces.com`;
if (!KEY || !SECRET) { console.error('Missing SPACES_KEY / SPACES_SECRET'); process.exit(1); }

const s3 = new S3Client({
  endpoint: `https://${REGION}.digitaloceanspaces.com`, region: 'us-east-1', forcePathStyle: false,
  credentials: { accessKeyId: KEY, secretAccessKey: SECRET },
});
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
// download image bytes via curl (m.media-amazon CDN is not bot-protected)
const fetchBytes = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '25', u], { maxBuffer: 1024 * 1024 * 20 }); } catch { return null; } };

const p = new PrismaClient();
const rows = await p.deal.findMany({ where: { image: { contains: 'media-amazon.com' } }, select: { id: true, productId: true, image: true } });
console.log('to migrate:', rows.length);

let done = 0, fail = 0;
for (const d of rows) {
  const buf = fetchBytes(d.image);
  if (!buf || buf.length < 500) { fail++; continue; }          // too small = error page
  const key = `img/${d.productId}.jpg`;
  try {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: 'image/jpeg', ACL: 'public-read', CacheControl: 'public, max-age=31536000, immutable' }));
    await p.deal.update({ where: { id: d.id }, data: { image: `${CDN}/${key}` } });
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${rows.length}`);
  } catch (e) { fail++; if (fail <= 3) console.log('ERR', e.name, e.message?.slice(0, 80)); }
}
await p.$disconnect();
console.log(`DONE: migrated ${done}, failed ${fail} of ${rows.length}`);
