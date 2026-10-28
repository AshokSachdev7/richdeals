# DesiDime ingest — 2026-10-29b (~02:30 IST)

**Result: 1 new deal pushed LIVE, 1 duplicate price-synced.** IndexNow returned HTTP 200 for 5 URLs.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Dropped as junk, grocery or a non-product page (including Myntra "Buy 1 get 4" sale hub) | 13 |
| Resolved to a product | 19 |
| Already in DB (by productId) | 9 (2 re-verified, 7 earlier rejects) |
| Fresh candidates | 10 |
| Flipkart flagged for price drift in stage 1, then confirmed in the browser | 3, all rejected |
| Amazon candidates read on the PDP | 7 |
| **Pushed LIVE** | **1** |

## Amazon verify (logged-in Playwright tab, `#corePriceDisplay .a-price-whole`)
| ASIN | Product | Card ₹ | Live ₹ | Verdict |
|---|---|---|---|---|
| B08X6RGQWL | Baidyanath Sugarfree Chyawan-Vit 1kg | 273 | 273 (MRP 445, in stock, add-to-cart present) | **pushed #15388** |
| B0C1K8FPNP | Luminous inverter + battery combo | 29,949 | 32,499 | reject: drift |
| B0CR676KTX | Sony INZONE Buds | 11,391 | 15,990 | reject: drift |
| B0F2169TKJ | Sony LinkBuds Fit | 10,439 | 13,989 | reject: drift |
| B07GL1976K | Philips mixer grinder | 5,962 | 7,299 | reject: drift |
| B0BDYS7PBS | Logitech Zone Vibe 100 | 5,397 | 7,995 | reject: drift |
| B086H4W8QS | ViewSonic monitor | 5,951 | no price, no add-to-cart | reject: unavailable |

The drifting card prices are almost certainly bank, EMI or coupon prices that the PDP does not show.

## Flipkart verify (browser tab, ld+json `offers.price`)
| pid | Product | Card ₹ | Live ₹ | Verdict |
|---|---|---|---|---|
| SHOHGDZ9V5HNXYZD | Asics JOG 100S | 2,447 | 3,199 | reject: drift |
| MOBHNS6YYSAJPVHZ | HMD Vibe2 5G | 13,499 | 14,999 | reject: drift |
| AFRH3ZXMQ4SRVCWT | "Glen SA 3046 rotisserie oven" | 7,349 | — | reject: the URL resolved to a Pelonis microwave |

All 9 rejected pids were stamped in `data/dd-rejected.json` with `Date.now()`, keyed by productId. The file now holds 841 keys.

## Duplicate re-verify
| DB row | Product | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| #6116 | Zebronics Envy Pro ANC headphones | 2,999 | 2,799 | **synced** (price, discount 69%, title, PriceHistory row) |
| #4983 | Samsung 43" TV | 29,750 | 29,750 | none, matches |

## Freshness
- `indexnow-ping.mjs`: 2 slugs (#15388 new, #6116 synced) plus 3 hubs, 5 URLs, **HTTP 200**.
- Prod spot check: both deal URLs return 200.

## CEO audit (DB at ~21:00Z)
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,850 = 14,850 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 443 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 1 so far (CONTENT-SEO fires again at 06:32) |
| Broadcast cursor vs DB max | 15,388 = 15,388. Fully caught up |
| Unpushed commits | none before this report |
| CronList vs roster | 9/9 |

Nothing is rotting.
