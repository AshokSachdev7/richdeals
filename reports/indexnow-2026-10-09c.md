# INDEXNOW tick 2026-10-09c (13:23 IST)

**IndexNow HTTP 200 for 38 URLs.**

The URLs were sent with `--paths` mode and `MSYS_NO_PATHCONV=1`. There was no 422, so Git Bash did not mangle the paths.

| Group | URLs |
|---|---|
| LIVE deals created in the last 6h (from DB) | 31 |
| Posts created in the last 6h (`/blog/wet-and-dry-vacuum-cleaner-guide-filter-float-valve-blower-india`) | 1 |
| Hubs: `/`, `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt` | 6 |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12363,max:12880}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12880, equal to DB max |
| Unpushed commits | 0 before this commit |

Clean.
