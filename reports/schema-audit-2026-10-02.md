# SCHEMA-AUDIT — 2026-10-02 (04:39 IST)

**8 URLs checked: all valid JSON-LD, 0 issues, nothing to fix.**

| URL | HTTP | JSON-LD types | Checks |
|---|---|---|---|
| `/` | 200 | Organization, WebSite (SearchAction), ItemList (30) | OK |
| `/offers` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | Breadcrumb: Home > Offers |
| `/mast-harbour-polo-collar-t-shirt-men-72957050159b` (LIVE, Myntra) | 200 | Product+Offer, BreadcrumbList, FAQPage | ₹160 INR, priceValidUntil 2026-10-15, InStock, seller Myntra; FAQ 5/5 questions in visible copy |
| `/ant-esports-flora-digital-body-weighing-scale-180kg-b0cnlk7x34` (LIVE, Amazon) | 200 | Product+Offer, BreadcrumbList, FAQPage | ₹289 INR, priceValidUntil 2026-10-15, InStock, seller Amazon; FAQ 4/4 visible |
| `/zebronics-zeb-jukebar-9200-…-b08svs3rkl` (EXPIRED) | 200 | Product+Offer, BreadcrumbList, FAQPage | availability Discontinued, no priceValidUntil (by design for expired); FAQ 4/4 visible |
| `/amazon-audible-90-days-free-trial--3-free-audiobooks` (EXPIRED, null price) | 200 | BreadcrumbList, FAQPage (no Product) | Product/Offer omitted when there is no price, as specified; robots noindex, follow |
| `/blog` | 200 | Organization, WebSite, [BreadcrumbList, CollectionPage] | Breadcrumb: Home > Blog |
| `/blog/intel-f-vs-non-f-processor-k-kf-meaning-india` | 200 | Article, BreadcrumbList, FAQPage | Cover image on DO Spaces, datePublished, author RichDeals Editorial; FAQ 5/5 visible |

Notes:
- The blog post has 2 images with `alt=""`. Both are the decorative `/logo-mark.svg` next to the brand text, where an empty alt is correct. The cover and body images all have real alt text.
- The `/blog` JSON-LD is a single array block; it parses cleanly.
- Minor, not schema: the expired Audible deal's slug says "90 days … 3 free audiobooks" while its title says "30 or 60 days … 2 free eBooks". The page is noindex, so this is left alone.

## CEO audit (04:39 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,799 |
| PENDING | 0 |
| Null price / null image | 0 / 0 (LIVE) |
| Max deal id / broadcast cursor | 12,277 / 12,277 (synced) |
| Posts | 355; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each; 10-02: 0 so far. The 00:09 CONTENT-SEO slot was empty; next slot 06:09. Publish inline if still 0 at the 06:51 sitemon. |
| Unpushed commits | 0 before this report |
