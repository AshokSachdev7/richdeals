# SITEMON + CEO audit — 2026-09-28aq (13:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.42s |
| /offers | 200 | 0.15s |
| /blog | 200 | 0.64s |
| /sitemap.xml | 200 | 0.42s |
| /feed.xml | 200 | 0.15s |
| /llms.txt | 200 | 0.42s |
| /api/deals | 200 | 0.11s |

## Deal-count sanity
- `/api/deals` total is 11,339, the same as the DB LIVE count of 11,339.
- `sitemap.xml` has 10,668 `<loc>` entries, 2 more than at tick 28an.
  - The gap to the live count comes from the `dealIndexable()` filter and is by design.
  - Both 28ao Telegram deals (Dabur Ashwagandha, Zebronics K16) are already in the sitemap.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3. No day at 0; today 3, cap 4. |
| Broadcast cursor | **11686, equal to DB max 11686.** The cursor has fully caught up. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
