# INDEXNOW tick 2026-09-27zo (~13:12 IST)

**Result:** api.indexnow.org returned HTTP 200 for 50 URLs. There was no 422, so the Bing GET fallback was not needed.

## URLs submitted (last-6h window, since 2026-09-27T01:40:38Z)
- **Deals:** 46 live deal pages. This covers the 27zl IFS batch (16), the 27zn Tata Coffee Gold deal and the other deals pushed in the window.
- **Posts:** 1, `/blog/instant-vs-filter-vs-french-press-coffee-india-2026`.
- **Hubs:** `/`, `/offers`, `/sitemap.xml`.
- **Command:** `node apps/api/scripts/indexnow-ping.mjs <47 paths>`, with the 3 hubs added by the script.

## Prod check
The 7 standard endpoints return 200, and so do these spot checks:
- the blog post;
- the Tata Coffee deal;
- the oldest deal in the window, the Amazon Basics 18W charger.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,240 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11587, equal to DB max 11587. Fully caught up. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |

No rot.
