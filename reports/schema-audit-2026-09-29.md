# SCHEMA-AUDIT tick: 2026-09-29 (04:39 IST)

## Method
- Fetched 6 prod pages with curl; all returned 200.
- Parsed every `application/ld+json` block, including `@graph` and array forms.
- Checked Offer fields, breadcrumb items, FAQ visibility (each question and answer must appear in the page HTML), Article fields, canonical/robots and image alt text.

## Results
| URL | JSON-LD | Checks |
|---|---|---|
| `/` | Organization, WebSite (SearchAction), ItemList (30) | canonical OK, index |
| `/offers` | Organization, WebSite, BreadcrumbList (Home > Offers) | OK |
| `/signoraware-steel-papad-chapati-box-1-75l-black-b07tqnfmnj` (live) | Product, BreadcrumbList (Home > Amazon > name), FAQPage | Offer: price 348, INR, priceValidUntil 2026-10-12, InStock, seller Amazon, url present. FAQ: 5 Q&As, all visible. Canonical OK. |
| `/ready-to-play-get-up-to-50-off-bookysta-com-sports-venues-all` (expired) | Product, BreadcrumbList, FAQPage | Offer: price 900, Discontinued, seller Bookysta. FAQ: 4 Q&As, visible. `noindex, follow`, EXPIRED banner present. |
| `/blog` | BreadcrumbList (Home > Blog) + CollectionPage (30 posts), as an array | Valid. |
| `/blog/house-wire-size-guide-1-5-2-5-4-6-sq-mm-india` | Article, BreadcrumbList, FAQPage, HowTo | Article: headline, image, datePublished/dateModified, author, publisher. FAQ: 4 Q&As, visible. Cover `<img>` alt = post title. og:image present. |

## Notes (no action)
- The expired Offer has no `priceValidUntil`. That is fine for a Discontinued offer.
- HowTo no longer gets rich results in Google. It is harmless, so it stays.
- The 2 `<img>` tags without alt text are `/logo-mark.svg` with `alt=""`. They are decorative, so empty alt is correct.
- No page with a null price was tested, because the DB has 0 null-price deals. The page template already leaves out the Offer when there is no price.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,485 = API total (max id 11832) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 344; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 1. Today is not 0; the next BLOG tick adds more. |
| Broadcast cursor | 11832 = DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **6/6 pages valid, 0 schema defects, 0 rot.**
