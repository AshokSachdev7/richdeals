# DESIDIME-INGEST tick — 2026-11-16f

Stage 1 (`ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards, applied the JUNK/GROCERY filters and resolved each `visit.desidime.com` Buy Now to the merchant URL. Amazon candidates were verified on the PDP in the logged-in Playwright tab, and Flipkart candidates through ld+json. Run at about 18:40–19:00 IST.

**Result: 7 deals pushed LIVE (#16699–#16705), `count:7`, all `created:true`. IndexNow HTTP 200 for 10 URLs, and all 7 pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Junk / other filters dropped | 14 |
| Resolved to a single product | 19 |
| Dup vs DB (GM Balin) | 1 |
| Rejected in the last 24h | 4 (Klook, Lloyd AC, VIP vest, Dettol Flipkart) |
| Fresh candidates | 14 |
| Verified and pushed | 7 |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16699 | Amazon | Bajaj Frore Neo 400mm Wall Mount Fan, White (B0C85NW22W) | ₹2,579 | ₹4,290 | 40% |
| 16700 | Amazon | AQUA D PURE 4-in-1 Copper RO Water Purifier (B0BJ6P3LSK) | ₹5,246 | ₹24,999 | 79% |
| 16701 | Amazon | Imsa Moda Lightly Padded Bra, Pack of 3 (B0H1HKDN7D) | ₹299 | ₹999 | 70% |
| 16702 | Amazon | Acer Nitro Phantom HX5 Wired Gaming Headset (B0H6629LXR) | ₹1,293 | ₹3,999 | 68% |
| 16703 | Amazon | SooPii Selfie Stick Tripod with Fill Light (B0DW8P8SLZ) | ₹212 | null | — |
| 16704 | Flipkart | Jenix 360° PIR Motion Sensor Switch (SSWG8VCQYSFHHXSS) | ₹599 | ₹2,299 | 74% |
| 16705 | Flipkart | NOVA NBT-2311 700W Pop Up Toaster (PUTHZHSMGQMYXGZ4) | ₹1,269 | ₹2,299 | 45% |

Notes:
- **SooPii:** the listed M.R.P. of ₹1,999 implies 89% off, so it was nulled per the ≥80% rule. Title and copy carry no M.R.P. or discount.
- **AQUA RO:** the copy states that installation is paid to the technician (up to Rs. 499).
- **Imsa Moda:** the copy states that the price varies by size.
- **Flipkart images:** use the `rukminim2` host (200 verified) rather than the `rukmini1` host from the card.
- **Affiliate links:** Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`.
- Every ₹ figure in the title and copy matches the price or M.R.P. (pre-flight check in the build script).

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 16666 | GM Balin (B0FM8D7C1Z) | ₹5,499 / ₹12,490 | ₹5,499 / ₹12,490, "Only 1 left in stock" | None. The card's ₹4,948 is a bank-offer price. |

## Rejected / skipped

- **Non-product pages:** Ajio `/b/tom-hiddle` (brand page) and Amazon `/clp/B0H4B5RC1R` (wall-hooks listing).
- **No ld+json:** Hamaramall Denver EDP; Volotu ScalaHosting (also a sale, not a product).
- **Flipkart drift:**
  - Philips smart bulb LLSHN7ZYDFEYSGTP: card ₹569 vs live ₹599.
  - Qubo lock SLOGZ4MNB2UW442R: card ₹11,490 vs live ₹12,490.
- **Amazon PDP drift:**
  - Havells Adonia Spin+ B0HBPQN3LH: ₹10,993 vs card ₹9,394 (coupon-dependent).
  - Samsung soundbar B0FCYL4FSP: ₹21,240 vs ₹19,740.
  - Crompton FlameStar stove B0F3J89F8L: ₹2,941 vs ₹2,646.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 7 slugs (plus 3 hub URLs) returned **HTTP 200 for 10 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design, so new deals enter it only if they rank there.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.29s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.58s) |
| 7 new deal pages | 200 each |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,125 = 16,125 | OK (16,118 + 7) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,705 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,698 vs 16,705 | OK. The 7 new deals are queued for the external broadcast cron. |
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

The next DESIDIME-INGEST run is at 20:43 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
