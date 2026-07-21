import { Injectable, Logger } from '@nestjs/common';
import { DealsService } from '../deals/deals.service';
import { RevalidateService } from '../revalidate/revalidate.service';
import type { IngestDealDto } from '../deals/deal-ingest.dto';

const AMAZON_TAG = process.env.AMAZON_TAG || 'ashoksachdev-21';
const FLIPKART_AFFID = process.env.FLIPKART_AFFID || 'djhackraj';
const CUELINKS_CID = process.env.CUELINKS_CID || '527';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
// ads / sponsored / trading-channel spam
const AD_RE = /trading|\bnifty\b|bank ?nifty|stock market|market analysis|view channel|what'?s this|join (channel|now)|t\.me\/|learning content|chart analysis|refer (and|&) earn/i;
const STORE_LINK_RE = /amazn|amzn|amazon\.in|myntr|myntra|ajiio|ajio|fkrt|flipkart|nykaa|tatacliq|linksredirect|linkredirect|cuelinks|bit\.ly|dl\.flipkart|spoo\.me|wishlink|earnkaro|inr\.deals/i;

const num = (s?: string | null) => (s ? Number(String(s).replace(/[,\s₹]/g, '')) : null);
const dec = (s: string) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const hiRes = (u: string) => u.replace(/(\/images\/I\/[A-Za-z0-9+%-]+?)(\._[^/]*?)?\.(jpg|jpeg|png)/i, '$1._SL1000_.$3');

// One real-time Telegram deal message: raw text + the links found in it.
export interface TgMessage { text: string; links: string[] }

@Injectable()
export class IngestService {
  private readonly log = new Logger('Ingest');
  constructor(
    private readonly deals: DealsService,
    private readonly revalidate: RevalidateService,
  ) {}

  private async fetchText(url: string): Promise<{ body: string; finalUrl: string }> {
    try {
      const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': UA } });
      return { body: await res.text(), finalUrl: res.url };
    } catch {
      return { body: '', finalUrl: '' };
    }
  }
  private async finalUrl(url: string): Promise<string> {
    try {
      const res = await fetch(url, { redirect: 'follow', method: 'GET', headers: { 'user-agent': UA } });
      return res.url;
    } catch {
      return '';
    }
  }

  private meta(html: string, prop: string): string | null {
    return (html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)`, 'i')) || [])[1] || null;
  }
  private amazonImage(html: string): string | null {
    let m = html.match(/data-old-hires=["'](https:\/\/m\.media-amazon\.com\/images\/I\/[^"']+)["']/i)
      || html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?)"/);
    if (m) return m[1];
    m = html.match(/property=["']og:image["'][^>]+content=["'](https:\/\/m\.media-amazon\.com[^"']+)/i);
    return m ? hiRes(m[1]) : null;
  }

  private affiliate(finalUrl: string): { store: string; productId: string; page: string; affiliateUrl: string } | null {
    let u: URL;
    try { u = new URL(finalUrl); } catch { return null; }
    if (/linkredirect|linksredirect|inr\.deals|wishlink/.test(u.hostname)) {
      const d = u.searchParams.get('dl') || u.searchParams.get('url');
      if (d) { try { u = new URL(decodeURIComponent(d)); } catch { /* keep */ } }
    }
    const h = u.hostname.replace(/^www\./, '');
    if (/amazon\.in|amzn/.test(h)) {
      const asin = (u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/) || [])[1];
      if (!asin) return null;
      return { store: 'amazon', productId: asin, page: `https://www.amazon.in/dp/${asin}`, affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${AMAZON_TAG}` };
    }
    if (/flipkart\.com/.test(h)) {
      const pid = u.searchParams.get('pid');
      if (!/\/p\//.test(u.pathname) && !pid) return null;
      const clean = `https://www.flipkart.com${u.pathname}${pid ? `?pid=${pid}` : ''}`;
      return { store: 'flipkart', productId: pid || u.pathname.slice(0, 40), page: clean, affiliateUrl: `${clean}${pid ? '&' : '?'}affid=${FLIPKART_AFFID}` };
    }
    if (/pay|gift|upi|cashback|wallet|recharge/i.test(u.pathname)) return null;
    const clean = `${u.origin}${u.pathname}`;
    return { store: h.split('.')[0], productId: clean, page: clean, affiliateUrl: `https://linksredirect.com/?cid=${CUELINKS_CID}&source=linkkit&url=${encodeURIComponent(clean)}` };
  }

  private parse(text: string) {
    const t = dec(text);
    const price = num((t.match(/Deal Price\s*[:\-]?\s*₹?\s*([0-9][0-9,]*)/i) || t.match(/₹\s*([0-9][0-9,]*)/) || [])[1]);
    const mrp = num((t.match(/M\.?R\.?P\.?\s*[:\-]?\s*₹?\s*([0-9][0-9,]*)/i) || [])[1]);
    let disc = num((t.match(/Discount\s*[:\-]?\s*([0-9]{1,2})\s*%/i) || [])[1]);
    if (!disc && mrp && price && mrp > price) disc = Math.round(((mrp - price) / mrp) * 100);
    let title = (text.split('\n').map((l) => l.trim()).find((l) => l.length > 8 && !/^https?:|Deal Price|MRP|Discount|₹/i.test(l)) || '').slice(0, 140);
    return { title: dec(title).replace(/[.]{2,}$/, '').trim(), price, mrp, discountPct: disc || null };
  }

  // Process one real-time Telegram message → maybe create a deal. Returns the
  // created deal's slug, or null if skipped (ad/dup/non-product/no-image).
  async ingestTelegram(msg: TgMessage): Promise<{ ok: boolean; reason?: string; slug?: string }> {
    if (!msg?.text || AD_RE.test(msg.text)) return { ok: false, reason: 'ad-or-empty' };
    const links = (msg.links || []).filter((l) => STORE_LINK_RE.test(l));
    if (!links.length) return { ok: false, reason: 'no-link' };

    const final = await this.finalUrl(links[0]);
    const aff = this.affiliate(final);
    if (!aff) return { ok: false, reason: 'not-product' };
    // multi-link loot post → only keep real single products (amazon/flipkart)
    if (links.length > 1 && aff.store !== 'amazon' && aff.store !== 'flipkart') return { ok: false, reason: 'category-loot' };

    const { title, price, mrp, discountPct } = this.parse(msg.text);
    if (!title) return { ok: false, reason: 'no-title' };

    const { body } = await this.fetchText(aff.page);
    const image = aff.store === 'amazon' ? this.amazonImage(body) : this.meta(body, 'og:image');
    if (!image) return { ok: false, reason: 'no-image' };

    const cap = aff.store[0].toUpperCase() + aff.store.slice(1);
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)}-${String(aff.productId).slice(0, 6)}`;
    const dto: IngestDealDto = {
      slug, sourceSlug: slug,
      title: price ? `${title} at ₹${price} – ${cap}` : `${title} – ${cap}`,
      description: `${title} available on ${aff.store}${price ? ` at ₹${price}` : ''}${discountPct ? ` (${discountPct}% off)` : ''}. Verified live deal from RichDeals — grab it before the price changes.`,
      howTo: ['Tap Shop Now to open the store.', 'Add the item to your cart.', 'Sign in to your account.', 'Confirm the address and place the order.'],
      image, store: aff.store, mrp, price, discountPct,
      productId: String(aff.productId), affiliateUrl: aff.affiliateUrl, status: 'live',
    };

    try {
      const { deal, created, storeSlug } = await this.deals.upsertFromIngest(dto);
      if (created) await this.revalidate.revalidate(this.revalidate.pathsForDeal(deal.slug, storeSlug));
      return { ok: true, slug: deal.slug };
    } catch (e) {
      this.log.warn(`upsert failed: ${(e as Error).message}`);
      return { ok: false, reason: 'upsert-error' };
    }
  }
}
