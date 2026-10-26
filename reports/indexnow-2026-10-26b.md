# IndexNow tick · 2026-10-26b

## Submitted

This tick covered the last 6 hours, read from the DB: 26 LIVE deals (#14893 back to #14868) and 1 post.

| Endpoint | URLs | HTTP |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`, slug mode) | 35 | **200** |

The 35 URLs break down as:

- 26 deal slugs, covering the TG 10-26f, DesiDime 10-26d and IFS 10-26d batches;
- the Tower fry pan slug (#11937), which was re-priced in IFS 10-26d;
- 1 post, `/blog/why-food-sticks-to-stainless-steel-pan-how-to-stop-india` (post 529);
- 4 hubs added by hand: `/blog`, `/feed.xml`, `/llms.txt`, `/sitemaps/pages/sitemap.xml`;
- 3 added by slug mode: `/`, `/offers`, `/sitemap.xml`.

All arguments were passed without a leading slash, so MSYS did not mangle any path.

## CEO audit

| Check | Result |
|---|---|
| Prod endpoints | 8/8 return 200: `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /sitemaps/pages/sitemap.xml` |
| LIVE / PENDING_REVIEW / null price / null image | 14,362 / 0 / 0 / 0 |
| Posts without a cover | 0 |
| Posts today (IST) | 2. CONTENT-SEO runs next at 12:39 |
| Broadcast cursor | 14878 vs DB max 14893. The external cron lags here by design, so this is not rot. |
| Crons | 9/9 present in CronList |
| Unpushed commits | 0 before this commit |

Nothing rotting.
