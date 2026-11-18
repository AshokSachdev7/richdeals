# TELEGRAM-DEAL-MONITOR tick — 2026-11-18q

The tick read the Telegram Web sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over `.chat-list .ListItem.Chat`, in the Playwright `richDeals` profile. Shortlinks were resolved, and every Amazon candidate was verified with a same-origin fetch of the PDP in the logged-in Amazon tab. That fetch read the core price block, `#availability`, the add-to-cart button and the hiRes image. Run at about 15:55–16:10 IST.

**Result: 2 deals pushed LIVE (#16811, #16812), both Amazon, plus 1 price-sync on an existing page (#16768 Lumio Arc 5, ₹11,000 → ₹5,500). The bulk endpoint returned HTTP 201 with count 2 (both `created:true`), and the readback shows both LIVE. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 9 of 9 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| ONLINE SHOPPING DEALS | link.amazon/B01gYjiO4 | Turtle Wax Super Hard Shell liquid car wax, 473 ml (B0009JKGEM) | **Pushed as #16811.** |
| CoolzTricks | amzn.to/4kiOoIl | Solimo multipurpose glass 120 ml, set of 6 (B07P5Z6H7W) | **Pushed as #16812.** |
| Rogerkart | rogerkart.com/r/5EmyAcQ | Lumio Arc 5 projector (B0FF5H4PGD) | Already LIVE as #16768. The repost meant the price had moved, so the page was price-synced in place (see below). |
| Dealzone | link.amazon/B0fpyhw7D | French Connection watches | Skipped: resolves to `/s?k=french+connection+watch`, a search page. |
| SB Loots | wv42ndO, l3tD5an, WiCtfMh | Ajio category links | Skipped: category posts. |
| Dealdost, NonStopDeals, INDIAN CHEAP DEALS, Hidden Loot, IFS Tips | — | — | Unchanged since 18p; category or non-product posts. |
| RichDeals | — | Our own channel | Skipped. |

The Rogerkart `/r/` link redirects with JavaScript rather than an HTTP 302, so its Amazon target was taken from the `amazon.in/dp/` URL in the page HTML.

The seven new shortlink keys were added to `data/tg-multi-seen.json`, which now holds 5,373 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16811 | Amazon | B0009JKGEM | Turtle Wax Super Hard Shell Finish Liquid Car Wax, 473 ml | ₹356 | — (nulled) |
| 16812 | Amazon | B07P5Z6H7W | Solimo Multipurpose Glass 120 ml, Set of 6 | ₹397 | — (none listed) |

- **Verification:** both rows were In stock with an add-to-cart button.
- **Turtle Wax MRP:** the PDP's struck-through figure was ₹75.26, a per-unit rate below the price, so the MRP was nulled. The page shows the price with no discount claim.
- **Images:** from `m.media-amazon.com`.
- **Affiliate links:** `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
- **Copy:** titles and descriptions were written fresh; no channel text was copied.

## Price-sync: #16768 Lumio Arc 5

| Field | Before | After |
|---|---|---|
| price | ₹11,000 | ₹5,500 |
| mrp | ₹39,999 | null |
| discountPct | 72 | null |
| title | "… @ ₹11,000 (72% Off) – Amazon" | "Lumio Arc 5 Portable Projector with Google TV @ ₹5,500 – Amazon" |

- **PDP read:** ₹5,500, "Only 2 left in stock", add-to-cart present, sold by a third-party seller and fulfilled by Amazon.
- **Why the MRP was nulled:** the PDP shows an MRP of ₹5,50,000, which is a seller typo. The old ₹39,999 would imply 86% off, over the 80% rule.
- **Method:** a direct `prisma.deal.update` on price, mrp, discountPct, title and description, so the slug stays unchanged. A bulk upsert would have rewritten it. The description was rewritten at ₹5,500 with no MRP claim. A `priceHistory` row `{dealId: 16768, price: 5500}` was created, so the Offer gets a fresh `priceValidUntil`.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs and the Lumio slug, **HTTP 200 for 6 URLs** (the 3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.63s) |
| /turtle-wax-super-hard-shell-finish-liquid-car-wax-473-ml-b0009jkgem | 200 (0.34s) |
| /lumio-arc-5-portable-projector-google-tv-b0ff5h4pgd | 200 (0.26s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 16:10 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,232 = 16,232 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,812 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,810 vs 16,812 | OK. #16811 and #16812 are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 16:10 IST) | OK |

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
- **#16768 Lumio (new):** only 2 units left at ₹5,500 from a third-party seller. If the next repost or sweep finds no buy box, mark it per the no-buy-box rule.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): DESIDIME 16:43, SITEMON 16:50, DEAL-INGEST 16:53, TG 17:03, CONTENT-SEO 18:39, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
