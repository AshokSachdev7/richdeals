# INDEXNOW — 2026-10-03b (07:10 IST)

**5 URLs submitted to api.indexnow.org in 2 calls. Both returned HTTP 200. No 422, so the Bing GET fallback wasn't needed.**

## What was new in the last 6 hours (01:10–07:10 IST, from the DB)

| Type | Count | Slugs |
|---|---|---|
| New LIVE deals | 0 | All IFS, DesiDime and Telegram ticks since 01:10 pushed 0 deals |
| New posts | 1 | `curtain-size-guide-5-ft-7-ft-9-ft-panels-per-window-india` |

## Submissions

| Call | URLs | HTTP |
|---|---|---|
| `--paths /blog/curtain-size-guide-… /blog` | 2 | 200 |
| `--paths /sitemap.xml / /offers` | 3 | 200 |

The `--paths` mode sends exactly the paths it is given. It does not add `/`, `/offers` and the sitemap the way slug mode does, so the sitemap and hubs went in their own call. Both calls ran with `MSYS_NO_PATHCONV=1`, so Git Bash didn't rewrite the paths.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,934 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 360; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 2 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | File re-read: 12,413 / 12,413 |
| Unpushed commits | 0 before this report |

No rot found.
