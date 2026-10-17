# INDEXNOW tick 2026-10-17f (19:23 IST)

**IndexNow HTTP 200 for 70 URLs.**

## Submitted

| Group | Count | Source |
|---|---|---|
| LIVE deals created in the last 6 h | 58 | DB, `createdAt >= now-6h` |
| Posts published in the last 6 h | 1 | DB (id 502, the LED colour-temperature post) |
| Hubs and feeds | 11 | `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/coupons` `/freebies` `/stores` `/categories` `/best` |

The ping was run with `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths …`. In `--paths` mode the script adds nothing, so the hubs were listed explicitly.

## CEO audit

| Check | Result |
|---|---|
| Posts per day (IST) | 10-15: 3, 10-16: 4, 10-17: 4 (cap) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,942 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal age | 24 min |
| DB max id / broadcast cursor | 13465 / 13465. Caught up |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 (CronList) |
| Unpushed commits | 0 before this report |

No rot found.
