// Shared by every ingest (indiafreestuff, DesiDime, Telegram): turn a resolved
// merchant URL into our affiliate link, and verify a live price without a browser.
//
// Owner rule 2026-07-27: EVERY store counts, not just Amazon/Flipkart. Amazon
// keeps our associate tag, Flipkart our affid, every other merchant goes
// through Cuelinks.
import crypto from 'node:crypto';

export const AMAZON_TAG = 'ashoksachdev-21';
export const FLIPKART_AFFID = 'djhackraj';
export const CUELINKS_CID = '527';

export const cue = (url) =>
  `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(url)}`;

// Titles that are never a single product: app promos, cashback games, store-wide sales.
export const JUNK = /gift\s*card|cashback|quiz|answers|loot|free\s*fire|diamonds|recharge|refer|coupon|play\s*store|app\s*download|whatsapp|telegram\s*channel|blinkit|bigbasket|zepto|instamart|swiggy|zomato|prime\s*membership|subscription|upto\s*\d+%|flat\s*\d+%\s*off|buy\s*\d+\s*get|sale\s*is\s*live|up\s*to\s*\d+%|deals?\s*up\s*to|\bhaul\b|\bfest\b|starting\s*from\s*(rs|₹)/i;

// Groceries and perishables: low ticket, location-locked, price swings daily.
export const GROCERY = /\b(oil|atta|maida|rice|dal|pulses|masala|saunf|fennel|jeera|haldi|rambutan|mango|banana|fruits?|vegetable|dry\s*fruits|almond|cashew|kaju|badam|ghee|sugar|salt|milk|paneer|honey|biscuit|namkeen|noodles|juice|detergent)\b/i;

// Redirect hops and non-shops that survive a URL resolve.
const NOT_A_STORE = /play\.google|apps\.apple|youtube|t\.me|telegram|facebook|instagram|whatsapp|tracking\.|icubeswire|links?redirect|cuelinks|\bgo\./i;
// Search results, category nodes, brand landings and sale hubs — not a product page.
const NOT_A_PRODUCT = /\/(s|search|b|events?|promotion|gp\/browse|offers?|store|deals|brand|shop|c|discover|collections?)\/|\/s\?|\/b\?|[?&](k|rf|q|node)=|\/h\/rewards\/|sale\.html|-sale\b/i;

export function affiliate(finalUrl) {
  let u; try { u = new URL(finalUrl); } catch { return null; }
  const h = u.hostname.replace(/^www\./, '');
  if (NOT_A_STORE.test(h)) return null;

  if (/^amazon\.in$|amzn\./.test(h)) {
    const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin || /\/h\/rewards\//.test(u.pathname)) return null;
    return { store: 'Amazon', productId: asin, affiliateUrl: `https://www.amazon.in/dp/${asin}?th=1&psc=1&tag=${AMAZON_TAG}` };
  }

  if (/flipkart\.com/.test(h)) {
    const pid = u.searchParams.get('pid');
    // real product paths are /<slug>/p/itm<hash>; /desidime/p/desidime_deals is a tracking landing
    if (!pid || !/\/p\/itm/.test(u.pathname)) return null;
    return { store: 'Flipkart', productId: pid, affiliateUrl: `https://www.flipkart.com${u.pathname}?pid=${pid}&affid=${FLIPKART_AFFID}` };
  }

  // any other merchant — still has to be a single product page
  if (NOT_A_PRODUCT.test(u.pathname + u.search) || u.pathname === '/') return null;
  const clean = `${u.origin}${u.pathname}${u.search.replace(/[?&](utm_[^&]*|affid|affExtParam\d|ascsubtag|tag|ref|social_share|cjdata|gad_[^&]*|gbraid|click_id)=[^&]*/g, '').replace(/^&/, '?')}`;
  const name = h.split('.')[0].replace(/^(m|www|shop)$/, h.split('.')[1] || h);
  return {
    store: name.charAt(0).toUpperCase() + name.slice(1),
    productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12),
    affiliateUrl: cue(clean),
    page: clean,
  };
}

// Most merchants (Flipkart, Myntra, Croma, Tata Cliq, Ajio...) serve Product
// ld+json to plain curl, so their price is verifiable without a browser.
// Amazon and Nykaa bot-block curl — those need the logged-in tab.
export function productLd(html) {
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let v; try { v = JSON.parse(m[1].trim()); } catch { continue; }
    const flat = [].concat(v, v?.['@graph'] || []).filter(Boolean);
    const p = flat.find((x) => x?.['@type'] === 'Product' && x.offers);
    if (p) return p;
  }
  return null;
}

// Sets d.verify to 'ok' or a reason. We publish livePrice, read off the merchant
// page — a stale source card is not a reason to drop the deal, only a missing
// price or an out-of-stock listing is.
export function verifyFromHtml(d, html) {
  const ld = productLd(html);
  const offer = [].concat(ld?.offers || []).find((o) => o?.price || o?.lowPrice);
  if (!offer) { d.verify = 'no-ld-json'; return d; }
  const live = +(offer.price ?? offer.lowPrice);
  d.livePrice = live;
  d.liveTitle = ld.name;
  d.liveImage = Array.isArray(ld.image) ? ld.image[0] : ld.image;
  d.verify = live > 0 ? 'ok' : 'no-price';
  if (offer.availability && !/InStock/i.test(offer.availability)) d.verify = 'out-of-stock';
  return d;
}
