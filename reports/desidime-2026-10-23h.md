# DESIDIME — 2026-10-23h (14:22 IST)

**3 deals pushed (#14351–#14353: 2 Amazon + 1 Myntra). 10 fresh candidates were rejected: 6 for Amazon price drift (the card prices assumed bank or coupon offers), 2 vehicle ex-showroom bookings, 1 out of stock and 1 Flipkart drift. IndexNow returned HTTP 200.**

## Method

- **Stage 1:** `ingest-desidime.mjs` read the `/new` and homepage cards, ran the JUNK/GROCERY filters, and resolved `visit.desidime.com` to the real merchant URL.
- **Non-Amazon price check:** `productLd()` reads ld+json, with ±₹1 tolerance and InStock required.
- **Amazon:** read in Playwright tab 1 with an in-page `fetch('/dp/…?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `data-old-hires`.
- **Dedup:** resolved `productId` against the live DB. The Myntra row is keyed by its style id, `25236206`, and neither that id nor the hash had a match.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 33 |
| Stage-1 drops (junk, search pages, tracking landings) | 8 |
| Resolved to a single product | 22 |
| Already in the DB | 9 |
| Fresh | 13 |
| Rejected | 10 |
| **Pushed** | **3** |

## Pushed

The bulk response was `201`, `count: 3`, `created: true` ×3.
- The Amazon link is `dp/<ASIN>?tag=ashoksachdev-21`. The DesiDime tag `desidime01-21` was stripped.
- The Myntra link goes through InRDeals (`inr678975705`).
- Titles and descriptions are original. Every ₹ value and % was checked against the price and MRP before posting.

| # | ID | Deal | Price | MRP |
|---|---|---|---|---|
| 14351 | B0DH87SSFP | ATTRO Tasty Bite 3-compartment lunch box with container & spoon | ₹174 | ₹549 (68% off) |
| 14352 | B0GX9KQN5V | Zebronics NS2000 Plus 7-level laptop stand | ₹269 | null (₹1,499 failed the ratio check at 0.18) |
| 14353 | Myntra 25236206 | House of Pataudi embroidered kurta, trousers & dupatta set | ₹2,159 | null |

## Rejected

| Item | Reason |
|---|---|
| B0DK639W74 Skullcandy Icon ANC | Drift: card ₹3,312, page ₹3,680 |
| B0H3NYBFVR Haier 12 kg washer | Drift: card ₹30,540, page ₹41,790 / ₹68,600 |
| B0B8NHX62W Samsung 7 kg Eco Bubble | Drift: card ₹14,566, page ₹17,490. There is a coupon badge, but its amount could not be read. |
| B0FFN56JXS AO Smith VAS PLUS 15 L geyser | Drift: card ₹5,440, page ₹6,599 |
| B0H4H579QP Wakefit Safari chair | Drift: card ₹4,948, page ₹5,497 |
| B09ZP8Z2CV Electrolux air purifier | Drift: card ₹5,436, page ₹6,290. There is a coupon badge. |
| B0FGY91JB5 Hero XOOM 125 ZX | Ex-showroom booking, not a product |
| B0G6Z6QV5C Harley-Davidson X440 T | Ex-showroom booking, not a product |
| OPPO Find X10 | Out of stock |
| Atomberg Intellon (Flipkart WAPHDAJG4ZHQ8ECZ) | Drift: card ₹12,599, page ₹17,999 |

The stage-1 drops included:
- Nothing Phone 4a 256 GB on Flipkart.
- An Axe `/s?` search page.
- A Realme P4 link that went to the Flipkart homepage.

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs: the 3 slugs plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14351–#14353 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the batch.
- **Prod:** the Myntra deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,823 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14353.
- **Posts (IST 2026-10-23):** 3. The minimum is met. 0 posts lack a cover and 0 lack SEO fields.
- **Broadcast cursor:** 14350. #14351–#14353 are waiting for the external cron.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
