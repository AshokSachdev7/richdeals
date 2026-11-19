// Member-uploaded deal photos → DigitalOcean Spaces, same bucket the blog covers use.
// Takes a data URL from the browser because that needs no multipart parser and no
// temp files. ponytail: no image resizing here — the client canvas-downscales to
// 1200px before it posts, add a sharp pass if people start uploading from desktop.
import { BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'node:crypto';

const REGION = process.env.SPACES_REGION || 'sfo3';
const BUCKET = process.env.SPACES_BUCKET || 'richdeals';
const CDN = process.env.SPACES_CDN || `https://${BUCKET}.${REGION}.digitaloceanspaces.com`;
const ENDPOINT = process.env.SPACES_ENDPOINT || `https://${REGION}.digitaloceanspaces.com`;
// GCS buckets with uniform access reject per-object ACLs; Spaces needs public-read.
const ACL = ENDPOINT.includes('digitaloceanspaces') ? ('public-read' as const) : undefined;

const TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
const MAX_BYTES = 6 * 1024 * 1024;

let client: S3Client | null = null;
function s3(): S3Client {
  const { SPACES_KEY, SPACES_SECRET } = process.env;
  if (!SPACES_KEY || !SPACES_SECRET) throw new BadRequestException('Image upload is not configured.');
  client ??= new S3Client({
    endpoint: ENDPOINT,
    region: 'us-east-1',
    // ponytail: GCS S3-interop chokes on the SDK's default flexible checksums.
    requestChecksumCalculation: 'WHEN_REQUIRED',
    credentials: { accessKeyId: SPACES_KEY, secretAccessKey: SPACES_SECRET },
  });
  return client;
}

/** data:image/jpeg;base64,… → public CDN url. Throws on anything that is not an image. */
export async function uploadDataUrl(dataUrl: string, userId: number): Promise<string> {
  const m = /^data:([\w/+.-]+);base64,([\s\S]+)$/.exec((dataUrl ?? '').trim());
  if (!m) throw new BadRequestException('Send the image as a data URL.');
  const ext = TYPES[m[1].toLowerCase()];
  if (!ext) throw new BadRequestException('Use a JPG, PNG or WebP image.');

  const body = Buffer.from(m[2], 'base64');
  if (!body.length) throw new BadRequestException('That image is empty.');
  if (body.length > MAX_BYTES) throw new BadRequestException('Image is over 6MB — pick a smaller one.');

  const key = `deals/u${userId}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
  await s3().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: m[1],
      ACL,
      CacheControl: 'public, max-age=31536000',
    }),
  );
  return `${CDN}/${key}`;
}
