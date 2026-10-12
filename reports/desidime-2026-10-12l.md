# DESIDIME tick 2026-10-12l (22:46 IST)

**1 of 16 fresh candidates pushed.**

- Stage 1 found 36 deals and resolved 21 to a single product. 5 were already in the DB, leaving 16 fresh. Before the push, the passing product ID was checked against the DB again: no match.
- The bulk endpoint on the local API returned `count: 1`, `created: true`.
- The deal page returns 200 on prod (0.23s).
- IndexNow returned **HTTP 200** for 4 URLs (1 deal slug plus 3 hub URLs).

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Kook N Keech men jogger track pants (40852650) | Myntra | ₹200 | ₹1,999 | 90% | 4.5 (907) | InRDeals `inr678975705` |

**How it was checked:** read from the product page's ld+json and `__myx` page data in a browser tab: ₹200, InStock, not out of stock, M.R.P. ₹1,999.

## Rejected (15)

| Deal | Reason |
|---|---|
| Lenovo Idea Tab 5G (Amazon) | No ratings yet |
| Noise Air Clips open-ear earbuds (Amazon) | Rated 3.2 |
| Scott International polo T-shirt (Amazon) | Rated 3.3 |
| The Artment set of 6 stools (Amazon) | Price drift: ₹2,250 listed vs ₹7,999 live |
| Nilkamal Sierra recliner (Amazon) | Price drift: ₹10,861 listed vs ₹15,190.50 live (third tick in a row) |
| MSSHEET casual shirt, ₹59 (Flipkart) | Location-specific price; no ratings |
| Foxtale ceramide moisturizer (Flipkart) | Skincare (health rule); price drift ₹202 vs ₹270 |
| SanDisk Creator 1TB phone SSD (Flipkart) | Price drift: ₹16,099 listed vs ₹17,999 live |
| Eggs, Jompers kurta, 20k mAh power bank (Instamart) | Eggs are food; kurta has no ld+json; power bank price drift ₹629 vs ₹1,199 |
| Churan goli (Digihaat) | Food; no ld+json |
| RED TAPE casuals, Philips 43" TV, Reynolds pens (Flipkart) | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 4 (cap reached) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,442 (12,441 + 1) |
| Broadcast cursor | 12958 vs DB max 12959. The gap is this tick's deal; the external broadcast cron will pick it up. |
| Prod endpoints (7) | all 200 in 0.11–0.69s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
