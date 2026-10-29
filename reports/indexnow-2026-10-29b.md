# INDEXNOW · 2026-10-29b (19:55Z 10-28 → 01:55Z 10-29 / 07:25 IST)

**Result: 27 URLs submitted. api.indexnow.org returned 200 and Bing returned 200. Prod spot checks all 200. Blog sitemap carries post 573 (426 URLs). CEO audit clean.**

## Submitted
Window starts at 19:55Z 10-28, where 10-29a ended, so there is no gap. Deals were selected by `createdAt` (new rows) and by `PriceHistory.postedAt` (price-synced rows). `updatedAt` was not used, because it is the click counter.

- 5 new LIVE deals: #15388–#15392 (Baidyanath chyawanprash, Amazon Basics 20W speaker, Larah Tiara dinner set, Zebronics Sound Feast 45, Philips E2104S).
- 17 price-synced LIVE rows: #426, 2503, 2993, 3492, 3498, 3506, 4188, 4575, 5064, 5197, 6116, 10438, 12504, 13429, 13444, 15365, 15386. These come from the seo-audit-fix, ifs-10-29d and desidime-10-29d re-syncs.
- 1 post: `blog/diwali-gift-ideas-by-budget-india-2026` (id 573), plus the `/blog` hub.
- Hubs `/`, `/offers` and `/sitemap.xml` were added by slug mode.

The ping ran in slug mode with `MSYS_NO_PATHCONV=1`. `--paths` mode was not used.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 27 |
| www.bing.com/indexnow (direct POST, same body) | **200** | 27 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (body = key) | 200 |
| `/blog/diwali-gift-ideas-by-budget-india-2026` | 200 |
| `/baidyanath-sugarfree-chyawan-vit-chyawanprash-1kg-b08x6rgqwl` (oldest new deal) | 200 |
| `/philips-e2104s-keypad-mobile-phone-2-inch-screen-type-c-crystal-blue-b0h8ptdjxg` (newest new deal) | 200 |
| `/jbl-wave-buds-2-anc-wireless-earbuds-b0dkjjqlk6` (synced) | 200 |
| `/boat-aavante-bar-prime-b450-soundbar` (synced) | 200 |
| `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |

## Sitemap and llms.txt freshness
- On the first fetch, `sitemaps/blog/sitemap.xml` was the stale ISR copy: 425 URLs, no post 573. That first request triggered the regeneration, and the second fetch returned 426 URLs including post 573. This is how ISR works, not rot.
- `llms.txt` lists post 573. It is force-dynamic, so it is rebuilt on every request.
- The deals sitemap child holds the top 100 only, by design, so the new deals are not expected in it.

## CEO audit (DB at 01:55Z)
| Check | Value |
|---|---|
| Prod endpoints | all 200 |
| API total vs DB LIVE | 14,854 = 14,854 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 444 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 2 |
| Broadcast cursor vs DB max | 15,392 = 15,392 |
| Unpushed commits | 0 before this report |

Nothing new is rotting. Still open: 84% of LIVE deal Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync batch.
