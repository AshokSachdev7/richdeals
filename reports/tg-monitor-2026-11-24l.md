# TELEGRAM-DEAL-MONITOR tick — 2026-11-24l

This tick ran at about 11:58–12:03 IST on 11-24. It used the Playwright MCP with the logged-in richDeals profile. One `browser_evaluate` read the `.chat-list` sidebar, filtered to the groups tracked in `data/tg-groups.json`.

**Result: 0 new deals. Two groups had posted since tg-monitor 11-24k, and both posts were category or multi-product posts. Nothing was pushed, so no IndexNow ping was needed. The CEO audit is green. The broadcast cursor has caught up to the max deal id. The only rot is still the missed posts on 11-21 and 11-22.**

## Sidebar

10 of the 13 tracked groups were loaded in the sidebar. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not loaded.

| Group | Newest post | Decision |
|---|---|---|
| SB Loots (11:50) | Myntra "up to 90% off" on Vishudh women's clothing, five category links | Skip: category post |
| CoolzTricks (11:39) | "Up to 56% off" Himalaya beauty and "up to 64% off" Dove & Axe body wash, two `amzn.to` links | Skip: multi-product category posts |
| Rogerkart (10:39) | Mivi DuoPods | Skip: already pushed in 11-24k (#17166) |
| Dealzone (10:31) | Amazon brand clothing, several links | Skip: unchanged, multi-product |
| ONLINE SHOPPING DEALS (09:50) | Amazon Basics figurine | Skip: unchanged, already pushed (#17142) |
| Dealdost | IndusInd credit card | Skip: unchanged, not a product |
| IFS Tips | Instamart tip | Skip: unchanged |
| Hidden Loot | Dineout tip | Skip: unchanged |
| INDIAN CHEAP DEALS | LG sale hub | Skip: unchanged, sale hub |
| NonStopDeals | Caprese category | Skip: unchanged, category |

## Push

None. No candidate passed the single-product filter, so there was nothing to verify or push. `data/tg-multi-seen.json` is unchanged at 5,819 entries.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not needed. Nothing was pushed |
| sitemap.xml | 200 (0.06s) |
| llms.txt | 200 (0.39s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.57s. `/blog` (0.57s) and `/llms.txt` (0.39s) were the slowest | OK |
| DB LIVE vs API total | 16,558 = 16,558 (17,016 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,166 vs 17,166 | OK. The external broadcast cron has caught up |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24k` already existed, so this report uses suffix `l` | OK |
| Deploy | None. Nothing changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2. The CONTENT-SEO run at 12:39 IST can add a third. The cap is 4 |

## Still open

- **Stale reposts:** LIVE Amazon prices drift silently. deal-ingest 11-24f repriced 4 duplicates, and #299 and #11191 were caught the same way earlier.
- **Legacy truncated titles:** #299 still carries a cut-off marketplace title. It needs a geo-optimizer rewrite.
- **IFS yield:** 19 of 46 candidates in deal-ingest 11-24f.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the earlier list plus 13 `/indiafreestuff/p/` cards from deal-ingest 11-24f.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick read only the tracked rows of the sidebar. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
