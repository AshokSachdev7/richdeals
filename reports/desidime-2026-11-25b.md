# DESIDIME-INGEST tick — 2026-11-25b

This tick ran at about 02:45–03:15 IST on 11-25 (21:15–21:45 UTC on 11-24). It was run inline per `.claude/agents/desidime-ingest.md`.

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. No Amazon candidate was fresh this tick, so the Playwright tab was not used. Every fresh candidate was non-Amazon and was verified with `productLd()` (ld+json price within ₹1, InStock).

**Result:**

- **4 deals were pushed LIVE** (#17375–#17378) in one bulk call. It returned `count: 4`, with `created: true` and `ok: true` for every row.
- **2 Flipkart candidates were rejected** for price drift.
- **5 duplicates were re-checked.** All 5 are LIVE and in sync, so nothing was repriced.
- **IndexNow returned HTTP 200** for 7 URLs.
- **The CEO audit is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Dropped as junk, grocery or a non-product link | 14 |
| Resolved to a single product | 20 |
| Already in the DB (duplicates, price sync) | 5 |
| On the 24-hour reject list | 9 |
| Fresh candidates | 6 |
| Verified and pushed | 4 |
| Rejected in verification | 2 |

The non-product drop included a Cello thermos that resolved to an Amazon `/clp/` landing page. The 24-hour reject list covered the Samsung Tab S10+, Dabur Tulsi Drops, Sony MDR-M1, a Daikin AC, a Bosch 302L fridge, a Khaitan Volt heater, an ASUS VA259HGA monitor, Flipkart Minutes peanuts and an HDFC offer.

## Fresh candidates

| ID | Store | Product | Card price | Live read | Decision |
|---|---|---|---|---|---|
| 39766794 | Myntra | FUJIFILM Instax Mini 41 instant film camera | ₹10,499 | ₹10,499, M.R.P. ₹13,999, in stock | **Pushed** #17375 |
| 41598513 | Myntra | FUJIFILM Instax Mini 13 instant camera, Clay White | ₹8,499 | ₹8,499, M.R.P. ₹10,999, in stock | **Pushed** #17376 |
| EBLGSF27GA87MTFZ | Flipkart | Lokza wireless doorbell, 300 m range, 55 tunes | ₹641 | ₹641, in stock | **Pushed** #17377. The ₹3,999 M.R.P. implies 84% off, so it was stored as null |
| SSWHGXFTJFUQZMF8 | Flipkart | EvolvIOT SW5R4T1 smart 4+1 node switch module | ₹998 | ₹998, in stock | **Pushed** #17378. The ₹6,000 M.R.P. implies 83% off, so it was stored as null |
| SLOHGFFGYH5DNGKP | Flipkart | Qubo video doorbell smart lock | ₹16,840 | ₹21,690 | **Rejected:** drift |
| LLSGNHNCA5T2AGHP | Flipkart | Wipro Garnet 9W smart bulb, pack of 2 | ₹664 | ₹777 | **Rejected:** drift |

Both rejects were added to `data/dd-rejected.json` with `Date.now()` (now 2,286 keys).

## Duplicates (price sync)

| Row | Product | DB price | Action |
|---|---|---|---|
| #17346 | DENVY bulb-holder security camera | ₹1,910 | None, in sync |
| #17347 | Cut overcoat | ₹2,024 | None, in sync |
| #17348 | Troo overcoat | ₹1,934 | None, in sync |
| #17349 | All About You overcoat | ₹2,209 | None, in sync |
| #17205 | GAP | ₹386 | None, in sync |

## Push

| Row | Slug | Affiliate |
|---|---|---|
| #17375 | `fujifilm-instax-mini-41-instant-film-camera-39766794` | InRDeals (Myntra) |
| #17376 | `fujifilm-instax-mini-13-instant-camera-clay-white-41598513` | InRDeals (Myntra) |
| #17377 | `lokza-wireless-doorbell-with-300-m-range-and-55-tunes-eblgsf27ga87mtfz` | Flipkart `affid=djhackraj` on `/p/itm…` |
| #17378 | `evolviot-smart-4-1-node-switch-module-sw5r4t1-with-wi-fi-and-bluetooth-sswhgxftjfuqzmf8` | Flipkart `affid=djhackraj` on `/p/itm…` |

Titles follow "Product at ₹X (N% Off) – Store", and "(N% Off)" is dropped where the M.R.P. was nulled. The ₹ in each title matches the stored price. Descriptions are original and contain no invented specs. All 4 prod pages returned 200 (0.13–0.17s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200** for 7 URLs: the 4 new slugs plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.42s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.19s, `/offers` 0.08s, `/blog` 0.60s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.09s, `/llms.txt` 0.42s, all 200 | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK (16,767 + the 4 new rows) |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 vs 17,374 | OK. The 4 new rows are waiting for the external broadcast cron |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-25a` exists, so this report uses `b` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
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
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, and now #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25c).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
