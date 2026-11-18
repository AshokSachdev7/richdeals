# DEAL-INGEST indiafreestuff tick — 2026-11-19c

The tick fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, at least 2.5s apart, and counted the unique base64 `?rto=` Buy Now ids on each. Before any full sweep it probed one fresh id per listing against the redirector, as the protocol from 18j onward requires. Run at about 04:53–04:58 IST.

**Result: 0 deals pushed. Both probes returned a 302 to the IFS homepage (`https://www.indiafreestuff.in/`), so the redirector is still dead. Stage 1 was skipped, nothing was guessed from card titles, and there was nothing to ping. Prod returned 200 on 7 of 7 endpoints.**

## Redirector probe

| Listing | Unique `?rto=` cards | Probed id | Result |
|---|---|---|---|
| `/deals` | 33 | `MzA4NTE0MTQ1NQ==` | 302 → IFS homepage |
| `/deals/superdeals` | 41 | `MzA4NDY2NDgzNg==` | 302 → IFS homepage |

Redirector history: 7 of 99 resolved at 18g, 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l, 0 of 2 probed at 19a, 0 of 2 probed (82 cards) at 19b, and now **0 of 2 probed (74 cards) at 19c**. That is eight straight zero ticks and three on 11-19.

**Decision:** the slot keeps its `23 */2 * * *` schedule through the rest of 11-19 IST, as the standing rule says. If every remaining 11-19 tick also resolves 0, the first 11-20 tick repoints the slot's work to Telegram deep-history reads (the source that yielded 5 verified deals overnight), and keeps only the one-id IFS probe as a cheap liveness check.

## Pushed

None. With no resolvable Buy Now id there was no merchant URL to verify, and the protocol forbids building a product from a card title.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.36s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.67s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 04:58 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,284 = 16,284 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,891 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,891 = 16,891 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil` (#11896 a new FAIL in SCHEMA-AUDIT 11-19). Both need a Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l, 19a, 19b and 19c. Repoint decision above.
- **DesiDime yield:** 0 fresh for two ticks running.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **Inflated M.R.P.s:** #16792 Bio-th implies 93% off and #16891 YOHO implies 91% off.
- **M.R.P. drift:** #12328 Cello (row ₹440, PDP ₹719) and #4927 Bouncefit (row none, PDP ₹2,999).
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio has 2 units left at ₹5,500 from a third-party seller, and #16779 Yera has 1 unit left.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): TG 05:01, SITEMON 05:14, SEO-AUDIT-FIX 05:58, CONTENT-SEO 06:39, DESIDIME 06:43, DEAL-INGEST 06:53 and INDEXNOW 07:05. SCHEMA-AUDIT runs 11-20 at 04:39 and AI-OVERVIEW 11-25 at 11:39.
