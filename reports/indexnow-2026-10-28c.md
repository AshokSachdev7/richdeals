# INDEXNOW · 2026-10-28c (13:54Z / 19:24 IST 10-28)

## Submitted

I pulled from the DB every deal created since 07:30Z, about 6h back, which overlaps the 10-28b window that ended at 07:53Z. I added the rows named in the sync and expiry lines of the six ingest reports from the same window, plus every post created or published in that window. updatedAt was not used for deals, because it is the click counter.

- **Slugs:** 97 in total.
  - **74 new deals** (#15280-15353), from these batches: IFS 10-28e, f and g, and DesiDime 10-28e, f and g.
    - 73 are LIVE.
    - #15308 is EXPIRED (out of stock in IFS 10-28g). Its page stays live with the banner.
  - **22 price-synced or re-verified rows** with their slugs kept. Their ids come from DesiDime 10-28e, f, g and IFS 10-28e, f, g: #1183, #2985, #5029, #5336, #6343, #10273, #13210, #5198, #14390, #6879, #11598, #13808, #15256, #2092, #4649, #5394, #12818, #97, #12952, #14730, #15308 and #5251.
    - 21 are LIVE. #13210 is EXPIRED.
    - #15308 also appears among the new deals, and the duplicate was removed.
    - A few of these rows were only re-verified at the same price. Pinging an unchanged URL does no harm.
  - **1 post:** `blog/smart-ring-vs-smartwatch-which-to-buy-india` (post 539, blog 10-28d).
  - **The `blog` hub.**
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **100 URLs**. The post went in as `blog/<slug>` with no leading slash, and `MSYS_NO_PATHCONV=1` was set, so nothing was mangled.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 100 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 100 |

Bing accepted all 100 URLs this time. The 403 seen after about 50 URLs in earlier ticks did not occur.

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/smart-ring-vs-smartwatch-which-to-buy-india` | 200 |
| `/morphy-richards-kingsman-elite-3-in-1-grooming-kit-tmrh3942rsefvhwz` (oldest new deal, #15280) | 200 |
| `/vivel-lime-and-aloe-vera-soap-150g-pack-of-8-sophpdwfsdbkwpdw` (newest new deal) | 200 |
| `/sitemap.xml`, `/llms.txt` | 200 |

## Sitemap and llms.txt freshness

- **`sitemaps/blog/sitemap.xml`:** now has **425 URLs** and includes post 539. That closes the ISR-window item left open in sitemon 10-28n.
- **`llms.txt`:** lists post 539.
- **New deals:** they are absent from the deal sitemap by design, because it is limited to the top-100 indexable set. IndexNow carries them instead.

## CEO audit (DB at 13:54Z)

| Check | Result |
|---|---|
| LIVE deals | 14,815 in the DB, 14,815 in the prod `/api/deals` total |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15353 |
| Posts: total / coverless / missing SEO fields | 442 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 4 (at the cap) |
| Broadcast cursor | `lastId` 15353, equal to the max. The IFS 10-28g batch has been fully drained. |
| Unpushed commits | 0 before this commit |

Nothing is rotting, and nothing was fixed.
