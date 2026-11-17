# INDEXNOW tick — 2026-11-17c

The tick resubmitted the newest deal and post URLs, plus the sitemap and hub paths, through `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode (`MSYS_NO_PATHCONV=1`). `--paths` mode adds no URLs of its own, so the hubs and sitemaps were listed by hand. Run at about 13:05–13:16 IST.

**Result: HTTP 200 for 60 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16722–#16746, by id |
| Repriced in the last 12 h, outside the newest 25 | 20 | priceHistory `postedAt` ≥ now − 12 h: #219, #327, #952, #1012, #1411, #1443, #3172, #4912, #5355, #5727, #10755, #11304, #12443, #12714, #12939, #12963, #13767, #13809, #14110, #15041 |
| Newest posts | 6 | #618–#623 |
| **Total** | **60** | `indexnow-ping.mjs` → **HTTP 200** |

The repriced group is there because a price change rewrites the Offer schema on a page that is already indexed, and a stale Offer price is what demotes deal pages.

## Freshness

- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design. The blog child picks up #623 within 30 minutes of its 12:5x IST publish.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** deals only, by design.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.81s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.56s) |

## CEO audit

Run at 13:15 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,166 = 16,166 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,746 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,746 vs 16,746 | OK. Caught up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 13:16 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target; the 18:39 IST CONTENT-SEO run may add a fourth (the cap) or skip.

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at about 19:05 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
