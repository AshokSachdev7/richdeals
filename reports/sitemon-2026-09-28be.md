# SITEMON + CEO audit: 2026-09-28be (18:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.30s |
| /offers | 200 | 0.13s |
| /blog | 200 | 0.65s |
| /sitemap.xml | 200 | 0.45s |
| /feed.xml | 200 | 0.19s |
| /llms.txt | 200 | 0.33s |
| /api/deals | 200 | 0.12s |

## Deal-count sanity
- `/api/deals` total is 11,423, the same as the DB LIVE count of 11,423.
- `sitemap.xml` has 10,754 `<loc>` entries, 32 more than at tick 28ay. The IFS 28bd batch is already in it: 2 of 2 spot-checked slugs are present.
- The gap to the live count comes from the `dealIndexable()` filter and is by design.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap of 4. |
| Broadcast cursor | Re-read the file: 11752, up from 11742 at 28bd. DB max is 11770. The external cron is working through the 28-deal IFS batch, so the gap of 18 is expected and self-heals. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
