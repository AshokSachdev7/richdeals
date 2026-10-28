# INDEXNOW · 2026-10-28a (01:53Z / 07:23 IST 10-28)

## Submitted

I pulled every LIVE deal and every published post created or published in the last ~6 hours (since 19:38Z 10-27) from the DB.

- **Slugs:** 28 in total.
  - 26 new LIVE deals (#15214–15239): the DesiDime 10-28 XAUGE diya (#15214) and the IFS 10-28 batch (#15215–15239, 19 Amazon, 6 Flipkart). The newest is the Red Tape RSL1098A sneakers;
  - `blog/smart-plug-10a-vs-16a-which-to-buy-ac-geyser-india` (post 537, blog 10-28b);
  - the `blog` hub.
- **Slug mode** added `/`, `/offers` and `/sitemap.xml`, giving **31 URLs**. The post went in as `blog/<slug>` with no leading slash, so it resolves to `/blog/<slug>` and MSYS had nothing to mangle.

| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org (`indexnow-ping.mjs`) | **200** | 31 |
| www.bing.com/indexnow (direct POST, same urlList) | **200** | 31 |

## Spot checks (prod)

| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (key file) | 200 |
| `/blog/smart-plug-10a-vs-16a-which-to-buy-ac-geyser-india` | 200 |
| `/xauge-water-activated-flameless-diya-b0hpbpqqcq` (oldest in window, #15214) | 200 |
| `/red-tape-rsl1098a-men-s-casual-sneakers-white-blue-shohm9tjzzd7h8qz` (newest, #15239) | 200 |
| `/sitemap.xml` | 200 |
| `/llms.txt` | 200 |

## Sitemap and llms.txt freshness

- **`sitemaps/blog/sitemap.xml`:** the first fetch was stale and did not have post 537. The ISR regen fired on that request, and the refetch came back as a HIT with **423 URLs, including post 537**.
- **`llms.txt`:** lists post 537.
- **New deals:** they are absent from the deal sitemap and `llms.txt`. This is by design, because both use the top-100 indexable set (`dealIndexable()`).

## CEO audit (DB at 01:53Z)

| Check | Result |
|---|---|
| LIVE deals | 14,706 (matches the IFS 10-28 commit) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15239 |
| Broadcast cursor | `lastId` **15239** = DB max, fully caught up |
| Posts: total / coverless | 440 / 0. Post 537 has a cover |
| Posts per IST day | 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 2 so far (07:23 IST) |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 already has 2 posts, so it is within the 2–3/day rule.
