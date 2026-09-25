# SCHEMA-AUDIT, 2026-09-26 (10:10 IST)

**0 errors, 0 missing blocks and 0 priceless Offers across 19 URLs.** Every URL returned HTTP 200.

## Method

- Each page was fetched from prod.
- Every `application/ld+json` block was `JSON.parse`d and walked recursively, including nested ItemList and offers entries.
- Checks:
  - **Product:** has name and image.
  - **Offer:** has price, currency and availability. A priceless Offer is an error.
  - **BreadcrumbList:** is not empty.
  - **FAQPage:** has at least one question, every question has an answer, and the first 40 characters of each question also appear in the visible HTML.
  - **Article:** has headline, image, author and datePublished.
- Blocks each page kind must carry:

  | Page kind | Required blocks |
  |---|---|
  | Deal | Product, BreadcrumbList, FAQPage |
  | Expired deal | BreadcrumbList, FAQPage. Any Offer must be `Discontinued`, and a deal with no price must have no Offer. |
  | Post | Article, BreadcrumbList |
  | Hub | BreadcrumbList |

- Samples were picked from the DB: the 4 newest LIVE deals, the 2 newest EXPIRED deals, 1 EXPIRED deal with a null price, and the 3 newest posts.
- Script: `schema0926.cjs` in the session scratchpad.

## Results

| URL | Kind | Blocks | Types | Offer availability | Verdict |
|---|---|---|---|---|---|
| `/` | home | 3 | ItemList with 30 Product+Offer | 30× InStock | OK |
| `/offers` | hub | 3 | BreadcrumbList | – | OK |
| `/coupons` | hub | 5 | BreadcrumbList, ItemList, FAQPage | – | OK |
| `/freebies` | hub | 5 | BreadcrumbList, ItemList, FAQPage | – | OK |
| `/blog` | hub | 3 | BreadcrumbList, CollectionPage, ItemList | – | OK |
| `/puma-unisex-adult-feetmax-sneakers-b0bvmbfq7w` | deal | 5 | Product+Offer, BreadcrumbList, FAQPage | InStock | OK |
| `/puma-men-s-anzarun-krick-sneakers-b0bvmghv54` | deal | 5 | Product+Offer, BreadcrumbList, FAQPage | InStock | OK |
| `/joker-witch-hazel-augustus-couple-analogue-watches-…` | deal | 5 | Product+Offer, BreadcrumbList, FAQPage | InStock | OK |
| `/flipkart-smartbuy-pureaura-9-l-ro-uv-uf-…` | deal | 5 | Product+Offer, BreadcrumbList, FAQPage | InStock | OK |
| `/ready-to-play-get-up-to-50-off-bookysta-…` | expired | 5 | Product+Offer, BreadcrumbList, FAQPage | Discontinued | OK |
| `/tu-casa-hg-35-220watts-pendant-light-…` | expired | 5 | Product+Offer, BreadcrumbList, FAQPage | Discontinued | OK |
| `/amazon-audible-90-days-free-trial--3-free-audiobooks` (null price) | expired | 4 | BreadcrumbList, FAQPage. No Offer, which is correct. | – | OK |
| `/blog/wireless-power-bank-vs-wired-india-2026` | post | 5 | Article, BreadcrumbList, FAQPage | – | OK |
| `/blog/car-charger-buying-guide-watts-pd-qc-india-2026` | post | 5 | Article, BreadcrumbList, FAQPage | – | OK |
| `/blog/ceiling-fan-size-guide-by-room-size-india-2026` | post | 6 | Article, BreadcrumbList, FAQPage, HowTo | – | OK |
| `/stores/amazon` | hub | 5 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |
| `/stores/flipkart` | hub | 5 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |
| `/category/shopping-category/accessories` | hub | 5 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |
| `/category/shopping-category/appliances` | hub | 5 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |

## Summary

- **Errors:** 0.
- **Missing blocks:** 0.
- **Priceless Offers:** 0.
- **Visible FAQ:** every FAQPage question also appears in the visible copy.
- **Carry-over, not an error:** `/offers` still has no ItemList, as on 09-23 and 09-25.

## CEO audit (checked against the DB and prod)

- **Deals:** 11,033 LIVE, 0 PENDING_REVIEW, 0 with a null price, 0 with a null image. Max id 11380.
- **Posts:** 332, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day, 09-17 → 09-26:** 2/3/3/2/1/3/2/3/4/1. No day is 0. It is 10:10 IST, and the CONTENT-SEO cron runs at about 11:39.
- **Broadcast cursor:** 11380, equal to the max id.
- **Prod:** all 7 endpoints return 200. The sitemap has 10,351 URLs.
- **Git:** 0 unpushed commits before this report.

Verdict: green.
