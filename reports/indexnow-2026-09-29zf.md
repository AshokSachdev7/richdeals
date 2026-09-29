# INDEXNOW tick: 2026-09-29zf (19:10 IST)

## Submission
- Window: last 6 h, pulled from the DB via Prisma: **40 LIVE deals + 1 blog post** (`blog/<slug>`).
- Script: `apps/api/scripts/indexnow-ping.mjs`, key `33f3a9d63ca15676bbd90586ea80e65f`. It adds `/`, `/offers` and `/sitemap.xml`.
- Result: **HTTP 200 from api.indexnow.org for 44 URLs** (41 + 3). No 422, so the Bing GET fallback was not needed.

## CEO audit (DB)
| Check | Result |
|---|---|
| Prod endpoints | 7/7 return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`) |
| Live deals | 11,573 = API total (max id 11922) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 347; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 → 09-29: 4 each |
| Broadcast cursor | 11922 = DB max |
| Unpushed commits | 0 before this report |

Result: **44 URLs, IndexNow 200, 0 rot.**
