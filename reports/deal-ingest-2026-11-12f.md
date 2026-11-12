# DEAL-INGEST indiafreestuff tick — 2026-11-12f

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals`, resolved the base64 `?rto=` Buy Now ids, and swapped in our affiliate tags. Every Amazon price was then verified on the PDP in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, hiRes image keyed by colour). Text was rewritten, and images come from the marketplace CDN. New rows were deduped by productId against the live DB.

**Result: 6 pushed** (`/admin/deals/bulk` returned 201, `count:6`, all `created:true`, so no slug restore was needed).

## Funnel

| Step | Count |
|---|---|
| Discovered (listing + superdeals) | 103 |
| Resolved to a product | 90 |
| Stage-1 drops | 4 |
| ASINs PDP-verified | 24 |
| Pushed | **6** |
| Fresh rejected (drift) | 4 |
| Skipped (low stock) | 2 |
| Dup of LIVE row, synced | 11 |

Stage-1 drops:
- B0DGQQ9V18: a "Min Buy 2" listing.
- try-it-first-samples: a `/b?node` category page.
- Lifelong hand blender: an IFS-masked Flipkart `/indiafreestuff/p/` pid.
- B08SPXBMPS: drifted, ₹324 on the PDP vs ₹214 on the card.

### Pushed

| ID | ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|---|
| #16415 | B0BJ93527C | Boldfit basketball, size 7 | ₹401 | 1,799 | 78% |
| #16416 | B0CLS2BQWT | Cortina microfiber hair towel cap | ₹64 | 549 | 88% |
| #16417 | B09Q5WCYH7 | Pure Source India black ceramic vase | ₹82 | 999 | 92% |
| #16418 | B0H2DZDL9D | Prabha Splash Thermo Star travel jug | ₹999 | 3,850 | 74% |
| #16419 | B0913D11L8 | atomberg Efficio 150 mm BLDC exhaust fan | ₹1,499 | 2,300 | 35% |
| #16420 | B0GYRGV13D | Acer Aspire One, Ryzen 3 7320U, 8/512, 14" | ₹48,490 | 76,999 | 37% |

### Fresh rejects

| ASIN | Product | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|---|
| B0BS74M665 | Sony WH-CH720N | 5,791 | 6,989 | drift |
| B0DHDCYG42 | E GATE Phantom 630DW soundbar | 6,300 | 6,999 | drift |
| B0F8Q5R6X6 | LG 27BA650 monitor | 18,223 | 19,182 | drift |
| B09TFMTSCX | ARTINO 6 kg kettlebell | 379 | 649 | drift |
| B09DNSFYRS | Aurelia printed tights | 382 | 333 | low stock ("only 1 left") |
| B0GTQ5X45R | acerpure Acerone 4G | 9,999 | 9,999 | low stock ("only 1 left") |

## Dup LIVE rows: PDP re-verify

### Synced (11)

Each sync updated the price, MRP, discountPct and the ₹ figure and "% Off" in the title, and wrote 1 priceHistory row.

| ID | Old ₹ | New ₹ | MRP | Off |
|---|---|---|---|---|
| #12955 | 88 | 89 | 299 | 70% |
| #6906 | 299 | 259 | 1,999 | 87% |
| #10966 | 281 | 198 | 549 | 64% |
| #5328 | 6,999 | 6,790 | 13,290 | 49% |
| #5022 | 54,990 | 55,990 | 122,900 | 54% |
| #4848 | 185 | 215 | 475 | 55% |
| #13308 | 169 | 214 | 499 | 57% |
| #6414 | 179 | 149 | 599 | 75% |
| #7965 | 167 | 194 | 389 | 50% |
| #12869 | 999 | 1,099 | 2,999 | 63% |
| #4960 | 1,699 | 1,650 | 2,195 | 25% |

For #4960 the DB MRP was kept, because the PDP's MRP of ₹21,999 is bogus. #16391 (BT neckband) stays EXPIRED because the PDP has no price and no add-to-cart.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 17 slugs (6 pushed + 11 synced) returned **HTTP 200** (20 URLs: 17 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.67s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.58s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,846 = 15,846 (+6 pushed) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,419 vs 16,420 (lag 1, the external cron catches up) | OK |
| Crons | 9/9 vs roster, none recreated | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper now fixes "% Off" in titles, but not "below/under ₹X" or "saves ₹X" copy.
- Low-stock pushes are fragile (#16406). This tick skipped 2 "only 1 left" ASINs instead of pushing them.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
