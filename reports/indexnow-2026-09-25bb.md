# INDEXNOW tick 2026-09-25bb (19:23 IST)

**IndexNow returned HTTP 200 for 85 URLs, so the Bing fallback was not needed** (it only runs on a 422).

## What was submitted (last 6 hours, from the DB)

| Kind | URLs |
|---|---|
| LIVE deals created in the window (IFS 0925av/ay, Telegram 0925au/az) | 80 |
| Posts created in the window: `/blog/car-charger-buying-guide-watts-pd-qc-india-2026` | 1 |
| Hub pages: `/`, `/offers`, `/sitemap.xml`, `/blog` | 4 |
| **Total** | **85** |

The slugs came from a Prisma query for `createdAt >= now − 6h`. The deals were filtered to `status LIVE`.

## CEO audit

- **Deals:** 10,964 live, 0 pending, 0 with a null price, 0 with a null image. Highest id 11311.
- **Posts per IST day:**

  | Date | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|---|
  | Posts | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 4 |

  No day is 0, and today is at the cap of 4.
- **Posts:** 331, with 0 missing a cover and 0 missing SEO fields.
- **Broadcast cursor:** 11296 against a DB max of 11311. It was 11286 at 19:12, so it is still draining. This is not rot.
- **Prod:** all 7 endpoints and the new blog post return 200.
- **Git:** 0 unpushed commits before this one.
