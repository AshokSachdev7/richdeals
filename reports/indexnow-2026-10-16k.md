# INDEXNOW tick 2026-10-16k (13:23 IST)

**IndexNow returned HTTP 200 for 79 URLs.**

## What was submitted

The submission was a single `--paths` call to `apps/api/scripts/indexnow-ping.mjs` with `MSYS_NO_PATHCONV=1`. Because `--paths` mode adds nothing on its own, every hub URL was listed by hand.

| Group | Count |
|---|---|
| LIVE deals created in the last 6 h (DB `createdAt`) | 66 |
| Posts created in the last 6 h | 2 |
| Sitemap and hub pages | 11 |
| **Total** | **79** |

The two posts:
- `/blog/bldc-vs-normal-hair-dryer-which-to-buy-india`
- `/blog/lakme-vs-maybelline-liquid-lipstick-which-to-buy-india`

The 11 sitemap and hub URLs were:
- `/`, `/offers`, `/blog`
- `/sitemap.xml`, `/feed.xml`, `/llms.txt`
- `/best`, `/freebies`, `/coupons`, `/stores`, `/categories`

Each hub URL was checked on prod before the ping and returned 200.

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,674 / 13192 (newest 17 min old) |
| Broadcast cursor | 13189 vs 13192. It was 13174 at 13:07, so it is still draining and this is not rot |
| Session crons | 9 of 9, matches roster |
| Unpushed commits | 0 before this report |

No rot found.
