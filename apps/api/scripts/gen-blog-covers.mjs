// Generate a branded 1200x630 cover/OG image per blog post, upload to DO
// Spaces, and set post.cover. Run: cd apps/api && node scripts/gen-blog-covers.mjs
import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const { SPACES_KEY: KEY, SPACES_SECRET: SECRET } = process.env;
const REGION = process.env.SPACES_REGION || 'sfo3';
const BUCKET = process.env.SPACES_BUCKET || 'richdeals';
const CDN = process.env.SPACES_CDN || `https://${BUCKET}.${REGION}.digitaloceanspaces.com`;
if (!KEY || !SECRET) { console.error('missing SPACES_KEY/SECRET'); process.exit(1); }

const s3 = new S3Client({ endpoint: `https://${REGION}.digitaloceanspaces.com`, region: 'us-east-1', forcePathStyle: false, credentials: { accessKeyId: KEY, secretAccessKey: SECRET } });

const GRADS = [['#f14b57', '#c1121f'], ['#e63946', '#7a0c15'], ['#f77f00', '#c1121f'], ['#c1121f', '#0f172a'], ['#f59e0b', '#c1121f']];
const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
function category(s) {
  s = s.toLowerCase();
  if (/\bvs\b|compar/.test(s)) return 'COMPARISON';
  if (/coupon|cashback/.test(s)) return 'COUPONS';
  if (/sale|billion|festival|prime|deals/.test(s)) return 'DEALS';
  if (/fake|scam|spot|avoid/.test(s)) return 'BUYER TIPS';
  return 'GUIDE';
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// wrap title into <=3 lines of ~22 chars
function wrap(t) {
  const words = t.split(' '); const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > 22 && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}
function svg(title, cat, seed) {
  const [c1, c2] = GRADS[hash(seed) % GRADS.length];
  const lines = wrap(title);
  const startY = 300 - (lines.length - 1) * 34;
  const tspans = lines.map((l, i) => `<tspan x="90" y="${startY + i * 72}">${esc(l)}</tspan>`).join('');
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M1200 0 L1200 300 Q980 240 900 0 Z" fill="#ffffff" opacity="0.06"/>
  <text x="1060" y="150" font-family="'Arial Black',Arial,sans-serif" font-size="220" font-weight="900" fill="#ffffff" opacity="0.10" text-anchor="middle">%</text>
  <rect x="90" y="120" width="${cat.length * 15 + 44}" height="42" rx="21" fill="#ffffff"/>
  <text x="${90 + 22}" y="148" font-family="'Segoe UI',Arial,sans-serif" font-size="20" font-weight="800" fill="#c1121f">${esc(cat)}</text>
  <text font-family="'Segoe UI',Arial,sans-serif" font-size="58" font-weight="800" fill="#ffffff" letter-spacing="-1">${tspans}</text>
  <text x="90" y="560" font-family="'Segoe UI',Arial,sans-serif" font-size="34" font-weight="800" fill="#ffffff">Rich<tspan fill="#ffd166">Deals</tspan></text>
  <text x="90" y="595" font-family="'Segoe UI',Arial,sans-serif" font-size="22" fill="#ffffff" opacity="0.8">richdeals.in · Best Deals, Coupons &amp; Freebies in India</text>
</svg>`;
}

const p = new PrismaClient();
const posts = await p.post.findMany({ select: { id: true, slug: true, title: true, cover: true } });
let done = 0;
for (const post of posts) {
  const png = await sharp(Buffer.from(svg(post.title, category(post.title), post.slug))).png().toBuffer();
  const key = `og/${post.slug}.png`;
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: png, ContentType: 'image/png', ACL: 'public-read', CacheControl: 'public, max-age=31536000' }));
  const url = `${CDN}/${key}`;
  await p.post.update({ where: { id: post.id }, data: { cover: url } });
  done++;
  console.log(`  ${post.slug} -> ${url}`);
}
await p.$disconnect();
console.log(`DONE: ${done} blog covers generated + uploaded`);
