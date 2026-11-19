# DEAL-INGEST indiafreestuff tick — 2026-11-19i

The tick fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, waiting at least 2.5s between requests. Before any full sweep, it probed three `?rto=` Buy Now ids against the redirector, using the exact hrefs from the listing HTML (`https://www.indiafreestuff.in/?rto=<id>`). It also grepped both listings for any direct store link (Amazon, `amzn.to`, Flipkart, `fkrt.*`, Myntra, Ajio) and found none. Run at about 16:50–16:55 IST.

**Result: 0 deals pushed. All 3 probed ids returned a 302 to the IFS homepage, so the redirector is still dead. Stage 1 was skipped, nothing was guessed from card titles, and there was nothing to ping. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Redirector probe

| Listing | Ids on page | Probed ids | Result |
|---|---|---|---|
| `/deals` | 33 (new top id; at 19h the top was `MzA4NTIxMjU1OQ==`) | `MzA4NTIzMDMzNQ==`, `MzA4NTIyOTIyNA==` | 302 → `https://www.indiafreestuff.in/` for both |
| `/deals/superdeals` | 41 (top card is the same new id as `/deals`) | `MzAzNDA4ODc4Mw==` | 302 → `https://www.indiafreestuff.in/` |

IFS keeps posting new cards (two new ids since 19h), and the redirector still sends every one home.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19h | 0 at each tick |
| **19i** | **0 of 3 unique ids probed (~74 cards)** |

That makes fourteen zero ticks in a row, nine of them on 11-19.

**Decision:** unchanged. The slot keeps its `23 */2 * * *` schedule for the rest of 11-19 IST (18:53, 20:53, 22:53 remain). If every remaining 11-19 tick also resolves 0, the first 11-20 tick moves the slot's work to Telegram deep-history reads and keeps only the IFS probe as a cheap liveness check.

## Pushed

None. No Buy Now id resolved, so there was no merchant URL to verify, and the protocol forbids building a product from a card title.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.19s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.57s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.37s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 16:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,331 = 16,331 | OK, unchanged since DESIDIME 19i |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,940 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,936 vs 16,940 | Behind by DESIDIME 19i's 4 pushes only. The external broadcast cron catches up on its next run, so this is not rot. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Since the last DEAL-INGEST tick (19h, 14:53)

| Tick | Outcome |
|---|---|
| TG 19p | Pushed #16934 (count 1). Report committed (cc8c779). |
| SITEMON 19o, 19p | All green. Reports committed (bed1b46, 8b4b763). |
| TG 19q | Pushed #16935–#16936 (count 2). Report committed (ab926e7). |
| DESIDIME 19i | Pushed #16937–#16940 (count 4). Repriced #13527 Dove to ₹67. IndexNow 200 for 8 URLs. Report committed (2df0be6). |

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for fourteen ticks in a row (see above).
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 (CG Iraya geyser), #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| TG | 17:01 |
| SITEMON | 17:14 |
| CONTENT-SEO | 18:39 |
| DESIDIME | 18:43 |
| DEAL-INGEST | 18:53 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
