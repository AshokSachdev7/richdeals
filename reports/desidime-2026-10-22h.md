# DESIDIME — 2026-10-22h (20:21 IST)

**2 deals pushed (IDs 14181–14182: American Tourister backpack, Allen Solly jacket). 9 rejected (8 for price drift, 1 with no ld+json). IndexNow returned HTTP 200 for 5 URLs. The new deal page returns 200 on prod.**

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards, applied the JUNK/GROCERY filters, resolved `visit.desidime.com` to the merchant URL, and deduped by productId against the DB. Amazon ASINs were read in Playwright tab 1 (logged-in richDeals profile) with an in-page `fetch('/dp/…')`. Price and MRP came from `#corePriceDisplay_desktop_feature_div`, and stock from `#availability` plus the add-to-cart button. Non-Amazon prices came from `productLd()`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Resolved to a single product | 17 |
| Already in the DB | 6 |
| Fresh | 11 |
| Rejected after verification | 9 |
| **Pushed** | **2** |

## Pushed

| Product ID | Deal | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| B0D66RSNZS | American Tourister Carter 28L laptop backpack | Amazon | ₹679 | — | — |
| f3acfd502710 | Allen Solly olive jacket for men | Allen Solly (new store row) | ₹2,399 | ₹3,999 | 40% |

- **MRP guard:** the backpack's PDP MRP of ₹3,590 fails the 0.2 price/MRP ratio, so its MRP and discount are null and the copy states the price only.
- **Affiliate:**
  - Amazon: `/dp/<ASIN>?tag=ashoksachdev-21`, with the DesiDime tag (`desidime01-21`) stripped.
  - Allen Solly: Cuelinks wrap of the clean `allensolly.abfrl.in` product URL, with `?source=plp` dropped.
- **Image:** Amazon `data-old-hires` image, and the merchant CDN image for Allen Solly.
- **Copy:** original titles and descriptions. The validator checked that every ₹ amount equals the price or MRP and every "N% off" equals `discountPct`.
- **Dedup:** the bulk response was `count:2`, both `created:true`, so no slug restore was needed. The `allen-solly` store row was created by the bulk upsert.

## Rejected

| Item | Card → PDP | Reason |
|---|---|---|
| B0BD9BF14B TIMEX Main Street women's watch | ₹3,591 → ₹3,990 | Price drift (card is about 10% under, consistent with a bank offer) |
| B0GQT3W35R Haier 8 kg washer | ₹16,930 → ₹19,180 | Price drift |
| B0CNLQYLS4 AGARO Royal spin scrubber | ₹2,367 → ₹2,630 | Price drift (card is about 10% under) |
| B0DXBZ1245 Teakwood cabin trolley | ₹1,091 → ₹1,186 | Price drift |
| B0DGX8D44F Interio by Godrej Curv mesh chair | ₹4,420 → ₹5,199 | Price drift |
| B0C6LZLBWF Livguard LGS1000i inverter | ₹4,500 → ₹5,000 | Price drift (card is about 10% under) |
| Flipkart Kamiliant cabin suitcase | ₹776 | Price drift (stage 1) |
| Flipkart Prestige Classic 500 W juicer mixer grinder | ₹1,524 | Price drift (stage 1) |
| JioMart HP M190 wireless mouse | ₹333 | No ld+json, so the price could not be verified |

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs (2 slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800, so the new deals will appear within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already lists them.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The new Allen Solly deal page returns 200.
- **Posts (IST 2026-10-22):** 3. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,652 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14182.
- **Broadcast cursor:** 14180 against a highest ID of 14182. It moved up from 14162, so the external cron is draining the queue.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
