# TELEGRAM-DEAL-MONITOR tick: 2026-11-28m (about 12:48 IST)

**Result:** **1 new deal went LIVE** (#17670 Arrow men's jacket). 1 LIVE duplicate was re-read on the PDP and still matches the DB. 2 Myntra posts were skipped as category pages. IndexNow returned **HTTP 200** for 4 URLs (1 slug plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28l, SB Loots (last post 12:44), Dealzone (12:40) and CoolzTricks (12:39) have posted. The other 10 groups are unchanged.
- **SB Loots history:** the open chat was read for posts after 11:40. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amzn.to`, `link.amazon`, `amazn.lt` and `myntr.it` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 11:45 | Arrow men's polyester regular jacket @2,639, `amazn.lt/77idmC1x` → B0BKQGW3MT | **LIVE #17670** |
| SB Loots 12:36 | Van Heusen women's night gowns, `myntr.it/rmoKZyq` | Category page (Myntra brand search) |
| SB Loots 12:44 | HRX socks pack of 3, `myntr.it/6tmWDRm` | Category page (Myntra men-socks filter) |
| Dealzone 12:40, CoolzTricks 12:39 | Parachute Advansed Protein Shampoo 1.2 L @249, `link.amazon/B03HkNojQ` and `amzn.to/4CuQ5Ji` → B0GQV895L5 | Already LIVE as #2985; PDP ₹499 (M.R.P. ₹1,299) = DB. The channel's ₹249 is after the PDP's "Apply 50% coupon" |
| Other 10 groups | Last post unchanged since 11-28l | — |

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17670 | Arrow men's polyester regular jacket | ₹2,639 | ₹6,599 | 60% | `.a-price-whole` 2,639, in stock, add-to-cart present |

The bulk call returned `201 count 1`, and the row was created as LIVE. The image returned 200 on a HEAD check, and the page returns 200 on prod.

## Freshness

- **IndexNow:** `indexnow-ping.mjs arrow-mens-polyester-regular-jacket-b0bkqgw3mt` returned **HTTP 200** for 4 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0BKQGW3MT was added (5,887 entries). B0GQV895L5 was already in it.

## CEO audit (about 12:48 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.23s, `/offers` 0.08s, `/blog` 0.53s, `/sitemap.xml` 0.07s, `/feed.xml` 0.13s, `/api/deals` 0.08s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,064 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17670 / 17666 | OK. #17667–#17670 have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups. #17602 Symbol jeans reads unavailable (watch) | Carried |
