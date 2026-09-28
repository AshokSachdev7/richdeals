# SITEMON + CEO audit: 2026-09-28ay (16:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.33s |
| /offers | 200 | 0.10s |
| /blog | 200 | 0.54s |
| /sitemap.xml | 200 | 0.32s |
| /feed.xml | 200 | 0.14s |
| /llms.txt | 200 | 0.43s |
| /api/deals | 200 | 0.15s |

## Deal-count sanity
- `/api/deals` total is 11,393, the same as the DB LIVE count of 11,393.
- `sitemap.xml` has 10,722 `<loc>` entries, 36 more than at tick 28av: the 35 deals from IFS 28ax plus the Nivea deal from Telegram 28aw. The sitemap was regenerated at 16:40 IST, so the whole batch is already in it.
- The gap to the live count comes from the `dealIndexable()` filter and is by design.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3. No day at 0; today 3, cap 4. |
| Broadcast cursor | Re-read the file: 11715, up from 11705 at 28ax. DB max is 11740. The external cron is working through the 35-deal IFS batch, so the gap of 25 is expected and self-heals. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
