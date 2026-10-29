# DESIDIME-INGEST: 2026-10-29i (~16:25 IST)

**Result: 4 new deals pushed LIVE (#15458-15461). 2 dup LIVE rows were price-synced to the PDP (#9310 ₹426 → ₹182, #8613 ₹849 → ₹739). 2 candidates were rejected for price drift. 1 Flipkart candidate was skipped as unverifiable. IndexNow returned 200 for 9 URLs. CEO audit clean.**

Playwright hung this tick, so the Amazon PDPs were read with desktop curl (Chrome UA, `/dp/ASIN?th=1&psc=1`). The checks were `#corePriceDisplay .a-price-whole`, add-to-cart, `#availability`, the MRP and the `#landingImage` hi-res image.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage, cards only, no per-deal fetch) | 37 |
| Dropped (JUNK/GROCERY, plus 4 Amazon `/s?` search links: SASSAFRAS, Arayna, 2x SNITCH) | 9 |
| Product-resolved via `visit.desidime.com` | 24 |
| Dup (productId already in DB) | 12 (stage-1 log printed only 5, see gap note) |
| Fresh | 12 |
| Already in `dd-rejected.json` | 5 |
| PDP-verified this tick | 6 Amazon |
| Pushed | **4** |

## Pushed
| Deal | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| #15458 Yera Prima Pyramid Zest glass tumbler set of 6, 210 ml | B0GKG46WYH | ₹227 | ₹692 | 67% |
| #15459 Kobo TPE indoor pickleball balls, 26 holes | B0H7MV98TX | ₹139 | ₹500 | 72% |
| #15460 ALTON TSL18045 single-lever sink mixer, pull-down sprayer | B07GXZX2DN | ₹2,322 | ₹22,000 | 89% |
| #15461 Bewakoof men's solid regular-fit T-shirt | B08PMYWF5M | ₹378 | ₹999 | 62% (only 3 left) |

- **Price check:** each card price matched the PDP exactly, and add-to-cart was present.
- **Content:** the MRP came from the PDP. Images are `m.media-amazon.com`. Titles and descriptions were rewritten.
- **Affiliate link:** `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
- **Prod check:** #15458 and #15461 return 200.

## Dup sync (PDP moved, updated in place, slug untouched, PriceHistory row added)
| Deal | ASIN | DB | PDP | MRP | Off |
|---|---|---|---|---|---|
| #9310 Yera Prima Zest glasses, set of 4 | B0GJ5HCKSV | ₹426 | **₹182** | ₹748 | 43% → 76% |
| #8613 Nayasa Eco Duplex 3 lunch box | B0BBVY2K2W | ₹849 | **₹739** | ₹1,764 | 52% → 58% |

**Unchanged:** #10202 Vaseline Cloud Soft SPF50 (₹144).

**Not re-checked:** #5436 Sony BRAVIA and #5155 Godrej Windle sofa were both verified in 10-29h. Their card prices (₹51,669 and ₹5,942) are bank-offer prices.

**Gap:** the stage-1 log prints only 5 of the 12 dup productIds. The other 7 were not re-verified this tick.

## Rejected (added to `data/dd-rejected.json`, 900 → 902)
| ASIN | Product | Card → PDP |
|---|---|---|
| B08YY28JDD | Vaseline cocoa butter lip balm | ₹99 → ₹227 |
| B093CLM9JN | Hammonds Flycatcher wallet | ₹475 → ₹499 |

**Skipped, not rejected:** Flipkart PENHF4MBZBFX37BF (Reynolds Aeroslim pen, 70-pack, ₹179). Flipkart PDPs need a browser and Playwright was hung, so the price could not be verified. It was left out of `dd-rejected` so the next tick retries it.

**Already in `dd-rejected`:** Flipkart ACCGSKTG3ASHMQHC, MOBHJHSHGVSSMYW9, MOBHQENAAVZ8F6YP and ACCH3MUYEGHH2WGD (stage-1 price drift), plus Amazon B0CZTGRS2S (WHP gold).

## Freshness
1. `indexnow-ping.mjs` was run in slug mode with 6 slugs (4 new and 2 synced). It returned **HTTP 200 for 9 URLs**: the 6 deals plus `/`, `/offers` and `/sitemap.xml`.
2. `sitemap.xml` is ISR with a 1800 s revalidate. The deals child is top-100 only, by design.
3. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,920 = 14,920; API newest id 15,461 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 445 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 3 |
| Broadcast cursor vs DB max | 15,457 vs 15,461. The gap is this batch, which the external tg-broadcast cron picks up |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new): most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync. This tick synced 2 more.
