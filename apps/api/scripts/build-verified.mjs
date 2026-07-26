// Join a candidates file with the browser price/image verification results and
// emit only rows that passed. Descriptions are written here, from real fields
// — never lifted from the source site.
//   node build-verified.mjs <candidates.json> <out.json> <verified1.json> ...
// Works for any source (indiafreestuff, desidime, telegram) — the shapes match.
import { readFileSync, writeFileSync } from 'node:fs';

const [candFile = './ifs-candidates.json', outFile = './ifs-verified.json', ...verifyFiles] = process.argv.slice(2);
const cands = JSON.parse(readFileSync(candFile, 'utf8'));
const amz = verifyFiles.flatMap((f) => JSON.parse(readFileSync(f, 'utf8')));
const byAsin = new Map(amz.map((r) => [r.asin, r]));

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

// Colour/size variants share a title, so the ASIN has to be in the slug or the
// second variant collides with the first. Source slugs carry the SOURCE's id
// (desidime's numeric one) — swap it for ours.
const withAsin = (slug, asin) =>
  !/^B0[A-Z0-9]{8}$/.test(asin || '') || slug.includes(asin.toLowerCase())
    ? slug
    : `${slug.replace(/-\d{5,}$/, '')}-${asin.toLowerCase()}`;

// Marketplace titles are keyword-stuffed run-ons — trim to the readable head so
// the description opens with a product name, not a spec dump.
function shortName(title) {
  let n = title.split(/\s*\|\s*|\s+[–-]\s+/)[0].replace(/[,\s]+$/, '').trim();
  if (n.length > 60) n = n.slice(0, 60).replace(/\s+\S*$/, '').replace(/[,\s]+$/, '');
  return n || title;
}

// Short original blurb — the product name plus the numbers we actually verified.
function describe(name, price, mrp, store) {
  const off = mrp && mrp > price ? Math.round((1 - price / mrp) * 100) : null;
  const cut = off ? ` That is ${inr(mrp - price)} below its ${inr(mrp)} listed price — a ${off}% cut.` : '';
  return `${name} is live at ${inr(price)} on ${store}.${cut} Price checked against the ${store} product page at the time of posting; stock at this rate usually does not last long.`;
}

const out = [];
for (const c of cands) {
  if (c.store === 'Amazon') {
    // We publish the price we read off the PDP ourselves, so a stale source
    // card price is not a reason to drop the deal — only a missing price is.
    const v = byAsin.get(c.productId);
    const img = v && (v._img || v.img);
    if (!v || !(v.live > 0) || !img) continue;
    const price = Math.round(v.live);
    out.push({
      slug: withAsin(c.slug, c.productId), title: c.title, store: c.store, productId: c.productId,
      affiliateUrl: c.affiliateUrl, image: img, price, mrp: v.mrp,
      description: describe(shortName(c.title), price, v.mrp, c.store),
    });
  } else if (c.verify === 'ok' && c.liveImage) {
    out.push({
      slug: withAsin(c.slug, c.productId), title: c.title, store: c.store, productId: c.productId,
      affiliateUrl: c.affiliateUrl, image: c.liveImage,
      price: Math.round(c.livePrice), mrp: c.mrp,
      description: describe(shortName(c.title), Math.round(c.livePrice), c.mrp, c.store),
    });
  }
}

writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log(`${out.length}/${cands.length} passed verification`);
