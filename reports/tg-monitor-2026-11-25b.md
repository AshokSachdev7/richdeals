# TELEGRAM-DEAL-MONITOR tick — 2026-11-25b

This tick ran at about 01:10–01:25 IST on 11-25 (19:40–19:55 UTC on 11-24). It was run inline per CLAUDE.md "Telegram deal sourcing".

The tick used the Playwright MCP with the richDeals profile. Tab 0 (Telegram Web) was used for one `browser_evaluate` sidebar read only. Tab 1 (logged-in Amazon) was used for the product-page reads.

**Result:**

- **0 new deals were pushed.** Every single-product Amazon post in the sidebar was already a LIVE row.
- **1 duplicate LIVE row was price-synced in place:** #4793, Havells air fryer, from ₹5,584 to ₹5,578.
- **2 duplicates were already in sync:** #16177 and #17309.
- **6 posts were skipped:** multi-product loots, a search-page link, non-store posts and stale posts.
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.**

## Sidebar

10 of the 13 groups in `data/tg-groups.json` were in the loaded chat list. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not loaded.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks | Havells Prolife Stellar Chef air fryer 5.5L (B0D7ZRLH5Z) at ₹4,463 | **Duplicate of #4793.** Price-synced (see below) |
| (Amazon post) | Philips GC1905/21 steam iron (B008QTK47Q) | **Duplicate of #16177.** ₹1,197 in the DB matches the channel; already in the seen list |
| (Amazon post) | Bhuvenika dry fruits, 1 kg (B0HLG1JX2V) | **Duplicate of #17309.** ₹436 in the DB matches the channel; already in the seen list |
| SB Loots | AJIO multi-product loot | **Skipped:** multi-product |
| Rogerkart | AJIO multi-product loot | **Skipped:** multi-product |
| Dealzone | WROGN briefs | **Skipped:** resolves to an Amazon `/s?` search page carrying the source tag `glitzdeal05-21` |
| IFS Tips, Hidden Loot | Swiggy offers | **Skipped:** not a store product |
| INDIAN CHEAP DEALS | LG washing machine (Oct 29) | **Skipped:** stale |
| NonStopDeals | Caprese category post (Oct 5) | **Skipped:** stale, and a category page |

## Duplicates (price sync)

| Row | Product | Product page now | Action |
|---|---|---|---|
| #4793 | Havells Prolife Stellar Chef air fryer, 5.5 L, 1500 W | ₹5,578, M.R.P. ₹9,999 (44% off), in stock, add-to-cart present, "Apply 20% coupon" shown | Price updated from ₹5,584 to ₹5,578 (M.R.P. and discount unchanged). The description's ₹5,584 was rewritten to ₹5,578. The title carries no price and the howTo is empty, so neither changed. A `priceHistory` row was added |

The channel's ₹4,463 is the price after the 20% clip coupon (₹5,578 × 0.8 = ₹4,462). The row stores the pre-coupon price that the product page shows, as usual.

This is the row's fourth price in under four months: ₹5,631 (08-05), ₹5,194 (11-03), ₹5,584 (11-18) and now ₹5,578.

B0D7ZRLH5Z was added to `data/tg-multi-seen.json`, which now has 5,853 entries.

The prod page returned 200 in 0.16s.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200** for 4 URLs: the repriced slug `havells-prolife-stellar-chef-air-fryer-5-5l`, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.42s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.17s, `/offers` 0.08s, `/blog` 0.79s, `/sitemap.xml` 0.07s, `/feed.xml` 0.10s, `/api/deals` 0.11s, `/llms.txt` 0.42s, all 200 | OK |
| DB LIVE vs API total | 16,767 = 16,767 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,374 vs 17,360 | OK. The cursor moved up from 17,355 since SITEMON 11-25b, so the external broadcast is still working through the new rows |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a` exists, so this report uses `b` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 | 2 in the audit window (the window's start cuts into the day) |
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 34 rows repriced in the last 24 hours, plus #4112, #16917 and now #4793.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13, and now B0D7ZRLH5Z (4 prices since 08-05).
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366 and #17372.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded again this tick. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not in the list.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick used Telegram for the sidebar read only, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
