# INDEXNOW tick 2026-09-28f (~01:10 IST)

**Result:** HTTP 200 from api.indexnow.org for all 8 URLs in one POST. It was not a 422, so the Bing GET fallback was not needed.

## URLs submitted (8)
- **4 hubs:** `/`, `/offers`, `/blog`, `/sitemap.xml`.
- **3 deals:** every LIVE deal created in the last 6 hours (19:10 to 01:10 IST):
  - `/fitness-mantra-stainless-steel-water-bottle-1l-hexa-b0gmq1psj6`
  - `/zawi-craft-macrame-wall-hanging-shelf-made-in-india-wooden-wall-shelf-uqngvgcnubkedzgt`
  - `/zebronics-party-fyre-510-160w-party-dj-speaker-dual-mic-input-karaoke-rgb-b0fmnpxcq8`
- **1 post:** `/blog/backpack-size-guide-how-many-litres-india-2026` (post id 400).

The slugs came straight from the DB (deals with `createdAt >= now-6h`, posts with `publishedAt >= now-6h`). I ran the script in `--paths` mode with `MSYS_NO_PATHCONV=1`, so Git Bash could not mangle the leading-slash paths.

The overnight window is small because IFS and Telegram were quiet: the last three ingest ticks pushed nothing.

## Spot checks on prod
I checked `/sitemap.xml`, the new blog post and the Zebronics deal page. All three returned 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,273 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 340 |
| Posts per day (IST, 09-19 → 09-28) | 2/2/1/3/2/3/4/4/4/1. Never 0. (09-19 is partial: the audit looks back 9×24h.) |
| Broadcast cursor | 11620 (file re-read), equal to the DB max of 11620 |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

Watch: 09-28 IST has 1 post so far; the next BLOG tick must add 1–2 to reach the 2–3 target.
