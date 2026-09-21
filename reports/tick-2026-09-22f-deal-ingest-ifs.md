# DEAL-INGEST indiafreestuff tick — 2026-09-22 (05:00 IST)

**Result: 0 published.** Same 6 fresh candidates as the 03:03 sweep, rejected again on the same grounds. No batch → no IndexNow ping (correctly skipped).

## Discovery — bit-identical to two hours ago

`node apps/api/scripts/ingest-ifs-proper.mjs` over `/deals` + `/deals/superdeals`, 2600ms between their requests.

**43 discovered, 38 resolved, same 5 non-product drops** (`prime-members-amazon-great-indian-festiv`, `flipkart-bbd-…-earlybird`, `amazon-skillmatics-brand-days`, `jiomart-quick-offer`, `extra-25-off-woodland-snapde` → `/s?k=woodland`). Not one new card in two hours.

Dedup by resolved `productId`: **32 dups, 6 fresh** — the identical 6 that the 03:03 tick rejected.

## Re-verification — 6/6 rejected again

Re-read rather than trusted the earlier verdict, because stock flips. One bulk same-origin `fetch()` loop from the logged Amazon tab, 1.2s gap, price off `#centerCol` innerText.

| ASIN | IFS card | PDP now | Verdict |
|---|---|---|---|
| B0F4FL29LQ Tokyo Talkies Women Tops | ₹249 / ₹2,449 | no price block, no ATC | DROP — still out of stock |
| B0GLYZ6TB3 HEAVENGLOW 4K Android STB | ₹2,319 / ₹18,082 | **₹10,048** / ₹15,381, in stock | DROP — 333% drift, unchanged |
| B0GJZY4PT9 Kids Convocation Gown + Cap | ₹130 / ₹1,599 | **₹549** / ₹1,599 (66%), **"Only 1 left"** | DROP — 322% drift, single unit |
| B0H2JQ28G8 AMFIN 20pc Balloon Bouquet | ₹103 / ₹599 | no price, no ATC | DROP — still out of stock |
| B0H1M6C2GP Godrej aer Plug 2 Refills | ₹179 / ₹199 | ₹179 / ₹199 = **10% off** | DROP — too thin, FMCG refill |
| B09P8K152F Wonderchef Forza 19cm Cast Iron | ₹399 / ₹1,200 | no price, no ATC | DROP — dead listing |

One detail changed: B0GJZY4PT9 did **not** 302 to sibling `B0GJZJRKN5` this time — `currentAsin` came back as the requested ASIN, and the price moved ₹312.98 → ₹549. The swap is intermittent, which makes it worse, not better: a tick that happens to land on the non-redirecting read would store a product id that the next read resolves elsewhere. Reading `currentAsin` off the landed page stays mandatory.

## The real finding: this source is idle, not unlucky

Two consecutive sweeps, **0 of 12 candidates publishable**, and the second sweep's discovery output was byte-identical to the first. That is not a bad-luck run:

- IFS has published **no new card in two hours**. Their overnight cadence is effectively zero.
- Of what sits there, everything with real stock was already ingested (32/38 are our own live deals).
- The 6-card remainder is the residue — three dead listings, two prices off by 300%+, one 10% FMCG refill. It will not become publishable by re-reading it.

Re-running this tick hourly against a static page costs ~40 of their requests and a browser verification pass for a guaranteed zero. Worth the owner's decision: either drop the IFS tick to a longer interval overnight (say 2-3h between 00:00 and 07:00 IST), or have the script hash the discovery output and skip verification entirely when the card set is unchanged since the previous sweep. The second is the cheaper fix and needs no schedule change. Not implemented — schedule and ingest cadence is an owner call.

## Freshness

No deals created → `indexnow-ping.mjs` not run. Nothing to ping; sitemap and llms.txt unchanged.

## SITEMON

| Endpoint | Status |
|---|---|
| `/` | 200 (0.22s) |
| `/offers` | 200 (0.14s) |
| `/blog` | 200 (0.54s) |
| `/sitemap.xml` | 200 (0.28s) |
| `/feed.xml` | 200 (0.13s) |
| `/api/deals` | 200 (0.10s) |
| `/llms.txt` | 200 (0.43s) |

**7/7.** `/api/deals` serves `#10844 kohler-brive-slow-close-toilet-seat` at the top — last tick's batch is live on prod, not just in the DB.

## CEO audit

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-17=2 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (past, unfixable) |
| coverless / seo-less posts | 0 / 0 | OK |
| LIVE deals | 10,497 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| PENDING_REVIEW | 0 | OK |
| tg-broadcast cursor | 10838 → **10843** (DB max 10844) | OK — external cron chewing last tick's batch, self-heals |
| unpushed commits | 0 | OK |

**Standing structural risk (unchanged):** every tick runs only while this Claude session is open. `schtasks` has zero richdeals entries; session crons are in-memory. Task Scheduler wiring was offered in an earlier session and never approved, so nothing was changed.
