# INDEXNOW tick — 2026-11-12b

**Result: IndexNow returned HTTP 200 for 112 URLs.** The batch was 100 deal slugs, 6 newest posts and 6 hubs/feeds.

## Submission

Built by `inx1112.cjs` from the live DB, then sent with `indexnow-ping.mjs --paths`. In `--paths` mode the script adds nothing, so the hubs were listed by hand.

| Group | Count | Source |
|---|---|---|
| Hubs / feeds | 6 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Deal pages | 100 | the newest 20 LIVE by id, plus every deal with a priceHistory row in the last 12h (the 11-12c/d syncs, confirms and delists) |
| Blog posts | 6 | the newest 6 posts by id, at `/blog/<slug>` |
| **Total** | **112** | `api.indexnow.org` → **HTTP 200** |

It ran with `MSYS_NO_PATHCONV=1` from `apps/api`, so the paths were not mangled (see `indexnow-bing-fallback`).

## Freshness

- `sitemap.xml` is ISR 1800s. The deals child is top-100 by design.
- `llms.txt` is force-dynamic.
- No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.22s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.49s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts write no priceHistory row, so most LIVE Offers lack `priceValidUntil`.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
