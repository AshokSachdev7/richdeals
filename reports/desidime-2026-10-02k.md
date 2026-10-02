# DESIDIME-INGEST — 2026-10-02 (20:46 IST)

**30 cards found. 15 dropped in stage 1 (junk or non-store). 12 resolved to a product; 2 were already in the DB, leaving 10 fresh. 1 pushed LIVE. Bulk count 1, created 1/1. IndexNow HTTP 200 for 4 urls. New deal page returns 200.**

## Pushed

Verified on the Amazon product page in the logged-in Playwright tab. The `#centerCol` price shows ₹289; `#availability` says "In stock"; the add-to-cart button is present; no "Only N left" warning.

| ASIN | Deal | Price | MRP | Rating |
|---|---|---|---|---|
| B08HPDWMDV | Lexton star curtain light, 12 stars, warm white | ₹289 | ₹999 | 4.1 (5,004) |

- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`. The `desidime01-21` tag was stripped.
- **Image:** m.media-amazon.com.
- **Copy:** original. Facts come from the product title and bullets only. The warranty is left out because the listing contradicts itself (3 months in one bullet, 6 in another).

## Rejected (9)

| Item | Reason |
|---|---|
| Hex 4-tier wooden shoe rack B0DZW5W347 (Amazon) | Only 2 ratings |
| IAFA Ergolux office chair (JioMart) | Product page ld+json has an empty price and 0 ratings |
| MADRIC microfiber cloth roll (JioMart) | Product page ld+json has an empty price and 0 ratings |
| BPL 1.2 L kettle (JioMart) | Visible price matches (₹699), but ld+json shows 0 ratings |
| LEXCORP 70 L duffel (Store1/JCP) | No ld+json, so the price can't be verified |
| Adaazel 45 L bag (Store1/JCP) | No ld+json, so the price can't be verified |
| Mak chargers & cables (Store1) | `/l/` listing link, not a single product |
| Bajra 1 kg (Digihaat) | Food |
| Black pepper powder (Digihaat) | Food |

## CEO audit (20:46 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,923 (+1) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 358; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 3 (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,401 / 12,400. The cursor moved from 12,398 to 12,400, so the external cron is running. |
| Unpushed commits | 0 before this report |

No rot found.
