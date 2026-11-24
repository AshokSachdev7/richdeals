# TELEGRAM-DEAL-MONITOR tick — 2026-11-25a

This tick ran at about 23:40 IST on 11-24 to 00:05 IST on 11-25. It was run inline in the Playwright MCP (richDeals profile). One read-only evaluate read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved with curl before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId and affiliate URL).

Amazon prices were read on the product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart.

**Result:**

- **No new deal was pushed.** Both fresh single-product posts were reposts of rows that are already LIVE.
- **1 row was repriced:** #8001 (Dove Men+Care Oil Control Face Moisturizer) went from ₹150 to ₹125, verified on the product page.
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks (12:00 AM) | Dove Men+Care oil control face moisturizer 100 g at ₹125 (`amzn.to/4AP2CWd`) | Resolved to B0DWXBHNVQ. Duplicate of LIVE #8001; price moved, so the row was repriced |
| Dealzone (11:47 PM) | "499" (`link.amazon/B01uxMASj`) | Resolved to B072QR5X96 (Razer Goliathus Mobile Stealth). Duplicate of LIVE #17330, re-verified |
| SB Loots | Jack & Jones on Ajio, several links | Skipped: category |
| ONLINE SHOPPING DEALS | Philips steam iron | Duplicate #16177 (verified in 11-24w) |
| Dealdost | Premium mix dry fruits | Duplicate #17309 |
| Rogerkart | Boldfit walking pad | Duplicate #17272 |
| IndiaFreeStuff Tips | Swiggy Instamart loot | Skipped: loot |
| Hidden Loot | Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese category | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B0DWXBHNVQ | Dove Men+Care Oil Control Face Moisturizer, 100 g (#8001) | ₹125 | ₹125, M.R.P. ₹250, in stock, add-to-cart present | **Repriced** from ₹150 to ₹125 (50% off) |
| B072QR5X96 | Razer Goliathus Mobile Stealth mouse pad (#17330) | ₹499 | ₹499, M.R.P. ₹849, in stock, add-to-cart present | **Unchanged.** Matches the DB |

Both ASINs were added to `data/tg-multi-seen.json` (now 5,852 entries).

## Duplicates (price sync)

#8001 was updated with `prisma.deal.update`: price ₹125, M.R.P. ₹250, discount 50%, and the title rewritten for the new price. The description said "vitamin E", but the Amazon title lists vitamin B3, so that was corrected as well. A `priceHistory` row was added (#17695). The slug was not changed, the status is still LIVE, and the page returns 200 on prod (0.19s). The howTo steps quote no price.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the #8001 slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.63s). `force-dynamic` |

## Anomaly: shared browser profile

Something else is still using the richDeals profile. Since the last tick, a new tab 2 (a Flipkart Sony WH-CH730N page) has appeared, and Amazon tab 1 was showing a Dove shampoo page this session never opened. This tick only read the sidebar in tab 0 and used tab 1 for same-origin fetches, with no navigation.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.18s, `/offers` 0.08s, `/blog` 0.49s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.09s, `/llms.txt` 0.63s, all 200 | OK |
| DB LIVE vs API total | 16,738 = 16,738 (unchanged; a reprice adds no row) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,345 = 17,345 | OK. The broadcast cron has caught up |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | No `tg-monitor-2026-11-25*` existed, so this report uses `a` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (closed, meets the 2–3 target) |
| 11-25 | 0 so far. The IST day started at 00:00; the CONTENT-SEO cron (`9 */6 * * *`) has the whole day to publish 2–3 |

## Still open

- **Shared browser profile:** another driver keeps opening tabs in the richDeals profile (new Flipkart tab 2 this tick). Keep TG ticks to one driver.
- **Stale reposts:** 34 rows repriced in the last 24 hours (33 on 11-24 plus #8001). Reposts in the channels are a reliable price-move signal.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231.
- **Null M.R.P.:** #17334 (the listed ₹1,500 would mean 89% off).
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
