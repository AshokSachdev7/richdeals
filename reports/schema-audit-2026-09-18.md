# SCHEMA-AUDIT — richdeals.in — 2026-09-18 (04:0x IST tick)

Report only. No fixes applied — none needed.

Validator: fetched each URL live over HTTPS, extracted every
`<script type="application/ld+json">` block, parsed it, walked `@graph`, and
checked per-type required fields. 400ms between requests.

## Verdict

**13/13 URLs HTTP 200. 0 parse errors. 0 validation errors. 0 missing required blocks.**

- No `Offer` present without a price — every Product offer carries
  `price` + `priceCurrency: INR` + `availability`.
- No `FAQPage` with 0 questions; every `acceptedAnswer.text` populated.
- No empty `BreadcrumbList`; every `itemListElement` entry has `position`.
- No `Article`/`BlogPosting` missing `headline`, `image`, `datePublished` or `author`.

## Results

| URL | Kind | HTTP | Blocks | @types emitted | Missing | Errors |
|---|---|---|---|---|---|---|
| `/` | home | 200 | 3 | Organization, WebSite, ItemList | — | none |
| `/offers` | hub | 200 | 3 | Organization, WebSite, BreadcrumbList | — | none |
| `/coupons` | hub | 200 | 5 | Organization, WebSite, BreadcrumbList, ItemList, FAQPage | — | none |
| `/freebies` | hub | 200 | 5 | Organization, WebSite, BreadcrumbList, ItemList, FAQPage | — | none |
| `/blog` | hub | 200 | 3 | Organization, WebSite, BreadcrumbList, CollectionPage | — | none |
| `/home-centre-quadro-edge-queen-bed-b07tlyptqj` | deal | 200 | 5 | Organization, WebSite, Product, BreadcrumbList, FAQPage | — | none |
| `/pack-of-1-nylon-bathroom-mat-anti-skid-bath-rug-b0f1tyjhwm` | deal | 200 | 5 | same | — | none |
| `/cellecor-bropods-c105-tune-tws-earbuds-...-t-b0djgslm9b` | deal | 200 | 5 | same | — | none |
| `/tuco-kids-kumkumadi-soap-pack-of-2-x-75g-ayurvedic-bathing-bar-b0h4h3jstr` | deal | 200 | 5 | same | — | none |
| `/dynotrek-grade-11-6-to-12-9-inch-tablet-laptop-sleeve-case-with-charger-pouch-b08v3513qf` | deal | 200 | 5 | same | — | none |
| `/blog/amazon-pay-later-cibil-score-impact-india-2026` | post | 200 | 5 | Organization, WebSite, Article, BreadcrumbList, FAQPage | — | none |
| `/blog/best-kids-lunch-box-for-school-india-2026` | post | 200 | 6 | + HowTo | — | none |
| `/blog/best-single-door-refrigerator-small-kitchen-india-2026` | post | 200 | 6 | + HowTo | — | none |

## Offer detail — 5 newest deals

| Deal | image | price | currency | availability | priceValidUntil | seller | FAQ Qs | canonical |
|---|---|---|---|---|---|---|---|---|
| Home Centre Quadro Edge Queen Bed (B07TLYPTQJ) | yes | 9000 | INR | InStock | 2026-10-01 | Amazon | 5 | self |
| Nylon Bathroom Mat (B0F1TYJHWM) | yes | 124 | INR | InStock | 2026-10-01 | Amazon | 5 | self |
| CELLECOR BroPods C105 TWS (B0DJGSLM9B) | yes | 561 | INR | InStock | 2026-10-01 | Amazon | 6 | self |
| TUCO Kids Kumkumadi Soap (B0H4H3JSTR) | yes | 199 | INR | InStock | 2026-10-01 | Amazon | 5 | self |
| Dynotrek Tablet/Laptop Sleeve (B08V3513QF) | yes | 249 | INR | InStock | 2026-10-01 | Amazon | 6 | self |

Every canonical points at the page's own path — no cross-canonical leakage.
`priceValidUntil` is +14d as designed.

## Visible-copy check (Google manual-action risk)

Spot-checked `/pack-of-1-nylon-bathroom-mat-anti-skid-bath-rug-b0f1tyjhwm`:
all 5 FAQPage questions AND all 5 answer bodies appear verbatim in the
rendered HTML outside the JSON-LD. Schema-only FAQ (the manual-action
trigger) is not happening — `dealFaq()` + the visible `<section>` stay in sync.

## Actions

None. Report-only tick, and the audit is clean.
