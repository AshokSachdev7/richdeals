# INDEXNOW tick — 2026-11-17d

The tick resubmitted the newest deal and post URLs, plus the sitemap and hub paths, through `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode (`MSYS_NO_PATHCONV=1`). `--paths` mode adds no URLs of its own, so the hubs and sitemaps were listed by hand. The path list was built by `apps/api/_inx1117d.cjs` (scratch, not committed). Run at about 19:08–19:10 IST.

**Result: HTTP 200 for 45 URLs. Every CEO-audit check is green, the broadcast cursor is caught up, and all 9 session crons are armed.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16738–#16762, by id |
| Repriced since the last tick, outside the newest 25 | 5 | priceHistory `postedAt` ≥ now − 6 h: #5084, #9352, #13935, #14393, #16729 |
| Newest posts | 6 | #618–#623 |
| **Total** | **45** | `indexnow-ping.mjs` → **HTTP 200** |

The repriced window is 6 hours this time, matching the gap since INDEXNOW 11-17c (13:05 IST), whose 12-hour window already covered everything before it. A price change rewrites the Offer schema on a page that is already indexed, and a stale Offer price is what demotes deal pages.

## Freshness

- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design. No post has been published since #623 (12:44 IST), so the blog child is already current.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** deals only, by design.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.18s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (1.26s) |

## CEO audit

Run at 19:09 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,182 = 16,182 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,762 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,762 vs 16,762 | OK. Caught up; #16762 (SPARX sandal, TG-MONITOR 11-17t) has gone out. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 19:09 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i and j, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Minor:** the Fujifilm #10710 title shows "₹45999" without a thousands comma.
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at about 01:05 IST (11-18), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
