# TELEGRAM-DEAL-MONITOR tick — 2026-11-18i

The tick read the Telegram Web sidebar in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, covering all 13 groups in `data/tg-groups.json`. It then cross-checked public previews (`t.me/s/coolztricks`, `t.me/s/sbloots`, `t.me/s/rogerkart`) with curl. Run at about 08:03–08:07 IST.

**Result: 0 deals pushed. No group has posted a new product deal since 02:34 IST. The sidebar is identical to ticks 18e through 18h. Every CEO-audit check is green and all 9 session crons are armed. One prod probe of `/api/deals` hung with no response; three retries with a 30 s timeout all returned 200 in 0.11–0.19 s, so it was a one-off.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | 02:34 AM, notification-settings promo | Not a deal |
| CoolzTricks | 12:53 AM, `amzn.to/3UXi57w` (Athom towels) | Already seen; LIVE as #16773 |
| Dealzone | 12:39 AM, `link.amazon/B014F5Z01` | Seen; resolves to a search page |
| Rogerkart | 11:18 PM, Lavie handbags master link | Category post |
| ONLINE SHOPPING DEALS | 10:05 PM, Outsup juice | Seen in an earlier tick |
| Dealdost | Tue, EUCOS tripods (`amzn.to/4aA0XJF`, `amzn.to/4vERk4K`) | Seen; rejected in 11-18c for a code-only price |
| Hidden Loot, IFS Tips & Tricks | Wed, Swiggy | Not product deals |
| INDIAN CHEAP DEALS | Oct 29 | Old |
| NonStopDeals | Oct 5 | Old |

The RichDeals channel row (01:09 AM) is our own and was skipped. The remaining sidebar rows are personal chats and bots.

The connection was healthy: there was no connection-status banner and `navigator.onLine` was true.

The public previews agree with the sidebar:
- CoolzTricks' newest post is at 19:23Z on 11-17 (00:53 IST), the towels post that is already seen.
- The SB Loots and Rogerkart previews returned no post timestamps, so they can't confirm or rule anything out.

`data/tg-multi-seen.json` is unchanged at 5,339 entries.

## Freshness

- **IndexNow:** not run. Nothing was pushed or repriced.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.35s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | First probe hung (curl had no timeout; stopped after 180 s). 3 retries: 200 (0.19s, 0.11s, 0.12s) |
| /llms.txt | 200 (0.70s) |

The local API answers 200 on :4000.

## CEO audit

Run at 08:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 08:05 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **Telegram lull:** no new source post since 02:34 IST, now about 5.5 hours. That is past the usual 08:00 IST pickup, so the 09:03 tick should be watched.
- **`/api/deals` one-off hang:** watch it at the next SITEMON (08:50 IST). Probe loops should pass `-m 30` to curl so a hang can't stall a tick.
- **IFS redirector:** dead at g through p (10 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **DesiDime yield:** 0 fresh candidates in 11-18b, c and d.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 09:03 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
