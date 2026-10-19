# INDEXNOW — 2026-10-19c

**HTTP 200 · 96 URLs submitted in `--paths` mode**

## What was submitted

| Source | URLs |
|---|---|
| LIVE deals created in the last 6h (from the DB) | 88 |
| Posts created in the last 6h (from the DB) | 1 |
| Sitemap and hubs | 7 |
| **Total** | **96** |

The 7 sitemap and hub URLs:

- `/sitemap.xml`
- `/offers`
- `/blog`
- `/freebies`
- `/coupons`
- `/feed.xml`
- `/llms.txt`

## CEO audit

- **Posts:** 4 today (IST, cap reached). Coverless 0, seoless 0.
- **Deals:** 13,318 LIVE. Null-price 0, null-image 0, PENDING_REVIEW 0.
- **Broadcast cursor:** 13841, which matches the DB max of 13841. Fully caught up.
- **Prod endpoints:** `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all return 200 (0.11–0.66s).
- **Housekeeping:** 0 unpushed commits. CronList shows 9 of 9 roster jobs.
