# DESIDIME-INGEST tick — 2026-11-13c

Ran stage 1 with `apps/api/scripts/ingest-desidime.mjs`: it read the cards from `/new` and the homepage, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. Amazon prices were checked on the PDP in the logged-in Playwright tab, reading `#corePriceDisplay .a-price-whole` plus `#availability` and add-to-cart. Non-Amazon prices were checked against the ld+json `Product.offers` (±₹1, InStock). Each `productId` was deduped against the live DB, and the deals were pushed with `/admin/deals/bulk` as `status:live`. Run at about 16:52 IST.

**Result: 38 cards, 26 resolved, 2 already in the DB, 5 rejected in the last 24h, 19 candidates, all new by productId. 6 pushed (201, count:6, all created:true), all Amazon. IndexNow returned HTTP 200 for 9 URLs (6 slugs plus 3 hubs).**

## Pushed

| Store | Deal | Price | MRP | Off | Affiliate |
|---|---|---|---|---|---|
| Amazon | Hammer 65W GaN fast charger, 3-port (2x Type-C, 1x USB-A), PD 3.0 | ₹1,599 | ₹7,999 | 80% | `tag=…-21` |
| Amazon | Ant ICE10 phone cooler, 3 speed modes | ₹499 | ₹1,999 | 75% | `tag=…-21` |
| Amazon | French Connection Autaros skeleton-dial automatic watch FCA31TM | ₹4,866 | ₹17,995 | 73% | `tag=…-21` |
| Amazon | Ant Trigger 20 38W dual-port USB-C car charger, PD 3.0 + QC 3.0 | ₹199 | ₹1,999 | 90% | `tag=…-21` |
| Amazon | TAG Gamerz Aurora mid-tower gaming cabinet, curved tempered glass | ₹4,157 | ₹16,500 | 75% | `tag=…-21` |
| Amazon | EXOTIX black leather jacket for men, crop fit | ₹759 | ₹2,999 | 75% | `tag=…-21` |

The EXOTIX description says the material is likely faux (PU) leather at this price and tells readers to check the material line on the listing.

Slugs:
- `hammer-65w-gan-fast-charger-3-port-pd-3-0-b0d6kdt624`
- `ant-ice10-phone-cooler-for-gaming-b0dvzcqrpg`
- `french-connection-autaros-skeleton-dial-automatic-watch-for-men-b0gqgy9pn2`
- `ant-trigger-20-38w-dual-port-usb-c-car-charger-b0dxl6wx56`
- `tag-gamerz-aurora-mid-tower-gaming-cabinet-b0fqjjyy68`
- `exotix-black-leather-jacket-for-men-crop-fit-b0h1cyz34y`

## Rejected

| Item | Reason |
|---|---|
| HP 15 i5 B0DTK9DZB4 | PDP ₹73,500 vs DesiDime ₹71,760 (bank offer) |
| Hindware Marcelo B08LBLHVK7 | PDP ₹27,190 vs ₹24,190 (bank offer) |
| Sennheiser IE 300 B08SW56CDQ | PDP ₹10,990 vs ₹8,529 (bank offer) |
| Elica chimney B0GW8JNNGL | No price and no add-to-cart (unavailable) |
| vivo V80 B0HJCVLM6H | PDP ₹79,999 vs ₹68,400 (bank/exchange offer) |
| MSI MP275Q B096Y1ZY24 | PDP ₹13,599 vs ₹10,880 (bank offer) |
| Thermalright B0BLJHWVS3 | PDP ₹5,251 vs ₹4,726 (bank offer) |
| CG Iraya B0H9FK9XZZ | PDP ₹3,299 vs ₹2,970 (bank offer) |
| PROVEN B0F4PH9V5K | PDP ₹5,499 vs ₹4,950 (bank offer) |
| MILTON Marine 900 B0FGXJQ9KF | PDP ₹412 vs ₹180 (drift) |
| JioMart boAt EnergyShroom | No ld+json |
| Tradingview | Sale announcement |
| Toilet paper | FMCG |

DesiDime's Amazon prices are often about 10% below the PDP. That gap is a card or bank offer, not the selling price, so those rows are rejected rather than published at a price most buyers can't get.

## Freshness

- IndexNow: HTTP 200, 9 URLs.
- `sitemap.xml`: ISR 1800s. The deals child lists the top 100 only, by design.
- `llms.txt`: force-dynamic, so it picks up the batch on the next request.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.95s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.52s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,909 = 15,909 (+6 this tick) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,480 vs 16,486 | OK, these are the 6 new rows waiting for the external broadcast cron, which catches up on its own |
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
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), Puma Maka B09RG35FRQ (1 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
