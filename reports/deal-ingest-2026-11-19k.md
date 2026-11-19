# DEAL-INGEST indiafreestuff tick — 2026-11-19k

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `indiafreestuff.in/deals` (pages 1–3) and `/deals/superdeals` with a browser UA and a 2.6s gap between requests. It applied the JUNK, GROCERY and RESTRICTED filters and tried to resolve every base64 `?rto=` Buy Now id to a merchant URL. Run at about 20:53–21:01 IST (15:23–15:31 UTC).

**Result: 0 deals pushed. Stage 1 discovered 92 cards and resolved 0 of them: every `?rto=` id returned a 302 to `https://www.indiafreestuff.in/`. Nothing was guessed from card titles, so there was nothing to verify or ping. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Stage 1 and the redirector

The full stage 1 run wrote 92 drops, all with the same final URL (the IFS homepage), and 0 candidates. The 19j revival (7 of 92) did not hold.

Several of tonight's IFS cards are the same products DESIDIME 19k already verified and pushed an hour earlier: the Aliensware cabinet organiser (#16954), the Epson 664 ink set (#16955), the FRONTECH 512GB SSD (#16957) and the Crucial 8GB SODIMM (#16963). Those deals are already LIVE at PDP-verified prices, so the dead redirector cost little this tick.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 18g | 7 of 99 |
| 18h | 0 of 85 |
| 18i | 7 of 91 |
| 18j–18l | 0 at each tick |
| 19a–19i | 0 at each tick |
| 19j | 7 of 92 (probe 3 of 3) |
| **19k** | **0 of 92** |

**Decision:** unchanged from 19i. The slot keeps its `23 */2 * * *` schedule, and 22:53 IST is the last 11-19 tick. If it also resolves 0, the first 11-20 tick runs a 1-id probe as a liveness check and spends the rest of the slot on Telegram deep-history reads instead of a full 92-card sweep.

## Pushed

None. No Buy Now id resolved, so there was no merchant URL to verify, and the protocol forbids building a product from a card title.

## Rejected

None recorded. The 92 drops are redirector failures, not quality rejects, so `data/dd-rejected.json` is unchanged at 2,146 entries.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced, so there were no slugs to submit. |
| `sitemap.xml` | Unchanged by this tick (ISR 1800s) |
| `llms.txt` | `force-dynamic`, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.56s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.40s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 21:01 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,356 = 16,356 | OK (no change from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,965 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,963 vs 16,965 | Catching up on DESIDIME 19k's pushes (it was at 16,953 an hour ago), so the external cron is working. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** back to 0 of 92 at 19k after the brief 19j revival.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962.
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-19 21:01 |
| SITEMON | 11-19 21:14 |
| DESIDIME | 11-19 22:43 |
| DEAL-INGEST | 11-19 22:53 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
