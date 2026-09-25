# INDEXNOW tick: 2026-09-25ao (13:26 IST)

**110 URLs were submitted and every one was accepted by at least one IndexNow endpoint.**

## URL set (last 6 h, since 07:26 IST)
- Hub URLs (5): `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`.
- Deals (104 unique):
  - 101 LIVE deals were created in the window. Most are the IFS batch 11198–11231, and the rest came from earlier telegram ticks.
  - The 3 telegram price refreshes have a priceHistory row in the window: 3130, 5268 and 10653.
- Posts (1): `/blog/ceiling-fan-size-guide-by-room-size-india-2026` (id 389).

## Submission
| Step | Endpoint | URLs | HTTP |
|---|---|---|---|
| 1. `indexnow-ping.mjs --paths` (all 110) | api.indexnow.org POST | 110 | **422** (rate limit; the telegram tick pinged about 20 min earlier) |
| 2. Fallback, one GET per URL | www.bing.com/indexnow GET | 51 | **202** × 51. Covers the 5 hubs, the blog post, and 45 deals |
| | | 59 | **403** `UserForbiddedToAccessSite`. Bing throttled after 51 GETs; the key file served 200 throughout |
| 3. Leftover 59 sent as one batch | api.indexnow.org POST | 59 | **200** |
| | www.bing.com/indexnow POST | 59 | **200** |
| | yandex.com/indexnow POST | 59 | **202** |

The key file `https://richdeals.in/33f3a9d63ca15676bbd90586ea80e65f.txt` returned 200.

## CEO audit (DB + prod)
| Check | Result |
|---|---|
| LIVE deals | 10884. None pending, none with a null price or null image |
| Posts | 330. None missing a cover, none missing SEO fields |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **3**. No day is 0, none is over 4 |
| Broadcast cursor (file re-read) | **11231, equal to DB max 11231**. It has caught up (it was 11217 last tick) |
| Prod endpoints | `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: all 200, 0.11–0.45 s |
| `sitemap.xml` | 10200 `<loc>` |
| Unpushed commits | 0 before this commit |

**Verdict:** green. Lesson saved to memory: when there are more than about 50 URLs, don't loop Bing GET. Batch-POST the leftovers a few minutes later instead.
