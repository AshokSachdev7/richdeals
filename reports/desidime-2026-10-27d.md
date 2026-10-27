# DESIDIME-INGEST · 2026-10-27d (~01:20Z / 06:50 IST 10-27)

## Funnel

I ran stage 1 with `node scripts/ingest-desidime.mjs`. It reads the `/new` and homepage cards only; no per-deal pages are fetched.

| Step | Count |
|---|---|
| Cards discovered | 31 |
| Dropped by JUNK, GROCERY or other-store rules | 18, including the Myntra Festive Dhamaka sale hub |
| Resolved to a single product | 12 |
| Already in the DB by productId | 10 |
| Fresh | 2. These are the same 2 Amazon ASINs that 10-27c rejected |
| Verified and **pushed** | **0** |
| Rejected | 2, both for price drift |

## Verify (Amazon, logged-in Playwright tab, same-origin `/dp/` fetch, no captcha)

Both PDPs were read again because prices move. Neither had changed since 10-27c.

| ASIN | Product | Card ₹ | PDP `.a-price-whole` | Stock | Result |
|---|---|---|---|---|---|
| B0H69QFTKL | DROGO Monarch-X massage chair | 17,655 | **19,899** | In stock, add-to-cart | **Rejected.** Drift of ₹2,244. The card price is "Apply ₹3000 coupon" plus bank math, not the sticker price |
| B0H8P1NCMN | ASUS Vivobook 15 (2026), i3 100U | 41,490 | **52,990** | In stock, add-to-cart | **Rejected.** Drift of ₹11,500 |

## Fix: the stage-1 24h reject skip was failing silently

10-27c flagged this as a "gap", and I found the root cause. `data/dd-rejected.json` holds 3 timestamp formats:

| Format | Count |
|---|---|
| Epoch ms, written by the script | 388 |
| ISO strings, written by hand in ticks | 28 |
| `{reason, at}` objects, written by IFS ticks | 17 |

The filter was `rej[pid] > cutoff`. For an ISO string that becomes `"2026-…" > 1793…`, which is NaN in the comparison and therefore always false, and the same happens for the objects. So 45 of the 433 rejects were never skipped within their 24h window. B0H69QFTKL, which had an ISO value, resurfaced for exactly this reason.

B0H8P1NCMN is a different case. Its value was numeric, from 10-25 20:54Z, so its 24h window had genuinely lapsed. The 10-27c tick did not refresh the timestamp.

The fix is in `apps/api/scripts/ingest-desidime.mjs`:

```js
const rejAt = (v) => new Date(v && typeof v === 'object' ? v.at : v).getTime();
```

The check is now `rejAt(rej[pid]) > cutoff`.

There was a second trap along the way. A first draft used `v?.at ?? v`, but `String.prototype.at` exists, so for a string `v.at` is a function and `new Date(fn)` gives NaN. Checking `typeof` avoids it.

I asserted all 4 cases (number, ISO, `{at}`, undefined) in a scratch check, and `node --check` passes. The script runs locally, not in the app build, so no deploy was needed. Both rejects have been refreshed to `Date.now()` in epoch ms. The file still has 433 keys.

## Push

None. 0 rows were sent to `/admin/deals/bulk`.

## Freshness

- **IndexNow:** not applicable, since nothing was pushed.
- **Sitemap and llms.txt:** unchanged.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,546 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Broadcast cursor | `lastId` 15080 = DB max 15080 |
| Posts total / coverless / seo-less | 436 / 0 / 0 |
| Posts per IST day | 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 1. CONTENT-SEO runs at ~06:39 IST |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| CronList vs roster | 9/9 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. DesiDime has produced 0 pushes over the last 2 ticks: overnight cards are mostly items already in the DB, plus coupon-stacked prices.
