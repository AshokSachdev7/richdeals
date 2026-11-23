# TELEGRAM-DEAL-MONITOR tick — 2026-11-24d

This tick ran at about 04:01 IST on 11-24. The sidebar was read in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list`, filtered to the 13 groups in `data/tg-groups.json`.

**Result: 0 new deals pushed, because there was nothing new to verify. The newest post in any tracked group was at 02:34 IST, and tg-monitor 11-24c had already covered the sidebar up to about 03:15 IST. No IndexNow ping was sent because no deal was pushed or changed. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Sidebar

| Group | Last post | Latest message | Status |
|---|---|---|---|
| SB Loots And Deals | 02:34 | Channel notification-settings promo | Junk, seen in 11-24c |
| CoolzTricks Official | 01:27 | Saffola coupon | Junk, seen in 11-24c |
| Dealzone | 01:09 | Sonata watches "starts at 487" (2 links) | Multi-product, seen in 11-24c |
| Rogerkart Deals | 00:24 | Zebronics MagBoost C car charger @ ₹999 | Duplicate of LIVE #17059, verified in 11-24c |
| Dealdost | 22:01 (11-23) | IndusInd credit-card offer | Junk |
| ONLINE SHOPPING DEALS | 21:08 (11-23) | GKD coaster set @ ₹90 | #17081, moved to EXPIRED in 11-24c |
| IndiaFreeStuff Tips & Tricks | Fri | Swiggy Instamart | Junk |
| Hidden Loot Deals & Offers | Nov 11 | Swiggy Dineout | Junk |
| INDIAN CHEAP DEALS | Oct 29 | LG washing machine | Duplicate of LIVE #5035, verified in 11-24c |
| NonStopDeals | Oct 5 | Caprese handbags, up to 90% off (Flipkart category) | Category page |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the loaded sidebar. Their config entries have no public username, so the `t.me/s/` preview fallback cannot reach them.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No deals were pushed or changed |
| sitemap.xml | 200. ISR `revalidate = 1800` |
| llms.txt | 200. `force-dynamic` |
| Seen list | Unchanged |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.08–0.50s | OK |
| DB LIVE vs API total | 16,522 = 16,522 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md`, `-24a`, `-24b` and `-24c` existed, so this report uses suffix `d` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707.
- **Copy mismatches:** #8707's title says "(65% Off)" while its M.R.P. and discountPct are null, and #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick's sidebar read was filtered to the tracked group titles. It opened no chat, did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
