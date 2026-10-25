# SCHEMA-AUDIT · 2026-10-26 (04:47 IST)

**Verdict: 12 URLs clean, 0 defects. No fix and no deploy needed.**

The checker fetched each live URL on https://richdeals.in, parsed every ld+json block, and checked these things:
- Every block parses.
- **Product + Offer:** currency is INR; the price equals the DB price and the visible ₹; `priceValidUntil` is not in the past; availability, url and image are set.
- **Title and h1:** the ₹ in `<title>` and in the h1 equals the Offer price.
- **FAQPage:** every question and answer appears in the visible page text.
- **BreadcrumbList:** positions run 1..n; every entry has a name; every entry except the last has an item.
- **Article:** headline, datePublished, image and author are present.
- **Robots and canonical:** robots meta tag read; canonical points to the page itself.

| URL | JSON-LD | Robots | Canonical |
|---|---|---|---|
| `/` | Organization, WebSite, ItemList | index,follow | ok |
| `/offers` | Organization, WebSite, BreadcrumbList(2), CollectionPage | index,follow | ok |
| `/blog` | Organization, WebSite, BreadcrumbList(2), CollectionPage | index,follow | ok |
| `/stores/amazon` | ItemList, BreadcrumbList(3), FAQPage(9q, all visible) | index,follow | self |
| `/category/shopping-category/appliances` | ItemList, BreadcrumbList(3), FAQPage(4q, all visible) | index,follow | self |
| #14867 Sffizeex trimmer | Product+Offer ₹195, BreadcrumbList(3), FAQPage(6q) | noindex,follow* | self |
| #14866 EvoFox Warhammer 2 | Product+Offer ₹1149, BreadcrumbList(3), FAQPage(6q) | noindex,follow* | self |
| #14865 Sky Lexus containers | Product+Offer ₹199, BreadcrumbList(3), FAQPage(5q) | noindex,follow* | self |
| #14864 Lifelong bathroom shelf | Product+Offer ₹384, BreadcrumbList(3), FAQPage(5q) | noindex,follow* | self |
| #14863 Teakwood cabin trolley | Product+Offer ₹969, BreadcrumbList(3), FAQPage(5q) | noindex,follow* | self |
| `/blog/how-to-replace-health-faucet-hose-pipe-india` | Article, BreadcrumbList(3), FAQPage(5q) | index,follow | self |
| `/blog/how-to-use-magic-eraser-melamine-sponge-walls-india` | Article, BreadcrumbList(3), FAQPage(5q), HowTo | index,follow | self |

\* Intended: `dealIndexable()` indexes only the top 100 deals by clicks (owner directive 2026-10-16).

- **HTTP and parsing:** all 12 URLs returned 200, with 0 ld+json parse errors.
- **Offers:** all 5 are INR and InStock with `priceValidUntil` 2026-11-08. The title ₹, h1 ₹, Offer price and DB price agree on all 5.

## Findings

None. The HowTo block on the magic-eraser post is valid but earns nothing, because Google retired the HowTo rich result. It is harmless, so I left it.

## CEO audit

- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 14,336 LIVE; 0 PENDING_REVIEW; 0 LIVE with null price; 0 LIVE with null image.
- **Posts:** 0 without a cover; 0 missing seoTitle or seoDesc.
- **Broadcast cursor:** 14867, equal to the DB max of 14867.
- **Posts per IST day:**

  | Day | Posts |
  |---|---|
  | 10-21 | 3 |
  | 10-22 | 3 |
  | 10-23 | 3 |
  | 10-24 | 3 |
  | 10-25 | 2 |
  | 10-26 | 1 so far (CONTENT-SEO runs at 06:39) |

- **Unpushed commits:** 0 before this commit.
- **Carried forward (not fixed):**
  - The chrome-devtools and reticle MCPs are still at CONNECT_TIMEOUT. Playwright works.
  - The DO API token has still not been rotated.
  - 71 GSC-pinned deals must be re-verified before 11-20.
