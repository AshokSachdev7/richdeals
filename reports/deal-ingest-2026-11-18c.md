# DEAL-INGEST (indiafreestuff) tick — 2026-11-18c

The IFS `?rto=` Buy Now redirector has been dead since 11-16, apart from a 7 of 93 partial recovery at 11-17 tick f. So this tick again probed the 4 newest Buy Now ids (the top 2 `btn-shopnow` anchors on `/deals` and on `/deals/superdeals`) with one curl each, spaced 3 s apart, before deciding whether to run the full stage 1 sweep of `apps/api/scripts/ingest-ifs-proper.mjs`. Both listings were fetched with a browser UA (HTTP 200 each, 3 s apart). Run at about 04:51–04:53 IST.

**Result: 0 deals pushed. All 4 probes 302 to `https://www.indiafreestuff.in/`, so no Buy Now resolves to a store URL. This is the 9th dead tick in a row (g–o). The full sweep was skipped. The 4 newest ids are the same as at DEAL-INGEST 11-18b (02:53 IST), so the tops of both listings have not changed in 2 hours. Every CEO-audit check is green, and all 9 session crons are armed.**

## Redirector probe

| Listing | Buy Now id | Decoded | Response |
|---|---|---|---|
| /deals | `MzA4NDk3NzAyNw==` | 3084977027 | 302 → `https://www.indiafreestuff.in/` |
| /deals | `MzA4NDk3NTkxNg==` | 3084975916 | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `Mjk2MDIxMDYxNg==` | 2960210616 | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `MjE4Njc0Nzk3MA==` | 2186747970 | 302 → `https://www.indiafreestuff.in/` |

Without a resolved store URL there is no product id to verify, dedup or wrap in our affiliate link. The IFS card prices can't stand in for it either: 68% of them were wrong in earlier sweeps, so nothing is published from the card alone.

## Slot decision

The `23 */2 * * *` slot stays probe-only for the rest of 11-18 IST, as decided at 11-18b. A dead tick costs 2 listing fetches and 4 redirect curls. If no 11-18 tick resolves by the end of the IST day, the slot is repointed then.

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.12s) |
| /blog | 200 (1.06s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.80s) |

## CEO audit

Run at 04:53 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 04:53 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through o (9 ticks), after a 7 of 93 partial at f. Probe-only until the end of 11-18 IST, then repoint if no 11-18 tick resolved.
- **Overnight yield:** 0 deals pushed since TG 11-18b. DesiDime returned 0 fresh in 11-18b and 11-18c; Telegram groups have been silent since 02:34 IST.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the Offer lapses tonight (11-18).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **Low-stock re-check list:** unchanged from DESIDIME 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 06:53 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
