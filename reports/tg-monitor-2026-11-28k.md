# TELEGRAM-DEAL-MONITOR tick: 2026-11-28k (about 10:46 IST)

**Result:** **2 new deals went LIVE** (#17654 and #17655). 4 LIVE duplicates were re-read on the PDP and all still match the DB. **1 MRP was backfilled** (#1648 had a null MRP). IndexNow returned **HTTP 200** for 6 URLs (3 slugs plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28j, SB Loots (last post 10:35), CoolzTricks (10:40), Dealzone (10:34) and Hidden Loot (10:23) have posted.
- **SB Loots history:** the open chat was scrolled to the bottom to read every post from 09:38 onward. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amzn.to`, `amazn.lt` and `link.amazon` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 09:46 | Himalaya baby pants diaper XXL ×44 @511, `amazn.lt/4DBHJe0D` → B0H6BHM738 | **LIVE #17654** |
| SB Loots 09:56 | Myntra cargo trousers (separate men and women links) | Multi-product |
| SB Loots 10:02 | Parachute hair oil coupon | Category/coupon post |
| SB Loots 10:11 | Oral-B Criss Cross toothbrush ×4 @137, B0B594571T | Already LIVE as #3172; PDP ₹135 = DB, no change |
| SB Loots 10:15 | `amazn.lt/YckKBF6E` → Khaitan Volt 5.5 L geyser B0H8PBSZMY | **LIVE #17655** |
| SB Loots 10:35 | Amazon-brand clothing (men, women and kids links) | Multi-product |
| CoolzTricks 10:40 | Haier 6 kg Oceanus Wave washer @12,890, `amzn.to/4jiGPz4` → B0HBB6W6GQ | Already LIVE as #11148; PDP ₹13,890 = DB (the channel's ₹12,890 is a bank-offer price) |
| Dealzone 10:34 | Livon shampoos, B0FNN4954M @202 and B0FNMZS3KB @196 (with a 15% coupon) | Already LIVE as #2205 (₹238) and #1648 (₹231); the PDP prices match the DB. The channel figures are after the coupon |
| Hidden Loot 10:23 | Swiggy Black Friday coupon | Not a product |
| Other groups | Last post unchanged since 11-28j | — |

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17654 | Himalaya Total Care Super Absorb baby pants diaper, XXL, 44 count | ₹511 | ₹1,199 | 57% | `.a-price-whole` 511, in stock, add-to-cart present |
| 17655 | Khaitan Volt 5.5 L 3 kW instant water heater | ₹3,499 | ₹7,599 | 54% | "Only 2 left in stock", add-to-cart present |

The bulk call returned `201 count 2`, and both rows were created as LIVE. Both images returned 200 on a HEAD check, and both pages return 200 on prod.

## Fix

- **#1648 Livon Hyaluron shampoo:** the MRP was null. It was backfilled to ₹710 from the PDP's `M.R.P.:` text, which gives 67% off. The price did not change, so no PriceHistory row was written. The copy has only one ₹ figure (231), so it is still consistent.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 2 new slugs and #1648, and returned **HTTP 200** for 6 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0H6BHM738, B0H8PBSZMY and B0HBB6W6GQ were added (5,880 entries).

## CEO audit (about 10:46 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.24s, `/offers` 0.07s, `/blog` 0.54s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.07s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,049 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17655 / 17653 | OK. The 2 deals pushed this tick have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
