# TELEGRAM-DEAL-MONITOR tick — 2026-11-18x

The tick read the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the logged-in Playwright richDeals profile with one `browser_evaluate`, covering the groups in `data/tg-groups.json`. Shortlinks (`link.amazon`, `bittli.in`, `bitl.in`) were resolved with curl before any productId was read. Each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId. Amazon prices were read with a same-origin fetch of the PDP in the logged-in Amazon tab (`.a-price-whole` in the core price block, `#availability`, the add-to-cart button, `data-old-hires` image, M.R.P. from `.basisPrice`). The Shopsy PDP has no ld+json, so it was read from its `finalPrice` / `mrp` JSON and the absence of the Sold Out widget. Run at about 23:05–23:35 IST.

**Result: 2 deals pushed LIVE (#16882, #16883): 1 Amazon and 1 Shopsy. The bulk endpoint returned HTTP 201 with count 2, both `created:true`, so no slug restore was needed. One candidate was rejected for price drift. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 on 9 of 9 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| ONLINE SHOPPING DEALS | link.amazon → B0H2SF8CL7 | Arshan pure iron hammered kadhai, 9 inch | Pushed |
| (sidebar) | bittli.in / bitl.in → Shopsy QUNGGYSX2H3XAHGH | Sammyimpact Ninki Fresh spoon set, pack of 24 | Pushed |
| (sidebar) | link.amazon → B0B5XQMLJM | Milton Pro Cook 5-piece cookware set | Rejected: PDP ₹1,994 vs channel ₹1,555 |
| (sidebar) | link.amazon → B0FD3MCMTH | Casio watch | Skipped: already in the seen list |
| Dealdost | — | La-Fetch bundle | Skipped: collection page, not a single product |
| Dealzone, NonStopDeals | — | Lotto, Caprese | Skipped: category posts |
| Rogerkart | — | Urban Barber serum | Skipped: already LIVE as #16874 |
| Hidden Loot, IFS Tips | — | Swiggy | Skipped: not a product |
| INDIAN CHEAP DEALS | — | LG washing machine | Skipped: already LIVE as #5035 |

Seen list: 7 keys appended, now 5,415 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16882 | Amazon | B0H2SF8CL7 | Arshan Pure Iron Hammered Kadhai, 9 inch (22cm) | ₹297 | null |
| 16883 | Shopsy | QUNGGYSX2H3XAHGH | Sammyimpact Ninki Fresh Stainless Steel Spoon Set, Pack of 24 | ₹148 | null |

- **Verification:** the kadhai PDP read ₹297, equal to the channel, in stock with add-to-cart (seller YOZE HUB, 4.2★ from 12). The Shopsy PDP read `finalPrice` ₹148 with no Sold Out widget (3.8★ from 19,517).
- **80% rule:** MRP and discountPct are null on both rows. The kadhai's M.R.P. of ₹2,999 would mean 90% off; the spoon set's ₹799 would mean 81% off.
- **Affiliate matrix:** Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Shopsy goes through Cuelinks (`linksredirect.com/?cid=527&source=linkkit&url=<encoded clean URL>`), and the row uses store slug `shopsy`, the same as earlier Shopsy rows (#16867, #16835, #16831).
- **Images:** `m.media-amazon.com` hi-res for Amazon and `rukminim2.flixcart.com` for Shopsy. No channel images were used.
- **Copy:** titles and descriptions were written fresh from verified facts only. Every ₹ in a title matches the row's `price`, and the push script checked this before the POST. The kadhai copy carries the iron-cookware seasoning and rust note.

## Rejected

| Store | productId | Product | Reason |
|---|---|---|---|
| Amazon | B0B5XQMLJM | Milton Pro Cook 5-piece cookware set | PDP ₹1,994 vs channel ₹1,555 (drift) |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 2 new slugs, **HTTP 200 for 5 URLs** (2 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.31s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.27s) |
| /llms.txt | 200 (0.58s) |
| /arshan-pure-iron-hammered-kadhai-9-inch-22cm-b0h2sf8cl7 | 200 (0.18s) |
| /sammyimpact-ninki-fresh-stainless-steel-spoon-set-24-pcs-qunggysx2h3xahgh | 200 (0.21s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 23:35 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,275 = 16,275 (+2) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,883 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,881 vs 16,883 | OK. The 2 rows pushed this tick are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l. Repoint the slot if all of 11-19 resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`, or unverified feature claims.
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

CronList next runs (IST): SITEMON 23:50 on 11-18. On 11-19: TG 00:03, CONTENT-SEO 00:39, DESIDIME 00:43, DEAL-INGEST 00:53, INDEXNOW 01:05, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
