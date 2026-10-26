# IndexNow tick · 2026-10-26c (~13:25 IST)

## Submitted

This tick covered the last 6 hours, read from the DB: 68 LIVE deals (#14935 back to #14868) and 2 posts.

| Endpoint | URLs | HTTP |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`, slug mode) | 78 | **200** |
| www.bing.com/indexnow (direct POST, same list) | 78 | **200** |

The 78 URLs break down as:

- 68 deal slugs, covering the TG 10-26f to 10-26h, DesiDime 10-26d and 10-26e, and IFS 10-26d and 10-26f batches;
- the AXE Signature Mysterious slug (#7459), which was re-priced in TG 10-26i;
- 2 posts: `/blog/why-food-sticks-to-stainless-steel-pan-how-to-stop-india` (post 529) and `/blog/cordless-vs-corded-car-pressure-washer-india` (post 530);
- 4 hubs added by hand: `/blog`, `/feed.xml`, `/llms.txt`, `/sitemaps/pages/sitemap.xml`;
- 3 added by slug mode: `/`, `/offers`, `/sitemap.xml`.

All arguments were passed without a leading slash, so MSYS did not mangle any path.

## CEO audit

| Check | Result |
|---|---|
| Prod endpoints | 8/8 return 200: `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /sitemaps/pages/sitemap.xml` |
| LIVE / PENDING_REVIEW / null price / null image | 14,404 / 0 / 0 / 0 |
| Posts without a cover | 0 |
| Posts today (IST) | 3 |
| Broadcast cursor | 14935, equal to DB max |
| Crons | 9/9 present in CronList |
| Unpushed commits | 0 before this commit |

Nothing rotting.
