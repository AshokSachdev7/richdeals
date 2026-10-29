# INDEXNOW · 2026-10-29d (window 07:53Z → 13:54Z 10-29 / 13:23 → 19:24 IST)

**Result: 65 URLs submitted. api.indexnow.org returned 200 and Bing returned 200. The key file and every spot-checked page return 200. The blog sitemap and llms.txt carry the newest post. CEO audit clean.**

## Submitted
The window starts where 10-29c ended (07:53Z), so there is no gap. Deals were selected by `createdAt` (new rows) and `PriceHistory.postedAt` (price-synced rows). `updatedAt` was not used because it is the click counter.

| Group | Count | IDs |
|---|---|---|
| New LIVE deals | 39 | #15440-15478 (IFS 10-29h/i/j, desidime 10-29h/i/j, TG 10-29n-s) |
| Price-synced LIVE rows (not new) | 21 | #1193, 1370, 1498, 1977, 2203, 5095, 5154, 5436, 5442, 5644, 8003, 8613, 8838, 9085, 9310, 12652, 12830, 13559, 13654, 13684, 14231 |
| New post | 1 | #575 `/blog/humidifier-buying-guide-india-cool-mist-vs-warm-mist` |
| Hubs | 4 | `/blog` (added by hand), plus `/`, `/offers`, `/sitemap.xml` (added by slug mode) |
| **Total** | **65** | |

Run in slug mode from `apps/api` with `MSYS_NO_PATHCONV=1`. `--paths` mode was not used.

## Endpoints
| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org/indexnow (`indexnow-ping.mjs`) | **200** | 65 |
| www.bing.com/indexnow (direct POST, same body) | **200** | 65 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (body matches the key) | 200 |
| `/blog/humidifier-buying-guide-india-cool-mist-vs-warm-mist` (new post) | 200 |
| `/gear-alpine-39l-water-resistant-backpack-yellow-black-b0cyx2tgcr` (#15440, oldest new) | 200 |
| `/ibell-aerofry422m-4-2-l-air-fryer-1500-w-afrheh5ycbpeawdu` (#15468, desidime) | 200 |
| `/havells-hexo-ez-heat-2000w-infrared-induction-cooktop-tc-20-b0gkdfr8ys` (#15478, newest) | 200 |
| `/go-desi-classic-kaju-katli-180g` (synced) | 200 |
| `/amazon-basics-health-faucet-1-5m-ss304-hose-hook-b0f6nqcsgg` (#12652, synced) | 200 |
| `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |

## Freshness
- **Sitemap:** the index lastmod is 13:35Z 10-29. `sitemaps/blog/sitemap.xml` has 428 locs and includes post 575.
  - The first fetch came back with 427 locs and without post 575: it was a stale ISR copy. The re-fetch (`x-nextjs-cache: HIT`) has it. This is expected ISR behaviour, not rot.
- **llms.txt:** lists post 575.
- **Deals:** the deals sitemap child is top-100 only, by design. The new deal pages are discovered through IndexNow and internal links.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints | all 200 |
| API total vs DB LIVE | 14,937 = 14,937; API newest id 15,478 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 446 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: **4 (cap reached)** |
| Broadcast cursor vs DB max | 15,478 = 15,478, fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new):
- Playwright MCP is hung this session, so Flipkart PDPs cannot be verified and TG uses the t.me/s fallback.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync batch.
