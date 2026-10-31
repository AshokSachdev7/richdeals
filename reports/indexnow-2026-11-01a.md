# INDEXNOW: 2026-11-01a (~01:23 IST)

**Result: 61 URLs submitted to api.indexnow.org, HTTP 200. That covers 56 deal slugs (44 new #15877–15920 and 12 price-synced rows), post #584, `/blog`, and 3 hub paths. The key file and every spot-checked page return 200 on prod. The blog sitemap and `llms.txt` both carry #584. CEO audit clean.**

## Window (last 6 h: 2026-10-31T13:53Z → 19:53Z, about 19:23 → 01:23 IST)
| Signal | Count | Notes |
|---|---|---|
| New LIVE deals (`createdAt`) | 44 | #15877–15920. Sources: DESIDIME, IFS 10-31 + 11-01a, TG 10-31 + 11-01a |
| Price-synced LIVE rows (`priceHistory.postedAt`, not also new) | 12 | #723, 3917, 5163, 10105, 10340, 10955, 11077, 12834, 13485, 13942, 14871, 15270 |
| Unique deal slugs | 56 | |
| New posts (`createdAt`) | 1 | #584 `ukulele-size-guide-soprano-vs-concert-vs-tenor` |
| Hubs | `/blog` + 3 hubs the script adds itself (`/`, `/offers`, `/sitemap.xml`) | |

`updatedAt` is not used as a change signal, because it is the click counter.

## Ping
- Command: `node apps/api/scripts/indexnow-ping.mjs $(tr -d '\r' < idx1101a.txt) blog/ukulele-size-guide-soprano-vs-concert-vs-tenor blog`. Slug mode, run from Git Bash; `--paths` was not used.
- **api.indexnow.org: HTTP 200 for 61 URLs** (56 deals + 1 post + `/blog` + 3 hubs).
- **Bing:** reached through the shared IndexNow network, so it is covered by the same 200. No direct Bing GET was sent, because direct GETs return 403 after about 50 requests.

## Spot-check (prod)
| URL | HTTP | Time |
|---|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (body = key) | 200 | 0.14 s |
| `/blog/ukulele-size-guide-soprano-vs-concert-vs-tenor` (#584) | 200 | 0.92 s |
| `/daluci-strong-adhesive-wall-door-hooks-pack-of-10-hokfj9whfmfkumhn` (#15920, newest) | 200 | 0.23 s |
| `/crompton-fabrimagic-neo-1200w-steam-iron-b0dvc3rq41` (#15916) | 200 | 0.28 s |
| `/utopia-bedding-memory-foam-cervical-pillow-2-year-warranty-b0hlkykj42` (#15907) | 200 | 0.25 s |
| `/orient-electric-instaflo-neo-5-9-litre-instant-water-heater-b0g3grqmc4` (#15877, oldest in window) | 200 | 0.20 s |
| `/newborn-baby-gift-set-7-in-1-care-combo-b0g5jv` (#723, synced) | 200 | 0.18 s |
| `/safari-ashper-cb-30l-laptop-backpack-6-pockets-bkpgh8yn3vrqf7zh` (#13942, synced) | 200 | 0.23 s |

## Sitemap
- `/sitemap.xml` is an index with 3 children: pages, deals, blog.
- `sitemaps/blog/sitemap.xml`:
  - The first fetch returned the stale ISR copy: 436 locs, without #584.
  - That fetch triggered a revalidate (`x-nextjs-cache: HIT`).
  - The next two fetches returned **437 locs, with #584**.
- Deals child = top-100 only, by design. The other deal pages are `noindex,follow`, so IndexNow is how they get discovered.

## llms.txt
- Returns 200 in 0.62 s and lists #584 (1 match for the ukulele slug).
- It is `force-dynamic`, and no new hub was added.

## CEO audit (~01:25 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.17 s, `/offers` 0.14 s, `/blog` 0.66 s, `/sitemap.xml` 0.12 s, `/feed.xml` 0.13 s, `/llms.txt` 0.62 s, `/api/deals` 0.14 s, `/robots.txt` 0.20 s |
| API total vs DB LIVE | prod 15,365 = local 15,365 = DB 15,365 |
| DB max id | 15,920 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 455 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4, 11-01: 1 (CONTENT-SEO next run 06:32 IST) |
| Broadcast cursor vs DB max | File re-read: `lastId` 15,920 = max. Fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster (CronList) |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of the 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need someone to look at the product page by hand.
- Prose drift on deals outside the top 100: 118 descriptions and 32 titles.
- The DO API token needs rotating.
