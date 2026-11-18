# TELEGRAM-DEAL-MONITOR tick — 2026-11-18t

The tick read the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the logged-in Playwright richDeals profile with one `browser_evaluate`, covering the groups in `data/tg-groups.json`. Shortlinks were resolved with curl before any productId was read. Each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId. Amazon prices were read with a same-origin fetch of the PDP in the logged-in Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, `data-old-hires` image, MRP in the core block). The Shopsy PDP was fetched with curl and read from its `pricing` JSON, because Shopsy serves no ld+json. Run at about 19:00–19:07 IST.

**Result: 3 deals pushed LIVE (#16833 to #16835): 2 Amazon and 1 Shopsy. The bulk endpoint returned HTTP 201 with count 3, all `created:true`, so no slug restore was needed. The readback shows all 3 LIVE. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| CoolzTricks | amzn.to/4zqOhOE | Shimmer Dishwash Gel 5L (B0FCCBQHDF) | Pushed |
| ONLINE SHOPPING DEALS | B0432S3zN | Park Avenue Good Morning After Shave 100ml (B075KM119J) | Pushed |
| SB Loots | bittli.in/5Vqq45d0 | KAYAYURVEDA aloe gel + rose water combo (Shopsy CBKGY63CGYMGKFSY) | Pushed |
| Dealdost | amzn.to/4zqew7K | SWAGR innerwear loot | Skipped: category post |
| Rogerkart | rogerkart.com/r/qYnrgcg | PUMA winterwear | Skipped: category post |
| NonStopDeals | dyoEV7uuuN | Caprese | Skipped: already seen, category |
| Dealzone | B0bnMKk61 | FILA | Skipped: already seen |
| INDIAN CHEAP DEALS | — | LG washing machine | Skipped: already seen; LIVE as #5035 at ₹20,990 |
| Hidden Loot, IFS Tips | — | Swiggy Dineout | Skipped: not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | — | Not rendered in the sidebar; no new top message |

Seen list: 8 keys appended, now 5,390 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16833 | Amazon | B0FCCBQHDF | Shimmer Dishwash Gel 5L Family Pack (Lemon) | ₹259 | ₹450 (42% off) |
| 16834 | Amazon | B075KM119J | Park Avenue Good Morning After Shave Lotion for Men, 100ml | ₹112 | ₹225 (50% off) |
| 16835 | Shopsy | CBKGY63CGYMGKFSY | KAYAYURVEDA Aloevera Gel 150ml + Rose Water Toner 100ml Combo | ₹135 | ₹498 (73% off) |

- **Verification:** both Amazon PDPs showed the channel price, in stock, with the add-to-cart button present (Shimmer sold by RK World Infocom; Park Avenue showed "Only 1 left in stock (more on the way)"). The Shopsy `pricing.finalPrice` read ₹135 against an MRP of ₹498 (73% off, under the 80% rule), with no sold-out widget.
- **Affiliate matrix:** Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Shopsy is not Flipkart, so it went through Cuelinks (`linksredirect.com/?cid=527&source=linkkit&url=<encoded clean PDP>`).
- **Images:** `m.media-amazon.com` hi-res for the Amazon rows and `rukminim3.flixcart.com` for Shopsy. No channel images were used.
- **Copy:** titles and descriptions were written fresh; no channel text was copied.

## Rejected

None on the PDP. All skips are listed above.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 slugs, **HTTP 200 for 6 URLs** (3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.20s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.67s) |
| /shimmer-dishwash-gel-5l-family-pack-lemon-b0fccbqhdf | 200 (0.21s) |
| /park-avenue-good-morning-after-shave-lotion-for-men-100ml-b075km119j | 200 (0.21s) |
| /kayayurveda-aloevera-gel-150ml-rose-water-toner-100ml-combo-cbkgy63cgymgkfsy | 200 (0.20s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 19:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,256 = 16,256 (+3) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,835 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,832 vs 16,835 | OK. The 3 rows pushed this tick are waiting for the external broadcast cron. |
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

CronList next runs (IST, 11-18): INDEXNOW 19:07, SITEMON 19:50, TG 20:03, DESIDIME 20:43, DEAL-INGEST 20:53. On 11-19: CONTENT-SEO 00:39, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
