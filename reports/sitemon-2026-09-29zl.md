# SITEMON + CEO audit: 2026-09-29zl (21:51 IST)

## Prod endpoints
| Path | HTTP | Time |
|---|---|---|
| / | 200 | 0.21 s |
| /offers | 200 | 0.09 s |
| /blog | 200 | 0.49 s |
| /sitemap.xml | 200 | 0.15 s |
| /feed.xml | 200 | 0.13 s |
| /llms.txt | 200 | 0.48 s |
| /api/deals | 200 | 0.12 s |

## CEO audit (checked against the DB)
| Check | Result |
|---|---|
| Live deals | 11,575 = API total (max id 11924) |
| Pending review | 0 |
| Null price / image | 0 / 0 |
| Posts | 347 total; 0 coverless, 0 seoless |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 4 |
| Broadcast cursor | 11924 = DB max (file re-read) |
| Unpushed commits | 0 before this report |

Result: **7/7 green, 0 rot, nothing to fix.**
