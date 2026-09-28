# TELEGRAM tick 2026-09-28ai (~11:05 IST)

**Result:** 2 new deals pushed live (`count:2`, both created). IndexNow → **HTTP 200** (5 URLs = 2 slugs + 3).

## Pushed
| Store | Product | ASIN | Price | M.R.P. | Off | Source |
|---|---|---|---|---|---|---|
| Amazon | DJI Osmo Mobile 7 3-axis phone gimbal | B07FSS4R16 | ₹5,999 | ₹10,990 | 45% | SB Loots (amazn.lt) |
| Amazon | Parachute Advansed Honey body lotion 600 ml | B0CG15FW2C | ₹199 | ₹575 | 65% | CoolzTricks (amzn.to) |

Both verified on PDP (`#corePriceDisplay` price, M.R.P., In stock + add-to-cart, 4.2★). Channel price matched (₹199). DB dedup by productId: none existed. Source tags (`bhavesh015-21`, `collab-amafhh-21`) stripped → `ashoksachdev-21`.

## Skipped
| Group | Post | Why |
|---|---|---|
| ONLINE SHOPPING DEALS | Dabur Ashwagandha ₹135 | link truncated in sidebar (`link.am...`), not recoverable in one read |
| Dealzone | Panchmeva dry fruits | grocery |
| INDIAN CHEAP DEALS | Ladies handbag (link.amazon/B05yvriRF) | already seen |
| Loot Deals 24x7 | Syska power bank (fkrt.co/l5KOxl) | already seen |
| Dealdost | Door stopper ₹152 | already seen |
| Rogerkart / LATEST IPHONE / IFS Tips / Deal Dibba / Hidden Loot / OMG | category, passes, search, join links, supercoins, spam | not a product |

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,298 |
| Pending review | 0 |
| Null price / image | 0 / 0 |
| Posts coverless / seoless | 0 / 0 of 341 |
| Posts per day IST 09-19 → 09-28 | 1/2/1/3/2/3/4/4/4/2 (never 0) |
| Broadcast cursor | 11643 vs DB max 11645: the 2 deals just pushed; the external broadcast cron picks them up (self-heals) |
| Prod endpoints (7) | all 200, 0.10–0.56s |
| Unpushed commits (pre-commit) | 0 |

**Watch:** 09-28 IST still at 2 posts. Next BLOG tick should add 1–2 (cap 4).
