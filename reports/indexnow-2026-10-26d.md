# INDEXNOW · 2026-10-26d (~19:30 IST)

## Submitted

I pulled every LIVE deal and post created in the last 6 hours from the DB, plus the Mivi deal re-priced in TG 10-26o.

- **Slugs:** 72 in total.
  - 70 new LIVE deals;
  - the Mivi soundbar (#3275, re-priced to ₹2,899);
  - `blog/led-strip-light-buying-guide-12v-24v-230v-india` (post 531);
  - the `blog` hub.
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **76 URLs**. Post paths were passed with no leading slash, so MSYS had nothing to mangle.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 76 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 76 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/led-strip-light-buying-guide-12v-24v-230v-india` | 200 |
| `/cello-puro-steel-x-benz-900-insulated-water-bottle-b07tgjyd5z` | 200 |
| a boAt deal from this batch | 200 |
| `/sitemap.xml` index (3 children: pages, deals, blog) | 200 |

## Sitemap freshness

- **Blog sitemap: OK.**
  - The first fetch did not list post 531. That was Next ISR stale-while-revalidate: the request served the cached copy and triggered a rebuild.
  - The next fetch (Date 13:57Z) lists it.
  - It has 418 `<loc>` entries. The DB has 435 posts and `post-redirects.json` has 17 entries; 435 − 17 = 418, an exact match.
- **Deals sitemap:** carries only the top 100 indexable deals, per owner directive 2026-10-16. New deals render `noindex, follow` until they make the top 100. This is by design, not rot. IndexNow still tells crawlers they exist.
- **`llms.txt`** is `force-dynamic`, so it always reflects the DB.

## CEO audit (fresh, 13:57Z)

| Check | Result |
|---|---|
| LIVE deals | 14,473 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Coverless posts | 0 |
| Broadcast cursor | `lastId` 15005 = DB max 15005. Fully drained |
| Unpushed commits | 0 before this commit |

**Clock correction.** The real clock at this tick was 13:56Z (19:26 IST, 10-26). Earlier reports today were stamped too late:

- `sitemon-2026-10-26o` was stamped "~00:20 IST 10-27";
- `tg-2026-10-26o` was stamped "~00:35 IST 10-27".

Their data is unaffected. One line in the sitemon report is wrong because of the bad stamp: its "10-27 (IST) 0 posts so far" row should not be there, since 10-27 had not started. The 10-26 count of 4/4 stands.

Nothing rotting.
