# TELEGRAM-DEAL-MONITOR tick — 2026-11-25h

This tick ran at about 07:04 IST on 11-25 (01:34 UTC).

Method: one `browser_evaluate` over the `.chat-list` sidebar in the richDeals Playwright profile, reading the newest post of each group in `data/tg-groups.json`. The forbidden rows ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨" and "Auto Request Accepter Bot") were filtered out of the read and never opened.

**Result:**
- 0 new deals pushed. The sidebar is identical to TG-MONITOR 11-25g.
- 10 of 13 groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba are absent from the sidebar.
- 3 single-product posts are duplicates of LIVE rows that were already re-verified on the PDP in 11-25g, so they were not re-checked.
- No IndexNow ping, because nothing was pushed.
- The CEO audit is green.

## Sidebar

| Group | Newest post | Decision |
|---|---|---|
| SB Loots | "Missed some loots" promo, 02:34 | Skipped: promo, not a product |
| Dealzone | WROGN briefs "Starts at 299", `link.amazon/B04nKz5ds`, 12:45 AM | Skipped: multi-variant "starts at" post |
| CoolzTricks | Havells Chef Air Fryer 5.5L at ₹4,463, `amzn.to/4zCTfI7` | Duplicate of #4793 (B0D7ZRLH5Z) |
| Rogerkart | AJIO Catwalk loot | Skipped: loot / category post |
| ONLINE SHOPPING DEALS | Philips GC1905/21 at ₹1,197, 10:21 PM | Duplicate of #16177 (B008QTK47Q) |
| Dealdost | Dry fruits 1KG at ₹436, 7:01 PM | Duplicate of #17309 (B0HLG1JX2V) |
| IFS Tips | Swiggy Instamart (Fri) | Skipped: not a product |
| Hidden Loot | Swiggy Dineout (Nov 11) | Skipped: not a product |
| INDIAN CHEAP DEALS | LG sale (Oct 29) | Stale |
| NonStopDeals | Caprese `fkrt.it` category (Oct 5) | Stale |

## Duplicates

| Post | Live row | Action |
|---|---|---|
| Havells Chef Air Fryer 5.5L | #4793 (B0D7ZRLH5Z) | Same message as 11-25g, where the PDP price was re-verified. No new check |
| Philips GC1905/21 | #16177 (B008QTK47Q) | Same message as 11-25g, re-verified there. No new check |
| Dry fruits 1KG | #17309 (B0HLG1JX2V) | Same message as 11-25g, re-verified there. No new check |

## Freshness

| Surface | Status |
|---|---|
| IndexNow | n/a, nothing pushed |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.18s, `/offers` 0.10s, `/blog` 0.64s, `/sitemap.xml` 0.08s, `/feed.xml` 0.07s, `/api/deals` 0.11s, `/llms.txt` 0.40s | OK |
| DB LIVE | 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 = 17,378 | OK |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 before this report | OK |
| CronList vs `.claude/cron-schedules.md` | 9 of 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a` to `g` exist, so this report uses `h` | OK |
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

## Still open

- **#16177 `priceValidUntil`:** missing. In-sync re-verifies write no PriceHistory row (SCHEMA-AUDIT 11-25, process gap 1).
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 15 rows repriced between INDEXNOW 11-24d and 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25h).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick read only the sidebar list, filtered that chat out, and opened neither the chat nor any of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
