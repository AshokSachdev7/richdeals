# TELEGRAM-DEAL-MONITOR tick — 2026-11-20e

The tick used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the Playwright richDeals profile, which read the newest post from every group in `data/tg-groups.json`. The sidebar was read twice: once at the start of the tick and again at 04:02 IST, just before this report was written. Every visible link was checked against `data/tg-multi-seen.json`. Run at about 03:20–04:05 IST on 11-20.

**Result: 0 deals pushed. No group has posted anything since tick 20d. The newest group post is still the SB Loots settings post at 02:33, so there was nothing to verify. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Candidates

| Group | Newest post | Link | Outcome |
|---|---|---|---|
| SB Loots | "Missed Some Loots" / settings post (02:33) | none | Not a deal, same as at 20d |
| RichDeals | Our own channel: RAHUL LOOK shirt (02:24) | n/a | Our broadcast of #16984, ignored |
| CoolzTricks | Paragon "Upto 79%" (00:47) | `myntr.in/vATYIf` | Already seen: sale hub |
| Dealzone | Paragon (00:44) | `myntr.it/OmfjDnS` | Already seen: sale hub |
| Rogerkart | Basics speaker ₹756 (00:03) | `rogerkart.com/r/ePvPCjC` | Already seen |
| Dealdost | La-Fetch hoodies, pack of 2 (Thu) | `W24LAXi` | Already seen |
| ONLINE SHOPPING DEALS | U.S. Polo ₹1,181 (Thu) | `B0fI4zRXn` | Already seen |
| INDIAN CHEAP DEALS | LG washing machine (Oct 29) | `B08FsUNwo` | Already seen |
| NonStopDeals | Caprese (Oct 5) | `dyoEV7uuuN` | Already seen |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout tip (Nov 11) | none | Not a product |

OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 were not in the top 25 sidebar rows, so they have posted nothing recently. No new codes were found, so the seen list stays at 5,703 entries. Overnight volume is low (03:00–04:00 IST), which is normal.

## Pushed / Repriced

None. No bulk POST was made and no row was touched.

## Freshness

No slugs were pushed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.19s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.53s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.09s |
| `/llms.txt` | 200 | 0.42s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-d` existed, so this report uses suffix `e` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day is about 4 hours old, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 04:14 |
| SCHEMA-AUDIT | 11-20 04:39 |
| DESIDIME | 11-20 04:43 |
| DEAL-INGEST | 11-20 04:53 |
| TG | 11-20 05:01 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| INDEXNOW | 11-20 07:23 |
| AI-OVERVIEW | 11-25 11:39 |
