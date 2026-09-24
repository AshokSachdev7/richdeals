# SEO / AEO / GEO push — 2026-09-24

## Shipped
| Commit | Fix | Verified |
|---|---|---|
| c31e92d | 308 two duplicate blog posts into their keepers (`best-time-to-buy-electronics-india`, `best-credit-cards-india-2026-online-shopping`); in-body link rewritten | prod 308 ✓, gone from sitemap ✓ |
| 8384b53 | `/freebies` was a clone of the homepage feed → now "Freebies under ₹99" (595 live), honest copy | local API ✓, prod ✓ (API filter + H1) |
| c1ae80e | `/coupons` was a clone of the homepage feed → now Amazon clip-coupon hub (184 live), honest copy | local API ✓, prod ✓ (API filter + H1) |

## Root causes
- **Traffic cliff 2026-07-31.** It was a 5-day honeymoon (07-26→30, ~3k impr/day). Two queries made up 13.2k of the 14.5k lifetime impressions and got 0 clicks. It was not a penalty and not a deploy.
- **Hub pages.** `GET /deals` never filtered `dealType`, and every deal is `DEAL`. `/freebies` and `/coupons` therefore showed the same feed as the homepage, which is duplicate content with the wrong intent (`freebies` at position 86).

## Durable surface
Deal pages rank at position 1–3 for long-tail India product queries. The last 28 days brought 457 impressions and 10 clicks.

## Next levers
1. Deal-page AEO depth. These pages are the ranking surface.
2. `/stores/flipkart` sits at position 47–70 for sale queries. Retune it the same way (check that the items match the H1).
3. Authority is the ceiling. Backlinks need the owner, because outside posting requires approval.

IndexNow: HTTP 200 (blog keepers + /freebies + /coupons, --paths).
