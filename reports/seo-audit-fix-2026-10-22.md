# SEO-AUDIT-FIX — 2026-10-22 (05:28 → 06:20 IST)

**2 on-page defects found and fixed. Deployed (`f443a0db` ACTIVE). IndexNow HTTP 200 for 9 URLs.**

## Audit (15 prod URLs, every page type)

The script checked title length, meta description length (target 120–165), self-canonical, h1 count, image alt text, JSON-LD parse, `og:image` and duplicate titles.

| Type | URL | Title | Desc | h1 | Robots | JSON-LD |
|---|---|---|---|---|---|---|
| home | `/` | 51 | 153 | 1 | index | Organization, WebSite, ItemList |
| hub | `/offers` | 56 | 158 | 1 | index | + BreadcrumbList, CollectionPage |
| hub | `/blog` | 50 | 154 | 1 | index | + BreadcrumbList, CollectionPage |
| hub | `/freebies` | 63 | 157 | 1 | index | + BreadcrumbList, ItemList, FAQPage |
| hub | `/coupons` | 61 | 157 | 1 | index | + BreadcrumbList, ItemList, FAQPage |
| hub | `/stores` | 40 | 162 | 1 | index | + BreadcrumbList, ItemList |
| hub | `/categories` | 45 | 161 | 1 | index | + BreadcrumbList, ItemList |
| store | `/stores/amazon` | 58 | 157 | 1 | index | + ItemList, BreadcrumbList, FAQPage |
| store | `/stores/flipkart` | 60 | 152 | 1 | index | + ItemList, BreadcrumbList, FAQPage |
| category | `/category/shopping-category/electronics` | 47 | 155 | 1 | index | + ItemList, BreadcrumbList, FAQPage |
| deal | carrot flashlight ₹221 | 48 (was clause stub) | 153 | 1 | noindex | Product, BreadcrumbList, FAQPage |
| deal | Cortina sofa cover ₹199 | 55 | 157 | 1 | noindex | Product, BreadcrumbList, FAQPage |
| deal | Steellock containers ₹253 | 51 | 157 | 1 | noindex | Product, BreadcrumbList, FAQPage |
| post | USB vs XLR vs wireless mic | 49 (was 61) | 150 | 1 | index | Article, BreadcrumbList, FAQPage |
| post | Thermal wear cotton vs wool vs fleece | 52 (was 64) | 153 | 1 | index | Article, BreadcrumbList, FAQPage |

Every URL returned 200, had a self-canonical, and had exactly one h1. Every JSON-LD block parsed and there were no duplicate titles. The numbers in the table are post-deploy.

## Fixes shipped (commit d6463cb)

1. **Deal titles ending on a clause stub.** `dealSeoTitle()` in `apps/web/src/lib/site.ts` cut the product name at 48 characters on a word boundary. That could leave a comma fragment such as "…Toy for Kids, 24" (from "24 Slides"). The cut now ends at the last comma clause when that comma sits at position ≥24. Result: "Carrot Projection Flashlight Toy for Kids @ ₹221". Checked with an assert script on three real titles, all ≤60 characters.
2. **Post `<title>` over 60 characters.** In `apps/web/src/app/blog/[slug]/page.tsx`, the " | RichDeals" suffix is now dropped once the meta title is over 48 characters; it was 53. That brings the two flagged posts down from 61 and 64 to 49 and 52. The brand still appears in `og:site_name`.

## Left as is (deliberate)

- **`/freebies` (63) and `/coupons` (61) titles.** Google truncates by pixel width, and the keyword-bearing head of both titles fits. Same call as 10-21.
- **`alt=""` on `/logo-mark.svg` and store logos.** These images are decorative and sit next to text, so an empty alt is correct.
- **`noindex,follow` on new deals.** `dealIndexable()` indexes only the top 100 deals by clicks, per the owner directive of 2026-10-16.

## Deploy + freshness

- Pushed d6463cb, killed the :4000 listener, and ran `doctl apps create-deployment … --force-rebuild`. Deployment `f443a0db` went BUILDING → DEPLOYING → ACTIVE.
- The local API was restarted and is listening on :4000 (pid 16372).
- The audit was re-run on prod after the deploy and both fixes are live.
- IndexNow (`--paths`): `/`, 3 deal pages, 3 post pages, `/blog` and `/sitemap.xml`. Result: **HTTP 200 for 9 URLs**.

## CEO audit

- **Prod:** 12/12 endpoints returned 200 at SITEMON 10-22g (06:02).
- **Deals:** 13,536 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14065 and the broadcast cursor is also 14065.
- **Posts (IST 2026-10-22):** 1 so far, with 0 coverless and 0 seoless. CONTENT-SEO runs at 06:39 and must bring the day to at least 2.
- **Unpushed commits:** 0 before this report. Crons: 9/9.
- **Unresolved:** Deal Dibba has been missing from the TG sidebar for 8 ticks. The chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. The DO API token has still not been rotated; the owner needs to do this.
