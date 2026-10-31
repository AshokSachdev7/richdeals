# INDEXNOW: 2026-10-31c (~13:27 IST)

**Result: `api.indexnow.org` returned HTTP 200 for 91 URLs: the last 6h of deals and posts plus the hubs. The key file and all sampled new pages return 200 on prod. The blog sitemap carries post #582, and the CEO audit is clean.**

## Window (since 2026-10-31T01:55Z, about 07:25 IST)
`scratchpad/in1031.cjs` built this list from the DB. `updatedAt` is the click counter, so `priceHistory.postedAt` is used as the price-sync signal.

| Source | Count |
|---|---|
| New LIVE deals | 72 (#15721–#15792: the IFS f/g, DesiDime f/g and TG k/l/m batches) |
| Price-synced older LIVE rows (priceHistory) | 14 (#977, #1527, #1863, #2985, #7198, #8294, #9020, #9885, #10427, #12941, #13592, #14032, #14873, #15484) |
| Unique deal slugs | 86 |
| New posts | 1 (#582 `are-smart-bmi-scales-accurate-body-fat-readings-explained-india`) |

## Ping
- Command, run from the repo root in slug mode: `node apps/api/scripts/indexnow-ping.mjs <86 deal slugs> blog/<post-slug> blog`.
  - Slug mode adds `/`, `/offers` and `/sitemap.xml`.
  - `--paths` was not used, so MSYS path mangling could not happen.
- **api.indexnow.org returned HTTP 200 for 91 URLs:** 86 deals, the post, `/blog` and the 3 hubs.
- Bing:
  - The script makes no separate Bing request; IndexNow shares submissions with Bing.
  - A direct Bing GET was not sent, because Bing GETs return 403 after about 50 requests and this batch is 91 URLs.

## Spot-checks (prod)
| URL | Status |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200, body = key |
| `/yellow-rock-crawler-remote-control-car-with-led-headlights-b0gpdczxmp` (#15790) | 200 (0.21 s) |
| `/himalaya-refreshing-and-clarifying-toner-100ml-b004jvyhle` (#15792) | 200 (0.25 s) |
| `/cult-active-digital-body-weighing-scale-180-kg-with-lcd-blue-b0h4gyfd58` (#15756) | 200 (0.20 s) |
| `/garnier-color-naturals-keratin-hair-colour-shade-1-natural-black-b006qhbc76` (window) | 200 (0.19 s) |
| `/blog/are-smart-bmi-scales-accurate-body-fat-readings-explained-india` (#582) | 200 (0.67 s) |

**Sitemap**
- The index lists 3 children: pages, deals and blog.
- The first fetch of `sitemaps/blog/sitemap.xml` did not contain the #582 slug. The likely cause is a stale ISR page, with the fetch triggering a rebuild; the same thing happened at 10-31b.
- A refetch about 45 s later returned 435 URLs (434 at 10-31b) and included #582, with lastmod 2026-10-31T07:43Z.
- That is inside the 1800 s revalidate window, so this is not rot.
- `llms.txt` also carries #582.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.10–0.52 s) |
| API total vs DB LIVE | prod 15,238 = DB 15,238 |
| API newest id vs DB max | 15,792 = 15,792 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 453 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 3 |
| Broadcast cursor vs DB max | `lastId` 15,775 vs 15,792. The cursor ts is 13:24 IST, 2 minutes old. It moved up from 15,770, so it is draining, not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
