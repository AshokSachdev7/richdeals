# DESIDIME-INGEST tick — 2026-11-17d

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link and deduped by productId against the live DB. The tick then re-read every dup PDP in the logged-in Amazon tab (Playwright, richDeals profile). Run at about 06:45–06:50 IST.

**Result: 0 new deals; every surviving card was already in the DB or rejected within the last 24 hours. The 5 dup LIVE rows were re-read and all match the DB, so no price-sync was needed. IndexNow was not run because nothing was pushed or changed. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 33 |
| Junk / other-store dropped | 20 |
| Product-resolved | 13 |
| Already in DB (dups) | 5 |
| Rejected within 24 h | 8 |
| Fresh candidates | **0** |

The 8 within-24h rejects were all recorded in earlier ticks:
- WINIX 5300 air purifier (B01D8DAYBA)
- Presto! rose handwash 5 L (B0GWS73DY2)
- Set Wet hair gel (B079HWW3NM)
- Klook travel sale (not a product)
- Crompton FlameStar gas stove (B0F3J89F8L)
- Lloyd 1.5 Ton split AC (Flipkart ACNHMRG29GVDTDXD)
- VIP Bonus vests (B09YV753WH)
- Dettol shower gel (Flipkart CBKHEPQZ8ARJZHGG)

The card set is the same as in tick 11-17c, minus the Vimal groundnut oil (grocery), which dropped off the listing. `data/dd-rejected.json` is unchanged.

## Dup re-checks (still reposted on DesiDime)

All five PDPs were read with a same-origin fetch in the logged-in tab. The price came from `.a-price-whole` in `#corePriceDisplay`, and stock from `#availability` plus the add-to-cart button. There was no captcha.

| Id | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|
| 1411 | Dabur Gulabari shower gel 250 ml (B0CJLY8XS3) | ₹81 | ₹89 / ₹219 | ₹89, in stock, add-to-cart present | None. The tick-c sync holds. The ₹35.60 strike figure on the page is the per-100 ml rate, not the M.R.P. |
| 16720 | Homeor fridge storage box (B0FL2G88N9) | ₹429 | ₹429 / null | ₹429 / ₹3,999, in stock | None. The ₹3,999 M.R.P. implies 89% off, so the DB M.R.P. stays null by rule. |
| 16721 | GOBOULT Dive+ smartwatch (B0BMVVH1X9) | ₹1,199 | ₹1,199 / null | ₹1,199 / ₹8,499, in stock | None. The ₹8,499 M.R.P. implies 86% off, so it stays null. |
| 16722 | F Gear Polaris 37L backpack (B0GYHMBXWF) | ₹385 | ₹780 / ₹1,560 | ₹780 / ₹1,560, in stock | None. The ₹385 on the card is a clip coupon or an ended price drop. |
| 14424 | HP 460 keyboard (B0CNCQM7X1) | ₹813 | ₹1,270 | Still no buy box: no price and no add-to-cart button | None. It stays on the no-buy-box watch list. |

## Freshness

- **IndexNow:** not run, because 0 deals were pushed and no rows changed.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.49s) |

## CEO audit

Run at 06:49 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post.

## Still open

- **IFS source dead:** every `?rto=` redirects home. DesiDime and Telegram carry ingest. The next DEAL-INGEST run is at 06:53 IST and should probe one id only.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 08:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
