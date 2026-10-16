# SCHEMA-AUDIT daily tick 2026-10-17 (04:40 IST)

**11 of 11 URLs pass. Every JSON-LD block parses, and no issues were found. This tick only reports; nothing was changed.**

## How the check works

Each page was fetched from `https://richdeals.in`, and every `<script type="application/ld+json">` block was parsed with `_schema1017.cjs` (a scratch script).

On each deal page, the script checks:
- **Product:** a Product block is present with an `offers` Offer.
- **Price and currency:** `priceCurrency` is INR and the Offer price equals the DB price.
- **Visible price:** the same `₹` price also appears in the visible page copy.
- **Dates and stock:** `priceValidUntil` is present and in the future, and `availability` is InStock, OutOfStock or Discontinued.
- **Image:** the Product has an image.
- **Breadcrumbs:** a BreadcrumbList block is present.
- **FAQ:** a FAQPage block is present, and every question and answer appears in the visible text.

On each post, the script checks for an Article with `headline`, `datePublished`, `image` and `author`, plus a BreadcrumbList. If the post has FAQPage markup, each question must appear in the visible text.

## Hub pages

| URL | HTTP | JSON-LD types | Issues |
|---|---|---|---|
| `/` | 200 | Organization, WebSite, ItemList | none |
| `/offers` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |
| `/blog` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |

## 5 newest LIVE deal pages

| Slug | Offer price | Currency | priceValidUntil | Availability | Types | Issues |
|---|---|---|---|---|---|---|
| `hetsa-women-cotton-printed-anarkali-kurti-maroon-903f136f3ce3` | ₹184 | INR | 2026-10-30 | InStock | Product, BreadcrumbList, FAQPage | none |
| `moods-velvet-condoms-15-pieces-3-packs-of-5-cdmecpmwjfjacvhg` | ₹370 | INR | 2026-10-30 | InStock | Product, BreadcrumbList, FAQPage | none |
| `multipurpose-cleaning-brush-with-refillable-liquid-dispenser-b0gqsrl7qy` | ₹59 | INR | 2026-10-30 | InStock | Product, BreadcrumbList, FAQPage | none |
| `pigeon-favourite-500w-mixer-grinder-with-3-jars-mixgt7gunaghtyfr` | ₹1,349 | INR | 2026-10-30 | InStock | Product, BreadcrumbList, FAQPage | none |
| `hilton-hek-1-5-electric-kettle-1-5-litre-ektgu4svzcsbvbza` | ₹488 | INR | 2026-10-30 | InStock | Product, BreadcrumbList, FAQPage | none |

On all 5 pages the Offer price equals the DB price and the visible `₹` copy. Every FAQ question and answer is visible on the page.

## 3 newest posts

| Slug | Types | Issues |
|---|---|---|
| `/blog/anc-db-rating-explained-32db-vs-50db-hybrid-noise-cancellation-india` | Article, BreadcrumbList, FAQPage | none |
| `/blog/how-to-choose-mosquito-net-india-bed-baby-door` | Article, BreadcrumbList, FAQPage | none |
| `/blog/lakme-vs-maybelline-liquid-lipstick-which-to-buy-india` | Article, BreadcrumbList, FAQPage | none |

## CEO audit

| Check | Result |
|---|---|
| Posts on 10-17 (IST) | 1 at 04:40 IST. Not rot: the CONTENT-SEO cron (every 6 hours) has three more runs today |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,816 / 13337 |
| Broadcast cursor | 13337, matches the DB max |
| Prod endpoints (7) | all 200, slowest `/blog` at 0.69 s |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
