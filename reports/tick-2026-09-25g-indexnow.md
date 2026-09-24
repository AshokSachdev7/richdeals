# INDEXNOW tick — 2026-09-25g (01:23 IST)

**75 URLs submitted** (last 6 h window).
- 70 LIVE deal pages created in the window.
- 1 post: `/blog/full-body-triply-vs-triply-base-cookware-india-2026`.
- 4 hubs: `/`, `/offers`, `/blog`, `/sitemap.xml`.

## HTTP statuses
| Endpoint | URLs | Status |
|---|---|---|
| `api.indexnow.org` POST (`indexnow-ping.mjs --paths`) | 75 | **422** (rate limit on repeat POSTs from this key; the earlier ticks this session already POSTed) |
| `www.bing.com/indexnow` batch POST (fallback) | 75 | **200** |
| `www.bing.com/indexnow?url=` GET — `/sitemap.xml` | 1 | **200** |
| `www.bing.com/indexnow?url=` GET — the new blog post | 1 | **200** |
| Key file `/33f3a9d63ca15676bbd90586ea80e65f.txt` | — | **200** |

IndexNow shares each submission with every participating engine, so the Bing 200 covers the batch.

## Freshness
- **Sitemap:** served under ISR (1800 s). Resubmitted above.
- **llms.txt:** force-dynamic, so it is already current.

## CEO audit (checked against the DB and prod)
- **Deals:** 10748 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image. Max deal id is 11095.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far (it is 01:23 IST). No finished day at 0.
- **Broadcast cursor:** 11095, equal to the max id, so it is caught up.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
