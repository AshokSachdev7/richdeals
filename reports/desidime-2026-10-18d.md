# DESIDIME tick 2026-10-18d (06:33 IST)

**1 deal pushed live (count 1, created: id 13545). IndexNow 200 (4 URLs).**

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 33 |
| Resolved to a store product | 21 |
| Already in the DB | 6 |
| Fresh after stage 1 | 15 (14 Amazon, 1 Flipkart) |
| Passed the product-page check | 1 |

## Pushed

| ID | Deal | Price | MRP |
|---|---|---|---|
| B0B2LSVVLD | Longway Super Dlx 500 W mixer grinder + Kwid 1100 W dry iron combo | ₹999 | ₹4,199 (76% off) |

- **Product-page check:**
  - `#centerCol` price ₹999 equals the card price.
  - MRP ₹4,199.
  - In stock, with add-to-cart present.
  - The `landingAsinColor` value is "White & Blue", which matches the combo listing.
- **Image:** `71Vcb6BScJL.jpg` from the m.media-amazon.com CDN, with the size segment stripped. It returns 200.
- **Link:** `?tag=ashoksachdev-21`.
- **Discount field:** sent as `discountPct`. The row reads back as `discountPct` 76.
- **Check:** the local API returns 200 for the slug.

## Rejected

| ID | Card | Product page |
|---|---|---|
| B01MV5G8K6 Himalaya toothpaste | ₹77 (2 × 150 g) | ₹80; the default variant is a 1 × 300 g pack |
| B0FC2PZ39Z RR Raptor fan | ₹2,520 | ₹2,799 |
| B0DXTYY2JL Sounce hub | ₹314 | ₹339 |
| B0HDZDX4KW 2 g gold bar | ₹28,868 | ₹32,749 |
| B0HCTHQRVJ OnePlus Pad Lite | ₹18,749 | ₹21,999 |
| B0DHVWY583 Kalyan gold coin | ₹29,660 | no buy box |
| B0HCDXQP92 LG 12 kg washer | ₹37,489 | ₹48,989 |
| B0GYD6YC2N iFFALCON 75" TV | ₹45,999 | ₹69,999 |
| B0H25X3W7F ASUS TUF A15 | ₹81,740 | ₹99,990 |
| B0H6WHHSHR Lenovo IdeaPad Slim 3 | ₹65,990 | ₹74,990 |
| B0DTTZZ6Q3 DJI Osmo 360 | ₹32,740 | ₹36,990 |
| B0C5MXF7GF AO Smith 15 L geyser | ₹5,804 | ₹6,449 |
| B0BMVLP6B1 Orient Apex-FX fan | ₹1,045 | ₹1,349 |
| Flipkart LBXGHXDKAHSQCX3H Cello lunch box | ₹215 | ₹269 (ld+json, stage 1) |

That is 14 rejected:
- 12 Amazon IDs where the card price is below the product-page price;
- 1 Amazon ID with no buy box;
- 1 Flipkart ID with price drift.

10 of the Amazon IDs are repeats from 18c, at the same product-page prices. DesiDime is still listing bank-card and coupon prices.

## IndexNow

`indexnow-ping.mjs` for the 1 slug plus 3 hubs: **HTTP 200, 4 URLs**. The sitemap (ISR, 30 min) and `llms.txt` (force-dynamic) pick up the row on their own.

## CEO audit (06:33 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 1 (6.5 hours into the day). The 06:09 CONTENT-SEO run fired while earlier ticks were still running and is queued, not missing: the cron is present in CronList |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,021 (13,020 + 1) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13545 / 13544. The new row is seconds old and the external broadcaster hasn't picked it up yet, so this is not rot |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 match the roster |

No rot found.
