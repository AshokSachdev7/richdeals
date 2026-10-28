# AI-Overview weekly probe — 2026-10-28 (11:47 IST)

## Method
- **DataForSEO is still PAUSED**, so I made no call to it and spent $0.
- **Live Google SERP read** (`gl=in&hl=en`) in the Playwright richDeals profile:
  - 3 head terms plus 5 top deal-cluster queries taken from the GSC 28-day query pull;
  - queries spaced a few seconds apart, with no captcha, so no Bing fallback was needed;
  - for each SERP I extracted the AIO block and its cited links, the organic domains under `#rso`, and searched the whole HTML for `richdeals`.
- **Last baseline:** 2026-10-07. The 10-21 run was BLOCKED (Playwright CONNECT_TIMEOUT), so this is a 3-week delta.
- **GSC 28-day totals (page dimension): 11 clicks / 395 impressions**, down from 363 / 6,328 on 10-07. The vivo cluster has gone from the top queries.

## Per-query results
| Query | AIO | AIO cites | richdeals anywhere on SERP |
|---|---|---|---|
| amazon coupons | yes | amazon.in | no |
| flipkart offers | yes | flipkart.com, dealsmagnet.com | no |
| free samples india | yes | smytten, samplr, tryandreview, indiafreestuff, coolztricks, instagram | no |
| cricket bat price under 500 | yes | amazon.in, flipkart, cultstore, just-shop.in, meesho | no |
| affordable body wash | yes | bigbasket, jiomart, nykaa | no |
| tresemme shampoo 1 litre cheapest price | yes | bharatcod, bigbasket, amazon.in, flipshope | no |
| fridge under 20000 | yes | youtube, reliancedigital, flipkart, gadgets360, mysmartprice | no |
| nose cleaner | yes | amazon.in, apollopharmacy, meesho, zepto | no |

Top organic domains, abridged:
- **amazon coupons:** coupondunia, amazon.in, groupon, theshoppingfriendly, woohoo, koupon.ai.
- **flipkart offers:** flipkart, pricehistory.app, instagram, youtube, dealsmagnet.
- **free samples:** indiafreestuff, samplr, instagram, smytten, wraply, tryandreview.
- **The deal-cluster queries:** merchants, mostly flipkart, amazon, myntra, meesho, reliancedigital and nykaa, plus youtube and reddit.

**Summary: an AIO appeared on 8 of 8 queries. richdeals was cited in 0 of 8 and appeared nowhere on any SERP** (not in the AIO, not in the organic results, not in the product surface).

## Delta vs 2026-10-07
- **Product-surface appearance lost.** On 10-07 we showed on `vivo mobile price 10000 to 15000` outside the organic results. Nothing shows this week, which matches the merchant-listings pull (memory `merchant-listings-pulled`) and the GSC collapse from 363 to 11 clicks.
- **amazon coupons:** desidime and coupondunia have dropped out of the AIO, and it now cites amazon.in only.
- **flipkart offers:** dealsmagnet (a deal aggregator) is newly cited. pricehistory.app has dropped out of the AIO but still ranks organically.
- **free samples:** the same four sites are cited plus coolztricks, and indiafreestuff (our source) is still cited.
- **AIO answer shape:** the tresemme AIO answers as "lowest price for 1-litre TRESemmé starts at ₹499 on Bharat COD". This is a price-aggregator answer, the exact shape our deal pages produce. That only helps if our Offer price is current.

## Fixed this tick: top-GSC deal-page re-verify and GEO rewrite
I read the 7 LIVE deal pages behind the GSC cluster queries off their Amazon PDPs (`#corePriceDisplay .a-price-whole`, the M.R.P. in `#centerCol`, `#availability` and the add-to-cart button). **5 of the 7 had a price drift, 1 was unavailable, and 1 matched.**

| Deal (id) | DB | PDP now | Action |
|---|---|---|---|
| Klapp 45mm fiber cricket bat (4190) | ₹263, no MRP | ₹257, M.R.P. ₹1,190, in stock | re-priced to 78% off, MRP added, title and description rewritten |
| Pears Soft & Fresh shower gel 250 ml (2108) | ₹97 / 51% | ₹95, M.R.P. ₹199 | re-priced to 52% off, title and description rewritten |
| Samsung 189 L 5-star single door (3692) | ₹17,890, no MRP | ₹17,890, M.R.P. ₹23,999, ₹750 coupon | MRP added (25% off), couponNote added, answer-first description |
| Pigeon baby nose cleaner (3679) | ₹131 / 59% | **₹204**, M.R.P. ₹319 | re-priced to 36% off, title and description rewritten |
| TRESemme Hairfall 1000 ml (3593) | ₹449 / 57% | **₹644**, M.R.P. ₹1,370 | re-priced to 53% off, title and description rewritten |
| S2M handmade soap combo 4x125g (2321) | ₹88 / 74% | **₹220**, M.R.P. ₹340 | re-priced to 35% off. The dirty title ("(\|Gift Pack … - Amazon at ₹88 … – Amazon") was cleaned, and the "handpicked, verified-live" boilerplate was replaced |
| Toyzone Charlie electric bike (2440) | ₹1,999 LIVE | **Currently unavailable**, no add-to-cart | set to EXPIRED. The 200-character title was trimmed and the boilerplate description replaced with spec bullets taken from the listing |

How the fixes were made:
- Every description now follows the playbook: it opens with an answer-first price sentence (product, price, M.R.P., % off, and per-unit price where Amazon shows one), followed by labelled spec bullets taken only from the PDP feature bullets and title.
- I removed the unsourced claims ("covers roughly a month", "shaped sweet spot", "the whole saving here").
- All changes went through `prisma.update`, which doesn't touch the slug; I verified all 7 slugs were unchanged.
- A new PriceHistory row was added for each of the 5 price changes.
- `/ld+json` Offer prices now match the PDP.
- **IndexNow: HTTP 200 (10 URLs).**
- There was **no web code change** (the `[dealSlug]` template and `dealSummary`/`dealFaq` are already answer-first), so there was no build and no deploy.

## Recommended white-hat GEO fixes (ranked)
1. **Daily top-20 GSC price re-verify inside SEO-AUDIT-FIX.** This is still the #1 recommendation, because drift was 6 of 7 this week after 7 of 9 on 10-07. Stale Offer prices on the only pages Google still shows us is what demotes the product surface.
2. **Answer-first rewrite of every LIVE deal still carrying the "is available on Amazon for ₹X … handpicked, verified-live deal" boilerplate.** Hand this to the `geo-optimizer` agent as a bulk job using PDP facts only. 2321 was one of them and sat on a GSC query page.
3. **Head terms** (amazon coupons, flipkart offers, free samples): there is no on-page fix. The AIO is held by the merchants themselves plus aggregators with authority (dealsmagnet, indiafreestuff, smytten). The lever is backlinks and authority (memory `traffic-ceiling`, `.claude/backlink-campaign.md`).
4. **Merchant-listings recovery:** keep Product/Offer valid and current (point 1) and watch GSC `searchAppearance` for MERCHANT_LISTINGS returning. There is nothing to deploy for it.
5. **DFS reinstatement is an owner action** (email support@dataforseo.com). The probe stays browser-based and free.

## CEO audit (checked against the DB, 11:47 IST)
| Check | Result |
|---|---|
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| LIVE deals | 14,722 (14,723 minus the Toyzone expiry) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Coverless posts | 0 |
| Broadcast cursor | 15257 = DB max 15257 |
| Posts today (IST) | 2, so the rule is met |
| Unpushed commits | 0 before this report |
