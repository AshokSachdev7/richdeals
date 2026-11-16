# DESIDIME-INGEST tick — 2026-11-17b

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards without fetching any per-deal page. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. The tick then read every Amazon candidate and every reposted duplicate on the PDP in the logged-in Playwright tab. Run at about 02:40–02:50 IST.

**Result: 0 pushed. All 4 fresh candidates failed for quality reasons (price drift, low-ticket FMCG, grocery). The 3 reposted duplicates were re-read and none needed a price change. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Junk or other dropped | 19 |
| Resolved to a single product | 14 |
| Already in DB | 5 |
| Rejected within the last 24 h | 5 |
| Fresh candidates | 4 |

Dropped by stage 1: Amazon FunZone men's-day promo, which resolved to a `/b?node=` category page.

Skipped because they were rejected within the last 24 h: Klook, Crompton B0F3J89F8L, Lloyd ACNHMRG29GVDTDXD, VIP B09YV753WH, Dettol CBKHEPQZ8ARJZHGG.

## Rejected

| Id | Product | Card | PDP | Reason |
|---|---|---|---|---|
| B01D8DAYBA | WINIX 5300 air purifier | ₹11,200 | ₹13,999 / ₹23,990, in stock | Price drift. The card is likely a bank-offer price. |
| B0GWS73DY2 | Amazon Brand Presto! rose handwash, 5 L | ₹278 | — | Low-ticket household FMCG |
| B079HWW3NM | Set Wet Casually Cool hair gel | ₹112 | — | Low-ticket FMCG |
| Zepto 39c6f2d737b0 | Vimal groundnut oil, 5 L | ₹875 | no ld+json | Grocery; stage 1 already recorded it |

The WINIX, Presto and Set Wet ids were also rejected in tick 11-17a, but they were never written to `data/dd-rejected.json`, so they came back. They are now recorded there (2,038 entries) and will be skipped for 24 h.

## Dup re-checks (reposted on DesiDime)

| Id | Product | Card | PDP | Action |
|---|---|---|---|---|
| 16722 | F Gear Polaris 37L backpack (B0GYHMBXWF) | ₹385 | ₹780 / ₹1,560, "Only 1 left", add-to-cart present | None. The DB already holds ₹780. The ₹385 is a clip coupon or an ended price drop. |
| 14424 | HP 460 keyboard (B0CNCQM7X1) | ₹813 | Still no buy box: no price and no add-to-cart button | None. Stays on the no-buy-box watch list. |

Homeor (#16720), GOBOULT (#16721) and Dabur (#1411) were verified in tick 11-17a, about two hours earlier, and were not re-read.

## Freshness

Not run, because 0 deals were pushed.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.31s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.79s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.57s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (8 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311, #16722.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at 04:43 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
