// Validation for user-submitted deals. Pure URL parsing + a live price read, kept out of
// the service so it can be exercised on its own (see demo() at the bottom).

export const AMAZON_TAG = 'ashoksachdev-21';
export const FLIPKART_AFFID = 'djhackraj';
const CUELINKS = 'https://linksredirect.com/?cid=527&source=linkkit&url=';

export type Parsed = {
  store: string;
  productId: string;
  cleanUrl: string;
  affiliateUrl: string;
};

// Listing / search / brand hubs are not deals, no matter which store they're on.
const NOT_A_PRODUCT = /(^\/s$|^\/b\/|^\/gp\/search|^\/offers?\/|^\/deals?\/|^\/sale|^\/shop\/|^\/search)/i;

export function parseSubmission(raw: string): Parsed | { error: string } {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return { error: 'That does not look like a link. Paste the full product URL.' };
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return { error: 'Only http(s) links.' };

  const host = u.hostname.replace(/^www\./, '').toLowerCase();

  // Shortlinks hide the real product, and resolving them from the server gets us bot-blocked.
  if (/^(amzn\.to|amzn\.eu|amazn\.lt|bit\.ly|fkrt\.|dl\.flipkart\.com|cutt\.ly|tinyurl\.com)/.test(host)) {
    return { error: 'Open the short link and paste the full product page URL instead.' };
  }

  if (/(^|\.)amazon\.in$/.test(host)) {
    const asin = u.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i)?.[1]?.toUpperCase();
    if (!asin) return { error: 'Amazon link must be a single product page (contains /dp/ASIN).' };
    return {
      store: 'amazon',
      productId: asin,
      cleanUrl: `https://www.amazon.in/dp/${asin}`,
      affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}`,
    };
  }

  if (/(^|\.)flipkart\.com$/.test(host)) {
    const pid = u.searchParams.get('pid');
    if (!pid || !/\/p\/itm/i.test(u.pathname)) {
      return { error: 'Flipkart link must be a single product page (/p/itm… with a pid).' };
    }
    const clean = `https://www.flipkart.com${u.pathname}?pid=${pid}`;
    return { store: 'flipkart', productId: pid, cleanUrl: clean, affiliateUrl: `${clean}&affid=${FLIPKART_AFFID}` };
  }

  if (NOT_A_PRODUCT.test(u.pathname) || u.pathname === '/' || u.pathname === '') {
    return { error: 'That is a listing or homepage, not a single product page.' };
  }

  // Every other store goes through Cuelinks. Tracking junk stripped so the same product
  // submitted twice dedupes to the same id.
  const clean = `https://${host}${u.pathname}`;
  return {
    store: host.split('.')[0],
    productId: `${host}${u.pathname}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80),
    cleanUrl: clean,
    affiliateUrl: CUELINKS + encodeURIComponent(clean),
  };
}

export type LivePrice = { price: number; mrp: number | null; title: string | null; image: string | null };

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// Reads the price the store itself publishes. Most merchants ship Product ld+json;
// Flipkart ships none but embeds the same numbers in its state blob.
export function priceFromHtml(html: string): LivePrice | { error: string } {
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1] ?? null;
  const title = html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1] ?? null;

  const fk = html.match(/"ppd":\{"fsp":(\d+),"finalPrice":(\d+),"mrp":(\d+)/);
  const fkAvail = html.match(/"offers":\{"price":\d+,"priceCurrency":"INR","availability":"([^"]+)"/);
  if (fk) {
    if (fkAvail && !/InStock/i.test(fkAvail[1])) return { error: 'Store says out of stock.' };
    const mrp = Number(fk[3]);
    return {
      price: Number(fk[2]),
      mrp: mrp > Number(fk[2]) ? mrp : null,
      // Flipkart's og:title is "Buy X Online from Flipkart.com" and its og:image is a 300px thumb.
      title: (title ?? '').replace(/^Buy\s+/i, '').replace(/\s+Online from Flipkart\.com$/i, '') || null,
      image: og?.replace('/image/300/300/', '/image/832/832/') ?? null,
    };
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let node: any;
    try {
      node = JSON.parse(m[1].trim());
    } catch {
      continue;
    }
    for (const n of Array.isArray(node) ? node : [node]) {
      const offer = Array.isArray(n?.offers) ? n.offers[0] : n?.offers;
      const price = Number(offer?.price ?? offer?.lowPrice);
      if (!n || n['@type'] !== 'Product' || !Number.isFinite(price) || price <= 0) continue;
      if (offer?.availability && !/InStock/i.test(String(offer.availability))) {
        return { error: 'Store says out of stock.' };
      }
      const img = Array.isArray(n.image) ? n.image[0] : n.image;
      return { price: Math.round(price), mrp: null, title: n.name ?? title, image: img ?? og };
    }
  }
  return { error: 'Could not read a price on that page. It may not be a product page.' };
}

export async function fetchLivePrice(url: string): Promise<LivePrice | { error: string }> {
  let html: string;
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': UA, accept: 'text/html' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return { error: `Store returned ${res.status} for that link.` };
    html = await res.text();
  } catch {
    return { error: 'Could not open that link.' };
  }
  return priceFromHtml(html);
}

// ponytail: one self-check, run with `node -r ts-node/register submit.ts` or via the API build.
export function demo() {
  const ok = parseSubmission('https://www.amazon.in/dp/B0H2W6PNB2?ref=foo') as Parsed;
  console.assert(ok.productId === 'B0H2W6PNB2' && ok.affiliateUrl.includes(AMAZON_TAG), 'amazon parse');
  console.assert('error' in parseSubmission('https://www.amazon.in/s?k=phone'), 'amazon search rejected');
  console.assert('error' in parseSubmission('https://amzn.to/xyz'), 'shortlink rejected');
  const fk = parseSubmission('https://www.flipkart.com/x/p/itm123?pid=ABC&affid=other') as Parsed;
  console.assert(fk.productId === 'ABC' && !fk.affiliateUrl.includes('affid=other'), 'flipkart parse');
  const my = parseSubmission('https://www.myntra.com/16361106?utm_source=x') as Parsed;
  console.assert(my.affiliateUrl.startsWith(CUELINKS) && !my.affiliateUrl.includes('utm_source'), 'cuelinks');
  console.assert('error' in parseSubmission('https://www.myntra.com/'), 'homepage rejected');
  const p = priceFromHtml('<script type="application/ld+json">{"@type":"Product","name":"X","offers":{"price":"72.0","availability":"https://schema.org/InStock"}}</script>');
  console.assert((p as LivePrice).price === 72, 'ld price');
  console.log('submit.ts self-check ok');
}
