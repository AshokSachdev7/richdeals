# INDEXNOW tick — 2026-11-17a

This tick resubmitted the newest deal and post URLs, plus the sitemap and hub URLs, to IndexNow and Bing. It used `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode, with `MSYS_NO_PATHCONV=1` set. Run at about 01:09 IST.

**Result: IndexNow returned HTTP 200 for 67 URLs. Every CEO-audit check is green, all 7 prod endpoints return 200, and all 9 session crons are armed.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16698–#16722; the newest is #16722, the F Gear backpack |
| Repriced deals | 27 | LIVE deals with a `priceHistory` row in the last 12h that are not already in the newest group: #16671–#16697 |
| Newest posts | 6 | #616–#621 (`/blog/<slug>`); the newest is hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india |
| **Total** | **67** | Deduped |

`--paths` mode does not add the hub URLs, so they were listed by hand. `MSYS_NO_PATHCONV=1` stopped Git Bash from rewriting `/x` into `C:/Program Files/Git/x`.

The count is lower than in tick 11-16c (89 URLs). Every repriced deal in the last 12 hours was a recent ingest, and no older deals were repriced.

## Freshness

- **IndexNow:** **HTTP 200 for 67 URLs**.
- **`sitemap.xml`:** cached for up to 30 minutes (ISR, 1800s). By design, the deals child sitemap lists only the top 100 deals.
- **`llms.txt`:** rebuilt on every request (force-dynamic), so it is always current.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.12s) |
| /blog | 200 (1.02s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.57s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. The cursor is caught up, so #16722 has been broadcast. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post. The CONTENT-SEO runs at 06:39 and 12:39 IST will cover it.

## Still open

- **IFS source blocked:** every `?rto=` redirects to the homepage (8 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart has no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses on 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678, #16682, #16666, #10311, #16722
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating. This is an owner action.

The next INDEXNOW run is at 07:05 IST (11-17). Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
