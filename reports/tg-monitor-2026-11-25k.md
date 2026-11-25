# TELEGRAM-DEAL-MONITOR tick — 2026-11-25k

This tick ran at about 10:05 IST on 11-25 (04:35 UTC).

**Result:** no new deals. Every single-product deal in the sidebar was already LIVE. Because these were reposts, all 5 were re-read on the Amazon PDP, and all 5 match their DB rows. Nothing was pushed or repriced, so no IndexNow ping was needed. The CEO audit is green.

## Sidebar

The tick used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the richDeals Playwright profile.

- **Groups loaded:** 10 of the 13 in `data/tg-groups.json`. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not load.
- **Tab 0:** was on the BotFather chat. This comes from the shared profile. It is still Telegram, so the scrape ran without navigating away.
- **Stray tabs:** other tabs were already open, left by another driver: Amazon B00CBRJ34E, Flipkart Sony WH-CH730N and Shopsy Bacan.

## Skipped posts

| Group | Post | Why |
|---|---|---|
| Rogerkart | AJIO category loot | Category post |
| NonStopDeals | Caprese "upto 90%" (fkrt.it) | Category post |
| IndiaFreeStuff Tips, Hidden Loot | Swiggy | Not a store product |
| INDIAN CHEAP DEALS | LG washing machine sale | Sale hub |

## Duplicates: PDP re-read

The PDPs were fetched same-origin from the logged-in Amazon tab and read from `.a-price-whole` in `#corePriceDisplay`, `#availability` and `#add-to-cart-button`. No page returned a captcha.

| Row | ASIN | Product | Channel | DB | PDP | Action |
|---|---|---|---|---|---|---|
| #2287 | B0BFDJNDBT | DiSano crunchy peanut butter 924g | ₹219 / "@200" | ₹199 | ₹200, in stock, ATC | None (within ₹1) |
| #1527 | B0F18L1ZZB | Garnier Men face wash + sunscreen | ₹306 | ₹306 | ₹306, in stock, ATC | None |
| #4793 | B0D7ZRLH5Z | Havells Prolife Stellar Chef air fryer 5.5L | ₹4,463 | ₹5,578 | ₹5,578 plus a 20% coupon, in stock, ATC | None. The channel price is post-coupon (5,578 × 0.8 = 4,462) |
| #16177 | B008QTK47Q | Philips GC1905/21 steam iron | ₹1,197 | ₹1,197 | ₹1,197, in stock, ATC | None |
| #17309 | B0HLG1JX2V | Bhuvenika dry fruits 1kg | ₹436 | ₹436 | ₹436, in stock, ATC | None |

All 5 ASINs were already in `data/tg-multi-seen.json`.

## Push

None. There was no fresh candidate, so no bulk POST was sent.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not pinged. No slug was pushed or repriced |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.17s, `/offers` 0.08s, `/blog` 0.63s, `/sitemap.xml` 0.08s, `/feed.xml` 0.07s, `/api/deals` 0.09s, `/llms.txt` 0.46s | OK |
| DB LIVE | 16,776, unchanged since SITEMON 11-25j | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id | 17,383, unchanged. The cursor was 17,383 at SITEMON 11-25j | OK |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a` to `j` exist, so this report uses `k` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, on target. CONTENT-SEO runs again at 12:39 and 18:39 IST |

No day exceeds the cap of 4.

## Still open

- **#16177 `priceValidUntil`:** still missing. This tick confirmed the price but wrote no PriceHistory row: in-sync re-verifies never do (SCHEMA-AUDIT 11-25, process gap 1).
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver uses the richDeals Playwright profile. Tab 0 was on BotFather again, and Amazon, Flipkart and Shopsy tabs were open. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 0 this tick. #10860 was repriced in DEAL-INGEST 11-25e.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z. B0D7ZRLH5Z is in sync today; the gap is the coupon.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards still null their pid at stage 1. The fix belongs in stage 1.
- **Sidebar coverage:** 10 of 13 TG groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were missing again.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick read only the sidebar list. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
