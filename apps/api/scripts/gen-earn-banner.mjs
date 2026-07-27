// Generate the "earn on RichDeals" campaign banner (1200x630), upload to DO
// Spaces, and optionally post it to the Telegram channel.
//   cd apps/api && node scripts/gen-earn-banner.mjs          # build + upload only
//   cd apps/api && node scripts/gen-earn-banner.mjs --post   # ...and broadcast it
// Copy states the real payout terms — Amazon gift card at 100 points, sent by hand.
// It must keep matching /account; a banner promising more than the code pays is a lie.
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const { SPACES_KEY: KEY, SPACES_SECRET: SECRET } = process.env;
const REGION = process.env.SPACES_REGION || 'sfo3';
const BUCKET = process.env.SPACES_BUCKET || 'richdeals';
const CDN = process.env.SPACES_CDN || `https://${BUCKET}.${REGION}.digitaloceanspaces.com`;
const BOT = process.env.TG_BOT || '8677395510:AAFV59MGu5fEiU65zAouKSqs_92mP2yxnSI';
const CHAT = process.env.TG_CHANNEL || '-1004416895404';
if (!KEY || !SECRET) { console.error('missing SPACES_KEY/SECRET'); process.exit(1); }

const s3 = new S3Client({
  endpoint: `https://${REGION}.digitaloceanspaces.com`, region: 'us-east-1',
  forcePathStyle: false, credentials: { accessKeyId: KEY, secretAccessKey: SECRET },
});

// Every row here maps to a real POINTS entry in apps/api/src/auth/auth.service.ts.
const ROWS = [
  ['Sign up', 'once'],
  ['Daily check-in', 'every day'],
  ['Send us a deal', 'when it goes live'],
  ['Refer a friend', 'per friend'],
];

function svg() {
  const rowY = 300;
  const rows = ROWS.map(([label, when], i) => {
    const y = rowY + i * 62;
    return `
    <circle cx="104" cy="${y - 8}" r="7" fill="#ffd166"/>
    <text x="132" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="30" font-weight="700" fill="#ffffff">${label}</text>
    <text x="${132 + label.length * 16 + 16}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="21" fill="#ffffff" opacity="0.55">${when}</text>
    <text x="690" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="32" font-weight="800" fill="#ffd166">+ &#8377;1</text>`;
  }).join('');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a0508"/><stop offset="0.55" stop-color="#3d0a12"/><stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.28" r="0.55">
      <stop offset="0" stop-color="#f14b57" stop-opacity="0.55"/><stop offset="1" stop-color="#f14b57" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M1200 0 L1200 330 Q1010 250 940 0 Z" fill="#ffffff" opacity="0.045"/>
  <text x="1010" y="470" font-family="'Arial Black',Arial,sans-serif" font-size="300" font-weight="900"
        fill="#ffd166" opacity="0.10" text-anchor="middle">&#8377;</text>

  <rect x="90" y="86" width="228" height="42" rx="21" fill="#ffd166"/>
  <text x="112" y="115" font-family="'Segoe UI',Arial,sans-serif" font-size="20" font-weight="800" fill="#3d0a12">MEMBER REWARDS</text>

  <text x="90" y="196" font-family="'Segoe UI',Arial,sans-serif" font-size="66" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Deal dhundo. Points kamao.</text>
  <text x="90" y="246" font-family="'Segoe UI',Arial,sans-serif" font-size="28" fill="#ffffff" opacity="0.72">1 point = &#8377;1. Har point account mein add hota hai.</text>

  <rect x="76" y="264" width="700" height="1" fill="#ffffff" opacity="0.14"/>
  ${rows}
  <rect x="76" y="536" width="700" height="1" fill="#ffffff" opacity="0.14"/>

  <text x="90" y="576" font-family="'Segoe UI',Arial,sans-serif" font-size="21" fill="#ffffff" opacity="0.6">100 points par redeem &#183; Amazon gift card seedha account mein</text>

  <text x="1110" y="576" font-family="'Segoe UI',Arial,sans-serif" font-size="32" font-weight="800" fill="#ffffff" text-anchor="end">Rich<tspan fill="#ffd166">Deals</tspan></text>
  <text x="1110" y="602" font-family="'Segoe UI',Arial,sans-serif" font-size="19" fill="#ffffff" opacity="0.6" text-anchor="end">richdeals.in</text>
</svg>`;
}

const CAPTION = [
  '<b>RichDeals par points kamao — 1 point = &#8377;1</b>',
  '',
  'Har kaam ka seedha hisaab, koi shart nahi:',
  '&#8226; Sign up karo — <b>+&#8377;1</b>',
  '&#8226; Roz check-in — <b>+&#8377;1</b> daily',
  '&#8226; Koi deal bhejo, live hui to — <b>+&#8377;1</b>',
  '&#8226; Dost ko refer karo — <b>+&#8377;1</b> per friend',
  '',
  'Deal bhejne ka matlab: link do, hum khud price check karte hain. Price sahi nikla aur deal live hui, tabhi point milta hai.',
  '',
  '<b>Redeem ab LIVE hai.</b> 100 points par cash out karo &#8212; Amazon gift card code 3 working days ke andar aapke account page par.',
  '',
  '&#128073; https://richdeals.in/register',
].join('\n');

const png = await sharp(Buffer.from(svg())).png().toBuffer();
const key = 'banners/earn-points.png';
await s3.send(new PutObjectCommand({
  Bucket: BUCKET, Key: key, Body: png, ContentType: 'image/png',
  ACL: 'public-read', CacheControl: 'public, max-age=86400',
}));
const url = `${CDN}/${key}`;
console.log(`banner -> ${url}`);

if (process.argv.includes('--post')) {
  const res = await fetch(`https://api.telegram.org/bot${BOT}/sendPhoto`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT, photo: url, caption: CAPTION, parse_mode: 'HTML' }),
  });
  const j = await res.json();
  console.log(j.ok ? `posted to channel, message_id ${j.result.message_id}` : `FAILED: ${JSON.stringify(j).slice(0, 300)}`);
}
console.log('DONE');
