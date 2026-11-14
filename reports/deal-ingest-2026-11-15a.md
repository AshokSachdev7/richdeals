# DEAL-INGEST (indiafreestuff) tick — 2026-11-15a

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids. It found 74 candidates:

- 14 dropped: 13 Flipkart cards (unresolved this tick) and 1 Amazon `/b?node` sample hub.
- 18 already rejected in the last 3 days.
- 36 already in the DB, all LIVE.
- 20 fresh ASINs.

Every fresh ASIN was checked on its Amazon PDP with an in-tab fetch in the logged-in Playwright tab. Price comes from `#corePriceDisplay .a-price-whole`. M.R.P. was read from the price block after stripping `<style>`. Add-to-cart and stock were also checked. The tick ran at about 01:05 IST.

**Result: 12 new deals pushed LIVE (count:12, all created:true, #16572–16583). 8 fresh ASINs rejected (drift, low stock, no buybox, FMCG). One dup row was price-synced (#3538) and one expired (#15890). IndexNow returned HTTP 200 for 17 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| Row | Slug | Price | MRP | Off |
|---|---|---|---|---|
| #16572 | gloty-cool-mist-humidifier-300ml-b0hlpttd2d | ₹279 | ₹1,299 | 79% |
| #16573 | huf-wooden-finish-ultrasonic-aroma-diffuser-200ml-b0ds56ptdg | ₹489 | ₹1,299 | 62% |
| #16574 | wave-barber-hair-brush-sponge-b0fwbkfjl2 | ₹588 | ₹999 | 41% |
| #16575 | skechers-mens-go-run-400-running-shoe-b0dck42qw6 | ₹2,099 | ₹4,999 | 58% |
| #16576 | kenstar-avenza-instant-water-heater-5-9l-3000w-b0h6qf5n8g | ₹2,999 | ₹7,490 | 60% |
| #16577 | h2o-humidifier-with-led-light-300ml-b0h99kk69b | ₹289 | ₹899 | 68% |
| #16578 | adidas-mens-stunicon-m-running-shoe-b094p35qdt | ₹1,999 | ₹4,999 | 60% |
| #16579 | panasonic-3w-hybrid-led-downlight-b0hbpl4krr | ₹129 | ₹320 | 60% |
| #16580 | carefoam-memory-foam-car-neck-rest-pillow-b0dtyrqy5h | ₹242 | ₹1,999 | 88% |
| #16581 | rr-signature-opul-air-1200mm-bldc-ceiling-fan-b0h3cj51t5 | ₹3,999 | ₹7,990 | 50% |
| #16582 | lifelong-automatic-yogurt-and-curd-maker-b0dk1wftqk | ₹395 | ₹1,699 | 77% |
| #16583 | hp-360-mono-portable-bluetooth-speaker-b08nqxp8cr | ₹701 | ₹2,996 | 77% |

- Links use `?tag=ashoksachdev-21` on `/dp/ASIN`.
- Images come from `m.media-amazon.com` at `_SL1500_`. Thumbnail-sized `data-old-hires` URLs were upsized.
- All copy is original. The ₹ figure in each title equals the numeric price.
- #16575 Skechers: the IFS card's ₹1,931 is the price after an 8% clip coupon. The deal was pushed at the PDP price of ₹2,099, and the copy names the coupon.
- #16579 Panasonic: the PDP shows ₹128.76, which is stored as ₹129.
- #16580 CareFoam: the PDP shows ₹242.17, which is stored as ₹242.
- #16577 H2O: the first parse read ₹28,900 as the MRP. That figure is the per-100g unit rate. The real MRP is ₹899.

## Dup re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #3538 | Bajaj Celesta downlight B0DVGDRFKX | DB had one light at ₹570. The ASIN now lands on the pack of 6 at ₹1,033, MRP ₹2,994 (₹172/unit). | Synced: price ₹1,033, MRP ₹2,994, 65% off. Title and description now say pack of 6. Slug kept and a priceHistory row added. |
| #15890 | Corsair HS35 v2 B0CX4YC475 | No price, no add-to-cart, unavailable | Set to EXPIRED. The page stays live with the banner. |
| #16518 | Beardo B0HF87PLV4 | PDP ₹217, matches DB | No change |
| #16524 | Belt B0HPZ1FK5B | PDP ₹263, matches DB | No change |
| #16558 | Symbol shorts B0F79NPMPQ | PDP ₹159, matches DB, only 4 left | No change. Re-check stock next tick. |
| #16510–16539 | Earlier IFS batch | Card prices match the DB | No change |
| #9998 | NIVEA B00791D3QG | Card ₹125 vs DB ₹120. Low-ticket FMCG. | Left as is |

## Rejected

| Item | Reason |
|---|---|
| Lexton string light B0CYMVMSFG | PDP ₹3,927 vs card ₹992 |
| ATHENA top B0FG2GCT68 | PDP ₹343 vs card ₹254, and only 2 left |
| Longway BLDC fan B0HC322T6N | PDP ₹3,999 vs card ₹3,906, no coupon |
| AIRDOPE 301 B0HL8FG3TZ, B0HL8BYFPV | PDP ₹799 vs card ₹680. The brand block was rejected whole. |
| Vector X football combo B0H65MH98Q | PDP ₹960 vs card ₹855 |
| Bajaj Ivora B0DVPXX1W2 | No price and no add-to-cart |
| Dove deo B0CMQJNB48 | Low-ticket FMCG |
| 13 Flipkart cards | Stage 1 nulled the `/indiafreestuff/p/` pids. Not resolved this tick. |
| Amazon `/b?node` sample hub | Category page, not a single product |

The 8 Amazon keys were added to `data/dd-rejected.json` by hand (`Date.now()`), bringing it to 1,972 keys. That file carries earlier uncommitted changes, so it is not part of this commit.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 12 new slugs plus the #3538 and #15890 slugs. It returned **HTTP 200** for 17 urls (14 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.86s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.55s) |
| new deal #16579 | 200 (0.25s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,004 = 16,004 (+12, −1 expired) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,571 vs 16,583 | Pending. The external broadcast run drains it and self-heals. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- 13 IFS Flipkart cards were not resolved. Next tick: resolve the `itm` id and price with an in-tab fetch.
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- Same-price confirm paths still write no priceHistory row.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506 Shatras and #16558 Symbol shorts (4 left).
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344; #3538 is a variant swap of the same kind). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
