# DEAL-INGEST indiafreestuff tick — 2026-11-25d

This tick ran at about 06:53–07:00 IST on 11-25 (01:23–01:30 UTC).

**Result:** 0 new deals. The sweep of `/deals` and `/deals/superdeals` found the same set as 25c: every resolved product is either already LIVE (55) or was rejected within the last 24 hours (23). Nothing was pushed, so nothing was pinged. The CEO audit is green: all 7 prod endpoints return 200 and there is nothing to fix.

## Stage 1 (`ingest-ifs-proper.mjs`)

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 85 |
| Dropped (see below) | 7 |
| Resolved to a single product | 78 |
| Already in the DB (by `productId`) | 55 |
| On the 24-hour reject list (`data/dd-rejected.json`) | 23 |
| Fresh | **0** |

## Drops

| Card | Store | Reason |
|---|---|---|
| Noise Buds Mini X | Flipkart | `/indiafreestuff/p/` pid, no real `itm` |
| Acer Aspire One | Flipkart | `/indiafreestuff/p/` pid, no real `itm` |
| Black Friday sale | Flipkart | Sale hub, not a product |
| Innerwear, min 40% off | AJIO | Category page |
| Try it First samples | Amazon (`/b?node`) | Category page |
| Network & Netplay blazers | AJIO | Category page |
| GAP, min 60% off | AJIO | Category page |

## Rejected and skipped

All 23 resolved products that are not in the DB were rejected between 2026-11-24T13:21Z and 21:31Z, which is inside the 24-hour window. They were not re-read on the PDP and `dd-rejected.json` is unchanged:

B0B9JTHGSG, B0FL7CZ5PD, B0BQM23PDT, B0DFYXMKND, B0CH836DBR, B0C7R4BRCG, B0CDH152MM, B0HK65QYFZ, B07BMWTY61, B0BT7VF3HM, B07TX1TR3L, B07DC4SCXS, B0BYXH6FZ4, B08DM52NXS, B0CH83TPTZ, B0HBQHXC7F, B07KK8C2YD, B0FLVYB67J, B0HLS25C4T, B0HDNMYXMN, B0HJ2B3B1R, B0CZXGTSZY, B0HPYF14R8.

## Duplicates (price sync)

All 55 duplicates are LIVE rows. Two differ from the card by exactly ₹1. That is inside the ±₹1 tolerance, so neither was repriced:

| Product | Card | DB row |
|---|---|---|
| Philips LED tubelight (B0DQV4Z4TM) | ₹1,751 | #17355 LIVE at ₹1,750 |
| LUKER LED batten (B0G3HFY8GG) | ₹122 | #17360 LIVE at ₹121 |

The two Myntra duplicates, TROO 44958403 (#17348) and All About You 14231020 (#17349), passed the stage-1 ld+json check.

## Push

None. There were no fresh deals, so `/admin/deals/bulk` was not called.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No URL changed this tick |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## Prod endpoints

| URL | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.62s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.07s |
| `/api/deals` | 200 | 0.13s |
| `/llms.txt` | 200 | 0.43s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,771 | OK, unchanged |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 = 17,378 | OK |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-25a` to `c` exist, so this report uses `d` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, which is on target. CONTENT-SEO runs again at 12:39 and 18:39 IST |

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
- **Flipkart drops:** the `/indiafreestuff/p/` cards (2 again this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25g).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
