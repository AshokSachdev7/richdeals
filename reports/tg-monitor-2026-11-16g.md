# TELEGRAM-DEAL-MONITOR tick — 2026-11-16g

The tick read all 13 groups from `data/tg-groups.json` in one `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile). It resolved every amzn.lt, link.amazon and bittli.in shortlink posted since tick f and deduped against `data/tg-multi-seen.json` and the live DB productId. Every price was verified on the merchant PDP: Amazon in the logged-in tab, Shopsy from the embedded pricing JSON plus ld+json. Run at about 15:40–16:07 IST.

**Result: 3 pushed LIVE (bulk count 3, all `created:true`), 2 from Amazon and 1 from Shopsy. One dup repost fixed an existing row's price (#16000 Dettol, ₹149 → ₹159). IndexNow returned HTTP 200 for 7 urls. All four touched deal pages return 200 on prod.**

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16685 | Amazon | Stainless Steel Cutting Board, 31 x 21 cm | ₹227 | ₹699 | 68% |
| 16686 | Amazon | Treo by Milton All Fresh Glass Tiffin, 3 x 400ml with Insulated Bag, Blue | ₹654 | ₹1,399 | 53% |
| 16687 | Shopsy | KILLER Girls Cotton Jersey Track Pants, Multicolor, Pack of 2 | ₹310 | ₹899 | 65% |

- **Sources:**
  - SB Loots `amzn.lt/Xcd1Ql2z` resolved to B0GFFKYNCY.
  - Dealzone `link.amazon/B0cdx4fQr` resolved to B0DDKS524F. The shortlink code was not the ASIN. ONLINE SHOPPING DEALS posted the same product.
  - SB Loots `bittli.in/g2LLepUi` resolved to a single Shopsy product (KTKHKZZ2HFC2FCKC).
- **Affiliate links:**
  - Source tags stripped: `bhavesh015-21`, `glitzdeal05-21` and the Shopsy `affid=inf_f90accbd-2089`.
  - Amazon deals carry `?tag=ashoksachdev-21` on `/dp/ASIN`.
  - The Shopsy deal goes through Cuelinks (`linksredirect.com/?cid=527`) wrapping the clean `/p/itm…?pid=` URL.
- **Amazon reads:**
  - Price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, M.R.P. from `.basisPrice .a-offscreen`.
  - Both in stock with an add-to-cart button and no coupon.
  - The Treo tiffin was posted at ₹499 in the channels; the PDP showed ₹654, so the deal went up at the verified ₹654, not the channel price.
- **Shopsy read:**
  - The price is the displayed `PRODUCT_PAGE_SUMMARY_V2_PRICING` `finalPrice` Total (₹310), not the lower FSP (₹278). This PDP also carries ld+json, which agrees: 310, InStock.
  - `discountPct` is pinned to the PDP `totalDiscount` badge (65%).
  - Sizes run 8–15 years; the copy says the price can vary by size.
- **Images:** Amazon from `#landingImage` data-old-hires on m.media-amazon.com (`51DdmxYsrzL._SL1024_`, `81VB6bxGDIL._SL1500_`), Shopsy from rukminim3.flixcart.com.
- **Copy:** original, using only PDP title and bullet facts (dimensions, capacity, pack count, material).
- **Pre-flight passed:** every ₹ in the copy equals the price or M.R.P., image hosts are valid, every price is below its M.R.P., and the slugs are unique. A slug typo (`b0gffkycy`) was caught and fixed to `b0gffkyncy` before the push.

## Dup repost — price fixed

- **Dettol Original Liquid Handwash Refill Pouch (B01LNA2MQK)** was reposted. It matches LIVE row #16000. The PDP had moved from ₹149 to ₹159 (M.R.P. ₹219), so the row was updated with `prisma.deal.update`: price 159, discountPct 27, title and description rewritten to match. The slug was left unchanged (`dettol-original-liquid-handwash-refill-pouch-b01lna2mqk`).

## Rejected / skipped

- **Milton Remy 2.0 1800ml (B0G1MT1H5K):** channel said ₹180; the PDP shows ₹462 against ₹675 (32%). The deal is gone.
- **SB Loots, Milton "More" links:** `/s?` search pages.
- **Red Tape on Ajio (SB Loots, CoolzTricks):** category links.
- **Dealdost:** Scapia and Tanishq referral loot.
- **Unchanged since tick f:** Rogerkart, Hidden Loot, IFS Tips, INDIAN CHEAP DEALS and NonStopDeals.

`data/tg-multi-seen.json` now has 5,188 entries (not committed): the 3 pushed ids, the Dettol repost and the rejected Milton Remy.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 4 slugs (3 new plus Dettol, plus its 3 hub urls) returned **HTTP 200 for 7 urls**.
- **`sitemap.xml`:** ISR, at most 30 min stale. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.63s) |
| /stainless-steel-cutting-board-31x21cm-b0gffkyncy | 200 |
| /treo-by-milton-all-fresh-glass-tiffin-3x400ml-insulated-bag-blue-b0ddks524f | 200 |
| /killer-girls-cotton-track-pants-pack-of-2-ktkhkzz2hfc2fckc | 200 |
| /dettol-original-liquid-handwash-refill-pouch-b01lna2mqk | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,107 = 16,107 | OK (16,104 + 3) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,687 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,684 vs 16,687 | OK. The external broadcast cron picks up this batch on its next run. |
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
  - #16682 (B0FXVPK6R7)
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
