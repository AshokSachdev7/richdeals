# TELEGRAM-DEAL-MONITOR tick: 2026-11-28f (about 05:40 IST)

**Result:** 0 new deals went LIVE, because 0 candidates were found. No deal group has posted since tick 11-28e (04:43). Every sidebar row still shows the same last message. No push was made and no IndexNow ping was sent, because there were 0 slugs.

## Sources

- **Playwright, profile richDeals:** a single evaluate call read the `web.telegram.org/a/` sidebar. Telegram was not wedged, so the `t.me/s` fallback was not needed.
- **11 of 13 groups:** these were visible on the first read, and they are unchanged since 11-28e:

| Group | Newest post | Status |
|---|---|---|
| SB Loots | Settings post (02:33) | Not a deal; seen in 11-28e |
| CoolzTricks | Jack & Jones / Spykar (01:08) | Multi-product; seen |
| Dealzone | Arrow blazer, `link.amazon/B0hv9Gwpk` (00:23) | Resolves to a `/s?` search page; seen |
| Rogerkart | Symbol / Lakme (00:15) | Multi-product; seen |
| Dealdost | Mufti Black Friday (23:18) | Sale hub; seen |
| Hidden Loot | Swiggy BIGBASH (10:23, 11-27) | Coupon, not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS, B0F9YZBG7T (Thu) | Rejected in 11-28e (₹338 → ₹509) |
| IFS Tips & Tricks | Instamart (Thu) | Instamart loot post |
| OMG LOOTDEALS | Credit card (Wed) | Not a product |
| INDIAN CHEAP DEALS | LG washer, B0DPHTSTYJ (10-29) | LIVE #5035; re-verified in 11-28e |
| NonStopDeals | Caprese, `fkrt.it` (10-05) | Category page |

- **The other 2 groups:** a scroll pass over the virtualized chat list found them as follows.
  - **Loot Deals 24x7:** the newest post is dated **2023-11-16** (Syska power bank, `fkrt.co`). The channel has been dead for 2 years.
  - **Deal Dibba** (`-1001644986889`): not in the chat list at all. The account has probably left it or been removed.

## Finding: the group roster has shrunk

Of the 13 groups in `data/tg-groups.json`, only about 5 still post daily: CoolzTricks, Dealzone, Rogerkart, Dealdost and SB Loots. Most of their posts are multi-product or sale-hub posts. The other groups are either idle for days or weeks, or dead (Loot Deals 24x7, Deal Dibba).

Overnight yield has been about 0 across 6 ticks today. Replacing the 2 dead entries with active single-product channels would raise yield, but that means joining new outside channels as the owner, so it is an owner action. The roster file is left as it is.

## Freshness

- **IndexNow:** skipped, because there were 0 slugs.
- **Bulk push:** none.
- **Sitemap and llms.txt:** no change needed.

## CEO audit (about 05:40 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`: all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,039 / 0 / 0 / 0 (SITEMON 11-28f, 05:06) | OK |
| Newest deal / broadcast cursor | #17645 / 17645 | OK; source yield is low, not rot |
| Posts on 11-28 (IST) | 1 | CONTENT-SEO runs at 06:39 |
| 11-26 posts | 0 | Already flagged |
| Crons | 9 of 9 (SITEMON 11-28f) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. Reprices skip PriceHistory. #3593 `priceValidUntil` drops tomorrow | Carried |
