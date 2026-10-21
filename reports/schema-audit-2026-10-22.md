# SCHEMA-AUDIT · 2026-10-22 (04:23 IST)

**Clean. 0 schema defects across 10 URLs.**

Each URL was fetched from prod and every `application/ld+json` block was parsed. The script checked that:

- **Product / Offer:** the Offer is present with currency INR, `availability`, `priceValidUntil` and `url`. `Offer.price` equals the DB price.
- **BreadcrumbList:** positions run 1..n, every entry has a name, and every entry except the last has an `item`.
- **FAQPage:** every question has an accepted answer, and every question's text also appears on the visible page.
- **Article:** `headline`, `image`, `datePublished` and `author` are all present.
- **Page level:** the robots meta tag and the self-canonical.

| URL | JSON-LD | Robots | Canonical |
|---|---|---|---|
| `/` | Organization, WebSite, ItemList | index,follow | ok |
| `/offers` | Organization, WebSite, BreadcrumbList(2), CollectionPage | index,follow | ok |
| 5 newest deals (Carrot flashlight ₹221, Cortina sofa cover ₹199, Steellock containers ₹253, Toyzone truck ₹100, Larah Green Herbs ₹780) | Product+Offer (INR, InStock, priceValidUntil 2026-11-04, price = DB), BreadcrumbList(3), FAQPage(4–5q, all visible) | noindex,follow | ok |
| posts #516 lavalier mic, #515 thermal wear, #514 massager guide | Article (headline, image, date, author), BreadcrumbList(3), FAQPage(5q, all visible) | index,follow | ok |

All 10 returned HTTP 200 and no JSON-LD block failed to parse.

New deals carry `noindex,follow` on purpose. `dealIndexable()` indexes only the top 100 deals by clicks (owner directive 2026-10-16), so this is not a defect.

## CEO audit

- **Prod:** all 10 audited URLs return 200. At SITEMON 10-22e (04:02), 12/12 endpoints returned 200.
- **Deals:** 13,536 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14065.
- **Broadcast cursor:** 14065, matching the highest deal ID.
- **Posts (IST 2026-10-22):** 1 so far, which is normal at 04:23. CONTENT-SEO runs next at 06:39. 0 posts lack a cover and 0 lack SEO fields.
- **Unpushed commits:** 0 before this report. Crons: 9/9.
- **Unresolved:** Deal Dibba has been missing from the TG sidebar for 6 ticks.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
