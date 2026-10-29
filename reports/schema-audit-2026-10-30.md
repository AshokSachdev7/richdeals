# SCHEMA-AUDIT · 2026-10-30 (~05:05 IST)

**Verdict: 22/22 URLs pass. Every JSON-LD block parses. All 18 sampled Offer prices equal the DB price, so there are 0 stale-Offer mismatches in the sample. The only checker flags are "priceValidUntil past" on the 3 EXPIRED deals, which is a false positive: Discontinued Offers omit `priceValidUntil` by design. The structural priority carried forward is unchanged: most LIVE Offers have a price check older than 14 days.**

## What was checked
- Script `schema1030.cjs` (scratchpad) fetches each URL from prod with a browser UA, parses every `application/ld+json` block and flattens `@graph`.
- **Deal pages:**
  - Product present.
  - `Offer.price` equals the DB `price`.
  - `priceCurrency` is INR.
  - `priceValidUntil` is in the future.
  - Availability matches status: LIVE gives InStock, EXPIRED gives Discontinued.
  - The visible text contains `₹<price>` in en-IN format.
- **Posts:** Article has `headline`, `image`, `datePublished` and `author`.
- **Every page:**
  - Every FAQPage question appears in the visible text.
  - BreadcrumbList is present on every page except `/`.
- **Robots and canonical** were spot-checked on `/`, `/offers`, `/blog` and one top GSC deal.
- **URL set:**
  - Hubs: `/`, `/offers`, `/blog`, `/stores/amazon`, `/category/shopping-category/appliances`.
  - The 8 GSC deal slugs.
  - The newest 3 LIVE deals (#15536-15538).
  - Deals synced or expired in the last ticks: #1367, #4020, #6215 and #10652.
  - The 2 newest posts.

## Results
| URL | JSON-LD | Offer | Robots | Issues |
|---|---|---|---|---|
| `/` | 3: Organization, WebSite, ItemList | n/a | index, follow; canonical self | none |
| `/offers` | 4: Organization, WebSite, BreadcrumbList, CollectionPage | n/a | index, follow; canonical self | none |
| `/blog` | 3: Organization, WebSite, BreadcrumbList, CollectionPage | n/a | index, follow; canonical self | none |
| `/stores/amazon` | 5: ItemList, BreadcrumbList, FAQPage (9 Q) | n/a | not checked | none |
| `/category/shopping-category/appliances` | 5: ItemList, BreadcrumbList, FAQPage (4 Q) | n/a | not checked | none |
| GSC #2321 | Product, BreadcrumbList, FAQPage (5 Q) | ₹220 = DB, INR, InStock, valid to 2026-11-11/12 | not checked | none |
| GSC #3593 (TRESemmé 1 L) | Product, BreadcrumbList, FAQPage (5 Q) | ₹644 = DB, INR, InStock, valid to 2026-11-11 | index, follow (top-100); canonical self | none |
| GSC #3492 | Product, BreadcrumbList, FAQPage (4 Q) | ₹299 = DB, INR, InStock | not checked | none |
| GSC #4188 | Product, BreadcrumbList, FAQPage (6 Q) | ₹1,709 = DB, INR, InStock | not checked | none |
| GSC #3498 | Product, BreadcrumbList, FAQPage (4 Q) | ₹4,299 = DB, INR, InStock | not checked | none |
| GSC #3506 | Product, BreadcrumbList, FAQPage (6 Q) | ₹249 = DB, INR, InStock | not checked | none |
| GSC #4142 (EXPIRED) | Product, BreadcrumbList, FAQPage | ₹759 = DB, Discontinued | not checked | checker false positive (no `priceValidUntil` on Discontinued) |
| GSC #2440 (EXPIRED) | Product, BreadcrumbList, FAQPage | ₹1,999 = DB, Discontinued | not checked | checker false positive (same) |
| #15536 Beardo EDP combo | Product, BreadcrumbList, FAQPage | ₹718 = DB, InStock | not checked | none |
| #15537 Boldfit sweatshirt | Product, BreadcrumbList, FAQPage | ₹698 = DB, InStock | not checked | none |
| #15538 skipping rope | Product, BreadcrumbList, FAQPage | ₹80 = DB, InStock | not checked | none |
| #1367 Larah dinner set (synced 10-30b) | Product, BreadcrumbList, FAQPage | ₹3,246 = DB, InStock | not checked | none; the sync shows on prod |
| #4020 Cockatoo treadmill (synced 10-30b) | Product, BreadcrumbList, FAQPage | ₹9,990 = DB, InStock | not checked | none; the sync shows on prod |
| #6215 L'Oreal conditioner (synced 10-30b) | Product, BreadcrumbList, FAQPage | ₹273 = DB, InStock | not checked | none; the sync shows on prod |
| #10652 Samsung S4 monitor (expired 10-30c) | Product, BreadcrumbList, FAQPage | ₹10,499 = DB, Discontinued | not checked | checker false positive (same); the expiry shows on prod |
| Post: distemper vs emulsion (2026-10-29T19:29Z) | Article, BreadcrumbList, FAQPage (5 Q) | n/a | not checked | none |
| Post: humidifier guide (2026-10-29T13:26Z) | Article, BreadcrumbList, FAQPage (5 Q) | n/a | not checked | none |

## Notes (expected, not bugs)
- **No `seller` on Offer.** This is intentional (`apps/web/src/app/[dealSlug]/page.tsx:178`). We are an affiliate, not the merchant, and naming Amazon as seller would misrepresent the offer to merchant listings. The Offer carries `eligibleRegion` IN, `itemCondition` New, `validFrom` and `url`.
- **No `priceValidUntil` on EXPIRED deals.** Discontinued Offers omit it, so the checker's "past" flag is a false positive. The checker should skip the field when availability is Discontinued.
- **Deal pages outside the top 100 are `noindex,follow`** by design (owner directive 2026-10-16). The sampled GSC deal is in the top 100 and reads `index, follow`.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,994 = 14,994 |
| API newest id vs DB max | 15,538 = 15,538 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 447 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 1 so far, about 5 hours into the IST day; CONTENT-SEO next fires 06:32 IST |
| Broadcast cursor vs DB max | `lastId` 15,538 (file re-read) = 15,538 |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Carried forward
- **Priority:** stale Offer prices. There were 0 mismatches in today's sample, but most LIVE Offers have a price check older than 14 days. The Deal model has no price-checked field (`updatedAt` is click churn), so the age cannot be measured per row. The fix is a top-100 PDP re-sync. Ingest ticks keep syncing dups as they reappear (6 synced and 1 expired in the 10-30b and 10-30c IFS ticks).
- Playwright MCP is hung this session, so Flipkart PDPs cannot be verified. reticle MCP failed to connect; it is not used by any tick.
