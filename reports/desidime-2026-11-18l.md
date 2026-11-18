# DESIDIME-INGEST tick — 2026-11-18l

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage without fetching per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were verified with a same-origin fetch of the PDP in the logged-in Playwright Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, `data-old-hires` image, M.R.P. from `.basisPrice`). Non-Amazon candidates were verified through `productLd()` (ld+json price within ±₹1, InStock). Each candidate was deduped by productId against the live DB, and dup LIVE rows were re-read on the PDP for a price sync. Run at about 22:43–23:00 IST.

**Result: 7 deals pushed LIVE (#16875 to #16881): 4 Myntra and 3 Amazon. The bulk endpoint returned HTTP 201 with count 7, all `created:true`, so no slug restore was needed. Four dup LIVE rows were price-synced, and one of them (#274) was revived from EXPIRED. IndexNow returned HTTP 200 for 14 URLs. Prod returned 200 on 15 of 15 endpoints and every CEO-audit check is green.**

## Stage 1

| Measure | Value |
|---|---|
| Cards discovered | 36 |
| Resolved to a merchant URL | 27 |
| Dups of LIVE rows | 8 |
| Skipped as rejected in the last 24h | 9 |
| Fresh candidates | 10 |

Rejected-in-24h skips: Flipkart NDFGRK5DRJUZ38ZA (cashews), APFHS6VSJJKZBSZW (Coway), TABH33EKYNNPKGGY (REDMI Pad SE), CBKHEPQZ8ARJZHGG (Dettol); Amazon B0GHQVNMKQ (Panasonic AC), B0HCZJTD61 (JBL PartyBox), B0DB63LKMG (Godrej fridge), B0DHVPD75Y (Lenovo Tab K11), B09YV753WH (VIP vest).

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16875 | Myntra | 47444854 | Fitin Outfit Women Printed Night Suit | ₹483 | null |
| 16876 | Myntra | 45617721 | Fitin Outfit Women Night Suit | ₹672 | ₹2,499 (73% off) |
| 16877 | Myntra | 46608981 | Mountain Colours Women Windcheater Woven Jacket | ₹923 | ₹1,899 (51% off) |
| 16878 | Myntra | 44949558 | Decathlon Women Colourblocked Lightweight Padded Jacket | ₹1,749 | ₹2,099 (17% off) |
| 16879 | Amazon | B0H5JP13YR | Footloose by Skybags Nomad 26L Laptop Backpack, 15.6", Black | ₹302 | null |
| 16880 | Amazon | B0DWSHN6VQ | Ant Esports GHOST 50 RGB Gaming Mouse, White, 12800 DPI | ₹399 | null |
| 16881 | Amazon | B0BLK1F584 | Boldfit Woolen Winter Cap, Unisex | ₹329 | ₹1,599 (79% off) |

- **Verification:** the four Myntra pages returned ld+json prices equal to the card, InStock. The three Amazon PDPs matched the card price, showed in stock, and had the add-to-cart button. Sellers and ratings: Footloose from RetailEZ, 3.7★ (65); Ant Esports from Kay Kay Overseas, 4.4★ (161); Boldfit from Cocoblu Retail, 4.1★ (6,038).
- **80% rule:** MRP and discountPct are null on #16875 (₹2,499 would be 81% off), #16879 (89%) and #16880 (80%).
- **Affiliate matrix:** Myntra went through InRDeals (`inr.deals/track?id=inr678975705&src=merchant-detail-backend&campaign=cps&url=<encoded clean URL>`), not Cuelinks. Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
- **Images:** `assets.myntassets.com` for Myntra and `m.media-amazon.com` hi-res for Amazon. No DesiDime images were used.
- **Copy:** titles and descriptions were written fresh from verified facts only; every ₹ in a title matches the row's `price`, and the push script checked this before the POST. Every howTo has 4 steps.

## Price-synced

| id | Product | Now | MRP |
|---|---|---|---|
| 16872 | Panasonic 5W Deep Junction LED Downlighter | ₹109 (71% off) | ₹380 |
| 16677 | Sparkmate Crystal Kitchen Squeezy Wiper | ₹50 (58% off) | ₹120 |
| 219 | Creative's Gift Pack (Ludo, Snakes & Ladders) | ₹145 (77% off) | ₹620 |
| 274 | Ambrane Gaming Mouse Pad, 7.5 x 9 inch | ₹99 | null |

Each sync used `prisma.deal.update` and wrote a priceHistory row, so the Offer gets a fresh priceValidUntil. No slug changed. #274 was EXPIRED but is back in stock with add-to-cart, so it was revived (status LIVE, `expiresAt` null). Its M.R.P. implies more than 80% off, so MRP stays null. Its earlier copy claimed a cloth top and an anti-slip base, which this tick had not verified; the title and description were rewritten to the verified size, price and stock before the IndexNow ping.

Unchanged (PDP equals the DB row): #4927 Bouncefit ₹499 with MRP null; #174 Shimmer ₹495 / ₹1,800; #16816 PunnkFunnk ₹799 / ₹2,999; #16561 Eureka ₹3,599 (Flipkart, InStock).

## Rejected

| Store | productId | Product | Reason |
|---|---|---|---|
| Amazon | B0DN1TVYM3 | Boldfit gloves | PDP ₹279 vs card ₹271 |
| Amazon | B0FKH7H1D2 | AutokraftZ gloves | PDP ₹149 vs card ₹145 |
| Other | visit id d7f7e7c08db3 | Apple Watch Series 11 | No ld+json on the merchant page |

All three are in `data/dd-rejected.json` (now 2,109 keys).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 7 new slugs plus the 4 synced slugs, **HTTP 200 for 14 URLs** (11 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.18s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.21s) |
| /llms.txt | 200 (0.68s) |
| /fitin-outfit-women-printed-night-suit-47444854 | 200 (0.20s) |
| /fitin-outfit-women-night-suit-45617721 | 200 (0.40s) |
| /mountain-colours-women-windcheater-woven-jacket-46608981 | 200 (0.23s) |
| /decathlon-women-colourblocked-lightweight-padded-jacket-44949558 | 200 (0.20s) |
| /footloose-skybags-nomad-26l-laptop-backpack-15-6-black-b0h5jp13yr | 200 (0.21s) |
| /ant-ghost-50-rgb-gaming-mouse-white-12800-dpi-b0dwshn6vq | 200 (0.21s) |
| /boldfit-woolen-winter-cap-unisex-b0blk1f584 | 200 (0.19s) |
| /ambrane-mouse-pad-7-5-x-9-inches-for-gaming-mouse-pad-compa-B0CZDJ | 200 (0.23s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 23:00 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,273 = 16,273 (+8: 7 new, 1 revived) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,881 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,874 vs 16,881 | OK. The cursor has drained TG 18w's 3 rows; the 7 rows pushed this tick are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j. Repoint the slot if all of 11-19 resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`, or unverified feature claims (#274 was fixed this tick).
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** the PDP read stays mandatory for dup rows. This tick, 4 of 8 dups needed a sync.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST): DEAL-INGEST 22:54, SITEMON 22:54 and TG 23:03 on 11-18. On 11-19: CONTENT-SEO 00:39, DESIDIME 00:43, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
