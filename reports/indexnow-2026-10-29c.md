# INDEXNOW · 2026-10-29c (window 01:55Z → 07:53Z 10-29 / 07:25 → 13:23 IST)

**Result: 70 URLs submitted. api.indexnow.org returned 200 and Bing returned 200. The key file and every spot-checked page return 200. The blog sitemap and llms.txt carry the newest post. CEO audit clean.**

## Submitted
The window starts where 10-29b ended (01:55Z), so there is no gap. Deals were selected by `createdAt` (new rows) and `PriceHistory.postedAt` (price-synced rows). `updatedAt` was not used because it is the click counter.

| Group | Count | IDs |
|---|---|---|
| New LIVE deals | 47 | #15393-15439 (IFS 10-29g, desidime 10-29g, TG 10-29l/m and earlier batches) |
| Price-synced LIVE rows (not new) | 18 | #759, 1481, 5155, 8183, 8186, 8825, 9046, 9085, 9134, 9448, 9468, 9726, 9844, 9860, 10569, 13149, 13342, 15177 |
| New post | 1 | #574 `/blog/air-purifier-cadr-room-size-guide-india` |
| Hubs | 4 | `/blog` (added by hand), plus `/`, `/offers`, `/sitemap.xml` (added by slug mode) |
| **Total** | **70** | |

Run in slug mode from `apps/api` with `MSYS_NO_PATHCONV=1`. `--paths` mode was not used.

## Endpoints
| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org/indexnow (`indexnow-ping.mjs`) | **200** | 70 |
| www.bing.com/indexnow (direct POST, same body) | **200** | 70 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (body matches the key) | 200 |
| `/blog/air-purifier-cadr-room-size-guide-india` (new post) | 200 |
| `/havells-16a-3-pin-plug-top-with-led-indicator-white-b0f1382pqj` (#15393, oldest new) | 200 |
| `/boat-stone-1800-plus-120w-bluetooth-party-speaker-b0h368zs27` (IFS batch) | 200 |
| `/tibra-attire-women-s-embroidered-kurta-pant-and-dupatta-set-ethgw5g5t7a6m48u` (#15439, newest) | 200 |
| `/pidilite-fevicol-glue-drops-3-1-carton-pack-b0byz344cs` (#13149, synced) | 200 |
| `/giva-925-sterling-silver-rose-gold-plated-zircon-drizzle-earrings-b08pqq957k` (#15177, synced) | 200 |
| `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |

## Freshness
- **Sitemap:** the index lastmod is 07:40Z 10-29. `sitemaps/blog/sitemap.xml` has 427 locs and includes post 574.
  - The first fetch came back without post 574: it was a stale ISR copy. The re-fetch (`x-nextjs-cache: HIT`) has it. This is expected ISR behaviour, not rot.
- **llms.txt:** lists post 574.
- **Deals:** the deals sitemap child is top-100 only, by design. The new deal pages are discovered through IndexNow and internal links.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints | all 200 |
| API total vs DB LIVE | 14,898 = 14,898; API newest id 15,439 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 445 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 3 |
| Broadcast cursor vs DB max | 15,439 = 15,439, fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new): most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync batch.
