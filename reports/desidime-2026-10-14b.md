# DESIDIME tick 2026-10-14b (02:46 IST)

**0 pushed.** Stage 1 found 38 cards, resolved 22 to a product and dropped 5 already in the DB, leaving 17 fresh. All 17 failed verification. No push and no IndexNow ping (nothing new to ping).

Every price failure went the same way: the live price was higher than the card price. The DesiDime card prices had expired or were bank-offer prices.

## How they were checked

- **Amazon (14):** same-origin fetch in the logged-in Playwright Amazon tab.
  - Price from `#centerCol` ("₹X with N percent savings").
  - Stock from `#availability`, `#outOfStock` and the add-to-cart button.
  - Rating from `#acrPopover` and `#acrCustomerReviewText`.
- **Flipkart / Myntra (3):** checked against the store page's ld+json price in stage 1.

## Rejected

| Deal | Reason |
|---|---|
| HP H400 wireless headset (B0H414M3MP) | PDP ₹1,099 vs card ₹1,045; only 1 rating |
| CK in2U Him 150ml EDT (B0085M6J7I) | PDP ₹2,850 vs card ₹2,100; rated 3.0 |
| Morphy Richards AT 200 toaster (B0BKT4S4GG) | PDP ₹1,288 vs card ₹1,187 |
| CÜRAA Grill Neo sandwich griller (B0FF9Q48SQ) | PDP ₹1,199 vs card ₹875 |
| HP 15 Smartchoice Ryzen 3 7320U (B0FJYJ8LVY) | PDP ₹46,990 vs card ₹41,490 |
| Samsung 8 kg 5-star front load (B0F2SLWGJW) | PDP ₹20,990 vs card ₹17,390 |
| Samsung 27" 120Hz monitor (B0FLDZRVKN) | Out of stock |
| HP 65W USB-C adapter (B0CQLK4Q9Q) | Price matches (₹890), but only 2 ratings |
| Sony ULT Field 1 speaker (B0HF6FY9H6) | PDP ₹7,989 vs card ₹5,790 |
| HP G370 wired gaming headset (B0H41MMVWW) | PDP ₹1,650 vs card ₹899; 0 ratings |
| Sony WH-ULT900N headphones (B0CWVX1GNX) | PDP ₹11,990 vs card ₹8,887 |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | PDP ₹15,190.50 vs card ₹10,861. Repeat; the live row already carries ₹15,190 |
| LG 322 L fridge (B0GMQBMGGN) | Out of stock (repeat) |
| Apple AirPods 5 (B0HJ9SC113) | PDP ₹13,900 vs card ₹12,650; only 2 left |
| OnePlus Nord Buds 3r (Myntra 561ea073afb2) | Store page ₹1,799 vs card ₹1,409 (stage 1) |
| Samsung 60W GaN charger (Flipkart ACCHHY9ZDBDJ7KGC) | ld+json price drift (stage 1, repeat) |
| Longway ceiling fan (Myntra d44a2e58e3fc) | ld+json price drift (stage 1, repeat) |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-14) | 1 (cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,467 (unchanged) |
| Broadcast cursor | 12984, equal to DB max 12984 |
| Prod endpoints (7) | all 200 in 0.10–0.59s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
