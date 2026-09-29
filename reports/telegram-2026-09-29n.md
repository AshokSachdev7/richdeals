# TELEGRAM-DEAL-MONITOR tick: 2026-09-29n (13:05 IST)

## Sidebar scan
- One `browser_evaluate` read the newest post from every group in the chat list.
- 6 single-product links found and resolved. Skipped: Dealdost (multi-product loot), IndiaFreeStuff Tips (ConfirmTkt cash), iPhone rates (Big Billion passes), Hidden Loot (SuperCoins), and the ad/spam chats.

| Group | Post | Resolved | Outcome |
|---|---|---|---|
| SB Loots | Lifelong yoga mat | FK `itm457414e4b258f` pid SMTHJ7YWFDCNPF6H | **new → pushed** |
| CoolzTricks | Axe Black 3-in-1 ₹171 | B0BHTT9XK6 | LIVE dupe (id 9532); PDP ₹171 = DB, no change |
| Dealzone | Gillette Fusion 5 ₹170 after 50% coupon | B001XURGVM | LIVE dupe (id 42) was stale at ₹153; **fixed** |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 | B0G38DGNKM | seen + LIVE (id 7110); PDP ₹3,459 = DB |
| Loot Deals 24x7 | Syska 10000 mAh ₹799 | FK PWBGGD4THDQZYAY6 | already in the seen file |
| Rogerkart | French Connection watch ₹961 | rogerkart shortlink did not resolve | pushed in the 09-29f IFS tick |

## Verification
- **Yoga mat (FK ld+json):** ₹229, M.R.P. ₹599 (62% off), InStock, rated 4.2 by 4,140 buyers. The post gave only the M.R.P., so ₹229 is taken from the PDP.
- **Gillette (Amazon `#centerCol`):** buybox ₹340, M.R.P. ₹350, in stock, add-to-cart present, rated 4.3 (7,196). The 50% coupon is recorded as claimed in `couponNote`, because the coupon widget does not render in fetched HTML.

## Push and fix
- `/admin/deals/bulk` returned **count 1**, `created:true`: Lifelong EVA yoga mat ₹229 on Flipkart, `affid=djhackraj`.
- `prisma.deal.update` on id 42: price ₹153 → ₹340, mrp 350, discountPct 3, title ₹ matches price, copy rewritten, couponNote added. The slug is kept, so the URL stays live.
- `tg-multi-seen.json` updated (2,320 entries).

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 5 urls (2 slugs + 3) |
| Deal pages | Both return 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,535 = API total (max id 11882) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11881 (file re-read); only the new id 11882 is waiting |
| Unpushed commits | 0 before this report |

Result: **1 new + 1 stale price fixed, IndexNow 200, 0 rot.**
