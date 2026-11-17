# DESIDIME-INGEST tick — 2026-11-17e

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage. It applied the JUNK and GROCERY filters, resolved each `visit.desidime.com` link and deduped by productId against the live DB. The tick then read the fresh candidate's PDP and every dup PDP in the logged-in Amazon tab (Playwright, richDeals profile). Run at about 08:40–08:47 IST.

**Result: 1 new deal pushed LIVE (#16723, Dot & Key Cica combo at ₹597), and 3 dup LIVE rows were price-synced to the PDP. IndexNow returned HTTP 200 for 7 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Junk / other-store dropped | 24 |
| Product-resolved | 11 |
| Already in DB (dups) | 4 |
| Rejected within 24 h | 6 |
| Fresh candidates | **1** |

The 6 within-24h rejects were all recorded in earlier ticks:
- WINIX 5300 air purifier (B01D8DAYBA)
- Klook travel sale (not a product)
- Crompton FlameStar gas stove (B0F3J89F8L)
- Lloyd 1.5 Ton split AC (Flipkart ACNHMRG29GVDTDXD)
- VIP Bonus vests (B09YV753WH)
- Dettol shower gel (Flipkart CBKHEPQZ8ARJZHGG)

## Fresh deal

| Id | Product | Card | PDP | Action |
|---|---|---|---|---|
| 16723 | Dot & Key Cica Calming skincare combo, 4 products (B0HDNWB3QK) | ₹538 / ₹1,788 | ₹597 / M.R.P. ₹1,788, in stock, add-to-cart present | Pushed LIVE at ₹597 |

- **Price:** the card's ₹538 is 0.90 of the ₹597 buy box, so DesiDime quoted the price after a 10% clip coupon. The deal was published at the buy-box price, and the description says a coupon may bring it to about ₹538.
- **M.R.P.:** ₹1,788 is confirmed in `#centerCol`, which means 67% off, so it was kept. The ₹205.86 strike figure is the per-100 g rate, not the M.R.P.
- **Image:** taken from the PDP hiRes (`61Wk6DzfQML`). Stage 1's image field pointed at an unrelated Bergner card, so it was not used.
- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true`. In the DB the row is LIVE with the Amazon store and the `ashoksachdev-21` tag.
- **Slug:** `dot-key-cica-calming-skincare-combo-4-products-b0hdnwb3qk`.

## Dup re-checks (still reposted on DesiDime)

All four PDPs were read with a same-origin fetch in the logged-in tab. The price came from `.a-price-whole` in `#corePriceDisplay`, and stock from `#availability` plus the add-to-cart button. There was no captcha.

| Id | Product | Card | DB before | PDP | Action |
|---|---|---|---|---|---|
| 13767 | Richardson Sheffield Chef Mate steak knife (B0CXSFK6D4) | ₹72 | ₹82 / ₹379 | ₹71, in stock | Synced to ₹71. The M.R.P. was nulled because ₹379 now implies 81% off (≥80% rule). The title and description were updated. |
| 12443 | Ingco 20V 4.0Ah battery pack (B0BK1C3TFH) | ₹2,150 | ₹2,279 / ₹6,000 | ₹2,150, in stock | Synced to ₹2,150 (64% off). The unverifiable review count was dropped from the description. |
| 12963 | Himalaya Total Care baby pants L, 128 count (B0H6BKQ1Q2) | ₹1,085 | ₹1,030 / ₹2,398 | ₹1,085, in stock | Synced up to ₹1,085 (55% off, about ₹8.48 per diaper). The stale rating count was dropped. |
| 16720 | Homeor fridge storage box (B0FL2G88N9) | ₹429 | ₹429 / null | ₹429, in stock | None. The M.R.P. stays null by the ≥80% rule. |

Each sync was done with `prisma.deal.update` and wrote a `priceHistory` row. The ₹ figure and % in each title were updated to match the new price.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the new slug and the 3 synced slugs. It returned **HTTP 200 for 7 URLs** (4 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.84s) |
| /sitemap.xml | 200 (0.18s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.63s) |

## CEO audit

Run at 08:47 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,143 = 16,143 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,723 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,723 | OK. The one-deal gap is #16723, pushed this tick; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 08:47 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** eleven dry ticks in a row (redirector down since 11-16). DesiDime and Telegram carry ingest. The 08:53 IST DEAL-INGEST run probes one id; if it is still dead after 11-17, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 10:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
