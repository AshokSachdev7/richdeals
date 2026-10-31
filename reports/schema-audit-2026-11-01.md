# SCHEMA-AUDIT: 2026-11-01 (~05:05 IST)

**Result: all 29 URLs pass and return HTTP 200. 0 stale Offer prices, including the 6 rows price-synced in IFS 11-01b and #8880 (EXPIRED, now `Discontinued`). Report only, nothing changed. CEO audit clean.**

## What was checked
- Checker: `schema1101.cjs`. It fetches the prod HTML and parses every `application/ld+json` block on the page.
- **Product/Offer:**
  - Offer price must equal the DB price, in INR.
  - `priceValidUntil` must be in the future, except on EXPIRED rows.
  - availability must be `InStock`, or `Discontinued` when the deal is EXPIRED.
  - The visible page must show the same `₹` price.
- **FAQPage:** every question in the schema must also appear as visible text on the page.
- **BreadcrumbList:** required on every page except `/`.
- **Article** on posts: headline, image, datePublished and author.
- **URL set:**
  - 5 hubs.
  - 8 top-GSC deal pages.
  - The 4 newest deals.
  - The 7 rows touched in IFS 11-01b (6 synced, 1 expired). #3593 is in both this set and the top-GSC set.
  - The 4 newest posts.

## Results
| URL | JSON-LD | Offer | Issues |
|---|---|---|---|
| `/` | Organization, WebSite, ItemList | none (hub) | none |
| `/offers` | + BreadcrumbList, CollectionPage | none | none |
| `/blog` | + BreadcrumbList, CollectionPage | none | none |
| `/stores/amazon` | 5 blocks, includes FAQPage (9 Q) | none | none |
| `/category/shopping-category/appliances` | 5 blocks, includes FAQPage (4 Q) | none | none |
| #4142 (GSC, EXPIRED) | Product, Breadcrumb, FAQ 5 Q | ₹759 Discontinued, no validUntil | none |
| #2321 (GSC) | same | ₹220 InStock, to 11-11 | none |
| #2440 (GSC, EXPIRED) | same, FAQ 4 Q | ₹1,999 Discontinued | none |
| #3593 TRESemme (GSC + synced) | same, FAQ 5 Q | ₹479 InStock, to 11-14 | none, sync visible |
| #3492 (GSC) | FAQ 4 Q | ₹299, to 11-12 | none |
| #4188 (GSC) | FAQ 6 Q | ₹1,709, to 11-12 | none |
| #3498 (GSC) | FAQ 4 Q | ₹4,299, to 11-12 | none |
| #3506 (GSC) | FAQ 6 Q | ₹249, to 11-12 | none |
| #15925 Giordano (newest) | FAQ 6 Q | ₹2,527, to 11-14 | none |
| #15924 Gesto | FAQ 4 Q | ₹99, to 11-14 | none |
| #15923 One94store | FAQ 5 Q | ₹199, to 11-14 | none |
| #15922 Foodie Puppies | FAQ 5 Q | ₹149, to 11-14 | none |
| #7863 (synced) | FAQ 4 Q | ₹89, to 11-14 | none |
| #14076 (synced) | FAQ 4 Q | ₹312, to 11-14 | none |
| #15078 (synced) | FAQ 5 Q | ₹141, to 11-14 | none |
| #15288 (synced) | FAQ 6 Q | ₹3,684, to 11-14 | none |
| #15554 (synced) | FAQ 4 Q | ₹104, to 11-14 | none |
| #8880 (EXPIRED 11-01b) | FAQ 4 Q | ₹145 Discontinued, no validUntil | none |
| `/blog/ukulele-size-guide-soprano-vs-concert-vs-tenor` | Article, Breadcrumb, FAQ 5 Q | n/a | none |
| `/blog/hdmi-capture-card-buying-guide-usb-2-0-vs-3-0-india` | + HowTo | n/a | none |
| `/blog/are-smart-bmi-scales-accurate-body-fat-readings-explained-india` | Article, Breadcrumb, FAQ 5 Q | n/a | none |
| `/blog/sandwich-maker-toast-vs-grill-vs-3-in-1-which-to-buy-india` | + HowTo | n/a | none |

Every deal page carries 5 blocks: Organization, WebSite, Product, BreadcrumbList and FAQPage.

## Findings
1. **No stale Offer prices on the sampled URLs.** The 6 rows synced in 11-01b already show the new price in their Offer, so ISR has rebuilt them.
2. **EXPIRED rows are handled correctly.** Availability is `Discontinued` and `priceValidUntil` is omitted (#4142, #2440, #8880).
3. **Low: `seller` is missing from every Offer.** Google recommends it but does not require it. Adding it is an optional improvement and not urgent.
4. **Structural risk (carried forward).** Most LIVE Offers outside the touched rows have not been checked against the merchant in more than 14 days. `priceValidUntil` rolls forward on each render, so a price that has drifted on the merchant side still looks valid in the schema. The real check is a merchant-side price sync, which the ingest ticks do on duplicate hits.

## CEO audit (~05:05 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.20 s, `/offers` 0.12 s, `/blog` 0.60 s, `/sitemap.xml` 0.09 s, `/feed.xml` 0.20 s, `/llms.txt` 0.50 s, `/api/deals` 0.18 s, `/robots.txt` 0.09 s |
| DB LIVE | 15,369 |
| DB max id | 15,925 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 455 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4, 11-01: 1 (CONTENT-SEO next run 06:32 IST) |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 (sitemon 11-01d) |

## Still open (carried forward)
- The Playwright MCP is hung and reticle is down. The effects:
  - TG reads only 5 of the 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need someone to look at the product page by hand.
- Prose drift: 118 descriptions and 32 titles.
- The DO API token needs rotating.
