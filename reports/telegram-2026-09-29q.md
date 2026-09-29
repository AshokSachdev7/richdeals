# TELEGRAM-DEAL-MONITOR tick: 2026-09-29q (14:04 IST)

## Scan
One `browser_evaluate` over the sidebar (Playwright profile richDeals) read the newest post of every group.

| Group | Post | Outcome |
|---|---|---|
| Dealzone | Milton Thermosteel 620 ml @599 (`link.amazon/B09WoUirn`) | resolved to **B0CKZ29C5V**, new, accepted |
| Rogerkart | French Connection women's watch @961 | already LIVE (id 11853, B0FHWS6LGZ, ₹961), skipped |
| INDIAN CHEAP DEALS | Ladies handbag (B0G38DGNKM) | already seen |
| Loot Deals 24x7 | Syska 10000 mAh (FK) | already seen |
| SB Loots | Sunfeast Dark Fantasy 460 g | low-ticket FMCG, skipped |
| Dealdost | face wash at ₹41 each (loot, needs coupon + 2 qty) | loot, skipped |
| CoolzTricks | Reebok shoes loot | category, skipped |
| IFS Tips / Hidden Loot / iPhone rates | PNR cash, SuperCoins, BBD passes | not products |

## Verification
- **B0CKZ29C5V** (Amazon PDP, logged-in tab): ₹599, M.R.P. ₹1,090 (45% off). `#availability` In stock, add-to-cart present, rating 4.2 (1,135 reviews).
- The post's price matches the PDP.

## Push
- `/admin/deals/bulk` returned **count 1**, `created:true`, status live.
- Affiliate: `https://www.amazon.in/dp/B0CKZ29C5V?tag=ashoksachdev-21` (source tag `glitzdeal05-21` stripped).
- Image comes from m.media-amazon.com. Copy was written originally.
- `data/tg-multi-seen.json` updated with the codes (local file, not committed).

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 4 urls (1 slug + 3) |
| Deal page | `/milton-sparkle-600-thermosteel-water-bottle-620-ml-blue-b0ckz29c5v` returns 200 |
| sitemap.xml / llms.txt | 200 / 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,536 = API total (max id 11883) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11882 vs max 11883: this deal is waiting for the external tg-broadcast cron (self-heals) |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **1 new (Milton bottle ₹599), IndexNow 200, 0 rot.**
