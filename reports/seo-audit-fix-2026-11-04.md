# SEO-AUDIT-FIX 2026-11-04 (~05:50-06:16 IST)

**Result: 51 URLs checked across every page type, all HTTP 200, with 0 on-page issues. The 8 stale Flipkart top-100 Offer prices from SCHEMA-AUDIT were all re-read on the PDP (LIVE, InStock) and fixed in the DB with a fresh priceHistory row. All 8 now serve the correct Offer price on prod with `priceValidUntil` 2026-11-18. IndexNow returned HTTP 200 for 11 URLs. The CLAUDE.md "seller = store" drift is fixed. There was no code change, so nothing was built or deployed.**

## Page audit by type (prod, static HTML)

| Type | URLs | Result |
|---|---|---|
| Home, `/offers`, `/blog`, `/freebies`, `/coupons` | 5 | 200; title/desc/canonical/h1/og ok |
| Store and category hubs | 12 | 200. `noindex` on pedigree, ajio and cred is by design (0 LIVE deals) |
| Deal pages (GSC top + newest + stale-8) | 22 | 200. The 6 newest are `noindex,follow` by design (outside top-100) |
| Blog posts | 8 | 200; Article + FAQ JSON-LD, cover alt, canonical ok |
| robots / sitemap / llms / llms-full | 4 | 200 |
| **Total** | **51** | **0 issues** in title, description, canonical, h1, og, schema, `rel="sponsored nofollow"` or alt |

## Crawl surfaces

| Surface | Value | vs 11-03 |
|---|---|---|
| `sitemap.xml` index | 605 URLs, 0 duplicates; deals child = top-100 only (by design) | 600 |
| Blog URLs in sitemap | 442 | 437 |
| `robots.txt` | 16 UA blocks, `Sitemap:` line, GPTBot/ClaudeBot/PerplexityBot allowed | same |
| `llms.txt` / `llms-full.txt` | 200, 16,980 B / 39,020 B | ok |

## Post sweep (all 460)

- 0 titles too long, 0 bad meta descriptions, 0 coverless posts, 0 empty-alt images.
- The only duplicate title is #340 = #300, and #340 already 308s to #300. Nothing to fix.

## Internal links

1,479 unique targets and 3,023 references across all post bodies, 0 dead.

## Fix applied: 8 stale Flipkart top-100 Offer prices

Each PDP was read in the Playwright tab (ld+json price, InStock). Each row got a `prisma.deal.update` (price, discountPct, price text in title/description/howTo, and affiliateUrl where it was broken) plus a `priceHistory.create`. MRPs were not changed.

| id | Item | Old → new | Discount | Changed |
|---|---|---|---|---|
| #2279 | boAt Aavante 2.0 | ₹1,199 → ₹1,799 | 70 → 55% | price, discount, title, description, affiliateUrl (full `/p/itm…` path) |
| #2483 | RR Vento fan | ₹699 → ₹799 | 46 → 38% | price, discount, title, description, affiliateUrl (full `/p/itm…` path) |
| #3663 | Nova NHT-1039 | ₹599 → ₹554 | 67 → 69% | price, discount, title |
| #3881 | Nova NHT-1052 | ₹699 → ₹646 | 65 → 68% | price, discount, title |
| #4171 | Wild Stone Edge | ₹351 (unchanged) | 30% | priceHistory row only |
| #4172 | Lava Virat V1 5G | ₹11,999 → ₹12,999 | MRP null | price, title, description, howTo |
| #4430 | Van Heusen watch | ₹710 → ₹1,019 | 81 → 73% | price, discount, description |
| #6409 | The Man Company set | ₹268 → ₹600 | 58 → 7% | price, discount, title |

- #2279 and #2483 had **never** had a priceHistory row. They now have one, so `priceValidUntil` comes back.
- The old affiliate URLs for #2279 and #2483 were bare `/p/itm?pid=` links, which land on the Flipkart homepage. They now use the full slug path with `affid=djhackraj`.
- #6409 is now only 7% off (₹600 vs MRP ₹644). It stays LIVE because the price is honest and verified, but it is a weak deal and will probably drop out of the top-100.

## Four-stage status

| Stage | Status |
|---|---|
| Implemented | Done: 8 DB rows plus 8 priceHistory rows (00:42Z), confirmed by re-read |
| Deployed and observable | Done: no deploy needed (data only). Prod pages showed the new price and `priceValidUntil` 2026-11-18 at 06:15 IST, after the 300s fetch cache expired |
| Processed by search platform | Unknown. IndexNow was accepted (HTTP 200); Google recrawl is not observable yet |
| Outcome observed | Not yet. Watch the GSC merchant/product surface for these 8 URLs over 7-14 days |

## Doc fix

CLAUDE.md, Deal-page SEO section: "seller = store" now reads "NO `seller` by design — we're an affiliate, not the merchant, see `[dealSlug]/page.tsx:178`". The code was right; only the doc had drifted.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 8 slugs (+ `/`, `/offers`, `/sitemap.xml`) → **HTTP 200 for 11 URLs**.
- **Sitemap:** no new URLs; the deals child is ISR 1800s and carries the new lastmod when it rebuilds.
- **llms.txt:** force-dynamic, so it picks the change up per request.

## CEO audit (06:15 IST)

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,589 / 15,589 | equal |
| DB max id | 16,146 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 under the rule; CONTENT-SEO (`210ebce0`) at 06:32 IST must ship 1-2 more |
| Broadcast cursor | lastId 16,146 vs max 16,146 (file re-read) | drained |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **11-04 needs 1-2 more posts.** The 06:32 IST CONTENT-SEO run must ship them.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** JioMart #37 (delist candidate), #1665 and #1656 (no ld+json price), #6405 and #6426 (manual check), #15976 (MRP ambiguous), #7820 and #14840 (NULL, no add-to-cart), #14396 (null MRP).
- **#2913's description still mentions the HDFC EMI offer.** Not re-verified.
- **#6409 is only 7% off.** Honest but weak; leave it to price-sync and drop it if it goes unavailable.
- **Reticle is CONNECTION_CLOSED.** Not needed while Playwright works.
- **The DO token needs rotating.** Owner's job.
