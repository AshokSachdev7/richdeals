# INDEXNOW · 2026-10-27c (07:53Z / 13:23 IST 10-27)

## Submitted

I pulled every LIVE deal and post created in the last 6 hours (since 01:53Z 10-27) from the DB.

- **Slugs:** 64 in total.
  - 62 new LIVE deals (#15081–15142), from the IFS 10-27g, DesiDime 10-27g and TG 10-27h…m batches. The newest is the ZEBRONICS monitor;
  - `blog/304-vs-202-stainless-steel-bathroom-fittings-which-rusts-india` (post 534, blog 10-27c);
  - the `blog` hub.
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **67 URLs**. No arg had a leading slash, so MSYS had nothing to mangle.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 67 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 67 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/304-vs-202-stainless-steel-bathroom-fittings-which-rusts-india` | 200 |
| `/gm-1000w-immersion-water-heater-rod-b0b7nm8mvl` (oldest in window, #15081) | 200 |
| `/zebronics-ea124-24-inch-full-hd-100hz-led-monitor-b0d2tfgbgs` (newest, #15142) | 200 |
| `/sitemap.xml` index (3 children: pages, deals, blog) | 200 |
| `/llms.txt` | 200 |

## Sitemap and llms.txt freshness

- **`sitemaps/blog/sitemap.xml`:** the first fetch was STALE. The ISR regen fired on that request, and the refetch came back as a HIT with **421 URLs, including post 534**.
- **`llms.txt`:** lists post 534 under Guides.
- **New deals:** they are absent from `llms.txt`, `llms-full.txt` and `sitemaps/deals`. This is **by design**, not rot. All three use the same top-100 indexable set (`dealIndexable()`, commit 6b8934b), and every other deal is served noindex,follow.

## CEO audit (DB at 07:53Z)

| Check | Result |
|---|---|
| LIVE deals | 14,609 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15142 |
| Broadcast cursor | `lastId` **15142** = DB max, fully caught up |
| Posts: total / coverless | 438 / 0. Post 534 has a cover, seoTitle and seoDesc |
| Posts per IST day | 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 |
| Unpushed commits | 0 before this commit |

Nothing is rotting.
