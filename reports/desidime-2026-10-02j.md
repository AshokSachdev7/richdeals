# DESIDIME-INGEST — 2026-10-02 (18:46 IST)

**27 cards found → 10 resolved to a product → 2 already in DB → 8 fresh → 1 pushed LIVE (Amazon). Bulk count 1, created 1/1. IndexNow HTTP 200 for 4 urls. New deal page returns 200.**

## Pushed

Checked on the Amazon product page in the logged-in Playwright tab: `#centerCol` price, "In stock", and the add-to-cart button present.

| ASIN | Deal | Price | MRP | Rating |
|---|---|---|---|---|
| B07TKYR188 | Amazon Brand Symbol women's cotton-blend cropped sweatshirt | ₹249 | ₹1,499 | 3.9 (447) |

- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was stripped.
- **Image:** m.media-amazon.com.
- **Copy:** original.

## Rejected (7)

| Item | Reason |
|---|---|
| Lenovo V15 i3-1315U 8GB/512GB laptop B0HCJ85WGY | Product page matches the ₹65,999 card, but the ₹1,50,000 MRP is inflated. The "56% off" claim would mislead, and the price is above the street price for this spec. |
| Haier Smart Choice 12 kg front-load washer B0FCSGSSSB | Still ₹50,090 on the product page vs the ₹38,340 card (card or bank price only); also only 5 ratings |
| Cruise 1.5 ton 5-star inverter AC B0GHFT36VV | Still ₹35,490 on the product page vs the ₹32,240 card (card or bank price only) |
| Free Kindle eBooks B0899KPV4S | Multi-product, ₹0 |
| JioMart Mak chargers | No ld+json; category or landing link |
| Mannlich hair removal cream B0BY3NZ4HB | Personal care / health |
| OMRPM sandals (Shopsy) | Out of stock |

The other 17 cards were dropped in stage 1: junk, promos, or non-product links.

## CEO audit (18:46 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,918 (+1) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 358; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 3 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,396 / 12,387. The cursor moved 12,382 → 12,387, so the external cron is draining. |
| Unpushed commits | 0 before this report |

No rot found.
