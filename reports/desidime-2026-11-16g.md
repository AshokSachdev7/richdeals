# DESIDIME-INGEST tick — 2026-11-16g

Stage 1 (`ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards, applied the JUNK/GROCERY filters and resolved each `visit.desidime.com` Buy Now to the merchant URL. Amazon candidates were verified on the PDP in the logged-in Playwright tab, and Flipkart candidates through ld+json. Run at about 20:15–20:50 IST.

**Result: 4 deals pushed LIVE (#16708–#16711), `count:4`, all `created:true`. IndexNow HTTP 200 for 7 URLs, and all 4 pages return 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Junk / other filters dropped | 12 |
| Resolved to a single product | 21 |
| Dup vs DB (PS5 #13817, GM Balin #16666) | 2 |
| Rejected in the last 24h | 4 (Klook, Lloyd AC, VIP vest, Dettol Flipkart) |
| Fresh candidates | 15 |
| Verified and pushed | 4 |

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16708 | Amazon | WiseLife Pro Yoga Block, TPE Foam, Pair (B0BFDW76V1) | ₹754 | ₹1,325 | 43% |
| 16709 | Amazon | SIMPARTE Regalia Borosilicate Glass Bowl, 2000 ml (B0C24CG86D) | ₹219 | ₹853 | 74% |
| 16710 | Flipkart | GEONIX Befit UH3 GXUH3 3-Port USB 3.0 Hub, Gray (USGHM4CSK42MHXYQ) | ₹129 | null | — |
| 16711 | Flipkart | JETSYNC 30W GaN Dual Port Mobile Charger, White (ACCHDQ7FD6MBQUZ7) | ₹410 | ₹999 | 59% |

Notes:
- **GEONIX:** the listed M.R.P. of ₹899 implies 86% off, so it was nulled per the ≥80% rule. Title and copy carry no M.R.P. or discount.
- **Copy facts** come from the PDP spec tables only (GEONIX: 3 ports, USB 3.0 up to 5 Gbps, 15 g ABS; JETSYNC: 30 W, 3 A, Type-C + Type-A, overcurrent protection).
- **SIMPARTE image:** the PDP has no hiRes, so the `large` image (522 px) on `m.media-amazon.com` is used.
- **Flipkart images:** `rukminim2` host rather than the ld+json `rukmini1` host.
- **Affiliate links:** Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`.
- Every ₹ figure in the title and copy matches the price or M.R.P. (pre-flight check in the build script).

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 13817 | Sony PS5 (B0CY5QW186) | ₹64,990 | ₹64,990 | None. The card's ₹61,441 is not the live price. |
| 16666 | GM Balin (B0FM8D7C1Z) | ₹5,499 / ₹12,490 | ₹5,499 / ₹12,490, "Only 2 left in stock" | None. The card's ₹4,948 is a bank-offer price. |

## Rejected / skipped

- **Amazon PDP drift:**
  - DSGN skins B0F4DMG1VQ / B0F4DLHYJX / B0F4DS3TMH: ₹279 on the PDP vs ₹62 / ₹59 / ₹55 on the cards.
  - STAEDTLER B084PTTPQL: ₹1,725 vs ₹563.
  - Crompton FlameStar stove B0F3J89F8L: ₹2,941 vs ₹2,646 (second tick in a row).
- **Flipkart drift:** Samsung fridge RFRHZQQ9U6U2DXFX (flagged in stage 1).
- **No buy box:** ZEORGIA B0F4DQHKDQ.
- **Low-ticket FMCG:** Aqueria shampoo B0HM87GFP5, Dr. Rashel soap B0H6F8X6ZW.
- **No ld+json / not a product:** Boat sale page, Ajio Yousta beanie.

The rejected ids were added to `data/dd-rejected.json` (2,032 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 4 slugs (plus 3 hub URLs) returned **HTTP 200 for 7 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.41s) |
| /offers | 200 (0.20s) |
| /blog | 200 (0.67s) |
| /sitemap.xml | 200 (0.20s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.61s) |
| 4 new deal pages | 200 each (0.19–0.32s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,131 = 16,131 | OK (16,127 + 4) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,711 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,707 vs 16,711 | OK. The 4 new deals are queued for the external broadcast cron. |
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
  - #16666 (B0FM8D7C1Z, GM Balin, "Only 2 left")
  - #10311 (B0GS675WDR, CELLO cooler)
- **#16224 slug:** still says "steel-insulated-tiffin-box" for a plastic lunch box. Kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at 22:43 IST. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
