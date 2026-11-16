# TELEGRAM-DEAL-MONITOR tick — 2026-11-16h

The tick read all 13 groups from `data/tg-groups.json` in one `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile). It resolved every amzn.lt, link.amazon and fkrt.it shortlink posted since tick g, then deduped against `data/tg-multi-seen.json` and the live DB productId. Every price was verified on the merchant PDP: Amazon in the logged-in tab and Flipkart from the PDP ld+json. Run at about 16:40–17:35 IST.

**Result: 1 pushed LIVE (bulk count 1, `created:true`, #16695). Four dup reposts led to price fixes on existing rows: #12047, #13891, #15335 and #16561. IndexNow returned HTTP 200 for 8 urls. All five touched deal pages return 200 on prod.**

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16695 | Amazon | WildHorn Sling Crossbody Chest Bag with Adjustable Strap | ₹699 | ₹2,999 | 77% |

- **Source:** SB Loots amzn.lt resolved to B0CX14F6RC.
- **Affiliate links:**
  - Source tags stripped: `bhavesh015-21`, `vivek123034-21` and the Flipkart `affid=roobaicom`.
  - The Amazon deal carries `?tag=ashoksachdev-21` on `/dp/ASIN`.
- **Amazon read:**
  - Price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, M.R.P. from `.basisPrice .a-offscreen`.
  - In stock with an add-to-cart button and no coupon.
- **Image:** `#landingImage` hi-res from m.media-amazon.com (`91Ipu3MsgbL._SL1500_`).
- **Copy:** original. The PDP had no bullets, so the copy uses only facts from the title: a sling worn crossbody, across the chest or over one shoulder, with an adjustable strap, for commuting and travel, and unisex.
- **Pre-flight passed:**
  - Every ₹ in the copy equals the price or M.R.P.
  - The image host is valid and the price is below its M.R.P.
  - The slug ends in the ASIN.
  - A Prisma dedup on the productId and slug returned no rows.

## Dup reposts — prices fixed

Each row was updated with `prisma.deal.update` (price, discountPct, and the ₹ figures in the title and description). Slugs were left unchanged.

| Id | Deal | Was | PDP now | Off |
|---|---|---|---|---|
| 12047 | Amazon Basics CR2032 Coin Cell, Pack of 5 (B0CYLDQ1D3) | ₹89 | ₹85 / ₹399 | 79% (saves ₹314) |
| 13891 | LuvLap Baby Wash & Shampoo 600ml (B0FTZ9V34L) | ₹199 | ₹240 / ₹485 | 51% |
| 15335 | Johnson EcoClean Oval Bidet Seat Cover (B0F6D99TW7) | ₹3,104 | ₹2,328 / ₹8,000 | 71% |
| 16561 | Eureka Forbes Aeroguard AP 175 Air Purifier, Flipkart (APFHR9VZEUZEJZJV) | ₹3,999 | ₹3,599 / ₹5,999 | 40% |

- **#15335:** the old copy and couponNote claimed a 36% clip coupon bringing it to about ₹1,986. The PDP still shows a coupon block, but its percentage could not be read, so both now say only that a clip coupon may show at checkout. There is no specific figure.
- **#12047:** the stale "4.2 stars (1,834 ratings)" line was dropped, because it was not re-read this tick.
- **#16561:** the Flipkart ld+json gave `offers.price` 3599, InStock.
- **#13891:** the title gained the "– Amazon" suffix that the other deals have.

## Rejected / skipped

- **Real fruit juice (B0DKJ4VXMH) and Teacurry (B09JK1BBKZ):** grocery.
- **Dettol refill (B01LNA2MQK):** reposted again, but it was already synced in tick g.
- **Category or multi-product links:**
  - a geyser category
  - Myntra HERE&NOW
  - Puma, Reebok and Adidas
  - Bata
  - an Arrow blazer post that listed two products
  - a USPA listing on Ajio
  - Libas, from Dealzone
  - Red Tape on Ajio, from CoolzTricks

`data/tg-multi-seen.json` now has 5,195 entries (not committed).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 5 slugs (1 new and 4 updated); with its 3 hub urls it returned **HTTP 200 for 8 urls**.
- **`sitemap.xml`:** ISR, at most 30 min stale. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.63s) |
| /wildhorn-sling-crossbody-chest-bag-adjustable-strap-b0cx14f6rc | 200 |
| /amazon-basics-cr2032-coin-cell-pack-of-5-b0cyldq1d3 | 200 |
| /luvlap-baby-wash-and-shampoo-600ml-b0ftz9v34l | 200 |
| /johnson-ecoclean-oval-bidet-toilet-seat-cover-b0f6d99tw7 | 200 |
| /eureka-forbes-aeroguard-ap-175-true-hepa-h13-air-purifier-apfhr9vzeuzejzjv | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,115 = 16,115 | OK (16,114 + 1) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,695 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,694 vs 16,695 | OK. The cursor has caught up through the DesiDime e batch. The external broadcast cron picks up #16695 on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The CONTENT-SEO run at 18:39 IST may add a third post (the cap is 4).

## Still open

- **IFS source blocked:** every `?rto=` redirects home. The IFS tick at 18:53 IST probes one id first.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - #16682 (B0FXVPK6R7)
  - B0FM8D7C1Z (GM Balin, "Only 1 left")
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
