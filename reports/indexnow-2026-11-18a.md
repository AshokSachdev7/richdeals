# INDEXNOW tick — 2026-11-18a

The tick resubmitted the newest deal and post URLs, plus the sitemap and hub paths, through `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode (`MSYS_NO_PATHCONV=1`). `--paths` mode adds no URLs of its own, so the hubs and sitemaps were listed by hand. The path list was built by `apps/api/_inx1118a.cjs` (scratch, not committed; a copy of `_inx1117d.cjs`). Run at about 01:07–01:10 IST.

**Result: HTTP 200 for 47 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16749–#16773, by id |
| Repriced since the last tick, outside the newest 25 | 7 | priceHistory `postedAt` ≥ now − 6 h: #2594, #3428, #3542, #3681, #4683, #12745, #16044 |
| Newest posts | 6 | #619–#625 (6 rows; #625 is the 11-18 winter laundry post) |
| **Total** | **47** | `indexnow-ping.mjs` → **HTTP 200** |

The repriced window is 6 hours, matching the gap since INDEXNOW 11-17d (19:08 IST). It includes #3542 (Amazon Basics exhaust fan), which DESIDIME 11-18a re-synced from ₹765 to ₹1,499. A price change rewrites the Offer schema on a page that is already indexed, and a stale Offer price is what demotes deal pages.

## Freshness

- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design. The blog child picks up #625 (published about 00:44 IST) within 30 minutes of publication.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** deals only, by design.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.90s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 01:09 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,772 vs 16,773 | OK. The cursor was written at 00:09 IST; #16773 (Athom towels, TG-MONITOR 11-18b, pushed about 01:00 IST) goes out on the external broadcast cron's next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 01:09 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The day is about an hour old. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through m, after a 7 of 93 partial at f. If the remaining 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Telegram search-page share:** 4 of 5 new links in TG 11-18b were `/s?` search pages.
- **DesiDime yield:** Amazon cards are showing bank-offer or coupon prices.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#3542:** price moved from ₹765 to ₹1,499; re-read it on the next dup hit.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:** unchanged from TG-MONITOR 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at about 07:05 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
