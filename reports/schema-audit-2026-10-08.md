# Schema audit 2026-10-08 (04:39 IST)

This is a report only; nothing was fixed. I fetched 11 production URLs and parsed every `<script type="application/ld+json">` block on each page. Deal pages were checked against the DB row (price) and against the rendered page text (`₹` price, FAQ questions and answers).

## Results: 11/11 pass, 0 errors

| URL | Types | Result |
|---|---|---|
| `/` | Organization, WebSite, ItemList | OK |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | OK |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | OK |
| `/vaseline-cocoa-glow-400ml-deep-moisture-400ml-body-lotion-combo-b0b8zy37pg` | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/solimo-ceramic-geometric-dinner-set-white-18-pieces-b08bvk156s` | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/solimo-stainless-steel-multi-kadai-with-glass-lid-and-2-idli-plates-b0b31slps2` | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/axe-dark-temptation-215ml-axe-signature-intense-154ml-deodorant-combo-b0brg49xdq` | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/nippo-thor-max-aaa-alkaline-battery-pack-of-4-b0h4rm9p6s` | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/blog/best-mattress-under-10000-india-size-foam-guide` | Article, BreadcrumbList, FAQPage | OK |
| `/blog/bluetooth-vs-2-4ghz-wireless-keyboard-which-to-buy-india` | Article, BreadcrumbList, FAQPage | OK |
| `/blog/amoled-vs-tft-smartwatch-display-which-to-buy-india` | Article, BreadcrumbList, FAQPage, HowTo | OK |

All 11 URLs returned 200, in 65 to 517 ms.

## What each check covered

- **Product + Offer (5 deals):**
  - `priceCurrency` is INR.
  - `price` equals the DB price, and the same `₹` figure appears in the visible copy.
  - `priceValidUntil` is in the future. Sample: Nippo, valid until 2026-10-21, which is creation date + 14 days.
  - `availability` is `schema.org/InStock`.
  - The Offer has a `url` and a seller (Amazon), and the Product has an image.
- **BreadcrumbList:** positions are sequential and every item except the last has a URL. Sample: Home > Amazon > product.
- **FAQPage:** every `name` and every `acceptedAnswer` text appears in the rendered page copy. Deal pages have 4 Q&As each; the sampled post has 5.
- **Article (3 posts):** each has `headline` (110 characters or fewer), `image` (a cover on DO Spaces), `datePublished`, `dateModified`, `author` (RichDeals Editorial, linked to `/about`) and `publisher`.

## Warnings (not errors, no action this tick)

| Item | Note |
|---|---|
| Product has no `brand` | Google recommends `brand` but does not require it. Brand could be derived from the title, but there is no reliable brand field in the DB, so this is left alone. |
| Product has no `aggregateRating` | **Correct as is.** The ratings are Amazon's, and marking up third-party reviews as our own violates Google's review snippet policy. |
| Offer has no `shippingDetails` / `hasMerchantReturnPolicy` | These are only relevant to merchant listings, and Google pulled MERCHANT_LISTINGS site-wide on 09-28. We are not the merchant, so leave them out. |
| `HowTo` on the AMOLED vs TFT post | Google retired HowTo rich results in 2023. The markup is valid but does nothing, so it is harmless. |

## CEO audit (04:39 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1** (IST day is 4.6h old; later blog ticks cover the 2–3 target) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,228 |
| Broadcast cursor | 12742 vs DB max 12747: the 5 deals from the IFS tick, which the external cron will pick up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
