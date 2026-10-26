# INDEXNOW · 2026-10-27a (19:53Z 10-26 / 01:23 IST 10-27)

## Submitted

I pulled every LIVE deal and post created in the last 6 hours (since 13:53Z) from the DB, plus #12533, which was re-priced in TG 10-27a.

- **Slugs:** 64 in total.
  - 61 new LIVE deals (#15006–15067): the IFS 10-27a, DesiDime 10-27a and TG 10-26t/10-27a batches;
  - the Fire-Boltt Phoenix Air (#12533, re-priced to ₹999);
  - `blog/hot-water-bag-vs-electric-gel-bag-vs-heating-pad-india` (post 532);
  - the `blog` hub.
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **67 URLs**. Paths were passed with no leading slash, so MSYS had nothing to mangle.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 67 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 67 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/hot-water-bag-vs-electric-gel-bag-vs-heating-pad-india` | 200 |
| `/myfitness-chocolate-crunchy-peanut-butter-2-2-kg-b0h9zl8lmg` (TG 10-27a) | 200 |
| `/novel-scented-box-tissue-100-pulls-pack-of-4-800-sheets-b0h4gn` (oldest in window) | 200 |
| `/sitemap.xml` index (3 children: pages, deals, blog) | 200 |

## Sitemap freshness

- **Blog sitemap** (`/sitemaps/blog/sitemap.xml`): **OK.**
  - The first fetch did not list post 532. That was ISR stale-while-revalidate.
  - The next fetch lists it.
  - It has 419 `<loc>` entries. The DB has 436 posts and there are 17 redirects; 436 − 17 = 419, an exact match.
- **Deals sitemap:** top-100 indexable only, by design since 10-16.
- **`llms.txt`:** `force-dynamic`, so it always reflects the DB.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,533 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 |
| Coverless posts | 0 |
| Broadcast cursor | `lastId` 15067 = DB max 15067. Fully drained |
| Unpushed commits | 0 before this commit |

Nothing rotting.
