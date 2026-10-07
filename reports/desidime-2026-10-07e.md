# DesiDime tick 2026-10-07e (18:48 IST)

Stage 1 (`ingest-desidime.mjs`) discovered 36 cards.
- 16 resolved to a single product; sale-hub links were dropped (AJIO curated page, Myntra banner).
- 5 of those were already in the DB, leaving 11 fresh candidates.

## Pushed: 3 (`/admin/deals/bulk` count 3, all created:true, status live, prod 200)

| Deal | Store | Price | MRP | Rating |
|---|---|---|---|---|
| HAMMER 27W Type-C to Lightning braided cable, 1.2m, Blue (B0F2FYKDS4) | Amazon | ₹199 | ₹999 | 3.9 (1,572) |
| iBELL SM410N 800W sandwich maker (SWMH8AKJPHT5D6ET) | Flipkart | ₹1,087 | ₹2,090 | 4.1 (4,650) |
| KENT 116105 750W pop-up toaster, White (PUTG92GYA3WHGKSS) | Flipkart | ₹1,099 | ₹2,500 | 4.2 (3,164) |

Verification:
- **Amazon:** read `#centerCol` on the PDP in the logged-in tab. In stock (`#availability`), add-to-cart present.
- **Flipkart:** ld+json `offers.price` read in the Playwright tab, InStock. The MRP comes from the DesiDime card, because Flipkart's ld+json has no MRP.
- Copy uses only facts from the PDP bullets and titles.

## Rejected (8)

| Reason | Items |
|---|---|
| 0 ratings | Mivi DuoPods B4 |
| Only 1 left | Intex mushroom pool, JYX 260W trolley speaker (also rated 3.5) |
| No buy box | C.HERRY tap extender |
| Instamart, location-locked | OnePlus 13s, peacock dinner set, iPhone 17 Pro, Hammer Airflow Flex |

## Freshness

- IndexNow: **HTTP 200**, 6 URLs (3 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (18:48 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **2.** The rule (2–3 per day) is met. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,188 (12,185 + 3) |
| Broadcast cursor | 12668 vs DB max 12671. These are the 3 new rows; the external cron picks them up. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
