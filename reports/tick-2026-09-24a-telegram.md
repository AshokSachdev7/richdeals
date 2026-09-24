# TELEGRAM-DEAL-MONITOR — tick `2026-09-24a`

Ran in the Playwright MCP `richDeals` profile. One `browser_evaluate` read the sidebar and found 12 of the 13 tracked groups (NonStopDeals had dropped below the rendered chat list).

**Result: 2 published. IndexNow HTTP 200 (5 urls) and Bing fallback 200 ×2. Both pages return 200 on prod.**

## Funnel
| stage | count |
|---|---|
| shortlinks resolved | 6 (the Rogerkart one resolved through its HTML body) |
| skipped on the post itself | G2 voucher loot, midnight "first 5" teaser, Instamart search, Deal Dibba join-bait, "video dekho" |
| duplicates | 3: B0G38DGNKM and PWBGGD4THDQZYAY6 were already in `tg-multi-seen`; B0C7MJ5332 (Larah Borosil, channel says ₹2,311) is already LIVE at ₹2,913 |
| verified on the product page | 2 of 3 |
| rejected | HRX RX-101X sneaker (SHOHHA3YTVYZUTGA): channel said ₹419, ld+json says ₹569 and **OutOfStock** |

## Published (bulk `count:2`)
| store | productId | price | mrp | off | slug |
|---|---|---|---|---|---|
| Amazon | B0D6VPTZ52 | ₹1,650 | 5,499 | 70% | `puma-unisex-flexfocus-lite-modern-running-shoe-b0d6vptz52` |
| Flipkart | PWBHJWGXRHH97CXZ | ₹1,799 | 5,499 | 67% | `boat-27000-mah-22-5w-power-bank-pwbhjwgxrhh97cxz` |

Price check sources: Amazon from the `#centerCol` innerText; Flipkart from the ld+json offer plus the visible price block ("Lowest Price since Launch"). Affiliate tags: `tag=ashoksachdev-21` (Amazon) and `affid=djhackraj` (Flipkart).

## CEO audit
- LIVE 10,604 · PENDING_REVIEW 0 · null price 0 · null image 0.
- Posts: 325 · coverless 0 · missing SEO 0.
- Posts per day (IST): 09-24 = 1 so far at about 14:05 IST. The CONTENT-SEO cron still has slots today, so this is not a problem yet.
- Prod `/ /offers /blog /sitemap.xml /feed.xml /freebies /coupons /api/deals` all return 200.
- Broadcast cursor is at 10949 against DB max 10951. That is today's 2 new deals; the external cron picks them up. Unpushed commits: 0.
- Open follow-up: the Larah Borosil deal is listed at ₹2,913 but the channel now says ₹2,311. A future tick should re-verify it and correct the price.
