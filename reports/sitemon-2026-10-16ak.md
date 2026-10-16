# SITEMON + CEO audit tick 2026-10-16ak (22:07 IST)

**All green. No rot found, so nothing to fix.**

## Prod endpoints

| Path | HTTP | Time |
|---|---|---|
| / | 200 | 0.28 s |
| /offers | 200 | 0.15 s |
| /blog | 200 | 0.59 s |
| /sitemap.xml | 200 | 0.16 s |
| /feed.xml | 200 | 0.15 s |
| /llms.txt | 200 | 1.57 s on the first request, then 0.47 s and 0.37 s on retest |
| /api/deals | 200 | 0.14 s |

`/llms.txt` is `force-dynamic` and rebuilds on every request. The 1.57 s first hit was a one-off; both retests were back in their normal range.

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 4 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,765 / 13285 |
| Newest deal age | 8 min (id 13285, from TG tick aj) |
| Broadcast cursor | 13285, level with the DB max |
| Session crons vs roster | 9 of 9 present |
| Unpushed commits | 0 before this report |
