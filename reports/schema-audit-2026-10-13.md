# SCHEMA-AUDIT 2026-10-13 (04:39 IST)

**11 of 11 URLs pass. 0 issues.** This tick only reports; nothing was changed.

**Method.** Each prod URL was fetched and every `application/ld+json` block was parsed, then checked as follows:

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
| `/bestwomen-flip-flop-slipper-for-women-b0db631jb5` | Product, BreadcrumbList, FAQPage | ₹99 INR, valid to 10-26, InStock | 5 | none |
| `/kook-n-keech-men-jogger-track-pants-40852650` | Product, BreadcrumbList, FAQPage | ₹200 INR, valid to 10-26, InStock | 4 | none |
| `/ibell-aerofry420dm-1500w-air-fryer-4-2l-afrhffmmgwuzzm7m` | Product, BreadcrumbList, FAQPage | ₹2,741 INR, valid to 10-26, InStock | 6 | none |
| `/kent-dash-600w-bagless-vacuum-cleaner-with-hepa-filter-b0fn46jgms` | Product, BreadcrumbList, FAQPage | ₹2,179 INR, valid to 10-26, InStock | 4 | none |
| `/story-home-cotton-window-curtain-5-feet-white-and-green-set-of-1-b0ff9y7z2h` | Product, BreadcrumbList, FAQPage | ₹299 INR, valid to 10-26, InStock | 5 | none |
| `/blog/induction-vs-infrared-cooktop-which-to-buy-india` | Article, BreadcrumbList, FAQPage | n/a | n/a | none |
| `/blog/soundbar-channels-2-1-vs-3-1-vs-5-1-explained-which-to-buy-india` | Article, BreadcrumbList, FAQPage | n/a | n/a | none |
| `/blog/60hz-vs-144hz-vs-240hz-monitor-refresh-rate-which-to-buy-india` | Article, BreadcrumbList, FAQPage, HowTo | n/a | n/a | none |

Every page also carries the site-wide Organization and WebSite blocks; for brevity they are listed only for the three hub pages.

The homepage has no BreadcrumbList, which is expected because it is the root page.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,443 |
| Broadcast cursor | 12960, equal to DB max 12960 |
| Prod endpoints (7) | all 200 in 0.14–0.49s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
