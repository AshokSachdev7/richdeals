# SCHEMA-AUDIT · 2026-10-23 (04:25 IST)

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
| 5 newest deals (#14267 Fire-Boltt Spin ₹1,099, CELLO Kidzbee meal set ₹380, Lifelong gel pack ₹299, steel wire scrubber ₹59, Warmfinity heating pouch ₹129) | Product+Offer (INR, InStock, priceValidUntil 2026-11-05, price = DB), BreadcrumbList(3), FAQPage(4–6q, all visible) | noindex,follow | ok |
| 3 newest posts (glass vs steel lunch box, pressure cooker gasket fix, helmet size chart) | Article (headline, image, date, author), BreadcrumbList(3), FAQPage(5q, all visible); helmet post also carries HowTo | index,follow | ok |

All 10 returned HTTP 200 and no JSON-LD block failed to parse.

- **noindex on new deals:** intended. `dealIndexable()` indexes only the top 100 deals by clicks (owner directive 2026-10-16), so this is not a defect.
- **HowTo on the helmet post:** valid markup. Google retired HowTo rich results in 2023, so it earns no SERP feature, but it is harmless and AI engines can still read the steps. It was left as is.

## CEO audit

- **Prod:** all 10 audited URLs return 200. At DESIDIME 10-23c (04:19), the 6 endpoints also returned 200.
- **Deals:** 13,737 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14267.
- **Broadcast cursor:** 14267, matching the highest deal ID.
- **Posts (IST 2026-10-23):** 1 so far, which is normal at 04:25. CONTENT-SEO runs next at 06:39. 0 posts lack a cover and 0 lack SEO fields.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
