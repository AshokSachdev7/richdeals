# TELEGRAM-DEAL-MONITOR tick — 2026-11-16i

The tick read all 13 groups from `data/tg-groups.json` in one `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile). It resolved every amzn.lt, link.amazon and Shopsy shortlink posted since tick h, then deduped against `data/tg-multi-seen.json` and the live DB productId. Every price was verified on the merchant PDP: Amazon in the logged-in tab, Shopsy from the embedded pricing JSON plus ld+json. Run at about 17:40–18:35 IST.

**Result: 3 pushed LIVE (bulk count 3, all `created:true`, #16696–#16698): 1 from Amazon and 2 from Shopsy. Three dup reposts led to price fixes on existing rows: #12275, #16224 and #14017. IndexNow returned HTTP 200 for 9 urls. All six touched deal pages return 200 on prod.**

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16696 | Amazon | Havells Gatik Pro 400mm Wall Mount Fan | ₹2,190 | ₹4,090 | 46% |
| 16697 | Shopsy | MG Saless Power Plus Flexi Swan LED Desk Lamp (Model E-125) | ₹245 | ₹998 | 75% |
| 16698 | Shopsy | Vigneshgenix Handsfree Rice Pot Drain Stand | ₹188 | ₹999 | 81% |

- **Affiliate links:**
  - Source tags stripped.
  - The Amazon deal carries `?tag=ashoksachdev-21` on `/dp/ASIN`.
  - Both Shopsy deals go through Cuelinks (`linksredirect.com/?cid=527`) wrapping the clean `/p/itm…?pid=` URL.
- **Amazon read:**
  - Price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, M.R.P. from `.basisPrice .a-offscreen`.
  - In stock with an add-to-cart button and no coupon.
- **Shopsy reads:**
  - Price is the `PRODUCT_PAGE_SUMMARY_V2_PRICING` `finalPrice` Total, and ld+json agrees: 245 InStock and 188 InStock.
  - `discountPct` is pinned to the PDP savings text (75% and 81%).
- **Images:** Havells from m.media-amazon.com (`71Z2zCJH5iL._SL1500_`), Shopsy from rukminim3.flixcart.com. All three returned 200 image/jpeg before the push.
- **Copy:** original. Havells uses PDP bullet facts (1350 RPM, two pull strings, copper winding, thermal overload protection, 2-year warranty). The Shopsy specs table read came back empty, so both Shopsy deals use title facts only, with no claims about battery or material.
- **Pre-flight passed:**
  - Every ₹ in the copy equals the price or M.R.P.
  - Image hosts are valid, and every price is below its M.R.P.
  - Every slug ends in its product id, and the slugs are unique.
  - A Prisma dedup on the three productIds returned no rows.

## Dup reposts — prices fixed

Each row was updated with `prisma.deal.update`. Slugs were left unchanged.

| Id | Deal | Was | PDP now | Off |
|---|---|---|---|---|
| 12275 | ANT Esports Flora Digital Body Weighing Scale 180 kg (B0CNLK7X34) | ₹289 | ₹379 / ₹2,199 | 83% (saves ₹1,820) |
| 16224 | MILTON Super Sherry Kids Lunch Box (B0FH6MX37C) | ₹203 | ₹225 / ₹280 | 20% |
| 14017 | Krikav Rechargeable Emergency Desk Lamp, Shopsy (XTLGPU5WAHXZZKYS) | ₹239, no M.R.P. | ₹239 / ₹1,899 | 87% |

- **#12275:** the stale "4.2 stars (1,479 ratings)" line was dropped, because it was not re-read this tick.
- **#16224:** the old title and copy called it a steel insulated tiffin. The PDP is a plastic, food-grade, BPA-free kids' lunch box with a 4-side locking lid and a leak-proof inner container, so the title and description were rewritten to match. The slug still says "steel-insulated-tiffin-box"; it was kept, because changing it would 404 the old URL.
- **#14017:** the row had no M.R.P. The PDP shows ld+json 239 InStock and M.R.P. ₹1,899, so the M.R.P. and discount were filled in.
- **#10311 CELLO cooler (B0GS675WDR):** reposted, but the PDP is unchanged at ₹4,760 / ₹9,490. It shows "Only 2 left", so it was added to the low-stock list.

## Rejected / skipped

- **Category posts:** an SB Loots geyser category, Casio, and women's sweaters; CoolzTricks sweatshirts.
- **GO DESi barfi (B0CS3QLZRD):** already seen, and grocery.
- **Milton Nutri (B07D5H1MCB, #16414):** already seen.
- **DiSano Oats (B07WK74W7T), ₹149 / ₹199:** grocery/FMCG.

`data/tg-multi-seen.json` now has 5,202 entries (not committed).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 6 slugs (3 new and 3 updated); with its 3 hub urls it returned **HTTP 200 for 9 urls**.
- **`sitemap.xml`:** ISR, at most 30 min stale. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.93s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.61s) |
| /havells-gatik-pro-400mm-wall-mount-fan-b0fmrh6x8y | 200 |
| /mg-saless-power-plus-flexi-swan-led-desk-lamp-e-125-xtlghcr5zzb8urwx | 200 |
| /vigneshgenix-handsfree-rice-pot-drain-stand-xczgxrbphjmwg9sa | 200 |
| /ant-esports-flora-digital-body-weighing-scale-180kg-b0cnlk7x34 | 200 |
| /milton-steel-insulated-tiffin-box-b0fh6mx37c | 200 |
| /krikav-rechargeable-emergency-desk-lamp-xtlgpu5wahxzzkys | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,118 = 16,118 | OK (16,115 + 3) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,698 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,695 vs 16,698 | OK. The 3-deal gap is this batch; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The floor of 2 is met. The CONTENT-SEO run at 18:39 IST may add a third post (the cap is 4).

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
  - new this tick: #10311 (B0GS675WDR, CELLO cooler, "Only 2 left")
- **#16224 slug:** still says "steel-insulated-tiffin-box" for what is a plastic lunch box. Kept on purpose (a slug change 404s the old URL); the title, copy and schema are now correct.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
