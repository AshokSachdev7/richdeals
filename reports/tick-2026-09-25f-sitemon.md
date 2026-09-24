# SITEMON + CEO audit — 2026-09-25f (01:12 IST)

## Prod endpoints
| Path | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.34s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.58s |
| `/sitemap.xml` | 200 | 0.38s |
| `/feed.xml` | 200 | 0.26s |
| `/llms.txt` | 200 | 0.29s |
| `/api/deals` | 200 | 0.13s |

## Deal count
- 10748 deals are LIVE and the newest id is 11095.
- Prod `/api/deals` serves id 11095 (Nutriburst, pushed in tick 0925e) at the top, so prod matches the DB.

## CEO audit (checked against the DB)
- **Deals:** 0 PENDING_REVIEW. 0 LIVE deals have a null price or a null image.
- **Posts:** 328 in total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-16=3, 09-17=3, 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far (it is 01:12 IST). No finished day at 0, and none over the cap.
- **Broadcast cursor:** re-read at 11095, the same as the DB max. It has caught up with ticks 0925d and 0925e.
- **Git:** 0 unpushed commits.

Nothing is broken, so nothing was fixed. Verdict: green.
