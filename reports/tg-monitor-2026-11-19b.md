# TELEGRAM-DEAL-MONITOR tick — 2026-11-19b

The tick read the Telegram Web sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`. It extracted single-product deals from any store, resolved shortlinks, and deduped against `data/tg-multi-seen.json` and live DB productIds. The price was verified on the Amazon PDP through a same-origin fetch in the logged-in tab. Run at about 01:03–01:06 IST.

**Result: 1 deal pushed LIVE (#16886, Fastrack watch). The bulk endpoint returned HTTP 201 with count 1 and `created:true`, so no slug restore was needed. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 8 of 8 endpoints and every CEO-audit check is green.**

## Sidebar (10 of 13 groups rendered)

| Group | Newest post | Action |
|---|---|---|
| Dealzone | Jack & Jones 70-80% off (`link.amazon/B05eYK2TK`) | Skipped: brand sale, not a single product |
| CoolzTricks | Bata up to 84% off, Jack & Jones 70-80% off | Skipped: brand sales |
| SB Loots And Deals | "Apply coupon on Havells products" (`amazn.lt/x57x0JLh`) | Skipped: multi-product coupon post |
| Rogerkart Deals | Fastrack watch @ ₹1,182 (`rogerkart.com/r/2879PkR`) | **Pushed** |
| Dealdost | TomHill perfume pack of 3 (`bitl.in/hTBRN6D`) | Already seen |
| ONLINE SHOPPING DEALS | Iron kadhai ₹297 (22:23) | Handled by an earlier tick |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout voucher | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale (Oct 29) | Skipped: sale hub, stale |
| NonStopDeals | Caprese handbags up to 90% off (Oct 5) | Skipped: category, stale |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not in the rendered part of the list, which means they have had no recent post.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16886 | Amazon | B0HDC3978Q | Fastrack 9 to Fine quartz analog metal strap watch for men | ₹1,182 | ₹3,195 (63% off) |

- **Resolve:** the Rogerkart shortlink does not redirect over HTTP; the page body carries `amazon.in/dp/B0HDC3978Q?tag=rogerkart-21`. Their tag was stripped.
- **Verification:** the PDP read ₹1,182 from `.a-price-whole` in the core price block, equal to the channel price, so it is not a post-coupon figure. In stock, add-to-cart present, seller VRP Telematics. M.R.P. ₹3,195 from `.basisPrice`.
- **Affiliate:** `/dp/B0HDC3978Q?th=1&psc=1&tag=ashoksachdev-21`.
- **Image:** `m.media-amazon.com/images/I/61IW0nLPCqL._SL1500_.jpg` (landing image hi-res).
- **Copy:** written fresh from verified facts only. The title's ₹ matches `price`, and the push script checked this before the POST.
- **Seen list:** 6 keys added (the shortlink, the ASIN and the 4 skipped sale links), bringing it to 5,424.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the new slug, **HTTP 200 for 4 URLs** (1 slug plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.50s) |
| /fastrack-9-to-fine-quartz-analog-metal-strap-watch-men-b0hdc3978q | 200 (0.25s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 01:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,279 = 16,279 (+1) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,886 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,885 vs 16,886 | OK. The row pushed this tick is waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up (201 on the push) | OK |
| Session crons vs roster | 9 of 9 at SITEMON 19a (00:57) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 at 18j, 18k, 18l and 19a. Repoint the slot if every 11-19 tick resolves 0.
- **DesiDime yield:** low, because the card price lags the PDP. The PDP read stays mandatory.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): INDEXNOW 01:05, SITEMON 01:50, DESIDIME 02:43, DEAL-INGEST 02:53, SCHEMA-AUDIT 04:39, SEO-AUDIT-FIX 05:58 and CONTENT-SEO 06:39. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
