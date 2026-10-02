# DESIDIME-INGEST — 2026-10-02 (12:48 IST)

**36 cards found → 16 resolved to a product → 5 already in DB → 11 fresh → 4 pushed LIVE (all Amazon). Bulk count 4, created 4/4. IndexNow HTTP 200 for 7 urls. All 4 new deal pages return 200.**

## Pushed

Each item was checked on its Amazon product page in the logged-in Playwright tab. Price matched the DesiDime card within ₹1, the item was "In stock", and the add-to-cart button was present.

| ASIN | Deal | Price | MRP | Rating |
|---|---|---|---|---|
| B0GTQZG1Y2 | Spyder Craft Specio study table with storage shelf | ₹1,754 | ₹12,999 | 3.6 (304) |
| B0G536GC1R | MILTON Eros 1000 sip/gulp bottle, 960 ml | ₹349 | ₹860 | 4.4 (57) |
| B0F9YV7T5D | Lifelong Cuppy press-and-go toy cars, pack of 3 | ₹323.65 | ₹2,999 | 4.2 (9) |
| B0DHCD42ZJ | EVteQ 10-port PoE switch (8 PoE + 2 uplink) | ₹1,749 | ₹5,000 | 4.4 (9) |

- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag and `ascsubtag` were stripped.
- **Images:** m.media-amazon.com.
- **Copy:** original.

## Rejected (7)

| Item | Reason |
|---|---|
| Apsara guava ice cream tub (Instamart) | Food, and no ld+json |
| DeoDap toilet brush set (Myntra) | Out of stock |
| Energizer LED torch B016C4ZFCU | No add-to-cart and no price on the product page |
| Panasonic 5 W downlighter B0F3XJC7K1 | Only 4 ratings |
| Ionix tap water filter B0D2WHDR9X | Rated 2.5 (3 ratings) |
| FRONTECH MS-0058G mouse B0FDQNZD7Q | Only 5 ratings |
| TCL 1.5 ton AC B0H4M1WHYV | Product page shows no price and no rating; the price exists only on the card |

The other 20 cards were dropped in stage 1: junk, app or bank promos, or non-product links such as a Hisense AC on a Flipkart non-`/p/` URL and a Play Store link.

## CEO audit (12:48 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,848 (+4) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,326 / 12,298. The external tg-broadcast cron is draining the gap (it moved 12,293 → 12,298 in 5 minutes). |
| Unpushed commits | 0 before this report |

No rot found.
