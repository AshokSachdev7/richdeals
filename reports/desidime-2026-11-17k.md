# DESIDIME-INGEST tick — 2026-11-17k

The tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`) over the DesiDime `/new` and homepage cards, with no per-deal fetch. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and deduped by product id against the live DB. Flipkart candidates were price-checked from ld+json in the browser; Amazon candidates were read in the logged-in Playwright Amazon tab (`#corePriceDisplay` `.a-price-whole`, `#centerCol` M.R.P., `#availability` and add-to-cart). Run at about 20:43–20:50 IST.

**Result: 2 new deals pushed LIVE (#16763 ZEBRONICS Thrum DJ speaker at ₹6,623, #16764 DOZY iron tawa at ₹269). Eight fresh candidates were rejected for price drift. Three dup rows were fixed: #3428 repriced, #15710 had an inflated M.R.P. removed, and #10710 got thousands commas. IndexNow returned HTTP 200 for 8 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards | 35 |
| Junk or other store | 10 |
| Resolved to a product | 24 |
| Dup of a DB row | 7 |
| Recent reject (skipped) | 7 |
| Fresh | 10 |

## Candidates

| Store | Product | Id | Card | Live | Outcome |
|---|---|---|---|---|---|
| Flipkart | Casio watch | WATDQJHFA2ABJADD | ₹1,080 | ₹1,209 | Rejected, drift |
| Flipkart | Samsung washing machine | WMNH7SPNGXDGUKVE | ₹30,600 | ₹39,490 | Rejected, drift |
| Flipkart | Whirlpool fridge | RFRH4ZHTYUXQJXX4 | ₹17,683 | ₹19,690 | Rejected, drift |
| Flipkart | TCL TV | TVSHM44HSJTBQUUF | ₹25,140 | ₹32,990 | Rejected, drift |
| Flipkart | Acer laptop | COMHS3A3YPAQ2GGP | ₹37,640 | ₹39,990 | Rejected, drift |
| Amazon | Krisons Razor-009 projector | B0FRFY488S | ₹4,349 | ₹4,483 | Rejected, drift |
| Amazon | ZEBRONICS Thrum DJ speaker | B0CTH3G1ZX | ₹6,623 | ₹6,623 | **Pushed** |
| Amazon | LG 833L fridge | B0C9DLMK6P | ₹73,290 | ₹77,490 | Rejected, drift |
| Amazon | DOZY iron tawa | B0H2HZDJGT | ₹269 | ₹269 | **Pushed** |
| Amazon | VGRASSP pin board toy | B0CRL2NWS5 | ₹78 | ₹306 | Rejected, drift |

All eight rejects are recorded in `data/dd-rejected.json` (now 2,064 entries).

## Fresh deals

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16763 | ZEBRONICS Thrum 230W party DJ speaker | ₹6,623 | null | — | Amazon `/dp/B0CTH3G1ZX?tag=ashoksachdev-21` |
| 16764 | DOZY iron tawa | ₹269 | ₹699 | 62% | Amazon `/dp/B0H2HZDJGT?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned HTTP 201, `count:2`, both `created:true`, so no slug restore was needed.
- **M.R.P. rule:** the ZEBRONICS PDP lists an M.R.P. of ₹37,999, which would be 83% off. Anything at 80% or more is treated as inflated, so M.R.P. and discount were left null and the title carries no "% Off".
- **Images:** `m.media-amazon.com` 81XkCtxQiBL and 51FGYSHKZtL, from the PDPs.
- **Stock:** both in stock with add-to-cart present.
- **Copy:** original titles and descriptions; every ₹ figure matches the numeric price and M.R.P.

## Dup re-checks

| Id | ASIN | DB | PDP | Action |
|---|---|---|---|---|
| 3428 | B0DX7HFKW1 | ₹467 / ₹990 / 53% | ₹399 / ₹999, in stock | **Synced** to ₹399 / ₹999 / 60%, title and description updated, priceHistory row added |
| 15710 | B09XJ39Z7R | ₹969 / ₹9,698 / 90% | ₹969 / ₹9,698 | **M.R.P. and discount nulled** (90% off is an inflated M.R.P.); "(90% Off)" dropped from the title and the M.R.P. sentence rewritten |
| 10710 | B0FB9HZ7S4 | ₹45,999 / ₹76,999 | ₹45,999 / ₹76,999 | **Formatting fix:** "₹45999", "₹76999" and "₹31000" now carry thousands commas. The card's ₹42,749 is a bank-offer price, so the price stays. |
| 12714 | B0B2PGJHMT | ₹512 / null | ₹512, PDP M.R.P. ₹2,697 (81% off) | No change; M.R.P. stays null |
| 219 | B009319D46 | ₹211 / ₹620 | ₹211 / ₹620 | No change |
| 16756 | B08CDZ3M5K | ₹546 / ₹2,300 / 76% | No price on desktop; the mobile page says "Currently unavailable" with no `priceAmount` | No buy box. Added to the watch list, left LIVE this tick. |
| 10652 | — | EXPIRED | — | Left as is |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs and the 3 fixed dup slugs returned **HTTP 200 for 8 URLs** (5 slugs plus the 3 hub paths).
- **Pages on prod:** ZEBRONICS 200 (0.22s), DOZY 200 (0.15s).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

Run at 20:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,184 = 16,184 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,764 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,762 vs 16,764 | OK. The 2-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 20:50 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today's target is met.

## Still open

- **IFS redirector:** dead at g, h, i and j, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The Fujifilm #10710 comma item is closed by this tick. The next DESIDIME-INGEST run is at about 22:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
