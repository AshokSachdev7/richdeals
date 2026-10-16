# SITEMON + CEO audit tick 2026-10-16ab (19:07 IST)

**All green. No rot found.**

## Uptime and timing (richdeals.in)

| Endpoint | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.28s |
| `/offers` | 200 | 0.12s |
| `/blog` | 200 | 0.64s |
| `/sitemap.xml` | 200 | 0.15s |
| `/feed.xml` | 200 | 0.13s |
| `/llms.txt` | 200 | 0.38s |
| `/api/deals` | 200 | 0.12s |

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 4 (today at the cap) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,750 / 13270 |
| Newest deal age | 4 min (id 13270, TG tick aa) |
| Broadcast cursor | 13252. Gap of 18 ids is the TG aa batch plus earlier rows; the external broadcast cron works through it on its next run |
| Session crons | 9 of 9, matches the roster |
| Unpushed commits | 0 before this report |

Nothing needed fixing.
