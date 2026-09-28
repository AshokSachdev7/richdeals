# SITEMON + CEO audit: 2026-09-28at (14:51 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.44s |
| /offers | 200 | 0.13s |
| /blog | 200 | 0.59s |
| /sitemap.xml | 200 | 0.34s |
| /feed.xml | 200 | 0.11s |
| /llms.txt | 200 | 0.35s |
| /api/deals | 200 | 0.10s |

## Deal-count sanity
- `/api/deals` total is 11,356, the same as the DB LIVE count of 11,356.
- `sitemap.xml` has 10,685 `<loc>` entries, 17 more than at tick 28aq. That matches the 17-deal IFS 28as batch.
  - The Benito slug from that batch is already in the sitemap.
  - The gap to the live count comes from the `dealIndexable()` filter and is by design.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3. No day at 0; today 3, cap 4. |
| Broadcast cursor | 11701 vs DB max 11703. It was 11686 at the last tick, so it has drained 15 of this batch (self-heals). |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
