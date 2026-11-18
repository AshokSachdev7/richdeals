# DEAL-INGEST indiafreestuff tick — 2026-11-19a

The tick followed the redirector protocol. It fetched `/deals` and `/deals/superdeals` with a browser UA, leaving at least 2.5s between requests, and probed one fresh base64 `?rto=` Buy Now id from each listing before committing to a full stage-1 sweep. Run at about 00:55 IST.

**Result: 0 deals pushed. Both probes redirected to `https://www.indiafreestuff.in/` (the homepage), not to a merchant, so the full sweep of `apps/api/scripts/ingest-ifs-proper.mjs` was skipped. No product was guessed from a card title. With no batch, there was no IndexNow ping. Prod returned 200 on 7 of 7 endpoints and every CEO-audit check is green.**

## Redirector probe

| Listing | Unique `?rto=` cards | Probed id | Result |
|---|---|---|---|
| `/deals` | 33 | `MzA4NTE0MTQ1NQ==` | 302 → `https://www.indiafreestuff.in/` |
| `/deals/superdeals` | 41 | `MzA4NDY2NDgzNg==` | 302 → `https://www.indiafreestuff.in/` |

Redirector history: 7 of 99 resolved at 18g, 0 of 85 at 18h, 7 of 91 at 18i, 0 of 87 at 18j, 0 of 94 at 18k, 0 of 96 at 18l and **0 of 2 probed (74 cards) at 19a**. That is four straight zero ticks. The rule stands: if every tick on 11-19 IST resolves 0, repoint the `23 */2 * * *` slot. The next tick is at 02:53.

## Pushed

None.

## Freshness

- **IndexNow:** not pinged, because there was no batch.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.33s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.57s) |

All probes used `curl -m 30`. The CEO audit for this run is in `reports/sitemon-2026-11-19a.md`.
