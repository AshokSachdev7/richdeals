# DEAL-INGEST indiafreestuff tick — 2026-11-25c

This tick ran at about 04:54–05:01 IST on 11-25 (23:24–23:31 UTC on 11-24). It was run inline per `.claude/agents/deal-ingest.md` and CLAUDE.md.

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals`, `/deals?page=2`, `/deals?page=3` and `/deals/superdeals`. It resolved each base64 `?rto=` Buy Now id to the merchant URL, applied the affiliate matrix from `ingest.config.json` and checked non-Amazon prices against the merchant's ld+json. Every resolved product was either already a LIVE row with an in-sync price or on the 24-hour reject list, so no product page needed a browser read and the Playwright tabs were not used.

**Result:**

- **0 deals were pushed.** indiafreestuff has posted nothing new that passes the filters since 11-25b.
- **55 duplicates were checked against the DB.** All 55 are LIVE and none drift by more than ₹1, so nothing was repriced.
- **IndexNow was not run,** because there were no new or repriced slugs.
- **The CEO audit is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/deals` pages 1–3 + `/deals/superdeals`) | 85 |
| Dropped (sale hubs, category pages, unresolvable Flipkart pids) | 7 |
| Resolved to a single product | 78 |
| Already in the DB (duplicates, price sync) | 55 |
| On the 24-hour reject list | 23 |
| Fresh candidates | 0 |

## Drops

| Card | Reason |
|---|---|
| Noise Buds Mini X (Flipkart) | `/indiafreestuff/p/` pid, no `itm` path to resolve |
| Acer Aspire One (Flipkart) | `/indiafreestuff/p/` pid, no `itm` path to resolve |
| Flipkart Black Friday sale | Sale hub, not a product |
| AJIO innerwear and loungewear, min 40% off | Category page |
| Try it First samples ₹1 (Amazon `/b?node`) | Category page |
| Network & Netplay blazers (AJIO) | Category page |
| GAP clothing, min 60% off (AJIO) | Category page |

## Rejected and skipped

23 resolved products were still inside their 24-hour window in `data/dd-rejected.json`: the 21 carried from 11-25b plus B0B9JTHGSG (ANTINA rope) and B07BMWTY61 (Yuvika). They were not re-read. `data/dd-rejected.json` was not changed.

## Duplicates (price sync)

All 55 duplicates are LIVE rows matched by `productId`, with the card price within ₹1 of the DB price. Nothing was repriced and no slug was rewritten. The two Myntra overcoats re-verified through ld+json this tick, TROO 44958403 (₹1,934, #17348) and All About You 14231020 (₹2,209, #17349), are both in sync.

## Push

None. No bulk call was made.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **Not run.** No new or repriced slugs this tick |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.39s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.19s, `/offers` 0.10s, `/blog` 0.57s, `/sitemap.xml` 0.07s, `/feed.xml` 0.13s, `/api/deals` 0.09s, `/llms.txt` 0.39s, all 200 | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 vs 17,378 | OK |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-25a` and `b` exist, so this report uses `c` | OK |
| Deploy | None. Data-only tick | n/a |

No deal or post was created since DESIDIME 11-25c.

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

- **#16177 `priceValidUntil`:** missing even though the row was re-verified in sync today. In-sync re-verifies write no PriceHistory row (see SCHEMA-AUDIT 11-25, process gap 1). The 55 in-sync duplicates this tick have the same gap.
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
- **Flipkart drops:** the `/indiafreestuff/p/` cards (Noise Buds Mini X and Acer Aspire One again this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25e).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
