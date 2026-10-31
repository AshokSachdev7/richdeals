# DESIDIME-INGEST: 2026-11-01b (~02:30 IST)

**Result: 0 pushed, 0 price-synced. 3 fresh candidates, all rejected: 2 Amazon items whose product-page price had drifted above the card, and 1 Paytm bill-pay offer that is not a product. No IndexNow ping, because nothing was pushed. CEO audit clean.**

## Method
- Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each `visit.desidime.com` link to the merchant URL.
- The Playwright MCP is still hung and reticle returns CONNECTION_CLOSED. Amazon prices were checked with a curl fetch of the product page (`pdp1030r.mjs`: `.a-price-whole` in `#corePriceDisplay`, plus `#availability` and add-to-cart). Neither fetch hit a captcha.
- Stage 1 deduplicated against the live DB with Prisma (`store_product`). Nothing matched, so there was nothing to price-sync.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Dropped (junk or other-store cards) | 20 |
| Product URL resolved | 8 |
| Already in DB | 0 |
| Rejected in the last 24 h | 5 |
| Fresh | 3 |
| Rejected without a product-page check | 1 |
| Rejected after the product-page check | 2 |
| Pushed | **0** |

Junk drops included two Zepto IDFC card offers, ShriramOne, Navi and Shopsy Play Store app promos.

## Rejected
| Item | Card | Product page | Reason |
|---|---|---|---|
| ZEBRONICS Juke BAR 9900 soundbar, Amazon B0CTTXHPSK | ₹15,999 / ₹84,999 | ₹17,999, in stock, add-to-cart present | Price drift (+₹2,000). The card price is probably a bank-offer price |
| WHP Jewellers 24 kt 1 g Lakshmi pendant, Amazon B0CZTGRS2S | ₹14,394 | ₹15,420 / ₹23,073, add-to-cart present | Price drift (+₹1,026). Gold tracks the daily rate |
| Paytm Visa bill-pay offer (`paytm.com/download-paytm-app`) | ₹900 | stage 1 `SKIP(no-ld-json)` | App / payment offer, not a single product |

All 3 are in `data/dd-rejected.json` (`Date.now()` values). Stage 1 wrote the Paytm key and this tick wrote the two ASINs. The file went from 1,394 to 1,395 keys, because one ASIN already had an entry older than 24 h that was refreshed.

## Freshness
- Nothing was pushed or synced, so `indexnow-ping.mjs` was not run. No ping status is reported, because none was sent.
- The sitemap is ISR (1800 s), and `llms.txt` is dynamic. Neither changed.

## CEO audit (~02:30 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.28 s, `/offers` 0.16 s, `/blog` 0.73 s, `/sitemap.xml` 0.16 s, `/feed.xml` 0.10 s, `/llms.txt` 0.62 s, `/api/deals` 0.21 s, `/robots.txt` 0.18 s |
| API total vs DB LIVE | prod 15,366 = local 15,366 = DB 15,366 |
| DB max id | 15,921 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 455 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4, 11-01: 1 (CONTENT-SEO next run 06:32 IST) |
| Broadcast cursor vs DB max | `lastId` 15,921 = max. Fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster (checked in sitemon 11-01b) |

## Still open (carried forward)
- The Playwright MCP is hung and reticle is down. The effects:
  - TG reads only 5 of the 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need someone to look at the product page by hand.
- Prose drift on deals outside the top 100: 118 descriptions and 32 titles.
- The DO API token needs rotating.
