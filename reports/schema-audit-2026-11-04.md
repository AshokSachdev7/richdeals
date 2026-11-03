# SCHEMA-AUDIT 2026-11-04 (~10:20 IST)

**Result: 39 URLs checked, all HTTP 200. 31 pass, 8 fail. All 8 failures are the same stale Flipkart top-100 Offer prices carried over from 11-03b, and 2 of those rows have no price history at all. The Offer has no `seller` node on purpose (see `[dealSlug]/page.tsx:178`); CLAUDE.md is out of date on this point, so it is not a code bug.**

## What was checked

- **Method:** fetched each URL and parsed every `<script type="application/ld+json">` block. Each Offer was compared against the DB row and its newest `priceHistory` row (`schema1104.cjs`, scratchpad, deleted after the run).
- **Product/Offer:**
  - price equals the visible price and the DB price
  - `priceCurrency` is INR
  - `priceValidUntil` is in the future
  - `availability` is InStock, or Discontinued when the deal is EXPIRED
- **BreadcrumbList:** present on every page.
- **FAQPage:** every schema question also appears in the visible FAQ section.
- **Article (posts):** has headline, image, datePublished and author.

## Results

| Group | URLs | Result |
|---|---|---|
| Hubs: `/`, `/offers`, `/blog`, `/stores/amazon` (FAQ 9Q), `/category/shopping-category/appliances` (FAQ 4Q) | 5 | 5 PASS |
| GSC top deals: #2321, #3593, #3492, #4188, #3498, #3506 (LIVE, last price 3-6d old); #4142, #2440 (EXPIRED, Discontinued, no validUntil, correct) | 8 | 8 PASS |
| Newest deals #16139-16146 (InStock, until 11-17, price 0d old) | 8 | 8 PASS |
| Rows synced in 11-04b/c: #1542 ₹44,999, #5542 ₹11,106, #9147 ₹224, #9419 ₹299, #9529 ₹323, #15039 ₹699 | 6 | 6 PASS |
| Stale Flipkart top-100 rows | 8 | **8 FAIL** |
| Newest posts (Article + FAQ; 2 also have HowTo) | 4 | 4 PASS |
| **Total** | **39** | **31 PASS / 8 FAIL** |

Posts checked: `best-body-lotion-for-dry-skin-winter-india` (FAQ 5Q + HowTo), `fire-tv-stick-remote-not-working-fix-reset-replace-india` (FAQ 4Q), `geyser-size-guide-litres-by-family-bathroom-india` (FAQ 5Q + HowTo), `how-to-make-perfume-last-longer-india-humid-weather` (FAQ 5Q).

## PRIORITY: stale Offer prices

All 8 rows are LIVE and InStock, and the Offer price equals the DB price. Because the newest price point is more than 14 days old, `dealPriceCheck()` drops `priceValidUntil`. The schema logic is working as intended; the problem is that the prices have not been re-checked.

| id | Item | DB = Offer | Last price point | Age |
|---|---|---|---|---|
| #2279 | boAt Aavante 2.0 | ₹1,199 | **none (0 priceHistory rows)** | created 07-23, 104d |
| #2483 | RR Vento fan | ₹699 | **none (0 priceHistory rows)** | created 07-23, 104d |
| #3663 | Nova NHT-1039 | ₹599 | 07-28 | 98d |
| #3881 | Nova NHT-1052 | ₹699 | 07-29 | 97d |
| #4171 | Wild Stone Edge | ₹351 | 07-31 | 95d |
| #4172 | Lava Virat V1 5G | ₹11,999 | 07-31 | 95d |
| #4430 | Van Heusen watch | ₹710 | 08-02 | 93d |
| #6409 | The Man Company set | ₹268 | 08-15 | 80d |

- **Correction to 11-03b:** that report listed 07-23 price points for #2279 and #2483. The DB has no priceHistory row for either deal; 07-23 is their `createdAt`.
- **Fix path:** Flipkart PDPs need the Playwright tab (curl gets reCAPTCHA). Read the ld+json price for each row, then `prisma.update` the price and add a priceHistory row, or delist to EXPIRED if the product is dead. This needs the browser, so it goes to the next IFS/SEO-AUDIT-FIX tick.

## Doc drift (not a bug)

- The Offer keys are: `@type`, `priceCurrency`, `eligibleRegion`, `price`, `priceValidUntil` (only when the price is fresh), `validFrom`, `itemCondition`, `availability` and `url`. There is no `seller`.
- `apps/web/src/app/[dealSlug]/page.tsx:178-179` omits it on purpose: *"we're an affiliate, not the merchant — naming Amazon as seller on our page reads as a misrepresented offer to merchant listings."*
- CLAUDE.md still says "seller = store". The doc is wrong, not the code. Do **not** add `seller`. Fix the CLAUDE.md line the next time the docs are touched.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,589 / 15,589 | equal |
| DB max id | 16,146 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok |
| Posts per day (IST) | 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 is under the rule; CONTENT-SEO (`210ebce0`) at 06:32 IST must ship 1-2 more |
| Broadcast cursor | lastId 16,146 vs max 16,146 (file re-read) | drained |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **8 stale Flipkart top-100 prices** (table above). #2279 and #2483 have never had a price point.
- **11-04 needs 1-2 more posts.** The 06:32 IST CONTENT-SEO run must ship them.
- **CLAUDE.md "seller = store" line** is out of date (doc only).
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** JioMart #37 (delist candidate), #1665 and #1656 (no ld+json price), #6405 and #6426 (manual check), #15976 (MRP ambiguous), #7820 and #14840 (NULL, no add-to-cart), #14396 (null MRP).
- **#2913's description still mentions the HDFC EMI offer.** Not re-verified.
- **Reticle is CONNECTION_CLOSED.** Not needed while Playwright works.
- **The DO token needs rotating.** Owner's job.
