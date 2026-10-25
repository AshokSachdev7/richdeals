// Shared by every ingest (indiafreestuff, DesiDime, Telegram): turn a resolved
// merchant URL into our affiliate link, and verify a live price without a browser.
//
// Owner rule 2026-07-27: EVERY store counts, not just Amazon/Flipkart. Amazon
// keeps our associate tag, Flipkart our affid, every other merchant goes
// through Cuelinks.
import 'dotenv/config';       // every ingest talks to Prisma; .env is not read on its own
import crypto from 'node:crypto';

export const AMAZON_TAG = 'ashoksachdev-21';
export const FLIPKART_AFFID = 'djhackraj';
export const CUELINKS_CID = '527';
export const INRDEALS_ID = 'inr678975705';

export const cue = (url) =>
  `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(url)}`;

// Owner 2026-09-22: the Cuelinks account is DEACTIVATED for Myntra, so a Myntra
// linksredirect.com link earns nothing. Myntra goes through InRDeals; every
// other non-Amazon/Flipkart merchant stays on Cuelinks.
export const inr = (url) =>
  `https://inr.deals/track?id=${INRDEALS_ID}&src=merchant-detail-backend&campaign=cps&url=${encodeURIComponent(url)}`;

// Titles that are never a single product: app promos, cashback games, store-wide sales.
// "free on Rs100 bill" / "free with purchase" is a coupon-conditional freebie:
// it can never carry a price, so it burns a redirect resolve on every sweep.
export const JUNK = /free\s*(on|with|above)\b|gift\s*card|cashback|quiz|answers|loot|free\s*fire|diamonds|recharge|refer|coupon|play\s*store|app\s*download|whatsapp|telegram\s*channel|blinkit|bigbasket|zepto|instamart|swiggy|zomato|prime\s*membership|subscription|upto\s*\d+%|flat\s*\d+%\s*off|buy\s*\d+\s*get|sale\s*is\s*live|up\s*to\s*\d+%|deals?\s*up\s*to|\bhaul\b|\bfest\b|starting\s*from\s*(rs|₹)/i;

// Groceries and perishables: low ticket, location-locked, price swings daily.
export const GROCERY = /\b(oil|atta|maida|rice|dal|pulses|masala|saunf|fennel|jeera|haldi|rambutan|mango|banana|fruits?|vegetable|dry\s*fruits|almond|cashew|kaju|badam|ghee|sugar|salt|milk|paneer|honey|biscuit|namkeen|noodles|juice|tea|coffee|chana|makhana|namkeen|snacks?|poha|besan|detergent)\b/i;

// ADS-REST-03/07: AdSense restricts weapons and unapproved health supplements.
// Pages carrying these products can't run ads and risk the whole account at
// review, so we don't ingest them at all. Weapons = things built to injure
// (NOT kitchen knives / tool blades — those are legit deals, so no bare
// "knife"). Supplements = nutraceuticals / performance / sexual-wellness /
// unapproved-medicine, which AdSense healthcare policy disallows.
export const RESTRICTED = /\b(air\s*gun|airgun|air\s*rifle|pellet\s*gun|bb\s*gun|pistol|revolver|firearm|ammunition|\bammo\b|bullets?|shotgun|rifle|machete|dagger|katana|\bsword\b|switchblade|butterfly\s*knife|hunting\s*knife|combat\s*knife|brass\s*knuckle|pepper\s*spray|stun\s*gun|\btaser\b|crossbow|nunchaku|knuckle\s*duster)\b|\b(whey|protein\s*powder|mass\s*gainer|weight\s*gainer|creatine|\bbcaa\b|pre[-\s]?workout|fat\s*burner|testosterone|steroids?|anabolic|nootropic|condoms?|personal lubricant|dietary\s*supplement|nutrition(al)?\s*supplement|ayurvedic\s*(medicine|capsule|tablet|churna)|sexual\s*wellness|\bviagra\b|penis|\bcbd\b|cannabis)\b/i;

// Redirect hops and non-shops that survive a URL resolve.
const NOT_A_STORE = /play\.google|apps\.apple|youtube|t\.me|telegram|facebook|instagram|whatsapp|tracking\.|icubeswire|links?redirect|cuelinks|\bgo\./i;
// Search results, category nodes, brand landings and sale hubs — not a product page.
const NOT_A_PRODUCT = /\/(s|search|b|events?|promotion|gp\/browse|offers?|store|deals|brand|shop|c|discover|collections?)\/|\/s\?|\/b\?|[?&](k|rf|q|node)=|\/h\/rewards\/|sale\.html|-sale\b/i;

export function affiliate(finalUrl) {
  // Flipkart deeplinks are dl.flipkart.com/dl/<absolute url>, and following them
  // leaves the real URL nested in the path:
  //   https://dl.flipkart.com/dlhttps://dl.flipkart.com/blue-star.../p/itm123
  // The tail is the product; the head is a redirect artifact. Without this the
  // nested copy still contains '/p/itm', so it passed the product check below
  // and produced a 404 affiliate link.
  // Only look before '?': an encoded url=https%3A... query param is not a nested link,
  // and slicing there turned valid /dp/ASIN URLs into null (silent drop).
  const nested = finalUrl.split('?')[0].lastIndexOf('http');
  if (nested > 0) finalUrl = finalUrl.slice(nested);

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
    // Flipkart serves language variants as /hi/<slug>/p/itm... (same product): drop the locale.
    const fkPath = u.pathname.replace(new RegExp('^/[a-z]{2}(?=/[^/]+/p/itm)', 'i'), '');
    // real product paths are /<slug>/p/itm<hash>; /desidime/p/desidime_deals is a
    // tracking landing. Anchored, so a redirect artifact glued onto the front
    // (see the deeplink note above) can't smuggle a bad path through.
    if (!pid || !/^\/[a-z0-9.-]+\/p\/itm[a-z0-9]+$/i.test(fkPath)) return null;
    // page (no affid) is what we curl for the price — the resolved URL can be a
    // dl.flipkart.com redirect stub that carries no Product ld+json at all.
    const path = `https://www.flipkart.com${fkPath}?pid=${pid}`;
    return { store: 'Flipkart', productId: pid, affiliateUrl: `${path}&affid=${FLIPKART_AFFID}`, page: path };
  }

  // any other merchant — still has to be a single product page
  if (NOT_A_PRODUCT.test(u.pathname + u.search) || u.pathname === '/') return null;
  // Myntra category landings are bare slugs (/hand-towels, /personal-care,
  // /boroplus) — no product id, so they can never carry a price. 81 of them
  // shipped as live deals with price:null before this check. A real PDP is
  // /<id> or /<brand>/<name>/<id>/buy.
  if (/myntra\.com/.test(h) && !/^\/(\d+|.+\/\d+\/buy)\/?$/.test(u.pathname)) return null;
  const clean = `${u.origin}${u.pathname}${u.search.replace(/[?&](utm_[^&]*|affid|affiliate_id|affExtParam\d|ascsubtag|tag|ref|social_share|cjdata|gad_[^&]*|gbraid|click_id|pwsvid|sessionid|sid)=[^&]*/g, '').replace(/^[?&]+$/, '').replace(/^&/, '?')}`;
  const name = h.split('.')[0].replace(/^(m|www|shop)$/, h.split('.')[1] || h);
  return {
    store: name.charAt(0).toUpperCase() + name.slice(1),
    // Hash the PATH only, never the query. Every non-Amazon/Flipkart merchant we
    // resolve puts the product in the path (myntra.com/35928848, /p/<sku>...), and
    // the redirect glues a fresh session param on each sweep (Myntra's pwsvid).
    // Hashing the query meant the same product got a new productId every 30
    // minutes, so DB dedup never matched and each sweep "found" it again.
    productId: crypto.createHash('md5').update(`${u.origin}${u.pathname}`).digest('hex').slice(0, 12),
    affiliateUrl: /myntra[.]com/.test(h) ? inr(clean) : cue(clean),
    page: clean,
  };
}

// Most merchants (Flipkart, Myntra, Croma, Tata Cliq, Ajio...) serve Product
// ld+json to plain curl, so their price is verifiable without a browser.
// Amazon and Nykaa bot-block curl — those need the logged-in tab.
export function productLd(html) {
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    const raw = m[1].trim();
    let v;
    // Merchants paste review text into ld+json verbatim, raw newlines and all.
    // A raw newline inside a JSON string literal is a control character, so
    // strict JSON.parse rejects the ENTIRE block — and a priced, in-stock
    // product reads as 'no-ld-json' and gets dropped. Myntra does this on every
    // PDP that carries reviews. Control characters can only be whitespace in
    // this document, so blanking them costs nothing but the review's line breaks.
    try { v = JSON.parse(raw); } catch { try { v = JSON.parse(raw.replace(/[ -]/g, ' ')); } catch { /* fall through to the scrape below */ } }

    // ponytail: Myntra pastes marketing copy with an UNESCAPED double quote into
    // the Product block ("...features a keyless TSA approved Lock. \"This Safari
    // hard-shell trolley..."). That is not a control character, so the strip above
    // cannot rescue it and a priced, in-stock product read as no-ld-json and got
    // dropped. We only ever consume name/image/price/availability, so scrape those
    // four off the raw block rather than writing a JSON repairer.
    if (v === undefined) {
      if (!raw.includes('"Product"')) continue;
      // value of the FIRST occurrence of a key, read positionally so the pattern
      // needs no escaping and does not care how the merchant spaces its colons
      const g = (k) => {
        const i = raw.indexOf('"' + k + '"');
        if (i < 0) return undefined;
        const c = raw.indexOf(':', i + k.length + 2);
        if (c < 0) return undefined;
        const a = raw.indexOf('"', c);
        const b = raw.indexOf('"', a + 1);
        return a < 0 || b < 0 ? undefined : raw.slice(a + 1, b);
      };
      const price = g('price');
      if (!price) continue;
      return { '@type': 'Product', name: g('name'), image: g('image'),
        offers: { '@type': 'Offer', price, availability: g('availability') } };
    }
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
  // +/-1 tolerance vs the advertised card price. Presence of a price is not agreement with it.
  if (d.verify === 'ok' && d.price > 0 && Math.abs(live - d.price) > 1) {
    d.priceDelta = live - d.price;
    d.verify = 'price-drift';
  }
  return d;
}
