# DESIDIME-INGEST: 2026-11-01c (~04:30 IST)

**Result: 0 pushed. The 2 "fresh" candidates were rejects from 11-01b that came back through a bug, and both still differ from their product page. The bug is fixed at the root: the 11-01b tick wrote string epoch-ms into `dd-rejected.json`, `new Date("1793480509409")` returned NaN, and the 24 h skip treated both ASINs as fresh. No IndexNow ping (nothing pushed). CEO audit clean.**

## Method
- Stage 1 ran `ingest-desidime.mjs`. It read listing cards only (no per-deal page fetch), applied the JUNK, GROCERY and RESTRICTED filters, and resolved `visit.desidime.com` links.
- The Playwright MCP is still hung and reticle returns CONNECTION_CLOSED. Amazon prices came from a curl fetch of the product page (`pdp1030r.mjs`, `.a-price-whole` in `#corePriceDisplay`, plus `#availability` and add-to-cart).
- Dedup used `productId` against the live DB, plus the 24 h reject window in `dd-rejected.json`.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 28 |
| Junk / other-store dropped | 20 |
| Product-resolved | 8 |
| Already in DB | 0 |
| Rejected in the last 24 h | 6 |
| "Fresh" (both were 11-01b rejects let back in by the bug) | 2 |
| Pushed | **0** |

Rejected in the last 24 h: Paytm bd620e128fa6, B0GVNXV7G7, Dell 1d1f4520816f, Flipkart TABHR9HUFDGQJZCG (Acer), B0FVYYTBLK (SanDisk), Klook 6f90d6024061.

## Rejected after the product-page read
| ASIN | Product | Card | Product page | Reason |
|---|---|---|---|---|
| B0CTTXHPSK | ZEBRONICS Juke BAR 9900 | ₹15,999 | ₹17,999 (MRP ₹84,999, in stock, add-to-cart) | Price differs by ₹2,000 |
| B0CZTGRS2S | WHP 24 kt 1 g Lakshmi pendant | ₹14,394 | ₹15,420 (MRP ₹23,073, add-to-cart) | Price differs by ₹1,026 |

Both were written back to the reject file as Number `Date.now()`.

## Fix: reject window
- **Data.** `data/dd-rejected.json` had 2 digit-string values, both from 11-01b. They are now Numbers. Afterwards, 0 of the 28 values parse to NaN.
- **Code.** `rejAt()` in `apps/api/scripts/ingest-desidime.mjs` now turns a digit string into a Number before calling `new Date`. It still accepts epoch-ms Numbers, ISO strings and `{at}` objects. `node --check` passes.

## Freshness
- Nothing was pushed, so there was no IndexNow ping.
- The sitemap and `llms.txt` are unchanged.

## CEO audit (~04:32 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.34 s, `/offers` 0.17 s, `/blog` 0.72 s, `/sitemap.xml` 0.15 s, `/feed.xml` 0.13 s, `/llms.txt` 0.53 s, `/api/deals` 0.20 s, `/robots.txt` 0.17 s |
| API total vs DB LIVE | prod 15,369 = local 15,369 = DB 15,369 |
| DB max id | 15,925 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 455 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4, 11-01: 1 (CONTENT-SEO next run 06:32 IST) |
| Broadcast cursor vs DB max | `lastId` 15,925 = max 15,925, drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster (sitemon 11-01d) |

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
