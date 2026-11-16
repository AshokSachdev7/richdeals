# DESIDIME-INGEST tick — 2026-11-16d

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage. It fetched no per-deal pages, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were verified on the PDP in the logged-in Playwright tab, and productIds were deduped against the live DB. Run at about 14:15–14:40 IST.

**Result: 4 pushed LIVE (bulk count 4, all `created:true`). One dup row (#16291) set to EXPIRED because the product went out of stock. IndexNow returned HTTP 200 for 8 urls. All new pages return 200 on prod.**

Stage 1 found 34 cards. 16 resolved to a product, 3 were already in the DB, 4 had been rejected in the last 24h, and 9 were fresh. A second pass that printed the dup lines found 32 cards, 18 resolved, 3 in the DB, 7 rejected in the last 24h and 8 fresh. Both passes surfaced the same fresh set.

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16676 | Amazon | Presto! 1 Ply M-Fold Tissue Paper, 1500 Pulls (10 x 150) | ₹629 | ₹1,500 | 58% |
| 16677 | Amazon | Sparkmate by Crystal Kitchen Sqeezy Multipurpose Wiper | ₹56 | ₹120 | 53% |
| 16678 | Amazon | MILTON Wondermeal Small Insulated Steel Tiffin Box, 490 ml, Beige | ₹299 | ₹955 | 69% |
| 16679 | Amazon | Philips Wireless Doorbell Kit DES1120W, Battery-Operated, White | ₹2,723 | ₹4,358 | 37% |

- Prices come from `#corePriceDisplay_desktop_feature_div .a-price-whole` and the M.R.P. from `.basisPrice .a-offscreen`. Every PDP had an add-to-cart button and none showed a coupon. All four carry `?tag=ashoksachdev-21` on `/dp/ASIN`, with DesiDime's `desidime01-21` stripped.
- MILTON: the card said M.R.P. ₹995, but the PDP says ₹955, so ₹955 was used. The PDP showed "Only 2 left in stock", so this deal joins the low-stock re-check list.
- Philips: the PDP M.R.P. is ₹4,357.55. The `mrp` column is an integer, so it is stored as ₹4,358. That rounds to 38% off, but `discountPct` is pinned to 37% to match the PDP badge. `#availability` was empty, but the add-to-cart button was present.
- Images come from `#landingImage` data-old-hires on m.media-amazon.com.
- The copy is original and uses only facts from the PDP title and bullets: ply, pull count and fold for the tissue; containers, capacity and insulation for the tiffin; melodies, volume levels and range for the doorbell. No features were invented.
- Pre-flight passed: every ₹ in the copy equals the price or M.R.P., the image URLs are valid, price is below M.R.P., and the slugs are unique.
- Slugs: `presto-1-ply-m-fold-tissue-paper-1500-pulls-10-packs-b08h1vtq7w`, `sparkmate-crystal-kitchen-sqeezy-multipurpose-wiper-b0bc888kr9`, `milton-wondermeal-small-insulated-steel-tiffin-box-490-ml-beige-b0d7mq6wvg`, `philips-wireless-doorbell-kit-des1120w-battery-operated-white-b08frt4hk5`.

## Dup re-checks

| Id | Deal | DB | PDP | Outcome |
|---|---|---|---|---|
| 16291 | One94Store 50m LED string lights (B0FTSW9P33) | ₹299 / ₹1,499, LIVE | "Currently unavailable", no price, no add-to-cart | **Set to EXPIRED.** The page stays live with the EXPIRED banner and `noindex` (verified on prod), and drops out of the sitemap. |
| 16666 | GM Balin geyser (B0FM8D7C1Z) | ₹5,499 / ₹12,490 | Same, in stock | No change. The card's ₹4,948 is a bank-offer price. |
| 16658 | Beardo curls (B0DPMCWQC6) | ₹235 / ₹350 | Same, in stock | No change (synced in tick c). |

## Rejected / skipped

- B0GYFXVK1K, SweetMe dried apricots 200g: grocery, and the PDP had no buy box.
- B0CHSC6N4F, aabo smart ring: the card said ₹2,539 but the PDP shows ₹14,999 against ₹25,999. Price drift.
- Three Shopsy cards ("Sunglasses @ 65% off", "Lyfcare adult diapers from 499", "Perfumes & Deos from 49"): category links with no single product.
- Rejected in the last 24h and skipped again: Klook sale, Bergner belly (B0H2VFNQFL), VIP vests (B09YV753WH), Dettol on Flipkart (CBKHEPQZ8ARJZHGG).

## Freshness

- IndexNow: `indexnow-ping.mjs` with the 4 new slugs, the expired #16291 slug and its 3 hub urls returned **HTTP 200 for 8 urls**.
- `sitemap.xml`: ISR, at most 30 min stale. The deals child is top-100 only, by design.
- `llms.txt`: force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |
| /presto-1-ply-m-fold-tissue-paper-1500-pulls-10-packs-b08h1vtq7w | 200 |
| /sparkmate-crystal-kitchen-sqeezy-multipurpose-wiper-b0bc888kr9 | 200 |
| /milton-wondermeal-small-insulated-steel-tiffin-box-490-ml-beige-b0d7mq6wvg | 200 |
| /philips-wireless-doorbell-kit-des1120w-battery-operated-white-b08frt4hk5 | 200 |
| /one94store-50m-led-string-lights-b0ftsw9p33 | 200 (EXPIRED banner, noindex) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,099 = 16,099 | OK (16,096 + 4 new − 1 expired) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,679 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,675 vs 16,679 | OK. The external broadcast cron picks up this batch on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- The IFS source is blocked (every `?rto=` redirects home). The 14:53 IST IFS tick probes one id first.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY, and now #16678 (B0D7MQ6WVG).
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
