# SITEMON + CEO audit — 2026-09-25ac (09:12 IST)

**Verdict: green. Nothing broken, no fixes needed.**

## Prod endpoints
| Path | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.29 s |
| `/offers` | 200 | 0.11 s |
| `/blog` | 200 | 0.52 s |
| `/sitemap.xml` | 200 | 0.30 s |
| `/feed.xml` | 200 | 0.13 s |
| `/llms.txt` | 200 | 0.33 s |
| `/api/deals` | 200 | 0.12 s |

## Deal-count sanity
- **Live deals:** 10825 in the DB.
- **`/api/deals`:** the newest item is id 11172 (Maybelline, pushed at 0925ab), which matches the DB max.
- **Sitemap:** 10139 `<loc>` entries, up from 10100 at 0925z. That is the 39-deal IFS batch.
  - The 0925ab deal lands at the next ISR refresh (≤30 min).

## CEO audit (checked against the DB)
| Check | Result |
|---|---|
| PENDING_REVIEW | 0 |
| Live deals with null price / null image | 0 / 0 |
| Posts | 329, 0 coverless, 0 seoless |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, 2 so far. No day at 0. Today is within the 2-3 range. |
| Broadcast cursor | 11157 (file re-read) against a DB max of 11172. It was 11152 at 09:05, so it is moving and self-healing. |
| Unpushed commits | 0 |
