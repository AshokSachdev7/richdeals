// Telegram deal-group ingest. Parses messages (title + Deal Price + MRP + Discount
// come straight from the text) → resolves shortlink → affiliate (Amazon tag /
// Flipkart affid / Cuelinks) → store CDN image → pushes to /admin/deals.
// Multi-link posts collapse to ONE best (first) deal, and only if it resolves to
// a real single-product page (not a category/loot listing).
//
// Amazon now bot-blocks curl (returns a tiny "click to continue shopping" page,
// not the real PDP), so Amazon product images can't be curl-fetched anymore.
// Two-phase flow handles this:
//   Phase "resolve" (default): resolve links, filter ads/loot, fetch non-Amazon
//     images via curl, write the batch + list of Amazon ASINs needing images.
//   Phase "finalize": merge Amazon images (fetched separately via a logged-in
//     Amazon browser tab → AMZ_IMAGES json {asin:url}), drop Amazon deals still
//     missing an image, push everything to /admin/deals/bulk.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import crypto from 'node:crypto';

const SD = process.env.TG_SCRATCH || 'C:/Users/djhac/AppData/Local/Temp/claude/F--new-projects-deals/c5635a0a-1c95-4bc5-968b-9c4814f4804e/scratchpad';
const API = process.env.API_URL || 'http://localhost:4000';
const KEY = process.env.ADMIN_KEY;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const AMAZON_TAG = 'ashoksachdev-21', FLIPKART_AFFID = 'djhackraj', CUELINKS_CID = '527';
const SEEN = 'F:/new_projects/deals/data/tg-seen.json';
const INPUT = process.env.TG_INPUT || `${SD}/tg-deals.json`;
const BATCH_FILE = process.env.TG_BATCH || `${SD}/tg-batch.json`;
const PENDING_FILE = process.env.TG_PENDING || `${SD}/amazon-pending-asins.json`;
const IMAGES_FILE = process.env.AMZ_IMAGES || `${SD}/amazon-images.json`;
const PHASE = process.env.TG_PHASE || 'resolve';
if (!KEY) { console.error('Missing ADMIN_KEY'); process.exit(1); }

const curl = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '20', u], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 }); } catch { return ''; } };
const curlFinal = (u) => { try { return execFileSync('curl', ['-sL', '-A', UA, '-m', '20', '-o', 'NUL', '-w', '%{url_effective}', u], { encoding: 'utf8' }).trim(); } catch { return ''; } };
const num = (s) => (s ? +String(s).replace(/[,\s₹]/g, '') : null);
const dec = (s) => s ? s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim() : s;
const meta = (h, p) => (h.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1] || null;
const seen = fs.existsSync(SEEN) ? new Set(JSON.parse(fs.readFileSync(SEEN, 'utf8'))) : new Set();

function parseMsg(text) {
  const t = dec(text);
  const price = num((t.match(/Deal Price\s*[:\-]?\s*₹?\s*([0-9][0-9,]*)/i) || t.match(/₹\s*([0-9][0-9,]*)/) || [])[1]);
  const mrp = num((t.match(/M\.?R\.?P\.?\s*[:\-]?\s*₹?\s*([0-9][0-9,]*)/i) || [])[1]);
  let disc = num((t.match(/Discount\s*[:\-]?\s*([0-9]{1,2})\s*%/i) || [])[1]);
  if (!disc && mrp && price && mrp > price) disc = Math.round((mrp - price) / mrp * 100);
  // title = first meaningful line
  let title = (text.split('\n').map((l) => l.trim()).find((l) => l.length > 8 && !/^https?:|Deal Price|MRP|Discount|₹/i.test(l)) || '').slice(0, 140);
  title = dec(title).replace(/[.]{2,}$/, '').trim();
  return { title, price, mrp, discountPct: disc || null };
}

// Resolves a shortlink to a real store URL, unwrapping EarnKaro/linkredirect ?dl=,
// and validates it's a single PRODUCT page (not a category/search/loot listing).
function affiliate(finalUrl) {
  let u; try { u = new URL(finalUrl); } catch { return null; }
  if (/linkredirect|linksredirect|inr\.deals|wishlink|earnkaro/.test(u.hostname)) {
    const d = u.searchParams.get('dl') || u.searchParams.get('url');
    if (d) { try { u = new URL(decodeURIComponent(d)); } catch {} }
  }
  const h = u.hostname.replace(/^www\./, '');
  if (/amazon\.in|amzn/.test(h)) {
    const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
    if (!asin) return null; // /s?, /b?node= etc — category, not product
    return { store: 'amazon', productId: asin, page: `https://www.amazon.in/dp/${asin}`, affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}` };
  }
  if (/flipkart\.com/.test(h)) {
    const pid = u.searchParams.get('pid');
    if (!pid) return null; // no pid = category/listing page
    const clean = `https://www.flipkart.com${u.pathname}?pid=${pid}`;
    return { store: 'flipkart', productId: pid, page: clean, affiliateUrl: `${clean}&affid=${FLIPKART_AFFID}` };
  }
  if (/ajio\.com/.test(h)) {
    const m = u.pathname.match(/\/p\/(\d+)/);
    if (!m) return null; // ajio category/loot page
    const clean = `${u.origin}${u.pathname}`;
    return { store: 'ajio', productId: m[1], page: clean, affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
  }
  if (/myntra\.com/.test(h)) {
    const m = u.pathname.match(/\/(\d{6,})\/buy/);
    if (!m) return null; // myntra category/loot page
    const clean = `${u.origin}${u.pathname}`;
    return { store: 'myntra', productId: m[1], page: clean, affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
  }
  const store = h.split('.')[0];
  const clean = `${u.origin}${u.pathname}`;
  return { store, productId: crypto.createHash('md5').update(clean).digest('hex').slice(0, 12), page: clean, affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
}

// Ads / sponsored / promo / trading / betting channel spam — never ingest.
const AD_RE = /trading|\bnifty\b|bank ?nifty|stock market|market analysis|view channel|what'?s this|join (channel|now)|t\.me\/|learning content|chart analysis|refer (and|&) earn|promo code for our|\bbetting\b|\bcasino\b|\bipl\b.*(bet|odds)/i;

async function resolvePhase() {
  const data = JSON.parse(fs.readFileSync(INPUT, 'utf8')).deals;
  const batch = [];
  const pendingAsins = new Set();
  for (const m of data) {
    if (AD_RE.test(m.text)) continue;
    const link = m.links[0]; // multi-link post → best/first only
    if (!link || seen.has(link)) continue;
    const final = curlFinal(link);
    const aff = affiliate(final);
    if (!aff) continue; // unresolvable or category/loot page → retry next run, not marked seen
    seen.add(link);
    const { title, price, mrp, discountPct } = parseMsg(m.text);
    if (!title || /https?:/i.test(title)) continue; // degenerate/no-title message

    let image = null;
    if (aff.store === 'amazon') {
      pendingAsins.add(aff.productId);
    } else {
      const page = curl(aff.page);
      image = meta(page, 'og:image');
    }

    const cap = aff.store[0].toUpperCase() + aff.store.slice(1);
    const slug = (title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)) + '-' + aff.productId.slice(0, 6);
    batch.push({
      slug, sourceSlug: slug,
      title: price ? `${title} at ₹${price} – ${cap}` : `${title} – ${cap}`,
      description: `${title} available on ${aff.store}${price ? ` at ₹${price}` : ''}${discountPct ? ` (${discountPct}% off)` : ''}. Verified live deal from RichDeals — grab it before the price changes.`,
      howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in to your account.', 'Confirm the address and place the order.'],
      image, store: aff.store, mrp, price, discountPct, couponNote: null,
      productId: aff.productId, affiliateUrl: aff.affiliateUrl, status: 'live',
    });
    console.log(`+ ${aff.store} ₹${price ?? '?'}${discountPct ? ` -${discountPct}%` : ''} ${title.slice(0, 42)}`);
  }
  fs.writeFileSync(SEEN, JSON.stringify([...seen]));
  fs.writeFileSync(BATCH_FILE, JSON.stringify(batch));
  fs.writeFileSync(PENDING_FILE, JSON.stringify([...pendingAsins]));
  console.log(`\nRESOLVED: ${batch.length} candidate deals, ${pendingAsins.size} Amazon ASINs need images (${PENDING_FILE})`);
}

async function finalizePhase() {
  const batch = JSON.parse(fs.readFileSync(BATCH_FILE, 'utf8'));
  const images = fs.existsSync(IMAGES_FILE) ? JSON.parse(fs.readFileSync(IMAGES_FILE, 'utf8')) : {};
  const final = batch.filter((d) => {
    if (d.store === 'amazon' && !d.image) d.image = images[d.productId] || null;
    return !!d.image; // image required
  });
  let total = 0, created = 0;
  const createdDeals = [];
  for (let i = 0; i < final.length; i += 15) {
    const slice = final.slice(i, i + 15);
    const res = await fetch(`${API}/admin/deals/bulk`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY }, body: JSON.stringify({ deals: slice }) });
    const out = await res.json().catch(() => ({}));
    total += out.count || 0;
    for (const r of out.results || []) {
      if (r.created) { created++; const d = slice.find((x) => x.slug === r.slug); if (d) createdDeals.push(d); }
    }
  }
  console.log(`\nDONE: pushed ${total} ok (${created} newly created) of ${batch.length} telegram deals (${batch.length - final.length} dropped for missing image)`);

  // Broadcast each NEW deal to our Telegram channel (photo + affiliate link).
  const sent = await broadcastChannel(createdDeals);
  if (createdDeals.length) console.log(`Channel: broadcast ${sent}/${createdDeals.length} new deals`);
}

// Post new deals to our own Telegram channel via the Bot API. No-op if unconfigured.
async function broadcastChannel(deals) {
  const TG = process.env.TELEGRAM_BOT_TOKEN, CH = process.env.TELEGRAM_CHANNEL_ID;
  if (!TG || !CH || !deals.length) return 0;
  let sent = 0;
  for (const d of deals) {
    const off = d.discountPct ? ` (${d.discountPct}% OFF)` : '';
    const priceLine = d.price ? `\n💰 ₹${d.price}${d.mrp ? ` (M.R.P ₹${d.mrp})` : ''}${off}` : '';
    const caption = `🔥 ${d.title}${priceLine}\n\n🛒 Grab it: https://richdeals.in/${d.slug}\n\n📣 @RichDeals_bot`;
    try {
      const r = await fetch(`https://api.telegram.org/bot${TG}/sendPhoto`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CH, photo: d.image, caption: caption.slice(0, 1024) }),
      });
      const j = await r.json().catch(() => ({}));
      if (j.ok) sent++; else console.error(`  channel post fail (${d.slug}): ${j.description}`);
    } catch (e) { console.error(`  channel post error (${d.slug}): ${e.message}`); }
    await new Promise((res) => setTimeout(res, 1500)); // Telegram rate limit
  }
  return sent;
}

if (PHASE === 'finalize') await finalizePhase();
else await resolvePhase();
