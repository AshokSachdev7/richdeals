# DesiDime ingest — 2026-10-29d (~06:30 IST)

**Result: 0 new deals, 0 price-synced.** Nothing was pushed, so there was no IndexNow ping.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 29 |
| Dropped as junk, grocery, other-store or non-product | 12 |
| Resolved to a product | 17 |
| Already in DB or rejected earlier (by productId) | 17 |
| Fresh candidates | 0 |
| **Pushed LIVE** | **0** |

The DesiDime feed has not changed since 10-29c, apart from the Sony XM6 card (rejected in 10-29c for price drift) no longer being fresh because it is now in `dd-rejected.json`.

## Duplicate re-verify (logged-in Playwright Amazon tab, `#corePriceDisplay .a-price-whole`)
| DB row | Product | DB ₹ | Card ₹ | PDP ₹ | Action |
|---|---|---|---|---|---|
| #15388 | Baidyanath Chyawan-Vit 1kg (B08X6RGQWL) | 273 | 273 | 273, in stock, add-to-cart present | none |
| #6116 | Zebronics Envy Pro ANC (B0H62FQ5DD) | 2,799 | 1,470 | 2,799, in stock, add-to-cart present | none. The card shows a coupon or bank price; the DB matches the PDP |

Note: the first in-tab fetch failed with `Failed to fetch` because the active tab was Flipkart (cross-origin). Switching to the Amazon tab fixed it.

## CEO audit (~06:30 IST)
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,853 = 14,853 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 443 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 1 so far (CONTENT-SEO fires at 06:32) |
| Broadcast cursor vs DB max | 15,391 = 15,391. Fully caught up |
| Unpushed commits | none before this report |
| CronList vs roster | 9/9 |

Nothing new is rotting. Still open: 84% of LIVE deal Offers have a price check older than 14 days (top-100 re-sync is the next batch).
