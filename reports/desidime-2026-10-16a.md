# DESIDIME tick 2026-10-16a (~02:32 IST)

**0 pushed. No IndexNow ping, because nothing was pushed.**

Stage 1 (`ingest-desidime.mjs`) read 33 listing cards:

- 15 were dropped as junk or non-product links: app-store promos (CRED, Paytm), Myntra listing/search pages, and a Flipkart Samsung TV whose link was a malformed `/p/itme`.
- 11 resolved to a single product. 1 of those was already in the DB, leaving 10 fresh candidates.

## Candidates

| # | Product | Store | Card price | Result |
|---|---|---|---|---|
| 1 | Kokila No-PPD shampoo hair colour 400ml (B0CP5S82ZV) | Amazon | ₹697 | Rejected: price drift. PDP shows ₹712, in stock. That is ₹15 over the ±₹1 limit. |
| 2 | Acer EK220Q E3 21.5" IPS monitor (B0CLY9HWHN) | Amazon | ₹5,220 | Rejected: price drift. PDP shows ₹5,799, in stock. ₹579 over, and at ₹5,799 vs ₹7,599 MRP this is an everyday price, not a deal. |
| 3 | L'Oréal shampoo 800ml (B0F8R6FHYX) | Amazon | none | Rejected: no card price. "Follow the step" means a stacked coupon, which can't be verified. |
| 4 | Hero bikes/scooties (B0FGY91JB5) | Amazon | ₹79,982 | Rejected: it is an SBI credit-card offer ("up to ₹12,500 off"), not a product price. |
| 5 | Kalyan 2g 24K gold coin pendant (B0DHVWY583) | Amazon | ₹29,660 | Rejected: gold price moves daily. No MRP or discount, and a `priceValidUntil` of +14 days would be wrong. |
| 6 | MMTC-PAMP 2g Lakshmi gold pendant (B0B7WZ55MT) | Amazon | ₹29,479 | Rejected: same reason as #5. |
| 7 | Muthoot 2g Ganesha gold pendant (B0D2J9GX3J) | Amazon | ₹29,180 | Rejected: same reason as #5. |
| 8 | Hauser XO gel pen, pack of 5 | JioMart | ₹5 | Rejected: no ld+json on the page, and it is ultra-low-ticket. |
| 9 | Veeba tomato ketchup 1kg | JioMart | ₹49 | Rejected: no ld+json on the page, and it is grocery. |
| 10 | Bosch 8kg tumble dryer (WMNGZSEVTHHQDGST) | Flipkart | ₹27,740 | Rejected: price drift (`verify=price-drift`). |

DesiDime card prices went stale within hours again. The PDP-verify gate did its job.

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Prod `/`, `/offers`, `/api/deals` | all 200 (full 7-endpoint sweep at the sitemon 10-16c tick, 25 min earlier: all 200) |
| Posts per day (IST) | 10-14: 2, 10-15: 3, 10-16: 1 so far (CONTENT-SEO cron runs every 6h) |
| Posts missing cover / missing SEO fields | 0 / 0 |
| LIVE deals with null price / null image / PENDING_REVIEW | 0 / 0 / 0 |
| LIVE deals / DB max id | 12,602 / 13119 |
| Newest deal age | 72 min (overnight lull, 3 sources returned 0 at this hour) |
| Broadcast cursor | 13119 = DB max, caught up |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 match the roster (checked at sitemon 10-16c) |
