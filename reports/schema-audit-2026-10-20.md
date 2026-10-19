# SCHEMA-AUDIT daily tick 2026-10-20 (04:39 IST)

**11 of 11 URLs pass. Every JSON-LD block parses and no issues were found. This is a report only; nothing was changed.**

> **Fetched from the DO ingress** (`richdeals-jw726.ondigitalocean.app`), because richdeals.in is still on the OVI registrar verification hold:
> - NS = `verification-hold.suspended-domain.com`; RDAP last changed 2026-10-19T22:00Z.
> - The schema is correct, but Google and AI crawlers can't reach it until the owner verifies the registrant.
> - If the hold lasts days, expect the Offer/Product rich results to drop.

## Method

Same checks as 10-19 (`apps/api/_schema1020.cjs`, scratch: `_schema1017.cjs` with the base URL swapped to the ingress):
- **Deal pages:** Product + Offer; INR; Offer price = DB price = visible `₹` copy; `priceValidUntil` is in the future; availability; image; BreadcrumbList; FAQPage with every question and answer visible on the page.
- **Posts:** Article with headline, datePublished, image and author; BreadcrumbList; FAQPage questions visible.

## Hub pages

| URL | HTTP | JSON-LD types | Issues |
|---|---|---|---|
| `/` | 200 | Organization, WebSite, ItemList | none |
| `/offers` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |
| `/blog` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |

## 5 newest LIVE deal pages

All 5 have Product, BreadcrumbList and FAQPage.

| Slug | Offer price | Currency | priceValidUntil | Availability | Issues |
|---|---|---|---|---|---|
| `assembled-core-i5-desktop-19-inch-lg-display-8gb-512gb-dpchgamgws5thvux` | ₹20,490 | INR | 2026-11-02 | InStock | none |
| `solara-sipper-water-bottle-1-litre-tritan-b0blqtxsdx` | ₹299 | INR | 2026-11-02 | InStock | none |
| `bonkaso-climb-easy-6-step-foldable-steel-kitchen-ladder-b0c281hzm1` | ₹2,869 | INR | 2026-11-02 | InStock | none |
| `the-indian-garage-co-men-slim-fit-mid-rise-cotton-shorts-b0bxxwmfhg` | ₹275 | INR | 2026-11-02 | InStock | none |
| `zebronics-juke-bar-9550-pro-5-2-soundbar-625w-silver-b0cjm2nst8` | ₹9,999 | INR | 2026-11-02 | InStock | none |

## 3 newest posts

| Slug | JSON-LD types | Issues |
|---|---|---|
| `3-star-vs-5-star-ac-which-to-buy-india-bill-payback` | Article, BreadcrumbList, FAQPage, HowTo | none |
| `when-to-replace-non-stick-pan-signs-lifespan-india` | Article, BreadcrumbList, FAQPage | none |
| `cold-press-vs-centrifugal-juicer-vs-juicer-mixer-grinder-india` | Article, BreadcrumbList, FAQPage | none |

## CEO audit

- **Posts (IST):** 1 today, 4 yesterday. Coverless 0, seoless 0. CONTENT-SEO 06:09 fills the rest.
- **Deals:** 13,392 LIVE / 13,797 total. Null-price 0, null-image 0, PENDING_REVIEW 0. Newest is #13915, 6 minutes old.
- **Broadcast:** cursor 13915 = DB max 13915, caught up.
- **Prod:** app is green on the ingress. The domain is down (registrar hold); owner action at OVI.
- **Housekeeping:** 0 unpushed commits before this report.
