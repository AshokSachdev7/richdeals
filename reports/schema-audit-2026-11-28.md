# SCHEMA-AUDIT tick: 2026-11-28 (about 04:30–04:40 IST)

This was a report-only tick, per claude-seo:seo-schema.

**33 URLs were fetched, and all returned 200:**

- 4 hubs: `/`, `/offers`, `/blog`, `/stores/amazon`.
- The 4 GSC top deal pages.
- 11 edge and watch rows: freshness edges, expired rows, the LG pricing-error watch, and today's reprices.
- The 11 newest deals.
- The 3 newest posts.

Every ld+json block was parsed. The checks were:

- **Product/Offer:** the price equals the DB row, the visible ₹ copy is present, the currency is INR, `priceValidUntil` is present and not past (expired rows are exempt), availability is InStock, Discontinued or OutOfStock, and an image is present.
- **FAQPage:** every question, and the first 40 characters of every answer, are in the visible text.
- **BreadcrumbList:** present, with an absolute URL on every item except the last.
- **Article:** has a headline of 110 characters or fewer, datePublished, image and author.

**Result:** 32 of the 33 URLs have no issues. **No stale Offer price was found.** Every audited Offer matches both its DB row and the visible ₹ copy, including the two rows repriced today: Boldfit #17504 at ₹481 and Solimo #17209 at ₹841.

The one schema issue is #16177, which has had no `priceValidUntil` since 11-19. It is unchanged from 11-25.

The priority is still site-wide Offer freshness. 93.0% of LIVE deals serve no `priceValidUntil`.

## Deal pages

Every deal page ships Organization, WebSite, Product, BreadcrumbList and FAQPage. Every currency is INR. Every FAQ shows all 4 Q&As in the visible text. Every BreadcrumbList is OK.

| Deal | Status | Offer = DB | priceValidUntil | Availability | Issue |
|---|---|---|---|---|---|
| #2321 handmade soap (GSC top) | LIVE | ₹289 | 2026-12-07 | InStock | none |
| #3492 Aadhik gas saver (GSC top) | LIVE | ₹216 | 2026-12-07 | InStock | none |
| #3506 Amazon Basics phone stand (GSC top) | LIVE | ₹249 | 2026-12-07 | InStock | none |
| #4188 Bluemix mixer grinder (GSC top) | LIVE | ₹1,697 | 2026-12-07 | InStock | none |
| **#3593 TRESemmé 1 L** | LIVE | ₹617 | **2026-11-28 (today)** | InStock | Drops off tomorrow. Newest price check is ₹617 on 11-14 |
| **#16177 Philips GC1905/21 iron** | LIVE | ₹1,197 | **missing** | InStock | Newest price check is ₹1,197 on 11-05, 23 days ago |
| #12963 Himalaya diapers | LIVE | ₹1,085 | 2026-12-01 | InStock | none; drops in 3 days |
| #4793 Havells air fryer | LIVE | ₹5,578 | 2026-12-08 | InStock | none |
| #17312 LG monitor (watch) | LIVE | ₹1,998 | 2026-12-08 | InStock | none in schema; pricing-error watch is still open |
| #4142 Frontech | EXPIRED | ₹759 | none (correct) | Discontinued | none |
| #2440 Toyzone | EXPIRED | ₹1,999 | none (correct) | Discontinued | none |
| #3498 boAt | EXPIRED | ₹4,299 | none (correct) | Discontinued | none |
| #17504 Boldfit pump (repriced in desidime 11-28c) | LIVE | ₹481 | 2026-12-11 | InStock | none in schema. See the PriceHistory note below |
| #17209 Solimo casserole (repriced in ingest 11-28b) | LIVE | ₹841 | 2026-12-08 | InStock | none |
| #17640 Adidas Adizero (Myntra) | LIVE | ₹8,639 | 2026-12-11 | InStock | none |
| #17637–#17645 (9 newest) | LIVE | ₹87 to ₹2,941, all match | 2026-12-11 | InStock | none |

## Hubs and posts

| URL | Types | Issues |
|---|---|---|
| `/` | Organization, WebSite, ItemList | 0 |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | 0 |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | 0 |
| `/stores/amazon` | Organization, WebSite, ItemList, BreadcrumbList, FAQPage | 0 |
| `/blog/how-to-use-chronograph-watch-pushers-subdials-tachymeter-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage, HowTo | 0 |
| `/blog/overcoat-buying-guide-india-fabric-fit-length-winter-2…` | Organization, WebSite, Article, BreadcrumbList, FAQPage | 0 |
| `/blog/instax-mini-13-vs-mini-41-which-to-buy-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | 0 |

Google retired FAQ rich results on 2026-05-07, so the FAQPage checks are informational only. The visible FAQ copy still feeds AI answer engines, and it matches everywhere.

## Priority: Offer freshness

`priceValidUntil` is set to the newest PriceHistory row plus 14 days, and it is omitted once that date has passed. This table groups LIVE deals by the age of their newest PriceHistory row.

| Last price check | Deals | Change since 11-25 | `priceValidUntil` served |
|---|---|---|---|
| Under 12 days ago | 1,136 | +82 | Yes |
| 12–14 days ago | 164 | −20 | Yes, but it drops within 2 days |
| Over 14 days ago | 15,290 | +206 | No |
| Never checked | 449 | 0 | No |
| **Total** | **17,039** (matches the LIVE count) | | **15,739 without it (92.4% → 93.0%)** |

**New finding: a prisma reprice does not write PriceHistory.** #17504 serves Offer ₹481, but its newest PriceHistory row is still ₹299 from 11-27. The ₹481 PDP read from 11-28 was never recorded, and `priceValidUntil` (2026-12-11) is computed from the old ₹299 row. The same pattern applies to every reprice done with `prisma.deal.update` in ingest, desidime and TG ticks.

The fix is the same as process gap 1 from 11-25: every confirmed PDP read, whether a reprice or an in-sync check, should write a `PriceHistory {dealId, price, postedAt: now}` row. That keeps the price-history surface honest and refreshes `priceValidUntil` at no extra fetch cost.

Process gap 2 is also still open: there is no bulk price-sync job for the 15,290 rows that no source touches any more.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.21s, `/offers` 0.10s, `/blog` 0.56s, `/sitemap.xml` 0.09s, `/feed.xml` 0.07s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,039 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17645 (97 minutes old) / 17645 | OK |
| Posts / coverless / seo-less | 512 / 0 / 0 | OK |
| Posts per IST day (11-23 to 11-28) | 2 / 2 / 2 / **0** / 2 / 1 | 11-26 was missed (already flagged). 11-28 has 1 so far, with CONTENT-SEO at 06:39, 12:39 and 18:39 |
| CronList vs `.claude/cron-schedules.md` | 9 of 9 present | OK, nothing recreated |
| SCHEMA-AUDIT history | No reports for 11-26 or 11-27 | Gap: the session-cron tick did not run on those days. The cron is present now, with its next run on 11-29 at 04:39 |
| Unpushed commits | 0 after fetch, before this report | OK |
| Deploy | None. Report-only tick | n/a |

## Still open

- **#3593 TRESemmé:** `priceValidUntil` drops tomorrow. Re-verify the price on the PDP and write a PriceHistory row.
- **#16177 Philips iron:** same fix, write a PriceHistory row after a PDP read.
- **#12963:** `priceValidUntil` drops after 12-01.
- **164 deals** drop out of `priceValidUntil` within 2 days.
- **Reprices skip PriceHistory:** #17504 shows ₹299 in history against ₹481 live. See the new finding above.
- **GSC top four:** `priceValidUntil` holds until 12-07, from the 11-23 price check.
- **Carried from 11-25:**
  - LG #17312 pricing-error watch.
  - Inflated and null M.R.P.s.
  - No buy box on 6 rows.
  - #12963 copy says 55% while the row says 57%.
  - `/posts` API response is 5.8MB.
  - GSC traffic is down about 70% since 10-28.
- **Owner actions:**
  - Rotate the DO API token.
  - Leave and report the abusive Telegram chat flagged on 11-25.
