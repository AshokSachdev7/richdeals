# DESIDIME-INGEST tick — 2026-11-25c

This tick ran at about 04:40–04:50 IST on 11-25 (23:10–23:20 UTC on 11-24). It was run inline per `.claude/agents/desidime-ingest.md`.

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Every resolved product was either already in the DB or on the 24-hour reject list, so there was nothing to verify and the Playwright tab was not used.

**Result:**

- **0 deals were pushed.** DesiDime has posted nothing new since 11-25b.
- **9 duplicates were checked against the DB.** All 9 are LIVE and match the card price exactly, so nothing was repriced.
- **IndexNow was not run,** because there were no new or repriced slugs.
- **The CEO audit is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Dropped as junk, grocery or a non-product link | 14 |
| Resolved to a single product | 20 |
| Already in the DB (duplicates, price sync) | 9 |
| On the 24-hour reject list | 11 |
| Fresh candidates | 0 |

The 24-hour reject list covered the Qubo video doorbell lock and Wipro Garnet bulbs (drift in 11-25b), the Samsung Tab S10+, Dabur Tulsi Drops, Sony MDR-M1, a Daikin AC, a Bosch 302L fridge, a Khaitan Volt heater (B0H8PBSZMY), an ASUS VA259HGA monitor (B0F9KBZ8W3), Flipkart Minutes peanuts and an HDFC offer. `data/dd-rejected.json` was not changed.

## Duplicates (price sync)

| Row | Product | Card | DB | Action |
|---|---|---|---|---|
| #17375 | FUJIFILM Instax Mini 41 (Myntra) | ₹10,499 | ₹10,499 | None, in sync |
| #17376 | FUJIFILM Instax Mini 13 (Myntra) | ₹8,499 | ₹8,499 | None, in sync |
| #17377 | Lokza wireless doorbell (Flipkart) | ₹641 | ₹641 | None, in sync |
| #17378 | EvolvIOT switch module (Flipkart) | ₹998 | ₹998 | None, in sync |
| #17346 | DENVY bulb-holder camera (Flipkart) | ₹1,910 | ₹1,910 | None, in sync |
| #17347 | Cut overcoat (Myntra) | ₹2,024 | ₹2,024 | None, in sync |
| #17348 | Troo overcoat (Myntra) | ₹1,934 | ₹1,934 | None, in sync |
| #17349 | All About You overcoat (Myntra) | ₹2,209 | ₹2,209 | None, in sync |
| #17205 | GAP printed tee (Flipkart) | ₹386 | ₹386 | None, in sync |

## Push

None. No bulk call was made.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **Not run.** No new or repriced slugs this tick |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.35s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.19s, `/offers` 0.08s, `/blog` 0.63s, `/sitemap.xml` 0.05s, `/feed.xml` 0.13s, `/api/deals` 0.10s, `/llms.txt` 0.35s, all 200 | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 vs 17,378 | OK |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-25a` and `b` exist, so this report uses `c` | OK |
| Deploy | None. Data-only tick | n/a |

No deal or post was created since SCHEMA-AUDIT 11-25.

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

- **#16177 `priceValidUntil`:** missing even though the row was re-verified in sync today. In-sync re-verifies write no PriceHistory row (see SCHEMA-AUDIT 11-25, process gap 1). The 9 in-sync duplicates this tick have the same gap.
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
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25e).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
