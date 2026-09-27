# INDEXNOW tick 2026-09-27zzf (~19:10 IST)

**Result:** HTTP 200 from api.indexnow.org for all 35 URLs in one POST. It was not a 422, so the Bing GET fallback was not needed.

## URLs submitted (35)
- **4 hubs:** `/`, `/offers`, `/blog`, `/sitemap.xml`.
- **30 deals:** every LIVE deal created in the last 6 hours (13:10 to 19:10 IST), from the IFS, TG 27zw/27zy/27zza and earlier batches. These run from the EVM Enturbo power bank to the USI gym gloves.
- **1 post:** `/blog/do-you-need-gym-gloves-how-to-choose-india-2026` (post id 399).

The slugs came straight from the DB (`createdAt >= now-6h`). I ran the script in `--paths` mode with `MSYS_NO_PATHCONV=1`, so Git Bash could not mangle the leading-slash paths.

## Spot checks on prod
I checked `/sitemap.xml`, the new blog post and the USI deal page. All three returned 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,270 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 339 |
| Posts today (IST) | 4, at the cap. Last 9 days: 3/2/1/3/2/3/4/4/4, never 0. |
| Broadcast cursor | 11617, equal to the DB max of 11617 |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

Nothing is rotting.
