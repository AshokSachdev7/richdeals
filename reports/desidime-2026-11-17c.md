# DESIDIME-INGEST tick — 2026-11-17c

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link and deduped by productId against the live DB. The tick then re-read every dup PDP in the logged-in Amazon tab (Playwright, richDeals profile). Run at about 04:40–04:46 IST.

**Result: 0 new deals; every surviving card was already in the DB or rejected within the last 24 hours. 1 dup LIVE row was price-synced: #1411 Dabur Gulabari moved from ₹81 to ₹89. Its title and description were corrected and a priceHistory row was written. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 33 |
| Junk / other-store dropped | 19 |
| Product-resolved | 14 |
| Already in DB (dups) | 5 |
| Rejected within 24 h | 9 |
| Fresh candidates | **0** |

The 9 within-24h rejects, all recorded in earlier ticks: WINIX 5300 air purifier (B01D8DAYBA), Presto! rose handwash 5 L (B0GWS73DY2), Set Wet hair gel (B079HWW3NM), Vimal groundnut oil 5 L on Zepto (grocery), Klook travel sale (not a product), Crompton FlameStar gas stove (B0F3J89F8L), Lloyd 1.5 Ton split AC (Flipkart ACNHMRG29GVDTDXD), VIP Bonus vests (B09YV753WH) and Dettol shower gel (Flipkart CBKHEPQZ8ARJZHGG). `data/dd-rejected.json` is unchanged at 2,038 entries.

## Dup re-checks (reposted on DesiDime)

All five PDPs were read with a same-origin fetch in the logged-in tab. The price came from `.a-price-whole` in `#corePriceDisplay`, and stock from `#availability` plus the add-to-cart button. No captcha.

| Id | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|
| 1411 | Dabur Gulabari shower gel 250 ml (B0CJLY8XS3) | ₹81 | ₹81 / ₹219 | **₹89** / ₹219, in stock, add-to-cart present | **Price-synced to ₹89.** Title now reads "at ₹89 (59% Off)" and the description's ₹ figures match. priceHistory row written. |
| 16720 | Homeor fridge storage box (B0FL2G88N9) | ₹429 | ₹429 | ₹429, in stock | None. The PDP's ₹3,999 M.R.P. implies 89% off, so the DB M.R.P. stays null by rule. |
| 16721 | GOBOULT Dive+ smartwatch (B0BMVVH1X9) | ₹1,199 | ₹1,199 | ₹1,199, in stock | None. The ₹8,499 M.R.P. implies 86% off, so it stays null. |
| 16722 | F Gear Polaris 37L backpack (B0GYHMBXWF) | ₹385 | ₹780 / ₹1,560 | ₹780 / ₹1,560, in stock | None. The ₹385 is a clip coupon or an ended price drop. |
| 14424 | HP 460 keyboard (B0CNCQM7X1) | ₹813 | ₹1,270 | Still no buy box: no price and no add-to-cart button | None. Stays on the no-buy-box watch list. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the #1411 slug plus 3 hub URLs returned **HTTP 200 for 4 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.92s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.71s) |
| /dabur-gulabari-shower-gel-250-ml-99-pure-glycerine-gentle-bodywash-himalayan-ros-b0cjly | 200 (0.21s) |

## CEO audit

Run at 04:46 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **#1411 history gap:** the DB held ₹81 while the last priceHistory row (11-15) said ₹89, so some path changed the price without writing history. Same root as the same-price-confirm gap below.
- **Same-price confirms:** they should write a priceHistory row so priceValidUntil stays current (94.2% of LIVE deals have none).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Hair-straightener post:** headline is 111 characters (low priority).
- **IFS source blocked:** every `?rto=` redirects home (9 dry ticks).
- **No buy box, on watch:** #9689, #15663, #14424.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 06:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
