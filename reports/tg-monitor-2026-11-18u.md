# TELEGRAM-DEAL-MONITOR tick — 2026-11-18u

The tick read the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the logged-in Playwright richDeals profile with one `browser_evaluate`, covering the groups in `data/tg-groups.json`. Shortlinks were resolved with curl before any productId was read. Each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId. Amazon prices were read with a same-origin fetch of the PDP in the logged-in Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, `data-old-hires` image, M.R.P. from `.basisPrice`). The Shopsy PDP was fetched with curl and read from its main `pricing` JSON, because Shopsy serves no ld+json. Run at about 20:03–20:20 IST.

**Result: 2 deals pushed LIVE (#16866, #16867): 1 Amazon and 1 Shopsy. The bulk endpoint returned HTTP 201 with count 2, both `created:true`, so no slug restore was needed. One dup repost repriced an existing LIVE page (#7683, ₹1,899 → ₹1,499). IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| CoolzTricks | amzn.to/4AFHr93 | Wonderchef Vista Plus Mixer Grinder 500W (B0GV3Z8FGQ) | Dup of LIVE #7683; repriced on the PDP read |
| Dealzone | link.amazon/B03PJJksi | Livon Hair Serum 200ml (B0C6XT96MC) | Pushed |
| SB Loots | bittli.in/esCnGQBG | Aroma NB121 Pods earbuds (Shopsy ACCH77MF4NYVHZTE) | Pushed |
| Dealdost | — | SWAGR innerwear loot | Skipped: category post |
| Rogerkart | — | PUMA winterwear | Skipped: category post |
| ONLINE SHOPPING DEALS | — | Park Avenue after shave | Skipped: already LIVE as #16834 |
| INDIAN CHEAP DEALS | — | LG washing machine | Skipped: already LIVE as #5035 |
| NonStopDeals | — | Caprese | Skipped: category post |
| Hidden Loot, IFS Tips | — | Swiggy Dineout | Skipped: not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | — | Not rendered in the sidebar; no new top message |

Seen list: 5 keys appended, now 5,395 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16866 | Amazon | B0C6XT96MC | Livon Hair Serum for Dry and Frizzy Hair, 200ml | ₹236 | ₹550 (57% off) |
| 16867 | Shopsy | ACCH77MF4NYVHZTE | Aroma NB121 Pods TWS Earbuds, 40H Playtime | ₹300 | ₹1,299 (76% off) |

Repriced: **#7683** Wonderchef Vista Plus Mixer Grinder 500W, 3 Jars — the PDP read ₹1,499 against M.R.P. ₹4,000 (63% off, in stock, add-to-cart present). The row carried ₹1,899 (53% off). Price, discountPct, title and description were updated with `prisma.deal.update`, and a priceHistory row was written so the Offer gets a fresh priceValidUntil. The slug did not change.

- **Verification:** the Livon PDP showed ₹236, in stock, with add-to-cart. The first MRP read (₹118.00) was the per-unit rate in `.a-text-price`; the real M.R.P. of ₹550 came from `.basisPrice`. The Shopsy `pricing.finalPrice` read ₹300 against an MRP of ₹1,299 (76% off, under the 80% rule), with no sold-out text. A first regex had picked up MRPs from other listings on the page (₹2,499, ₹999); the main `pricing` object was used instead.
- **Affiliate matrix:** Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Shopsy is not Flipkart, so it went through Cuelinks (`linksredirect.com/?cid=527&source=linkkit&url=<encoded clean PDP>`).
- **Images:** `m.media-amazon.com` hi-res for Livon and `rukminim3.flixcart.com` for Shopsy. No channel images were used.
- **Copy:** titles and descriptions were written fresh; every ₹ in a title matches the row's `price`. The Aroma copy states its modest rating (about 3.3 stars from roughly 30,000 ratings).

## Rejected

None on the PDP. All skips are listed above.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs plus the repriced #7683, **HTTP 200 for 6 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.18s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.22s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.78s) |
| /livon-hair-serum-dry-frizzy-hair-200ml-b0c6xt96mc | 200 (0.24s) |
| /aroma-nb121-pods-tws-earbuds-40h-playtime-acch77mf4nyvhzte | 200 (0.23s) |
| /wonderchef-vista-plus-mixer-grinder-500w-3-jars | 200 (0.22s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 20:20 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,258 = 16,258 (+2) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,867 | OK. Ids 16,836 to 16,865 hold no rows: the autoincrement sequence skipped them, and no deal was lost (LIVE rose by exactly the 2 pushed here). |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,835 vs 16,867 | OK. The 2 rows pushed this tick are waiting for the external broadcast cron. |
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

CronList next runs (IST, 11-18): DESIDIME 20:43, SITEMON 20:50, DEAL-INGEST 20:53, TG 21:03. On 11-19: CONTENT-SEO 00:39, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
