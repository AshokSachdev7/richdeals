# INDEXNOW tick 2026-09-28y (~07:10 IST)

**Result:** 6 URLs submitted to api.indexnow.org, which returned **HTTP 200**. The Bing GET fallback was not needed because there was no 422.

## Submitted (last 6h window, DB query on createdAt / publishedAt / updatedAt)
| URL | Type |
|---|---|
| /the-sleep-company-luxe-motorised-recliner-sofa-1-seater-beige-b0cn1fzlrw | Deal (the only LIVE deal in the window) |
| /blog/pressure-cooker-size-guide-litres-by-family-india-2026 | Post id 401 |
| /blog | Blog hub |
| /, /offers, /sitemap.xml | Added by the script on every ping |

The window is thin because the IFS and Telegram sources were quiet overnight. The backpack post from earlier on 09-28 falls outside 6h and was pinged when it was published.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,274 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 341 |
| Posts per day (IST, 09-19 → 09-28) | 1/2/1/3/2/3/4/4/4/2. Never 0. 09-19 is partial. |
| Broadcast cursor | 11621 (file re-read), equal to the DB max of 11621 |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

**Watch:** 09-28 IST has 2 posts. The next BLOG tick may add at most 2 more (cap 4).
