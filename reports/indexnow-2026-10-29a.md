# INDEXNOW · 2026-10-29a (19:55Z 10-28 / 01:25 IST 10-29)

## Submitted

I pulled from the DB every deal created since 13:54Z, where the 10-28c window ended, about 6h back. I added every deal with a PriceHistory row in the same window, plus every post created or published in it. updatedAt was not used for deals, because it is the click counter.

- **Slugs:** 37 in total.
  - **32 new deals** (#15356-15387), all LIVE. They come from DesiDime 10-29a, IFS 10-29a (21 deals) and TG 10-29a (2 deals). Ids 15354 and 15355 do not exist. That is a gap in the id sequence, not missing rows.
  - **3 price-synced rows** with their slugs kept: #10400, #10961 and #12921 (IFS 10-29a), all LIVE.
  - **1 post:** `blog/electric-blanket-safe-overnight-power-use-how-to-choose-india` (post 572, content-seo 10-29a).
  - **The `blog` hub.**
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **40 URLs**. `MSYS_NO_PATHCONV=1` was set and the post went in as `blog/<slug>`, so nothing was mangled.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 40 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 40 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/electric-blanket-safe-overnight-power-use-how-to-choose-india` | 200 |
| `/lifelong-smartchoice-4-2l-digital-air-fryer-1200w-b0fh569g3v` (oldest new deal, #15356) | 200 |
| `/zebronics-silencio-200t-hybrid-anc-wireless-headphones-b0gs94ykm7` (newest new deal, #15387) | 200 |
| `/`, `/offers`, `/blog`, `/feed.xml`, `/sitemap.xml`, `/llms.txt` | 200 |

## Sitemap and llms.txt freshness

- **`sitemaps/blog/sitemap.xml`:** has **425 URLs**, and post 572 is the first entry. The count matches: 443 posts minus the 18 merged slugs in `apps/web/post-redirects.json` gives 425. The count stayed at 425 even with the new post, because a169b7a added one redirect.
- **`llms.txt`:** lists post 572.
- **New deals:** they are absent from the deal sitemap by design, because it is limited to the top-100 indexable set. IndexNow carries them instead.

## CEO audit (DB at 19:55Z)

| Check | Result |
|---|---|
| LIVE deals | 14,849 in the DB, 14,849 in the prod `/api/deals` total |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15387 |
| Posts: total / coverless / missing SEO fields | 443 / 0 / 0 |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 1 so far (the day is 1.5 h old) |
| Broadcast cursor vs DB max | 15,369 vs 15,387, re-read in sitemon 10-29a. The external tg-broadcast cron is draining it |
| Unpushed commits | none before this report |
| CronList vs roster | 9/9 (sitemon 10-29a, 30 min ago) |

Nothing is rotting.
