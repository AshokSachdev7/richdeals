# TELEGRAM-DEAL-MONITOR tick: 2026-11-28o (about 14:46 IST)

**Result:** **1 new deal went LIVE** (#17698 Frendo RC drift stunt car, Amazon). 5 posts were skipped: 2 grocery/FMCG, 2 that resolve to search or category pages, and 1 multi-brand category post. IndexNow returned **HTTP 200** for 4 URLs (1 slug plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28n, CoolzTricks (last post 14:41), SB Loots (14:26) and Dealzone (14:18) have posted. Dealdost is unchanged since 13:31, and the other 9 groups are older.
- **SB Loots history:** the open chat was read for posts after 13:35. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amazn.lt`, `amzn.to`, `link.amazon` and `fkrt.to` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 13:46 | Frendo RC drift stunt car 4WD @799, `amazn.lt/qiEJdIDM` → B0FYWTYXNW | **LIVE #17698** |
| SB Loots 13:54 | Spykar / Jack & Jones | Multi-brand category post |
| SB Loots 14:07 | A2 Gir cow ghee 500 ml @549, `amazn.lt/JI8jdqrk` → B0HPB32DGT | Skipped: grocery/FMCG |
| SB Loots 14:26 | Saffola honey, `fkrt.to/LkKrN2qY` → Flipkart HNYFSGQVFH59EWY4 | Skipped: grocery/FMCG |
| CoolzTricks 14:41 | Mosscare makeup cleanser 50 ml @349 + ₹249 coupon, `amzn.to/4jkffBE` | Resolves to a `/s?` search page (B07K7CFTDJ was already in the seen list) |
| Dealzone 14:18 | Kurta sets, `link.amazon/B0ar0W0oU` | Resolves to a `/s?` category page |
| Other groups | Last post unchanged since 11-28n | — |

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17698 | Frendo 4WD remote control drift stunt car (black) | ₹799 | ₹2,499 | 68% | `.a-price-whole` 799, M.R.P. from the `#centerCol` text, in stock, add-to-cart present, no coupon shown |

Dedup against the DB (productId, slug suffix and affiliateUrl) found 0 hits. The bulk call returned `201 count 1`, and the row was created as LIVE. The ₹ guard passed. The hiRes image, keyed by landingAsinColor "ST Black", returned 200 on a HEAD check, and the page returns 200 on prod.

## Freshness

- **IndexNow:** `indexnow-ping.mjs frendo-4wd-remote-control-drift-stunt-car-b0fywtyxnw` returned **HTTP 200** for 4 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0FYWTYXNW, B0HPB32DGT and HNYFSGQVFH59EWY4 were added (5,896 entries).

## CEO audit (about 14:46 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.18s, `/offers` 0.09s, `/blog` 0.60s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,091 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17698 / 17697 | OK. #17698 has not been broadcast yet; the external cron picks it up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. 11-26 IST had 0 posts (outage gap). The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
