# DESIDIME — 2026-10-23i (16:20 IST)

**8 Amazon deals pushed (#14386–#14393). 7 fresh candidates were rejected: 4 for Amazon price drift, 1 Amazon listing with no price and no add-to-cart button, and 2 Instamart items that failed the stage-1 check. IndexNow returned HTTP 200.**

## Method

- **Stage 1:** `ingest-desidime.mjs` read the `/new` and homepage cards, ran the JUNK/GROCERY filters, resolved `visit.desidime.com` to the real merchant URL, and price-checked non-Amazon merchants with `productLd()`.
- **Amazon:** read in Playwright tab 1 with an in-page `fetch('/dp/…?th=1&psc=1')`:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `data-old-hires`.
  - HP backpack: had no `data-old-hires`, so the landing image `41PAPahcN1L` was used instead of the first hiRes, which could be another colour. The image URL returns 200.
- **Dedup:** resolved `productId` against the live DB. I re-checked all 8 just before pushing and found 0 matches.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 33 |
| Stage-1 drops (junk, sale hubs, tracking landings) | 9 |
| Resolved to a single product | 21 |
| Already in the DB | 6 |
| Fresh | 15 |
| Rejected | 7 |
| **Pushed** | **8** |

## Pushed

The bulk response was `201`, `count: 8`, `created: true` ×8, and all 8 rows are LIVE.
- The links are `dp/<ASIN>?tag=ashoksachdev-21`. The DesiDime tag `desidime01-21` was stripped.
- Titles and descriptions are original. Every ₹ value and % was checked against the price and MRP before posting.
- Where the card's MRP implied 80% or more off, the MRP was set to null.

| # | ASIN | Deal | Price | MRP |
|---|---|---|---|---|
| 14386 | B0FP5KWCD2 | Stainless steel 30/60 ml peg measure jigger | ₹59 | null (₹299, ratio 0.20) |
| 14387 | B0CV7GPHWD | JIALTO bathroom cleaning brush set, 4 pcs | ₹87 | null (₹999) |
| 14388 | B0GGJF1NS3 | TRESSENCE bamboo toothbrush, pack of 4 | ₹78 | null (₹399, ratio 0.20) |
| 14389 | B08YYQ3WFG | boAt Bassheads 105 wired earphones | ₹349 | ₹999 (65%) |
| 14390 | B0FDKJB556 | HP Campus Core 16 laptop backpack, grey | ₹505 | null (₹3,099) |
| 14391 | B0CSSTCLCD | Spigen ArcPack 10000 mAh 22.5 W power bank | ₹854 | ₹2,399 (64%) |
| 14392 | B074ZF7PVZ | boAt Bassheads 900 wired on-ear headphones | ₹799 | ₹2,490 (68%) |
| 14393 | B0BGS28H74 | ZEBRONICS Jumbo LITE Bluetooth neckband | ₹498 | null (₹2,999) |

## Rejected

| Item | Reason |
|---|---|
| B0F1T6XXYG ViewSonic VX2779A 27" monitor | Drift: card ₹7,337, page ₹8,652. Even with the ₹500 coupon it is ₹8,152, so the card price assumed a bank offer. |
| B0C5MRBLJ9 Fire-Boltt Ace Luxury Phoenix | No price and no add-to-cart button |
| B0H3NYBFVR Haier 12 kg washer | Drift: card ₹30,540, page ₹41,790. Same rejection as 10-23h. |
| B0B8NHX62W Samsung 7 kg Eco Bubble | Drift: card ₹14,566, page ₹17,490 (₹750 coupon). Same rejection as 10-23h. |
| B0FFN56JXS AO Smith VAS PLUS 15 L | Drift: card ₹5,440, page ₹6,599. Same rejection as 10-23h. |
| Instamart Jockey 2714 | No ld+json on the page |
| Instamart Jockey AM44 | Price drift |

The stage-1 drops included:
- A BOLDFIT gallon bottle whose Flipkart link had no product path.
- The Hamara Mall "under 49" collection page.
- A Lizol Amazon Pay claim page.

## Freshness

- **IndexNow:** HTTP 200 for 11 URLs: the 8 slugs plus `/`, `/offers` and `/sitemap.xml`.
- **Sitemap:** ISR 1800 s, so it will carry #14386–#14393 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the batch.
- **Prod:** the Spigen deal page returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,863 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14393.
- **Posts (IST 2026-10-23):** 3. The minimum is met. 0 posts lack a cover and 0 lack SEO fields.
- **Broadcast cursor:** 14385. #14386–#14393 are waiting for the external cron.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
