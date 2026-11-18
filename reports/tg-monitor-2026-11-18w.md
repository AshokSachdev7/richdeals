# TELEGRAM-DEAL-MONITOR tick — 2026-11-18w

The tick read the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the logged-in Playwright richDeals profile with one `browser_evaluate`, covering the groups in `data/tg-groups.json`. Shortlinks (`amzn.to`, `amazn.lt`, `fkrt.co`) were resolved with curl before any productId was read. Each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId. Amazon prices were read with a same-origin fetch of the PDP in the logged-in Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, `data-old-hires` image, M.R.P. from `.basisPrice`). The Flipkart PDP was read with a same-origin fetch in the logged-in Flipkart tab: ld+json `Product.offers` for price and availability, and the page's `ppd` JSON for MRP. Run at about 21:45–22:10 IST.

**Result: 3 deals pushed LIVE (#16872 to #16874): 2 Amazon and 1 Flipkart. The bulk endpoint returned HTTP 201 with count 3, all `created:true`, so no slug restore was needed. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| CoolzTricks | amzn.to/3WUIlzW | Panasonic 5W Deep Junction LED Downlighter, blue (B0F3XGNW1L) | Pushed |
| SB Loots | amazn.lt/xfRkwsvB | GUBB Eau De Parfum Party 25ml, men (B0DRKXR9QB) | Pushed |
| Rogerkart | fkrt.co/zuFJoP | Urban Barber Hair Growth Serum 30ml (Flipkart HSMHC5B8YFHUQVTZ) | Pushed |
| Dealzone | — | Signoraware | Skipped: category post |
| NonStopDeals | — | Caprese | Skipped: category post |
| INDIAN CHEAP DEALS | — | LG washing machine | Skipped: already LIVE as #5035 |
| Dealdost | — | Marwar Seth Anjeer | Skipped: already LIVE as #16868 |
| Hidden Loot, IFS Tips | — | Swiggy Dineout | Skipped: not a product |
| ONLINE SHOPPING DEALS | — | Old Spice Bearglove 3-in-1 Shower Gel 400ml | Skipped: the link is truncated in the sidebar preview |

Seen list: 8 keys appended, now 5,408 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16872 | Amazon | B0F3XGNW1L | Panasonic 5W Deep Junction LED Downlighter, Round, Blue (PDLM3405B-1) | ₹89 | ₹380 (77% off) |
| 16873 | Amazon | B0DRKXR9QB | GUBB Eau De Parfum Party for Men, 25ml | ₹173 | ₹345 (50% off) |
| 16874 | Flipkart | HSMHC5B8YFHUQVTZ | Urban Barber Hair Growth Serum, 3% Redensyl / 4% Anagain / 2% Procapil, 30ml | ₹190 | null |

- **Verification:** the Panasonic PDP read ₹88.77 against M.R.P. ₹380, in stock, with add-to-cart (seller ETrade Online, 4.2★ from 13). The row carries ₹89 because `price` is an integer; the channel said ₹88, which is inside ±₹1. The GUBB PDP read ₹173 against M.R.P. ₹345, in stock, with add-to-cart (seller RK World Infocom). The Urban Barber ld+json read ₹190, InStock, with free shipping. The `ppd` MRP of ₹1,499 implies 87% off, so the 80% rule keeps MRP and discountPct null.
- **Affiliate matrix:** Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Flipkart `/p/itm77f740be9ebc5?pid=HSMHC5B8YFHUQVTZ&affid=djhackraj`.
- **Images:** `m.media-amazon.com` hi-res for the Amazon rows and `rukmini1.flixcart.com` for Flipkart. No channel images were used.
- **Copy:** titles and descriptions were written fresh; every ₹ in a title matches the row's `price`, and the push script checked this before the POST. The GUBB copy states its thin rating base (only 2 ratings, about 3.5★). The Urban Barber copy states that returns are not permitted.

## Rejected

None on the PDP. All skips are listed above.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs, **HTTP 200 for 6 URLs** (3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.43s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.76s) |
| /panasonic-5w-deep-junction-led-downlighter-blue-b0f3xgnw1l | 200 (0.23s) |
| /gubb-eau-de-parfum-party-25ml-men-b0drkxr9qb | 200 (0.22s) |
| /urban-barber-hair-growth-serum-redensyl-anagain-30ml-hsmhc5b8yfhuqvtz | 200 (0.22s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 22:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,265 = 16,265 (+3) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,874 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,871 vs 16,874 | OK. The cursor has drained DESIDIME 18k's 4 rows; the 3 rows pushed this tick are waiting for the external broadcast cron. |
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

CronList next runs (IST, 11-18): DESIDIME 22:43, SITEMON 22:50, DEAL-INGEST 22:53, TG 23:03. On 11-19: CONTENT-SEO 00:39, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
