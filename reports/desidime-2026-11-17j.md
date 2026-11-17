# DESIDIME-INGEST tick — 2026-11-17j

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards without fetching any deal page. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were then checked in the logged-in Playwright Amazon tab (`#corePriceDisplay` `.a-price-whole`, `#centerCol` M.R.P., `#availability` and add-to-cart). Non-Amazon candidates were checked with `productLd()` (ld+json price within ₹1, InStock). Run at about 18:15–18:50 IST.

**Result: 3 new deals pushed LIVE (#16759 Bombay Shaving Company deodorant set on Myntra, #16760 GRENARO S12 wireless mic, #16761 SanDisk Cruzer Blade 64GB). One dup LIVE row was price-synced (#9352 Acer wireless mouse, ₹319 → ₹399). Six candidates were rejected. IndexNow returned HTTP 200 for 7 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards read | 36 |
| Dropped as junk, grocery or unsupported link | 13 |
| Resolved to a merchant product | 21 |
| Dup of a DB row | 8 |
| Rejected in the last 24h (skipped) | 4 |
| Fresh candidates | 9 |

The four skipped as recent rejects were Jabra B06X15NDTV, VIP B09YV753WH, durfi B07HFBTV74 and Dettol CBKHEPQZ8ARJZHGG. A Sony DualSense card was also dropped because it resolved to a Reliance Digital hub page, not a product.

## Candidates

| Product | Id | Outcome |
|---|---|---|
| Bombay Shaving Company men deodorant set, 2 Red Spice + 2 Black Vibe, 150 ml each | Myntra 20324194 | **Pushed.** Live ₹349 / M.R.P. ₹1,420 (75% off). |
| GRENARO S12 wireless mic, Type-C single channel | B0DQD8HWWG | **Pushed.** PDP ₹784 / M.R.P. ₹1,999 (61% off), in stock, add-to-cart present. |
| SanDisk Cruzer Blade 64GB USB 2.0 (SDCZ50-064G-I35) | B00BX5FOCK | **Pushed.** PDP ₹849 / M.R.P. ₹1,100 (23% off), in stock, add-to-cart present. |
| SOFIERTH kitchen roll | Flipkart KNRHZ4HYEKHX3XCA | Rejected: price drift, ₹58 on the card vs ₹248 live |
| Snickers | Zepto 7f33bca866af | Rejected: no ld+json, so the price can't be verified |
| Amazon Basics refill | B0D541H9CS | Rejected: no buy box |
| RITU CutPlus | B0BY97K36P | Rejected: the PDP serves only a placeholder image (01RPy1SfeqL); `colorImages` hiRes is null, and the mobile page returned recommendation images from other products |
| OTEK air purifier | B0DPH8F48B | Rejected: price drift, ₹6,499 live vs ₹5,400 on the card (the ₹500 coupon still leaves ₹5,999) |
| SofaArchitect sofa bed | B08FCKJNWW | Rejected: price drift, ₹15,499 live vs ₹14,559 on the card (₹250 coupon) |

All six rejects were written to `data/dd-rejected.json` with `Date.now()`; the file now holds 2,057 entries.

## Fresh deals

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16759 | Bombay Shaving Company men deodorant set (4 × 150 ml) | ₹349 | ₹1,420 | 75% | InRDeals → `myntra.com/20324194` |
| 16760 | GRENARO S12 wireless mic, Type-C | ₹784 | ₹1,999 | 61% | Amazon `/dp/B0DQD8HWWG?tag=ashoksachdev-21` |
| 16761 | SanDisk Cruzer Blade 64GB USB 2.0 | ₹849 | ₹1,100 | 23% | Amazon `/dp/B00BX5FOCK?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:3`, all `created:true` (HTTP 201), so no slug restore was needed. A Prisma read-back confirms all three LIVE with the prices, M.R.P.s and discounts above, and the right stores (Myntra id 3, Amazon id 1).
- **Images:** Myntra `assets.myntassets.com` image 1 of the listing; Amazon `m.media-amazon.com` 71dhDqkgHPL (mic) and 61ERDR3tATL (pen drive), both from the PDP's main image.
- **Affiliate:** Myntra goes through InRDeals, per the store matrix. The Amazon rows carry our tag.
- **Copy:** every ₹ in the titles and descriptions matches the numeric price and M.R.P. The "under ₹90 per can" line in the deodorant copy is ₹349 ÷ 4 = ₹87.25.

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 9352 | Acer wireless mouse, 1600 DPI, 2.4GHz | ₹319 / M.R.P. ₹1,499 | ₹399 / M.R.P. ₹1,499 | **Synced** to ₹399 / ₹1,499 / 73%. Title and description rewritten to match; one priceHistory row added. |
| 10710 | Fujifilm | ₹45,999 | ₹45,999 | No change |
| 14560 | Ant Esports | ₹710 | ₹710 | No change |
| 16749 | AO Smith | ₹6,722 | ₹6,722 | No change |
| 219 | Creative | ₹211 | ₹211 | No change |
| 921 | Go Desi chikki | ₹249 | Confirmed at 18:00 (TG-MONITOR 11-17s) | No change |
| 16756 | Lifelong | ₹546 | Pushed at tick i, about two hours ago | Not re-read |
| — | Samsung monitor B0DQ57M8HC | EXPIRED | No buy box | No change |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs plus the Acer slug returned **HTTP 200 for 7 URLs** (4 slugs plus the 3 hub paths).
- **Pages on prod:** deodorant 200 (0.44s), mic 200 (0.22s), pen drive 200 (0.38s), Acer 200 (0.41s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.36s) |
| /offers | 200 (0.18s) |
| /blog | 200 (0.87s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.67s) |

## CEO audit

Run at 18:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,181 = 16,181 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,761 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,758 vs 16,761 | OK. The 3-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 18:50 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h and i, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil. This tick's four same-price confirms add to it.
- **No buy box, on watch:** #9689, #15663, #14424, #16741.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Minor:** the Fujifilm #10710 title shows "₹45999" without a thousands comma.
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 20:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
