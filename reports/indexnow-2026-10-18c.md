# INDEXNOW tick 2026-10-18c (13:23 IST)

**IndexNow HTTP 200 for 87 URLs.**

## Submitted

`MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths …`

| Group | URLs |
|---|---|
| LIVE deals created in the last 6 h (from the DB) | 78 |
| Posts created in the last 6 h (`/blog/<slug>`) | 1 (`slim-vs-straight-vs-relaxed-fit-jeans-which-to-buy-india`) |
| Hubs and feeds: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/freebies`, `/coupons` | 8 |
| **Total** | **87**, HTTP 200 |

## CEO audit (13:23 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,099 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13624 / 13615. The cursor moved from 13605 since 13:13, so the broadcast is draining the IFS batch, not rot |
| Newest deal age | 12 min |
| Prod endpoints (7) | all 200. `/` took 1.39 s on one hit, then 0.31, 0.28 and 0.23 s on 3 retries (one ISR regeneration, not rot). Max otherwise 0.66 s (`/blog`) |
| Unpushed commits | 0 before this report |

No rot found.
