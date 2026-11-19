# DEAL-INGEST indiafreestuff tick — 2026-11-20a

This was the first 11-20 tick, so it ran the 1-id liveness probe agreed at 19l instead of a full stage 1 sweep. It fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, took the newest base64 `?rto=` Buy Now ids from the `btn btn-shopnow` anchors, and probed them 3s apart with `curl -s -o NUL -w '%{http_code} %{redirect_url}'`. Run at about 00:50–00:58 IST on 11-20 (19:20–19:28 UTC on 11-19).

**Result: 0 deals pushed. Both listing pages returned 200, but all 3 probed ids returned a 302 to the IFS homepage, so the redirector is still dead. Nothing was guessed from card titles. Prod returned 200 on 7 of 7 endpoints.**

## Stage 1 and the redirector

| Id | Source | Result |
|---|---|---|
| `MzA4NTMyMzY1OQ==` | /deals | 302 → `https://www.indiafreestuff.in/` |
| `MzA4NTMyMjU0OA==` | /deals | 302 → `https://www.indiafreestuff.in/` |
| `MzA4NTMyMTQzNw==` | /deals/superdeals | 302 → `https://www.indiafreestuff.in/` |

All 3 ids are newer than any seen at 19l, so IFS is still posting deals. Only their outbound redirector is broken.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19i | 0 at each tick |
| 19j | 7 of 92 |
| 19k | 0 of 92 |
| 19l | 0 of 90 |
| **20a** | **0 of 3 probed** |

**Decision:** keep the `23 */2` slot as a probe-only tick for the rest of 11-20, with 1 to 3 ids per tick, so we stop hitting their domain with full 90-card sweeps. If any probe resolves, the same tick runs the full stage 1 sweep. If every 11-20 tick resolves 0, the slot will be repointed at the first 11-21 tick.

The 19l plan was to spend the rest of a failed slot on Telegram deep-history reads. That was skipped this time because the TELEGRAM-DEAL-MONITOR cron fires at 01:01 IST, 3 minutes after this tick ended, and two Playwright drivers on the same profile would collide.

## Pushed

None.

## Rejected

None recorded. Redirector failures are not quality rejects, so `data/dd-rejected.json` was not changed.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced. |
| `sitemap.xml` | 200, unchanged by this tick (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.22s |
| `/offers` | 200 | 0.17s |
| `/blog` | 200 | 0.73s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.13s |
| `/llms.txt` | 200 | 0.59s |
| `/api/deals` | 200: total 16,367, newest id 16,974 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,367 = 16,367 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,974 | OK |
| Posts | 501, 0 coverless | OK |
| Broadcast cursor vs DB max | 16,974 = 16,974 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `deal-ingest-2026-11-20*` file existed, so this report uses suffix `a` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 of 3 at 20a. Probe-only until it resolves or 11-20 ends at 0.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 01:01 |
| INDEXNOW | 11-20 01:05 |
| SITEMON | 11-20 01:14 |
| DESIDIME | 11-20 02:43 |
| DEAL-INGEST | 11-20 02:53 |
| SCHEMA-AUDIT | 11-20 04:39 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| AI-OVERVIEW | 11-25 11:39 |
