# TELEGRAM-DEAL-MONITOR tick: 2026-09-29v (16:04 IST)

## Sidebar scan (one browser_evaluate over `.chat-list .ListItem.Chat`)
| Group | Latest post | Outcome |
|---|---|---|
| SB Loots And Deals | Parachute SkinPure body lotion (amazn.lt → B0FCFXML6Z) | Already LIVE (id 541) → re-verified, price fixed |
| CoolzTricks | Wonderchef 4-pc cookware @999 (amzn.to → B0DF23RXX2) | Already LIVE (id 11862); PDP ₹3,009 = DB, channel @999 not reproducible, no change |
| Rogerkart Deals | French Connection women's watch @961 (→ B0FHWS6LGZ) | Already LIVE (id 11853); PDP ₹2,741, no discount → EXPIRED |
| Dealdost / iPhone rates | BBD pre-pay passes | Skip (not a product) |
| Dealzone | Luggage up to 88% off | Skip (category link) |
| Hidden Loot | Supercoins challenge | Skip |
| IFS Tips & Tricks | ConfirmTkt cashback | Skip |
| ONLINE SHOPPING DEALS | Mancode lotion | Already seen |
| RichDeals | Our own broadcast | n/a |

## Verification (Amazon logged-in tab, same-origin PDP fetch)
| ASIN | DB | PDP | Stock / rating |
|---|---|---|---|
| B0FCFXML6Z | ₹149, no MRP | ₹184, MRP ₹465, -60% | In stock, 4.0 (291) |
| B0DF23RXX2 | ₹3,009 | ₹3,009, MRP ₹3,900 | In stock, 3.8 (355) |
| B0FHWS6LGZ | ₹961 (77% off) | ₹2,741, no strike price | In stock, 4.0 (1) |

## Fixes (prisma.update, no bulk push → slug untouched)
- **id 541 Parachute:** price 149 → 184, mrp 465, discountPct 60. Old thin copy was rewritten from PDP facts and the title ₹ was matched to the price.
- **id 11853 French Connection:** status set to EXPIRED. The page stays live with the EXPIRED banner.
- New pushes: 0 (`/admin/deals/bulk` not called).
- `tg-multi-seen.json` → 2330.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 5 urls (2 slugs + 3) |
| Deal page 541 | 200 |
| sitemap.xml / llms.txt | 200 / 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,552 = API total (−1 = expired FC watch) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11900 = DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 new, 1 price fixed, 1 expired, IndexNow 200, 0 rot.**
