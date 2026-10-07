# DesiDime tick 2026-10-07k (22:46 IST)

Stage 1 (`ingest-desidime.mjs`) found 33 cards. 13 resolved to a single product, and none were already in the DB.

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| VW 50" Smartchoice Pro 4K QLED Google TV (B0GK9D99SG) | ₹27,999 | ₹99,999 | 4.1 (2,686) |
| Symbol men's colour-block active sports T-shirt (B0C533339V) | ₹149 | ₹799 | 4.0 (2,639) |

Every price was read from the Amazon PDP (`#centerCol`) with a same-origin fetch in the logged-in tab. Both match the card price, both are in stock, and both have add-to-cart. The copy uses only PDP bullets and facts.

## Rejected (11)

| Candidate | Reason |
|---|---|
| Instamart yeast protein | Out of stock; Instamart is location-locked |
| Instamart Samsung Galaxy Fit 3 | Price drift; Instamart is location-locked |
| Flipkart Dyson V8 | Price drift |
| Hand wash 5L (B0GD251YP5) | FMCG |
| Van Heusen women's top (B08GJR8721) | Unavailable, no add-to-cart |
| Sonata blue-dial steel watch (B0DCN9WR3Y) | Only 3 ratings |
| Glen 60cm auto-clean chimney (B0BX4DJNKF) | Unavailable, no add-to-cart |
| Hisense 75" Hi-QLED TV (B0H5RCZGF3) | ₹64,249 on the PDP vs ₹51,449 on the card; only 1 left |
| Faber Artemis 90cm chimney (B0DBLF2KY4) | Unavailable, no add-to-cart |
| Rupa Jon vest (B0BD7VDS9Q) | ₹499 on the PDP vs ₹274 on the card |
| Glen 60cm split chimney (B09717SPPF) | ₹9,190 on the PDP vs ₹8,271 on the card; only 2 left; 6 ratings |

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (22:46 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **2.** The rule (2–3 per day) is met. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,208 (12,206 + 2) |
| Broadcast cursor | 12719 vs DB max 12721. The gap is the 2 new rows, which the external cron picks up. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
