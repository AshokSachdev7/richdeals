# INDEXNOW tick 2026-09-26t (07:23 IST)

**`api.indexnow.org` accepted all 9 URLs with HTTP 200 on the first POST, so the Bing GET fallback was not needed.**

## Submitted
The window is the last 6 hours, 01:23 → 07:23 IST. URLs were taken from the DB: LIVE deals by `createdAt`, and posts by `publishedAt`.

| Group | URLs |
|---|---|
| Hub pages: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` | 5 |
| LIVE deals, ids 11378–11380 (Joker & Witch couple watches, Puma Anzarun Krick, Puma Feetmax) | 3 |
| Post: `/blog/trolley-bag-set-of-3-vs-single-suitcase-india-2026` | 1 |
| **Total** | **9** |

Command: `node scripts/indexnow-ping.mjs --paths <9 paths>`, which returned `HTTP 200 for 9 urls`.

The window was quiet because the IFS and Telegram sweeps overnight found 0 new deals, so it holds only the 3 deals added around 02:30 IST and the 06:21 post.

## CEO audit (checked against the DB and prod)
| Check | Result |
|---|---|
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200 (slowest: `/llms.txt` at 0.64 s) |
| Deals | 11,033 live, 0 pending review, 0 with a null price, 0 with a null image. Highest id 11380 |
| Posts | 333, with 0 missing a cover and 0 missing SEO fields |
| Posts per IST day, 09-17 → 09-26 | 1/3/3/2/1/3/2/3/4/2. No day is 0. The 1 for 09-17 comes from the audit's rolling 10-day window cutting that day off |
| Sitemap | 10,352 `<loc>` |
| Broadcast cursor | 11380, equal to the DB max |
| Git | 0 unpushed commits before this report |

Verdict: green.
