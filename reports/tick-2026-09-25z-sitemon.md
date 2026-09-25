# SITEMON + CEO audit — 2026-09-25z (08:12 IST)

**Green. Nothing to fix.**

## Prod endpoints
| Path | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.42 s |
| `/offers` | 200 | 0.10 s |
| `/blog` | 200 | 0.40 s |
| `/sitemap.xml` | 200 | 0.29 s |
| `/feed.xml` | 200 | 0.30 s |
| `/llms.txt` | 200 | 0.43 s |
| `/api/deals` | 200 | 0.12 s |

## Deal-count sanity
- **LIVE deals:** 10785, up 2 from 10783. The 2 new ones are the Telegram 0925y pushes.
- **Sitemap:** 10100 `<loc>`, up from 10098 at 0925w. It already carries the 0925y batch.
- **Max deal id:** 11132.

## CEO audit (checked against the DB)
- **PENDING_REVIEW:** 0.
- **LIVE deals with null price or image:** 0 / 0.
- **Posts:** 329 in total, 0 coverless, 0 seoless.
- **Posts per day (IST), 09-17 → 09-25:** 3, 3, 3, 2, 1, 3, 2, 3, **2 so far**. No day at 0, and today already meets the 2-3 rule.
- **Broadcast cursor:** 11132 (file re-read), equal to max id 11132. It has self-healed from 11130 at 0925y.
- **Unpushed commits:** 0 before this report.

Verdict: green.
