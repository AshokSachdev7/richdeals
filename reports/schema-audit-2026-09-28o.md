# SCHEMA-AUDIT 2026-09-28o (~04:39 IST)

**Result:** 8 URLs checked, all 200, every JSON-LD block parses, 0 defects. Nothing needed fixing.

Method: fetched each prod URL, parsed every `application/ld+json` block, and checked the fields below. The FAQ check stripped the HTML and confirmed that every question, plus the first 60 characters of every answer, appears in the visible page text.

## Samples picked from the DB
- **Newest live Amazon deal:** Sleep Company recliner.
- **Newest live non-Amazon deal:** Shopsy macrame shelf.
- **Newest expired deal with a price:** Bookysta.
- **Newest deal with no price:** Audible trial, which is expired.
- **Newest post:** backpack size guide.

## Results
| URL | Types | Checks |
|---|---|---|
| `/` | Organization, WebSite, ItemList | ok; canonical and `index, follow` |
| `/offers` | Organization, WebSite, BreadcrumbList | breadcrumb has 2 items with positions in order |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | breadcrumb has 2 items |
| `/the-sleep-company-…-b0cn1fzlrw` (live, Amazon) | Product, BreadcrumbList, FAQPage | Offer ₹33,999 INR, InStock, seller = Amazon, priceValidUntil 2026-10-11 (+14 days). Breadcrumb has 3 items. FAQ has 4 questions, all visible. |
| `/zawi-craft-…-uqngvgcnubkedzgt` (live, Shopsy) | Product, BreadcrumbList, FAQPage | Offer ₹242, InStock, seller = Shopsy, until 2026-10-11. FAQ has 5 questions, all visible. |
| `/ready-to-play-…-bookysta…` (expired, has price) | Product, BreadcrumbList, FAQPage | Offer ₹900, **Discontinued**, seller = Bookysta, no priceValidUntil. `noindex, follow`, page still returns 200. FAQ has 4 questions, all visible. |
| `/amazon-audible-90-days-free-trial…` (no price) | BreadcrumbList, FAQPage | **Product and Offer are left out**, as intended for a deal with no price. `noindex`. FAQ has 4 questions, all visible. |
| `/blog/backpack-size-guide-how-many-litres-india-2026` | Article, BreadcrumbList, FAQPage | Article has headline, image, datePublished and author. The cover `<img>` alt is the post title. FAQ has 5 questions, all visible. |

## Notes, none of them defects
- **Expired deals have no `priceValidUntil`.** This is deliberate: see `apps/web/src/app/[dealSlug]/page.tsx:131` and `lib/site.ts:56`. An expired deal has no future validity, and those pages are noindexed. Left as is.
- **Some deal pages carry 5 FAQ questions, not 4.** The extra question is generated from the deal's real fields, and the visible copy matches the schema. OK.
- Every canonical is self-referencing.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,274 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 340 |
| Posts per day (IST, 09-19 → 09-28) | 2/2/1/3/2/3/4/4/4/1. Never 0. 09-19 is partial because the audit looks back 9×24h. |
| Broadcast cursor | 11621 (file re-read), equal to the DB max of 11621 |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

**Watch:** 09-28 IST has only 1 post so far. The next BLOG tick needs to add 1–2 more, keeping the day at 4 or fewer.
