# Schema audit 2026-10-09 (04:39 IST)

Report only; nothing was fixed. I fetched 11 production URLs and parsed every `<script type="application/ld+json">` block on each. Deal pages were checked against the DB row (price) and against the rendered page text (the `₹` price and every FAQ question and answer).

## Results: 11/11 pass, 0 errors

| URL | Types | Offer | Result |
|---|---|---|---|
| `/` | Organization, WebSite, ItemList | n/a | OK |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | n/a | OK |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | n/a | OK |
| `/aqua-d-pure-12l-ro-uv-uf-water-purifier-with-zinc-copper-and-alkaline-b0d968jvpp` | Product+Offer, BreadcrumbList, FAQPage | ₹4749, valid until 2026-10-22 | OK |
| `/dubstep-pop-615-8w-bluetooth-speaker-with-mic-tws-matcha-green-b0hkk16qpj` | Product+Offer, BreadcrumbList, FAQPage | ₹499, valid until 2026-10-22 | OK |
| `/zebronics-pa122a-12v-24w-power-adapter-for-router-cctv-dvr-nvr-b0gzhbxmf9` | Product+Offer, BreadcrumbList, FAQPage | ₹249, valid until 2026-10-22 | OK |
| `/xiaomi-sound-outdoor-30w-bluetooth-speaker-with-mic-ip67-green-b0h1rfpvc1` | Product+Offer, BreadcrumbList, FAQPage | ₹3499, valid until 2026-10-22 | OK |
| `/nayasa-plastic-wall-mount-bathroom-storage-cabinet-with-drawer-black-b0bcg7nxkd` | Product+Offer, BreadcrumbList, FAQPage | ₹1039, valid until 2026-10-22 | OK |
| `/blog/glassline-vs-stainless-steel-geyser-tank-which-lasts-longer-india` | Article, BreadcrumbList, FAQPage | n/a | OK |
| `/blog/how-to-clean-washing-machine-drum-tablets-vs-vinegar-india` | Article, BreadcrumbList, FAQPage, HowTo | n/a | OK |
| `/blog/quartz-vs-halogen-vs-carbon-heater-difference-india` | Article, BreadcrumbList, FAQPage | n/a | OK |

All 11 URLs returned 200, in 82 to 468 ms.

## What each check covered

- **Product + Offer (5 newest live deals):**
  - `priceCurrency` is INR.
  - The Offer `price` equals the DB price.
  - The same price in `₹N,NNN` form appears in the visible page copy.
  - `priceValidUntil` is in the future.
  - `availability` is `schema.org/InStock`.
  - The Offer has a `url`, and the Product has a `name` and an `image`.
- **BreadcrumbList:** positions run 1..n and every item except the last has an `item` URL.
- **FAQPage:** every question and every `acceptedAnswer` text appears in the rendered page copy.
- **Article (3 newest posts):** each has `headline` (110 characters or fewer), `image`, `author`, `publisher`, `datePublished` and `dateModified`.

## Spot check: the deal repriced in the IFS tick

Row 5885 (`/lifelong-1800w-induction-stove-surge-protection`) was moved from ₹999 to ₹1,199 with a Prisma update.

- **First fetch:** the Offer still read 999, while the prod API already returned 1199.
- **Re-fetch a minute later:** 1199.

The page itself is `force-dynamic`, so the lag came from a short-lived fetch cache on the API call and cleared on its own. No action needed.

## Warnings (unchanged from 10-08, no action)

| Item | Note |
|---|---|
| Product has no `brand` | Google recommends it but does not require it, and there is no reliable brand field in the DB. |
| Product has no `aggregateRating` | **Correct as is.** The ratings are Amazon's, so marking them up as ours would violate Google's review-snippet policy. |
| Offer has no `shippingDetails` / `hasMerchantReturnPolicy` | These only matter for merchant listings. We are not the merchant, and Google pulled MERCHANT_LISTINGS site-wide on 09-28. |
| `HowTo` on the washing-machine post | Google retired HowTo rich results in 2023. The markup is valid and harmless. |

## CEO audit (04:39 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 1 (the IST day is 4.6h old; CONTENT-SEO ticks will add more) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,327 |
| Broadcast cursor | 12844, equal to DB max 12844 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
