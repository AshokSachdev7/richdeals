# TELEGRAM-DEAL-MONITOR tick — 2026-11-16k

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). It resolved the shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and verified each price on the Amazon PDP in the logged-in tab. Run at about 20:00 IST.

**Result: 1 deal pushed LIVE (#16707), `count:1`, `created:true`. IndexNow HTTP 200 for 4 URLs, and the page returns 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Resolves to | Outcome |
|---|---|---|---|
| SB Loots | amazn.lt/m9zE2PG9 | B07S141T2R | Pushed (#16707) |
| Dealzone | Armani Exchange watch ₹8,269 (link.amazon/B0154h7cl) | B0CHXTV16D | Rejected (currently unavailable) |
| INDIAN CHEAP DEALS | LG washing machine (link.amazon/B08FsUNwo) | B0DPHTSTYJ | Dup of LIVE #5035; PDP matches DB |
| CoolzTricks | Anjeer 1 kg ₹399 | — | Skipped (grocery, dry fruit) |
| Dealdost | Eureka Forbes Aeroguard (fkrt.it) | APFHR9VZEUZEJZJV | Already seen |
| ONLINE SHOPPING DEALS | Teacurry ₹398 | B09JK1BBKZ | Already seen |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16707 | Amazon | Maybelline New York Colossal Bold Eyeliner, Black (B07S141T2R) | ₹99 | ₹319 | 69% |

Notes:
- **PDP:** `.a-price-whole` reads ₹99 and the M.R.P. is ₹319. It is in stock with an add-to-cart button, sold through the Maybelline store, as a 1-count pack.
- **Image:** `m.media-amazon.com` `413yzxupVTL`. It is the `#landingImage` hiRes and equals `colorImages.initial[0]`.
- **Affiliate link:** `https://www.amazon.in/dp/B07S141T2R?tag=ashoksachdev-21`. The source tag `bhavesh015-21` was stripped.
- Every ₹ figure in the title and copy matches the price or M.R.P. (pre-flight check in the build script).

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 5035 | LG 8 kg top load T80VBMB4Z (B0DPHTSTYJ) | ₹20,990 / ₹28,990 | ₹20,990 / ₹28,990, in stock | None |

## Rejected / skipped

- **B0CHXTV16D, Armani Exchange Two Tone Watch AX1956:** `#availability` reads "Currently unavailable" and there is no add-to-cart button, so there is no live price. The post's link pinned a single seller (`smid`), and that offer is gone.
- **Category, loot or non-product posts:**
  - NonStopDeals Caprese handbags ("upto 90% off");
  - Hidden Loot and IFS Tips Swiggy Dineout;
  - Rogerkart (photo only).
- **Quiet groups:** Deal Dibba, OMG LOOTDEALS and Loot Deals 24x7 had no new posts high enough in the sidebar to read.

Both new ASINs were added to `data/tg-multi-seen.json` (now 5,207 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 1 slug (plus 3 hub URLs) returned **HTTP 200 for 4 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.34s) |
| /offers | 200 (0.20s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.19s) |
| /feed.xml | 200 (0.22s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.68s) |
| /maybelline-new-york-colossal-bold-eyeliner-black-b07s141t2r | 200 (0.20s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,127 = 16,127 | OK (16,126 + 1) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,707 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,706 vs 16,707 | OK. The new deal is queued for the external broadcast cron. |
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

The next TELEGRAM-DEAL-MONITOR run is at 21:03 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
