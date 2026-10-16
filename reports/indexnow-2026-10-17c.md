# INDEXNOW tick 2026-10-17c (01:25 IST)

**IndexNow HTTP 200 on both calls: 60 URLs submitted in total.**

## Submitted

| Call | URLs | HTTP |
|---|---|---|
| Slug mode: 45 LIVE deals created in the last 6 h, plus the 3 paths the script adds | 48 | 200 |
| `--paths` mode (`MSYS_NO_PATHCONV=1`): 1 post from the last 6 h (`/blog/anc-db-rating-explained-32db-vs-50db-hybrid-noise-cancellation-india`), plus `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/stores`, `/categories`, `/coupons`, `/freebies`, `/best` | 12 | 200 |

The deal and post lists come from the DB (`createdAt` within the last 6 h, deals with status LIVE).

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-15 / 10-16 / 10-17) | 3 / 4 / 1. 10-17 is 1.5 hours old, and the CONTENT-SEO tick (`9 */6`) fills it |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,794 / 13315 |
| Broadcast cursor | 13315, caught up with the DB max |
| Prod endpoints (6) | all 200 |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
