# INDEXNOW tick 2026-09-28bg (19:10 IST)

## Submission
- Window: last 6 hours. **85 LIVE deals + 1 post** were created in it (the BP monitor cuff size guide).
- Pinged via `indexnow-ping.mjs` (key `33f3a9d6…e65f`). The script adds `/`, `/offers` and `/sitemap.xml`, so **89 URLs** went out.
- **api.indexnow.org: HTTP 200.** There was no 422, so the Bing GET fallback was not needed.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,424 |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0. |
| Broadcast cursor | 11771 = DB max, fully caught up |
| Prod endpoints | 7/7 return 200 (`/blog` slowest at 0.52s) |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
