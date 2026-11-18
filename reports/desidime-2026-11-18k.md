# DESIDIME-INGEST tick — 2026-11-18k

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage without fetching per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were verified with a same-origin fetch of the PDP in the logged-in Playwright Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, the hi-res image, M.R.P. from the core block). The Myntra candidate was read from its product page. Each candidate was deduped by productId against the live DB, and dup LIVE rows were re-read on the PDP for a price sync. Run at about 20:43–20:52 IST.

**Result: 4 deals pushed LIVE (#16868 to #16871): 3 Amazon and 1 Myntra. The bulk endpoint returned HTTP 201 with count 4, all `created:true`, so no slug restore was needed. One dup LIVE row was price-synced (#4793, ₹5,194 → ₹5,584). IndexNow returned HTTP 200 for 8 URLs. Prod returned 200 on 12 of 12 endpoints and every CEO-audit check is green.**

## Stage 1

| Measure | Value |
|---|---|
| Cards read | 38 |
| Fresh candidates | 13 (9 Amazon, 3 Flipkart, 1 Myntra) |
| Dups of LIVE rows | 6 |
| Skipped as rejected in the last 24h | 9 |

The first stage-1 run logged `WARN https://www.desidime.com/new gave 0 cards (5576 bytes)`. A manual curl retry returned 200 with the full listing, and the rerun read all cards, so this was a transient short response, not a block.

Rejected-in-24h skips: Flipkart NDFGRK5DRJUZ38ZA (cashews), APFHS6VSJJKZBSZW (Coway), TABH33EKYNNPKGGY (REDMI Pad SE), CBKHEPQZ8ARJZHGG (Dettol); Amazon B0GHQVNMKQ (Panasonic AC), B0HCZJTD61 (JBL PartyBox), B0DB63LKMG (Godrej fridge), B0DHVPD75Y (Lenovo Tab K11), B09YV753WH (VIP vest).

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16868 | Amazon | B0HPFD26B2 | Marwar Seth Premium Afghani Anjeer Dried Figs, 1Kg Pack | ₹379 | ₹999 (62% off) |
| 16869 | Amazon | B0C1NZZP5H | XTRIM Protekt Bike Riding Gloves for Men, Black & Red, Large | ₹443 | ₹999 (56% off) |
| 16870 | Amazon | B0H9YM9D23 | Polycab Wizzy Plus BLDC 1200mm 5-Star Ceiling Fan with Remote | ₹2,621 | ₹6,499 (60% off) |
| 16871 | Myntra | 44230710 | Fort Collins Hooded Tailored Jacket | ₹684 | ₹825 (17% off) |

- **Verification:** all three Amazon PDPs matched the card price, showed in stock, and had the add-to-cart button. The Polycab PDP showed "Only 2 left in stock", which the description states. The Anjeer listing is new and has no ratings yet; the copy says so. The Myntra page read ₹684 against M.R.P. ₹825, in stock.
- **Affiliate matrix:** Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Myntra went through InRDeals (`inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=<encoded clean URL>`), not Cuelinks.
- **Images:** `m.media-amazon.com` hi-res for the Amazon rows and `assets.myntassets.com` for Myntra. No DesiDime images were used.
- **Copy:** titles and descriptions were written fresh. No title carries a ₹ figure, and every MRP is under the 80% rule.

## Price-synced

| id | Product | Was | Now | MRP |
|---|---|---|---|---|
| 4793 | Havells Prolife Stellar Chef Air Fryer 5.5 Ltr, 1500 Watts | ₹5,194 (48% off) | ₹5,584 (44% off) | ₹9,999 |

The PDP read ₹5,584 (the card said ₹5,585). Price, discountPct and description were updated with `prisma.deal.update`, and a priceHistory row was written so the Offer gets a fresh priceValidUntil. The slug did not change. The first description draft cited a star rating that this tick had not read; it was removed in a follow-up update before the IndexNow ping.

Unchanged (PDP equals the DB row): #16832 LEGO ₹319 / ₹359; #4927 Bouncefit ₹499 with MRP null (the PDP M.R.P. of ₹2,999 implies 83% off, so the 80% rule keeps it null; the card's ₹389 lags); #174 Shimmer ₹495 / ₹1,800; #16816 PunnkFunnk ₹799 / ₹2,999; #219 Creative's ₹211 / ₹620 (the card's ₹104 lags).

## Rejected

| Store | productId | Product | Reason |
|---|---|---|---|
| Amazon | B0HBBR8NJ8 | PROWL soap | PDP ₹199 vs card ₹99 |
| Amazon | B0GN9G4PQW | Kreme pan | PDP ₹1,799 vs card ₹549 |
| Amazon | B0GKG9VDN3 | BlissClub jacket | PDP ₹2,299 vs card ₹2,187; no hi-res image |
| Amazon | B0H3J6JSDH | USPA jacket | PDP ₹2,849 vs card ₹2,710 |
| Amazon | B07T3H61JM | PowerMax treadmill | PDP ₹27,999 vs card ₹11,599 |
| Amazon | B0DH8FDQ7D | NOBERO hoodie | PDP ₹2,415 vs card ₹2,184 |
| Flipkart | PRCGDTWFGXKZHWHH | Greenchef cooker | Out of stock |
| Flipkart | RFRGHRHHRBAU7T46 | Whirlpool fridge | Live ₹12,568 vs card ₹16,326 |
| Flipkart | COMHKNVTFMWCEXW3 | Acer Aspire 3 | Live ₹51,490 vs card ₹47,140 |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 4 new slugs plus the synced #4793, **HTTP 200 for 8 URLs** (5 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.34s) |
| /offers | 200 (0.19s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.68s) |
| /marwar-seth-premium-afghani-anjeer-dried-figs-1kg-b0hpfd26b2 | 200 (0.23s) |
| /xtrim-protekt-bike-riding-gloves-men-black-red-large-b0c1nzzp5h | 200 (0.21s) |
| /polycab-wizzy-plus-bldc-1200mm-5-star-ceiling-fan-remote-b0h9ym9d23 | 200 (0.20s) |
| /fort-collins-hooded-tailored-jacket-44230710 | 200 (0.29s) |
| /havells-prolife-stellar-chef-air-fryer-5-5l | 200 (0.24s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 20:52 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,262 = 16,262 (+4) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,871 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,867 vs 16,871 | OK. The cursor has drained TG 18u's 2 rows; the 4 rows pushed this tick are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j. Repoint the slot if all of 11-19 resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** the PDP read stays mandatory for dup rows.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 20:52, DEAL-INGEST 20:53, TG 21:03, DESIDIME 22:43. On 11-19: CONTENT-SEO 00:39, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
