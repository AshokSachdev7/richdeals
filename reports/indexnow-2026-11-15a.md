# INDEXNOW tick — 2026-11-15a

Resubmitted the newest deal and post URLs, plus the sitemap and hubs, with `apps/api/scripts/indexnow-ping.mjs --paths` (`MSYS_NO_PATHCONV=1`). The list was built from the DB. It holds the 25 newest LIVE deals plus every deal with a priceHistory row in the last 12h (new pushes and price syncs: 94 deals in total, which include the 25 newest), the 6 newest posts, and the hubs listed by hand, because `--paths` mode adds nothing. Run at about 01:25 IST.

**Result: HTTP 200 for 106 urls from `api.indexnow.org`. Prod 7/7 returned 200 and every DB check is green.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs/feeds | 6 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Deal pages | 94 | 25 newest LIVE (#16559–16583) ∪ priceHistory in the last 12h (includes #3538 and #4692 syncs) |
| Blog posts | 6 | `/blog/<slug>` for posts 611–616 (newest: mink vs sherpa vs fleece blanket) |
| **Total** | **106** | `api.indexnow.org` → **HTTP 200** |

`MSYS_NO_PATHCONV=1` stops Git Bash from rewriting `/x` into `C:/Program Files/Git/x`, which caused the old 422 errors.

## Freshness

- `sitemap.xml`: ISR 1800s. The deals child carries the top 100 indexable deals only, by design.
- `llms.txt`: force-dynamic, rebuilt per request.
- No new static route was added, so `staticRoutes` needs no change.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.95s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.75s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,004 = 16,004 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,576 vs 16,583 | Pending, self-heals |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-15 has 1 so far. The 06:39 IST CONTENT-SEO run must add the second post.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
