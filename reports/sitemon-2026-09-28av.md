# SITEMON + CEO audit: 2026-09-28av (15:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.24s |
| /offers | 200 | 0.15s |
| /blog | 200 | 0.61s |
| /sitemap.xml | 200 | 0.36s |
| /feed.xml | 200 | 0.11s |
| /llms.txt | 200 | 0.42s |
| /api/deals | 200 | 0.19s |

## Deal-count sanity
- `/api/deals` total is 11,357, the same as the DB LIVE count of 11,357.
- `sitemap.xml` has 10,686 `<loc>` entries, 1 more than at tick 28at. That is the American Tourister Liftoff+ deal from Telegram 28au, which is present in the sitemap.
- The gap to the live count comes from the `dealIndexable()` filter and is by design.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3. No day at 0; today 3, cap 4. |
| Broadcast cursor | **11704, equal to DB max 11704.** The cursor has fully caught up. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
