# DESIDIME-INGEST tick — 2026-11-13b

Ran stage 1 with `apps/api/scripts/ingest-desidime.mjs`: it read the cards from `/new` and the homepage, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. Amazon prices were checked on the PDP in the logged-in Playwright tab, reading `#corePriceDisplay .a-price-whole` plus `#availability` and add-to-cart. Non-Amazon prices were checked against the ld+json `Product.offers` (±₹1, InStock). Each `productId` was deduped against the live DB, and the deals were pushed with `/admin/deals/bulk` as `status:live`. Run at about 12:55 IST.

**Result: 35 cards, 21 resolved, 17 candidates, all new by productId. 4 pushed (201, count:4, all created:true). IndexNow returned HTTP 200 for 7 URLs (4 slugs plus 3 hubs).**

## Pushed

| Store | Deal | Price | MRP | Off | Affiliate |
|---|---|---|---|---|---|
| Flipkart | PHILIPS TAE2146BK USB Type-C wired in-ear headphones | ₹658 | ₹899 | 27% | `affid=djhackraj` |
| Flipkart | Spigen 10000 mAh 30W compact power bank | ₹1,999 | ₹3,399 | 41% | `affid=djhackraj` |
| Flipkart | Spigen 10000 mAh 22.5W power bank | ₹999 | ₹2,399 | 58% | `affid=djhackraj` |
| Amazon | CELLECOR CMG60GR 600W mixer grinder, 3 speed | ₹1,943 | ₹5,999 | 68% | `tag=…-21` |

Slugs:
- `philips-tae2146bk-usb-type-c-wired-in-ear-headphones-with-mic-acchbrf29dgbx94r`
- `spigen-10000-mah-30w-compact-pocket-power-bank-pwbhdgphd64rf5sq`
- `spigen-10000-mah-22-5w-power-bank-pwbgtv9dbqvrx3by`
- `cellecor-cmg60gr-600w-mixer-grinder-3-speed-6-blades-grey-green-b0gfmk743f`

## Rejected

| Item | Reason |
|---|---|
| boAt B0CVX5Z9KK | No price and no add-to-cart on the PDP (unavailable) |
| Dell B09T3H12GV | PDP ₹1,499 vs DesiDime ₹1,329 (bank-offer price) |
| PROVEN B0F4PH9V5K | PDP ₹5,499 vs ₹4,950 (bank offer) |
| CG B0H9FK9XZZ | PDP ₹3,299 vs ₹2,970 (bank offer) |
| Portronics B0CR6JQT6F | PDP ₹150 vs ₹139 (bank offer) |
| Lifelong B0GSZC1W7J | PDP ₹8,478 vs ₹7,631 (bank offer) |
| ASUS, itel, Samsung A36, Haier AC, Billion washer | Price drift on the merchant page |
| JioMart pani puri | Grocery, and the page has no ld+json |
| Shampoo B0G1T3SQW5 | FMCG |

DesiDime's Amazon prices are often about 10% below the PDP. That gap is a card or bank offer, not the selling price, so those rows are rejected rather than published at a price most buyers can't get.

## Freshness

- IndexNow: HTTP 200, 7 URLs.
- `sitemap.xml`: ISR 1800s. The deals child lists the top 100 only, by design.
- `llms.txt`: force-dynamic, so it picks up the batch on the next request.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.79s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.60s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,898 = 15,898 (+4 this tick) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,471 vs 16,475 | OK, these are the 4 new rows waiting for the external broadcast cron, which catches up on its own |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2. On target.

## Still open

- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it before then.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
