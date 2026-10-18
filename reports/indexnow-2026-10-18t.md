# INDEXNOW tick 2026-10-18t (19:23 IST)

**IndexNow returned HTTP 200 for 70 URLs**, sent in one `--paths` call (with `MSYS_NO_PATHCONV=1`).

## Submitted

| Set | Count |
|---|---|
| LIVE deals created in the last 6 h (from the DB) | 63 |
| Posts created in the last 6 h (`/blog/electric-vs-manual-standing-desk-how-to-choose-india`) | 1 |
| Hubs: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` | 6 |
| **Total** | **70** |

## CEO audit (19:23 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 4 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,162 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13687, 21 min old |
| DB max id / broadcast cursor | 13687 / 13687. The broadcast has caught up. |
| Prod endpoints (7) | all 200. `/feed.xml` took 1.11 s and every other endpoint was 0.65 s or faster. One slow read, not flagged; the previous tick read 0.12 s. |
| Unpushed commits | 0 before this report |
| Session crons | 9 running, the whole roster |

No rot found.
