# TELEGRAM-DEAL-MONITOR tick: 2026-11-28p (about 15:46 IST)

**Result:** **0 new deals.** Every single-product Amazon post resolved to an ASIN that is already LIVE. **4 stale LIVE rows were repriced** to the current PDP price (prices went up), each with a PriceHistory row. 1 duplicate (#17696) still matches the DB. 3 posts were skipped. IndexNow returned **HTTP 200** for 7 URLs (4 slugs plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28o, SB Loots (last post 15:41), CoolzTricks (15:39) and Dealzone (15:29) have posted. Dealdost is unchanged since 13:31, and the other 9 groups are older.
- **SB Loots history:** the open chat was read for posts after 14:46. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amazn.lt`, `amzn.to`, `link.amazon` and `ajiio.in` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 14:48 | Ajio women's kurtas from ₹169, `ajiio.in/6kX7oWx` | Category page |
| SB Loots 14:52 | Myntra The Bear House, 8 links | Category post |
| SB Loots 15:09 | Havells 1000W hair dryer @599, `amazn.lt/KN7znMkI` → B0H5L55GJY | Already LIVE as #12642 at ₹499; **repriced to ₹599** |
| SB Loots 15:18 | GM water heater rod with bucket guard @399, `amazn.lt/4H9Ou2e1` → B0B7NM8MVL | Already LIVE as #15081 at ₹359 (not in the seen list); **repriced to ₹399** |
| SB Loots 15:41 | Del Monte chocolate syrup 1.2 kg @229 → B0D5HRSWF4 | Skipped: grocery/FMCG |
| CoolzTricks 15:39 | Vaseline Sun Protect SPF30 600 ml @350, `amzn.to/3XdzYzA` → B0CVMWYPM1, and a second link @340, `amzn.to/3WW6Sor` → B08M4T5FJG | Already LIVE as #1471 (₹255) and #1370 (₹262); **both repriced** |
| Dealzone 15:29 | Pigeon biriyani pot 5 L @887, `link.amazon/B0eoQTaVf` → B00F2F9CO8 | Already LIVE as #17696; PDP ₹887 (M.R.P. ₹1,875) = DB |
| Other groups | Last post unchanged since 11-28o | — |

## Repriced LIVE duplicates (verified in the logged-in Playwright tab)

| id | Item | Old | New | MRP | Off | Check |
|---|---|---|---|---|---|---|
| 12642 | Havells 1000W hair dryer, 2 temperature settings | ₹499 | ₹599 | ₹1,295 | 53% | `.a-price-whole` 599, in stock, add-to-cart present |
| 15081 | GM 1000W immersion water heater rod with bucket guard | ₹359 | ₹399 | ₹750 | 46% | In stock, add-to-cart present |
| 1471 | Vaseline Sun Protect SPF 30 body lotion 600 ml | ₹255 | ₹350 | ₹899 (was ₹985) | 61% | In stock, add-to-cart present. Legacy copy rewritten |
| 1370 | Vaseline Deep Moisture body lotion 600 ml | ₹262 | ₹340 | ₹850 (was ₹740) | 60% | In stock, add-to-cart present. Legacy copy rewritten (its description claimed ₹299 / M.R.P. ₹750) |

The prices were read with one same-origin fetch per ASIN, from `#corePriceDisplay .a-price-whole`. M.R.P. was read from the `#centerCol` text. No coupon was shown on any PDP. Each row got a `prisma.deal.update` (price, mrp, discountPct, title, description, howTo) and a `PriceHistory` row. The ₹ guard passed: every ₹ figure in the copy equals the price or the MRP, and every "% off" equals discountPct. Slugs were not changed, so no URL breaks. The legacy #1471 slug still contains "74-off".

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 4 repriced slugs and returned **HTTP 200** for 7 URLs.
- **Sitemap:** the deals child is the top-100 pinned set; no new rows this tick.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0B7NM8MVL was added (5,897 entries). The other ASINs were already in it.

## CEO audit (about 15:46 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.17s, `/offers` 0.10s, `/blog` 0.55s, `/sitemap.xml` 0.06s, `/feed.xml` 0.08s, `/api/deals` 0.09s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,091 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17698 / 17698 | OK, caught up |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. 11-26 IST had 0 posts (outage gap). The IFS 11-28h stage 1 was killed by the low-memory reaper; the next cron run is 16:53. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
