# TELEGRAM-DEAL-MONITOR tick — 2026-11-16f

The tick read all 13 groups from `data/tg-groups.json` in one `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile). It resolved every amzn.lt, link.amazon and bittli.in shortlink posted since tick e and deduped against `data/tg-multi-seen.json` and the live DB productId. Every price was verified on the merchant PDP: Amazon in the logged-in tab, Shopsy from the embedded pricing JSON. Run at about 14:55–15:08 IST.

**Result: 5 pushed LIVE (bulk count 5, all `created:true`), 3 from Amazon and 2 from Shopsy. IndexNow returned HTTP 200 for 8 urls. All five deal pages return 200 on prod.**

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16680 | Amazon | Himalaya Cocoa Butter Intensive Body Lotion, 400ml | ₹220 | ₹445 | 51% |
| 16681 | Amazon | Dabur Gulabari Shower Gel, 250ml | ₹99 | ₹199 | 50% |
| 16682 | Amazon | Front Bumper Stainless Steel for Chetak 3501, 3502 and 3503 | ₹299 | ₹1,499 | 80% |
| 16683 | Shopsy | Jholawala 62L Expandable Strolley Duffel Bag, Brown | ₹279 | ₹2,999 | 90% |
| 16684 | Shopsy | Cutbazz Blanket Organizer Under-Bed Storage Bag, Grey, Pack of 3 | ₹192 | ₹999 | 80% |

- **Sources:**
  - SB Loots `amzn.lt/jCq8fb5Q` resolved to B006G84AA6.
  - SB Loots `amzn.lt/nl2zqTyO` resolved to B0CJML5RKL.
  - ONLINE SHOPPING DEALS `link.amazon/B0cydyw06` resolved to B0FXVPK6R7. The shortlink code was not the ASIN.
  - SB Loots `bittli.in/AHdUTDyz` and `bittli.in/55OzbYxN` resolved to single Shopsy products.
- **bittli correction:** tick e assumed bittli links in SB Loots were category pages. This tick shows they now resolve to single Shopsy products, so every bittli link has to be resolved, not skipped.
- **Affiliate links:**
  - Source tags stripped: `bhavesh015-21` and `vivek123034-21`.
  - Amazon deals carry `?tag=ashoksachdev-21` on `/dp/ASIN`.
  - Shopsy deals go through Cuelinks (`linksredirect.com/?cid=527`) wrapping the clean `/p/itm…?pid=` URL. They do not use the Flipkart `affid`.
- **Amazon reads:**
  - Price comes from `#corePriceDisplay_desktop_feature_div .a-price-whole` and M.R.P. from `.basisPrice .a-offscreen`.
  - All three had an add-to-cart button, and none showed a coupon.
  - The Chetak bumper showed "Only 2 left in stock", so it joins the low-stock re-check list.
- **Shopsy reads:**
  - Shopsy has no ld+json. The price is the displayed `PRODUCT_PAGE_SUMMARY_V2_PRICING_RC` `finalPrice`, not the lower special or minimum price (₹251 and ₹172).
  - Both showed no availability widget and no "Sold Out", and add-to-cart was enabled.
  - `discountPct` is pinned to the PDP badges, 90% and 80%. Plain rounding would give 91% and 81%.
- **Images:** Amazon images come from `#landingImage` data-old-hires on m.media-amazon.com, and Shopsy images from rukminim3.flixcart.com.
- **Copy:** original, using only PDP title and bullet facts: size, ingredients, pH, model fitment, capacity and pack count. The Chetak copy tells buyers to check their model, because fitment is model-specific.
- **Pre-flight passed:**
  - Every ₹ in the copy equals the price or M.R.P. The one exception is the derived ₹64-per-bag figure (₹192 ÷ 3), which was allowed explicitly.
  - Image hosts are valid, every price is below its M.R.P., and the slugs are unique.

## Rejected / skipped

- **SB Loots, Bata footwear (02:10 PM):** two category links.
- **SB Loots, `bittli.in/fYne9XZR`:** a Citipro soap dispenser on Shopsy (YIRH474UBRCKHSC8), already in the seen file.
- **SB Loots, `bittli.in/qpIzGhg2`:** Vedic Wellness halim seeds on Shopsy, skipped as food/grocery.
- **Unchanged since tick e:**
  - Dealzone
  - CoolzTricks
  - Dealdost
  - Rogerkart
  - Hidden Loot and IFS Tips
  - INDIAN CHEAP DEALS and NonStopDeals (both stale)

`data/tg-multi-seen.json` now has 5,183 entries (not committed): the 5 pushed ids plus the two skipped Shopsy pids.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 5 slugs (plus its 3 hub urls) returned **HTTP 200 for 8 urls**.
- **`sitemap.xml`:** ISR, at most 30 min stale. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.43s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.73s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.58s) |
| /himalaya-cocoa-butter-intensive-body-lotion-400ml-b006g84aa6 | 200 |
| /dabur-gulabari-shower-gel-250ml-b0cjml5rkl | 200 |
| /chetak-front-bumper-stainless-steel-3501-3502-3503-b0fxvpk6r7 | 200 |
| /jholawala-62l-expandable-strolley-duffel-bag-brown-yddgss428g4gmgez | 200 |
| /cutbazz-blanket-organizer-under-bed-storage-bag-grey-pack-of-3-xgvhcd9qxbagtev9 | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,104 = 16,104 | OK (16,099 + 5) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,684 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,679 vs 16,684 | OK. The external broadcast cron picks up this batch on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- **IFS source blocked:** every `?rto=` redirects home. The 16:53 IST IFS tick probes one id first.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - new this tick: #16682 (B0FXVPK6R7)
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
