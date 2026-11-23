# SCHEMA-AUDIT tick — 2026-11-23

This tick fetched 14 production URLs at about 21:55 IST on 11-23 and parsed every `<script type="application/ld+json">` block: the homepage, `/offers`, `/blog`, the four GSC top deal pages (#2321, #3492, #3506, #4188), four deal pages touched today (#5514 repriced, #17039, #17077, #17078 new) and the three newest blog posts. For each Product, the Offer price was compared with the DB row and with the rupee figure shown on the page. FAQPage questions were matched against the visible HTML, BreadcrumbList items were checked for absolute URLs, and Article blocks were checked for headline, image, author and dates. This tick only reports; it changed nothing.

**Result: 14 of 14 URLs return 200 with valid JSON-LD. 8 of 8 Offer prices match both the DB and the visible copy, with INR currency and InStock availability. Every FAQPage question appears in the visible HTML. No stale Offer price was found. The priority item is still the four GSC top rows whose `priceValidUntil` runs out on 11-26.**

## Deal pages (Product + Offer)

| Deal | Offer | DB | Visible ₹ | priceValidUntil | FAQ visible | Breadcrumb |
|---|---|---|---|---|---|---|
| #2321 handmade soap combo (GSC top) | ₹289 INR InStock | LIVE ₹289 | Yes | **2026-11-26** | 5/5 | 3 items |
| #3492 Aadhik gas saver stand (GSC top) | ₹223 INR InStock | LIVE ₹223 | Yes | **2026-11-26** | 4/4 | 3 items |
| #3506 Amazon Basics phone stand (GSC top) | ₹249 INR InStock | LIVE ₹249 | Yes | **2026-11-26** | 6/6 | 3 items |
| #4188 Bluemix Smart Plus mixer grinder (GSC top) | ₹1,699 INR InStock | LIVE ₹1,699 | Yes | **2026-11-26** | 6/6 | 3 items |
| #5514 Havells HD3151 (repriced today) | ₹649 INR InStock | LIVE ₹649 | Yes | 2026-12-07 | 4/4 | 3 items |
| #17039 ax950pro 256GB SSD | ₹2,700 INR InStock | LIVE ₹2,700 | Yes | 2026-12-07 | 6/6 | 3 items |
| #17077 Beardo SPF 60 | ₹119 INR InStock | LIVE ₹119 | Yes | 2026-12-07 | 5/5 | 3 items |
| #17078 Sony WH-CH730N | ₹12,990 INR InStock | LIVE ₹12,990 | Yes | 2026-12-07 | 6/6 | 3 items |

Each deal page carries Organization, WebSite, Product, BreadcrumbList and FAQPage. Product has no `seller`, by design, because we are an affiliate and not the merchant. `priceValidUntil` is 14 days from the last real price check (`dealPriceCheck`), so the four GSC rows last checked on 11-12 drop the field on 11-26 rather than show a made-up future date.

## Hubs and posts

| URL | Types | Notes |
|---|---|---|
| `/` | Organization, WebSite, ItemList | OK |
| `/offers` | Organization, WebSite, BreadcrumbList, CollectionPage | Breadcrumb 2 items, absolute URLs |
| `/blog` | Organization, WebSite, BreadcrumbList, CollectionPage | The script first flagged one block with no `@context`. That block is a JSON array whose elements each carry `@context`, so this is a false positive. |
| Post: induction vs LPG cost (11-23) | Article, BreadcrumbList, FAQPage | headline, image, author, datePublished and dateModified all present; FAQ 4/4 visible |
| Post: RO vs UV vs UF purifier (11-23) | Article, BreadcrumbList, FAQPage | Same; FAQ 4/4 visible |
| Post: filterless vs baffle chimney (11-20) | Article, BreadcrumbList, FAQPage | Same; FAQ 5/5 visible |

FAQPage no longer earns a Google rich result (Google retired FAQ rich results for all sites in May 2026). It stays because it matches the visible FAQ and answer engines still read it. This is informational, not an error.

## Priority

1. **#2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26.** These are the pages with the most GSC impressions. Each needs a product-page price read before then; a matching read resets the 14-day window. The next SEO-AUDIT-FIX tick takes this.
2. No stale Offer price was found in this sample. About 94% of LIVE deals have no `priceValidUntil` because they have not been re-checked in 14 days. They still validate, because the field is recommended rather than required.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200 at about 21:50 IST | OK |
| DB LIVE vs API total | 16,472 = 16,472 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,079 vs 17,048 | OK; the external cron is catching up |
| Posts per day (IST) | 11-17 to 11-20: 3 each; **11-21: 0, 11-22: 0 (missed)**; 11-23: 2 | Flag for the past days; today is within the rule |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report | OK |

## Still open

- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
- The rest of the open list is unchanged from `tg-monitor-2026-11-23a.md`.
