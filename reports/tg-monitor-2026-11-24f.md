# TELEGRAM-DEAL-MONITOR tick — 2026-11-24f

This tick ran at about 06:05 IST on 11-24. The sidebar was read in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list`, filtered to the 13 groups in `data/tg-groups.json`. A second evaluate confirmed the Telegram client was online and the list was current (the RichDeals channel itself showed a 03:09 post).

**Result: 0 new deals pushed, because there was nothing new to verify. The sidebar is identical to tg-monitor 11-24e (about 05:07 IST). The newest post in any tracked group is still from 02:34 IST. No IndexNow ping was sent because no deal was pushed or changed. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Sidebar

| Group | Last post | Latest message | Status |
|---|---|---|---|
| SB Loots And Deals | 02:34 | Channel notification-settings promo | Junk, seen in 11-24c |
| CoolzTricks Official | 01:27 | Saffola coupon | Junk, seen in 11-24c |
| Dealzone | 01:09 | Sonata watches "starts at 487" (2 links) | Multi-product, seen in 11-24c |
| Rogerkart Deals | 00:24 | Zebronics wireless car charger @ ₹999 | Duplicate of LIVE #17059, verified in 11-24c |
| Dealdost | 22:01 (11-23) | IndusInd credit-card offer | Junk |
| ONLINE SHOPPING DEALS | 21:08 (11-23) | GKD coaster set @ ₹90 | #17081, EXPIRED since 11-24c |
| IndiaFreeStuff Tips & Tricks | Fri | Swiggy Instamart | Junk |
| Hidden Loot Deals & Offers | Nov 11 | Swiggy Dineout | Junk |
| INDIAN CHEAP DEALS | Oct 29 | LG washing machine | Duplicate of LIVE #5035, verified in 11-24c |
| NonStopDeals | Oct 5 | Caprese handbags, up to 90% off (Flipkart category) | Category page |

Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the loaded sidebar. The tracked groups have been silent for about 3.5 hours, which is the normal overnight lull. The daytime ticks should pick up volume again.

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
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.60s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24e` existed, so this report uses suffix `f` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs next at 06:39 IST, then 12:39 and 18:39 |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick's sidebar read was filtered to the tracked group titles. It opened no chat, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
