# DEAL-INGEST indiafreestuff tick — 2026-11-19b

The tick followed the redirector protocol. It fetched `/deals` and `/deals/superdeals` with a browser UA, leaving at least 2.5s between requests, and probed one fresh base64 `?rto=` Buy Now id from each listing before committing to a full stage-1 sweep. Run at about 02:54 IST.

**Result: 0 deals pushed. Both probes redirected to `https://www.indiafreestuff.in/` (the homepage), not to a merchant, so the full sweep of `apps/api/scripts/ingest-ifs-proper.mjs` was skipped. No product was guessed from a card title. With no batch, there was no IndexNow ping. Prod returned 200 on 7 of 7 endpoints. The DEAL-INGEST session cron had expired with this tick as its final run and was recreated as `da3255ca`.**

## Redirector probe

| Listing | Unique `?rto=` cards | Probed id | Result |
|---|---|---|---|
| `/deals` | 37 | `MzA4NTE0MDM0NA==` | 302 → `https://www.indiafreestuff.in/` |
| `/deals/superdeals` | 45 | `MTAyNTY0Mjk4MQ==` | 302 → `https://www.indiafreestuff.in/` |

Redirector history: 7 of 99 resolved at 18g, 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l, 0 of 2 probed at 19a and **0 of 2 probed (82 cards) at 19b**. That is five straight zero ticks, and 11-19 IST is 0 for 2 so far. The rule stands: if every remaining tick on 11-19 IST also resolves 0, repoint the `23 */2 * * *` slot. The next tick is at 04:53.

## Pushed

None.

## Freshness

- **IndexNow:** not pinged, because there was no batch.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.38s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.54s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 02:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,279 = 16,279 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,886 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,886 = 16,886 | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Session crons vs roster | 8 of 9 found; DEAL-INGEST missing | **Fixed.** Recreated as `da3255ca` (`23 */2 * * *`, next run 04:53 IST). |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

DEAL-INGEST is the fourth roster job to hit the 7-day expiry on 11-19, after SITEMON, TG and DESIDIME. CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX and AI-OVERVIEW are still due to lapse. SITEMON diffs CronList against the roster every hour and recreates anything missing.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a and 19b. Repoint the slot if every 11-19 tick resolves 0. Next tick is at 04:53.
- **DesiDime yield:** low, because card prices lag the PDP or show post-coupon figures. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): TG 03:01, SITEMON 03:14, SCHEMA-AUDIT 04:39, DESIDIME 04:43, DEAL-INGEST 04:53, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39 and INDEXNOW 07:05. AI-OVERVIEW runs 11-25 at 11:39.
