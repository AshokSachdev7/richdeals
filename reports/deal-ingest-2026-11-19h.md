# DEAL-INGEST indiafreestuff tick — 2026-11-19h

The tick fetched `indiafreestuff.in/deals` and `/deals/superdeals` with a browser UA, waiting at least 2.5s between requests. Before any full sweep, it probed two `?rto=` Buy Now ids per listing against the redirector, using the exact hrefs from the listing HTML (`https://www.indiafreestuff.in/?rto=<id>`). Run at about 14:53–15:00 IST.

**Result: 0 deals pushed. All 4 probes (3 unique ids) returned a 302 to the IFS homepage, so the redirector is still dead. Stage 1 was skipped, nothing was guessed from card titles, and there was nothing to ping. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Redirector probe

| Listing | Cards | Probed ids | Result |
|---|---|---|---|
| `/deals` | ~32 (new top id; at 19g the top was `MzA4NTE5ODExNg==`) | `MzA4NTIxMjU1OQ==`, `MzA4NTIxMTQ0OA==` | 302 → `https://www.indiafreestuff.in/` for both |
| `/deals/superdeals` | ~40 (top card is the same new id as `/deals`) | `MzA4NTIxMjU1OQ==`, `MzAzNDA4ODc4Mw==` | 302 → `https://www.indiafreestuff.in/` for both |

IFS keeps posting new cards (two new ids since 19g), and the redirector still sends every one home.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19g | 0 at each tick |
| **19h** | **0 of 3 unique ids probed (~72 cards, new top id shared by both listings)** |

That makes thirteen zero ticks in a row, eight of them on 11-19.

**Decision:** unchanged. The slot keeps its `23 */2 * * *` schedule for the rest of 11-19 IST (16:53, 18:53, 20:53, 22:53 remain). If every remaining 11-19 tick also resolves 0, the first 11-20 tick moves the slot's work to Telegram deep-history reads and keeps only the IFS probe as a cheap liveness check.

## Pushed

None. No Buy Now id resolved, so there was no merchant URL to verify, and the protocol forbids building a product from a card title.

## Freshness

- **IndexNow:** no ping. Nothing was pushed or repriced, so there were no slugs to submit.
- **`sitemap.xml`** and **`llms.txt`:** unchanged by this tick.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.51s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.39s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 14:58 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,324 | OK, unchanged since DESIDIME 19h |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 (CH95 Curcumin, ₹599) waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,933 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,933 = 16,933 | OK, caught up on DESIDIME 19h's batch |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Since the last DEAL-INGEST tick (19g, 13:05)

| Tick | Outcome |
|---|---|
| INDEXNOW 19c | Report committed (9b7f744). |
| SITEMON 19m, 19n | All green. Reports committed (d2f26ef, 6028d7d). |
| TG 19o | 0 pushed; #5848 confirmed at the same price. Report committed (1a2ee71). |
| DESIDIME 19h | Pushed #16929–#16933 (count 5). Repriced #3221, #3538, #4722, #13345. IndexNow 200 for 12 URLs. Report committed (a792967). |

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for thirteen ticks in a row (see above).
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 Flux, #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| TG | 15:01 |
| SITEMON | 15:14 |
| DESIDIME | 16:43 |
| DEAL-INGEST | 16:53 |
| CONTENT-SEO | 18:39 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
