# INDEXNOW · 2026-10-28b (07:53Z / 13:23 IST 10-28)

## Submitted

I pulled every deal created since the 10-28a tick (window 01:23Z to 07:53Z) plus the known price-synced and expired rows, and every post created or published in the same window, from the DB. updatedAt was not used for deals, because it is the click counter.

- **Slugs:** 50 in total.
  - 40 new LIVE deals (#15240-15279). These are the IFS 10-28b/c batches (#15240-15257), DesiDime 10-28d (#15258-15260: DJI Osmo Pocket 3, Desidiya string lights, TIMEX watch) and IFS 10-28d (#15261-15279, newest the Caprese Maddy hobo bag).
  - 7 LIVE rows price-synced in place with their slugs kept: #14814, #2985, #8941, #1920 (DesiDime 10-28d), #7901, #14260, #14195 (IFS 10-28d).
  - #2735, the IFB 206 L fridge, which is now EXPIRED. Its page stays live with the expired banner and noindex, so it is pinged so the change gets recrawled.
  - `blog/microsd-card-a1-a2-u1-u3-v30-which-to-buy-india` (post 538, blog 10-28c).
  - the `blog` hub.
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **53 URLs**. The post went in as `blog/<slug>` with no leading slash, so it resolves to `/blog/<slug>`, and I also set `MSYS_NO_PATHCONV=1`. Nothing was mangled.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 53 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 53 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/microsd-card-a1-a2-u1-u3-v30-which-to-buy-india` | 200 |
| `/orient-eternal-shine-40w-led-bulb-cool-white-b0d8l8bnwg` (oldest new deal, #15240) | 200 |
| `/caprese-maddy-medium-hobo-bag-for-women-b0g58hhdhq` (newest, #15279) | 200 |
| `/ifb-206l-...-b0gw345qcm` (EXPIRED #2735, kept live) | 200 |
| `/sitemap.xml`, `/llms.txt`, `/blog`, `/offers` | 200 |

## Sitemap and llms.txt freshness

- **`sitemaps/blog/sitemap.xml`:** an x-nextjs-cache HIT with **424 URLs**, and post 538 is the first entry (lastmod 07:11:53Z).
- **`llms.txt`:** lists post 538.
- **New deals:** they are absent from the deal sitemap and `llms.txt` by design, because both use the top-100 indexable set (`dealIndexable()`). IndexNow carries them instead.

## CEO audit (DB at 07:53Z)

| Check | Result |
|---|---|
| LIVE deals | 14,743 |
| Prod `/api/deals` total | 14,743 (matches; nextCursor 15279 = DB max id) |
| PENDING_REVIEW | 0 |
| LIVE with null price | 0 |
| LIVE with null/empty image | 0 |
| Posts | 441, all published; 0 missing a cover, seoTitle or seoDesc |
| Posts per IST day | 10-21: 3, 10-22: 3, 10-23: 3, 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 3 (none at 0, none over the 4 cap) |
| Unpushed commits | 0 (master = origin/master before this commit) |

**Rot:** none.
