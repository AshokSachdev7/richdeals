# SITEMON + CEO audit: 2026-09-28bm (21:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.33s |
| /offers | 200 | 0.13s |
| /blog | 200 | 0.54s |
| /sitemap.xml | 200 | 0.36s |
| /feed.xml | 200 | 0.14s |
| /llms.txt | 200 | 0.51s |
| /api/deals | 200 | 0.16s |

## Deal-count sanity
- `/api/deals` total is 11,440, the same as the DB LIVE count of 11,440.
- `sitemap.xml` has 10,771 `<loc>` entries, 3 more than at 28bk. The Telegram 28bl batch is already in it: 2 of 2 spot-checked slugs are present.
- The gap to the live count comes from the `dealIndexable()` filter and is by design.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap of 4. |
| Broadcast cursor | Re-read the file: 11787, which equals DB max 11787. Caught up. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
