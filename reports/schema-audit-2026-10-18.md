# SCHEMA-AUDIT daily tick 2026-10-18 (04:40 IST)

**11 of 11 URLs pass. Every JSON-LD block parses; no issues found. Report only, nothing changed.**

## Method

Each URL fetched from `https://richdeals.in`; every `<script type="application/ld+json">` parsed with `apps/api/_schema1017.cjs` (scratch, same script as 10-17).

- **Deal pages:** Product + Offer present; `priceCurrency` INR; Offer price = DB price; same `₹` price in visible copy; `priceValidUntil` present and future; availability InStock/OutOfStock/Discontinued; Product image; BreadcrumbList; FAQPage with every Q and A visible on page.
- **Posts:** Article with `headline`, `datePublished`, `image`, `author`; BreadcrumbList; FAQPage questions visible.

## Hub pages

| URL | HTTP | JSON-LD types | Issues |
|---|---|---|---|
| `/` | 200 | Organization, WebSite, ItemList | none |
| `/offers` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |
| `/blog` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |

## 5 newest LIVE deal pages

| Slug | Offer price | Currency | priceValidUntil | Availability | Issues |
|---|---|---|---|---|---|
| `tekcool-stainless-steel-wire-dish-cloths-pack-of-25-b0dpsn7jhm` | ₹134 | INR | 2026-10-31 | InStock | none |
| `asian-plastowares-insulated-lunch-box-3-containers-b0dbzrsjkq` | ₹261 | INR | 2026-10-31 | InStock | none |
| `zebronics-keypad-x3-wireless-keyboard-2-4-ghz-plus-bluetooth-b0h2z4gs59` | ₹742 | INR | 2026-10-31 | InStock | none |
| `trustbasket-uv-treated-square-plant-saucers-for-12-inch-pots-set-of-3-b07qwzb7j8` | ₹170 | INR | 2026-10-31 | InStock | none |
| `v-wortex-40w-bluetooth-party-speaker-with-rgb-lights-b0h6qwqrgp` | ₹1,272 | INR | 2026-10-31 | InStock | none |

All 5 carry Product, BreadcrumbList, FAQPage. Offer price = DB price = visible `₹` copy on each.

## 3 newest posts

| Slug | Types | Issues |
|---|---|---|
| `/blog/roll-on-vs-spray-deodorant-vs-antiperspirant-which-to-buy-india` | Article, BreadcrumbList, FAQPage, HowTo | none |
| `/blog/warm-white-vs-cool-day-light-vs-neutral-white-led-which-colour-for-which-room-india` | Article, BreadcrumbList, FAQPage, HowTo | none |
| `/blog/glass-top-vs-stainless-steel-gas-stove-which-to-buy-india` | Article, BreadcrumbList, FAQPage | none |

## CEO audit (04:40 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 1 (4.7 h into day; next CONTENT-SEO 06:09) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 13,019 / 13543 |
| Broadcast cursor | 13543, matches DB max |
| Prod endpoints (7) | all 200, slowest `/blog` 0.61 s |
| Session crons | 9 of 9 match roster |
| Unpushed commits | 0 before this report |

No rot found.
