# TELEGRAM-DEAL-MONITOR tick — 2026-11-24v

This tick ran at about 21:40–22:00 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One read-only evaluate read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId and affiliate URL).

Amazon prices were read on the product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart.

**Result:**

- **No new deal was pushed.** The only single-product candidate was a repost of a LIVE row.
- **1 duplicate LIVE row was repriced in place (#17110)**, from ₹136 to ₹123, after the product page confirmed the post price.
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks | Rexona women's roll-on deo combo at ₹123 (`amzn.to`) | Resolved to B0CMQKR8CJ. Duplicate of LIVE #17110, re-verified |
| SB Loots | Myntra Adidas shoes up to 75% off (`myntr.it` men/women/kids) | Skipped: category |
| Dealzone | Bata up to 84% off | Skipped: category |
| ONLINE SHOPPING DEALS | Tuco kids soap ₹194 | Already pushed as #17329 last tick |
| Dealdost | Premium mix dry fruits 1kg | Duplicate #17309 |
| Rogerkart | Boldfit walking pad | Duplicate #17272 |
| IndiaFreeStuff Tips | Swiggy Instamart loot | Skipped: loot |
| Hidden Loot | Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese up to 90% off | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B0CMQKR8CJ | REXONA Power Dry roll-on for women, 50ml, pack of 2 | ₹123 | ₹123, M.R.P. ₹380, in stock, add-to-cart present, no coupon | **Repriced #17110** (DB had ₹136) |

The ASIN was added to `data/tg-multi-seen.json` (now 5,847 entries).

## Duplicates (price sync)

`#17110` was updated with `prisma.update` in one transaction: price ₹136 → ₹123, discount 64% → 68%, M.R.P. ₹380 unchanged, and the title, description and howTo were rewritten for the new price. A `priceHistory` row (₹123) was added. The slug was not changed, the status is still LIVE, and the page returns 200 on prod (0.16s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the repriced slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.37s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.23s, `/offers` 0.09s, `/blog` 0.55s, `/sitemap.xml` 0.08s, `/feed.xml` 0.10s, `/api/deals` 0.12s, `/llms.txt` 0.37s, all 200 | OK |
| DB LIVE vs API total | 16,722 = 16,722 (unchanged; this tick only repriced) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,329 vs 17,329 | OK. The external broadcast cron has caught up |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24u` already existed, so this report uses `v` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **TG yield:** most newest posts this evening are category or sale hubs; the one single-product post was a repost.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 27 rows repriced today (26 earlier plus #17110).
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215 and #17288.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
