# SITEMON + CEO audit: 2026-09-28ba (17:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.35s |
| /offers | 200 | 0.10s |
| /blog | 200 | 0.45s |
| /sitemap.xml | 200 | 0.53s |
| /feed.xml | 200 | 0.16s |
| /llms.txt | 200 | 0.35s |
| /api/deals | 200 | 0.16s |

## Deal-count sanity
- `/api/deals` total is 11,394, the same as the DB LIVE count of 11,394.
- `sitemap.xml` has 10,724 `<loc>` entries, 2 more than at tick 28ay. Those 2 are the backpack from Telegram 28az and the moringa refresh.
- The gap to the live count comes from the `dealIndexable()` filter and is by design.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3. No day at 0; today 3, cap 4. |
| Broadcast cursor | Re-read the file: 11741, equal to the DB max of 11741. Fully caught up. |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
