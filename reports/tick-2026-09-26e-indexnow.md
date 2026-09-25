# INDEXNOW tick 2026-09-26e (01:25 IST)

**`api.indexnow.org` rate-limited the POST with HTTP 422. The Bing GET fallback then accepted all 72 URLs, each with HTTP 200, so 0 were left over.**

## Submitted

The window is the last 6 hours, 19:25 on 09-25 → 01:25 IST. URLs were taken from the DB: LIVE deals by `createdAt`, and posts by `publishedAt`.

| Group | URLs |
|---|---|
| Hub pages: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` | 5 |
| LIVE deals, ids 11312–11377 (this includes the IFS 0926b batch 11344–11377) | 66 |
| Posts: `/blog/wireless-power-bank-vs-wired-india-2026` | 1 |
| **Total** | **72** |

1. **Primary:** `node scripts/indexnow-ping.mjs --paths /offers /blog /sitemap.xml /feed.xml <67 paths>` returned HTTP 422 for 71 URLs. This call did not include `/`.
2. **Fallback:** a Bing GET, `www.bing.com/indexnow?url=…&key=…`, was sent once per URL, including `/`. All 72 returned HTTP 200.

## CEO audit (checked against the DB and prod)

| Check | Result |
|---|---|
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200 |
| Deals | 11,030 live, 0 pending review, 0 with a null price, 0 with a null image. Highest id 11377 |
| Posts | 332, with 0 missing a cover and 0 missing SEO fields |
| Posts per IST day, 09-17 → 09-26 | 3/3/3/2/1/3/2/3/4/1. No day is 0; the CONTENT-SEO cron will add more today |
| Sitemap | 10,348 `<loc>` |
| Broadcast cursor | `lastId` 11377, which equals the DB max, so the backlog is fully drained |
| Git | 0 unpushed commits before this one |

Nothing is rotting.
