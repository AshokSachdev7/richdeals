# TELEGRAM-DEAL-MONITOR tick — 2026-11-18c

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. The sidebar preview for Dealdost was truncated, so the chat was opened with a trusted click and its latest messages were read in full. Shortlinks were resolved with curl. Each result was deduped against `data/tg-multi-seen.json` and the live DB. The Amazon candidate was read in the logged-in Amazon tab with an in-tab fetch (price from `#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` and the add-to-cart button). The Flipkart dup was read from the PDP's ld+json in a Playwright tab. Run at about 02:03–02:07 IST.

**Result: 0 new deals pushed. The one fresh single-product link (EUCOS tripod) was rejected for price drift, because the post's price needs a promo code. One unseen Flipkart repost matched LIVE deal #16561, and its price was re-confirmed unchanged. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Post | Outcome |
|---|---|---|
| Dealdost | `amzn.to/4vERk4K` → EUCOS 62" phone tripod + selfie stick with remote (B0GCHZ4QF9; source tag `7383-21` stripped) | **Rejected: price drift.** Not in seen or the DB. The post said ₹2,092 with code `2BPLQVVY`; the PDP reads ₹2,299 (M.R.P. ₹3,399), in stock with add-to-cart present. The ₹2,092 figure is a code-only price, so it is not the price a shopper sees. |
| Dealdost | `fkrt.it/Sqo827uuuN` → Eureka Forbes Aeroguard AP 175 air purifier (Flipkart `APFHR9VZEUZEJZJV`) | **Dup of LIVE #16561.** Re-read on the PDP: ld+json ₹3,599, InStock, matching the DB. No update needed. |
| Dealdost | `fktr.in/LWX0dcG` plus 9 `fkrt.cc` brand links | Rejected: multi-product shoe loot |
| Dealdost | `amzn.to/4C6Y7aS`, `amzn.to/4zRdQcQ` | Already seen; both resolve to `/s?` search pages |

Older or already-seen sidebar posts: CoolzTricks (towels, #16773), Dealzone and SB Loots (search pages), Rogerkart, INDIAN CHEAP DEALS (LG), NonStopDeals (Caprese), ONLINE SHOPPING DEALS (Outsup), Hidden Loot and IFS Tips (Swiggy). Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not rendered in the virtualized sidebar; their newest posts are older.

`data/tg-multi-seen.json` gained 4 entries (3 links plus 1 ASIN) and now holds 5,339.

## Freshness

- **IndexNow:** not run. Nothing was pushed, and #16561 was confirmed at its existing price, so no page changed.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.21s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.61s) |

## CEO audit

Run at 02:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~02:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through m, after a 7 of 93 partial at f. If the remaining 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Telegram yield:** this tick's only fresh single-product link carried a code-only price; search pages, loots and code prices dominate the overnight feed.
- **DesiDime yield:** Amazon cards are showing bank-offer or coupon prices.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil (#16561 is now one more same-price confirm).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#3542:** price moved from ₹765 to ₹1,499; re-read it on the next dup hit.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:** unchanged from TG-MONITOR 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 03:03 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
