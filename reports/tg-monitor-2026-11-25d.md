# TELEGRAM-DEAL-MONITOR tick — 2026-11-25d

This tick ran at about 03:00–03:10 IST on 11-25 (21:30–21:40 UTC on 11-24). It was run inline per CLAUDE.md "Telegram deal sourcing".

The tick used the Playwright MCP with the richDeals profile. Telegram Web was used for one `browser_evaluate` sidebar read only. The product-page reads were same-origin `fetch()` calls inside the logged-in Amazon tab, parsed with DOMParser, so no tab was navigated. The other driver's tabs in the same profile were not touched.

**Result:**

- **0 new deals were pushed.** The sidebar was unchanged since 11-25c, and every single-product Amazon post in it is already a LIVE row.
- **3 duplicate LIVE rows were re-verified on the product page and are in sync:** #4793, #16177 and #17309. Nothing was repriced.
- **7 posts were skipped:** multi-product loots, a search-page link, a promo post, non-store posts and stale posts.
- **IndexNow was not run,** because there were no new or repriced slugs.
- **The CEO audit is green.**

## Sidebar

10 of the 13 groups in `data/tg-groups.json` were in the loaded chat list. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not loaded.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks | Havells Prolife Stellar Chef air fryer 5.5L "at 4,463, apply 20% off coupon" (amzn.to → B0D7ZRLH5Z) | **Duplicate of #4793.** ₹4,463 is the post-coupon price (₹5,578 × 0.8 = ₹4,462); in sync |
| ONLINE SHOPPING DEALS | Philips GC1905/21 steam iron at ₹1,197 (B008QTK47Q) | **Duplicate of #16177.** In sync |
| Dealdost | Premium mixed dry fruits, 1 kg at ₹436 (B0HLG1JX2V) | **Duplicate of #17309.** In sync |
| Dealzone | WROGN briefs | **Skipped:** Amazon `/s?` search page carrying the source tag `glitzdeal05-21` |
| Rogerkart | AJIO Catwalk women's footwear "up to 85% off" | **Skipped:** multi-product |
| SB Loots | Notification-settings promo | **Skipped:** not a deal |
| IFS Tips, Hidden Loot | Swiggy Instamart, Swiggy Dineout ₹11 | **Skipped:** not a store product |
| INDIAN CHEAP DEALS | LG washing machine sale (Oct 29) | **Skipped:** stale |
| NonStopDeals | Caprese handbags "up to 90% off" (fkrt.it) | **Skipped:** stale, and a category page |

## Duplicates (re-verified)

| Row | Product | DB | Product page now | Action |
|---|---|---|---|---|
| #4793 | Havells Prolife Stellar Chef air fryer, 5.5 L | ₹5,578 / ₹9,999 (44%) | ₹5,578, M.R.P. ₹9,999 (44% off), in stock, add-to-cart present | None, in sync |
| #16177 | Philips GC1905/21 steam iron | ₹1,197 / ₹2,295 (48%) | ₹1,197, M.R.P. ₹2,295 (48% off), in stock, add-to-cart present | None, in sync |
| #17309 | Bhuvenika dry fruits, 1 kg | ₹436 / ₹1,099 (60%) | ₹436, M.R.P. ₹1,099 (60% off), in stock, add-to-cart present | None, in sync |

All 3 ASINs were already in `data/tg-multi-seen.json`, so the file was not changed.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **Not run.** No new or repriced slugs this tick |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.36s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.16s, `/offers` 0.07s, `/blog` 0.53s, `/sitemap.xml` 0.05s, `/feed.xml` 0.08s, `/api/deals` 0.09s, `/llms.txt` 0.36s, all 200 | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 vs 17,378 | OK. The external broadcast has drained every row |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a`, `b` and `c` exist, so this report uses `d` | OK |
| Deploy | None. Read-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 15 rows repriced between INDEXNOW 11-24d and 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded again this tick. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not in the list.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick used Telegram for the sidebar read only, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
