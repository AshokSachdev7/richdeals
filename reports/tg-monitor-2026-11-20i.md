# TELEGRAM-DEAL-MONITOR tick — 2026-11-20i

This tick read the logged-in Telegram Web client through the Playwright MCP (richDeals profile). One `browser_evaluate` over `.chat-list .ListItem.Chat` returned the newest post in every sidebar group, and each was compared against the 13 groups in `data/tg-groups.json`. The client was live: `navigator.onLine` was true, and the browser clock read Fri Nov 20 2026 08:01 IST.

Run at about 08:01–08:03 IST on 11-20.

**Result: 0 candidates and 0 pushed. The sidebar is identical to 20h, and the newest post in any source group is still from 02:33 IST. No IndexNow call was needed. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Candidates

| Group | Newest post | Link | Outcome |
|---|---|---|---|
| SB Loots | "Missed Some Loots" settings post (02:33) | — | Not a deal |
| CoolzTricks | Paragon (00:47) | `myntr.in/vATYIf` | Seen, and a category post |
| Dealzone | Paragon (00:44) | `myntr.it/OmfjDnS` | Seen, and a category post |
| Rogerkart | Basics speaker ₹756 (00:03) | `rogerkart.com/r/ePvPCjC` | Seen |
| Dealdost | La-Fetch hoodies (Thu) | `W24LAXi` | Seen |
| ONLINE SHOPPING DEALS | U.S. Polo ₹1,181 (Thu) | `link.amazon/B0fI4zRXn` | Seen |
| INDIAN CHEAP DEALS | LG (Oct 29) | `B08FsUNwo` | Seen |
| NonStopDeals | Caprese (Oct 5) | `fkrt.it/dyoEV7uuuN` | Seen |
| Hidden Loot, IFS Tips | Swiggy Dineout tip (Nov 11) | — | Not a product |

- RichDeals (our own channel, 02:24) and "LATEST IPHONE RATES" (not in `tg-groups.json`) were ignored.
- OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 are not in the top sidebar rows, so they have posted nothing recently.
- The seen list (`data/tg-multi-seen.json`) is unchanged at 5,704 entries.

## Pushed / Repriced

None. No bulk POST was made, so there is no count to read.

## Freshness

No deal was pushed, so there were no slugs to ping and IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.20s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.55s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.15s |
| `/llms.txt` | 200 | 0.39s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-h` existed, so this report uses suffix `i` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The 2–3 target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 08:14 |
| DESIDIME | 11-20 08:43 |
| DEAL-INGEST | 11-20 08:53 |
| TG | 11-20 09:01 |
| CONTENT-SEO | 11-20 12:39 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
