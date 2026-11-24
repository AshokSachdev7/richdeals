# SCHEMA-AUDIT tick — 2026-11-25

This tick ran at about 04:30–04:40 IST on 11-25 (23:00–23:10 UTC on 11-24). It was report-only, per claude-seo:seo-schema.

**30 URLs were fetched, and all returned 200:**

- 4 hubs: `/`, `/offers`, `/blog`, `/stores/amazon`.
- 4 GSC top deal pages.
- 13 other deal pages, picked to cover expired, high-traffic, watch-list and freshness-edge rows.
- The 9 newest deals, #17370–#17378.
- The 3 newest posts.

Every ld+json block was parsed and checked:

- **Product/Offer:** the price equals the DB row, the visible ₹ copy is present, the currency is INR, `priceValidUntil` is present and in the future (expired rows are exempt), availability is InStock, Discontinued or OutOfStock, and an image is present.
- **FAQPage:** every question, and the first 40 characters of every answer, appear in the visible text.
- **BreadcrumbList:** present, with an absolute URL on every item except the last.
- **Article:** headline (110 characters or fewer), datePublished, image and author.

**Result:** 29 of the 30 URLs have no issues, and no stale Offer price was found. Every audited Offer matches both its DB row and the visible price.

The one issue is #16177 (Philips GC1905/21 iron), which serves no `priceValidUntil`. Its newest PriceHistory row is from 11-05, 20 days ago. TG-MONITOR 11-25e re-verified it on the product page and found it in sync, but an in-sync re-verify does not write a PriceHistory row, so the freshness signal never refreshes.

Site-wide freshness is the priority. 92.6% of LIVE deals serve no `priceValidUntil` (see below).

## Deal pages

Every deal page ships Organization, WebSite, Product, BreadcrumbList and FAQPage. Every currency is INR. "FAQ visible" means all 4 Q&As are in the page text.

| Deal | Status | Offer | DB | Visible ₹ | priceValidUntil | Availability | FAQ visible | Breadcrumb |
|---|---|---|---|---|---|---|---|---|
| #2321 handmade soap (GSC top) | LIVE | ₹289 | ₹289 | yes | 2026-12-07 | InStock | 4/4 | OK |
| #3492 Aadhik gas saver (GSC top) | LIVE | ₹216 | ₹216 | yes | 2026-12-07 | InStock | 4/4 | OK |
| #3506 Amazon Basics phone stand (GSC top) | LIVE | ₹249 | ₹249 | yes | 2026-12-07 | InStock | 4/4 | OK |
| #4188 Bluemix mixer grinder (GSC top) | LIVE | ₹1,697 | ₹1,697 | yes | 2026-12-07 | InStock | 4/4 | OK |
| #3593 TRESemmé | LIVE | ₹617 | ₹617 | yes | **2026-11-28** (nearest expiry) | InStock | 4/4 | OK |
| #4142 Frontech | EXPIRED | ₹759 | ₹759 | yes | none (correct for expired) | Discontinued | 4/4 | OK |
| #2440 Toyzone | EXPIRED | ₹1,999 | ₹1,999 | yes | none (correct for expired) | Discontinued | 4/4 | OK |
| #3498 boAt | EXPIRED | ₹4,299 | ₹4,299 | yes | none (correct for expired) | Discontinued | 4/4 | OK |
| #4793 Havells air fryer | LIVE | ₹5,578 | ₹5,578 | yes | 2026-12-08 | InStock | 4/4 | OK |
| **#16177 Philips GC1905/21 iron** | LIVE | ₹1,197 | ₹1,197 | yes | **missing** | InStock | 4/4 | OK |
| #17309 Bhuvenika dry fruits | LIVE | ₹436 | ₹436 | yes | 2026-12-08 | InStock | 4/4 | OK |
| #17312 LG monitor | LIVE | ₹1,998 | ₹1,998 | yes | 2026-12-08 | InStock | 4/4 | OK |
| #12963 Himalaya diapers | LIVE | ₹1,085 | ₹1,085 | yes | 2026-12-01 | InStock | 4/4 | OK |
| #17370–#17378 (9 newest) | LIVE | ₹159 to ₹10,499 | match | yes | 2026-12-08 | InStock | 4/4 | OK |

PriceHistory behind the edge rows:

| Row | Newest price check | Previous price check | Effect |
|---|---|---|---|
| #16177 | ₹1,197 on 11-05 | none | `priceValidUntil` dropped on 11-19 |
| #3593 | ₹617 on 11-14 | ₹479 on 10-31 | `priceValidUntil` drops after 11-28 |
| #12963 | ₹1,085 on 11-17 | ₹1,030 on 10-13 | `priceValidUntil` drops after 12-01 |

## Hubs and posts

| URL | Types | Issues |
|---|---|---|
| `/` | Organization, WebSite, ItemList | 0 |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | 0 |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | 0 |
| `/stores/amazon` | Organization, WebSite, ItemList, BreadcrumbList, FAQPage | 0 |
| `/blog/gaming-chair-vs-ergonomic-office-chair-which-is-better` | Organization, WebSite, Article, BreadcrumbList, FAQPage | 0 |
| `/blog/geyser-not-heating-water-causes-fixes-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | 0 |
| `/blog/ink-tank-vs-laser-printer-for-home-which-to-buy-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | 0 |

Google retired FAQ rich results on 2026-05-07, so the FAQPage checks are informational only. The visible FAQ copy still matters for AI answer engines, and it matches everywhere.

## Priority: Offer freshness

`priceValidUntil` is set to the newest PriceHistory row plus 14 days, and it is omitted once that date has passed. This table groups LIVE deals by the age of their newest PriceHistory row.

| Last price check | Deals | `priceValidUntil` served |
|---|---|---|
| Under 12 days ago | 1,054 | Yes |
| 12–14 days ago | 184 | Yes, but it drops within 2 days |
| Over 14 days ago | 15,084 | No |
| Never checked | 449 | No |
| **Total** | **16,771** (matches the LIVE count) | **15,533 without it (92.6%)** |

No audited page shows a stale price. The risk is that Google cannot tell how fresh the remaining 92.6% of Offers are.

Two process gaps feed it:

1. **In-sync re-verifies do not refresh freshness.** Ingest and TG ticks re-check dozens of duplicate rows every tick, for example 55 in DEAL-INGEST 11-25b and 3 in TG-MONITOR 11-25e, and find them in sync. They write nothing, so a price that was just confirmed still ages out of `priceValidUntil`. Writing a PriceHistory row on every confirmed re-verify, not only on a reprice, would keep every touched row fresh at no extra fetch cost.
2. **No bulk price-sync job exists** for the 15,084 rows that no source touches any more.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.16s, `/offers` 0.11s, `/blog` 0.44s, `/sitemap.xml` 0.09s, `/feed.xml` 0.09s, `/api/deals` 0.10s, `/llms.txt` 0.38s, all 200 | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 vs 17,378 | OK |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | No `schema-audit-2026-11-25` report existed, so none is needed | OK |
| Deploy | None. Report-only tick | n/a |

No deal or post was created since SITEMON 11-25e.

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **#16177 `priceValidUntil`:** missing even though the row was re-verified in sync today. This is a symptom of process gap 1 above.
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days.
- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 15 rows repriced between INDEXNOW 11-24d and 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25e).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
