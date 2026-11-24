# TELEGRAM-DEAL-MONITOR tick — 2026-11-24w

This tick ran at about 22:55–23:20 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One read-only evaluate read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId and affiliate URL).

Amazon prices were read on the product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart. Where the desktop page showed no buy box, the mobile page (`/gp/aw/d/ASIN`) was read as a fallback.

**Result:**

- **No new deal was pushed.** The one fresh single-product post (PS5 DualSense controller, posted by two groups) has no buy box on Amazon, so its price could not be verified.
- **No row was repriced.** The two reposts of LIVE rows were re-read: #16177 matches the DB, and #12963 still has no buy box.
- **IndexNow was not pinged**, because nothing was pushed or repriced.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.
- **The shared browser profile was being driven by something else during the tick** (see Anomaly).

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| SB Loots (11:10 PM) | PS5 DualSense controller at ₹4,390 (`amazn.lt`) | Resolved to B08GZ6QNTC. Rejected: no buy box |
| Dealzone (11:04 PM) | PS5 controller at ₹4,390 (`link.amazon`) | Same ASIN, B08GZ6QNTC |
| CoolzTricks (10:40 PM) | Himalaya baby diaper pants, 128 count, at ₹939 (`amzn.to`) | Resolved to B0H6BKQ1Q2. Duplicate of LIVE #12963, re-verified |
| ONLINE SHOPPING DEALS (10:21 PM) | Philips GC1905/21 steam iron ₹1,197 | Resolved to B008QTK47Q. Duplicate of LIVE #16177, re-verified |
| Dealdost | Premium mix dry fruits | Duplicate #17309 |
| Rogerkart | Boldfit walking pad | Duplicate #17272 |
| IndiaFreeStuff Tips | Swiggy Instamart loot | Skipped: loot |
| Hidden Loot | Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese category | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B08GZ6QNTC | Sony DualSense Wireless Controller, White (PlayStation 5) | ₹4,390 | Desktop: no price, no add-to-cart. Mobile: "Currently unavailable" with only "See all buying options", plus a stray ₹2,499 figure | **Rejected: no buy box.** The ₹4,390 cannot be verified |
| B0H6BKQ1Q2 | Himalaya baby diaper pants, Large, 128 count (#12963) | ₹939 | Desktop: no price, no add-to-cart. Mobile: "Currently unavailable" with buying options, plus a stray ₹529 figure | **Unchanged.** Still on the no-buy-box list |
| B008QTK47Q | Philips GC1905/21 steam iron (#16177) | ₹1,197 | ₹1,197, M.R.P. ₹2,295, in stock, add-to-cart present | **Unchanged.** Matches the DB |

All 3 ASINs were added to `data/tg-multi-seen.json` (now 5,850 entries).

## Duplicates (price sync)

None needed. #16177 already carries the live price. #12963 has no buy box, so there is no live price to sync to.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not pinged: no batch (0 pushed, 0 repriced) |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.37s). `force-dynamic` |

## Anomaly: shared browser profile

During the tick, the active chat in Telegram tab 0 changed with no click or navigation from this session: ONLINE SHOPPING DEALS, then an untracked chat ("Dhunu sonowal", #-1003898024062), then SB Loots And Deals (#-1001799721991). A new tab 3 (a Shopsy sneakers page) also appeared. Another Claude session or the owner is driving the same richDeals Playwright profile at the same time. This tick only read the sidebar in tab 0 and used tab 1 for Amazon reads. If two sessions keep sharing the profile, a sidebar read can see a different active chat than expected, and one session's navigation can break the other's reads.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.17s, `/offers` 0.08s, `/blog` 0.60s, `/sitemap.xml` 0.07s, `/feed.xml` 0.08s, `/api/deals` 1.20s, `/llms.txt` 0.37s, all 200 | OK. `/api/deals` was slower than usual (0.09–0.12s before) on one sample |
| DB LIVE vs API total | 16,738 = 16,738 (unchanged since deal-ingest 11-24l) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,345 vs 17,335 at audit, 17,340 when this report was written | OK. The external broadcast cron is working through the deal-ingest batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24v` already existed, so this report uses `w` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **Shared browser profile:** something else drove Telegram tab 0 and opened tab 3 during this tick. Find which session is using the richDeals profile and keep TG ticks to one driver.
- **TG yield:** the one fresh single-product post had no buy box; the rest were reposts, loot or sale hubs.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 33 rows repriced today.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231.
- **Null M.R.P.:** #17334 (the listed ₹1,500 would mean 89% off).
- **No buy box:** #7259, #12963 (confirmed again this tick), #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
