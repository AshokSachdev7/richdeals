# DEAL-INGEST indiafreestuff tick — 2026-11-20d

This tick ran the liveness probe agreed at 19l instead of a full stage 1 sweep. It fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA (both 200) and probed the newest base64 `?rto=` Buy Now id from each with `curl -s -o NUL -w '%{http_code} %{redirect_url}'`, 3s apart. Run at about 06:53–07:00 IST on 11-20.

**Result: 0 new deals pushed, because both probed ids returned a 302 to the IFS homepage. 0 rows were re-priced and IndexNow was not called. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Source | Result |
|---|---|---|
| `MzA4NTMyMzY1OQ==` | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `Mjk4NDYyNDg0MQ==` | /deals/superdeals (top card) | 302 → `https://www.indiafreestuff.in/` |

The top ids are the same as at 20b and 20c. IFS has posted nothing new in about 4 hours.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 19j | 7 of 92 (last non-zero tick) |
| 19k | 0 of 92 |
| 19l | 0 of 90 |
| 20a | 0 of 3 probed |
| 20b | 0 of 2 probed |
| 20c | 0 of 2 probed |
| **20d** | **0 of 2 probed** |

**Plan (unchanged):** this slot stays probe-only for the rest of 11-20. If every 11-20 tick is 0, repoint the `23 */2 * * *` slot to another source at the first 11-21 tick.

## Pushed

None. No bulk POST was made, so there is no count to read.

## Repriced

None this tick. The four GSC top rows (#2321, #3492, #3506, #4188) still have `priceValidUntil` until 11-26, so their re-check is left to a later tick before then.

## Freshness

Nothing changed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.23s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.61s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.38s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 1 (the desidime 20d report), pushed with this one | OK |
| Report suffix | `deal-ingest-2026-11-20a` to `-c` existed, so this report uses suffix `d` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).
- **Cover lag after publish** is known behaviour and self-heals within 300s.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 07:01 |
| SITEMON | 11-20 07:14 |
| INDEXNOW | 11-20 07:23 |
| DESIDIME | 11-20 08:43 |
| DEAL-INGEST | 11-20 08:53 |
| CONTENT-SEO | 11-20 12:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
