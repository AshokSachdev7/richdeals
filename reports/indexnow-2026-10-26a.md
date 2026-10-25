# IndexNow tick — 2026-10-26a (~01:30 IST)

## Submitted

This tick covered the last 6 hours, read from the DB: 39 LIVE deals and 1 post.

| Endpoint | URLs | HTTP |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`, slug mode) | 47 | **200** |
| bing.com/indexnow (direct POST, spot set) | 3 | **200** |

The 47 URLs break down as:

- 39 deal slugs, #14860 back to #14822. They cover the TG 10-25j to 10-25n batches, desidime 10-26a, IFS 10-26a and TG 10-26a;
- 1 post, `/blog/how-to-replace-health-faucet-hose-pipe-india` (post 528);
- 4 hubs added by hand: `/blog`, `/feed.xml`, `/llms.txt`, `/sitemaps/pages/sitemap.xml`;
- 3 added by slug mode: `/`, `/offers`, `/sitemap.xml`.

The Bing spot set was #14860, post 528 and `/sitemap.xml`.

All arguments were passed without a leading slash, so MSYS did not mangle any path.

## CEO audit

| Check | Result |
|---|---|
| Prod endpoints | 8/8 return 200: `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /sitemaps/pages/sitemap.xml` |
| Newest deal on prod | #14860 (Centuary mattress, TG 10-26a) returns 200 |
| Broadcast cursor | 14860 = DB max, fully drained |
| LIVE / PENDING_REVIEW / null price / null image | 14,329 / 0 / 0 / 0 |
| Coverless or seo-less posts | 0 |
| Posts today (IST) | 1. CONTENT-SEO runs next at 06:39 |
| Crons | 9/9 present in CronList |
| Unpushed commits | 0 before this commit |

Nothing rotting.
