# TELEGRAM-DEAL-MONITOR tick — 2026-11-18g

The tick read the Telegram Web sidebar with one `browser_evaluate` in the Playwright tab (richDeals profile), covering the source groups in `data/tg-groups.json`. Each group's newest post was compared with the previous tick (TG 11-18f) and checked against `data/tg-multi-seen.json`. Run at about 06:12–06:15 IST.

**Result: 0 new deals pushed. No source group has posted since 02:34 IST, so the sidebar is identical to TG 11-18e/f and holds 0 fresh candidates. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | 02:34 AM, notification-settings promo | Not a deal (unchanged) |
| CoolzTricks | 12:53 AM, `amzn.to/3UXi57w` (Athom towels) | Already seen; LIVE as #16773 |
| Dealzone | 12:39 AM, `link.amazon/B014F5Z01` | Already seen; resolves to a search page |
| Dealdost | Tue, EUCOS tripod links `amzn.to/4aA0XJF`, `amzn.to/4vERk4K` | Already seen; rejected in TG 11-18c for a code-only price |
| RichDeals | 01:09 AM | Own channel, skipped |

Older sidebar posts, all from before TG 11-18d: Rogerkart (Lavie, 11:18 PM), ONLINE SHOPPING DEALS (Outsup, 10:05 PM), INDIAN CHEAP DEALS (Oct 29), NonStopDeals (Oct 5), Hidden Loot and IFS Tips (Swiggy, Wed). The other sidebar rows are personal chats and bots, not source groups.

`data/tg-multi-seen.json` is unchanged at 5,339 entries.

## Freshness

- **IndexNow:** not run for this tick. Nothing was pushed or repriced. (The concurrent SEO-AUDIT-FIX tick pings its 10 re-indexed pin pages separately.)
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.19s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.62s) |

## CEO audit

Run at 06:13 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 06:14 IST) | OK |
| Prod deploy | abe97c8d BUILDING (SEO-AUDIT-FIX pin-gate fix, commit 9c7f73c) | In progress |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The next CONTENT-SEO run (about 06:39 IST) brings it to 2.

## Still open

- **Telegram yield:** source groups silent since 02:34 IST; the overnight lull usually lifts after about 08:00 IST.
- **IFS redirector:** dead at g through o (9 ticks). Probe-only until the end of 11-18 IST, then repoint if no 11-18 tick resolved.
- **DesiDime yield:** 0 fresh candidates in 11-18b and 11-18c.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; the Offer lapses tonight (11-18).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **Low-stock re-check list:** unchanged from DESIDIME 11-18b.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 07:03 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
