// Upload local product images to a DigitalOcean Space, then rewrite each
// deal JSON's `image` to the Space URL. Requires Spaces keys in env:
//   SPACES_KEY, SPACES_SECRET  (control panel -> API -> Spaces Keys)
//   SPACES_REGION (default blr1), SPACES_BUCKET (default deals-cdn)
import { S3Client, CreateBucketCommand, PutObjectCommand, PutBucketPolicyCommand } from '@aws-sdk/client-s3';
import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.SPACES_KEY;
const SECRET = process.env.SPACES_SECRET;
const REGION = process.env.SPACES_REGION || 'blr1';
const BUCKET = process.env.SPACES_BUCKET || 'deals-cdn';
if (!KEY || !SECRET) { console.error('Missing SPACES_KEY / SPACES_SECRET'); process.exit(1); }

const ENDPOINT = `https://${REGION}.digitaloceanspaces.com`;
const IMG = 'F:/new_projects/deals/data/images/';
const DEALS = 'F:/new_projects/deals/data/deals/';
const urlFor = (key) => `https://${BUCKET}.${REGION}.digitaloceanspaces.com/${key}`;

const s3 = new S3Client({
  endpoint: ENDPOINT, region: 'us-east-1', forcePathStyle: false,
  credentials: { accessKeyId: KEY, secretAccessKey: SECRET },
});

const ctype = (f) => f.endsWith('.png') ? 'image/png' : f.endsWith('.webp') ? 'image/webp' : 'image/jpeg';

async function ensureBucket() {
  try { await s3.send(new CreateBucketCommand({ Bucket: BUCKET })); console.log('bucket created:', BUCKET); }
  catch (e) {
    const n = e.name || e.Code || '';
    if (/BucketAlreadyOwnedByYou|BucketAlreadyExists|Conflict/i.test(n)) console.log('bucket exists:', BUCKET);
    else if (/AccessDenied/i.test(n)) console.log('cannot create (scoped key) — assuming bucket pre-created in panel:', BUCKET);
    else throw e;
  }
  // best-effort public-read policy (may be denied for scoped keys; set via panel then)
  const policy = { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Principal: { AWS: ['*'] }, Action: ['s3:GetObject'], Resource: [`arn:aws:s3:::${BUCKET}/*`] }] };
  try { await s3.send(new PutBucketPolicyCommand({ Bucket: BUCKET, Policy: JSON.stringify(policy) })); console.log('public-read policy set'); }
  catch (e) { console.log('policy warn (set Space to public in panel if images 403):', e.name); }
}

async function main() {
  await ensureBucket();
  // productId -> uploaded url
  const map = {};
  for (const f of fs.readdirSync(IMG)) {
    const key = `deals/${f}`;
    const body = fs.readFileSync(IMG + f);
    const base = { Bucket: BUCKET, Key: key, Body: body, ContentType: ctype(f), CacheControl: 'public, max-age=31536000, immutable' };
    try {
      await s3.send(new PutObjectCommand({ ...base, ACL: 'public-read' }));
    } catch (e) {
      if (/AccessDenied/i.test(e.name || '')) { await s3.send(new PutObjectCommand(base)); } // ACL denied; upload anyway, public via bucket policy
      else throw e;
    }
    map[path.parse(f).name] = urlFor(key);
    console.log('up', key);
  }
  // rewrite deal JSON image urls
  let rw = 0;
  for (const f of fs.readdirSync(DEALS)) {
    if (!f.endsWith('.json') || f === 'index.json') continue;
    const p = DEALS + f; const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (d.productId && map[d.productId]) { d.image = map[d.productId]; fs.writeFileSync(p, JSON.stringify(d, null, 2)); rw++; }
  }
  console.log(`\nDONE: uploaded ${Object.keys(map).length}, rewrote ${rw} deal JSONs`);
  console.log('sample url:', Object.values(map)[0]);
}
main().catch(e => { console.error('ERR', e); process.exit(1); });
