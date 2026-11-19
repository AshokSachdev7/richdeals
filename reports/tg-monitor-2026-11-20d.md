# TELEGRAM-DEAL-MONITOR tick — 2026-11-20d

The tick used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the Playwright richDeals profile, which read the newest post from every group in `data/tg-groups.json`. It then opened SB Loots with a trusted click and read its last 25 messages. Every link code was checked against `data/tg-multi-seen.json`. Run at about 03:01–03:10 IST on 11-20.

**Result: 0 deals pushed. Since 20c the groups posted only sale hubs, non-product tips and one already-rejected ASIN, so there was nothing single-product to verify. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Candidates

| Group | Post | Link | Outcome |
|---|---|---|---|
| SB Loots | "Missed Some Loots" / settings post (02:33) | none | Not a deal |
| SB Loots | Paragon sale | `myntr.it/sjpkuM4` | Rejected: sale hub |
| SB Loots | Cap (B0GPKCK7T3) | `BffWyAyi` | Already rejected at 20c for price drift (₹105 posted vs ₹119 on the PDP). The ASIN was already in the seen list |
| CoolzTricks | Paragon "Upto 79%" | `myntr.in/vATYIf` | Rejected: sale hub |
| Dealzone | Paragon | `myntr.it/OmfjDnS` | Rejected: sale hub |
| Rogerkart | Basics speaker ₹756 | `rogerkart.com/r/ePvPCjC` | Already seen |
| Dealdost | La-Fetch hoodies, pack of 2 | `W24LAXi` | Already seen |
| ONLINE SHOPPING DEALS | U.S. Polo ₹1,181 | `B0fI4zRXn` | Already seen |
| INDIAN CHEAP DEALS | LG washing machine | `B08FsUNwo` | Already seen |
| NonStopDeals | Caprese | `dyoEV7uuuN` | Already seen |
| Hidden Loot, IndiaFreeStuff Tips | Swiggy Dineout tip | none | Not a product |

OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 were not in the top 25 sidebar rows, so they have posted nothing recently.

The 4 new codes (`myntr.in/vATYIf`, `myntr.it/OmfjDnS`, `myntr.it/sjpkuM4`, `BffWyAyi`) were added to the seen list. It now has 5,703 entries, up from 5,699.

## Pushed / Repriced

None. No bulk POST was made and no row was touched.

## Freshness

No slugs were pushed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.17s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.55s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.49s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a`, `-b` and `-c` existed, so this report uses suffix `d` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
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
| SITEMON | 11-20 03:14 |
| TG | 11-20 04:01 |
| SCHEMA-AUDIT | 11-20 04:39 |
| DESIDIME | 11-20 04:43 |
| DEAL-INGEST | 11-20 04:53 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| INDEXNOW | 11-20 07:23 |
| AI-OVERVIEW | 11-25 11:39 |
