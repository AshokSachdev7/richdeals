# DESIDIME tick 2026-10-16n (14:35 IST)

**6 deals pushed LIVE (count 6, all created:true). IndexNow HTTP 200 (9 URLs). No rot.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 34 |
| Resolved to a single product (JUNK/GROCERY filters applied) | 22 |
| Already in DB | 5 |
| Fresh candidates | 17 |
| Verified and pushed | 6 |

## Pushed

| Store | Product | Price | MRP | How verified | Affiliate |
|---|---|---|---|---|---|
| Amazon | PHILIPS 3W LED bulb, pack of 2 (B0C8NPJDRD) | ₹78 | ₹260 | logged-in tab: price, stock, add-to-cart | `?tag=ashoksachdev-21` |
| Amazon | Story@Home face towels, set of 6 (B078RLGB3L) | ₹187 | ₹999 | logged-in tab | `?tag=ashoksachdev-21` |
| Flipkart | Everyuth Flora body lotion 500 ml | ₹95 | ₹625 | ld+json in Playwright tab, InStock | `affid=djhackraj` |
| Croma | boAt Rockerz 280 ANC neckband | ₹1,294 | ₹4,990 | rendered page in Playwright, Add to Cart shown | Cuelinks |
| Croma | boAt Rockerz 210 ANC neckband | ₹1,284 | ₹5,990 | rendered page in Playwright | Cuelinks |
| Croma | GOBOULT GX Charge neckband | ₹799 | ₹4,499 | rendered page in Playwright | Cuelinks |

Croma serves no ld+json to curl, so the price was read from the page rendered in the browser.

## Rejected

| Item | Reason |
|---|---|
| Harley-Davidson X440 | Booking listing, not a product purchase |
| Portronics Toad One mouse | DesiDime card ₹554, product page ₹579 |
| LG 185 L fridge | No price and no buy box |
| Xiaomi Pad 8 | DesiDime card ₹44,499, product page ₹50,999 (card price includes bank offer) |
| Kalyan 2 g gold coin | DesiDime card ₹29,660, product page ₹32,737 |
| Lenovo IdeaPad Slim 3, Core 3 | DesiDime card ₹47,490, product page ₹57,990 |
| ASUS Zenbook 14 | DesiDime card ₹1,04,990, product page ₹1,24,990 |
| Lenovo IdeaPad Slim 3, i5 | DesiDime card ₹54,490, product page ₹64,990 |
| Kaff KFR5 air fryer (Flipkart) | DesiDime card ₹3,399, product page ₹6,499 |
| Larah lunchbox (Flipkart) | Out of stock |
| Bombay Shaving face wash (Hamaramall) | No ld+json; low-ticket FMCG |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,681 / 13199 |
| Broadcast cursor | 13193. The gap is this batch; the external broadcast cron picks it up on its next run |
| Prod endpoints (7, incl. `/llms.txt`) | all 200, 0.15–0.67 s |
| Session crons | 9 of 9, matches roster |
| Unpushed commits | 0 before this report |

No rot found.
