# SCHEMA-AUDIT — 2026-10-03 (04:40 IST)

**6 URLs fetched from prod, all HTTP 200. Every JSON-LD block parses. All required checks pass. 0 fixes needed and nothing was changed.**

## Method

Each page was fetched with curl. Every `<script type="application/ld+json">` block was parsed with Node (arrays and `@graph` flattened), then checked:

- **FAQPage:** each question and the first 60 characters of each answer were searched for in the visible text (HTML stripped, entities decoded).
- **Images:** every `<img>` was checked for `alt`.

## Results

| URL | JSON-LD types | Result |
|---|---|---|
| `/` | Organization, WebSite (SearchAction), ItemList (30) | Pass |
| `/offers` | Organization, WebSite, BreadcrumbList (Home › Offers), CollectionPage | Pass |
| `/giordano-…-gz-50237-11-40800197` (LIVE, id 12413) | Organization, WebSite, Product, BreadcrumbList, FAQPage (6) | Pass |
| `/zebronics-zeb-jukebar-9200-…-b08svs3rkl` (EXPIRED) | Organization, WebSite, Product, BreadcrumbList, FAQPage (4) | Pass |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage (ItemList) | Pass |
| `/blog/watch-water-resistance-…` | Organization, WebSite, Article, BreadcrumbList, FAQPage (5) | Pass |

### LIVE deal (GIORDANO, id 12413)

- **Offer fields:**

  | Field | Value |
  |---|---|
  | price | 2502 |
  | priceCurrency | INR |
  | priceValidUntil | 2026-10-16 (14 days ahead) |
  | availability | InStock |
  | seller | Myntra (matches the store) |
  | url | The canonical URL |

- **Breadcrumb:** Home › Myntra (`/stores/myntra`) › product.
- **FAQPage:** all 6 questions and answers are present in the visible copy.
- **Page:** robots `index, follow`; canonical self-referencing.

### EXPIRED deal (Zebronics)

- **Offer:** availability is Discontinued, and `priceValidUntil` is correctly omitted.
- **Page:** robots `noindex, follow`, and the page stays live (it is not a 404).
- **FAQPage:** all 4 questions and answers are visible.

### Blog post

- **Article fields:**

  | Field | Value |
  |---|---|
  | headline | Present |
  | image | The DO Spaces cover |
  | datePublished / dateModified | Present |
  | author | RichDeals Editorial |
  | publisher | RichDeals, with a logo |

- **Cover image:** its `alt` is the post title.
- **FAQPage:** all 5 questions and answers are visible.

### "No price → no Offer" rule

This could not be sampled on prod, because the DB has 0 LIVE deals with a null price. The guard is still in the code (`[dealSlug]/page.tsx` around line 130).

### Images

The only `<img>` tags without alt text are `/logo-mark.svg` (×2) and `/stores/amazon.svg`. All three are decorative and sit next to a text label, so an empty `alt=""` is correct. No content images are missing alt text.

## Not flagged (by design)

- **Product has no `brand`.** This is deliberate (`page.tsx:161`): the marketplace is the seller, the real manufacturer isn't stored, and a guessed brand would be fabricated data.
- **No `aggregateRating`.** Ratings aren't stored per deal; the Offer satisfies Google's "offers/review/aggregateRating" requirement.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,934 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 359; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 1 (the day is 4 h 40 min old; 3 blog cron runs remain); 10-02: 3; 10-01: 4 |
| Broadcast cursor vs max deal id | 12,413 / 12,413 |
| Unpushed commits | 0 before this report |

No rot found.
