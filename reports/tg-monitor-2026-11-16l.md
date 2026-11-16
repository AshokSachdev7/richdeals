# TELEGRAM-DEAL-MONITOR tick — 2026-11-16l

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). It resolved the shortlinks, deduped against `data/tg-multi-seen.json` and the live DB, and verified each price on the Amazon PDP in the logged-in tab. Run at about 20:40–21:40 IST.

**Result: 2 deals pushed LIVE (#16712, #16713), `count:2`, both `created:true`. IndexNow HTTP 200 for 5 URLs, and both pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Product | Id | Outcome |
|---|---|---|
| Amazon Brand Symbol hooded quilted bomber jacket | B0CBKNF45G | Pushed (#16712) |
| VIP men's cotton sleeveless vest, pack of 4 | B09Y8DT2K1 | Pushed (#16713) |
| Maybelline eyeliner | B07S141T2R | Already seen; LIVE #16707, PDP matches DB |
| Longway Kratos juicer | B0C59GVND2 | Already seen; LIVE #16303, PDP matches DB |
| Earth Store milk frother | B0FYNR8NR7 | Already seen; LIVE #16706, PDP ₹109 matches DB |
| Skechers MI jersey (Myntra) | 40502682 | Already seen; LIVE #8564 |
| Agarbatti (Flipkart) | XISHHYQXHGYTFVSM | Already seen; LIVE #16615 |
| Parachute body lotion | B00CBRJ34E | Already seen; LIVE #4605 |
| Aqueria shampoo 875 ml | B0HM87GFP5 | Skipped |
| MKE socks (Shopsy) | OCKGR5ZQGJY493V6 | Skipped |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16712 | Amazon | Amazon Brand - Symbol Men's Hooded Quilted Bomber Jacket, Black (B0CBKNF45G) | ₹1,199 | ₹3,799 | 68% |
| 16713 | Amazon | VIP Men's Cotton Sleeveless Vest, White, Pack of 4 (B09Y8DT2K1) | ₹359 | ₹640 | 44% |

Notes:
- **PDP checks:** both were in stock, with the add-to-cart button present. The jacket's default size was XL and the vest's was L. Copy for both states that the price varies by size.
- **Vest pack size:** pack of 4, confirmed from the per-unit price (₹89.75 × 4 = ₹359).
- **Images:**
  - Both come from `m.media-amazon.com` hiRes and return 200 image/jpeg.
  - The jacket image is keyed to the landing colour "Black", not the first colorImages key, which was "Jet Black1".
- **Affiliate links:** `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.
- **Pre-flight check:** every ₹ figure in the title and copy matches the price or M.R.P.
- **Push target:** went through the local API (`localhost:4000`). A direct POST to the prod `/api/admin/deals/bulk` returned 401 with the local `.env` key.

## Rejected / skipped

- **B0HM87GFP5, Aqueria shampoo:** low-ticket FMCG, and the ₹1,499 M.R.P. implies 89% off at ₹169.
- **OCKGR5ZQGJY493V6, MKE socks on Shopsy:** low-ticket.
- **The Derma Co (ONLINE SHOPPING DEALS):** skincare FMCG.
- **SB Loots multi-link posts:** Roadster jeans and the Tokyo Talkies category.

All four new ids were added to `data/tg-multi-seen.json` (now 5,211 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 2 slugs (plus 3 hub URLs) returned **HTTP 200 for 5 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.41s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.59s) |
| /amazon-brand-symbol-hooded-quilted-bomber-jacket-men-black-b0cbknf45g | 200 (0.22s) |
| /vip-men-cotton-sleeveless-vest-white-pack-of-4-b09y8dt2k1 | 200 (0.18s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,133 = 16,133 | OK (16,131 + 2) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,713 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,711 vs 16,713 | OK. The 2 new deals are queued for the external broadcast cron. |
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

The next TELEGRAM-DEAL-MONITOR run is at 22:03 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
