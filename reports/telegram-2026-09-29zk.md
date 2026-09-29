# TELEGRAM-DEAL-MONITOR tick: 2026-09-29zk (21:04 IST)

Read all group rows from the sidebar in one `browser_evaluate` over `.chat-list .ListItem.Chat`. Found 7 deal posts: 6 shortlinks resolved with curl; the Rogerkart link only resolved from its HTML.
Checked every Amazon product on the logged-in PDP (same-origin fetch, `.priceToPay`, `#centerCol` M.R.P., `#availability`, add-to-cart).

| Group | Product | Result |
|---|---|---|
| CoolzTricks | One Step hair dryer brush B0HDCX4LF2, ₹44 / ₹999 | **reject**: 0 ratings, looks like a glitch price |
| Dealdost | Greenfinity sabja seeds B0BWYKQ3VN, ₹99 | **reject**: food / health |
| Dealzone | Cathiya electric nail file B0H7BPYJP2, ₹379 | **reject**: rated 3.3★ |
| Rogerkart | French Connection FCN0130NRGM watch B0FHWS6LGZ, ₹2,741 (post said ₹961) | **reject**: price drift + only 1 rating |
| INDIAN CHEAP DEALS | Lavie Luxe Quaro26 satchel B0G38DGNKM | already LIVE as id 7110; PDP ₹3,459 = DB ₹3,459, no update needed |
| Loot Deals 24x7 | Syska 10000 mAh power bank PWBGGD4THDQZYAY6 | already seen; skip |
| SB Loots | Myntra "trackpants under ₹399" | **skip**: category post, not one product |

- **Push:** 0 deals. No bulk call, and no IndexNow ping needed.
- **Seen list:** 4 new IDs added to `data/tg-multi-seen.json`, now 2,349 entries.

## CEO audit (DB)
| Check | Result |
|---|---|
| Prod endpoints | 7/7 return 200 |
| Live deals | 11,575 = API total (max id 11924) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 347; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 → 09-29: 4 each |
| Broadcast cursor | 11924 = DB max |
| Unpushed commits | 0 before this report |

Result: **0 live (all 7 candidates rejected, skipped or already live), 0 rot.**
