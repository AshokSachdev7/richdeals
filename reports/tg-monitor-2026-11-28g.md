# TELEGRAM-DEAL-MONITOR tick: 2026-11-28g (about 06:46 IST)

**Result:** 0 new deals went LIVE, because 0 candidates were found. No deal group has posted since tick 11-28f (05:40). Every sidebar row shows the same last message as in 11-28e and 11-28f. No push was made and no IndexNow ping was sent, because there were 0 slugs.

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0, already open, not reloaded). There was no connection-status banner, `navigator.onLine` was true and the tab was visible. The `t.me/s` fallback was not needed.
- **Liveness cross-check:** `t.me/s/coolztricks` shows a newest post at 2026-11-27T19:38Z, which is 01:08 IST and matches the sidebar row. So the sidebar is current, not frozen.

| Group | Newest post | Status |
|---|---|---|
| SB Loots | Settings post (02:33) | Not a deal; seen |
| CoolzTricks | Jack & Jones / Spykar (01:08) | Multi-product; seen |
| Dealzone | Arrow blazer, `link.amazon/B0hv9Gwpk` (00:23) | Resolves to a `/s?` search page; seen |
| Rogerkart | Symbol / Lakme (00:15) | Multi-product; seen |
| Dealdost | Mufti Black Friday (23:18) | Sale hub; seen |
| Hidden Loot | Swiggy BIGBASH (10:23, 11-27) | Coupon, not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS, `link.amazon/B02rIKNK6` (Thu) | Rejected in 11-28e (₹338 → ₹509) |
| IFS Tips & Tricks | Instamart (Thu) | Instamart loot post |
| OMG LOOTDEALS | Credit card (Wed) | Not a product |
| INDIAN CHEAP DEALS | LG washer (10-29) | LIVE #5035; re-verified in 11-28e |
| NonStopDeals | Caprese, `fkrt.it` (10-05) | Category page |
| Loot Deals 24x7 | Last post 2023-11-16 | Dead (11-28f) |
| Deal Dibba | Not in the chat list | Left or removed (11-28f) |

## Freshness

- **IndexNow:** skipped, because there were 0 slugs.
- **Bulk push:** none.
- **Sitemap and llms.txt:** no change needed.

## CEO audit (about 06:46 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.25s, `/offers` 0.08s, `/blog` 0.58s, `/sitemap.xml` 0.05s, `/feed.xml` 0.10s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,039 / 0 / 0 / 0 (DB read at 06:4x in CONTENT-SEO 11-28b) | OK |
| Newest deal / broadcast cursor | #17645 / 17645 | OK; source yield is low, not rot |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK |
| Crons | 9 of 9 (SITEMON 11-28g) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | The roster has shrunk: about 5 of 13 groups still post daily, and 2 are dead (joining replacement channels is an owner action). SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. #3593 `priceValidUntil` drops today. Reprices skip PriceHistory | Carried |
