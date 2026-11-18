# DESIDIME-INGEST tick — 2026-11-19a

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each `visit.desidime.com` link to the merchant URL. Non-Amazon candidates were verified through `productLd()` (ld+json price within ±₹1, InStock). Amazon candidates were read in the logged-in Playwright tab with a same-origin PDP fetch (`.a-price-whole` in the core price block, `#availability`, add-to-cart, `data-old-hires` image, M.R.P. from `.basisPrice`). Every candidate was deduped by productId against the live DB, and every dup LIVE row got a PDP read so its price could be synced. Run at about 00:45–01:15 IST.

**Result: 2 deals pushed LIVE (#16884, #16885), 1 Amazon and 1 Myntra. The bulk endpoint returned HTTP 201 with count 2, both `created:true`, so no slug restore was needed. One dup LIVE row was price-synced (#12328 Cello, ₹208 → ₹293). 9 candidates were rejected. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16884 | Amazon | B0DM63JQ9Q | Istyle women's ribbed zip-collar asymmetric hem top | ₹289 | ₹999 (71% off) |
| 16885 | Myntra | 30918417 | KLOTTHE women's sherpa hooded winter night suit | ₹649 | null |

- **Verification:**
  - **Istyle:** the PDP read ₹289, equal to the card, In stock with add-to-cart, seller Cocoblu Retail.
  - **KLOTTHE:** the Myntra ld+json read ₹649, InStock.
- **80% rule:** KLOTTHE's M.R.P. of ₹4,999 would mean 87% off, so its MRP and discountPct are null.
- **Affiliate matrix:**
  - Amazon uses `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
  - Myntra goes through InRDeals (`inr.deals/track?id=inr678975705…&url=<encoded clean URL>`).
- **Images:** `m.media-amazon.com` hi-res and `assets.myntassets.com`. No DesiDime images were used.
- **Copy:** titles and descriptions were written fresh from verified facts only. Every ₹ in a title matches the row's `price`, and the push script checked this before the POST.

## Dup LIVE rows (PDP re-read)

| id | productId | Product | DB price | PDP price | Action |
|---|---|---|---|---|---|
| 12328 | B07XY5LX2W | Cello melamine mug, set of 4 | ₹208 | ₹293 | Synced the price, discount (33%), title ₹ and image; wrote a priceHistory row. MRP ₹440 kept. |
| 4927 | B0H36MXL3V | Bouncefit MG-203 massage gun | ₹499 | ₹499 | None (the card's ₹389 is stale) |
| 174 | B0GZQBMXTZ | Shimmer Pro Max 10L toilet cleaner | ₹495 | ₹495 | None |
| 16816 | B0H4ZXDQHQ | PunnkFunnk gaming phone cooler | ₹799 | ₹799 | None |
| 219 | B009319D46 | Creative's gift pack | ₹145 | ₹145 | None (the card's ₹104 is stale) |

## Rejected

| productId | Product | Reason |
|---|---|---|
| B0GQVL28XJ | iPad Air M4 | No buy box |
| B0H1BVGRN2 | Orient Litpod lantern | PDP ₹556 vs card ₹541 (drift) |
| B0HPBQNPYY | iPad mini | PDP ₹82,900 vs card ₹77,650 (drift) |
| B0BKZVR1J8 | Cooler Master Storm controller | PDP ₹1,545 vs card ₹1,499 (drift) |
| B0GC5Q9DXF | FableStreet shirt | PDP ₹1,377 vs card ₹1,311 (drift) |
| B0HJBCGNFM | iPhone 18 Pro 256GB | PDP ₹160,990 vs card ₹153,990 (drift) |
| B0HK8R1B47 | Bajaj StyloHot 15L geyser | PDP ₹8,399 vs card ₹7,560 (drift) |
| B0CC5Y34CQ | Nexon EV sun shades | No buy box |
| B07L95GQTK | Miss Chase top | PDP ₹544 vs card ₹506 (drift) |

All 9 were added to `data/dd-rejected.json` with a `Date.now()` value, which brings it to 2,117 keys.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs plus the synced Cello slug, **HTTP 200 for 6 URLs** (3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.41s) |
| /offers | 200 (0.13s) |
| /blog | 200 (1.07s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.62s) |
| /istyle-women-ribbed-zip-collar-asymmetric-top-b0dm63jq9q | 200 (0.33s) |
| /klotthe-women-sherpa-hooded-winter-night-suit-30918417 | 200 (0.22s) |
| /cello-melamine-mug-set-of-4-200ml-b07xy5lx2w | 200 (0.18s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 01:15 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,278 = 16,278 (+2) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,885 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,883 vs 16,885 | OK. The 2 rows pushed this tick are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK. None recreated. |
| Local API on :4000 | Up (200) | OK. The "API down" note in content-seo 11-19a is resolved. |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l. Repoint the slot if every 11-19 tick resolves 0.
- **DesiDime yield:** 2 of 11 passed. 7 failed on drift, because the card price lags the PDP. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`, or unverified feature claims.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 00:54 |
| DEAL-INGEST | 00:54 |
| TG | 01:03 |
| INDEXNOW | 01:05 |
| DESIDIME | 02:43 |
| SCHEMA-AUDIT | 04:39 |
| SEO-AUDIT-FIX | 05:58 |
| CONTENT-SEO | 06:39 |

AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
