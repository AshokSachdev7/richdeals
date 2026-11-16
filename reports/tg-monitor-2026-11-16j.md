# TELEGRAM-DEAL-MONITOR tick — 2026-11-16j

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). It resolved the shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and verified each price on the Amazon PDP in the logged-in tab. Run at about 19:00 IST.

**Result: 1 deal pushed LIVE (#16706), `count:1`, `created:true`. IndexNow HTTP 200 for 4 URLs, and the page returns 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Resolves to | Outcome |
|---|---|---|---|
| SB Loots | amazn.lt/JVInUoRq | B0FYNR8NR7 | Pushed (#16706) |
| SB Loots | amazn.lt/T6o692yZ | B0FC2W7BG4 | Skipped (low-ticket FMCG) |
| SB Loots | amazn.lt/KHIAcoym | B0DSG6SRJ4 | Rejected (no buy box) |
| Dealzone | link.amazon/B0j9Y9JYi | B0CYLDQ1D3 | Already seen |
| ONLINE SHOPPING DEALS | Teacurry ₹398 | B09JK1BBKZ | Already seen |
| Dealdost | Eureka Forbes Aeroguard (fkrt.it) | APFHR9VZEUZEJZJV | Already seen |
| INDIAN CHEAP DEALS | LG 8 kg top load | B0DPHTSTYJ | Dup of LIVE #5035; PDP matches DB |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16706 | Amazon | The Earth Store Swifther Handheld Milk Frother (B0FYNR8NR7) | ₹109 | null | — |

Notes:
- **M.R.P. nulled:** the listed M.R.P. of ₹10,900 implies 99% off, so it was dropped per the ≥80% rule. Title and copy carry no M.R.P. or discount.
- **Copy:** states that it runs on 2 AA batteries that are not included, and that the colour is assorted and ships as available.
- **Image:** `m.media-amazon.com` hiRes keyed by `landingAsinColor` ("Assorted").
- **Affiliate link:** `https://www.amazon.in/dp/B0FYNR8NR7?tag=ashoksachdev-21`.
- Every ₹ figure in the title and copy matches the price (pre-flight check in the build script).

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 5035 | LG 8 kg top load T80VBMB4Z (B0DPHTSTYJ) | ₹20,990 / ₹28,990 | ₹20,990 / ₹28,990, in stock | None |

## Rejected / skipped

- **B0FC2W7BG4, Kellogg's Multigrain plus Corn Flakes 450 g:** ₹134 verified, but it is low-ticket FMCG (cereal). Skipped under the same norm as the DesiDime GROCERY filter, since prices swing daily.
- **B0DSG6SRJ4, Bajaj Celesta 9W LED Deep Downlight:** no buy box and no add-to-cart, so no live price.
- **Category, loot or non-product posts:**
  - CoolzTricks sweatshirts;
  - NonStopDeals Caprese handbags;
  - Hidden Loot and IFS Tips Swiggy Dineout;
  - SB Loots cookies multi-link;
  - SB Loots Ajio women's T-shirts category;
  - Rogerkart (photo only).

All three new ASINs were added to `data/tg-multi-seen.json` (now 5,205 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 1 slug (plus 3 hub URLs) returned **HTTP 200 for 4 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.27s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.66s) |
| /the-earth-store-swifther-handheld-milk-frother-b0fynr8nr7 | 200 (0.18s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,126 | OK (16,125 + 1) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,706 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,705 vs 16,706 | OK. The new deal is queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4.

## Still open

- **IFS source blocked:** every `?rto=` redirects home.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - #16682 (B0FXVPK6R7)
  - #16666 (B0FM8D7C1Z, GM Balin, "Only 1 left")
  - #10311 (B0GS675WDR, CELLO cooler)
- **#16224 slug:** still says "steel-insulated-tiffin-box" for a plastic lunch box. Kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at 20:37 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
