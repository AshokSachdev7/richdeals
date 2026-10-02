# DESIDIME-INGEST — 2026-10-02 (16:55 IST)

**30 cards found → 11 resolved to a product → 3 already in DB → 8 fresh → 1 pushed LIVE (Flipkart). Bulk count 1, created 1/1. IndexNow HTTP 200 for 4 urls. New deal page returns 200.**

## Pushed

Checked in the Playwright Flipkart tab: ld+json `Product.offers.price` matched the DesiDime card exactly and showed InStock.

| PID | Deal | Price | MRP | Rating |
|---|---|---|---|---|
| MIXH2VYBHCCZXKZB | Glen 4023PLUS 750 W mixer grinder, 4 jars | ₹3,681 | ₹5,495 | 4.1 (8) |

- **Affiliate link:** Flipkart `/p/itm…?pid=MIXH2VYBHCCZXKZB&affid=djhackraj`.
- **Image:** rukmini1.flixcart.com.
- **Copy:** original. It notes Flipkart's 7-day replacement-only policy, taken from the ld+json return policy.

## Rejected (7)

| Item | Reason |
|---|---|
| Haier Smart Choice 12 kg front-load washer B0FCSGSSSB | Card ₹38,340 vs product page ₹50,090 (card or bank price only); also only 5 ratings |
| Cruise 1.5 ton 5-star inverter AC B0GHFT36VV | Card ₹32,240 vs product page ₹35,490 (card or bank price only) |
| STRANGER BROTHERS black sneakers (Shopsy) | Already LIVE as id 12329 at the same ₹442 |
| Mannlich hair removal cream B0BY3NZ4HB | Personal care / health |
| McCain fries (Instamart) | Food, and out of stock |
| Free Kindle eBooks B0HL6BT8JV | Multi-product, ₹0 |
| NAUGHTY MEN track pant (Shopsy) | Price drift (flagged by the script) |

The other 19 cards were dropped in stage 1: junk, promos, or non-product links.

## CEO audit (16:55 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,903 (+1) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,381 / 12,343. The cursor moved 12,338 → 12,343 since the last sitemon, so the external cron is draining the IFS batch. |
| Unpushed commits | 0 before this report |

No rot found.
