# IFS tick 2026-09-25be — indiafreestuff ingest (20:29 IST)

**0 deals pushed.** This tick fetched the homepage, `/deals` pages 1 and 2, and `/deals/superdeals` (all HTTP 200, at least 2.6 s apart). That gave 90 unique deal slugs, and every one is already in the seen index from ticks 0925av and 0925ay. IFS has not posted anything since 0925ay about 1.5 hours ago.

With nothing pushed there were no slugs to send, so IndexNow was not pinged.

## CEO audit (checked against the DB)

- **Deals:** 10,966 live, 0 pending, 0 with a null price, 0 with a null image. Highest id 11313.
- **Posts:** 331, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day:**

  | Date | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|---|
  | Posts | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 4 |

  No day is 0. Today is at the cap of 4.
- **Broadcast cursor:** `lastId` 11313, the same as the DB max. It is caught up.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all returned 200, each in under 0.6 s.
- **Git:** there were no unpushed commits before this one.
