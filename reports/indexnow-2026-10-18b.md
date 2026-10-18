# INDEXNOW tick 2026-10-18b (07:25 IST)

**IndexNow HTTP 200 for 34 URLs: 24 deals and 1 post created in the last 6 hours, plus 9 hub URLs.**

## Submitted

| Group | Count |
|---|---|
| LIVE deals created in the last 6 hours | 24 (up to id 13546) |
| Posts created in the last 6 hours | 1 (`/blog/junction-box-vs-recessed-vs-surface-led-downlight-which-to-buy-india`) |
| Hubs | 9: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/stores`, `/categories`, `/deals` |

`/deals` should not have been in the list. It is not a web route, and prod returns 404 for it. The ping was harmless, but leave `/deals` out from now on. Valid hubs to add instead: `/coupons`, `/freebies`, `/best`, `/compare`.

## Freshness

- **sitemap.xml:** returns 200 and was regenerated at 01:53 UTC. It already lists the downlight post, and its `grep` count for the newest deal and post is 1.
- **Sitemap size:** 548 `<loc>` entries is expected. The sitemap only includes deals that pass `dealIndexable()`, which requires a deal to be in the top 100 by clicks, not expired, priced, carrying an image, at least 20% off or with a description of 200+ characters, and no more than 120 days old. That rule is the owner directive of 2026-10-16, so this is not rot.
- **llms.txt:** returns 200 and lists the newest deal and post.

## CEO audit (07:25 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,022 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13546 / 13546, in sync |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |
| Session crons | 9 of 9 match the roster |

No rot found.
