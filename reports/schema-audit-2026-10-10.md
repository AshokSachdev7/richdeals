# SCHEMA-AUDIT 2026-10-10 (04:40 IST)

**All 11 URLs pass. No schema issues.** Report only; nothing was changed.

## URLs checked

| URL | HTTP | JSON-LD types | Verdict |
|---|---|---|---|
| `/` | 200 | Organization, WebSite, ItemList | OK |
| `/offers` | 200 | BreadcrumbList, CollectionPage | OK |
| `/blog` | 200 | BreadcrumbList, CollectionPage | OK |
| `/bajaj-majesty-dx-6…` (₹579) | 200 | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/amazon-brand-symbol-men…` (₹99) | 200 | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/safari-weekender-neo…` (₹1,229) | 200 | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/safari-45l…` (₹999) | 200 | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/dollar-lehar…` (₹85) | 200 | Product+Offer, BreadcrumbList, FAQPage | OK |
| `/blog/wet-and-dry-vacuum-cleaner-guide-filter-float-valve-blower-india` | 200 | Article, BreadcrumbList, FAQPage | OK |
| `/blog/cervical-pillow-buying-guide-height-shape-sleep-position-india` | 200 | Article, BreadcrumbList, FAQPage | OK |
| `/blog/glassline-vs-stainless-steel-geyser-tank-which-lasts-longer-india` | 200 | Article, BreadcrumbList, FAQPage | OK |

## Checks performed

**Deal pages (5 newest LIVE):**
- Offer price equals the DB price, and that `₹price` is visible on the page.
- Currency is `INR`.
- `priceValidUntil` is present and in the future.
- Availability is a valid schema.org value.
- Seller and image are present.

**FAQPage (deals and posts):**
- Every question and the first 60 characters of every answer appear in the visible page text.
- Deal pages have 4–5 Q&As; posts have 5.

**Posts (3 newest):**
- Article has `headline`, `datePublished`, `image` and `author`.

**All non-hub pages:**
- A BreadcrumbList is present.

## CEO audit

| Check | Result |
|---|---|
| Audit counts | `{posts:0,cov:0,seo:0,np:0,ni:0,pend:0,live:12378,max:12895}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12895, equal to DB max |
| Unpushed commits | 0 before this commit |
| Session crons | 6 running: DESIDIME, INDEXNOW, SCHEMA-AUDIT, SITEMON, SEO-AUDIT-FIX, CONTENT-SEO |

The audit counts are: posts today IST, coverless posts, posts without SEO fields, LIVE deals with no price, LIVE deals with no image, PENDING_REVIEW deals, LIVE deals, DB max id.

**Posts today = 0.** The IST day is only 4h40m old. The CONTENT-SEO cron was recreated at 04:01 and its first run is 06:09 IST.

**3 roster crons are still missing:** telegram-deal-monitor, deal-ingest IFS, and AI-OVERVIEW. The owner can say "restore all crons" to bring them back.
