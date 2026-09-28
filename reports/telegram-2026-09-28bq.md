# Telegram tick 2026-09-28bq (23:04 IST)

## Sidebar read
Ran one `browser_evaluate` over `.chat-list .ListItem.Chat` to read the newest message in each deal group.

Skipped without resolving:
- **Dealzone:** High Star clothing category post.
- **Dealdost:** face wash, needs 2 quantity plus a coupon.
- **IndiaFreeStuff Tips:** ConfirmTkt cashback.
- **iPhone rates:** Big Billion pass links.
- **Deal Dibba:** channel-join spam.
- **Hidden Loot:** SuperCoins task.
- **Rogerkart:** Solimo study table, already live from tick 28bn.

## Resolve and dedup
Resolved 6 shortlinks; 3 were already in `tg-multi-seen.json`:
- **ToyAffair Ludo** (ONLINE SHOPPING DEALS): `link.amazon` resolved to B0DQQ586YL.
- **Ladies handbag** (INDIAN CHEAP DEALS): resolved to B0G38DGNKM. It is also already live in the DB as the Lavie Luxe satchel.
- **Syska 10000 mAh power bank** (Loot Deals 24x7): resolved to PWBGGD4THDQZYAY6.

The other 3 were new Flipkart pids:
- **"Loot 119"** (CoolzTricks, via `fkrt.cc`): ACCG6G45GWDDGAZS.
- **SB Loots "2049"** (via `fktr.in`, then linkredirect): ELWHZGUUHNTWGWXY.
- **SB Loots "3079"** (same route): ELWHZGURSFQYG75Z.

## Verification (Flipkart tab, ld+json price + M.R.P. beside the price)
| pid | Product | Price / M.R.P. | Stock | Result |
|---|---|---|---|---|
| ACCG6G45GWDDGAZS | boAt 2-in-1 Micro-Axis cable 3 A 1.5 m | ₹119 / ₹999 (88%) | InStock, 3.7★ (286) | pass |
| ELWHZGURSFQYG75Z | Orient Diamond 1.5 sq mm copper wire 90 m, blue | ₹3,079 / ₹8,528 (64%) | InStock | pass |
| ELWHZGUUHNTWGWXY | Orient Diamond 1 sq mm wire 90 m, black | ₹2,049 | **OutOfStock** | reject |

## Push
- `/admin/deals/bulk` returned **count 2, created 2**, both `status:live` with `affid=djhackraj` on the `/p/itm` path.
- Both images are from `rukmini1.flixcart.com` and returned 200.
- Before pushing, checked the product IDs against the DB: 0 already present.
- Added all 3 pids to `tg-multi-seen.json`, including the out-of-stock one, so the list is now 2,296.

## Freshness
| Surface | Status |
|---|---|
| IndexNow | **HTTP 200, 5 URLs** (2 slugs + 3) |
| New deal pages | 2/2 return 200 on prod |
| Sitemap / llms.txt | ISR 30 min / force-dynamic |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,453 (+2) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4 |
| Broadcast cursor | 11798 vs DB max 11800. The gap of 2 is this batch. |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
