# DESIDIME — 2026-10-24j (18:22 IST)

**0 new deals. All 15 candidates were rejected:** 14 had drifted from the card price or were unavailable, and 1 (BigBasket) could not be verified.

**IndexNow:** not pinged. Nothing was pushed.

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` over `/new` and the homepage.
  - 29 cards found; 8 removed by the junk filter or as other-store.
  - 19 resolved to a product. 6 of those were already in the DB, 13 were fresh.
  - Stage 1 itself flagged 3 of the 13: two Flipkart cards for price drift and one BigBasket card with no ld+json.
- **2 Flipkart cards were dropped by `affiliate()` (no pid).** Both were Urban Star bikes, re-resolved by hand:
  - each visit link resolved with curl
  - card prices taken from the `/new` and homepage HTML
  - pid and price read in the Flipkart tab with in-tab `fetch`, from the ld+json `offers`
- **Amazon check:** in-tab `fetch('/dp/ASIN?th=1&psc=1')` in the logged-in tab:
  - price from `#corePriceDisplay_desktop_feature_div .priceToPay .a-price-whole`
  - MRP from `.basisPrice`
  - stock from `#availability` and `#add-to-cart-button`

## Candidates

| Product id | Item | Card | Page | Action |
|---|---|---|---|---|
| B0GL7M6KT4 | LG 43 L minibar | ₹8,851 | ₹10,890 / ₹12,990, add-to-cart | reject, drift |
| B0CG6LP1MS | boAt Stone 1800 | ₹5,220 | ₹5,799 / ₹21,990, add-to-cart | reject, drift |
| B0G65X9Z7Z | Crompton AQNova chimney | ₹22,890 | no price, no add-to-cart | reject, unavailable |
| B0GP74SZF2 | Haier 240 L double door | ₹18,940 | ₹24,690 / ₹36,690 | reject, drift |
| B097N5VVLY | BERGNER Senator kadai 24 cm | ₹499 | no price, no add-to-cart | reject, unavailable |
| B0F5PXXWM9 | Aquaguard Delight Aquasaver | ₹7,500 | ₹9,999 / ₹26,500 | reject, drift |
| B0CHMFK3BQ | AO Smith EWS Plus 3 L | ₹2,700 | ₹2,999 / ₹5,200 | reject, drift |
| B0GCFSQ4X7 | Midea 1.36 T inverter AC | ₹26,740 | ₹32,990 / ₹62,290 | reject, drift (same as 10-24i) |
| B0DXV1R1R4 | Haier 8 kg top load | ₹13,291 | ₹16,990 / ₹27,900 | reject, drift |
| B0GVJSTKS6 | TCL 55" QLED | ₹36,935 | no price, no add-to-cart | reject, unavailable (same as 10-24i) |
| MOBHQTF5YCDZEQGH | HMD Vibe2 5G | ₹11,999 | flagged by stage 1 | reject, drift |
| COMHPXZQVDRAWCUC | ASUS Vivobook 16 R7 | ₹64,390 | flagged by stage 1 | reject, drift |
| 771b39027df7 | Lifelong air fryer (BigBasket) | ₹1,316 | no ld+json | reject, unverifiable |
| 6 cards | — | — | — | already in DB (or in the 24 h reject cache) |

### Flipkart cards dropped by `affiliate()`, re-resolved by hand: both drifted

| Pid | Item | Card | Page |
|---|---|---|---|
| CCEHJ7XNBPFNAHBG | Urban Star SPIDER 20T BMX | ₹3,407 | ₹3,763, InStock |
| CCEH35WTVQJKUZTD | Urban Star HULK 20T fat tyre | ₹3,516 | ₹3,841, InStock |

The card prices look like bank-offer or coupon prices. This is the same pattern as 10-24i, where 16 of 18 cards drifted.

## Fix: reject cache

`data/dd-rejected.json` is the 24-hour skip list that stage 1 reads. It was last written on 10-08 and nothing writes it any more, so Midea and TCL were verified again only 2 hours after 10-24i rejected them.

All 15 rejected product ids from this tick were added with the current timestamp, and the cache now holds 137 entries. Stage 1 still only reads the cache. It does not write it, so every hand pass has to add its rejects.

## CEO audit (18:22 IST)

- **Deals:** 14,131 LIVE. The highest ID is 14661. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW.
- **Posts per IST day:** 10-21: 3, 10-22: 3, 10-23: 3, 10-24: 3. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** at 14661, equal to the DB maximum.
- **Unpushed commits:** 0 before this report.

## Still open

- **Gap:** stage 1 reads `dd-rejected.json` but never writes it. Fix: write the drift and unavailable rejects from the verify step.
- **Gap:** `affiliate()` drops Flipkart links that have no pid. This tick, both affected bikes had drifted anyway.
- **Gap:** IFS card prices drift within 30 minutes (#14654 went from ₹37 to ₹55).
- 47 shadowed same-ASIN duplicate pages are waiting for a price sync.
- #7251 B08KFL2T8J is LIVE with no add-to-cart.
- The 71 GSC-pinned deals need re-verifying before 11-20.
- **Owner:** `www.richdeals.in` NXDOMAIN (since 09-19). The DO API token has not been rotated.
- **Unresolved:** chrome-devtools and reticle MCPs are CONNECT_TIMEOUT. Playwright covers the work.
