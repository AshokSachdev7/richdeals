# INDEXNOW tick 2026-10-19c (13:24 IST)

**IndexNow returned HTTP 200 for 56 URLs** (one `--paths` call with `MSYS_NO_PATHCONV=1`).

## What went in

| Group | Count | Detail |
|---|---|---|
| New LIVE deals | 44 | `createdAt` in the last 6 h, from the DB |
| New posts | 2 | `/blog/power-bank-in-flight-rules-india-mah-wh-limit`<br>`/blog/cold-press-vs-centrifugal-juicer-vs-juicer-mixer-grinder-india` |
| Hubs | 10 | `/sitemap.xml`, `/`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/stores`, `/categories`, `/best` |

Left out: 396 LIVE rows whose `updatedAt` is in the window only because of click-counter churn. That is not a content change.

## CEO audit (13:24 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-17: 4, 10-18: 4, 10-19: 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,229 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13753 / 13751. The broadcast is nearly caught up. |
| Newest deal age | 16 min |
| Prod endpoints (7) | All 200, max 0.68 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 present (CronList checked at 13:09) |

No rot found.
