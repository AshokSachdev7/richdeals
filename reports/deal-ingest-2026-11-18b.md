# DEAL-INGEST (indiafreestuff) tick — 2026-11-18b

The IFS `?rto=` Buy Now redirector has been dead since 11-16, apart from a 7 of 93 partial recovery at 11-17 tick f. So this tick first probed the 4 newest Buy Now ids (2 from `/deals`, 2 from `/deals/superdeals`) with one curl each, spaced 3 s apart, before deciding whether to run the full stage 1 sweep of `apps/api/scripts/ingest-ifs-proper.mjs`. Both listings were fetched with a browser UA (HTTP 200 each, 3 s apart). Run at about 02:53–02:55 IST.

**Result: 0 deals pushed. All 4 probes 302 to `https://www.indiafreestuff.in/`, so no Buy Now resolves to a store URL. This is the 8th dead tick in a row (g–n). The full sweep was skipped. Every CEO-audit check is green, and all 9 session crons are armed.**

## Redirector probe

| Listing | Buy Now id | Decoded | Response |
|---|---|---|---|
| /deals | `MzA4NDk3NzAyNw==` | 3084977027 | 302 → `https://www.indiafreestuff.in/` |
| /deals | `MzA4NDk3NTkxNg==` | 3084975916 | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `Mjk2MDIxMDYxNg==` | 2960210616 | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `MjE4Njc0Nzk3MA==` | 2186747970 | 302 → `https://www.indiafreestuff.in/` |

Without a resolved store URL there is no product id to verify, dedup or wrap in our affiliate link. The IFS card prices can't stand in for it either: 68% of them were wrong in earlier sweeps, so nothing is published from the card alone.

## Slot decision

The `23 */2 * * *` slot stays as a probe-only tick. Each dead tick costs 2 listing fetches and 4 redirect curls, and the 11-17 f partial showed the redirector can come back without notice. Moving the slot to another source would add little: Telegram already runs hourly and DesiDime every 2 hours, and both are yielding 0–1 fresh deals overnight. If the redirector is still dead on every 11-18 tick by the end of the IST day, the slot is repointed then.

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

Run at 02:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~02:55 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through n (8 ticks), after a 7 of 93 partial at f. Probe-only until the end of 11-18 IST, then repoint if no 11-18 tick resolved.
- **DesiDime yield:** 0 fresh candidates in 11-18b; the feed is recycling cards already rejected or LIVE.
- **Telegram code-only prices:** the Dealdost EUCOS post needed a promo code (₹2,092 vs PDP ₹2,299).
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:** unchanged from DESIDIME 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 04:53 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
