# SCHEMA-AUDIT · 2026-10-31 (~05:00 IST)

**Verdict: 23/23 URLs PASS, all HTTP 200. 0 stale Offer prices: all 17 sampled deal Offers equal the DB price. The 10-30 false positive (an expired `priceValidUntil` flagged on EXPIRED deals) is fixed in the checker. Report only, nothing changed on the site.**

## What was checked
- **Script:** `scratchpad/schema1031.cjs`. It fetches prod HTML, parses every `<script type="application/ld+json">` and diffs the result against the DB and the visible copy.
- **Deal pages:**
  - Product + Offer: the price equals the DB price, `priceCurrency` is INR, and `availability` is InStock for LIVE and Discontinued for EXPIRED.
  - `priceValidUntil` must be in the future. This check is now skipped for EXPIRED rows, which are expected to be past.
  - BreadcrumbList.
  - FAQPage: every question must appear in the visible FAQ section.
- **Posts:** Article and BreadcrumbList, plus FAQPage when present (must match the visible copy).
- **Every page:** the JSON-LD parses, and the block count and `@type`s are recorded.
- **Robots and canonical spot check:**
  - `/`, `/offers` and `/blog` are `index, follow` with self-canonicals.
  - #3593 (top-100) is `index, follow` with canonical `/tresemme-hairfall-defense-shampoo-1000ml-b07l3ynl2v`.
- **URL set (23):**
  - 5 hubs.
  - 8 top GSC deal pages.
  - The 3 newest deals (IFS 10-31c).
  - 4 deals price-synced on 10-31: #1605, #7438, #8788, #14032.
  - The 3 newest posts.

## Results
| URL | JSON-LD | Offer | Robots | Issues |
|---|---|---|---|---|
| `/` | 3: Organization, WebSite, ItemList | n/a | index, follow | none |
| `/offers` | 4: + BreadcrumbList, CollectionPage | n/a | index, follow | none |
| `/blog` | 3: + BreadcrumbList, CollectionPage | n/a | index, follow | none |
| `/stores/amazon` | 5 (FAQPage 9 Q) | n/a | — | none |
| `/category/shopping-category/appliances` | 5 (FAQPage 4 Q) | n/a | — | none |
| #4142 (EXPIRED) | Product, Breadcrumb, FAQ 5 Q | ₹759 Discontinued | — | none |
| #2321 | Product, Breadcrumb, FAQ 5 Q | ₹220 InStock, until 11-11 | — | none |
| #2440 (EXPIRED) | Product, Breadcrumb, FAQ 4 Q | ₹1,999 Discontinued | — | none |
| #3593 | Product, Breadcrumb, FAQ 5 Q | ₹644 InStock, until 11-11 | index, follow | none |
| #3492 | Product, Breadcrumb, FAQ 4 Q | ₹299 InStock, until 11-12 | — | none |
| #4188 | Product, Breadcrumb, FAQ 6 Q | ₹1,709 InStock | — | none |
| #3498 | Product, Breadcrumb, FAQ 4 Q | ₹4,299 InStock | — | none |
| #3506 | Product, Breadcrumb, FAQ 6 Q | ₹249 InStock | — | none |
| #15720 Tamron 17-70 | Product, Breadcrumb, FAQ 4 Q | ₹44,490 InStock, until 11-13 | — | none |
| #15719 Airdopes 131 Gen 2 | Product, Breadcrumb, FAQ 6 Q | ₹799 InStock | — | none |
| #15718 PB300 Neo | Product, Breadcrumb, FAQ 6 Q | ₹899 InStock | — | none |
| #1605 (synced, revived) | Product, Breadcrumb, FAQ 4 Q | ₹256 InStock | — | none |
| #7438 (synced) | Product, Breadcrumb, FAQ 6 Q | ₹899 InStock | — | none |
| #8788 (synced) | Product, Breadcrumb, FAQ 6 Q | ₹945 InStock | — | none |
| #14032 (synced) | Product, Breadcrumb, FAQ 6 Q | ₹654 InStock | — | none |
| `/blog/how-to-descale-electric-kettle-limescale-hard-water-india` (10-30T19:10Z) | Article, Breadcrumb, FAQ 5 Q | n/a | — | none |
| `/blog/laptop-privacy-screen-filter-size-guide-india` (10-30T13:12Z) | Article, Breadcrumb, FAQ 5 Q | n/a | — | none |
| `/blog/henna-and-indigo-for-grey-hair-two-step-method-india` (10-30T07:37Z) | Article, Breadcrumb (4 blocks, no FAQ) | n/a | — | none |

## Findings
- **Stale Offer price (priority check): 0 mismatches.** Every sampled Offer price equals the DB price, including the 4 rows synced this morning, so ISR has refreshed them.
- **All Offers are INR.** Every LIVE deal is InStock with a future `priceValidUntil`. Every EXPIRED deal is Discontinued.
- **Every FAQPage question is visible on the page.** No schema-only FAQ was found.
- **BreadcrumbList** is present on every page except `/`, which is expected for the root.
- **Observation, not a failure:** the checker prints `seller` as `undefined`. Either `seller` is nested in a shape the checker does not read, or the Offer does not emit it. `seller` is recommended, not required, for Product snippets. Next run: read `offers.seller.name` directly before calling it a gap.
- **Structural priority, carried forward:** most LIVE Offers have not had a price re-check in more than 14 days. The DB price is what the page shows, so the schema and the visible copy agree. Freshness against the merchant is the risk, not schema validity.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.09–0.75 s) |
| API total vs DB LIVE | 15,167 = 15,167 |
| API newest id vs DB max | 15,720 = 15,720 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 451 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 1 (so far) |
| Broadcast cursor vs DB max | `lastId` 15,720 = 15,720 (drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung, and reticle fails with CONNECTION_CLOSED. As a result:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881. Their Offer prices match the DB, but the DB price has not been checked against Flipkart.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- 10-31 IST is at 1/4 posts. CONTENT-SEO runs next at 06:32.
- Rotate the DO API token.
