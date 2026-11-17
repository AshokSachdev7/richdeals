# DEAL-INGEST (indiafreestuff) tick — 2026-11-18a

The indiafreestuff redirector has been dead since 11-16: every `?rto=` Buy Now id 302s to the homepage instead of the merchant. So this tick ran the cheap probe first. It took 2 base64 Buy Now ids from `/deals` and 2 from `/deals/superdeals`, and resolved each with one curl, spacing requests at least 2.5 s apart. A full stage 1 sweep runs only when a probe resolves. Run at about 00:54 IST.

**Result: 0 deals pushed. All 4 probes 302 to `https://www.indiafreestuff.in/`, so the redirector is still dead. This is the 7th dead tick in a row (g–m). No full sweep was run, which avoids pointless load on their domain. Nothing was pushed, so there was no IndexNow ping. Every CEO-audit check is green, and all 9 session crons are armed.**

## Redirector probe

| Listing | Buy Now id | Response |
|---|---|---|
| /deals | `MzA4NDk3NzAyNw==` | 302 → `https://www.indiafreestuff.in/` |
| /deals | `MzA4NDk3NTkxNg==` | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `MzA4MjY5MDU4OQ==` | 302 → `https://www.indiafreestuff.in/` |
| /deals/superdeals | `MjE4Njc0Nzk3MA==` | 302 → `https://www.indiafreestuff.in/` |

Without a resolved merchant URL there is no productId to dedup, no PDP to price-verify and no link to put an affiliate tag on. Their card prices are not usable on their own either: 68% of them were wrong in earlier sweeps.

## Freshness

- **IndexNow:** not pinged, because 0 deals were pushed.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

Run at 00:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,192 = 16,192 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,772 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,772 vs 16,772 | OK. No gap. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~00:56 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g, h, i, j, k, l and m, after a 7 of 93 partial at f. If the remaining 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) gets repointed at another source.
- **DesiDime yield:** Amazon cards are showing bank-offer or coupon prices; all 5 fresh Amazon candidates drifted at 11-18a.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#3542:** price moved from ₹765 to ₹1,499; re-read it on the next dup hit.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747, #16767.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 02:53 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
