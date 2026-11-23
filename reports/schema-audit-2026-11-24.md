# SCHEMA-AUDIT tick — 2026-11-24

This tick ran at about 04:40 IST on 11-24. It fetched 31 prod URLs:
- the hubs: homepage, `/offers`, `/blog` and `/stores/amazon`
- the GSC top deal pages: #2321, #3492, #3506 and #4188
- the earlier audit set: #4142, #2440, #3498 and #3593
- deals touched in today's ticks: #1688 (repriced), #17081 (expired), #17059, #5035 and #3405
- the 9 newest LIVE deals, #17121 to #17129
- the 3 newest posts

For each page it parsed every `<script type="application/ld+json">` block and checked the following:
- **Product:** the Offer price equals the DB row (Prisma) and appears as visible ₹ copy. Currency is INR, `priceValidUntil` is present and in the future, and availability is InStock or Discontinued.
- **FAQPage:** every question and the start of every answer appears in the visible text.
- **BreadcrumbList:** present, with a URL on every item before the last.
- **Article** (posts): headline (≤110 characters), image, author and datePublished.

**Result: 0 issues on all 31 URLs. Every Offer price equals its DB row and the visible ₹ copy. No stale Offer price was found on the audited pages. The GSC top four were re-checked on 11-23, so the 11-26 `priceValidUntil` expiry flagged in the 11-23 report is resolved; they now carry 2026-12-07. Site-wide, about 94% of LIVE deals still serve no `priceValidUntil`.**

## Deal pages (Product + Offer)

| Deal | Status | Offer | DB | Visible ₹ | priceValidUntil | Availability | FAQ visible | Breadcrumb |
|---|---|---|---|---|---|---|---|---|
| #2321 handmade soap combo (GSC top) | LIVE | ₹289 | ₹289 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #3492 Aadhik gas saver stand (GSC top) | LIVE | ₹216 | ₹216 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #3506 Amazon Basics phone stand (GSC top) | LIVE | ₹249 | ₹249 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #4188 Bluemix mixer grinder (GSC top) | LIVE | ₹1,697 | ₹1,697 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #3593 TRESemmé shampoo 1 L | LIVE | ₹617 | ₹617 | Yes | **2026-11-28** | InStock | Yes | Yes |
| #1688 Biotique lipstick (repriced 11-24b) | LIVE | ₹232 | ₹232 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #17059 Zebronics car charger | LIVE | ₹999 | ₹999 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #5035 LG washing machine | LIVE | ₹20,996 | ₹20,996 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #3405 Dove shampoo 650 ml | LIVE | ₹476 | ₹476 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #17121 to #17129 (9 newest) | LIVE | ₹99 to ₹1,599 | Equal on all 9 | Yes | 2026-12-07 | InStock | Yes | Yes |
| #4142 Frontech cabinet | EXPIRED | ₹759 | ₹759 | Yes | None (expired, correct) | Discontinued | Yes | Yes |
| #2440 Toyzone e-bike | EXPIRED | ₹1,999 | ₹1,999 | Yes | None (expired, correct) | Discontinued | Yes | Yes |
| #3498 boAt soundbar | EXPIRED | ₹4,299 | ₹4,299 | Yes | None (expired, correct) | Discontinued | Yes | Yes |
| #17081 GKD coaster set (expired 11-24c) | EXPIRED | ₹90 | ₹90 | Yes | None (expired, correct) | Discontinued | Yes | Yes |

Every deal page ships Organization, WebSite, Product, BreadcrumbList and FAQPage. As designed, Product has no `seller`, because we are an affiliate.

Since 11-23, two GSC top prices moved and the schema moved with them: #3492 went from ₹223 to ₹216 and #4188 from ₹1,699 to ₹1,697.

## Hubs and posts

| URL | Types | Issues |
|---|---|---|
| `/` | Organization, WebSite, ItemList | None |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | None |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | None |
| `/stores/amazon` | Organization, WebSite, ItemList, BreadcrumbList, FAQPage | None |
| `/blog/ink-tank-vs-laser-printer-for-home-which-to-buy-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | None |
| `/blog/induction-vs-lpg-gas-cost-per-month-which-is-cheaper-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | None |
| `/blog/ro-vs-uv-vs-uf-water-purifier-which-to-buy-by-tds-india` | Organization, WebSite, Article, BreadcrumbList, FAQPage | None |

All three posts' Article blocks carry headline, image, author and datePublished.

Google retired FAQ rich results for all sites on 2026-05-07, so FAQPage is informational only. It stays because it matches the visible FAQ on every audited page and still helps AI answer engines.

## Priority: Offer freshness

No audited page serves a stale Offer price. The risk is site-wide freshness. This was measured from the newest `PriceHistory` row per LIVE deal:

| Last price check | LIVE deals | `priceValidUntil` served |
|---|---|---|
| Under 12 days ago | 898 | Yes |
| 12–14 days ago | 135 | Yes. **It drops by about 11-26** |
| Over 14 days ago | 15,039 | No |
| Never checked | 450 | No |

That leaves 15,489 of 16,522 LIVE deals (93.7%) without `priceValidUntil`. The nearest audited expiry is #3593 TRESemmé, on 11-28. The GSC top four are safe until 12-07; re-check them before then so they keep the field.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.08–0.54s | OK |
| DB LIVE vs API total | 16,522 = 16,522 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | No `schema-audit-2026-11-24*` existed | OK |
| Deploy | None. This was a report-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil` (see Priority above).
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707.
- **Copy mismatches:**
  - #8707's title says "(65% Off)" while its M.R.P. and discountPct are null.
  - #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
