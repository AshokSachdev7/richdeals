# INDEXNOW · 2026-10-30a (window 13:54Z 10-29 → 19:54Z 10-29 / 19:24 IST 10-29 → 01:24 IST 10-30)

**Result: 78 URLs resubmitted. api.indexnow.org HTTP 200, Bing HTTP 200. All spot checks 200; newest post #576 in the blog sitemap and llms.txt. CEO audit clean.**

The window continues from 10-29d (ended 13:54Z). Rows were selected from the DB: new LIVE deals by `createdAt`, price-synced LIVE rows by `PriceHistory.postedAt` (not `updatedAt`, which is the click counter), new posts by `createdAt`.

## Submitted
| Group | Count | IDs |
|---|---|---|
| New LIVE deals | 54 | #15479-15532 (10-29 ticks #15479-15514, desidime 10-30a #15515-15517, IFS 10-30a #15518-15531, TG 10-30a #15532) |
| Price-synced LIVE rows | 19 | #666, 1366, 1951, 2198, 3601, 4649, 5023, 5286, 5324, 6214, 7103, 7994, 9133, 11981, 12102, 12651, 13259, 13305, 13833 |
| New post | 1 | #576 `blog/distemper-vs-emulsion-paint-which-to-buy-india` |
| Hubs | 4 | `/`, `/offers`, `/sitemap.xml` (added by slug mode), `/blog` (passed by hand) |
| **Total** | **78** | |

One synced row was not LIVE and was excluded. Method: `MSYS_NO_PATHCONV=1 node scripts/indexnow-ping.mjs <73 deal slugs> blog/<post slug> blog` from `apps/api` (slug mode, never `--paths` from Git Bash), then the same 78-URL body POSTed directly to Bing.

## Endpoints
| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org | 200 | 78 |
| www.bing.com/indexnow | 200 | 78 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (body = key) | 200 |
| `/blog/distemper-vs-emulsion-paint-which-to-buy-india` (#576) | 200 |
| `/orient-glo-10-m-36-led-string-light-green-b0hdd77scy` (#15479, oldest new) | 200 |
| `/magic-paints-ajooba-acrylic-distemper-wall-paint-10-l-daffodil-b0d97x2wly` (#15517) | 200 |
| `/milton-pro-cook-kitchen-pride-non-stick-cookware-set-of-5-peach-b0csyyq82j` (#15532, newest) | 200 |
| `/gesto-5-meter-rope-led-strip-lights-outdoor-lights-waterproof-for-balcony-decora-B0D5QV` (#666, synced) | 200 |
| `/lavie-sport-cloud-dye-36l-laptop-backpack-b0gsb5wlnd` (#13833, synced) | 200 |
| `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |

## Freshness
1. `sitemap.xml`: index lastmod 2026-10-29T19:54:33Z. The blog child has 429 locs and carries post #576. The deals child is top-100 only, by design.
2. `llms.txt` (force-dynamic) carries post #576.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,989 = 14,989 |
| API newest id vs DB max | 15,532 = 15,532 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 447 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 1 so far (#576), ~1.5 h into the IST day; next CONTENT-SEO tick at 06:39 IST |
| Broadcast cursor vs DB max | `lastId` 15,532 (file re-read) = 15,532, fully drained |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

Still open (carried forward, not new):
- Playwright MCP is hung this session. Amazon is verified by desktop curl with the mobile-UA fallback, TG reads only the 5 public groups through the t.me/s preview, and Flipkart PDPs cannot be verified.
- reticle MCP failed to connect. It is not used by any tick.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync; ticks keep syncing dups as they reappear (19 synced rows in this window).
