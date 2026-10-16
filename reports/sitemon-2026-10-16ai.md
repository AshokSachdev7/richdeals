# SITEMON + CEO audit tick 2026-10-16ai (21:17 IST)

**All green. No rot found, so nothing to fix.**

## Prod endpoints

| Path | HTTP | Time |
|---|---|---|
| / | 200 | 0.22 s |
| /offers | 200 | 0.11 s |
| /blog | 200 | 0.68 s |
| /sitemap.xml | 200 | 0.13 s |
| /feed.xml | 200 | 0.11 s |
| /llms.txt | 200 | 0.38 s |
| /api/deals | 200 | 0.13 s |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 4 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,764 / 13284 |
| Newest deal age | 4 min (id 13284, from the IFS batch) |
| Broadcast cursor | 13280, 4 behind the DB max. That is the tail of the IFS batch, which the external cron is draining |
| Session crons vs roster | 9 of 9 present |
| Unpushed commits | 0 before this report |
