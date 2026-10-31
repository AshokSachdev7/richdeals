# INDEXNOW: 2026-10-31b (~07:25 IST)

**Result: IndexNow `api.indexnow.org` returned HTTP 200 for 29 URLs. The URLs were the last 6h of deals and posts plus the hubs. The key file and all sampled new pages return 200 on prod, the blog sitemap carries post #581, and the CEO audit is clean.**

## Window (since 2026-10-30T19:54Z, about 01:24 IST)
Built from the DB by `scratchpad/in1031.cjs`. `updatedAt` is the click counter, so `priceHistory.postedAt` is used as the price-sync signal.

| Source | Count |
|---|---|
| New LIVE deals | 11 (#15710–#15720) |
| Price-synced older LIVE rows (priceHistory) | 13 (#1605, #5230, #5642, #6316, #7438, #8788, #10954, #12661, #14032, #14065, #14174, #14535, #14934) |
| Unique deal slugs | 24 |
| New posts | 1 (#581 `sandwich-maker-toast-vs-grill-vs-3-in-1-which-to-buy-india`) |

## Ping
- I ran `node apps/api/scripts/indexnow-ping.mjs <24 deal slugs> blog/<post-slug> blog` in slug mode from the repo root. Slug mode adds `/`, `/offers` and `/sitemap.xml`, and I did not use `--paths`, so MSYS path mangling could not happen.
- **api.indexnow.org: HTTP 200 for 29 URLs.** That is 24 deals, the post, `/blog` and the 3 hubs.
- Bing: the script makes no separate Bing request, and IndexNow shares submissions with Bing. A direct Bing GET was not sent: from memory, Bing GETs return 403 after about 50 requests.

## Spot-checks (prod)
| URL | Status |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200, body = key |
| `/sony-alpha-ilce-6100x-twin-lens-mirrorless-camera` (synced) | 200 |
| `/boat-energyshroom-pb665-turbo-x-30000mah-65w-laptop-power-bank-b0g1bs17wc` (synced) | 200 |
| `/cadlec-cookmate-2000w-induction-cooktop-b0dp9gkkpl` | 200 |
| `/boat-airdopes-131-gen-2-tws-earbuds-b0fplp7smz` | 200 |
| `/add-gel-handy-mark-on-highlighter-yellow-pack-of-10-b0csjyc7y3` | 200 |
| `/blog/sandwich-maker-toast-vs-grill-vs-3-in-1-which-to-buy-india` | 200 |

**Sitemap:** the index lists 3 children (pages, deals, blog). The first fetch of `sitemaps/blog/sitemap.xml` did not contain the slug, most likely because the ISR page was stale and the fetch triggered a regeneration. A second fetch about a minute later had 434 URLs and included post #581, with lastmod 2026-10-31T01:11Z. That is within the 1800 s revalidate window, so this is not rot.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.10–0.63 s) |
| API total vs DB LIVE | prod 15,166 = local 15,166 = DB 15,166 |
| API newest id vs DB max | 15,720 = 15,720 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 452 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 2 |
| Broadcast cursor vs DB max | `lastId` 15,720 = 15,720 (drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 3 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
