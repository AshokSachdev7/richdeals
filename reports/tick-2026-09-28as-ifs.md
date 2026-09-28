# DEAL-INGEST indiafreestuff tick: 2026-09-28as (14:38 IST)

## Discovery
- Fetched the IFS homepage and /deals pages 1-3: all 4 returned HTTP 200. Found 103 slugs, of which **36 are new** against the seen list (2.6s between requests).
- Dropped 4 in the pre-filter. The remaining 32 Buy Now links resolved to 28 Amazon, 3 Flipkart and 1 Ajio.

## Verification
All 28 ASINs were checked on the Amazon PDP in the logged-in tab. The 3 Flipkart pids were checked via ld+json in the browser tab. **17 passed and 15 were rejected:**

| Item | Reason |
|---|---|
| B0H9PLX73J bean bag cover, B0CRRT3Y1Y Levi's 512 | unavailable, no add-to-cart |
| B0F1Z1VLV6 Canon PIXMA TR160 | only 3% off |
| B0G1732SCT Just Party kit | only 13% off |
| B00PP6UC3O Brustro marker | no M.R.P. or discount |
| B07CFYK57H lockout tool, B0CB69RWHL YOHO loafer | price is above M.R.P. (bad data) |
| B0CHP7K5QF Indian Garage bomber | ₹731 vs ₹799 does not match the claimed 81% |
| B0DJC28K7Y Puma | duplicate of B0DJC19MF6 with bad M.R.P. data |
| B0D8FL5GPC FNOCKS | duplicate of B0D93ZYTT1 (same image) |
| B0DH55H54X SOJANYA kurta | 2.9-star rating |
| B0CCB6QQLK Xylofit dumbbells | 1.0-star rating |
| Flipkart SMK helmet, Truecode scanner | ld+json shows OutOfStock |
| Ajio 443120783 t-shirt | curl got 403, so the price could not be verified |

- For Benito, Gerua and Bata, the M.R.P. was re-read from `.basisPrice` because the first regex read did not match the ratio. After the re-read, all 17 discounts are within ±1 of Amazon's `.savingsPercentage`.
- Flipkart IMATI juicer: ₹497, M.R.P. ₹1,599, InStock. The canonical `/p/itm6dede2b0d5e1b` path was found via Flipkart search.

## Push
- `/admin/deals/bulk` returned **count 17**, all `created:true` and live. The DB dedup found 0 of the pids already present.
- Split: 16 Amazon (`?tag=ashoksachdev-21`) and 1 Flipkart (`affid=djhackraj`).
- Images: m.media-amazon.com `_SL1500_` for Amazon and rukmini1.flixcart.com for Flipkart.
- Spot check: `/benito-mini-eco-steel-coffee-chutney-grinder-jar-200ml-b0fmnzyqyd` returns 200 on prod.

## Freshness
- IndexNow returned **HTTP 200 for 20 URLs** (17 slugs + 3).
- The sitemap (ISR, refreshes every 30 min) and llms.txt (dynamic) will pick up the batch automatically.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,356 (+17) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11686 vs DB max 11703. The gap is this batch; the external cron will catch up (it self-heals). |
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
