# INDEXNOW tick 2026-10-15c (13:24 IST)

**84 URLs resubmitted to IndexNow across 3 calls. Every call returned HTTP 200.**

## Submissions

The DB query covered the last 6h by `createdAt`. It returned 66 LIVE deals and 1 post.

| Call | Contents | HTTP |
|---|---|---|
| Slug mode, batch 1 | 33 deal slugs plus the auto-added `/`, `/offers` and `/sitemap.xml` (36 URLs) | 200 |
| Slug mode, batch 2 | 33 deal slugs plus the same 3 auto-added URLs (36 URLs) | 200 |
| `--paths` | 12 URLs: `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/stores`, `/categories`, `/coupons`, `/freebies`, `/`, `/blog/how-to-choose-dustbin-for-home-size-lid-type-garbage-bag-fit-india` | 200 |

The 66 deals come from today's ticks: IFS 10-15c (20), TG 10-15c (7), DesiDime 10-15b (7) and earlier batches. Every call used `MSYS_NO_PATHCONV=1`, and none returned 422.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 (cap 4). The rule is met. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,534 / 13051 |
| Broadcast cursor | 13044 vs max 13051. It moved up from 13029 since the last SITEMON tick, so the external cron is advancing. |
| Prod endpoints (7) | All returned 200 in 0.14–0.70s |
| Session crons | 9 of 9 running. This matches the roster. |
| Unpushed commits | 0 before this report |

Fixes applied: none needed.
