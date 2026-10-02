# DESIDIME-INGEST — 2026-10-02 (22:45 IST)

**33 cards found → 15 resolved to a product → 4 already in DB → 11 fresh → 2 pushed LIVE (Amazon). Bulk count 2, created 2/2. IndexNow HTTP 200 for 5 urls. Both new deal pages return 200.**

## Pushed

Checked on the Amazon product page in the logged-in Playwright tab: `#centerCol` price matched the card, "In stock", add-to-cart button present, no "Only N left".

| ASIN | Deal | Price | MRP | Rating |
|---|---|---|---|---|
| B0DP9BSFR5 | Lifelong vacuum insulated tumbler, 1200 ml, with straw | ₹712 | ₹2,499 | 3.7 (285) |
| B0BGY52ZF4 | Fujifilm instax Square Link smartphone photo printer, white | ₹10,999 | ₹20,999 | 4.7 (1,020) |

- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`. The `desidime01-21` tag was stripped.
- **Image:** m.media-amazon.com.
- **Copy:** original, built only from the product page's feature bullets. The instax copy points out that it uses SQUARE film, not Mini.

## Rejected (9)

| Item | Reason |
|---|---|
| Tukzer 20W GaN charger B0GN9H978C | No ratings |
| 3-in-1 toilet brush B0H49QBZ9Y | Rated 2.4 (15) |
| Luminous Edge Go 1500 B0DZ15Q48B | Product page ₹68,087 vs card ₹65,837; also only 1 rating |
| Dandiya sticks B0HK8NW97V | No ratings |
| Xiaomi 17 12/512 B0GMQWZ6ZM | Product page ₹89,999 vs card ₹59,999 |
| HP X Entry 32 L backpack (Flipkart) | ld+json ₹398 vs card ₹324 |
| HF badminton racket (Shopsy) | Price drift (flagged by the script) |
| Bajra 1 kg (Digihaat) | Food; no ld+json |
| JioMart Mak chargers & cables | Category post, not a single product |

The other 18 cards were dropped in stage 1: junk, promos, or non-product links. Another 4 cards resolved to products already in the DB.

## CEO audit (22:45 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,925 (+2) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 358; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 3 (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,404 / 12,402. The only gap is this batch. |
| Unpushed commits | 0 before this report |

No rot found.
