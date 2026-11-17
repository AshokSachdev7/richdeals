# TELEGRAM-DEAL-MONITOR tick — 2026-11-18d

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Each group's newest post was checked against `data/tg-multi-seen.json` and the live DB. Run at about 03:00–03:04 IST.

**Result: 0 new deals pushed, because the sidebar held 0 fresh candidates. Every newest post was already seen, older than the last tick, or not a deal. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | 02:34, notification-settings promo | Not a deal |
| CoolzTricks | 12:53 AM, `amzn.to/3UXi57w` (Athom towels) | Already seen; LIVE as #16773 |
| Dealzone | 12:39 AM, `link.amazon/B014F5Z01` | Already seen; resolves to a search page |
| Dealdost | Tue, EUCOS tripod post: `amzn.to/4aA0XJF` and `amzn.to/4vERk4K` (B0GCHZ4QF9) | Already seen; rejected in TG 11-18c for a code-only price |
| RichDeals | Own channel | Skipped |

Older sidebar posts, all from before the last tick: Rogerkart (Lavie, 11:18 PM), ONLINE SHOPPING DEALS (Outsup, 10:05 PM), INDIAN CHEAP DEALS (Oct 29), NonStopDeals (Oct 5), Hidden Loot and IFS Tips (Swiggy, Wed).

`data/tg-multi-seen.json` is unchanged at 5,339 entries.

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.86s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.68s) |

## CEO audit

Run at 03:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~03:04 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **IFS redirector:** dead at g through n (8 ticks), after a 7 of 93 partial at f. Probe-only until the end of 11-18 IST, then repoint if no 11-18 tick resolved.
- **Telegram yield:** overnight, 0 fresh single-product links this tick; the last fresh one (TG 11-18c) carried a code-only price.
- **DesiDime yield:** 0 fresh candidates in 11-18b; the feed is recycling cards already rejected or LIVE.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:** unchanged from DESIDIME 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 04:03 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
