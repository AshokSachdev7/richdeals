# SCHEMA-AUDIT daily tick 2026-10-19 (11:15 IST)

**11 of 11 URLs pass. Every JSON-LD block parses and no issues were found. This is a report only; nothing was changed.**

## Method

Same script and checks as 10-18 (`apps/api/_schema1017.cjs`, scratch):
- **Deal pages:** Product + Offer; INR; Offer price = DB price = visible `₹` copy; `priceValidUntil` is in the future; availability; image; BreadcrumbList; FAQPage with every question and answer visible on the page.
- **Posts:** Article with headline, datePublished, image and author; BreadcrumbList; FAQPage questions visible.

## Hub pages

| URL | HTTP | JSON-LD types | Issues |
|---|---|---|---|
| `/` | 200 | Organization, WebSite, ItemList | none |
| `/offers` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |
| `/blog` | 200 | Organization, WebSite, BreadcrumbList, CollectionPage | none |

## 5 newest LIVE deal pages

| Slug | Offer price | Currency | priceValidUntil | Availability | Issues |
|---|---|---|---|---|---|
| `shocknshop-digital-sports-watch-black-dial-men-boys-b08x1hcvwf` | ₹199 | INR | 2026-11-02 | InStock | none |
| `philips-stellarbright-12w-led-bulb-b22-pack-of-2-b016w0zy8o` | ₹133 | INR | 2026-11-02 | InStock | none |
| `just-herbs-grooming-kit-for-men-scrub-body-wash-beard-oil-hair-cream-b0d9d3d64v` | ₹349 | INR | 2026-11-02 | InStock | none |
| `marks-and-spencer-women-linen-rich-checked-crop-top-b0d22f6h1b` | ₹359 | INR | 2026-11-02 | InStock | none |
| `amazon-basics-rj45-cat6-ethernet-lan-cable-3-feet-b0ckl2d74r` | ₹90 | INR | 2026-11-02 | InStock | none |

## 3 newest posts

| Slug | Types | Issues |
|---|---|---|
| `/blog/usb-c-vs-3-5mm-wired-earphones-which-to-buy-india` | Article, BreadcrumbList, FAQPage | none |
| `/blog/electric-vs-manual-standing-desk-how-to-choose-india` | Article, BreadcrumbList, FAQPage | none |
| `/blog/slim-vs-straight-vs-relaxed-fit-jeans-which-to-buy-india` | Article, BreadcrumbList, FAQPage | none |

## CEO audit (11:15 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-17: 4, 10-18: 4, 10-19: 1 so far. CONTENT-SEO runs left today. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,203 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13727, minutes old |
| DB max id / broadcast cursor | 13727 / 13716. The gap of 11 is the ingest batches from the last hour, which the external broadcast cron is working through. Not flagged. |
| Prod endpoints (7) | all 200, max 0.83 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 in CronList, the whole roster |

No rot found.
