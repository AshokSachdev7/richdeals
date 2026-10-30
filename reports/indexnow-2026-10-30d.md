# INDEXNOW: 2026-10-30d (window 2026-10-30T07:53Z → 13:54Z, IST 13:23 → 19:24)

**Result: 98 URLs submitted. api.indexnow.org returned HTTP 200 and Bing (www.bing.com/indexnow) returned HTTP 200, both for 98 URLs. The key file, the hubs and the sampled new and synced pages all return 200 on prod. The blog sitemap child and llms.txt carry the newest post (#579). CEO audit clean.**

Method:
- `$S/win1030d.cjs` (same query as 10-30c, window moved to start at the 10-30c tick, 07:53Z) read:
  - LIVE deals created in the window;
  - LIVE rows with a `PriceHistory.postedAt` in the window that are not new (price-synced; `updatedAt` is the click counter, so it is not used);
  - posts created in the window.
- `node apps/api/scripts/indexnow-ping.mjs <slugs...>` in slug mode with `MSYS_NO_PATHCONV=1`. Slug mode prefixes each arg with `/` and adds `/`, `/offers` and `/sitemap.xml`. The post and the extra hubs went in as `blog/<slug>`, `blog`, `feed.xml` and `llms.txt` slugs, so no `--paths` was used from Git Bash.
- The ping script only posts to api.indexnow.org, so the same 98-URL JSON body was POSTed to www.bing.com/indexnow.

## Submitted
| Group | URLs | Notes |
|---|---|---|
| New LIVE deals | 71 | #15585–15655 (DesiDime, IFS and TG ticks since 10-30c) |
| Price-synced LIVE rows | 20 | #520, #1102, #1357, #1688, #2092, #2151, #3556, #3832, #4237, #4859, #5644, #7863, #7897, #8942, #9231, #9527, #10425, #12872, #14280, #15349 |
| New post | 1 | #579 `/blog/laptop-privacy-screen-filter-size-guide-india` |
| Hubs (listed by hand) | 3 | `/blog`, `/feed.xml`, `/llms.txt` |
| Hubs (auto, slug mode) | 3 | `/`, `/offers`, `/sitemap.xml` |
| **Total** | **98** | |

## Endpoints
| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org/indexnow | 200 | 98 |
| www.bing.com/indexnow (POST) | 200 | 98 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200, body = key |
| `/`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`, `/api/deals`, `/sitemap.xml` | all 200 |
| `/blog/laptop-privacy-screen-filter-size-guide-india` (#579) | 200 |
| `/power-women-lace-up-sneakers-b09v2yls2l` (#15636, new) | 200 |
| `/story-home-beige-floral-queen-bedsheet-with-2-pillow-covers-40489116` (#15653, new, Myntra) | 200 |
| `/godrej-415l-1-star-frost-free-double-door-refrigerator-b0gy11wrbq` (#15654, new) | 200 |
| `/valueshop-1000w-hair-dryer-with-2-speed-settings-rkogef29mzmtjgfe` (#15655, new, Shopsy) | 200 |
| `/godrej-185l-5-star-single-door-refrigerator-direct-cool-b0gsg24816` (#14280, synced) | 200 |

## Freshness
- **Sitemap:**
  - The first fetch of `/sitemaps/blog/sitemap.xml` was a stale ISR copy without #579.
  - The re-fetch (`x-nextjs-cache: HIT`, regenerated) carries it: 432 `<loc>` entries, newest `<lastmod>` 2026-10-30T13:12:11Z.
  - This is ISR stale-while-revalidate (1800 s) working as designed. Nothing to fix.
- **llms.txt:** force-dynamic, and it carries #579.
- **feed.xml:** deals-only by design.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,102 = 15,102 |
| API newest id vs DB max | 15,655 = 15,655 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 450 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. 10-30: 4 (cap reached) |
| Broadcast cursor vs DB max | `lastId` 15,655 = 15,655 (fully drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS and DesiDime Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- `indexnow-ping.mjs` does not ping Bing; every tick POSTs to Bing by hand. Adding Bing to the script is optional.
- Rotate the DO API token.
