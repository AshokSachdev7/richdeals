# TELEGRAM-DEAL-MONITOR tick — 2026-09-28ar (14:03 IST)

## Scan
- One `browser_evaluate` over `.chat-list .ListItem.Chat`; all 13 source groups present.
- Only 3 groups had new posts since tick 28ao:

| Group | Post | Result |
|---|---|---|
| Dealzone | Red Tape footwear "starts at 269" | skipped: category links (`fktr.in` hubs for men/women/slides) |
| SB Loots | Nike "upto 50% + extra 20% on 3" | skipped: category link + cart offer |
| CoolzTricks | "Shoe rack @199" `amzn.to/4xSvRps` → B0HL6M6SX2 | **rejected**, see below |

- The other 10 groups show the same last post as tick 28ao (all already handled or not deals).

## Reject detail: B0HL6M6SX2
- Not in `tg-multi-seen.json`, not in the DB.
- Checked the PDP (plain and with the `smid=A1KFJ7BB1SP99Z` seller from the link): **₹1,699**, MRP ₹3,999, 58% off, in stock, add-to-cart present, seller "Arham Arts23".
- The channel claimed ₹199, **8.5× below** the real price. The listing title is only "Shoe Rack" (generic listing from "ARHAM ART") with an inflated MRP. Bait post, not a real deal, so it was not pushed.
- Added to the seen list so it is not re-checked (2,251 entries).

## Push / freshness
- Nothing pushed (count 0), so no IndexNow ping was needed.

## CEO audit (DB)

| Check | Result |
|---|---|
| Live deals | 11,339 |
| Pending review | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11686, equal to DB max 11686 |
| Prod endpoints (7) | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
