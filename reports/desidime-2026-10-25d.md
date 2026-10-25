# DesiDime ingest — 2026-10-25d (16:26 IST)

## Stage 1

- The script read 31 cards and dropped 9 as junk or other-store links: an app promo, a Flipkart LiveShop page, a Goibibo bus coupon and similar.
- 16 cards resolved to a product. 3 of those were already in the DB, which left **13 fresh candidates**.

## Pushed LIVE: 1 (#14773), bulk count 1, created:true

| # | Product | ASIN | Card | PDP | MRP |
|---|---------|------|------|-----|-----|
| 14773 | Japanese BAM joint pain relief gel, glucosamine + menthol, 100g | B0HN4X4ZGX | ₹99 | ₹99 | — |

- In stock, add-to-cart button present, no captcha.
- The PDP lists M.R.P. as ₹99, equal to the price, so MRP was set to null. The card's ₹699 MRP was not real.
- The link uses `?tag=ashoksachdev-21`. The copy is original, with no medical claims.

## Rejected: 12

### Amazon price drift (verified in the logged-in tab)

Card prices are mostly post-bank-offer prices.

| ASIN | Product | Card | PDP |
|------|---------|------|-----|
| B0GGBQKW9C | LUHI kids' wardrobe | ₹3,420 | ₹3,799 |
| B0G5MW6YND | Green Invicta e-scooter | ₹56,749 | ₹59,999 |
| B0C596LYX7 | Giordano men's watch | ₹3,826 | ₹4,620 |
| B0CZTGRS2S | WHP 1g gold Lakshmi pendant | ₹14,369 | ₹15,800 |
| B0FQPL8TJC | Florance flip mattress, double | ₹4,140 | ₹4,599 |
| B0HGQDFL1H | Acer Aspire 3 Core Ultra 5 | ₹58,490 | ₹62,990 |
| B0GMD5NPX6 | Godrej 1.5T 3★ inverter AC | ₹28,490 | ₹31,490 |
| B0GK9NHCL2 | VW 65" QLED Google TV | ₹36,499 | ₹41,999 |

- The four blank `.a-price-whole` reads in `#corePriceDisplay` were re-read from `#centerCol` / `.a-price-whole`.

### Other stores

- **Flipkart LG MR50 32" monitor:** card ₹11,069, ld+json price ₹12,499.
- **Flipkart LG Smart AI 32" monitor:** card ₹15,314, ld+json price ₹16,999.
- **Shopsy Cantus storage trolley ₹277:** the page returns 503 to curl, to an in-tab fetch and to a full navigation, so the price could not be verified.
- **Digihaat litchi drink ₹15:** a perishable grocery item with no ld+json.

## Freshness

- `indexnow-ping.mjs` was run on 1 slug (4 urls) and returned **HTTP 200**.
- The #14773 page returns 200 on prod.

## CEO audit (16:26 IST)

- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all return 200.
- Live deals: 14,243. Null price: 0. Null image: 0. PENDING_REVIEW: 0. Coverless or seo-less posts: 0.
- Posts today (IST): 1. CONTENT-SEO runs at 18:39 and should bring it to 2.
- Broadcast cursor: 14772 vs a DB max of 14773. That is the new row, which the external cron will pick up.
- `master` matches `origin/master` before this commit.
