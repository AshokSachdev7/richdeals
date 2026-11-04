# INDEXNOW 2026-11-04b (~07:25 IST)

**Result: api.indexnow.org returned HTTP 200 for 91 URLs, and Bing returned HTTP 200 for the same 91 URLs.** The batch covers the last 6h DB window: 8 new deals, 74 price-synced rows, 1 new post, and 8 hub/sitemap paths. On prod, the key file, all hubs and the sampled pages return 200. The blog sitemap and llms.txt both include the newest post.

## What was submitted

- **Window:** 2026-11-03T19:53Z → 2026-11-04T01:53Z (01:23 → 07:23 IST).
- **How rows were picked:**
  - New deals by `createdAt`.
  - Synced rows by `priceHistory.postedAt` (`updatedAt` is the click counter, so it is ignored).
  - Posts by `createdAt`.
- **Method:** `node apps/api/scripts/indexnow-ping.mjs <slugs…> blog llms.txt feed.xml sitemaps/deals/sitemap.xml sitemaps/blog/sitemap.xml`, run in slug mode. Slug mode adds `/`, `/offers` and `/sitemap.xml` itself. The same `urlList` was then POSTed to `https://www.bing.com/indexnow`.

| Group | URLs |
|---|---|
| New deals (all LIVE) | 8 |
| Price-synced rows: 67 LIVE + 7 EXPIRED (#12034, #12166, #12217, #12222, #12252, #12253, #12321) | 74 |
| New post: `/blog/room-heater-electricity-consumption-units-per-hour-bill-india` (id 590) | 1 |
| Hubs: `/blog`, `/llms.txt`, `/feed.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml` | 5 |
| Added automatically by the script: `/`, `/offers`, `/sitemap.xml` | 3 |
| **Total** | **91** |

The expired rows were included on purpose. Expired pages stay live with an EXPIRED banner, so search engines should recrawl them to pick up the new status.

- **api.indexnow.org:** HTTP 200, 91 URLs
- **Bing (`www.bing.com/indexnow`):** HTTP 200, 91 URLs

## Prod spot-check

| URL | Status |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200, body matches the key |
| `/ /offers /blog /llms.txt /feed.xml /sitemap.xml` | 200 ×6 |
| `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml` | 200 ×2 |
| New deal `/hammer-airflow-flex-earbuds-80h-playtime-instamart-63e04zigkb` | 200 |
| New deal `/amazon-brand-solimo-plastic-lunch-box-with-bag-set-of-4-b07kq66dkw` | 200 |
| New deal `/organic-tattva-psyllium-husk-isabgol-100-g-vslg6yuvq5su3sfa` | 200 |
| Synced `/apply-coupon-on-sofas-B0DZ6M` | 200 |
| Synced `/lg-2026-1-5-ton-3-star-split-inverter-ac-acnhmhwhhshkntmd` | 200 |
| Expired #12217 `/msi-modern-14-i3-1315u-16gb-512gb-ssd-comhcrgwactxhf4u` | 200, EXPIRED banner present |
| Expired #12252 `/red-tape-polycarbonate-hard-trolley-set-of-3-74-66-56cm-stchhj47bph4phvf` | 200, EXPIRED banner present |
| New post `/blog/room-heater-electricity-consumption-units-per-hour-bill-india` | 200 |
| Blog sitemap includes the newest post | yes |
| `llms.txt` includes the newest post | yes |

## CEO audit (07:25 IST)

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/ /offers /blog /sitemap.xml /feed.xml /llms.txt` and both sitemap children) | 200 on all | ok |
| DB LIVE / prod API total | 15,582 / 15,582 | equal |
| DB max id | 16,146 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, **11-04:2** | 11-04 meets the rule. 11-01 and 11-02 are past misses |
| Broadcast cursor | lastId 16,146 vs max 16,146 (file re-read) | drained |
| Crons | 9/9 (CronList matches the roster) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The 12:32 IST CONTENT-SEO run can add a 3rd post for 11-04.** It is optional and must stay ≤4.
- **16 unresolved bare Flipkart links:**
  - With a known itm id: #12919, #12958, #1396, #12771, #15066.
  - Without: #12263, #12380, #12111, #12215, #12216, #12379, #12155, #12153, #12168, #12212, #12213.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **#2913's description still mentions the HDFC EMI offer.**
- **#6409 is only 7% off.**
- **Reticle is CONNECTION_CLOSED.** Not needed.
- **The DO token needs rotating.** Owner's job.
