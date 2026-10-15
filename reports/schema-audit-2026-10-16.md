# SCHEMA-AUDIT 2026-10-16 (04:45 IST)

**11 of 11 URLs pass. 0 issues.** This tick only reports; nothing was changed.

**Method.** Same script as 10-15 (`_schema1014.mjs`). Each prod URL was fetched and every `application/ld+json` block was parsed (including `@graph` items), then checked:

- **Product / Offer:** INR currency; `priceValidUntil` set and in the future; availability is a schema.org value; the Offer price appears as visible `₹` text on the page.
- **BreadcrumbList:** positions run 1..n, every entry has a name, every entry except the last has an item.
- **FAQPage:** every question, and the first 60 characters of every answer, appear in the visible page text (deals and posts).
- **Article:** has `headline`, `datePublished`, `image` and `author`.

## Results

| URL | Types found | Offer | FAQ Q&As | Issues |
|---|---|---|---|---|
| `/` | Organization, WebSite, ItemList | n/a | n/a | none |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | n/a | n/a | none |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | n/a | n/a | none |
| `/dove-intense-repair-shampoo-1-litre-b07h9sv624` | Product, BreadcrumbList, FAQPage | ₹449 INR, valid to 10-29, InStock | 5 | none |
| `/solimo-double-microfiber-quilt-120-gsm-lavender-meadow-b0d73st9mw` | Product, BreadcrumbList, FAQPage | ₹375 INR, valid to 10-29, InStock | 4 | none |
| `/aquieen-quince-health-faucet-set-with-1m-ss304-shower-tube-and-hook-b01n7ng360` | Product, BreadcrumbList, FAQPage | ₹388 INR, valid to 10-29, InStock | 4 | none |
| `/aquieen-kubix-health-faucet-set-with-1m-ss304-shower-tube-and-hook-b08ptk2p18` | Product, BreadcrumbList, FAQPage | ₹342 INR, valid to 10-29, InStock | 4 | none |
| `/theskinmantra-11-6-inch-laptop-sleeve-with-chain-handle-red-lips-b01ibb9mvc` | Product, BreadcrumbList, FAQPage | ₹98 INR, valid to 10-29, InStock | 6 | none |
| `/blog/wireless-android-auto-carplay-adapter-worth-it-india` | Article, BreadcrumbList, FAQPage | n/a | 5 | none |
| `/blog/how-to-choose-dustbin-for-home-size-lid-type-garbage-bag-fit-india` | Article, BreadcrumbList, FAQPage | n/a | 5 | none |
| `/blog/how-to-choose-usb-c-charging-cable-60w-100w-240w-india` | Article, BreadcrumbList, FAQPage | n/a | 5 | none |

Every page also carries the site-wide Organization and WebSite blocks. The homepage has no BreadcrumbList, which is expected for the root page.

**Note:** `/api/posts` ignores `?limit=` and returns every post (408 rows). The script slices to the 3 newest itself. Harmless for this audit, but noted.

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 1 (CONTENT-SEO cron runs at :09 every 6h) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,609 / 13126 (newest 11 min old) |
| Broadcast cursor | 13126 = DB max |
| Prod endpoints (7) | all 200 in 0.10–0.55s |
| Session crons | 9 of 9 running, matches roster |
| Unpushed commits | 0 before this report |
