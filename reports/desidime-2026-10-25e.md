# DesiDime ingest — 2026-10-25e (18:25 IST)

## Stage 1

`ingest-desidime.mjs` read 34 cards. 17 resolved to a single product, 4 were already in the DB, which left **13 fresh candidates** (11 Amazon, 2 Bigbasket).

## Pushed LIVE: 1 (#14800), bulk count 1, created:true

| # | Product | ASIN | Card | PDP | MRP |
|---|---------|------|------|-----|-----|
| 14800 | FLYNGO clear PVC makeup pouch, set of 3, light blue | B09ZF29BF3 | ₹269 | ₹269 | ₹1,199 (78% off) |

- In stock, add-to-cart button present, no captcha.
- The image `61mIXSdeJ-L` is the MAIN image of the "Set of 3 Light Blue" variant in `colorImages`, which matches `landingAsinColor`.
- The link uses `?tag=ashoksachdev-21`. The copy is original.

## Rejected: 12

### Amazon price drift (logged-in tab)

| ASIN | Product | Card | PDP |
|------|---------|------|-----|
| B0FDQL1J98 | Samsung Galaxy Watch8 Classic 46mm | ₹21,749 | ₹24,999 |
| B09Q3FQDVQ | IZOM 20V cordless drill kit | ₹2,453 | ₹2,814 |
| B0D8JH87DX | Bajaj Pulsar N250 (ex-showroom) | ₹1,28,237 | ₹1,44,214 |
| B0H8PBSZMY | Khaitan Volt 5.5L instant geyser | ₹3,158 | ₹3,508 |
| B0GGBQKW9C | LUHI kids' wardrobe | ₹3,420 | ₹3,799 |
| B0CZTGRS2S | WHP 1g gold Lakshmi pendant | ₹14,369 | ₹15,800 |
| B0HGQDFL1H | Acer Aspire 3 Core Ultra 5 | ₹58,490 | ₹62,990 |
| B0GMD5NPX6 | Godrej 1.5T 3★ inverter AC | ₹28,490 | ₹31,490 |
| B0GK9NHCL2 | VW 65" QLED Google TV | ₹36,499 | ₹41,999 |

The last five were also rejected in 10-25d at the same PDP prices. The card prices are post-bank-offer prices.

### Other

- **B0FD3S6NF8 Garnier Hairlighter ₹143:** temporarily out of stock, no add-to-cart button.
- **Bigbasket Kent 4L air fryer ₹1,899:** no ld+json, and Bigbasket prices are location-locked, so it could not be verified.
- **Bigbasket LG hing 50g ₹77:** low-ticket grocery item with no ld+json.

## Freshness

- `indexnow-ping.mjs` was run on 1 slug (4 urls) and returned **HTTP 200**.
- The #14800 page returns 200 on prod.

## CEO audit (18:25 IST)

- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all return 200.
- Live deals: 14,270. Null price: 0. Null image: 0. PENDING_REVIEW: 0. Coverless or seo-less posts: 0.
- Posts today (IST): 1. CONTENT-SEO runs at 18:39 and should bring it to 2.
- Broadcast cursor: 14799 vs a DB max of 14800. That is the new row, which the external cron will pick up.
- `master` matches `origin/master` before this commit.
