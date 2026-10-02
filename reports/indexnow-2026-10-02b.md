# INDEXNOW — 2026-10-02 (13:10 IST)

**Submitted 52 URLs to api.indexnow.org and got HTTP 200. The Bing fallback was not needed (it is only used on a 422).**

| Bucket | URLs |
|---|---|
| LIVE deals created in the last 6 h (from the DB, `createdAt` ≥ now − 6 h) | 47 |
| Posts created in the last 6 h (`/blog/cycle-size-by-height-20t-24t-26t-27-5t-india`) | 1 |
| `/blog` hub | 1 |
| `/`, `/offers`, `/sitemap.xml` (always added by the script) | 3 |
| **Total** | **52** |

Command: `node apps/api/scripts/indexnow-ping.mjs blog <47 deal slugs> blog/<post slug>`, which returned `DONE: IndexNow -> HTTP 200 for 52 urls`.

## CEO audit (13:10 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,848 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,326 / 12,323. The cursor moved 12,313 → 12,323, so the gap is nearly drained. |
| Unpushed commits | 0 before this report |

No rot found.
