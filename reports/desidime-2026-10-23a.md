# DESIDIME — 2026-10-23a (00:19 IST)

**3 Amazon deals pushed (IDs 14228–14230: kitchen scissors, Portronics Quadline 60W 4-in-1 cable, Larah borosilicate glass lunch box). 4 rejected (3 for price drift, 1 with no buy box). IndexNow returned HTTP 200 for 6 URLs. The new Larah deal page returns 200 on prod.**

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards, applied the JUNK/GROCERY filters, resolved `visit.desidime.com` to the merchant URL, and deduped by productId against the DB. Amazon ASINs were read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…')`. The `.a-price` selector read empty on all seven, so price and MRP came from `#centerCol` text, and stock from `#availability` plus the add-to-cart button.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Dropped by stage 1 (junk, app link, rewards/claim pages, other) | 17 |
| Resolved to a single product | 15 |
| Already in the DB | 8 |
| Fresh | 7 (all Amazon) |
| Rejected after PDP read | 4 |
| **Pushed** | **3** |

Stage 1 dropped the Fashion Bar nail polish (Flipkart `/flipkart/p/itm61fc29fb3d2c9`). It is already live as #14226 from TG 10-22q.

## Pushed

| Product ID | Deal | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| B0DRV5WP97 | Multi-purpose stainless steel kitchen scissors with cover | Amazon | ₹69 | — | — |
| B0GWQS3V9N | Portronics Quadline 60W 4-in-1 retractable charging cable | Amazon | ₹359 | ₹1,099 | 67% |
| B0DTHRFRYH | Larah Vogue Blue borosilicate glass lunch box with bag | Amazon | ₹335 | ₹945 | 65% |

- **MRP guard:** the scissors' ₹599 MRP fails the 0.2 price/MRP ratio (0.115), so MRP and discount are null and the copy states the price only.
- **Discount rounding:** Larah computes to 64.55%, stored as 65%. Amazon's badge truncates to 64%.
- **Copy fix after push:** the first Portronics description named USB-C and Lightning connectors that the PDP title does not list. It was rewritten via `prisma.deal.update` to say only "4-in-1" and "60W".
- **Affiliate:** Amazon `/dp/<ASIN>?tag=ashoksachdev-21`, with the DesiDime tag (`desidime01-21`) stripped.
- **Image:** Amazon `data-old-hires` image.
- **Copy:** original titles and descriptions. The validator checked that every ₹ amount equals the price or MRP and every "N% off" equals `discountPct`.
- **Dedup:** the bulk response was `count:3`, all `created:true`, so no slug restore was needed.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0HK3HB3V7 Set Wet Luxury Perfume Classic | ₹49 → — | No buy box (no add-to-cart). Also rejected in TG 10-22q |
| B08HX2RGHM Cool master THK35 air cooler | ₹2,597 → ₹5,492 | Price drift; the card is Delhi-only. Third tick running |
| B0H6QCSMJK Lenovo LOQ Ryzen 7 RTX 4050 | ₹1,07,740 → ₹1,14,990 | Price drift (card relies on a bank offer) |
| B0DGX8D44F Interio by Godrej Curv mesh chair | ₹4,420 → ₹5,199 | Price drift. Third tick running |

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs (3 slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800, so the new deals will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists them.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The new Larah deal page returns 200.
- **Posts (IST 2026-10-23):** 0. This is not rot: the IST day is 19 minutes old, and the CONTENT-SEO cron fires at 00:39 IST. 10-22 closed at 3. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,700 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14230.
- **Broadcast cursor:** 14227 against a highest ID of 14230. This batch of 3 is the backlog for the external cron.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
