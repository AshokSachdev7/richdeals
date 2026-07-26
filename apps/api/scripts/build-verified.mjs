// Join ifs-candidates.json with the browser price/image verification results
// and emit only rows that passed. Descriptions are written here, from real
// fields — never lifted from the source site.
import { readFileSync, writeFileSync } from 'node:fs';

const cands = JSON.parse(readFileSync('./ifs-candidates.json', 'utf8'));
const amz = [
  ...JSON.parse(readFileSync('../../../amz-a.json', 'utf8')),
  ...JSON.parse(readFileSync('../../../amz-b.json', 'utf8')),
];
const byAsin = new Map(amz.map((r) => [r.asin, r]));

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

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
    const v = byAsin.get(c.productId);
    if (!v || !v.ok || !v._img) continue;
    const price = Math.round(v.live);
    out.push({
      slug: c.slug, title: c.title, store: c.store, productId: c.productId,
      affiliateUrl: c.affiliateUrl, image: v._img, price, mrp: v.mrp,
      description: describe(shortName(c.title), price, v.mrp, c.store),
    });
  } else if (c.verify === 'ok' && c.liveImage) {
    out.push({
      slug: c.slug, title: c.title, store: c.store, productId: c.productId,
      affiliateUrl: c.affiliateUrl, image: c.liveImage,
      price: Math.round(c.livePrice), mrp: c.mrp,
      description: describe(shortName(c.title), Math.round(c.livePrice), c.mrp, c.store),
    });
  }
}

writeFileSync('./ifs-verified.json', JSON.stringify(out, null, 1));
console.log(`${out.length}/${cands.length} passed verification`);
