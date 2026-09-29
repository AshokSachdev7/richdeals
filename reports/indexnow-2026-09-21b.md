# INDEXNOW tick — richdeals.in — 2026-09-21 (b)

## Window

Rolling 6 h UTC, taken from node's own clock in the same script that read the DB:

```
NOW_UTC 2026-09-21T02:10:16.664Z   SINCE 2026-09-20T20:10:16.664Z
```

Not IST-bucketed — the brief says "last 6h", which is a rolling subtraction, not a calendar day.

**In window: 9 deals, 0 posts.**

## What was submitted

| # | deal id | slug |
|---:|---:|---|
| 1 | 10799 | `kingone-upgraded-stylus-pen-for-ipad-2018-onwards-b09kgv` |
| 2 | 10800 | `digiroot-ipad-pencil-fast-charge-palm-rejection-b0cp91` |
| 3 | 10801 | `2-in-1-stainless-steel-julienne-vegetable-peeler-b0fpfn` |
| 4 | 10802 | `amazon-solimo-glass-storage-jar-750ml-set-of-4-b0cf1r` |
| 5 | 10803 | `waterproof-silicone-sealant-adhesive-leak-repair-b0hb5l` |
| 6 | 10804 | `afast-clear-glass-tea-cup-set-of-6-100ml-b0gv3h` |
| 7 | 10805 | `healthyhey-berberis-berberine-95-milk-thistle-750mg-60-caps-b07cj5` |
| 8 | 10806 | `dabur-almond-hair-oil-650ml-non-sticky-damage-protection-b0d66p` |
| 9 | 10807 | `leather-car-armrest-cushion-dual-cup-holders-storage-box-b0h83x` |

All nine are `status LIVE`. `createdAt` runs `2026-09-20T21:40:17.313Z` (10799) →
`2026-09-21T01:22:28.229Z` (10807), so every one falls inside the window on its own timestamp, not
on an assumption about which batch it came from.

**Zero posts in the window.** The last blog publish is older than six hours. That is a real finding,
not an empty query — it is consistent with the 09-21 IST post count of `1` and means **CONTENT-SEO is
owed a tick today**.

## Result

```
DONE: IndexNow -> HTTP 200 for 12 urls
```

**Endpoint: `https://api.indexnow.org/indexnow` → HTTP 200.** One call, one status.

**URL count 12 = 9 slugs + 3 auto-appended.** `indexnow-ping.mjs` line 19 prepends `/`, `/offers` and
`/sitemap.xml` to every slug run:

```js
const paths = rawPaths ? args : ['/', '/offers', '/sitemap.xml', ...args.map((s) => `/${s.replace(/^\//, '')}`)];
const urlList = [...new Set(paths)].map((u) => BASE + u);
```

The arithmetic was read off the output, not predicted: 9 + 3 = 12 matches exactly, so no slug was
silently dropped and none was duplicated (the `Set` would have collapsed a repeat and shown 11).

**The brief's "+ sitemap" is already satisfied by that auto-append, so the sitemap was NOT submitted a
second time.** A second submission would have inflated the count and told IndexNow nothing new.

## The Bing fallback — NOT exercised, and it does not exist in the script

The brief says "Bing GET fallback if api.indexnow.org 422s". Two separate facts, both measured:

1. **No 422 occurred.** Status was 200, so the fallback condition never fired. It is reported as
   not-needed-this-tick, never as verified — a fallback that did not run is not a working fallback.
2. **The script has no Bing call at all.** Grepped at source rather than assumed:

```
11:const KEY = '33f3a9d63ca15676bbd90586ea80e65f', BASE = 'https://richdeals.in';
21:const urlList = [...new Set(paths)].map((u) => BASE + u);
23:const res = await fetch('https://api.indexnow.org/indexnow', {
25:  body: JSON.stringify({ host: 'richdeals.in', key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList }),
27:console.log(`DONE: IndexNow -> HTTP ${res.status} for ${urlList.length} urls`);
```

`api.indexnow.org` is the only host fetched anywhere in the file. **A Bing GET must therefore be
issued by hand** — it is not automatic and never has been. This corroborates
`indexnow-bing-fallback.md`, which records api.indexnow.org 422ing on *blog* pings while Bing's GET
endpoint returns 200.

**NEW DOC ROT.** CLAUDE.md states the sitemap + IndexNow key are "pinged to api.indexnow.org + Bing".
Bing is never contacted by the shipped script. The doc describes a fallback that is not in the code.
Adding it to `indexnow-ping.mjs` is a confirmed-safe unshipped change and belongs to the
SEO-AUDIT-FIX brief, not this one (this brief is report-and-ping only).

Also worth recording from the same read: **the key is hardcoded at line 11, not read from `.env`**, so
running this script touches no secret and the value in the brief is the value already in the repo.

## This was a resubmission, not a shipment

Six of the nine (10799–10804) were pushed and pinged in an earlier tick; 10805–10807 were pushed and
pinged in the tick that created them. The brief says **"Resubmit"**, so re-pinging already-live URLs
is exactly the instruction — but this tick shipped **no new inventory**, and the 200 above must not be
read as nine new deals reaching the index.

## Sanity checks on what was pinged

Pinging a 404 wastes a submission, so the URLs were probed rather than trusted:

| slug | prod HTTP |
|---|---:|
| `kingone-upgraded-stylus-pen-for-ipad-2018-onwards-b09kgv` | 200 |
| `healthyhey-berberis-berberine-95-milk-thistle-750mg-60-caps-b07cj5` | 200 |
| `dabur-almond-hair-oil-650ml-non-sticky-damage-protection-b0d66p` | 200 |
| `leather-car-armrest-cushion-dual-cup-holders-storage-box-b0h83x` | 200 |

Spot check, 1 s apart — first and last three of the batch, not all nine. Every URL submitted that was
checked resolves 200 on prod.

**Sitemap presence grepped, not inferred.** `curl https://richdeals.in/sitemap.xml | grep -c -E
'b07cj5|b0d66p|b0h83x'` → **3**. The three newest deals are genuinely in the sitemap the ping points
at. Per the standing rule, a sitemap delta is never credited without grepping the slugs — here the
slugs are present, so the sitemap is not lagging this batch (ISR `revalidate = 1800` had ample time:
10807 was created ~48 min before the read).

## CEO audit — measured this tick

| metric | value |
|---|---:|
| LIVE deals | **10,460** |
| DB max deal id | **10,807** |
| deals created in the 6 h window | 9 (all LIVE) |
| posts created/published in the 6 h window | **0** |

**Clock skew moved, and it is reported as measured.** node `Date.now()` `2026-09-21T02:10:16.664Z` vs
PG `now()` `2026-09-21T02:10:17.268Z` = **604 ms**. Prior reads were 44 / 45 / 46 / 45 / 37 ms — this
is a **16x jump** in roughly an hour. It is still far too small to invalidate any timestamp finding
here (the window is 6 h wide; 604 ms cannot move a row in or out of it), but the earlier "clock is not
skewed, 37 ms" line must **not** be carried forward as if it still held. Re-take next tick. A metric
copied between tick reports without a fresh read is itself rot — that applies to this one too.

**CONTENT-SEO is owed.** Zero posts in six hours against an IST day count of 1 (cap 4, target 2-3).
Not yet a violation — the rule is "never 0 per day" and the day has 1 — but the day cannot reach 3 on
its own.

**Freshness rule satisfied by definition here:** this tick *is* the ping. Nothing was pushed to
`/admin/deals/bulk`, the broadcast cursor was not touched, `data/tg-multi-seen.json` was not written.

Scratch hygiene clean — `apps/api/_in0921b.cjs` created and removed in the same Bash call
(**50th clear**).
