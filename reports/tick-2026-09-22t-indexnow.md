# INDEXNOW tick 2026-09-22t

**Run:** 2026-09-22 13:38–13:40 IST · richdeals.in
**Result:** **HTTP 200 / 32 urls** — 29 deal slugs from the last 6 hours + the 3 paths the script always appends. No 422, so the Bing GET fallback was not needed.

---

## What was submitted

`node apps/api/scripts/indexnow-ping.mjs <29 slugs>`, key `33f3a9d63ca15676bbd90586ea80e65f`.

```
DONE: IndexNow -> HTTP 200 for 32 urls
```

| Source | Count |
|---|---|
| deal slugs, `createdAt` within last 6h | 29 |
| post slugs, `createdAt` within last 6h | **0** |
| appended by the script (`/`, `/offers`, `/sitemap.xml`) | 3 |
| **submitted** | **32** |
| HTTP | **200** |

The url count is always `slugs + 3` — the script prepends the homepage, `/offers` and `/sitemap.xml` on every run. 29 + 3 = 32 confirms nothing was silently dropped from the payload, which is the only cheap integrity check available here: IndexNow returns a bare 200 with no per-url acknowledgement, so the count is the receipt.

**`posts6h = 0` is correct, not rot.** Three posts were published today (the CEO audit reads `2026-09-22=3`), but all three predate the 6-hour window — the newest is from this morning. A 0 here would only be a problem if the *daily* count were 0, and it is 3.

---

## The 22 new slugs were deliberately not re-submitted

This tick ran minutes after the DEAL-INGEST tick published #10879–#10899 plus the #7713 rot fix, and that tick's freshness leg had already pinged all 22 of those slugs — **HTTP 200 / 25 urls**, recorded in `reports/tick-2026-09-22t-deal-ingest.md`.

Re-submitting them here would have been 22 duplicate urls inside the same 10-minute window. IndexNow's own guidance treats repeated submission of unchanged urls as spam, and the one thing worth protecting on this key is its standing with Bing and Yandex. The 29 urls in this payload are the *older* end of the 6-hour window — rows written earlier today by previous ticks, which is exactly what a periodic resubmit tick is for.

Combined, the two pings covered 51 distinct deal urls in the last six hours, each submitted exactly once.

---

## No fallback needed

`api.indexnow.org` returned 200 on the first attempt. The Bing GET fallback (`https://www.bing.com/indexnow?url=…&key=…`) stays in the script for the 422 case, which historically only shows up on blog-post pings, not deal pings. Two pings this hour, two 200s.

---

## Freshness cross-check

The live `sitemap.xml` read at 13:40 IST carries **9,862 `<loc>`**, up from 9,841 before the DEAL-INGEST push — exactly +21, the 21 new rows, with #7713 already present and so not adding one. The sitemap is ISR `revalidate = 1800`, so the documented worst case is 30 minutes; the observed latency was minutes. That is the second independent observation of sub-revalidate propagation on this site, and it means a ping submitted right after a push is pointing at a sitemap that already lists the urls rather than one that lags them.

---

## CEO audit

Full audit numbers are in `reports/tick-2026-09-22t-deal-ingest.md` (same hour, same DB read). Nothing separate surfaced from this leg. One flag belongs specifically to this tick's subject:

**CLAUDE.md freshness rule #3 names the wrong file.** It says to confirm `llms.txt` carries the batch; `/llms.txt` is a hub-and-summary surface and carries no deal urls by design. `/llms-full.txt` is the deal-bearing one. Both return 200 and both are `force-dynamic`, so nothing is broken — the rule text just points a future tick at a file where it will never find the batch. Their rule text: flagged, not edited.
