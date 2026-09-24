# SCHEMA-AUDIT — 2026-09-25 (04:40 IST)

**0 errors, 0 missing blocks and 0 priceless Offers across 19 URLs.** Every URL returned HTTP 200.

## Method
- Each page was fetched from prod (`https://richdeals.in`).
- Every `<script type="application/ld+json">` block was pulled out and `JSON.parse`d. The raw `ld+json` string count is not used, because the RSC flight payload inflates it.
- Nodes were walked recursively, including nested `@graph`, `ItemList` and `offers` entries.
- Checks:
  - **Product:** has name and image.
  - **Offer:** has price, priceCurrency and availability. A priceless Offer counts as an error.
  - **BreadcrumbList:** itemListElement is not empty.
  - **FAQPage:** has a mainEntity. Every Question has `acceptedAnswer.text`, and the first 40 characters of every question also appear in the visible HTML, outside the script tags.
  - **Article:** has headline, image, author and datePublished.
- Blocks each page kind must carry:

  | Page kind | Required blocks |
  |---|---|
  | Deal | Product, BreadcrumbList, FAQPage |
  | Expired deal | BreadcrumbList, FAQPage. An Offer is optional, but if present it must be `Discontinued`. |
  | Post | Article, BreadcrumbList |
  | Hub | BreadcrumbList |

- Sample slugs were picked from the DB: the newest LIVE deals, the newest EXPIRED deals (including one with a null price), and the newest posts.

## Results
| URL | Kind | Blocks | Nodes | Types (besides the sitewide Organization and WebSite) | Offer availability | Verdict |
|---|---|---|---|---|---|---|
| `/` | home | 3 | 125 | ItemList with 30 Product+Offer | 30× InStock | OK |
| `/offers` | hub | 3 | 7 | BreadcrumbList | – | OK |
| `/coupons` | hub | 5 | 57 | BreadcrumbList, ItemList, FAQPage | – | OK |
| `/freebies` | hub | 5 | 57 | BreadcrumbList, ItemList, FAQPage | – | OK |
| `/blog` | hub | 3 | 39 | BreadcrumbList, CollectionPage, ItemList | – | OK |
| `/mast-harbour-men-suede-driving-shoes-43988901` | deal | 5 | 20 | Product+Offer, BreadcrumbList, FAQPage | InStock @384 | OK |
| `/impulse-aspireatlas-30l-…-b0csz4yn4c` | deal | 5 | 24 | Product+Offer, BreadcrumbList, FAQPage | InStock @399 | OK |
| `/lifelong-rechargeable-wireless-body-massager-…-b0b19475tb` | deal | 5 | 20 | Product+Offer, BreadcrumbList, FAQPage | InStock @299 | OK |
| `/lifelong-3-in-1-nose-ear-and-eyebrow-trimmer-b0ggbvhrts` | deal | 5 | 24 | Product+Offer, BreadcrumbList, FAQPage | InStock @599 | OK |
| `/ready-to-play-get-up-to-50-off-bookysta-…` | expired | 5 | 20 | Product+Offer, BreadcrumbList, FAQPage | Discontinued @900 | OK |
| `/tu-casa-hg-35-220watts-pendant-light-…` | expired | 5 | 22 | Product+Offer, BreadcrumbList, FAQPage | Discontinued @849 | OK |
| `/myntra-upto-60-off-on-boroplus-…-d071de` (null price) | expired | 4 | 17 | BreadcrumbList, FAQPage. No Offer, which is correct because the deal has no price. | – | OK |
| `/blog/full-body-triply-vs-triply-base-cookware-india-2026` | post | 5 | 23 | Article+ImageObject, BreadcrumbList, FAQPage | – | OK |
| `/blog/best-laptop-stand-wfh-under-1000-india-2026` | post | 5 | 23 | Article+ImageObject, BreadcrumbList, FAQPage | – | OK |
| `/blog/best-electric-kettle-under-1000-india-2026` | post | 5 | 23 | Article+ImageObject, BreadcrumbList, FAQPage | – | OK |
| `/stores/amazon` | hub | 5 | 188 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |
| `/stores/flipkart` | hub | 5 | 188 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |
| `/category/shopping-category/accessories` | hub | 5 | 178 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |
| `/category/shopping-category/appliances` | hub | 5 | 178 | ItemList with 40 Product+Offer, BreadcrumbList, FAQPage | 40× InStock | OK |

## The three error classes
- **Errors:** 0. Every block parsed, and every required field is present.
- **Missing blocks:** 0.
- **Priceless Offers:** 0. Expired deals switch to `Discontinued`, and the expired deal with no price omits its Offer entirely, which is the correct behaviour.
- **Visible FAQ:** on every page with a FAQPage (deals, expired deals, posts, `/coupons`, `/freebies`, stores, categories), every question also appears in the visible HTML.

Carry-over, not an error: `/offers` still has no ItemList, the same as on 09-23. Every other listing hub (`/`, `/coupons`, `/freebies`, `/blog`, stores, categories) has one.

## CEO audit (checked against the DB and prod)
- **Deals:** 10783 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image. Max deal id is 11130.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):**

  | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|
  | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 1 so far |

  It is 04:40 IST, and no finished day is at 0.
- **Broadcast cursor:** 11130, equal to the max id, so it is caught up.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200. The slowest is `/blog` at 0.53 s.
- **Sitemap:** 10097 URLs, the same as at 0925n.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
