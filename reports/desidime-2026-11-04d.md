# DESIDIME-INGEST 2026-11-04d (~06:40 IST)

**Result: 0 new deals pushed. DesiDime gave no fresh single-product deals: 30 cards were discovered, 19 resolved to a product, 5 were already in the DB and 14 had been rejected in the last 24h. The useful work came from the dup re-check. #11896 had a bare Flipkart link, which led to a sweep of all 541 LIVE Flipkart deals. 75 of them had broken bare `/p/itm?pid=` affiliate links (they land on the homepage or 404). 59 were fixed after a PDP re-read in the Playwright tab: 52 stay LIVE with corrected prices and 7 are now EXPIRED. 16 could not be resolved and carry forward. IndexNow returned HTTP 200 for 63 URLs.**

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 30 |
| Dropped (JUNK / GROCERY / other store) | 11 |
| Resolved to a product | 19 |
| Already in DB (dup) | 5 |
| Rejected in the last 24h (`dd-rejected`) | 14 |
| Fresh candidates | 0 |
| **Pushed** | **0** |

## Dups re-verified (PDP read)

| id | Item | Card | DB = PDP | Verdict |
|---|---|---|---|---|
| #4793 | Havells | ₹4,068 | ₹5,194 | Card is wrong, DB is right |
| #8856 | Sony | ₹749 | ₹799 | Card is wrong, DB is right |
| #11896 | Flipkart item | ₹664 | ₹899 | Card is wrong. Fixed the bare affiliate link and added a ₹899 priceHistory row |
| #16122 | NutriPro | ₹800 | ₹800 | In sync |
| #16139 | Hammer buds | ₹349 | ₹349 | In sync |

## Fix applied: 75 broken Flipkart affiliate links

- **The problem:** 75 of the 541 LIVE Flipkart deals had affiliate URLs of the form `flipkart.com/p/itm?pid=…`, with no product slug and no `itm` id. Those links do not open the product.
- **The fix:** each pid was resolved in the Playwright Flipkart tab to its full `/<slug>/p/itm…` path. The ld+json price and stock were read, and the affiliate URL was rebuilt as `https://www.flipkart.com<fullPath>&affid=djhackraj`.
- **For each row:** a `prisma.deal.update` (price, discountPct, the ₹ and % text in title/description/couponNote/howTo, affiliateUrl) plus a `priceHistory.create`. MRPs were not changed. The scripts were `fk75.cjs` and `fk12217.cjs` in the scratchpad.

| Outcome | Rows |
|---|---|
| Fixed, LIVE, price-synced | 52 |
| EXPIRED because out of stock: #12252, #12222, #12034, #12321, #12166, #12253 | 6 |
| EXPIRED because the price is above the MRP: #12217 MSI Modern 14 (₹64,990 vs MRP ₹58,990, 0% off) | 1 |
| Not resolved (carried forward) | 16 |

Biggest price corrections:

| id | Item | Old → new | Discount |
|---|---|---|---|
| #14131 | Havells bulb | ₹48 → ₹306 | no MRP |
| #12112 | Zebronics | ₹849 → ₹2,299 | 18% |
| #12195 | — | ₹113 → ₹209 | — |
| #12223 | Toshiba 40" | ₹20,249 → ₹23,999 | — |
| #12224 | Toshiba 50" | ₹25,249 → ₹29,999 | — |
| #12210 | Acer | ₹44,590 → ₹36,990 | — |
| #12221 | Safari | ₹2,749 → ₹1,949 | — |

A re-read confirmed: #12112 LIVE ₹2,299 at 18% off; #12217 EXPIRED; #12252 EXPIRED; #12891 LIVE ₹105 at 54% off; #14131 LIVE ₹306.

**Root cause:** the broken rows (ids about 12005-12958) came from one-off 09-22-era `push-ifs` scripts. The current ingest code builds full paths from the resolved `u.pathname`: `ingest-telegram.mjs:68`, `resume-ingest.mjs:45` and `scrape-freekaamaal.mjs:35`. `ingest-desidime.mjs:76-79` already guards against itm links that have no pid. No code fix was needed.

## Four-stage status

| Stage | Status |
|---|---|
| Implemented | Done: 59 rows updated plus 59 priceHistory rows, and #11896. Confirmed by re-read |
| Deployed and observable | Done: no deploy needed (data only). Prod API total 15,582 = DB LIVE 15,582 (down 7 = the new EXPIRED rows) |
| Processed by search platform | Unknown. IndexNow accepted (HTTP 200) |
| Outcome observed | Not yet. Outbound clicks on these 52 rows should now reach the real PDP |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the #11896 slug, the 58 fk75 slugs and 3 hubs → **HTTP 200 for 63 URLs**.
- **Sitemap:** no new URLs. The deals child is ISR 1800s.
- **llms.txt:** force-dynamic, so it picks the change up per request.

## CEO audit (06:40 IST)

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,582 / 15,582 | equal (−7 vs 06:15 = the new EXPIRED rows) |
| DB max id | 16,146 | ok (0 pushed) |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok |
| Posts per day (IST) | 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 under the rule; CONTENT-SEO tick runs next this session |
| Broadcast cursor | lastId 16,146 vs max 16,146 (file re-read) | drained |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **16 unresolved bare Flipkart links.** With a known itm id: #12919, #12958, #1396, #12771, #15066. Without: #12263, #12380, #12111, #12215, #12216, #12379, #12155, #12153, #12168, #12212, #12213.
- **11-04 needs 1-2 more posts.** The CONTENT-SEO tick runs next.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** JioMart #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **#2913's description still mentions the HDFC EMI offer.**
- **#6409 is only 7% off.**
- **Reticle is CONNECTION_CLOSED.** Not needed.
- **The DO token needs rotating.** Owner's job.
