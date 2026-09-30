# INDEXNOW — 2026-10-01a (01:10 IST)

**api.indexnow.org → HTTP 200 for 38 URLs · Bing fallback not needed (no 422)**

## Submitted (6h window, 19:10 → 01:10 IST)
- 34 LIVE deals (created in window)
- 1 post (`/blog/<slug>`)
- 3 hub URLs the script always adds: `/`, `/offers`, `/sitemap.xml`
- Total 38 = 34 + 1 + 3

## CEO audit
- Prod 7/7 → 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- DB: LIVE 11,719 · EXPIRED 388 · max id 12,195 · LIVE null price 0 · LIVE null image 0 · PENDING_REVIEW 0
- Posts: 352 total · coverless 0 · seo-less 0. IST/day: 09-28 4, 09-29 4, 09-30 4, 10-01 1 (01:10 IST; the BLOG cron `9 */6` covers the rest)
- Broadcast cursor: file re-read. lastId 12195 = DB max
- Unpushed commits: 0 before this report
