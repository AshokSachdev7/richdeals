# TELEGRAM-DEAL-MONITOR tick — 2026-11-25j

This tick ran at about 09:07–09:16 IST on 11-25 (03:37–03:46 UTC).

**Result:** 0 new deals. The sidebar showed 10 of the 13 source groups. Every single-product post either resolved to one of 4 ASINs that are already LIVE, or was a category, sale-hub or promo post. All 4 LIVE rows were re-verified on their Amazon PDPs and match the DB, so no price-sync was needed. Nothing was pushed, so there was no bulk call and no IndexNow ping (no slugs changed). The CEO audit is green.

## Sidebar groups

One `browser_evaluate` read `.chat-list .ListItem.Chat` (title + last message). The banned chats were filtered out and not opened.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | `amazn.lt/OtRHls9K` → B0D7ZRLH5Z Havells air fryer | Duplicate (#4793) |
| CoolzTricks | `amzn.to/4zCTfI7` → B0D7ZRLH5Z | Duplicate (#4793) |
| Dealzone | `link.amazon/B03Dmga2Q` → B0FQ5BF4VY Prestige mixer | Duplicate (#17379) |
| ONLINE SHOPPING DEALS | `link.amazon/B06xsH6e0` → B008QTK47Q Philips GC1905/21 iron | Duplicate (#16177) |
| Dealdost | `amzn.to/4latsU5` → B0HLG1JX2V dry fruits | Duplicate (#17309) |
| Rogerkart | AJIO category | Skipped: category page |
| NonStopDeals | Caprese "all pages" | Skipped: multi-product |
| INDIAN CHEAP DEALS | LG sale hub | Skipped: sale hub |
| IFS Tips | Swiggy promo | Skipped: not a product |
| Hidden Loot | Swiggy promo | Skipped: not a product |

Not in the sidebar this tick: Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba.

## Pushed

None.

## Rejects

No fresh candidate reached verification. Skips are listed in the table above.

## Duplicates

Each was re-verified with a same-origin fetch of `/dp/{ASIN}` in the logged-in Amazon tab (`#corePriceDisplay .a-price-whole`, `#availability`, add-to-cart).

| Row | ASIN | Channel | PDP | DB | Action |
|---|---|---|---|---|---|
| #4793 | B0D7ZRLH5Z | ₹4,463 | ₹5,578, M.R.P. ₹9,999, in stock, "Apply 20% coupon" | ₹5,578 / ₹9,999 / 44% | None. The channel price is after the 20% clip coupon |
| #16177 | B008QTK47Q | ₹1,197 | ₹1,197, M.R.P. ₹2,295, in stock | ₹1,197 / ₹2,295 / 48% | None |
| #17379 | B0FQ5BF4VY | ₹1,799 | ₹1,799, M.R.P. ₹4,035, in stock | ₹1,799 / ₹4,035 / 55% | None |
| #17309 | B0HLG1JX2V | ₹436 | ₹436, in stock (the M.R.P. selector read a per-unit rate, ₹43.62) | ₹436 / ₹1,099 / 60% | None |

## Push

Skipped: no fresh deal and no price drift.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not pinged. No slug was created or changed this tick |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.17s, `/offers` 0.08s, `/blog` 0.50s, `/sitemap.xml` 0.07s, `/feed.xml` 0.07s, `/api/deals` 0.11s, `/llms.txt` 0.40s | OK |
| DB LIVE vs API total | 16,776 = 16,776 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,383 = 17,383 | OK. The cursor caught up with the 2 rows from DEAL-INGEST 11-25e |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a` to `i` exist, so this report uses `j` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, on target. CONTENT-SEO runs again at 12:39 and 18:39 IST |

No day exceeds the cap of 4.

## Still open

- **#16177 `priceValidUntil`:** missing. In-sync re-verifies write no PriceHistory row (SCHEMA-AUDIT 11-25, process gap 1). Re-verified in sync again this tick, still without a PriceHistory write.
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile (tab 0 was on BotFather this tick). Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** #10860 repriced in DEAL-INGEST 11-25e; otherwise 0 since INDEXNOW 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards still null their pid at stage 1; the fix belongs in stage 1.
- **Sidebar coverage:** 10 of 13 TG groups loaded this tick (11-25j). Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were missing again.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick read only the sidebar, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
