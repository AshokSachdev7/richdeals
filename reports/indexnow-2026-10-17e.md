# INDEXNOW tick 2026-10-17e (13:23 IST)

**IndexNow HTTP 200 for 80 URLs (70 + 10). Every URL submitted came from the DB (last 6 h) or is a hub that returns 200.**

## Submitted

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| 67 LIVE deals created in the last 6 h | slug mode (adds `/`, `/offers`, `/sitemap.xml`) | 70 | 200 |
| 1 post from the last 6 h (`/blog/glass-top-vs-stainless-steel-gas-stove-which-to-buy-india`) + 9 hubs: `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/offers`, `/stores`, `/categories`, `/freebies`, `/coupons` | `--paths` (adds nothing) | 10 | 200 |

Run from the repo root with `MSYS_NO_PATHCONV=1`. The new post and `/stores`, `/categories`, `/freebies`, `/coupons` were curled first; all return 200.

## CEO audit

| Check | Result |
|---|---|
| Posts per day (IST) | 10-15: 3, 10-16: 4, 10-17: 3. The daily floor is met |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,884 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13407, 22 min old |
| DB max id / broadcast cursor | 13407 / 13397. Up from 13392 at 13:08, so the external cron is still draining the IFS 10-17j batch |
| Prod endpoints (7) | all 200 (0.10–0.67 s) |
| Session crons | 9 of 9; matches `.claude/cron-schedules.md` |
| Unpushed commits | 0 before this report |

No rot found.
