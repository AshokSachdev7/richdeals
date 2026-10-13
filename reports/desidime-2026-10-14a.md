# DESIDIME tick 2026-10-14a (00:48 IST)

**0 pushed.** Stage 1 found 36 cards, resolved 21 to a product and dropped 11 already in the DB, leaving 10 fresh. All 10 failed verification. No push and no IndexNow ping (nothing new to ping).

## How they were checked

- **Amazon (7):** same-origin fetch in the logged-in Playwright Amazon tab.
  - Price from `#corePriceDisplay_desktop_feature_div`, falling back to `#centerCol` text.
  - Stock from `#availability`, `#outOfStock` and the add-to-cart button.
  - Rating from `#acrPopover` and `#acrCustomerReviewText`.
- **Flipkart / Myntra (3):** stage 1 had already rejected them on ld+json price drift.

## Rejected

| Deal | Reason |
|---|---|
| Shatras handwash refill 10L (B0DBFGC4LN) | Rated 3.5 (the limit is ≤3.5); low-ticket FMCG |
| Acer Iconia Tab11 8/256 (B0FZT161TL) | PDP ₹23,999 vs card ₹20,749; the gap is a card or bank-offer price |
| Samsung Galaxy S26 Ultra 12/256 (B0GL8G49LV) | PDP ₹1,39,999 vs card ₹1,19,749; card or bank-offer price |
| Lenovo Smartchoice V15 i5-13420H (B0HG1QKHLM) | No buy-box price and 0 ratings |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | PDP ₹15,190.50 vs card ₹10,861. Same drift for 13+ ticks; the live row already carries ₹15,190 |
| LG 322 L 2-star convertible fridge (B0GMQBMGGN) | Out of stock (`#outOfStock`, no add-to-cart button) |
| Apple AirPods 5 (B0HJ9SC113) | PDP ₹13,900 vs card ₹12,650; card or bank-offer price |
| Samsung 60W GaN charger (Flipkart ACCHHY9ZDBDJ7KGC) | ld+json price drift (stage 1) |
| Longway ceiling fan (Myntra d44a2e58e3fc) | ld+json price drift (stage 1) |
| Dell Alienware 16 Aurora (Flipkart COMHJKFGFWNFHGZZ) | ld+json price drift (stage 1) |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-14) | 1 (cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,467 (unchanged) |
| Broadcast cursor | 12984, equal to DB max 12984 |
| Prod endpoints (7) | all 200 in 0.10–0.60s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
