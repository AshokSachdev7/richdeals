# INDEXNOW tick: 2026-09-29a (~01:15 IST)

## Resubmit (last 6 h window)
| Set | URLs |
|---|---|
| Live deals created in last 6 h | 58 (IFS batch 25 + Telegram ticks + earlier) |
| Posts created in last 6 h | 1 (`/blog/house-wire-size-guide-1-5-2-5-4-6-sq-mm-india`) |
| Hubs + sitemap | `/sitemap.xml`, `/`, `/offers`, `/blog` |
| **Total** | **63** |

- `api.indexnow.org` returned **HTTP 200** for all 63 URLs. There was no 422, so the Bing GET fallback was not needed.
- Key: `33f3a9d63ca15676bbd90586ea80e65f`.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,482 (max id 11829) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 344; coverless 0, seo-less 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 1. The day is only an hour old; the blog tick adds 1 or 2 more. |
| Broadcast cursor | 11829 = DB max (caught up) |
| Prod endpoints | 7/7 return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`) |
| Unpushed commits | 0 before this report |

Result: **63 URLs, IndexNow 200, 0 rot.**
