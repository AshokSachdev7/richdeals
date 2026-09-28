# TELEGRAM tick: 2026-09-28az (17:05 IST)

## Scan
- Read the sidebar of all 13 source groups with one `browser_evaluate`.
- **1 new deal, plus 1 stale-price refresh.** The rest were skipped:

| Group | Post | Why skipped |
|---|---|---|
| CoolzTricks | American Tourister 33.5L backpack @699: amzn.to/3VCXYv8 → B0CYGP4MPW (Vivid Blue) | **PUSHED** (new) |
| CoolzTricks | Same post: amzn.to/47n20ug → B0CYGLTZ6N | Already seen |
| Dealdost | Moringa leaf powder 100 g @195: amzn.to/4rxGsEq → B0HD7VSFZ3 | **UPDATED**: already live as `organic-moringa-powder`, but the DB price of ₹349 was stale |
| SB Loots | Libas category, 3 links | Multi-product category post |
| Dealzone / Rogerkart / INDIAN CHEAP DEALS / Loot Deals 24x7 / ONLINE SHOPPING DEALS | Milton casserole, AT trolley, handbag, Syska, AT Quad | Already handled or seen |
| IFS Tips / Big Billion pass / Deal Dibba / Hidden Loot Supercoins / OMG | — | Not deals |

## Verification (logged-in Amazon tab, `#centerCol`)

| ASIN | Price / M.R.P. | Discount | Stock | Rating |
|---|---|---|---|---|
| B0CYGP4MPW | ₹699 / ₹2,300 | −70% | In stock, add-to-cart present | 4.2★ (5,812) |
| B0HD7VSFZ3 | ₹195 / ₹599 | −67% | In stock, add-to-cart present | 5.0★ (3) |

## Push
- Sent to `localhost:4000/admin/deals/bulk` and got **count 2**: the backpack `created:true`, the moringa `created:false`.
  - Both use `?tag=ashoksachdev-21` and are live.
- Moringa: the slug `organic-moringa-powder` was passed explicitly so the bulk upsert could not rewrite it and 404 the old URL.
  - It now shows price 195, M.R.P. 599, 67% off.
  - The stale "@ ₹349" title has been replaced.
- Prod: both slugs return 200.
- `tg-multi-seen.json` now has 2,264 entries.

## Freshness
- IndexNow returned **HTTP 200 for 5 URLs** (2 slugs + 3).
- The sitemap (ISR) and llms.txt (dynamic) pick up both deals automatically.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,394 (+1) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11730 vs DB max 11741. The external cron is still working through the IFS 28ax batch; it self-heals. |
| Prod 7 endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
