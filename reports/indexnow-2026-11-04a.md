# INDEXNOW 2026-11-04a (01:25 IST tick)

**Result: api.indexnow.org returned HTTP 200 for 61 URLs, and Bing (`www.bing.com/indexnow`) returned HTTP 200 for 61 URLs. The submission covered the last 6 hours of the DB: 42 new deals, 11 price-synced rows, 1 new post and 7 hub URLs. Every prod spot-check returned 200, the key file is served correctly, and the blog sitemap lists the newest post.**

## What was submitted

- **Window:** 2026-11-03T13:54Z to 19:55Z (6 hours).
- **Method:** I queried the DB with Prisma. New deals were selected by `createdAt`. Synced rows were selected by `priceHistory.postedAt`.
- **Command:** `indexnow-ping.mjs` in slug mode. Slug mode adds `/`, `/offers` and `/sitemap.xml` to the slugs given.

| Group | Count |
|---|---|
| New deals, LIVE (#16097-#16138) | 42 |
| Price-synced rows, LIVE (#1835, #3170, #4793, #5161, #6640, #8824, #8856, #9011, #12147, #12926, #12940) | 11 |
| New post (`blog/best-body-lotion-for-dry-skin-winter-india`, #589) | 1 |
| Hubs passed as slugs (`blog`, `llms.txt`, `feed.xml`, `sitemaps/deals/sitemap.xml`) | 4 |
| Hubs added by the script (`/`, `/offers`, `/sitemap.xml`) | 3 |
| **Total** | **61** |

- **api.indexnow.org:** the script printed `DONE: IndexNow -> HTTP 200 for 61 urls`.
- **Bing:** I posted the same 61 URLs to `www.bing.com/indexnow`, which returned `BING 200 61`.

## Prod spot-check

| URL | Status |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200, and the body equals the key |
| `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt /sitemaps/deals/sitemap.xml` | 9/9 200 |
| #16137 Lakme sunscreen, #16138 Rexona roll-on | 200 / 200 |
| #16123 Frontech adapter, #16136 Panasonic downlight | 200 / 200 |
| #12147 Striff laptop stand (synced) | 200 |
| `/blog/best-body-lotion-for-dry-skin-winter-india` | 200 |
| `/sitemaps/blog/sitemap.xml` lists the newest post | yes, on the recheck. The first fetch showed 0, most likely while ISR was regenerating. |
| `llms.txt` lists the newest post | yes |
| `feed.xml` | lists deals only, so the post is not expected there. Its newest items are #16138, #16137 and #16136. |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE / prod API total | 15,581 / 15,581 | equal |
| DB max id | 16,138 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 is under the rule; CONTENT-SEO at 06:32 IST must ship 1-2 more |
| Broadcast cursor | lastId 16,138 vs max 16,138 (file re-read) | drained |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **11-04 needs 1-2 more posts.** The next CONTENT-SEO run must ship them.
- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart and Shopsy verification is blocked, and about 22 items are held.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous.
  - #7820, #14840 and #8856 read NULL with no add-to-cart.
  - #14396 and #16122 have null MRPs.
  - #11896 is held.
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **The DO token needs rotating.** That is the owner's job.
