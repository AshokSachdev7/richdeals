# DEAL-INGEST indiafreestuff tick — 2026-09-28am (18:09 IST)

## Discovery
- IFS homepage + /deals p1-3: 4× HTTP 200, 106 slugs, **50 new** vs seen list (2.6s between requests).
- Pre-filter dropped 7: 3 sale hubs ("upto-N-off-starting-from" — Symbol shorts, Myntra makeup organizer, Torq suitcases on Flipkart), rakhi hamper (season over), weight-loss powder, urad dal (grocery).
- Resolved 43 Buy Now links (base64 `?rto=`): 42 Amazon, 1 Myntra `/s/k/c/…/buy` cart-share link → skipped because it is not a single-product page.

## Verification (Amazon PDP, logged-in tab)
- 41 ASINs checked on the PDP. 1 was already in the DB (Craftopix notebook), so it was skipped to avoid a slug overwrite.
- **Rejected 5:**

| ASIN | Product | Reason |
|---|---|---|
| B0HDNF3SMK | solar fibre-optic stake lights | "MRP error" post; unavailable, no buy box |
| B0BN1PDL2J | Puma Better Foam Legacy | unavailable, no buy box |
| B07ZWBTH13 | Vocado Seltos mats | unavailable, no buy box |
| B0FK9TF6DG | Ganesh insulated tiffin | only 11% off (weak deal) |
| B08JR22ZVS | Symbol shirt ₹299 | duplicate listing of the ₹279 shirt; kept the cheaper one |

- For the IFS listings whose slug carried a price (Symbol, Boldfit ×2, Highlander ×2, Levi's ×2, Metro, Vector X), that price **matched the PDP**. Every pushed price is the PDP `.a-price-whole` value, and each discount matches Amazon's `.savingsPercentage` to within ±1.
- The prices shown on the PDPs of the 2 Colorfull tents (2%) and the Dr. Rashel mask (5%) do not include the clip coupons also shown there, so the coupons are mentioned in the tips.

## Push
- `/admin/deals/bulk` → **count 36**, all `created:true`, status live.
- Images from m.media-amazon.com (`_SL1500_`), affiliate `?tag=ashoksachdev-21`.
- Mix: apparel/footwear 14, home/decor 7, beauty 6, toys 4, PC/audio 3, car 1, fitness 1.

## Freshness
- IndexNow: **HTTP 200, 39 URLs** (36 slugs + 3).
- Spot check: `/levis-mens-jeans-b08l5s6zhr` → 200.
- The sitemap (ISR, refreshes every 30 min) and llms.txt (dynamic) pick up the batch automatically.

## CEO audit
| Check | Result |
|---|---|
| Live deals | 11,337 (+36) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-19 → 09-28) | 1/2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11653 vs DB max 11684. The 31-deal gap is this batch; the external broadcast cron will catch up (it self-heals). |
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
