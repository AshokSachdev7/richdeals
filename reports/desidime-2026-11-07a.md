# DESIDIME tick 2026-11-07a (IST ~00:59)

**Result: 4 deals pushed LIVE (#16183-#16186). BULK 201, count 4, all created:true. IndexNow HTTP 200 (7 urls). All 4 deal URLs serve 200 on prod.**

## Stage 1 (`ingest-desidime.mjs`)

38 cards discovered → 15 resolved → 2 already in DB → 13 fresh candidates.

## Pushed

| id | ASIN | Price / MRP | Slug |
|---|---|---|---|
| 16183 | B07QFR6F7X | ₹314 / ₹1,000 | lifelong-battery-operated-nose-and-ear-hair-trimmer-for-men-b07qfr6f7x |
| 16184 | B0FB8XHSL3 | ₹1,999 / ₹5,299 | crompton-ameo-fresh-premium-nutri-blender-and-smoothie-maker-b0fb8xhsl3 |
| 16185 | B0DP2KNJTB | ₹89 / ₹499 | 8-piece-silicone-luggage-wheel-covers-for-suitcases-black-b0dp2knjtb |
| 16186 | B07BP1P1PT | ₹4,285 / ₹11,628 | stanley-stht77499-1-cubix-green-beam-cross-line-laser-level-b07bp1p1pt |

Prices were verified on the PDP in the logged-in Playwright tab (#centerCol / .a-price-whole, add-to-cart present). Links use `?tag=ashoksachdev-21`. Dedup came back all FRESH, so no price-sync was needed.

## Rejected (13 Amazon, logged to dd-rejected)

Price drift, card vs PDP:

| ASIN | Card | PDP |
|---|---|---|
| B0GXZPXSVG | 1,339 | 4,883 |
| B0GPDC3F9Z | 8,080 | 13,978 |
| B0GMG7B9G8 | 31,249 | 43,999 |
| B0DZHNQJQW | 15,291 | 19,990 (coupon) |
| B0HHR9V9SJ | 19,999 | 32,499 |
| B0H3ZG11ZV | 103,990 | 124,990 |
| B0H8P895HL | 55,240 | 62,990 |
| B0GJ5S6MWM | 3,231 | 3,590 |
| B0CY2P2CW4 | 4,135 | 4,872 |
| B0HDTPQDRJ | 29,740 | 34,990 |
| B07WXRR2VH | 28,500 | 34,999 (iQOO Z11x) |

Unavailable (no price, no add-to-cart): B0BRNGSH13 Portronics, B0986XJRNV Nilkamal.

Rejected in triage:
- Gits ₹9 (grocery)
- Gyftr (gift card)
- Klook and Dellstore (hub pages)
- Flipkart FNDHBS6JQRBZEYAP
- Flipkart POCO X8 Pro MOBHMGG5QFZXHVAH (drift)

Skipped (no ld+json): Jiomart Hammer ₹299, Bigbasket Jaypee ₹399, Zepto Philips ₹9.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (/, /offers, /blog, sitemap, feed, /api/deals, llms.txt) | 7/7 200, plus 4 new deal URLs 200 | OK |
| API total vs DB LIVE | 15,620 = 15,620 | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| Max deal id | 16,186 | OK |
| Posts total / coverless / seo-less | 470 / 0 / 0 | OK |
| Posts per IST day | 10-29:4 10-30:4 10-31:4 11-01:1 11-03:4 11-04:2 11-05:3 11-06:3 11-07:3 | OK (11-02 = 0, historical) |
| Unpushed commits | 0 (before this report) | OK |
| Crons | 9/9 (CronList) | OK |

## Still open

- **TG 11-04l:** B0GXB76VRW duplicates #4983, which is LIVE at ₹29,750. The channel's ₹25,175 is the price after coupon + HDFC.
  - Still unchecked: Vyom ×2 / ×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- **IFS 11-04k:** 79 candidates have never been checked.
- **INDEXNOW helper:** filters on `createdAt` instead of `postedAt`, and has a stray `publishedAt` OR clause.
- **Price drift:**
  - #11896: Flipkart shows ₹664, DB has ₹899.
  - 16 bare Flipkart links.
  - 96 drift rows.
  - Single deals still to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **Outside this tick:** Reticle MCP is CONNECTION_CLOSED. Rotating the DO token is the owner's job.
- The DESIDIME leftovers from content-seo 11-07a are resolved this tick.
