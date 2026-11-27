# INDEXNOW tick: 2026-11-27b (13:46Z, 19:16 IST)

**Result:** IndexNow returned HTTP 200 for 143 URLs.

## Window (last 6 hours, DB)

| Kind | Count | Basis |
|---|---|---|
| Deals (LIVE, `createdAt`) | 140 | ingest ticks 27a–27c, desidime 27a–27c, tg-monitor 27a–27f |
| Posts (created or updated) | 0 | both posts for today were created earlier than 6 hours ago and were pinged at publish by `insert-blog-mdmeta.mjs` |

Deal `updatedAt` is left out on purpose: it is the click counter, not a content change. The price-synced rows (#4288, #15492, #15686, #5288, #3880, #15298, #12224) had already been pinged by their own ticks.

## Ping

Run in slug mode: `node apps/api/scripts/indexnow-ping.mjs <140 slugs>`. The script adds `/`, `/offers` and `/sitemap.xml` itself.

- All 140 slugs passed the `^[a-z0-9-]+$` check, and the file had no CRLF line endings.
- The first slug was boat-rockerz-371-bluetooth-headphones-50h-battery-b0fm38mrwl; the last was electronic-spices-2-inch-tweeter-speaker-pack-of-2-b07ms17ddx.

**HTTP 200 for 143 URLs** (140 deals plus 3 hub pages).

## Freshness

- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it. The ping still tells Bing and others that these pages exist.
- **llms.txt:** generated on each request, so nothing to do.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all returned 200.
- **Posts today (IST):** 2, so the rule is met.
- **Deals in the last 6 hours:** 140, so ingest is healthy.
- **Unpushed commits before this report:** 0.
- **Crons:** 9 of 9 (SITEMON 27g).
