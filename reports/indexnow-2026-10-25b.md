# IndexNow tick — 2026-10-25b (~19:25 IST)

## Submitted

This tick covered the last 6 hours, read from the DB: 72 LIVE deals and 1 post.

| Endpoint | URLs | HTTP |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`, slug mode) | 80 | **200** |
| bing.com/indexnow (direct POST, spot set) | 3 | **200** |

The 80 URLs break down as:

- 72 deal slugs, from #14821 back through the IFS 10-25d, desidime 10-25e and TG 10-25g/h/i batches;
- 1 post, `/blog/how-to-use-magic-eraser-melamine-sponge-walls-india` (post 527);
- 4 hubs added by hand: `/blog`, `/feed.xml`, `/llms.txt`, `/sitemaps/pages/sitemap.xml`;
- 3 added by slug mode: `/`, `/offers`, `/sitemap.xml`.

All arguments were passed without a leading slash, so MSYS did not mangle any path.

## CEO audit

| Check | Result |
|---|---|
| Prod endpoints | 8/8 return 200: `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /sitemaps/pages/sitemap.xml` |
| Newest deal on prod | #14821 (LG minibar, TG 10-25i) |
| Broadcast cursor | 14821, fully drained |
| LIVE / PENDING_REVIEW / null price / null image | 14,291 / 0 / 0 / 0 (as of 19:10) |
| Posts today (IST) | 2. CONTENT-SEO runs next at 00:39 |
| Crons | 9/9 present in CronList |
| Unpushed commits | 0 before this commit |

Nothing rotting.
