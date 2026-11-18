# INDEXNOW tick — 2026-11-18c

The tick resubmitted the site's hubs and sitemaps, the newest LIVE deals, deals repriced in the last 6 hours and the newest blog posts to IndexNow (api.indexnow.org, which fans out to Bing and the other engines) through `apps/api/scripts/indexnow-ping.mjs --paths`, run with `MSYS_NO_PATHCONV=1`. `--paths` mode adds nothing on its own, so the 9 hub and sitemap paths were listed by hand. The URL list came from `apps/api/_inx1118c.cjs` (Prisma). Run at about 13:07–13:09 IST.

**Result: HTTP 200 for 43 URLs. Prod returned 200 on 7 of 7 endpoints, every CEO-audit check is green and there were 0 unpushed commits before this report.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16776–16800 (includes DESIDIME 18g's #16793–16800) |
| Repriced in the last 6h | 3 | #13311, #16774, #16775 |
| Newest posts | 6 | ids 621–628, newest `/blog/earbuds-one-side-not-working-how-to-fix-tws-india` |
| **Total** | **43** | **HTTP 200** |

The 6-hour reprice window covers the gap since INDEXNOW 18b (07:07 IST). Deals in that window whose id already sat in the newest-25 were not listed twice. #9099 (price-synced in DESIDIME 18g) was already pinged by that tick.

## Freshness

- **IndexNow:** HTTP 200 for 43 URLs.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only by design; the blog child picks up post 628 within 30 minutes of publishing.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.68s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 13:09 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,220 = 16,220 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,800 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,800 vs 16,800 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 13:00 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **IFS redirector:** the 12:53 DEAL-INGEST stage 1 resolved 7 of 99 cards; results go in DEAL-INGEST 18g.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at about 19:05 IST per the `53 */6 * * *` schedule.
