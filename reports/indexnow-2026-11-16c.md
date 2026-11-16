# INDEXNOW tick — 2026-11-16c

The tick resubmitted the newest deal and post URLs, plus the sitemap and hub URLs, to IndexNow and Bing through `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode with `MSYS_NO_PATHCONV=1`. Run at about 19:09 IST.

**Result: IndexNow HTTP 200 for 89 URLs. Every CEO-audit check is green, all 7 prod endpoints return 200, and all 9 session crons are armed.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16682–#16706 |
| LIVE deals with a `priceHistory` row in the last 12h (not already above) | 49 | #16632, #16642–#16681, plus repriced older deals #652, #1822, #7683, #12798, #13311, #14012, #14458, #16134 |
| Newest posts | 6 | #615–#620 (`/blog/<slug>`; newest health-faucet-dripping-weak-spray-fix-by-symptom-india) |
| **Total** | **89** | Deduped |

`--paths` mode adds nothing on its own, so the hubs were listed by hand. `MSYS_NO_PATHCONV=1` kept Git Bash from rewriting `/x` into `C:/Program Files/Git/x`.

## Freshness

- **IndexNow:** **HTTP 200 for 89 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.59s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,126 | OK (unchanged since TG 11-16j) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,706 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,705 vs 16,706 | OK. #16706 is queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - #16682 (B0FXVPK6R7)
  - #16666 (B0FM8D7C1Z, GM Balin, "Only 1 left")
  - #10311 (B0GS675WDR, CELLO cooler)
- **#16224 slug:** still says "steel-insulated-tiffin-box" for a plastic lunch box. Kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at 01:05 IST on 11-17. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
