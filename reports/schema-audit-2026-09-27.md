# Schema audit 2026-09-27 (~04:42 IST)

**Result:** all JSON-LD on the sampled URLs is valid. No fixes were needed. The check was run inline by parsing every `application/ld+json` block on prod.

| URL | Blocks | Result |
|---|---|---|
| `/` | Organization, WebSite (SearchAction), ItemList (30) | ok |
| `/offers` | Organization, WebSite, BreadcrumbList (Home > Offers) | ok |
| `/cortina-4-pcs-dog-miniature-figurines-showpiece-set-b0g2bk9syb` (live) | Organization, WebSite, Product, BreadcrumbList, FAQPage | ok |
| `/ready-to-play-get-up-to-50-off-bookysta-com-sports-venues-all` (expired) | Product (Discontinued), BreadcrumbList, FAQPage | ok |
| `/blog` | Organization, WebSite, [BreadcrumbList + CollectionPage] array | ok |
| `/blog/how-to-get-free-samples-freebies-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | ok |

## Details
- **Live deal Offer:**
  - price 167, INR, `priceValidUntil` 2026-10-10 (+14 days)
  - availability `InStock`
  - seller `Amazon` (the store), with an Offer url
  - Breadcrumb: Home > Amazon > product
  - FAQPage: 5 of 5 questions and answers visible on the page
- **Expired deal:**
  - availability `Discontinued`, seller `Bookysta` (the store)
  - EXPIRED banner is visible and the page stays live (not a 404)
  - `robots: noindex, follow`
  - It has no `priceValidUntil`. Google only recommends that field and it is irrelevant for a discontinued offer, so it was left alone.
- **Offer omitted when there is no price:** could not be tested live, because there are 0 live deals with a null price.
- **Blog post Article:**
  - headline, cover image (DO Spaces og)
  - datePublished 2026-08-08, dateModified 2026-09-13
  - author "RichDeals Editorial", publisher with logo
  - 0 of 4 images are missing alt text
- **Blog FAQPage:** 7 of 7 visible. The first pass counted 5 of 7 only because of HTML-entity apostrophes; after decoding, all 7 match.
- **`/blog` array block:** one `<script>` holds an array with BreadcrumbList and CollectionPage. A top-level JSON-LD array is valid.

## CEO audit (checked against the DB)
- **Prod:** all 7 endpoints return 200.
- **Deals:** 11,194 live, 0 pending review, 0 with a null price or image.
- **Broadcast cursor:** 11541 = DB max.
- **Posts:** 0 missing a cover or SEO fields. 1 published today (IST, 4.7 hours into the day).
- **Git:** 0 unpushed commits.

No rot found.
