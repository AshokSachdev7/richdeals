# Telegram tick — 2026-09-30b

Read the sidebar of all 13 source groups in one call. 8 candidates came up. **0 passed. Nothing was pushed, so there was no IndexNow ping.**

| Group | Post | Resolved to | Result |
|---|---|---|---|
| Dealdost | "FAST ₹99" | Amazon B0BWYKQ3VN | Already seen |
| ONLINE SHOPPING DEALS | Presto kitchen towel roll ₹179 | Amazon B0DKFT4FVB | Already seen |
| ONLINE SHOPPING DEALS | Tasty Nibbles masala prawns ₹150 | — | Rejected: food |
| Rogerkart | French Connection women's watch ₹961 | Amazon B0FHWS6LGZ | Already seen |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 | Amazon B0G38DGNKM | Already seen |
| Loot Deals 24x7 | Syska 10000 mAh power bank ₹799 | Flipkart PWBGGD4THDQZYAY6 | Already seen |
| CoolzTricks | Myntra ₹4,247 | Daniel Klein watch, Myntra 34655290 | Rejected: 0 ratings, 0 purchases (price matches, 8 in stock) |
| SB Loots | Wonderchef Hydro Bottle 1 L ₹249 | amzn.lt fails DNS | Rejected: can't find the product; Amazon search shows no ₹249 listing |
| Dealzone | "197" | Shopsy VDTech "airpods" clone | Rejected: no-name knockoff |

Added 4 ids for the rejected posts to `tg-multi-seen.json` (now 2356 entries).

## CEO audit
- Prod endpoints: 7/7 return 200.
- Live deals 11573, same as the API total. Pending 0, nullPrice 0, nullImage 0.
- Posts: 348 total, 0 without a cover, 0 without SEO fields. 1 post on 09-30 (IST).
- Broadcast cursor 11942 = max deal 11942. Fully caught up.
- Unpushed commits: 0.
