# DEAL-INGEST indiafreestuff tick 2026-09-27zl (~12:40 IST)

**Result:** 16 new deals live. Live deals went from 11,223 to 11,239.

The CONTENT-SEO tick before this one also shipped a blog post: [Instant vs Filter vs French Press Coffee (India 2026)](https://richdeals.in/blog/instant-vs-filter-vs-french-press-coffee-india-2026), post id 397. It went out through `insert-blog-mdmeta.mjs` (IndexNow HTTP 200), has a cover on DO Spaces, and returns 200 on prod. Posts today (IST) are now 3.

## Sweep
- **Swept:** homepage + /deals pages 1-3, 37 new slugs.
- **Dropped before resolve:** 4 category posts (Campus, Kook N Keech, Minesfit, T2F kids "upto X% off"), plus Bru Gold (already live) and the Acer Aspire 3 (pushed in 27zf).
- **Resolved:** 31 via the base64 `?rto=` Buy Now. 0 productIds already in the DB, so no upsert overwrote an existing slug.
- **Verified:** 25 Amazon PDPs in the logged-in tab (`.priceToPay`, `#availability`, add-to-cart, rating). 2 Flipkart items via ld+json.
- **Result:** 16 passed and 15 were rejected.

## Pushed (`/admin/deals/bulk`, HTTP 201, count 16, all `created:true`)
| Deal | Price | M.R.P. |
|---|---|---|
| ABROS men's clogs | ₹319 | ₹799 |
| Solimo 2-ply napkins, pack of 8 | ₹349 | ₹670 |
| Symbol men's cotton long kurta | ₹519 | ₹2,199 |
| Symbol women's sweatshirt | ₹329 | ₹1,799 |
| American Tourister Entrix 55 cm cabin trolley | ₹3,399 | ₹8,800 |
| AMFIN baby shower cake toppers, pack of 6 | ₹112 | ₹599 |
| Cortina 1-seater sofa cover set | ₹377 | ₹1,849 |
| LITZO women's button-down shirt | ₹299 | ₹3,999 |
| Maped 12-piece exam kit | ₹63 | ₹200 |
| Maybelline Super Stay Flex powder, shade 228 | ₹355 | ₹710 |
| Maybelline Super Stay Flex powder, shade 330 | ₹355 | ₹710 |
| Nasher Miles Krabi 28 inch check-in trolley | ₹4,299 | ₹18,995 |
| Negi pull-along turtle toy | ₹223 | ₹549 |
| Sfane gym duffel with shoe pocket | ₹399 | ₹1,395 |
| Triumph Kay Kay SN 103 badminton net | ₹179 | ₹400 |
| White Button pattu pavadai lehenga choli | ₹269 | ₹1,999 |

All 16 are Amazon.
- **Rounded prices:** AMFIN, Cortina, Maped and Negi have paisa prices on the PDP (112.49, 376.85, 63.36, 222.52). Each was rounded, and the drift is under ₹1.
- **No ratings yet:** American Tourister, AMFIN, Negi and Triumph are new listings. The copy says so and claims no rating.
- **Copy:** original, in GEO style. **Images:** m.media-amazon.com only. **Affiliate:** `tag=ashoksachdev-21`.
- **Script:** `apps/api/scripts/push-ifs-0927zl.mjs`.

## Rejected (15)
- **Coupon or card offer only:** Airwill table runner (5% coupon), Lenovo L-series 27 inch (ICICI/Axis card plus coupon).
- **Minimum-quantity posts:** Aerra oil (min 2), Luxor pens (min 5).
- **No buy box:** Symbol men's jacket, Bunny Beats karaoke, T2F boys, T2F girls.
- **Price drift:**
  - "MRP error" dog food: IFS ₹279 vs PDP ₹753
  - White Button silk lehenga: IFS ₹269 vs PDP ₹1,269
- **Low rating:** electric bubble gun (3.2), Temperia ear wax kit (3.3).
- **Thin listing:** ATEVON wall collage (1 review, only 1 left).
- **Flipkart OutOfStock (ld+json):** RadhiFaishon shirt, Shyam Harvest dates.

## Freshness
- **IndexNow:** HTTP 200 for 19 URLs (16 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, so it picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, so it is already current.
- **Spot check:** the ABROS deal page returns 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,239 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 |
| Posts today (IST) | 3 (meets the 2–3 rule) |
| Broadcast cursor | 11570, DB max 11586 (this batch is waiting for the external broadcast cron; not rot) |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
