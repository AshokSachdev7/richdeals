# SCHEMA-AUDIT — 2026-10-04 (04:41 IST)

**7 prod URLs fetched, all HTTP 200. Every JSON-LD block parses. All required checks pass. 0 fixes needed and nothing was changed.**

## Method

Each page was fetched with curl. Every ld+json block was parsed with Node, with arrays and `@graph` flattened. Then:

- **FAQPage and HowTo:** the question or step text, and the first 60 characters of each answer, were searched for in the visible text (HTML stripped, entities decoded).
- **Images:** every `<img>` was checked for `alt`.

## Results

| URL | JSON-LD types | Result |
|---|---|---|
| `/` | Organization, WebSite (SearchAction), ItemList (30) | Pass |
| `/offers` | Organization, WebSite, BreadcrumbList (Home › Offers), CollectionPage | Pass |
| `/hellcat-…-b0bxq37p33` (LIVE, newest priced) | Organization, WebSite, Product+Offer, BreadcrumbList, FAQPage (5) | Pass |
| `/zebronics-zeb-jukebar-9200-…-b08svs3rkl` (EXPIRED) | Organization, WebSite, Product+Offer, BreadcrumbList, FAQPage (4) | Pass, `noindex, follow` |
| `/amazon-audible-90-days-free-trial--3-free-audiobooks` (null price, EXPIRED) | Organization, WebSite, BreadcrumbList, FAQPage (4), **no Product** | Pass: Offer omitted |
| `/blog` | Organization, WebSite, [BreadcrumbList, CollectionPage] array | Pass (top-level array is valid JSON-LD) |
| `/blog/comforter-vs-quilt-vs-dohar-vs-blanket-gsm-guide-india` (newest post) | Organization, WebSite, Article, BreadcrumbList, HowTo (3 steps) | Pass |

## Spec checks

- **LIVE Offer:**
  - Fields: price `557`, currency INR, `priceValidUntil` 2026-10-17 (+13 days, within the +14d rule), `InStock`, seller Amazon (matches the store), url is the canonical.
- **EXPIRED Offer:**
  - Fields: price `6531`, availability `Discontinued`, seller Amazon, no `priceValidUntil`.
- **No price:**
  - The Product/Offer block is absent entirely, which is correct because a priceless Offer would be invalid schema.
  - Breadcrumb and FAQ still render.
- **BreadcrumbList:** Home › Store › Deal on deal pages, and Home › Blog › Post on blog posts. Every `item` is an absolute URL.
- **FAQPage:** all 13 Q&As across the 3 deal pages are visible on the page (question and answer prefix both true).
- **Article:**
  - Fields: headline, cover image is the DO Spaces 1200×630 PNG, datePublished and dateModified, author "RichDeals Editorial", publisher with logo.
  - The cover `<img>` alt equals the post title.
- **HowTo:** 3 steps auto-extracted from the "How to layer" list, all visible. Google no longer shows HowTo rich results, so this block is harmless but earns nothing.
- **Missing alt:** only the logo-mark SVG and the store-logo SVG have empty alt. Both are decorative (the store name is in the adjacent text), so `alt=""` is correct.
- **Canonical:** self-referencing on all 7 pages.

## CEO audit

- **Deals:** live 12,027, null price 0, null image 0, pending 0.
- **Posts:** 363, 0 coverless, 0 seoless.
- **IST posts per day** (09-25 → 10-04): 4,4,4,4,4,4,4,3,4,1. Never 0; 10-04 is in progress.
- **Broadcast cursor:** 12506 = DB max.
- **Prod endpoints** `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200.
- **Unpushed commits:** 0 before this commit.

Clean.
