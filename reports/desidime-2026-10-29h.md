# DESIDIME-INGEST: 2026-10-29h (~14:20 IST)

**Result: 2 new deals pushed LIVE (#15441 TCL 55" QD-Mini LED Google TV ₹59,990, #15442 HAMMER Splendor 2 neckband ₹299). Dup #5436 Sony BRAVIA 2M2 55" was price-synced from ₹60,990 to ₹62,999. 6 candidates were rejected. IndexNow returned 200 for 6 URLs. CEO audit clean.**

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage, cards only, no per-deal fetch) | 35 |
| Dropped (JUNK/GROCERY, `/s?` search links, indiafreestuff Flipkart pid) | 9 |
| Product-resolved via `visit.desidime.com` | 19 |
| Dup (productId already in DB) | 7 (stage-1 log printed only 3, see gap note) |
| Fresh | 12 |
| Already in `dd-rejected.json` | 4 |
| PDP-verified this tick | 8 |
| Pushed | **2** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15441 TCL 55-inch SmartChoice 4K QD-Mini LED Google TV, 144Hz | B0F3HWNTR1 | ₹59,990 | ₹1,07,990 | 44% |
| #15442 HAMMER Splendor 2 Bluetooth 6.0 neckband, 50H, ENC | B0GSX7G6HT | ₹299 | ₹999 | 70% |

- **How they were verified:** the logged-in Amazon tab showed the card price in `#corePriceDisplay .a-price-whole`, and add-to-cart was present with the item in stock.
- **Content:** the MRP came from `#centerCol`. The images are `#landingImage` data-old-hires. Titles and descriptions were rewritten.
- **Affiliate link:** `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
- **Prod check:** both deal pages return 200.

## Rejected (added to `data/dd-rejected.json`, 865 → 871)
| ASIN | Product | Reason |
|---|---|---|
| B0FGY5J3XL | Hero XPulse 200 4V | Booking listing: no price, no add-to-cart |
| B0G44MZWQV | TCL 75" QLED | Drift: card ₹56,240 vs PDP ₹70,990 |
| B0GMQRBN4M | LG 27G610A monitor | Drift: card ₹13,749 vs PDP ₹16,499 |
| B0GVNBSXLS | Hisense 55E8S | Drift: card ₹34,999 vs PDP ₹44,499 |
| B0GD14TQQ8 | Samsung Bespoke AI AC | Drift: card ₹29,740 vs PDP ₹36,990 |
| B0DBM54BRB | Bangalore Refinery 1 g gold coin | Drift: card ₹14,350 vs PDP ₹15,850; also gold bullion |

Skipped as already rejected: B0CZTGRS2S (WHP gold), Flipkart ACNHHWJYDHKUXZWW and COMHZGK2ACSECZB5 (price drift), Klook (no ld+json).

**Why the drift:** most of these card prices are post-bank-offer prices. Our Offer price has to be what the PDP shows, so they were rejected.

## Dup re-verify
| Deal | DB | PDP | Action |
|---|---|---|---|
| #5436 Sony BRAVIA 2M2 55" (B0F7X5FC43) | ₹60,990, 39% | ₹62,999, MRP ₹99,900 | **SYNC** to ₹62,999, 37%. PriceHistory row added. The card's ₹51,669 is a bank-offer price |
| #5155 Godrej Windle sofa (B0D8JH2N69) | ₹6,990 | ₹6,990 | Unchanged. The card's ₹5,942 is a bank-offer price |
| #15404 PowerVolt 102 Max (B0H3QF4PJP) | ₹819 | ₹819 | Unchanged |

**Gap:** the stage-1 log prints only 3 of the 7 dup productIds. The other 4 were not re-verified this tick.

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with 3 slugs (2 new and 1 synced). It returned **HTTP 200 for 6 URLs**: the 3 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,901 = 14,901; API newest id 15,442 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 445 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 3 |
| Broadcast cursor vs DB max | 15,440 vs 15,442. The gap is this batch, which the external tg-broadcast cron picks up |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new): most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync.
