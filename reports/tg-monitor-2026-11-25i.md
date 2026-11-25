# TELEGRAM-DEAL-MONITOR tick — 2026-11-25i

This tick ran at about 07:45–08:10 IST on 11-25 (02:15–02:40 UTC).

Method: one `browser_evaluate` over the `.chat-list` sidebar in the richDeals Playwright profile, reading the newest post of each group in `data/tg-groups.json`. The forbidden rows ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨" and "Auto Request Accepter Bot") were filtered out of the read and never opened.

**Result:**
- 0 new deals pushed. The only new single-product post since 11-25h (Dealzone, Parachute body lotion) is a duplicate of LIVE row #4605.
- The duplicate was re-verified on the Amazon PDP. The price had moved, so #4605 was repriced from ₹99 to ₹132 (M.R.P. ₹275 → ₹440, 64% → 70% off). The slug did not change.
- IndexNow returned HTTP 200 for 4 URLs.
- 10 of 13 groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba are absent from the sidebar.
- The CEO audit is green.

## Sidebar

| Group | Newest post | Decision |
|---|---|---|
| Dealzone | Parachute Advansed body lotion 400ml at ₹132, `link.amazon/B02m0laF2`, 07:42 | Resolved to B00CBRJ34E (their tag `glitzdeal05-21`). Duplicate of #4605, repriced (see below) |
| SB Loots | promo | Skipped: not a product |
| CoolzTricks | Havells Chef Air Fryer 5.5L | Duplicate of #4793 (B0D7ZRLH5Z), same message as 11-25g |
| Rogerkart | AJIO Catwalk loot | Skipped: loot / category post |
| ONLINE SHOPPING DEALS | Philips GC1905/21 at ₹1,197 | Duplicate of #16177, same message as 11-25g |
| Dealdost | Dry fruits 1KG at ₹436 | Duplicate of #17309, same message as 11-25g |
| IFS Tips | Swiggy Instamart | Skipped: not a product |
| Hidden Loot | Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | Oct 29 post | Stale |
| NonStopDeals | Oct 5 post | Stale |

## Duplicates

| Post | Live row | Action |
|---|---|---|
| Parachute Advansed Deep Nourish Body Lotion 400ml | #4605 (B00CBRJ34E) | PDP read in the logged-in Amazon tab: ₹132, M.R.P. ₹440 (-70%), "In stock", add-to-cart present, 4.2★ from 70,442 ratings. The DB row still said ₹99 / ₹275 / 64% from 10-07. Updated `price`, `mrp`, `discountPct` and the description in one transaction, and added PriceHistory row #17732 at ₹132. Slug and title unchanged; the title carries no ₹ figure |
| Havells Chef Air Fryer 5.5L | #4793 (B0D7ZRLH5Z) | Same message as 11-25g, re-verified there. No new check |
| Philips GC1905/21 | #16177 (B008QTK47Q) | Same message as 11-25g, re-verified there. No new check |
| Dry fruits 1KG | #17309 (B0HLG1JX2V) | Same message as 11-25g, re-verified there. No new check |

The reprice also writes a fresh PriceHistory row, so #4605 gets a current `priceValidUntil` again.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200, 4 URLs: the #4605 slug plus `/`, `/offers` and `/sitemap.xml` |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.17s, `/offers` 0.09s, `/blog` 0.52s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.10s, `/llms.txt` 0.43s | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 = 17,378 | OK |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a` to `h` exist, so this report uses `i` | OK |
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
- **Stale reposts:** 1 row repriced this tick (#4605, ₹99 → ₹132, untouched since 10-07). Old LIVE rows drift silently until a channel reposts them.
- **Deflated M.R.P.:** #4605 carried ₹275 while Amazon now shows ₹440, so other old rows may understate the M.R.P. as well as the price.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25i).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick read only the sidebar list, filtered that chat out, and opened neither the chat nor any of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
