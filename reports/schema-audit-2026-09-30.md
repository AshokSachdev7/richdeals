# SCHEMA-AUDIT — 2026-09-30 (10:10 IST)

Report only. 6 URLs checked; all JSON-LD valid; nothing to fix.

| URL | JSON-LD | Result |
|---|---|---|
| `/` | Organization, WebSite (SearchAction), ItemList (30) | PASS |
| `/offers` | Organization, WebSite, BreadcrumbList (Home > Offers), CollectionPage (9 items) | PASS |
| `/ant-esports-hexa-gaming-mouse-pad-260x210-stitched-edges-b0ffh3hkx4` | Product+Offer, BreadcrumbList, FAQPage | PASS |
| `/blog` | Organization, WebSite, [BreadcrumbList, CollectionPage/ItemList (32 ListItem)] | PASS |
| `/blog/how-to-season-iron-tawa-first-time-rust-fix` | Article, BreadcrumbList, FAQPage, HowTo | PASS |
| `/french-connection-womens-watch-fcn0130nrgm-green-oval-dial-b0fhws6lgz` (EXPIRED #11853) | Product+Offer, BreadcrumbList, FAQPage | PASS |

## Details
- **Live deal**: Offer price 75 INR, priceValidUntil 2026-10-13 (+14d), InStock, seller Amazon, url set. Breadcrumb Home > Amazon > product. FAQPage 6/6 Q + 6/6 A visible in HTML.
- **Expired deal**: availability `https://schema.org/Discontinued`, EXPIRED banner visible, HTTP 200, `robots: noindex, follow` (stays live, drops from index — as designed).
- **Blog post**: Article headline, image = DO Spaces `/og/` cover, datePublished/Modified set, author RichDeals Editorial, publisher logo. FAQPage 5/5 visible. Images missing/empty alt: 0/4.
- Script note: `/blog` printed empty type because the checker doesn't flatten top-level arrays — manual read confirms valid block. Checker artifact, not site bug.

## CEO audit (10:10 IST) — 0 rot
| Check | Value |
|---|---|
| Endpoints / /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals | 7/7 200 |
| Live deals | 11575 = API total |
| pending / nullPrice / nullImage | 0 / 0 / 0 |
| posts / coverless / seoless | 348 / 0 / 0 |
| Posts/day IST 09-22→09-30 | 3,2,3,4,4,4,4,4,1 (09-30 day in progress) |
| maxDeal / broadcast cursor | 11944 / 11944 |
| Unpushed commits | 0 |
