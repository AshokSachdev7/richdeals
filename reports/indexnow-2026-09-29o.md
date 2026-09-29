# INDEXNOW tick: 2026-09-29o (13:11 IST)

## Submission
- Window: last 6 h. 49 live deal slugs + 1 blog post (`/blog/projector-lumens-guide-ansi-vs-led-lumens-india`).
- `apps/api/scripts/indexnow-ping.mjs` auto-adds `/`, `/offers`, `/sitemap.xml`.
- api.indexnow.org → **HTTP 200 for 53 urls** (50 + 3). No 422, so the Bing GET fallback was not needed.

## Prod endpoints
| Path | Status | Time |
|---|---|---|
| `/` | 200 | 0.25 s |
| `/offers` | 200 | 0.39 s |
| `/blog` | 200 | 0.57 s |
| `/sitemap.xml` | 200 | 0.13 s |
| `/feed.xml` | 200 | 0.16 s |
| `/llms.txt` | 200 | 0.50 s |
| `/api/deals` | 200 | 0.10 s |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,535 = API total (max id 11882) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11882 = DB max |
| Unpushed commits | 0 before this report |

Result: **53 urls, IndexNow 200, 7/7 green, 0 rot.**
