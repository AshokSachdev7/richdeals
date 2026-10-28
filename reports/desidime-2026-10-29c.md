# DesiDime ingest — 2026-10-29c (~04:30 IST)

**Result: 0 new deals, 0 price-synced.** Nothing was pushed, so there was no IndexNow ping.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 30 |
| Dropped as junk, grocery, a non-product page or an app-store link (e.g. a Meesho Play Store promo) | 12 (plus 1 that resolved to no product) |
| Resolved to a product | 17 |
| Already in DB or rejected earlier (by productId) | 16 |
| Fresh candidates | 1 |
| **Pushed LIVE** | **0** |

## Amazon verify (logged-in Playwright tab, `#corePriceDisplay .a-price-whole`)
| ASIN | Product | Card ₹ | Live ₹ | Verdict |
|---|---|---|---|---|
| B0GZNZCR9Y | Sony WH-1000XM6 headphones | 27,328 | 33,338 (MRP 49,990, in stock) | reject: drift |

The card price is about ₹6k below the PDP, which looks like a bank or exchange price. The ASIN is now stamped in `data/dd-rejected.json` with `Date.now()`, which brings the file to 842 keys.

## Duplicate re-verify
| DB row | Product | DB ₹ | Card ₹ | PDP ₹ | Action |
|---|---|---|---|---|---|
| #6116 | Zebronics Envy Pro ANC (B0H62FQ5DD) | 2,799 | 1,470 | 2,799 | none. The DB matches the PDP, and the card shows a coupon or bank price |
| #15388 | Baidyanath Chyawan-Vit 1kg (B08X6RGQWL) | 273 | 273 | — | none. It was verified in 10-29b and the card still matches |

## CEO audit (DB at ~23:00Z)
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,852 = 14,852 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 443 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 1 so far (CONTENT-SEO fires again at 06:32) |
| Broadcast cursor vs DB max | 15,390 = 15,390. Fully caught up |
| Unpushed commits | none before this report |
| CronList vs roster | 9/9 |

Nothing is rotting.
