# DesiDime tick 2026-10-08k (20:47 IST)

**16 fresh candidates → 2 pushed** (both Amazon). `/admin/deals/bulk` count 2, both `created:true`. Both live pages return 200. IndexNow **HTTP 200** for 5 URLs.

Stage 1: 34 discovered, 19 resolved, 3 already in the DB, 16 fresh.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [ALSU women faux leather clutch wallet, green](https://richdeals.in/alsu-women-faux-leather-clutch-wallet-with-phone-pocket-green-b08hx9zg37) (B08HX9ZG37) | ₹302 | ₹1,499 | 80% | 4.1★ (5,993) |
| [Symbol men quilted bomber jacket, grey, size S](https://richdeals.in/amazon-brand-symbol-men-quilted-bomber-jacket-band-collar-grey-b08dgcslcn) (B08DGCSLCN) | ₹1,149 | ₹3,399 | 66% | 4.0★ (1,076) |

Both were checked on the Amazon product page in the logged-in tab: `#centerCol` price matched the DesiDime price, `#availability` showed In stock, and add-to-cart was present. The jacket uses the size-variant note. Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`.

## Rejected (14)

| Candidate | Reason |
|---|---|
| Men's light blue slim fit blazer (B0GTFDQPP3) | 6 ratings |
| Indian Garage Co cotton blazer (B0CCV8P5MB) | 3.1★ |
| ZENSHARK reversible puffer jacket (B0HJNCS1TJ) | 2 ratings |
| CELLO Air-Vel portable fan (B0FWKGN5XY) | Currently unavailable, 3.4★ |
| Home Centre Quadro NXT study desk (B07TP56NJ8) | ₹7,999 live vs ₹7,200 posted |
| Safari Genius Alley luggage set of 3 (B0F67KYF8J) | ₹3,599 live vs ₹2,990 posted |
| Haier 190L fridge (B0GP6X9LZJ) | ₹17,490 live vs ₹13,841 posted (bank-card price) |
| Haier 237L fridge (B0GP6VTQNB) | ₹25,490 live vs ₹19,090 posted (bank-card price) |
| Solimo karahi 1.5L (B0D927SK86) | 3.5★ (at or below the 3.5 cutoff) |
| Huggies diapers, Himalaya baby powder | Baby/health |
| Globus body lotion (Digihaat) | Skincare |
| Harley-Davidson X440 booking | Vehicle booking, not a product deal |
| Portronics keyboard (Flipkart) | Price drift, caught by stage 1 |

## CEO audit (20:47 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 4 (at the 4/day cap) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,303 |
| Broadcast cursor | 12819 vs DB max 12821. The 2 new rows are waiting for the external broadcast cron, which catches up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
