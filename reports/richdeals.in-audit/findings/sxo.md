# SXO findings: richdeals.in (2026-10-28)

**SXO Gap Score: 51/100.** This is separate from the SEO Health Score.

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 7/15 | 1 of 6 money queries is aligned (product deal page). 1 has no indexable page at all (loot). 1 is a deal grid where the SERP wants a comparison listicle (smartwatch). 2 match the SERP's blog type but the equity is split across several URLs. |
| Content Depth | 8/15 | The hubs have 355 to 487 extracted words (/best/smartwatches 355, /freebies 370, /coupons 487), with one H2 (FAQ) and 3-4 FAQs. Blog guides run 1,161 to 1,898 words. No hub has a comparison table. |
| UX Signals | 11/15 | Clear "Grab Deal" / "Get This Deal" CTAs, `rel="sponsored nofollow noopener"` on /api/out links, and visible FAQ blocks. /coupons and /freebies show "Newest listing on this page added 28 October 2026 (IST)". /stores/flipkart has no visible date. |
| Schema | 8/15 | Rich JSON-LD everywhere, but Product+Offer sits on list pages: 30 items on /, 30 on /best/smartwatches, 40 on /stores/flipkart. The Product on the deal page has no `brand`. |
| Media | 8/15 | Marketplace CDN images and blog covers. No comparison tables, spec tables or price-history charts, though the SERP shows these (cheapestinindia price-history, Smartprix lists). |
| Authority | 3/15 | Domain authority is about 0 (memory: traffic-ceiling). The SERP is held by DesiDime, GrabOn, Zoutons, 91mobiles and Smartprix. |
| Freshness | 6/10 | Hub listings are dated today. The deal-page price for the product query was checked on 2026-07-28 (`validFrom`), and `priceValidUntil` 2026-11-11 is rolled forward. |

## Per-query page-type mismatch

| Query | SERP dominant type (results seen) | Our best page | Our type | Severity |
|---|---|---|---|---|
| amazon coupons today | Coupon-aggregator store pages (GrabOn, Zoutons) plus news listicles. gopaisa has an "amazon collect coupon deals today" listing. | /coupons (clip-coupon deal grid) and /blog/amazon-coupons-india-2026 (how-to) | Product listing / Blog | MEDIUM |
| flipkart offers today | Dated "deal of the day" news roundups (Zoutons "23rd April 2026", 91mobiles, Beebom, TechRadar) plus the dealsdekho listing. About 60% are blog/news. | /stores/flipkart and two blog posts with the same title | Listing + 2x Blog | HIGH (cannibal) |
| free samples india | Guides/listicles (DesiDime "50+ genuine free samples", Medium, GrabOn free-samples page, IFS). About 70% are blog. | 5+ indexable near-duplicate blog posts. /freebies is a different intent (deals at ₹99 or less). | Blog (split) | HIGH |
| best smartwatch under 5000 | Comparison listicles (91mobiles, boAt blog, Entrepreneur, Outlook) plus Smartprix price-filtered list. About 90% are comparison. | /best/smartwatches (deal grid ₹396–₹1,199). There is no under-5000 page. | Product listing | HIGH |
| loot deals today | Deal listing hubs (dealsdekho /offers/loot-deals, couponzguru) plus Telegram/WhatsApp channel pages (DesiDime, EarnKaro). | None. `/?feed=super` "Today's Biggest Loot" is noindex with canonical to / (app/page.tsx L56). | none | CRITICAL |
| thermalright peerless assassin 120 se price india | Product/retailer and price-tracker pages (getpc, cart2india, cheapestinindia, dealsmagnet) plus a Tom's Hardware review. About 80% are product pages. | /thermalright-peerless-assassin-120-se-argb-dual-tower-cpu-air-cooler-b09p4m4c7k (index). /thermalright-peerless-assassin-120-se-cpu-air-cooler is noindex. | Product | ALIGNED (freshness gap) |

## Findings

1. **CRITICAL | No indexable page for "loot deals today".**
   - Evidence: the "Super Deals — Today's Biggest Loot" view exists only at `/?feed=super`, which `generateMetadata` sets to `index:false` with canonical `/`. The homepage title "RichDeals — Best Deals, Coupons & Freebies in India" has no loot/today wording. The SERP is all listing hubs and Telegram-channel pages.
   - Fix (code template): add a `app/loot-deals/page.tsx` cloned from the /freebies hub pattern. It should filter `isSuper` or high discount, sort newest, use H1 "Loot Deals Today", show the newest-listing timestamp line, add a Telegram join CTA and an ItemList of URLs, and be appended to `staticRoutes` in the pages sitemap.
2. **HIGH | /best/smartwatches cannot surface the ₹2k–5k watches the SERP is about, and no under-5000 page exists.**
   - Evidence: the page code uses `sort:"price-asc", limit:60` and then `.slice(0,30)` with no `maxPrice`. The live page shows "30 smartwatches … from ₹396 to ₹1,199". The API has 9 live smartwatches between ₹2,399 and ₹4,999 (Motorola Moto Watch ₹4,999, Noise Pro 6 ₹3,999, boAt Lunar Embrace ₹2,550…) that never render. All of the top SERP results are comparison listicles naming specific models.
   - Fix:
     - Code: add a `BEST_TOPICS` entry `smartwatches-under-5000` with `maxPrice:5000` plus a price floor. The floor needs a `minPrice` query param, because deals.service.ts L50 only has `lte`. Use `sort:"discount"`.
     - Content: add a comparison table (display, BT calling, GPS, battery, price) built from the live rows, and link the existing posts best-smartwatches-under-3000-india, best-smartwatch-under-1500-india-2026 and best-bluetooth-calling-smartwatch-under-2000-india-2026.
3. **HIGH | Product+Offer JSON-LD on multi-product list pages.**
   - Evidence: there are 30 Product/Offer on /, 30 on /best/smartwatches and 40 on /stores/flipkart. Google's product-snippet docs say "product rich results only support pages that focus on a single product" and recommend "adding markup to product pages instead of pages that list products".
   - This is a plausible contributor to the 09-28 merchant-listings pull, but that is not proven.
   - Fix (code template): `dealItemListSchema` should emit `ItemList > ListItem{position,url,name}` only, without nested Product/Offer, on hubs. Keep Product+Offer on `[dealSlug]` only.
4. **HIGH | The "Flipkart offers today" cluster cannibalizes itself.**
   - Evidence: three indexable, sitemapped URLs use a "Flipkart Offers Today" title: /stores/flipkart, /blog/flipkart-offers-today-india-2026 and /blog/flipkart-offers-today-live-deals-2026. Two more Flipkart coupon guides are also live: flipkart-coupons-offers-india-2026 and flipkart-offers-coupons-guide-india-2026.
   - The Amazon cluster was already consolidated: 3 slugs 308 to /blog/amazon-coupons-india-2026.
   - Fix (content/config): 308 live-deals-2026 to /stores/flipkart. Retitle flipkart-offers-today-india-2026 as a bank-offer/SuperCoin explainer so it no longer says "today". Merge the two coupon guides.
5. **HIGH | The free-samples head term is split across 5+ pillars.**
   - Evidence: these indexable posts all answer the same head intent:
     - how-to-get-free-samples-freebies-india ("Free Samples in India (2026): Real Sites + Scam Check", the one /freebies links to)
     - how-to-get-free-samples-online-india-2026
     - genuine-free-samples-india-no-catch-2026
     - free-sample-websites-india-2026
     - companies-that-give-free-samples-in-india-2026
   - The SERP leader (DesiDime) is a single list of named samples.
   - Fix (content): make how-to-get-free-samples-freebies-india the pillar, with a dated list of named live sample offers. 308 the generic siblings to it and keep the niche ones (pet, skincare, period-care) as spokes.
6. **MEDIUM | Stale price on the product-query page, with no visible check date.**
   - Evidence: deal 3728 shows ₹3,933 with Offer `validFrom:"2026-07-28"` but `priceValidUntil:"2026-11-11"`, which is rolled from now. The visible copy says "Price checked on the Amazon page before we published it" with no date.
   - Fix (code template): render "Price last checked: {date}" and derive `priceValidUntil` from the last-verified date instead of now+14d. Ops: re-verify on the PDP.
7. **MEDIUM | Hubs do not link their own guides.**
   - Evidence: the main content of /coupons has no link to /blog/amazon-coupons-india-2026. /stores/flipkart has no link to any Flipkart guide. /best/smartwatches has no link to the 3 smartwatch posts. Only /freebies links its guide.
   - Fix (code template): add a `guide` href to the hub config and render a "How it works" link block above the FAQ.
8. **MEDIUM | The /stores/flipkart freshness claim contradicts the deal pages.**
   - Evidence: the store hub says "Prices are pulled from each store's live listing and refresh through the day" and shows no date. Deal pages say "checked … before we published it".
   - Fix: reuse the hub's "Newest listing on this page added …" line and change the copy to "checked when listed".
9. **LOW | No variant disambiguation on product deal pages.**
   - Evidence: 4 live Peerless pages exist: Mini ₹4,331, SE ₹4,195 (noindex), SE ARGB ₹3,933 and Vision 360 ₹12,999. The SERP itself mixes SE, V2, V3 and ARGB.
   - Fix (code): add an "Other variants" block that links deals from the same brand and model family.
10. **LOW | /offers is a credit-card/signup page ("Money Offers").**
    - Evidence: its `pub` date is 2026-01-01. Shoppers searching "flipkart/amazon offers" do not land on deals here, so the "offers" slug's meaning differs from the shopping intent.
    - Fix (content): leave it as is. Just make sure no deal hub or post anchors "offers today" to /offers.

## User stories (from SERP signals)

1. **Amazon shopper (decision):** As an Amazon shopper, I want a list of coupons that work today so I don't paste dead codes. Signal: titles "Amazon Promo Codes Today" (GrabOn) and "amazon collect coupon deals today" (gopaisa).
2. **Flipkart buyer (consideration):** As a Flipkart buyer, I want a dated deal-of-the-day list including bank cashback. Signal: Zoutons "Flipkart Deals of the day 23rd April 2026: … Bank Cashback".
3. **Budget wearable buyer (consideration):** As a budget wearable buyer, I want 5–10 named watches under ₹5k compared side by side. Signals: 91mobiles, Outlook and Entrepreneur listicles, and Smartprix's price-filtered list "updated October 10, 2026".
4. **Freebie seeker (awareness):** As a freebie seeker, I want genuine samples and to avoid scams. Signals: DesiDime "50+ Genuine Free Sample Products", and EarnKaro's "be cautious … verify deals".
5. **PC builder (decision):** As a PC builder, I want the current INR price and which variant I'm buying. Signals: the cheapestinindia price-history page, and cart2india's separate V2, V3 and ARGB listings.

## Personas (weakest first)

| Persona | Relevance | Clarity | Trust | Action | Total |
|---|---|---|---|---|---|
| Loot/Telegram deal chaser | 5 | 15 | 12 | 15 | 47 |
| Budget smartwatch comparer | 8 | 10 | 14 | 18 | 50 |
| Free-sample seeker | 15 | 14 | 15 | 10 | 54 |
| Flipkart offers shopper | 17 | 13 | 12 | 18 | 60 |
| PC builder price-checker | 20 | 15 | 12 | 20 | 67 |
| Amazon coupon hunter | 17 | 17 | 15 | 18 | 67 |

How each persona maps to the fixes:
- Loot/Telegram deal chaser → finding 1.
- Budget smartwatch comparer → finding 2.
- Free-sample seeker → finding 5. Action is low because the posts have no single next step.
- Flipkart offers shopper → findings 4 and 8.
- PC builder price-checker → findings 6 and 9.
- Amazon coupon hunter → finding 7.

## Cross-skill

- `/seo schema`: the list-page Product markup (finding 3).
- `/seo content`: free-samples and Flipkart consolidation.
- `/seo page`: the hub thin-depth issue.

Generate a PDF report? Use `/seo google report`.

## Limitations

- WebSearch is not Google India. Rank order is approximate, and no PAA, AI Overview, ads or shopping carousel data is exposed, so SERP features could not be assessed. The DataForSEO SERP API is paused.
- The "amazon coupons today" results were US-skewed.
- Amazon live prices could not be checked (curl is bot-blocked), so the ₹3,933 price is flagged as old, not proven wrong.
- No GSC position data was pulled this run.
- /blog/amazon-coupons-india-2026 returned a Cloudflare 504 at 17:23 UTC and 200 on retry, so it was treated as transient.
- The merchant-listings causality in finding 3 is inferred, not verified.

```json
{"category":"Search Experience","sxo_gap_score":51,"findings":[
{"sev":"CRITICAL","id":"no-loot-page","url":"/?feed=super"},
{"sev":"HIGH","id":"smartwatch-hub-price-truncation","url":"/best/smartwatches"},
{"sev":"HIGH","id":"product-schema-on-list-pages","url":["/","/best/smartwatches","/stores/flipkart"]},
{"sev":"HIGH","id":"flipkart-offers-cannibal","url":["/stores/flipkart","/blog/flipkart-offers-today-india-2026","/blog/flipkart-offers-today-live-deals-2026"]},
{"sev":"HIGH","id":"free-samples-pillar-split","url":"/blog/how-to-get-free-samples-freebies-india"},
{"sev":"MEDIUM","id":"stale-offer-no-checked-date","url":"/thermalright-peerless-assassin-120-se-argb-dual-tower-cpu-air-cooler-b09p4m4c7k"},
{"sev":"MEDIUM","id":"hubs-missing-guide-links","url":["/coupons","/stores/flipkart","/best/smartwatches"]},
{"sev":"MEDIUM","id":"flipkart-hub-freshness-claim","url":"/stores/flipkart"},
{"sev":"LOW","id":"variant-disambiguation","url":"deal pages"},
{"sev":"LOW","id":"offers-slug-semantics","url":"/offers"}]}
```
