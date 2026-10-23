# SCHEMA-AUDIT · 2026-10-24 (04:23 IST)

**Clean. 0 schema defects across 10 URLs.** The first pass flagged one FAQ visibility problem on a post, but it was a false positive in the checker. The checker is now fixed (see below).

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
| `/amazon-basics-filtered-shower-head-5-modes-b0f8w39mb2` (#14535) | Product+Offer (INR 579, InStock, priceValidUntil 2026-11-06), BreadcrumbList(3), FAQPage(4q) | noindex,follow | ok |
| `/lifelong-66w-pd-usb-a-to-type-c-cable-b0flk3lq84` (#14534) | Product+Offer (INR 172, InStock), BreadcrumbList(3), FAQPage(4q) | noindex,follow | ok |
| `/marwarbites-chia-seeds-1kg-b0hh3nmsgf` (#14533) | Product+Offer (INR 220, InStock), BreadcrumbList(3), FAQPage(5q) | noindex,follow | ok |
| `/wonderchef-crescent-electric-kettle-1-5l-b0bm9vp9j5` (#14532) | Product+Offer (INR 499, InStock), BreadcrumbList(3), FAQPage(4q) | noindex,follow | ok |
| `/larah-borosil-ocean-fluted-dinner-set-21-pcs-b0c7mk5j77` (#14531) | Product+Offer (INR 1280, InStock), BreadcrumbList(3), FAQPage(5q) | noindex,follow | ok |
| `/blog/how-to-measure-laptop-size-for-sleeve-bag-backpack-india` | Article, BreadcrumbList(3), FAQPage(5q, all visible), HowTo | index,follow | ok |
| `/blog/copper-alkaline-zinc-water-purifier-worth-it-india` | Article, BreadcrumbList(3), FAQPage(5q, all visible) | index,follow | ok |
| `/blog/induction-compatible-utensils-how-to-check-india` | Article, BreadcrumbList(3), FAQPage(5q, all visible) | index,follow | ok |

- **HTTP and parsing:** all 10 URLs returned 200 and no JSON-LD block failed to parse.
- **Offer prices:** all 5 deal Offers equal the DB price, and every one has `priceValidUntil` set to 2026-11-06 (today + 13 days, inside the +14d window).

## Findings

- **FAQ "visible 4/5" on the laptop-sleeve post is a false positive.** Question 5, `Does the "fits up to 15.6 inch" label account for 16:10 screens?`, contains double quotes, and the visible HTML encodes them as `&quot;`. The checker matched the raw string only, so it missed that question. A manual read shows all 5 questions are rendered in the visible "Frequently asked questions" section. The checker (scratchpad `schema22.cjs`) now also matches the `&quot;` / `&#x27;` encoded forms, and the rerun is clean.
- **noindex on new deals:** intended. `dealIndexable()` indexes only the top 100 deals by clicks (owner directive 2026-10-16), so this is not a defect.
- **HowTo on the laptop post:** valid markup. Google retired HowTo rich results in 2023, so it earns no SERP feature, but it is harmless and AI engines can still read the steps. It was left as is.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 14,004 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14535.
- **Broadcast cursor:** 14535, which equals the DB maximum, so it is fully caught up.
- **Posts (IST 2026-10-24):** 1 (post 523). This is normal at 04:23 IST. CONTENT-SEO runs next at 06:39 and ships #2. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
