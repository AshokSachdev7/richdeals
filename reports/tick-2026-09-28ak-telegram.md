# TELEGRAM tick 2026-09-28ak (~12:04 IST)

**Result:** 3 new deals pushed live (`count:3`, all created). IndexNow → **HTTP 200** (6 URLs = 3 slugs + 3).

## Pushed
| Store | Product | ASIN | Price | M.R.P. | Off | Source |
|---|---|---|---|---|---|---|
| Amazon | Complan Royale Chocolate 1.5 kg + container | B0CD5QSDXM | ₹603 | ₹1,129 | 47% | SB Loots (amazn.lt) |
| Amazon | boAt Airdopes 101v2 TWS | B0DXPNVSSB | ₹749 | ₹3,990 | 81% | CoolzTricks (amzn.to) |
| Amazon | Craftopix floral A5 notebook, 192 pages | B0GRSFRM64 | ₹119 | ₹599 | 80% | Dealzone (link.amazon) |

All verified on PDP (`#corePriceDisplay` price + M.R.P., In stock + add-to-cart). boAt channel price ₹704 is post-coupon: PDP ₹749 with a 6% clip coupon → ~₹704. The deal is priced at the listed ₹749, and the coupon is noted in the copy. Dealzone "119" matched the PDP. Source tags stripped (`bhavesh015-21`, `collab-amafhh-21`, `glitzdeal05-21`) → `ashoksachdev-21`.

## Skipped
| Post | Why |
|---|---|
| boAt Airdopes Ultra Plus B0D31QS9RH (₹799, 11% coupon → ₹711) | already LIVE in DB (`boat-airdopes-ultra-plus-tws-earbuds-sporty-blue`). Not re-pushed: a bulk upsert would overwrite the slug |
| Dabur Ashwagandha (ONLINE SHOPPING DEALS) | sidebar link still truncated |
| IFS Tips ConfirmTkt PNR cashback | not a product |
| Dealdost / INDIAN CHEAP / Loot Deals 24x7 | already seen |
| Rogerkart / LATEST IPHONE / Deal Dibba / Hidden Loot / OMG | category, passes, join links, supercoins, spam |

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,301 |
| Pending review | 0 |
| Null price / image | 0 / 0 |
| Posts coverless / seoless | 0 / 0 of 341 |
| Posts per day IST 09-19 → 09-28 | 1/2/1/3/2/3/4/4/4/2 (never 0) |
| Broadcast cursor | 11645 vs DB max 11648: the 3 just pushed, picked up by the external broadcast cron (self-heals) |
| Prod endpoints (7) | all 200, 0.12–0.63s |
| Unpushed commits (pre-commit) | 0 |

**Watch:** 09-28 IST still at 2 posts at 12:04. The BLOG cron should add 1–2 (cap 4).
