# TELEGRAM-DEAL-MONITOR tick: 2026-11-28h (about 07:44 IST)

**Result:** 0 new deals went LIVE, because 0 candidates were found. No deal group has posted since tick 11-28g (06:46). Every deal-group sidebar row shows the same last message as in 11-28e, 11-28f and 11-28g. No push was made and no IndexNow ping was sent, because there were 0 slugs.

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0, already open, not reloaded). `navigator.onLine` was true, the tab was visible and there was no connection banner.
- **Liveness proof:** our own RichDeals channel row shows the 07:09 SaleOn broadcast (#17647), so the client is receiving updates and is not frozen.
- **`t.me/s` cross-check:** CoolzTricks newest post is 2026-11-27T19:38Z (01:08 IST), which matches the sidebar. Dealdost's public preview has been stale since 10-07, so the sidebar is the only source for that group. Rogerkart has no public preview.

| Group | Newest post | Status |
|---|---|---|
| SB Loots | Settings post (02:33) | Not a deal; seen |
| CoolzTricks | Jack & Jones / Spykar (01:08) | Multi-product; seen |
| Dealzone | Arrow blazer, `link.amazon/B0hv9Gwpk` (00:23) | Resolves to a `/s?` search page; seen |
| Rogerkart | Symbol / Lakme (00:15) | Multi-product; seen |
| Dealdost | Mufti Black Friday (23:18) | Sale hub; seen |
| Hidden Loot | Swiggy BIGBASH | Coupon, not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS (Thu) | Rejected in 11-28e (₹338 → ₹509) |
| IFS Tips & Tricks | Instamart (Thu) | Instamart loot post |
| OMG LOOTDEALS | Credit card (Wed) | Not a product |
| INDIAN CHEAP DEALS | LG washer (10-29) | LIVE #5035 |
| NonStopDeals | Caprese, `fkrt.it` (10-05) | Category page |
| Loot Deals 24x7 | Last post 2023-11-16 | Dead |
| Deal Dibba | Not in the chat list | Left or removed |

## Freshness

- **IndexNow:** skipped, because there were 0 slugs.
- **Bulk push:** none.
- **Sitemap and llms.txt:** no change needed.

## CEO audit (about 07:44 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.38s, `/offers` 0.08s, `/blog` 0.56s, `/sitemap.xml` 0.08s, `/feed.xml` 0.08s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,041 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17647 / 17647 | OK |
| Posts on 11-28 (IST) | 2 | OK |
| Crons | 9 of 9 (SITEMON 11-28h) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | Only about 5 of 13 groups still post, and 2 are dead; replacement channels have to be joined from the owner's account. The deploy script builds web before restarting rd-api | Carried |
