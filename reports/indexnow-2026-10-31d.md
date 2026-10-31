# INDEXNOW: 2026-10-31d (~19:24 IST)

**Result: 100 URLs sent to IndexNow, HTTP 200. The key file is live. The deal pages checked and post #583 all return 200. Post #583 appears in both the blog sitemap and `llms.txt`. CEO audit clean.**

## Window (last 6 h, since 2026-10-31T07:54Z)
| Signal | Count | Notes |
|---|---|---|
| New LIVE deals (`createdAt`) | 84 | #15793–15876. Sources: IFS 10-31i/j, DesiDime j, TG p–s |
| Price-synced LIVE rows (`priceHistory.postedAt`) | 11 that were not also new | #447, 1433, 1546, 2903, 3198, 9186, 12142, 12838, 14123, 14228, 14702 |
| Unique deal slugs | **95** | |
| New posts | 1 | #583 `/blog/hdmi-capture-card-buying-guide-usb-2-0-vs-3-0-india` |

`updatedAt` was not used as a change signal because it is the click counter.

## Ping
- Command: `node apps/api/scripts/indexnow-ping.mjs <95 deal slugs> blog/<post-slug> blog`, run in slug mode. `--paths` was not used, because Git Bash mangles paths in that mode.
- Result: **api.indexnow.org returned HTTP 200 for 100 URLs.**
  - 100 = 95 deals + 1 post + `/blog` + 3 hub paths that slug mode adds (`/`, `/offers`, `/sitemap.xml`).
- Bing: no separate request. Bing receives submissions through IndexNow's shared network, and direct Bing GETs return 403 after about 50 requests.

## Spot-check (prod)
| URL | HTTP | Time |
|---|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200 | Response body is the key |
| `/united-colors-of-benetton-men-collar-placket-tipping-polo-t-shirt-b0f7gr93wy` (#15876) | 200 | 0.18 s |
| `/hp-gk400y-mechanical-gaming-keyboard-rgb-backlit-b0cx8mh9xn` (synced) | 200 | 0.17 s |
| `/multi-purpose-stainless-steel-kitchen-scissors-with-cover-b0drv5wp97` (#14228 synced) | 200 | 0.18 s |
| `/asus-vivobook-15-2026-intel-core-3-304-8gb-256gb-ssd-laptop-b0hkmbdz5y` (#15793) | 200 | 0.23 s |
| `/blog/hdmi-capture-card-buying-guide-usb-2-0-vs-3-0-india` (#583) | 200 | 0.96 s |

## Sitemap
- The index has 3 children: pages, deals and blog.
- `sitemaps/blog/sitemap.xml` now has 436 locs and includes #583.
  - The first fetch returned the cached ISR copy, which did not have the post yet. The second fetch, after regeneration, did. This is expected behaviour, not a fault.
- Deals: only the top 100 are in the sitemap, by design.

## llms.txt
Lists #583. The file is dynamic and needs no action.

## CEO audit (~19:24 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.16 s, `/offers` 0.14 s, `/blog` 0.62 s, `/sitemap.xml` 0.12 s, `/feed.xml` 0.14 s, `/llms.txt` 0.42 s, `/api/deals` 0.11 s |
| API total vs DB LIVE | prod 15,322 = local 15,322 = DB 15,322 |
| DB max id | 15,876 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 454 total, 0 without a cover, 0 without SEO fields |
| Posts per day (IST) | 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4 (cap) |
| Broadcast cursor vs DB max | `lastId` 15,876 = max. Fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. As a result:
  - The Telegram tick reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified: #2279, #4172, #3663, #2483, #6409, #4430, #4171. #3881 is also unverified.
- JioMart #37 is a candidate for delisting.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need a manual look at the product page.
- Prose drift on deals outside the top 100: 118 descriptions and 32 titles.
- Rotate the DO API token.
