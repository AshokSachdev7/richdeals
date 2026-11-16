# DESIDIME-INGEST tick — 2026-11-17a

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards without fetching any per-deal page. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. The tick then checked every Amazon candidate's price on the PDP in the logged-in Playwright tab, deduped by productId against the live DB, and price-synced the duplicates. Run at about 00:43–00:50 IST.

**Result: 2 deals pushed LIVE (#16720, #16721), `count:2`, both `created:true`, HTTP 201. One duplicate LIVE row (#1411) had a stale price and was fixed. IndexNow returned HTTP 200 for 6 URLs, and all 3 pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 36 |
| Junk (JUNK/GROCERY regex) | 17 |
| Resolved to a single product | 14 |
| Already in DB | 2 |
| Rejected within the last 24 h | 5 |
| Fresh candidates | 7 |

Dropped by stage 1:
- Amazon Pay UPI reward: not a product.
- Better Home Aerochef: resolved to the Flipkart `/DesiDime/p/DesiDime` tracking page.
- HP and Rangriti: resolved to `/s?` search pages.
- WONDERCUT: `/flipkart/p/b?pid=` landing, not a product page.

Skipped because they were rejected within the last 24 h: Klook, Crompton B0F3J89F8L, Lloyd ACNHMRG29GVDTDXD, VIP B09YV753WH, Dettol CBKHEPQZ8ARJZHGG.

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16720 | Amazon | Homeor divided fridge storage box, 4 compartments, lid and handle (B0FL2G88N9) | ₹429 | omitted | — |
| 16721 | Amazon | GOBOULT Dive+ 1.85" Bluetooth-calling smartwatch, Icy Blue (B0BMVVH1X9) | ₹1,199 | omitted | — |

Notes:
- **PDP check:** both in stock with the add-to-cart button present. The price was read from `.a-price-whole` in `#corePriceDisplay` and matched the card within ₹1.
- **M.R.P. omitted:** the listed M.R.P.s (₹3,999 for Homeor, 89% off; ₹8,499 for GOBOULT, 86% off) imply 80% or more off. Those M.R.P.s look inflated, so per the rule the M.R.P. is null and no discount is claimed.
- **GOBOULT seller:** DesiDime's link pinned `smid=AJ6SIZC8YQDZX`. The default buy box on the plain `/dp/` URL showed the same ₹1,199, so the affiliate link carries no seller pin.
- **Images:** hiRes from `colorImages.initial` on m.media-amazon.com (`814fkBUYKNL._SL1500_.jpg`, `71ilAZfYIlL._SL1500_.jpg`).
- **Copy:** uses facts from the PDP title only. The GOBOULT copy notes that IP68 is a dust and water-resistance rating, not a swimming rating.
- **Affiliate link:** `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.
- **Pre-flight check:** every ₹ figure in the title and copy matches the price, and each slug ends with its ASIN.
- **Push target:** local API (`localhost:4000`), `status:live`.

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 1411 | Dabur Gulabari rose shower gel 250 ml (B0CJLY8XS3) | ₹89 / ₹219 (59%) | ₹81 / ₹219, in stock | `prisma.deal.update`: price 81, discountPct 63. Title and description rewritten to ₹81. Slug kept. Prod page shows `"price":"81"`. |
| 14424 | HP 460 multi-device keyboard (B0CNCQM7X1) | ₹1,270 / ₹3,999 | No buy box: no price and no add-to-cart button | No change. Added to the no-buy-box watch list. DesiDime's card said ₹813. |

## Rejected / skipped

- **B09F9828MD BLACK+DECKER:** PDP ₹4,898 vs card ₹4,277. The card is likely a bank-offer price.
- **B01D8DAYBA WINIX 5300 air purifier:** PDP ₹13,999 vs card ₹11,200.
- **B0GYHMBXWF F Gear backpack:** PDP ₹780 vs card ₹385, with only 1 left. The card image also showed a different product.
- **B0GWS73DY2 Presto handwash (₹278), B079HWW3NM Set Wet gel (₹112):** low-ticket FMCG.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 2 new slugs, the #1411 slug and 3 hub URLs returned **HTTP 200 for 6 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.49s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.59s) |
| /homeor-divided-fridge-storage-box-4-compartment-veggie-tray-lid-handle-b0fl2g88n9 | 200 (0.27s) |
| /goboult-dive-plus-1-85-inch-bluetooth-calling-smartwatch-icy-blue-b0bmvvh1x9 | 200 (0.22s) |
| /dabur-gulabari-shower-gel-250-ml-99-pure-glycerine-gentle-bodywash-himalayan-ros-b0cjly | 200 (0.20s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,141 = 16,141 | OK (16,139 + 2) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,721 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,719 vs 16,721 | OK. #16720 and #16721 are queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 still needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (7 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard, new this tick).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at 02:43 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
