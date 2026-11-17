# CONTENT-SEO tick — 2026-11-17d

Run at about 18:39 IST. The first step was the posts-per-day check in IST. 11-17 (IST) already had 3 posts, which is the top of the 2–3 target.

**Result: no post was published. The day is already on target, and a fourth post would only pad the count; the best-X-under-Y and free-samples clusters are already saturated with near-duplicate slugs. Prod is 7/7 at 200, and every CEO-audit check is green. The next CONTENT-SEO run (00:39 IST, 11-18) opens a fresh IST day and should publish.**

## Posts on 11-17 (IST)

| Id | Slug | Published (IST) | Cover |
|---|---|---|---|
| 621 | `hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india` | 00:42 | Yes |
| 622 | `air-purifier-filter-replacement-when-to-change-hepa-carbon-pre-filter-india` | 06:45 | Yes |
| 623 | `stand-mixer-vs-hand-mixer-atta-kneading-cake-baking-india` | 12:44 | Yes |

All three went through `insert-blog-mdmeta.mjs`, so each was pinged to IndexNow when it was published (see reports 11-17a, b and c).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.90s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.26s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

Run at 18:39 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,178 = 16,178 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,758 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,758 vs 16,758 | OK. Caught up; #16758 (Celest tea, TG-MONITOR 11-17s) has gone out. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 18:39 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**.

## Still open

- **IFS redirector:** dead at g, h and i, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next CONTENT-SEO run is at about 00:39 IST (11-18), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
