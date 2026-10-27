# INDEXNOW · 2026-10-27b (01:53Z / 07:23 IST 10-27)

## Submitted

I pulled every LIVE deal and post created in the last 6 hours (since 19:53Z 10-26) from the DB.

- **Slugs:** 15 in total.
  - 13 new LIVE deals (#15068–15080): the IFS / TG batch from 20:54–21:10Z 10-26;
  - `blog/treadmill-peak-hp-vs-continuous-hp-dc-vs-bldc-walking-pad-india` (post 533, blog 10-27b);
  - the `blog` hub.
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **18 URLs**. Paths were passed with no leading slash, so MSYS had nothing to mangle.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 18 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 18 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/treadmill-peak-hp-vs-continuous-hp-dc-vs-bldc-walking-pad-india` | 200 |
| `/panasonic-30w-b22-led-bulb-cool-day-light-b086xtk2ph` (newest, #15080) | 200 |
| `/bergner-centro-3-pcs-nylon-kitchen-tool-set-turner-ladle-skimmer-b09tb7r7sp` (oldest in window, #15068) | 200 |
| `/sitemap.xml` index (3 children: pages, deals, blog) | 200 |

## Sitemap and llms.txt freshness

- **`sitemaps/blog`:** the first fetch returned `x-nextjs-cache: STALE` without post 533. The ISR regen fired on that request, and the refetch came back as a HIT with **420 URLs, including post 533**.
- **`sitemaps/deals`:** 100 URLs, and the new deals are not in it. This is **by design**, not rot. Under the owner directive of 2026-10-16, only the top-100 indexable deals go in the sitemap (`dealIndexable()`), and every other deal is served noindex,follow. IndexNow pings for those pages are harmless.
- **`llms.txt`:** includes the batch (the treadmill post and the Panasonic deal both match).

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,546. TG 10-27g read the DB at 01:29Z: 0 PENDING_REVIEW, 0 null price, 0 null image, max id 15080 |
| Broadcast cursor | `lastId` 15080 = DB max |
| Posts | 10-27 IST has 2. The next CONTENT-SEO tick is at about 12:39 IST |
| Unpushed commits | 0 before this commit |

Nothing is rotting.
