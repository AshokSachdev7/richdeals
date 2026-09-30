# SCHEMA-AUDIT — 2026-10-01 (04:40 IST)

**8 URLs · all HTTP 200 · 0 schema defects · 0 fixes needed**

## Pages checked (JSON-LD parsed + validated against visible HTML)
| Page | Blocks | Result |
|---|---|---|
| `/` | Organization, WebSite (SearchAction), ItemList (30) | OK |
| `/offers` | Organization, WebSite, BreadcrumbList (Home > Offers), CollectionPage | OK |
| `/wonderchef-…-b079zbz3d5` (LIVE Amazon, newest id 12196) | Product+Offer, BreadcrumbList, FAQPage (5) | price 549 INR · priceValidUntil 2026-10-14 · InStock · seller Amazon |
| `/lacto-calamine-…-fltftjz93nryhkce` (LIVE Flipkart) | Product+Offer, BreadcrumbList, FAQPage (5) | price 113 INR · priceValidUntil 2026-10-14 · InStock · seller Flipkart |
| `/zebronics-zeb-jukebar-9200-…` (EXPIRED) | Product+Offer, BreadcrumbList, FAQPage (4) | Discontinued · priceValidUntil omitted on purpose (`page.tsx:137`, no future validity for expired rows) |
| `/myntra-upto-60-off-…-d071de` (EXPIRED, null price) | BreadcrumbList, FAQPage (4) | Product/Offer omitted entirely (correct: no invalid Offer) |
| `/blog` | Organization, WebSite, [BreadcrumbList, CollectionPage] array | OK. A top-level array is valid JSON-LD |
| `/blog/insulated-bottle-hours-…-2026` | Article, BreadcrumbList, FAQPage (4) | headline, image, datePublished/Modified, author RichDeals Editorial, publisher OK |

## Checks
- **FAQPage**: every Q and A (first 80 chars) was found in the visible page text on all 5 pages. No schema-only FAQ.
- **Breadcrumbs**: Home > Store > Product on deals, Home > Blog > Title on posts. Every item has an `item` URL except the last one.
- **Seller = store**: matches the deal's store relation (Amazon/Flipkart).
- **Cover alt**: the blog post cover and the /blog card covers carry `alt={post.title}`. The only empty `alt=""` are the decorative logo-mark SVG and the store icon next to the store name. Empty alt is the correct accessibility choice there.
- Product has no aggregateRating/review. Offer alone satisfies the Product rich-result requirement. We do not fabricate ratings.

## CEO audit
- Prod 7/7 → 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- DB: LIVE 11,720 · EXPIRED 388 · PENDING_REVIEW 0 · null price 0 · null image 0 · max id 12,196
- Posts: 352 · coverless 0 · seo-less 0 · IST/day 09-28 4, 09-29 4, 09-30 4, 10-01 1 so far (04:40, BLOG cron has the day)
- Broadcast cursor 12196 = DB max
- Unpushed commits: 0 before this report
