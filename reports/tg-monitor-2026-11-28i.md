# TELEGRAM-DEAL-MONITOR tick: 2026-11-28i (about 08:44 IST)

**Result:** 0 new deals went LIVE, because there were 0 candidates. Since 11-28h, only one deal group has posted: SB Loots at 08:31. That post was an Arrow blazer link that goes to an Amazon `/s?` search page, so it was rejected. No push was made and no IndexNow ping was sent, because there were 0 slugs.

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0, already open, not reloaded). `navigator.onLine` was true, the tab was visible and there was no connection banner. The `t.me/s` fallback was not needed.
- **Liveness:** the sidebar is current. SB Loots shows a new post at 08:31, our own RichDeals channel shows its 07:09 post, and private chats show activity up to 01:22 PM (yesterday's).

| Group | Newest post | Status |
|---|---|---|
| SB Loots | Arrow blazer, `amazn.lt/dxvOUOHJ` (08:31) | **New.** Resolves to an Amazon `/s?k=Arrow+blazer` search page. Rejected; added to seen |
| CoolzTricks | Jack & Jones / Spykar (01:08) | Multi-product; seen |
| Dealzone | Arrow blazer, `link.amazon/B0hv9Gwpk` (00:23) | Same search page; seen |
| Rogerkart | Symbol / Lakme (00:15) | Multi-product; seen |
| Dealdost | Mufti Black Friday (23:18) | Sale hub; seen |
| Hidden Loot | Swiggy BIGBASH (10:23, 11-27) | Coupon, not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS, `link.amazon/B02rIKNK6` (Thu) | Rejected in 11-28e (₹338 → ₹509) |
| IFS Tips & Tricks | Instamart (Thu) | Instamart loot post |
| OMG LOOTDEALS | Credit card (Wed) | Not a product |
| INDIAN CHEAP DEALS | LG washer (10-29) | LIVE #5035 |
| NonStopDeals | Caprese, `fkrt.it` (10-05) | Category page |
| Loot Deals 24x7 | Last post 2023-11-16 | Dead |
| Deal Dibba | Not in the chat list | Left or removed |

`data/tg-multi-seen.json` now holds 5,874 entries; the new shortlink was added.

## Freshness

- **IndexNow:** skipped, because there were 0 slugs.
- **Bulk push:** none.
- **Sitemap and llms.txt:** no change needed.

## CEO audit (about 08:44 IST, read from the DB and prod this tick)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.35s, `/offers` 0.10s, `/blog` 1.24s, `/sitemap.xml` 0.08s, `/feed.xml` 0.07s, `/api/deals` 0.10s, all 200 | OK (`/blog` slower than its usual ~0.6s) |
| LIVE / PENDING_REVIEW / null price / null image | 17,041 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17647 (created 07:07 IST) / 17647 | OK |
| Posts by IST day | 11-28: 2, 11-27: 2 / posts missing a cover or SEO fields: 0 | OK |
| Crons | 9 of 9 in CronList, matching the roster | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups; replacing groups is an owner action | Carried |
