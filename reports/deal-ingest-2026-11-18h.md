# DEAL-INGEST (indiafreestuff) tick — 2026-11-18h

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` (pages 1–3) and `/deals/superdeals`, with a 2.6s gap between requests, and tried to resolve each card's base64 `?rto=` Buy Now id. Run at about 14:53–15:01 IST.

**Result: 0 deals pushed. All 85 cards failed to resolve: 83 went to the IFS homepage and 2 returned an empty URL. With no product to check on a PDP and no slugs to ping, IndexNow was skipped. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 85 |
| `?rto=` resolved to a product | 0 |
| `?rto=` sent to the IFS homepage | 83 |
| `?rto=` returned an empty URL (timeout) | 2 (Longway Zephyr BLDC fan, Vaseline body wash) |
| Pushed | 0 |

Two ticks ago, DEAL-INGEST 18g resolved 7 of 99 cards (12:53 IST). This tick resolved none, so the redirector has gone back to fully dead. Several cards duplicate deals that other sources have already pushed: Active pain cream (#16805), Colors Queen nail paint (#16806) and the Nayasa containers (#16809), all from DESIDIME 18h.

Per the standing rule, no product was guessed from a card title. IFS card prices are wrong about 68% of the time, so a deal whose title cannot be resolved to a real merchant URL is not published.

## Freshness

- **IndexNow:** skipped, because nothing was pushed and there are no slugs to ping.
- **`sitemap.xml` and `llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.38s) |
| /offers | 200 (0.27s) |
| /blog | 200 (0.94s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.20s) |
| /api/deals | 200 (0.25s) |
| /llms.txt | 200 (0.99s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 15:01 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,229 = 16,229 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,809 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,809 vs 16,809 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 15:01 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **IFS redirector:** this is the main issue for this cron slot. Ticks on 11-17 and 11-18 resolved 7 of 93, then 7 of 99, then 0 of 85. The `23 */2 * * *` slot should stay on IFS only while it yields anything. If the 11-18 evening ticks also resolve 0, it should be repointed at another source.
- **GSC traffic down ~70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift. The Offer lapses tonight (11-18).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **ASIN reuse:** #2351, #15344 and #6989 share ASINs. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): TG 15:03, SITEMON 15:50, DESIDIME 16:43, DEAL-INGEST 16:53, CONTENT-SEO 18:39, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39.
