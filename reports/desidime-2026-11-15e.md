# DESIDIME-INGEST tick — 2026-11-15e

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards only, applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were verified with an in-tab fetch in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability`, add-to-cart). There was no captcha. Run at about 08:43–08:50 IST.

**Result: 3 pushed LIVE (bulk count 3, all created), 2 dup rows price-synced, 3 rejected. IndexNow returned HTTP 200 for 8 urls. Prod is 7/7 at 200 and every DB check is green.**

## Stage 1

- 37 cards discovered.
- 20 dropped as junk or a non-product. Examples: a Netmeds wallet promo, two PharmEasy checkups, and a Xiaomi TV card whose Buy Now resolved back to desidime.com.
- 13 resolved to a product:
  - 5 were already in the DB: the B0C7BM7L45 wedge pillow, B09P88XH6Q Philips, B08GL16RDS Solimo, B0F8VZ1KZF HP mouse (synced in 15d) and Flipkart TRIGGR ACCHKBK5C8YFPKVS ₹599 (PH row on 11-14).
  - 2 were rejected in the last 24h: Knightica (Epic Games) and Klook.
  - 6 were fresh. None of the 6 ASINs exists in the DB by productId or affiliateUrl.

## Pushed

| ASIN | Deal | Price | MRP | Off | PDP check |
|---|---|---|---|---|---|
| B0G3VV1122 | #16590 DIGIMORE 80W portable Bluetooth speaker | ₹2,499 | ₹9,999 | 75% | Card = PDP, in stock, add-to-cart |
| B0HHJG4B3L | #16591 USHA TechnoAir R 1200mm BLDC fan, RF remote | ₹2,073 | ₹4,199 | 51% | Card = PDP, in stock, add-to-cart |
| B0DXPPJ8YQ | #16592 CELLO Glassy square glass lunch box, set of 3 | ₹587 | ₹1,440 | 59% | Card = PDP, in stock, add-to-cart |

All three use `?tag=ashoksachdev-21` on `/dp/ASIN` and a marketplace image. Titles and descriptions are original copy.

## Dup re-checks

| Row | Deal | Before | PDP | Action |
|---|---|---|---|---|
| #5577 | Amazon Basics wedge pillow B0C7BM7L45 | ₹1,199, M.R.P. ₹2,799 | ₹907, M.R.P. ₹2,799, in stock | **Synced to ₹907 (68% off).** The title and description were rewritten (the old copy said Rs.1199). PH row added. |
| #7673 | Same ASIN, older short slug | ₹972, no MRP | Same | **Synced to ₹907, MRP ₹2,799, 68% off.** Title and description updated. PH row added. |

The card showed ₹908 and the PDP ₹907. The PDP is the truth. Slugs were not changed. #5577 keeps a null productId, because setting it would collide with #7673 on `@@unique([storeId, productId])`.

## Rejected

- B0F9KBZ8W3 ASUS VA259HGA monitor: the card showed ₹7,117 but the PDP shows ₹9,999. Price drift.
- B0H25X3W7F ASUS TUF A15: the card showed ₹92,740 but the PDP shows ₹99,990. Likely a bank-offer price.
- B0CHDYQQ77 Unibic Royal Vanilla cake 220g: perishable food, which the GROCERY regex missed.

All three were added to `data/dd-rejected.json` with `Date.now()` values.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 3 new slugs and the 2 synced slugs. It returned **HTTP 200** for 8 urls (5 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.
- The #16591 USHA prod page returns 200 (0.23s) with Offer price 2073 and the correct title.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.29s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,012 = 16,012 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,589 vs 16,592 | OK. The gap is this tick's 3 deals, which the external broadcast cron picks up on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Fixed this tick: the GROCERY regex in `lib/ingest-common.mjs` missed a packaged cake (Unibic). It now also matches `cakes?|cookies?|rusk`.
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506, #16558, #7461.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344). B0C7BM7L45 has two LIVE pages (#5577, #7673). Both are now on the same price.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
