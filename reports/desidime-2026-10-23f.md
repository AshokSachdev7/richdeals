# DESIDIME — 2026-10-23f (10:21 IST)

**1 deal pushed: #14281 MotiBa cotton water filter covers, pack of 10, ₹5 on Amazon. The other 12 candidates were rejected on the product page: 11 for price drift and 1 with no buyable offer. IndexNow returned HTTP 200 for 4 URLs.**

Stage 1 (`ingest-desidime.mjs`) read `/new` plus the homepage, resolved each `visit.desidime.com` Buy Now link, applied the JUNK/GROCERY filter, swapped in our affiliate tags and deduped by productId against the DB.

Two dropped cards were resolved by hand:
- **Nilkamal shoe rack:** the outbound link was `/dp/d/ASIN`, so the ASIN was read by hand.
- **REDMI Pad 2:** the Flipkart `/p/itm…` URL had no `pid`.

Amazon prices were read in Playwright tab 1 with an in-page `fetch('/dp/…?th=1&psc=1')`:
- **Price:** `#centerCol .priceToPay`.
- **MRP:** `.basisPrice`.
- **Stock:** `#availability` plus add-to-cart.

The Flipkart price was read in tab 2 from the ld+json.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Junk / grocery / other drops | 12 (of which 2 were re-resolved by hand; Head & Shoulders shampoo stayed dropped as FMCG) |
| Resolved to a product | 18 |
| Already in the DB | 7 |
| Fresh from stage 1 (all Amazon) | 11 |
| Hand-resolved | 2 (Nilkamal B0DQ7T3JK7, REDMI Pad 2 Flipkart) |
| Checked on the product page | 13 |
| Rejected | 12 |
| **Pushed** | **1** |

## Pushed

| # | Deal | Product page | Affiliate |
|---|---|---|---|
| 14281 | `motiba-cotton-water-filter-covers-pack-of-10-securing-strap-b0hnw14jyp` | ₹5 = card price, In stock, add-to-cart present. MRP ₹499 nulled (price/MRP ≤ 0.2) | `dp/B0HNW14JYP?tag=ashoksachdev-21` |

The bulk response was `count: 1`, `created: true`. The title and description are original rewrites, and the push script checked every ₹ value against the price.

## Rejected

| Item | Card | Product page now | Reason |
|---|---|---|---|
| Bajaj Rex 750W mixer B0DCW2V9KW | ₹2,880 | ₹3,199 / ₹7,490 | Price drift |
| GOVO GoSurround 950 soundbar B0C2Z5SQN9 | ₹5,580 | ₹6,199 / ₹24,999 | Price drift |
| Electrolux air purifier B09ZP8Z2CV | ₹5,436 | ₹6,290 / ₹20,990 | Price drift |
| Portronics Ignis 65 power bank B0GFD2L7MX | ₹1,699 | ₹1,999 / ₹3,999 | Price drift |
| Wakefit Safari chair B0H4H579QP | ₹4,948 (ICICI/Axis card price) | ₹5,497 / ₹12,999 | Price drift (bank-offer price) |
| Symbol men's polo B07SLBNW6B | ₹199 | ₹199 listed, but `#availability` is empty | Rejected: no confirmed stock read on an apparel listing with several variants |
| Midea 24 L convection microwave B0H8S8M7FC | ₹8,091 | ₹8,990 / ₹19,990 | Price drift |
| CADLEC MixCraft mixer B0HD6V5X2V | ₹1,212 | ₹1,249 / ₹3,999 | Price drift |
| Mango Cool Master THK35 cooler B08HX2RGHM | ₹2,597 (Delhi) | ₹5,492 / ₹7,999 | Price drift (location-locked) |
| Lenovo LOQ Ryzen 7 / RTX 4050 B0H6QCSMJK | ₹1,07,740 | ₹1,14,990 / ₹1,75,590 | Price drift |
| Nilkamal Freedom Mini shoe rack B0DQ7T3JK7 | ₹2,789 | No price, no add-to-cart | No buyable offer |
| REDMI Pad 2 8/128 GB Wi-Fi, Graphite Grey (Flipkart itmd589f547e523f) | ₹16,999 | ₹19,999, InStock | Price drift (bank-offer price) |

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs (the deal, `/`, `/offers`, `/sitemap.xml`).
- **Sitemap:** ISR 1800 s, so it will carry #14281 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already reflects the deal.
- **Prod:** the deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and the DO ingress all return 200.
- **Posts (IST 2026-10-23):** 2. The minimum is met. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,751 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14281.
- **Broadcast cursor:** 14280. #14281 is waiting for the external broadcast cron, which advances the cursor on its own.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
