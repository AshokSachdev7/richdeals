# DESIDIME-INGEST: 2026-10-29k (~20:25 IST)

**Result: 4 new Amazon deals pushed LIVE (#15481-15484). 8 Amazon candidates were rejected for card-vs-PDP price drift, and 4 Flipkart candidates were rejected by stage 1 for drift. 3 dup LIVE rows already matched the PDP, so nothing changed. IndexNow returned 200 for 7 URLs. CEO audit clean.**

Stage 1 was `ingest-desidime.mjs`: cards only with no per-deal fetch, the JUNK/GROCERY filters, and `visit.desidime.com` resolve. Playwright MCP was still hung, so Amazon PDPs were read with desktop curl (Chrome UA, `/dp/ASIN?th=1&psc=1`). The checks were `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability`, the MRP and the hi-res image.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (/new + homepage) | 37 (3 dropped by JUNK/GROCERY) |
| Product-resolved | 32 |
| Already in DB (stage-1 log) | 16 |
| Flipkart price drift (stage 1, written to dd-rejected) | 4 |
| Dup LIVE rows found by productId dedup against the DB | 3 (PDP = DB, unchanged) |
| Amazon PDP-verified | 12 |
| Pushed | **4** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15481 Milton Eiffel 1000 vacuum insulated flask 910 ml, Black | B01AHQ7LWG | ₹290 | ₹435 | 33% |
| #15482 Microfiber cleaning cloth, pack of 4 | B0HBX41LLR | ₹99 | ₹499 | 80% |
| #15483 Stylus pen for interactive flat panel boards (MAXHUB, SEEWO) | B0DJ3GBV8C | ₹499 | ₹3,500 | 86% |
| #15484 Milton Mini Fun Treat kids tiffin 650 ml, Light Yellow | B09ZBDX3PG | ₹115 | ₹230 | 50% |

- **Price check:** every PDP matched the card price, with add-to-cart live and the item in stock.
- **Content:** images are `m.media-amazon.com` hi-res. For B0HBX41LLR the image was pulled from the first colorImages hiRes (`71ppePXMssL`), because the azv read returned null; the product is single-variant. Titles and descriptions were rewritten. Links use `?tag=ashoksachdev-21`.
- **Prod:** all 4 slugs return 200. #15484 returned 521 (a Cloudflare origin blip) on the first curl, then 200 on 3 rechecks.

**Dups unchanged (PDP = DB):** #13559 Pigeon B0DW8SWWHQ ₹184, #5442 B0GTMJ2GRY ₹14,490, #4696 Xiaomi B0F3JL33DW ₹35,499.

## Rejected (`data/dd-rejected.json`, 961 → 972)
**Stage 1, Flipkart drift:** SHCHG5RJBHXK3TNV, ACNHMY39HGDNKGBM, COMHQFUZKDMRD2YQ, RFRH5Q2UVEJ6B8QX.

**Amazon, card → PDP drift:**

| ASIN | Product | Card → PDP |
|---|---|---|
| B0GTHJPNCG | Seed sprouter | ₹99 → ₹299 |
| 9371861967 | Disha JEE combo | ₹1,347 → ₹1,374 |
| B0C5SJ23HT | MEKO stylus | ₹598 → ₹641 |
| B0H9QLHXQ6 | StylusHome stylus | ₹1,266 → ₹1,328 |
| B0GKFN5QX6 | Noise Pure Pods 2 | ₹2,700 → ₹2,999 |
| B0BWSRLXXC | HyperX Clutch Gladiate | ₹1,664 → ₹1,789 |
| B0CZTGRS2S | WHP gold pendant | ₹14,394 → ₹15,800 |
| B0D4ZD52G5 | GOVO GoSurround 990 | ₹6,300 → ₹6,999 |

B0CZTGRS2S was already in the file, so only its timestamp was refreshed. That is why 8 rejects added 7 keys. The card prices were bank-offer or stale prices.

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with 4 slugs. It returned **HTTP 200 for 7 URLs**: the 4 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,943 = 14,943; API newest id 15,484 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 446 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: **4 (cap reached)** |
| Broadcast cursor vs DB max | 15,480 vs 15,484. The gap is this batch, which the external tg-broadcast cron picks up |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new):
- Playwright MCP is hung this session, so Flipkart PDPs cannot be verified in-browser and TG uses the t.me/s fallback.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync.
