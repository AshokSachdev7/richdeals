# DEAL-INGEST indiafreestuff tick — 2026-11-19e

The tick fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, waiting at least 2.5s between requests. It counted the unique base64 `?rto=` Buy Now ids on each listing. Before any full sweep, it probed one id per listing against the redirector, as the protocol has required since 18j. Both listings had new top cards since 19d, so the tick probed each listing's new top id, using the exact href from the listing HTML. Run at about 08:53–08:55 IST.

**Result: 0 deals pushed. Both probes returned a 302 to the IFS homepage (`https://www.indiafreestuff.in/`), so the redirector is still dead. This happened even though IFS is posting again: both listings have fresh cards. Stage 1 was skipped, nothing was guessed from card titles, and there was nothing to ping. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Redirector probe

| Listing | Unique `?rto=` cards | Probed id | Result |
|---|---|---|---|
| `/deals` | 33 (new top id `MzA4NTE0NzAxMA==`; at 19d the top was `MzA4NTE0MTQ1NQ==`) | `MzA4NTE0NzAxMA==` (new top card) | 302 → IFS homepage |
| `/deals/superdeals` | 41 (new top id `MzA3OTgxNzU0Mw==`; at 19d the top was `MzA4NDY2NDgzNg==`) | `MzA3OTgxNzU0Mw==` (new top card) | 302 → IFS homepage |

IFS posted at least three new `/deals` cards between 07:05 and 08:53. The redirector still sends even a brand-new id home, so the failure is in the redirector itself, not in stale ids.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j | 0 of 87 |
| 18k | 0 of 94 |
| 18l | 0 of 96 |
| 19a | 0 of 2 probed |
| 19b | 0 of 2 probed (82 cards) |
| 19c | 0 of 2 probed (74 cards) |
| 19d | 0 of 2 probed (74 cards) |
| **19e** | **0 of 2 probed (74 cards, both fresh top ids)** |

That makes ten zero ticks in a row, five of them on 11-19.

**Decision:** unchanged. The slot stays on its `23 */2 * * *` schedule for the rest of 11-19 IST. If every remaining 11-19 tick (10:53 onward) also resolves 0, the first 11-20 tick moves the slot's work to Telegram deep-history reads and keeps only the one-id IFS probe as a cheap liveness check.

## Pushed

None. No Buy Now id resolved, so there was no merchant URL to verify, and the protocol forbids building a product from a card title.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.56s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 08:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,292 = 16,292 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,900 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,900 = 16,900 | OK. The external cron has broadcast DESIDIME 19e's #16900. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):**

| Day | Posts |
|---|---|
| 11-09 | 3 |
| 11-10 | 3 |
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| **11-19** | **2** |

11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Both need a Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19e. The repoint decision is above.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| TG | 09:01 |
| SITEMON | 09:14 |
| DESIDIME | 10:43 |
| DEAL-INGEST | 10:53 |
| CONTENT-SEO | 12:39 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
