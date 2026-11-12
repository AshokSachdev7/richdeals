# DEAL-INGEST (indiafreestuff) tick — 2026-11-12g

Stage 1 (`ingest-ifs-proper.mjs`) swept both `/deals` and `/deals/superdeals` and resolved each base64 `?rto=` Buy Now id to the real store URL. All stores were in scope. Every Amazon price was verified on the PDP in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, M.R.P. read from `#centerCol`). IFS card prices were never trusted, and when one item in a brand block drifted, the whole block was rejected. Text was rewritten and images come from the marketplace CDN. New rows were deduped by productId against the live DB.

**Result: 42 pushed** (`/admin/deals/bulk` returned 201, `count:42`, all `created:true`, so no slug restore was needed). 8 dup LIVE rows were price-synced and 4 were confirmed at the same price. All 12 wrote priceHistory.

## Funnel

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 106 |
| Resolved to a product | 93 |
| Already in the DB (dup rows) | 15 |
| Fresh candidates | 78 |
| Rejected before the PDP read (grocery ×6, rejected earlier ×4, suspect ×3) | 13 |
| ASINs PDP-verified (65 fresh + 13 dups) | 78 |
| Pushed | **42** |
| Fresh rejected: drift | 13 |
| Fresh rejected: brand block | 1 |
| Fresh rejected: unavailable | 3 |
| Fresh rejected: only 1 left | 4 |
| Fresh rejected: quality | 1 |
| Fresh rejected: variant dup | 1 |
| Dup rows synced / confirmed | 8 / 4 |

### Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B0D78MJ1Q8 | French Connection watch | ₹1,876 | 6,950 | 73% |
| B0CSWSXG7T | INTIMIFY serum | ₹195 | 699 | 72% |
| B0HLQ3MKDR | HRX suitcase set | ₹4,799 | 29,999 | 84% |
| B0FYPJRP9J | Flexnest walking pad | ₹10,998 | 23,998 | 54% |
| B0BC6DM426 | Panasonic 23W LED bulb | ₹528 | 2,200 | 76% |
| B0CDL5B7VJ | Lavie backpack | ₹715 | 3,599 | 80% |
| B0B8VGGS3Y | Leather hole punch | ₹299 | 999 | 70% |
| B0F4KCJTD6 | KEXIN microSD card, 2-pack | ₹1,999 | 9,199 | 78% |
| B0FLD3NQBY | KOOTION pen drive | ₹1,999 | 3,799 | 47% |
| B0DF7XNHD3 | Vector X basketball | ₹329 | 899 | 63% |
| B0GC5J6BSR | Cerrito claw clips | ₹149 | 399 | 63% |
| B0F3X6R9RL | Skechers Go Run 400 | ₹1,548 | 3,999 | 61% |
| B0DH2F88XW | STANPHORD shoes | ₹779 | 2,299 | 66% |
| B0HBPL5NQF | OPPO A6X 5G | ₹18,999 | 34,999 | 46% |
| B0H4RXF8F7 | Samsung 25W charger | ₹399 | 1,299 | 69% |
| B0FJFSNG77 | SOVELY massager | ₹589 | 999 | 41% |
| B0DTQ4LQCG | Lapster HDMI adapter | ₹271 | 1,799 | 85% |
| B0D9VVFL92 | M&S bra | ₹299 | 1,499 | 80% |
| B0GFW5T3HF | Kids play tent | ₹299 | 899 | 67% |
| B0GKHK8ML9 | Wakefit sofa cum bed | ₹8,335 | 12,306 | 32% |
| B0FP2Z8KKH | betterhood lotion | ₹689 | 1,298 | 47% |
| B0CFVWWJ4L | Giordano watch | ₹2,465 | 8,500 | 71% |
| B079W4VJ8S | PAXMAX thermometer | ₹630 | 1,999 | 68% |
| B0HLDFNQV9 | Zebronics Silencio 100 | ₹2,299 | 4,999 | 54% |
| B0H9PM7Z4W | Bean bag cover, 1XL | ₹759 | 4,999 | 85% |
| B0H48YQMQN | Nano night lamp | ₹124 | 699 | 82% |
| B0C3LX5KKD | WildHorn gift hamper | ₹599 | 1,999 | 70% |
| B0FMBPVWX3 | dockstreet track pant | ₹348 | 999 | 65% |
| B0GGBP9Z5W | GRAND PLUS mixer grinder | ₹1,299 | 2,999 | 57% |
| B0GBXC1G39 | V-Guard Windle Deco Zeta fan | ₹2,099 | 4,199 | 50% |
| B0HF6D1BDD | Buds PRO 3 | ₹618 | 4,999 | 88% |
| B0H2D9LXC2 | V-Guard Blyzia fan | ₹2,999 | 6,999 | 57% |
| B0BR3X4VR3 | COOKWELL mixer grinder | ₹3,999 | 8,995 | 56% |
| B09X74T7BP | Aristocrat duffle bag | ₹729 | 3,570 | 80% |
| B0F13S4WPW | Omen exhaust fan | ₹664 | 1,699 | 61% |
| B0CK8NHQGG | Urban Chef dry iron | ₹499 | 1,095 | 54% |
| B0DSG7ZRGR | Bajaj Celesta | ₹103 | 450 | 77% |
| B0GFN17DJ1 | PHILIPS Lumos | ₹536 | 1,358 | 61% |
| B0BRD4PH5G | Boldfit knee caps | ₹156 | 499 | 69% |
| B0DHCY8WP6 | MILTON Graze | ₹315 | 805 | 61% |
| B00JWMTBG6 | Pigeon pressure pan, Senior | ₹1,675 | 3,395 | 51% |
| B0DWK8K8VT | Alovexiong S Pen (third-party) | ₹899 | 2,999 | 70% |

Low stock at push time: Lavie (2 left), Cerrito (2), Skechers (2), STANPHORD (4), Giordano (2), bean bag cover (2).

### Fresh rejects

| Item | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|
| Pets comb B0BXDLM1X2 | 63 | 185 | drift |
| Craftter lamp B06XHBHD2V | 646 | 680 | drift |
| OPPO F35 B0HJQQC9DZ | 38,699 | 42,999 | drift |
| Crystal ball lamp B0FPMJJ95H | 193 | 199 | drift |
| Double comforter B0HGRHDSP9 | 510 | 799 | drift |
| SIMPARTE bottle B0DGGGJM8X | 361 | 1,439 | drift |
| MIRADH lights B084HG5XPP | 629 | 649 | drift |
| PrettyKrafts bag B0B3X5P78G | 99 | 215 | drift |
| ACTIVA fan ×2 B08638NDYB | 2,394 | 2,469 | drift |
| Happy Cove containers B0F5P4KM9F | 305 | 589 | drift |
| Refill ink B0DF5GYT3K | 290 | 299 | drift |
| Homeor jars B0F74MTZ7B | 264 | 719 | drift |
| 10GTEK SFP B00U77VPX2 | 847 | 999 | drift |
| PrettyKrafts 75L bag B09SV84G4C | 295 | 295 | brand block (sibling drifted) |
| pibox B0CJNT4ZGM | n/a | n/a | unavailable |
| Bean bag 0XL B0H9PL2LRC | n/a | n/a | unavailable |
| PANCA B0H7MVY3Z3 | n/a | n/a | unavailable |
| M&S pants B0D2HHSJP2 | n/a | 702 | only 1 left |
| Juarez keyboard B0BCQLR1RP | n/a | 1,649 | only 1 left |
| Slim rack B0GN1DNF13 | n/a | 358 | only 1 left |
| SilverArrow sandals B0FKH834TX | n/a | 369 | only 1 left |
| Assembled PC B0H4GLCFBD | n/a | 6,998 | quality (2nd-gen i3) |
| My Giraffe chair, Rainbow B0DYJXND4T | n/a | 1,062 | variant dup of #16282 |

## Dup LIVE rows: PDP re-verify

| ID | Item | DB ₹ | PDP ₹ | MRP | Off | Note |
|---|---|---|---|---|---|---|
| 16173 | Kids piano | 691 | 616 | 2,999 | 79% | legacy title has no "% Off" token |
| 14452 | Cult Nova massage gun | 749 | 749 | 2,999 | 75% | MRP / discount fixed |
| 7751 | Nivia football | 329 | 899 | 978 | 8% | weak deal now |
| 3795 | Ant Globe mouse | 89 | 109 | 699 | 84% | |
| 16282 | My Giraffe chair | 1,180 | 1,062 | 3,058 | 65% | |
| 5480 | ASUS NUC 15 Pro | 63,999 | 56,999 | 80,000 | 29% | only 2 left |
| 4717 | Amazon Basics 18W charger | 299 | 269 | 699 | 62% | |
| 4262 | Ingco SDS Max hammer | 7,314 | 6,529 | 11,741 | 44% | |

Same-price confirms (priceHistory written): #16413 ₹404, #9715 ₹193, #8008 ₹1,199, #15956 ₹99. #16165 and #13500 stay EXPIRED. B0DGQQ9V18 (Dabur) was skipped.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 54 slugs (42 pushed + 12 synced/confirmed) returned **HTTP 200** (57 URLs: 54 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.35s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.67s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.77s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,890 = 15,890 (+42 pushed) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,428 vs 16,465 (lag 37 after a 42-row batch, the external cron catches up) | OK |
| Crons | 9/9 vs roster, none recreated | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime and TG scripts still write no priceHistory row (the IFS confirms in this tick did).
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper fixes "% Off" in titles, but not "below/under ₹X" or "saves ₹X" copy, and it cannot add a missing "% Off" token to legacy titles such as #16173.
- Low-stock pushes are fragile (#16406). This tick pushed 6 low-stock rows, and #5480 has only 2 left. Re-check them next tick.
- #14635 (Mivi, Flipkart) is same-price on the card, but its PDP is unchecked.
- #7751 Nivia football is now only 8% off; expire it if it does not drop by next tick.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
