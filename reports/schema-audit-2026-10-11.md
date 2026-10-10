# Schema audit 2026-10-11 (04:40 IST)

Report only, no fixes made. Checked 11 URLs on prod: 3 hubs, the 5 newest LIVE deals and the 3 newest posts. All 11 return 200, every JSON-LD block parses, and **0 issues found**.

| URL | JSON-LD types | Result |
|---|---|---|
| `/` | Organization, WebSite, ItemList | OK |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | OK |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | OK |
| `/amazon-basics-braided-micro-usb-cable-1-2m-3a-18w-b0ch1499x7` (₹86) | Product, BreadcrumbList, FAQPage | OK |
| `/head-shoulders-smooth-and-silky-anti-dandruff-shampoo-1-2l-34779834` (₹477) | Product, BreadcrumbList, FAQPage | OK |
| `/vrprime-rat-repellent-spray-for-cars-home-engine-bay-irphqqx63rekxsrf` (₹129) | Product, BreadcrumbList, FAQPage | OK |
| `/gadda-co-waterproof-cotton-feel-mattress-protector-king-size-78x72-inch-b09vl787wj` (₹499) | Product, BreadcrumbList, FAQPage | OK |
| `/halonix-2-in-1-all-rounder-9w-0-5w-b22d-led-bulb-b08r4dwm3n` (₹49) | Product, BreadcrumbList, FAQPage | OK |
| `/blog/jiotag-vs-airtag-item-tracker-android-iphone-india` | Article, BreadcrumbList, FAQPage | OK |
| `/blog/work-from-home-desk-setup-ergonomics-chair-monitor-height-india` | Article, BreadcrumbList, FAQPage | OK |
| `/blog/mesh-vs-leatherette-office-chair-which-is-better-india` | Article, BreadcrumbList, FAQPage | OK |

## What was checked
- **Product + Offer:**
  - Offer price equals the DB price, and the same `₹` figure appears in the visible page text.
  - `priceCurrency` is INR.
  - `priceValidUntil` is in the future (+14 days, e.g. 2026-10-24).
  - `availability` is InStock.
  - The Offer has a `url`, a `seller` (the store), a product name and an image.
- **BreadcrumbList:** positions are sequential from 1, every crumb has a name, and every crumb except the last has an item URL.
- **FAQPage:** every question and answer appears in the visible text.
  - Deal pages: the 4 template Q&As each.
  - Posts: 5 of 5 on each.
- **Article (posts):** `headline`, `datePublished`, `image` and `author` are all present, and the headline is 110 characters or fewer.

## CEO audit
- Posts: 1 today (IST). This is not a problem yet; later CONTENT-SEO ticks cover the 2-3 per day target. 0 coverless, 0 seo-less.
- Deals: 0 null price, 0 null image, 0 PENDING_REVIEW. 12,396 live.
- Broadcast: max id 12913 = cursor 12913.
- All 7 prod endpoints return 200. 0 unpushed commits before this report.
