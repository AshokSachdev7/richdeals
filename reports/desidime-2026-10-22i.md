# DESIDIME — 2026-10-22i (22:21 IST)

**2 Amazon deals pushed (IDs 14199–14200: 3-piece kitchen knife set, XECH Hydroboil PRO travel kettle). 11 rejected (7 for price drift, 4 with no buy box). IndexNow returned HTTP 200 for 5 URLs. The new deal page returns 200 on prod.**

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards, applied the JUNK/GROCERY filters, resolved `visit.desidime.com` to the merchant URL, and deduped by productId against the DB. Amazon ASINs were read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…')`. Price and MRP came from `#corePriceDisplay_desktop_feature_div` (`#centerCol` text when the selector read empty or gave a per-unit rate), and stock from `#availability` plus the add-to-cart button. Non-Amazon prices came from `productLd()`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Resolved to a single product | 22 |
| Already in the DB | 9 |
| Fresh | 13 |
| Rejected after verification | 11 |
| **Pushed** | **2** |

## Pushed

| Product ID | Deal | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| B0HH8J95G9 | Professional kitchen knife set, 3-piece, blue | Amazon | ₹119 | — | — |
| B0F6YRJ3SY | XECH Hydroboil PRO 700 ml portable electric kettle, blue | Amazon | ₹1,499 | ₹5,999 | 75% |

- **MRP guard:** the knife set's ₹999 MRP fails the 0.2 price/MRP ratio (0.12), so its MRP and discount are null and the copy states the price only. The ₹39.67 `.a-text-price` on that PDP is a per-unit rate, not an MRP.
- **Affiliate:** Amazon `/dp/<ASIN>?tag=ashoksachdev-21`, with the DesiDime tag (`desidime01-21`) stripped.
- **Image:** Amazon `data-old-hires` image.
- **Copy:** original titles and descriptions. The validator checked that every ₹ amount equals the price or MRP and every "N% off" equals `discountPct`.
- **Dedup:** the bulk response was `count:2`, both `created:true`, so no slug restore was needed.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| Flipkart Nothing Phone (4a) (MOBHZAWYHMRFGNFF) | ₹35,149 → ₹36,999 | Price drift (stage 1) |
| Flipkart Lifelong 4.5 HP treadmill (TRDHN62FDCFQRWH2) | ₹9,899 → ₹13,999 | Price drift (stage 1) |
| B0BHYQ1VG1 Puma Bermuda shorts | — | No buy box (no price, no add-to-cart; variant-stacked) |
| B07JQMQZVV Harpa top | — | No buy box (variant-stacked) |
| B0F4K7BHQ2 Tokyo Talkies dress | — | No buy box (variant-stacked) |
| B08D3RZDTN TORRIDO Rupa thermal | — | No buy box (variant-stacked) |
| B00XHTUA56 PINACOLADA tee | ₹99 → ₹308 | Price drift (MRP ₹699, only 2 left) |
| B0GTZ8TN6P PROWL lip balm | ₹34 → ₹149 | Price drift |
| B08HX2RGHM Cool master THK35 air cooler | ₹2,597 → ₹5,492 | Price drift; the card is Delhi-only |
| B0H6QCSMJK Lenovo LOQ Ryzen 7 RTX 4050 | ₹1,07,740 → ₹1,14,990 | Price drift (card relies on a bank offer) |
| B0DGX8D44F Interio by Godrej Curv mesh chair | ₹4,420 → ₹5,199 | Price drift (second tick running, also rejected in 22h) |

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs (2 slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800, so the new deals will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists them.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The new XECH kettle deal page returns 200.
- **Posts (IST 2026-10-22):** 3. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,670 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14200.
- **Broadcast cursor:** 14198 against a highest ID of 14200. It moved up from 14188, so the external cron is draining the queue.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
