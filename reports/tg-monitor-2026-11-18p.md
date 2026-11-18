# TELEGRAM-DEAL-MONITOR tick — 2026-11-18p

The tick read the Telegram Web sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over `.chat-list .ListItem.Chat`, in the Playwright `richDeals` profile. Shortlinks were resolved and the one non-Amazon candidate was verified against the merchant's own Shopify product JSON. Run at about 15:00–15:06 IST.

**Result: 1 deal pushed LIVE (#16810, Noise Buds Uno on gonoise.com, through Cuelinks). The bulk endpoint returned HTTP 201 with count 1 (`created:true`), and the readback shows it LIVE. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 on 8 of 8 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| Rogerkart (14:50) | bilty.co/nNoQAs | Noise Buds Uno TWS, "2 @ ₹1,999 (₹999 each) with code UNO2" | **Pushed as #16810** at the verified single-unit price of ₹1,399 (see below). |
| Dealzone (15:00) | link.amazon/B06r7TcuV | Nayasa products, "up to 81% off" | Skipped: resolves to `/s?k=Nayasa`, a search page. |
| SB Loots (14:57) | amazn.lt/J518dz3I | French Connection watches | Skipped: resolves to `/s?k=french+connection+watch`. |
| CoolzTricks (14:24) | amzn.to/4iU3IZy | Nayasa products | Skipped: resolves to `/s?k=Nayasa`. |
| ONLINE SHOPPING DEALS (14:48) | — | Active Pain Relief Cream | Already LIVE as #16805 (DESIDIME 18h). |
| Dealdost, NonStopDeals, INDIAN CHEAP DEALS, Hidden Loot, IFS Tips | — | — | Unchanged since 18o; category or non-product posts. |
| RichDeals | — | Our own channel | Skipped. |

The four new shortlink keys were added to `data/tg-multi-seen.json`, which now holds 5,366 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16810 | Noise (gonoise.com) | 7372520423511 | Noise Buds Uno Truly Wireless Earbuds | ₹1,399 | ₹3,499 (60% off) |

- **Verification:** `gonoise.com/products/noise-buds-uno-truly-wireless-earbuds.js` (Shopify product JSON) gave ₹1,399 against ₹3,499 compare-at for all three variants (Ebony, Navy and Ivory Grain), each `available: true`. The ld+json Product block on the PDP carried the name and image but no offer price, so the Shopify JSON was the price read.
- **Why ₹1,399 and not ₹999:** the post's ₹999 is an effective per-unit price that needs code UNO2 and 2 units in the cart. Neither the code nor the bundle price appears on the PDP, so it could not be verified. The page lists the verified single-unit price. The code goes in `couponNote` and the howTo, marked as reported but not confirmed.
- **Affiliate:** Cuelinks (`linksredirect.com/?cid=527&source=linkkit&url=<encoded clean PDP>`), per the ALL STORES matrix.
- **Image:** the variant image from `cdn.shopify.com`, which is the merchant's own CDN.
- **New store:** the push created store row #508 "Noise" (slug `noise`). No Noise deals existed before this one.
- **Copy:** title and description were written fresh; no channel text was copied.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 1 new slug, **HTTP 200 for 4 URLs** (the slug and the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.43s) |
| /offers | 200 (1.14s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.64s) |
| /noise-buds-uno-truly-wireless-earbuds-7372520423511 | 200 (0.22s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 15:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,230 = 16,230 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,810 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,809 vs 16,810 | OK. #16810 is waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 15:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 85 resolved at DEAL-INGEST 18h. If the 16:53 and 18:53 IST ticks also resolve 0, the IFS cron slot gets repointed to another source at the 18:53 tick.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 15:50, TG 16:03, DESIDIME 16:43, DEAL-INGEST 16:53, CONTENT-SEO 18:39, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
