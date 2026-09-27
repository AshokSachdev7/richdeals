# DEAL-INGEST indiafreestuff tick 2026-09-27zf (~10:39 IST)

**Result:** 15 new deals live. Live deals went from 11,205 to 11,220.

## Sweep
- **Swept:** 103 slugs (homepage + /deals pages 1-3), 34 new.
- **Dropped before resolve:** 1 category post (`joy-beauty…upto-74-off`).
- **Resolved:** 33 via the base64 `?rto=` Buy Now. 0 productIds already in the DB, so no upsert overwrote an existing slug.
- **Verified:** every price on the PDP. 14 Amazon prices were read in the logged-in tab (`.priceToPay`, no coupon). The 1 Flipkart price was read from ld+json, plus the HTML strike M.R.P.
- **Result:** 15 passed and 18 were rejected.

## Pushed (`/admin/deals/bulk`, HTTP 201, count 15, all `created:true`)
| Deal | Store | Price | M.R.P. |
|---|---|---|---|
| Borosil Crysto 750 ml glass bottles, pack of 2 | Amazon | ₹487 | ₹895 |
| Borosil ProChef 26 cm non-stick kadhai | Amazon | ₹975 | ₹1,795 |
| CELLO Angelica 2000 ml glass casserole | Amazon | ₹516 | ₹915 |
| Go24 Pexpo Flip Pro 730 ml flask | Amazon | ₹630 | ₹1,099 |
| MILTON Aroma Big insulated tiffin | Amazon | ₹499 | ₹875 |
| MILTON Copper Charge gift set | Amazon | ₹1,148 | ₹2,295 |
| MILTON Gripper 750 steel bottle | Amazon | ₹205 | ₹410 |
| MILTON Micro Meal lunch box | Amazon | ₹508 | ₹875 |
| Milton Smarty 600 Thermosteel, 490 ml | Amazon | ₹499 | ₹980 |
| MILTON Steel Seal 750 containers, set of 2 | Amazon | ₹180 | ₹310 |
| Neelam steel puri dabba, 350 ml | Amazon | ₹114 | ₹200 |
| PEARLPET 1 L bottles, set of 6 | Amazon | ₹374 | ₹1,020 |
| Rylan double-spring tummy trimmer | Amazon | ₹159 | ₹999 |
| Silicone air fryer liners, 3-pack | Amazon | ₹182 | ₹699 |
| Acer Aspire 3 A324-53 (Core 3 100U, 8/256) | Flipkart | ₹42,990 | ₹49,990 |

- **Copy:** original, in GEO style. **Images:** marketplace CDN only.
- **Affiliate links:** Amazon `tag=ashoksachdev-21`, Flipkart `affid=djhackraj`.
- **Script:** `apps/api/scripts/push-ifs-0927zf.mjs`.

## Rejected (18)
- **Price exists only with a card offer:** AGARO spot cleaner, Glen chimney, Lloyd 188 L fridge, Whirlpool 192 L fridge, Whirlpool 300 L fridge.
- **Price exists only with a coupon (PDP price vs IFS price):**
  - Scott polo: 799 vs 401
  - Scott hoodie: 799 vs 401
  - Arcticool 13000 RPM: 999 vs 949
  - Arcticool 16000 RPM: 1697 vs 1447
  - AWG polo: 599 vs 300
  - ImTheBest bat: 129 vs 125
  - Ronteno clock: 4749 vs 4036
  - Sumeet waghariya: 439 vs 307
  - Sumeet tawa: 1529 vs 1070
  - TUNAI fish food: 154 vs 150
- **No buy box:** Stealodeal card holder.
- **Price drift:** Joy moisturiser, IFS 168 vs PDP 184.
- **Rating 3.3:** GWALBROS earbuds.

## Freshness
- **IndexNow:** HTTP 200 for 18 URLs (15 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, so it picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, so it is already current.
- **Spot check:** the Acer deal page returns 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,220 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 |
| Posts today (IST) | 2 (rule is 2–3; the CONTENT-SEO cron runs later) |
| Broadcast cursor | 11552, DB max 11567 (this batch is waiting for the external broadcast cron; not rot) |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
