# SITEMON + CEO audit — 2026-09-28an (18:21 IST)

## Prod endpoints: 7/7 return 200
| Path | Code | Time |
|---|---|---|
| / | 200 | 0.25s |
| /offers | 200 | 0.14s |
| /blog | 200 | 0.62s |
| /sitemap.xml | 200 | 0.55s |
| /feed.xml | 200 | 0.10s |
| /llms.txt | 200 | 0.37s |
| /api/deals | 200 | 0.12s |

## Deal-count sanity
- `/api/deals` total is 11,337, the same as the DB LIVE count of 11,337. Newest deal is id 11684, from the 36-deal IFS batch in tick 28am.
- `sitemap.xml` has 10,666 `<loc>` entries.
  - The gap to the live count comes from the `dealIndexable()` filter and is by design.
  - Growth is in step: at tick 28w there were 10,602 locs for 11,274 live; now there are 64 more locs for 63 more live deals.
  - Three spot-checked slugs from the 28am batch are already in the sitemap.
- `llms.txt` has no deal rows by design: `route.ts` lists only posts (newest 30), stores and categories. The newest post, `air-fryer-size-guide-…`, is present, so the file is fresh.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless posts | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3. No day at 0; today 3, cap 4. |
| Broadcast cursor | 11663 vs DB max 11684. It was 11653 at the last tick, so it is advancing and draining the 28am batch (self-heals). |
| Unpushed commits | 0 |

Result: **0 rot, nothing to fix.**
