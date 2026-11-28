# TELEGRAM-DEAL-MONITOR tick: 2026-11-28r (about 17:47 IST)

**Result:** **2 new deals went LIVE** (#17741 Nike Fission deodorant, #17742 Sanfe GoFresh toothbrush 5-pack, both Amazon). **4 stale LIVE duplicates were repriced**, each with a PriceHistory row. 1 post was rejected because its price depends on a coupon, and 1 grocery post was skipped. IndexNow returned **HTTP 200** for 9 URLs (6 slugs plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar. Since 11-28q, SB Loots, Dealzone, CoolzTricks and ONLINE SHOPPING DEALS have posted. Dealdost, Rogerkart, Hidden Loot, IFS Tips and OMG LOOTDEALS are unchanged. RichDeals is our own channel and is ignored.
- **SB Loots and Dealzone history:** both open chats were read for posts after the last tick. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amazn.lt`, `link.amazon` and `amzn.to` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 16:51 | Everyuth body lotion 500 ml @156 → B09DD4WD7W | Already LIVE as #4541 at ₹168 with a null MRP. PDP shows ₹156, M.R.P. ₹625. **Repriced** |
| SB Loots 16:59 | Nike Fission deodorant @184 → B0DKC5PMDC | **LIVE #17741** |
| SB Loots 17:21 | "BUY" → B0DTF6KW7J (Amazon Brand Presto! pudina dishwash bar 200 g × 5) | Already LIVE as #8477 at ₹99. PDP shows ₹119, M.R.P. ₹275. **Repriced** |
| SB Loots 17:37 | Sanfe GoFresh travel toothbrush, pack of 5, @83 → B0GP18J4BT | **LIVE #17742** |
| SB Loots 17:42 | "BUY" → B0914XMQJ6 (Yogabar rolled oats 1 kg) | Skipped: grocery/FMCG food |
| Dealzone 17:36 | Lakme Retinol day creme @399, `link.amazon/B04K52K55` → B00FVUGVPM | Already LIVE as #4312 at ₹359/718. PDP shows ₹399, M.R.P. ₹999. **Repriced** |
| CoolzTricks 17:03 | IFB 187 L refrigerator @14,815, `amzn.to/4zSUqnd` → B0GW2JYSDR | Rejected: the post price depends on coupons. PDP shows ₹18,690 plus an "Apply ₹1000 coupon". The LIVE row #1498 (₹17,990) was **repriced** to the PDP price |
| ONLINE SHOPPING DEALS 17:39 | Ceolla post-shave balm | Not followed up this tick; it will be picked up next tick if it is still the latest post |
| Dealzone / SB Loots | FILA, Nike, Bewakoof, Wipro, kurta sets, Myntra jackets | Category or multi-link posts, skipped |

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17741 | Nike Fission women's liquid body fragrance deodorant 75 ml | ₹184 | ₹799 | 77% | `.a-price-whole` 184, M.R.P. from `#centerCol`, in stock, add-to-cart present |
| 17742 | Sanfe GoFresh 5-in-1 travel toothbrush (pack of 5) | ₹83 | ₹199 | 58% | `.a-price-whole` 83, M.R.P. from `#centerCol`, in stock, add-to-cart present |

Dedup against the DB (productId, slug suffix and affiliateUrl) found 0 hits. The bulk call returned `201 count 2`, and both rows were created as LIVE. The ₹ guard passed. Both images returned 200 on a HEAD check, and both pages return 200 on prod.

## Repriced LIVE duplicates

| id | Item | Old | New | MRP | Off |
|---|---|---|---|---|---|
| 4312 | Lakme Retinol Advanced Renewal day creme 50 g | ₹359 | ₹399 | ₹999 | 60% |
| 1498 | IFB 187 L 5-star inverter single-door refrigerator | ₹17,990 | ₹18,690 | ₹24,500 | 24% |
| 4541 | Everyuth Naturals sun care berries body lotion 500 ml | ₹168 | ₹156 | ₹625 (was null) | 75% |
| 8477 | Amazon Brand Presto! pudina dishwash bar 200 g × 5 | ₹99 | ₹119 | ₹275 | 57% |

- **How:** each update used `prisma.deal.update` (price, mrp, discountPct, title, description, howTo) and added a `PriceHistory` row.
- **Guards:** the ₹ guard and the % guard both passed.
- **Slugs:** not changed.
- **Coupon wording:** #1498 mentions the clip-on coupon without a ₹ amount.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 2 new slugs and the 4 repriced slugs and returned **HTTP 200** for 9 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0DKC5PMDC, B0GP18J4BT and B0914XMQJ6 were added (5,905 entries).

## CEO audit (about 17:47 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.16s, `/offers` 0.11s, `/blog` 0.50s, `/sitemap.xml` 0.08s, `/feed.xml` 0.08s, `/api/deals` 0.08s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,135 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17742 / 17727 | OK. The external cron is working through the 11-28h batch; #17741–#17742 follow |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; CONTENT-SEO runs at 18:39 for the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. 11-26 IST had 0 posts (outage gap). The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
