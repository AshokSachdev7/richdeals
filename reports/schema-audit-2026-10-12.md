# Schema audit 2026-10-12 (04:41 IST)

Report only, no fixes made. Checked 11 URLs on https://richdeals.in. **All 11 pass**, with 0 JSON-LD parse errors.

| URL | JSON-LD types | Result |
|---|---|---|
| `/` | Organization, WebSite, ItemList | OK |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | OK |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | OK |
| `/zebronics-juggle-wired-optical-usb-mouse-1200-dpi-black-b0cl77b51d` (₹129) | Product, BreadcrumbList, FAQPage | OK |
| `/milton-aspire-jr-set-of-3-insulated-serving-casseroles-350-720-1050-ml-blue-b0cqycjzr1` (₹449) | Product, BreadcrumbList, FAQPage | OK |
| `/maybelline-new-york-lasting-drama-gel-eyeliner-blackest-black-2-5g-b00k3u2dam` (₹251) | Product, BreadcrumbList, FAQPage | OK |
| `/tibra-collection-men-solid-cotton-blend-straight-kurta-maroon-ktagbrwhpnk48jxk` (₹259) | Product, BreadcrumbList, FAQPage | OK |
| `/realme-techlife-100-l-direct-cool-single-door-1-star-refrigerator-rfrhzj2ztd4sg3hg` (₹9,290) | Product, BreadcrumbList, FAQPage | OK |
| `/blog/instant-vs-storage-geyser-which-to-buy-india` | Article, BreadcrumbList, FAQPage | OK |
| `/blog/how-emergency-inverter-led-bulbs-work-backup-charging-india` | Article, BreadcrumbList, FAQPage | OK |
| `/blog/football-shoes-fg-vs-tf-vs-ag-studs-which-to-buy-india` | Article, BreadcrumbList, FAQPage | OK |

All URLs returned 200. Organization and WebSite also appear on every deal and post page; they are left out of those rows above.

## What was checked

- **Product + Offer:**
  - The Offer price equals the DB price, and the same price appears as ₹ in the visible text.
  - The currency is INR.
  - `priceValidUntil` is in the future (+14 days).
  - Availability is InStock.
  - The Offer has a url and a seller, and the Product has a name and an image.
- **BreadcrumbList:** positions run in order from 1, every entry has a name, and every entry except the last has an item URL.
- **FAQPage:** every question and answer appears in the visible page text (4 Q&As on each deal page).
- **Article:** has a headline of 110 characters or fewer, `datePublished`, an image and an author.

The 5 deals are the 5 newest LIVE rows and the 3 posts are the 3 newest, all taken from the DB.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,416 (no change) |
| Broadcast cursor | 12933, equal to DB max 12933 |
| Prod endpoints (7) | all 200 in 0.09–1.20s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
