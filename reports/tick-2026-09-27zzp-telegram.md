# TELEGRAM-DEAL-MONITOR tick 2026-09-27zzp (~23:04 IST)

**Result:** 1 new deal live (Amazon). Live deals went from 11,272 to 11,273.

## Scan
- **Sidebar:** one evaluate over `.chat-list .ListItem.Chat` covering all groups in `data/tg-groups.json`.
- **Shortlink:** SB Loots `amazn.lt/YQvlY21C` resolved to `/dp/B0FMNPXCQ8`. The source tag `bhavesh015-21` was stripped.
- **Verification:** the PDP was re-read in the logged-in Amazon tab (`.priceToPay`, M.R.P., `#availability`, add-to-cart, rating). No clip coupon. The channel post was truncated before its price, so the PDP price was used.
- **Dedup:** the productId is not in the DB.

## Pushed (`/admin/deals/bulk`, count 1, `created:true`)
| Deal | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Zebronics Party Fyre 510 160W party DJ speaker | B0FMNPXCQ8 | ₹9,999 | ₹26,999 (63% off) | 3.9★ (84), 200+ bought last month |

- **Name:** I changed it from "with Dual Mic" to "Dual Mic Input". The PDP lists two 6.3 mm mic inputs, not mics in the box, so the original wording would have over-promised.
- **Affiliate:** `tag=ashoksachdev-21`.
- **Image:** m.media-amazon.com.
- **Script:** `apps/api/scripts/push-tg-0927zzp.mjs`.

## Rejected
- **CoolzTricks, Amazon Fresh cashback:** a cashback offer, not a product.
- **LATEST IPHONE RATES, Flipkart Big Billion passes:** not a product.
- **Already seen:** Dealdost Vaku power bank, Dealzone dry fruits, ONLINE SHOPPING DEALS Treo mugs, Rogerkart Skybags, Hidden Loot supercoins.
- **Not a deal:** IFS Tips (Swiggy search), Deal Dibba (join link), and the non-deal chats.

`tg-multi-seen.json`: 6 entries added, 2,211 total.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, already current.
- **Prod:** the deal page returns 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,273 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 339 |
| Posts today (IST) | 4 (at the cap). Last 9 days: 3/2/1/3/2/3/4/4/4, never 0. |
| Broadcast cursor | 11620, equal to the DB max of 11620 (this deal has already been broadcast) |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
