# SCHEMA-AUDIT · 2026-10-21 (14:20 IST)

**Clean. 0 schema defects across 11 URLs.**

| URL | JSON-LD | Robots | Canonical |
|---|---|---|---|
| `/` | Organization, WebSite, ItemList | index,follow | `https://richdeals.in` |
| `/offers`, `/blog` | Organization, WebSite, BreadcrumbList(2), CollectionPage | index,follow | ok |
| 4 new deals (LG wire, Pigeon air fryer, Titan, K&F ND filter) | Product+Offer (INR, InStock, priceValidUntil 2026-11-04), BreadcrumbList(3), FAQPage(4–6q) | noindex,follow | ok |
| expired `eureka-forbes-omni-vac…` | Product, availability Discontinued, no priceValidUntil | noindex,follow | ok |
| posts #513, #514 | Article (image, date, author), BreadcrumbList(3), FAQPage(5q) | index,follow | ok |

Both items flagged during the run turned out **not** to be defects:
- **Noindex on new deals is intentional.** `dealIndexable()` in `lib/site.ts` follows the owner directive from 2026-10-16: only the top 100 deals by clicks are indexed. Every other deal stays live and followed, but is excluded from the sitemap.
- **The homepage canonical is present.** The audit regex missed it. A direct grep finds `<link rel="canonical" href="https://richdeals.in"/>`.
