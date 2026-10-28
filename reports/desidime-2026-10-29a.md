# DesiDime ingest — 2026-10-29a (~00:30 IST)

**Result: 0 pushed, 0 price-synced.** Every fresh Amazon card either carried a bank, EMI or coupon price that the product page does not show, or was out of stock.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Product-resolved | 20 |
| Already in DB (dup) | 9 |
| Fresh | 11 |
| Stage-1 skip (Flipkart drift ×4, no ld+json ×2) | 6 |
| Amazon read in the logged-in tab | 5 |
| Pushed | 0 |

## Amazon verify (same-origin PDP fetch, no captcha)
| ASIN | Product | Card ₹ | Live ₹ | Verdict |
|---|---|---|---|---|
| B0FVS7FC6J | Fire-Boltt Aero TWS | 599 | — | reject: no price, no add-to-cart |
| B0HDPNQSD9 | Samsung 27" ViewFinity S7 4K | 16,049 | 18,299 | reject: drift +2,250 |
| B0FM3S66T5 | Eureka Forbes Wet & Dry Armor | 4,950 | 5,499 | reject: drift +549 |
| B0CKLS4V3G | LG 9kg 5-star top load | 19,240 | 26,990 | reject: drift +7,750 |
| B0H4GC4BFH | Haier 325L 3-star FF | 28,740 | — | reject: no price, no add-to-cart |

All 5 are stamped in `data/dd-rejected.json` with `Date.now()`; the file now has 833 keys.

## Duplicate re-verify
| ASIN | DB row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| B0GXB76VRW | #4983 Samsung 43" Crystal UHD | 29,750 | 29,750 | none, matches |
| B0FH569G3V | #15356 Lifelong 4.2L air fryer | 1,999 | 1,999 | none, matches (MRP 12,499 = 84% off, stays null) |

Stage 1 prints duplicates only to stdout and never writes them to the candidates file. The other 7 duplicate lines were cut off by `tail`, so they were not re-read this tick. The next DesiDime tick picks them up again.

## Freshness
No deals were pushed or synced, so there was nothing to ping. IndexNow was not called.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /api/deals, /llms.txt) | all 200 |
| API total vs DB LIVE | 14,826 = 14,826 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 442 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4. 10-29 has 0 so far because the day is 30 min old; CONTENT-SEO fires at 00:36 |
| Broadcast cursor vs DB max | 15,364 = 15,364 |
| Unpushed commits | none before this report |
| CronList vs roster | 9/9 |

Nothing is rotting.
