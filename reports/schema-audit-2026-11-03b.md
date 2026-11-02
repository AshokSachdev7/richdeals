# SCHEMA-AUDIT 2026-11-03b (04:56 IST)

**Result: I checked 37 URLs and all returned HTTP 200. 29 pass. The other 8 fail, and they are the same 8 as in 11-03a. PRIORITY: the 8 stale Flipkart top-100 Offer prices. Their pages correctly drop `priceValidUntil`, but each price is 79 to 103 days old.**

## What was checked

The script is `schema1103b.cjs`. It is the 11-03 script with #15898 and #13308 added to the synced set. Per URL, it parsed every `application/ld+json` block and checked the following.

- **Deals**
  - Product + Offer price equals the DB price (a mismatch means a STALE Offer).
  - Currency is INR and `₹price` appears in the visible text.
  - `priceValidUntil` is in the future, or absent when the deal is expired.
  - Availability is InStock for LIVE deals and Discontinued for EXPIRED ones.
  - The FAQPage questions appear in visible copy.
  - BreadcrumbList is present.
- **Posts:** the Article has headline, image, datePublished and author, and the FAQ is visible.
- **Hubs:** Organization/WebSite is present, plus ItemList, CollectionPage or FAQPage per template.

## Results

| Group | URLs | Result |
|---|---|---|
| Hubs: `/`, `/offers`, `/blog`, `/stores/amazon` (FAQ 9Q), category appliances (FAQ 4Q) | 5 | PASS |
| GSC deals #2321, #3593, #3492, #4188, #3498, #3506 | 6 | PASS: InStock, valid until 11-11 to 11-14 |
| GSC deals #4142, #2440 (EXPIRED) | 2 | PASS: Discontinued |
| Newest #15976–#15979 | 4 | PASS: valid until 11-16 |
| Synced #5192, #7760, #13308 (₹169, desidime 11-03b), #15863, #15914 | 5 | PASS: Offer = DB |
| Synced #15894, #15895, #15898 (EXPIRED) | 3 | PASS: Discontinued |
| Posts: geyser size guide (Article, FAQPage and HowTo), perfume, period panties, ukulele | 4 | PASS |
| Stale Flipkart top-100 (list below) | 8 | FAIL: no `priceValidUntil` |

**No Offer/DB price mismatch on any URL.** Every Offer price equals the DB price and is visible on the page. The fixes from the earlier ticks are live on prod:
- #13308 shows the synced price of ₹169.
- #15898 HP 905, expired in IFS 11-03b, now shows Discontinued.

## PRIORITY: stale Offer prices

`dealPriceCheck()` (`apps/web/src/lib/site.ts`) marks a price stale when the newest PriceHistory row is more than 14 days old. For a stale price the page drops `priceValidUntil` rather than inventing a date. The schema behaviour is correct; the rot is the price age.

| id | Store | DB = Offer | Last price point | Age |
|---|---|---|---|---|
| 2279 | flipkart | ₹1,199 | 2026-07-23 | 103d |
| 2483 | flipkart | ₹699 | 2026-07-23 | 102d |
| 3663 | flipkart | ₹599 | 2026-07-28 | 98d |
| 3881 | flipkart | ₹699 | 2026-07-29 | 96d |
| 4171 | flipkart | ₹351 | 2026-07-31 | 94d |
| 4172 | flipkart | ₹11,999 | 2026-07-31 | 94d |
| 4430 | flipkart | ₹710 | 2026-08-02 | 92d |
| 6409 | flipkart | ₹268 | 2026-08-15 | 79d |

Fixing these needs a Flipkart PDP read. Curl gets a 403 reCAPTCHA, and the Playwright MCP is hung. The next session with a working browser should re-verify all 8, then either add a PriceHistory row or expire each one.

## Minor finding (not blocking)

The Offer `seller` read `undefined` on every deal. This tick's script read `offer.seller.name`; I did not dump the raw `seller` node, so it is not yet known whether `seller` is missing or shaped differently. CLAUDE.md says the seller is the store. It is optional for Product rich results, so this is low priority. Next tick: print the raw `seller` node on one deal page to confirm.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | all 200 | ok |
| DB LIVE / max id | 15,420 / 15,979 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 458 / 0 / 0 | ok |
| Posts per day (IST) | 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:3 | 11-02 missed (past day) |
| Broadcast cursor | 15,979 vs max 15,979 | caught up |
| Unpushed commits | 0 | ok |

## Still open

- 8 stale Flipkart prices (above). Blocked on the browser.
- The Playwright MCP is hung and reticle is down.
- Single-deal checks still pending:
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
- The DO token needs rotating. That is the owner's job.
