# SCHEMA-AUDIT 2026-10-14 (23:45 IST)

**11 of 11 URLs pass. 0 issues.** This tick only reports; nothing was changed.

**Method.** Each prod URL was fetched and every `application/ld+json` block was parsed (including `@graph` items), then checked as follows:

- **Product / Offer:** INR currency; `priceValidUntil` is set and in the future; availability is a schema.org value; the Offer price appears as visible `₹` text on the page.
- **BreadcrumbList:** positions run 1..n, every entry has a name, and every entry except the last has an item.
- **FAQPage:** every question, and the first 60 characters of every answer, appear in the visible page text.
- **Article:** has `headline`, `datePublished`, `image` and `author`.

## Results

| URL | Types found | Offer | FAQ Q&As | Issues |
|---|---|---|---|---|
| `/` | Organization, WebSite, ItemList | n/a | n/a | none |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | n/a | n/a | none |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | n/a | n/a | none |
| `/ambrane-raap-m20-20w-type-c-pd-fast-charger-b0dqy9djf7` | Product, BreadcrumbList, FAQPage | ₹299 INR, valid to 10-28, InStock | 4 | none |
| `/asus-pad-12-2-inch-oled-8gb-128gb-wifi-tabhpagf5th5pz2v` | Product, BreadcrumbList, FAQPage | ₹35,990 INR, valid to 10-28, InStock | 6 | none |
| `/lenovo-idea-tab-plus-6gb-128gb-12-1-inch-wifi-tabhqkcsbpgfhghh` | Product, BreadcrumbList, FAQPage | ₹26,999 INR, valid to 10-28, InStock | 6 | none |
| `/bosch-pro-1000w-mixer-grinder-mixhgpumugfecgnm` | Product, BreadcrumbList, FAQPage | ₹2,999 INR, valid to 10-28, InStock | 6 | none |
| `/portronics-20w-pd-wall-charger-type-c-accfzz4nhtuvwuzg` | Product, BreadcrumbList, FAQPage | ₹199 INR, valid to 10-28, InStock | 6 | none |
| `/blog/what-is-tds-in-water-how-to-check-at-home-india` | Article, BreadcrumbList, FAQPage, HowTo | n/a | 5 | none |
| `/blog/semi-automatic-vs-top-load-vs-front-load-washing-machine-which-to-buy-india` | Article, BreadcrumbList, FAQPage | n/a | 5 | none |
| `/blog/how-smart-door-locks-work-battery-wifi-fingerprint-india` | Article, BreadcrumbList, FAQPage | n/a | 5 | none |

Every page also carries the site-wide Organization and WebSite blocks; for brevity they are listed only for the three hub pages.

The homepage has no BreadcrumbList, which is expected because it is the root page.

The 5 newest LIVE deals are the same set as the 10-13 INDEXNOW batch, because no new deal has landed since 10-13 22:47 IST (see the CEO audit).

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-14) | 2 (cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,467 |
| **Newest deal** | **2026-10-13 22:47 IST, 25 hours old.** Deal intake has stalled. |
| Broadcast cursor | 12984, equal to DB max 12984 |
| Prod endpoints (7) | all 200 in 0.13–0.77s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
