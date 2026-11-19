# DEAL-INGEST indiafreestuff tick — 2026-11-19f

The tick fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, waiting at least 2.5s between requests. It counted the unique base64 `?rto=` Buy Now ids on each listing. Before any full sweep, it probed one id per listing against the redirector, as the protocol has required since 18j. Each probe used the listing's current top id and the exact href from the listing HTML (`https://www.indiafreestuff.in/?rto=<id>`). Run at about 10:55–10:58 IST.

**Result: 0 deals pushed. Both probes returned a 302 to the IFS homepage, so the redirector is still dead. Stage 1 was skipped, nothing was guessed from card titles, and there was nothing to ping. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Redirector probe

| Listing | Unique `?rto=` cards | Probed id | Result |
|---|---|---|---|
| `/deals` | 33 (new top id; at 19e the top was `MzA4NTE0NzAxMA==`) | `MzA4NTE2NDc4Ng==` (new top card) | 302 → `https://www.indiafreestuff.in/` |
| `/deals/superdeals` | 41 (top changed; at 19e it was `MzA3OTgxNzU0Mw==`) | `MzAxODg0Njk3NA==` (current top card) | 302 → `https://www.indiafreestuff.in/` |

IFS keeps posting new `/deals` cards, but the redirector sends even a brand-new id home.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19e | 0 of 2 probed at each tick |
| **19f** | **0 of 2 probed (74 cards, fresh top id on `/deals`)** |

That makes eleven zero ticks in a row, six of them on 11-19.

**Decision:** unchanged. The slot keeps its `23 */2 * * *` schedule for the rest of 11-19 IST. If every remaining 11-19 tick also resolves 0, the first 11-20 tick moves the slot's work to Telegram deep-history reads and keeps only the one-id IFS probe as a cheap liveness check.

## Pushed

None. No Buy Now id resolved, so there was no merchant URL to verify, and the protocol forbids building a product from a card title.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.41s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.81s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.18s) |
| /api/deals | 200 (0.22s) |
| /llms.txt | 200 (0.94s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 10:57 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,301 = 16,301 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,909 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,906 vs 16,909 | OK. The cursor was written at 10:54 IST, so the external broadcast cron is running and is partway through DESIDIME 19f's batch (#16902–#16909). It picks up the last 3 on its next run. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Since the last DEAL-INGEST tick (19e, 08:53)

| Tick | Outcome |
|---|---|
| TG 19k | Pushed #16901. IndexNow 200 for 4 URLs. |
| SITEMON 19j | Nothing to fix. |
| DESIDIME 19f | Pushed #16902–#16909 (count 8). Repriced #13590 and #2205. IndexNow 200 for 13 URLs. |

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** dead for eleven ticks in a row (see above).
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| TG | 11:01 |
| SITEMON | 11:14 |
| CONTENT-SEO | 12:39 |
| DESIDIME | 12:43 |
| DEAL-INGEST | 12:53 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
