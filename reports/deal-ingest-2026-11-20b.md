# DEAL-INGEST indiafreestuff tick — 2026-11-20b

This tick ran the liveness probe agreed at 19l instead of a full stage 1 sweep. It fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA (both 301 to `www.` and then 200, at 313 KB and 487 KB) and took the newest base64 `?rto=` Buy Now ids. It then probed two of them 3s apart with `curl -s -o NUL -w '%{http_code} %{redirect_url}'`. Run at about 02:53–02:56 IST on 11-20 (21:23–21:26 UTC on 11-19).

**Result: 0 deals pushed. Both probed ids returned a 302 to the IFS homepage, so the redirector is still dead. Nothing was guessed from card titles. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Source | Result |
|---|---|---|
| `MzA4NTMyMzY1OQ==` | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `Mjk4NDYyNDg0MQ==` | /deals/superdeals (top card) | 302 → `https://www.indiafreestuff.in/` |

The top 3 ids on `/deals` are the same as at 20a (`MzA4NTMyMzY1OQ==`, `MzA4NTMyMjU0OA==`, `MzA4NTMyMTQzNw==`). IFS has posted nothing new in the last 2 hours.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 19j | 7 of 92 (last non-zero tick) |
| 19k | 0 of 92 |
| 19l | 0 of 90 |
| 20a | 0 of 3 probed |
| **20b** | **0 of 2 probed** |

**Plan (unchanged from 20a):** this slot stays probe-only for all of 11-20. If every 11-20 tick is 0, repoint the `23 */2 * * *` slot to another source at the first 11-21 tick.

## Pushed / Repriced

None. No bulk POST was made and no row was touched.

## Freshness

No slugs were pushed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.18s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.51s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.07s |
| `/llms.txt` | 200 | 0.36s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a.md` existed, so this report uses suffix `b` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 03:01 |
| SITEMON | 11-20 03:14 |
| SCHEMA-AUDIT | 11-20 04:39 |
| DESIDIME | 11-20 04:43 |
| DEAL-INGEST | 11-20 04:53 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| INDEXNOW | 11-20 07:23 |
| AI-OVERVIEW | 11-25 11:39 |
