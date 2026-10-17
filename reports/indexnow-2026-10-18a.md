# INDEXNOW tick 2026-10-18a (01:23 IST)

**IndexNow HTTP 200, 66 URLs in one `--paths` call.**

## What was submitted

| Group | Count | Source |
|---|---|---|
| New LIVE deals, created in the last 6 h | 57 | DB (`createdAt >= now-6h`, status LIVE) |
| New posts, last 6 h | 1 | `/blog/roll-on-vs-spray-deodorant-vs-antiperspirant-which-to-buy-india` |
| Hubs | 8 | `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/freebies` `/coupons` |
| **Total** | **66** | `MSYS_NO_PATHCONV=1 node scripts/indexnow-ping.mjs --paths ...` → HTTP 200 |

Not resubmitted: 68 LIVE rows whose only change in the window was `updatedAt` (the click counter, not a content change). `/freebies`, `/coupons` and `/stores` were checked first and all return 200.

## CEO audit (01:23 IST, from the DB)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 1 (1 h 23 min into the day; CONTENT-SEO cron present) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,998 |
| DB max id / broadcast cursor | 13522 / 13522, caught up |
| Newest deal age | 14 min (id 13522) |
| Prod endpoints | all 7 returned 200 at 01:12 (SITEMON 18b) |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 match the roster |

No rot found.
