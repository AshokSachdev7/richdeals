# SCHEMA-AUDIT 2026-11-03 (08:48 IST)

**Result: I checked 35 URLs and all returned HTTP 200. 27 pass outright: 26 passed the first run and #587 passed a recheck. The other 8 fail with no `priceValidUntil`. That is the designed stale-price behaviour, not a schema bug, but it means 8 top-100 Flipkart pages carry prices that are 79–103 days old.**

## What was checked

Per URL, I parsed every `application/ld+json` block and checked the following.

- **Deals**
  - Product + Offer price matches the DB price.
  - Currency is INR and the price is visible on the page.
  - `priceValidUntil` is in the future, or absent when the deal is expired.
  - Availability is InStock for live deals and Discontinued for expired ones.
  - The FAQPage Q&As appear as visible copy.
  - BreadcrumbList is present.
- **Posts:** the Article has headline, image, datePublished and author.
- **Hubs:** Organization/WebSite is present, plus FAQPage where the template has one.

## Results

| Group | URLs | Result |
|---|---|---|
| Hubs: `/`, `/offers`, `/blog`, `/stores/amazon` (FAQ 9Q), category appliances | 5 | PASS |
| GSC deals #2321, #3593, #3492, #4188, #3498, #3506 | 6 | PASS: InStock, valid until 11-11 to 11-14 |
| GSC deals #4142, #2440 (EXPIRED) | 2 | PASS: Discontinued, no `priceValidUntil` |
| Newest #15974–#15977 | 4 | PASS: valid until 11-16 |
| Price-synced #5192 Havells (₹7,190), #7760, #15863, #15914 | 4 | PASS |
| Price-synced #15894, #15895 (EXPIRED) | 2 | PASS: Discontinued |
| Posts #585 period panties, #586 perfume, ukulele | 3 | PASS |
| Post #587 geyser size guide | 1 | PASS on recheck (see below) |
| Stale Flipkart top-100 (list below) | 8 | FAIL: no `priceValidUntil` |

### #587 Article image

The first run read the Article with no `image`. The DB `post.cover` is set, and `/api/posts/<slug>` returns `coverImage`. A fresh fetch now shows `image: [og/geyser-size-guide-...png]` along with Organization, WebSite, Article, BreadcrumbList, FAQPage and HowTo, all of which parse.

The first fetch most likely hit the post data cached from before `gen-blog-covers.mjs` set the cover. The problem cleared itself, so no fix was needed.

### Stale-price Offers (by design, but rot)

`dealPriceCheck()` (`apps/web/src/lib/site.ts`) marks a price stale when the newest PriceHistory row, or `createdAt` if there is none, is more than 14 days old. For a stale price the page drops `priceValidUntil` rather than inventing a future date. That behaviour is correct.

The real issue is the price age. A stale Offer price risks a merchant-listing demotion.

| id | Store | DB price | Last price point | Age |
|---|---|---|---|---|
| 2279 | flipkart | ₹1,199 | 2026-07-23 | 103d |
| 2483 | flipkart | ₹699 | 2026-07-23 | 102d |
| 3663 | flipkart | ₹599 | 2026-07-28 | 98d |
| 3881 | flipkart | ₹699 | 2026-07-29 | 96d |
| 4171 | flipkart | ₹351 | 2026-07-31 | 94d |
| 4172 | flipkart | ₹11,999 | 2026-07-31 | 94d |
| 4430 | flipkart | ₹710 | 2026-08-02 | 92d |
| 6409 | flipkart | ₹268 | 2026-08-15 | 79d |

Fixing these needs a Flipkart PDP read. Curl gets a 403 reCAPTCHA, and the Playwright MCP is hung, so the fix is blocked until the browser is back. The next session with a working browser should re-verify all 8, then add a PriceHistory row or expire each one.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | all 200 | ok |
| DB LIVE / prod API total | 15,419 / 15,419 | equal |
| DB max id | 15,977 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 458 / 0 / 0 | ok |
| Posts per day (IST) | 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:3 | 11-02 missed (past day) |
| Broadcast cursor | 15,960 vs max 15,977 | draining |
| Unpushed commits | 0 | ok |

## Still open

- **8 stale Flipkart top-100 prices** (above). Fixing them is blocked on the browser.
- **The Playwright MCP is hung and reticle is down.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart verification is blocked.
- **Single-deal checks still pending:**
  - #15898 needs a price read.
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
- **11-02 IST shipped 0 posts.** That day is past and cannot be backfilled.
- **The DO token needs rotating.** That is the owner's job.
