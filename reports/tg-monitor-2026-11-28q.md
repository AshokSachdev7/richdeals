# TELEGRAM-DEAL-MONITOR tick: 2026-11-28q (about 16:50 IST)

**Result:** **1 new deal went LIVE** (#17702 Longway 15 L geyser, Amazon). 2 LIVE duplicates were re-read on the PDP and still match the DB. 1 colour variant was skipped and 1 post was rejected for price drift. 4 category posts were skipped. IndexNow returned **HTTP 200** for 4 URLs (1 slug plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28p, SB Loots (last post 16:42), Dealzone (16:32) and CoolzTricks (16:13) have posted. Dealdost is unchanged since 13:31, and the other 9 groups are older.
- **SB Loots and Dealzone history:** both open chats were read for posts after the last tick. Dealzone opened at an older unread position, so I scrolled the list to today's posts. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amazn.lt` and `link.amazon` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 16:30 | Kenneth Scott men's multi-function watch @2,992. White `amazn.lt/hThwKeWF` → B0F8R5JZXV; Light Blue `amazn.lt/aYtksALa` → B0F8R6DT77 | White is already LIVE as #17491; PDP ₹2,992 (M.R.P. ₹4,500) = DB. Light Blue is a colour variant, skipped |
| SB Loots 16:31 | Longway geyser. 25 L @4,597 `amazn.lt/XfERkZzg` → B0H99ZZCFB; 15 L `amazn.lt/ysggZ3jl` → B0H99PKLML | 25 L is already LIVE as #17699; PDP ₹4,597 (M.R.P. ₹8,669) = DB. 15 L is **LIVE #17702** |
| SB Loots 16:39 | FILA `amazn.lt/TXkNYcJQ` | Category post |
| SB Loots 16:42 | Myntra men's sunscreen jackets "Upto 74% OFF" | Category post |
| CoolzTricks 16:13 | FILA "Upto 84% Off" `amzn.to/4zS3cS5` | Category post |
| Dealzone 16:05 | Nike shoes, men's and women's links | Category post |
| Dealzone 16:32 | "454", `link.amazon/B0eJq1Bqg` → B0HG5S12GP (Nippon Paint N-Shield car interior cleaning kit) | Rejected: the PDP shows ₹1,049 (M.R.P. ₹1,692) and no coupon, against ₹454 in the post |
| Other groups | Last post unchanged since 11-28p | — |

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17702 | Longway 15 L 5-star automatic storage water heater (gray) | ₹3,999 | ₹7,629 | 48% | `.a-price-whole` 3,999, M.R.P. from the `#centerCol` text, in stock, add-to-cart present, no coupon shown |

Dedup against the DB (productId, slug suffix and affiliateUrl) found 0 hits. The bulk call returned `201 count 1`, and the row was created as LIVE. The ₹ guard passed. The hiRes image, keyed by landingAsinColor "Gray 15 L", returned 200 on a HEAD check, and the page returns 200 on prod.

## Freshness

- **IndexNow:** `indexnow-ping.mjs longway-15l-5-star-automatic-storage-water-heater-b0h99pklml` returned **HTTP 200** for 4 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0H99PKLML, B0F8R6DT77, B0F8R5JZXV, B0H99ZZCFB and B0HG5S12GP were added (5,902 entries).

## CEO audit (about 16:50 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.18s, `/offers` 0.09s, `/blog` 0.52s, `/sitemap.xml` 0.07s, `/feed.xml` 0.09s, `/api/deals` 0.08s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,095 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17702 / 17701 | OK. The external cron broadcast #17699–#17701; #17702 goes out on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. 11-26 IST had 0 posts (outage gap). The IFS 11-28h stage 1 was killed by the low-memory reaper; the next cron run is 16:53. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
