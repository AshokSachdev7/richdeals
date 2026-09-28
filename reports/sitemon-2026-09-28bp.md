# SITEMON + CEO audit: 2026-09-28bp (22:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.22s |
| /offers | 200 | 0.11s |
| /blog | 200 | 0.75s |
| /sitemap.xml | 200 | 0.14s |
| /feed.xml | 200 | 0.13s |
| /llms.txt | 200 | 0.57s |
| /api/deals | 200 | 0.11s |

## Deal-count sanity
- `/api/deals` total is 11,451, the same as the DB LIVE count of 11,451.
- `sitemap.xml` is a sitemap index with 19 chunk `<loc>` entries.
- The per-chunk URL sum ran in the background and did not finish inside this tick, so it is not reported here. The sitemap is ISR 30 min and picks up new deals automatically.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap of 4. |
| Broadcast cursor | Re-read the file: 11798, equal to DB max 11798. The IFS 28bo batch is fully broadcast. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
