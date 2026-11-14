# TELEGRAM-DEAL-MONITOR tick — 2026-11-14c

Read the newest post of each group in `data/tg-groups.json` with one `browser_evaluate` over the logged-in Telegram Web sidebar. Run at about 22:10 IST. Kept only single-product links and deduped against `data/tg-multi-seen.json` and the live DB. Verified the one new candidate on the Amazon PDP in the logged-in tab.

**Result: 0 new deals pushed. The only fresh single-product link failed price verification. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

None.

## Candidates

| Group | Item | Finding | Action |
|---|---|---|---|
| Dealzone | MILTON Pro cook enameled grill pan 28 cm, Red, B0FCMPSGKC (link.amazon, source tag `glitzdeal05-21`) | Channel said ₹699. PDP shows ₹2,343, MRP ₹3,395 (31% off), in stock. | Rejected: the channel price is not real on the PDP, and 31% off is not a deal. Added to seen. |
| INDIAN CHEAP DEALS | LG washer B0DPHTSTYJ (new link.amazon code, same ASIN) | Seen. #5035 was verified at ₹20,990 in the 11-14b tick. | No change |
| Dealdost / ONLINE SHOPPING DEALS | Anjeer B0HMHFZ2ZM / Shatras soap B0F2M184N3 | Already pushed in 11-14b (#16501 / #16506) | Skip |

## Rejected

| Group | Item | Reason |
|---|---|---|
| SB Loots | Jeans "Upto 84% OFF", 2 links | Multi-product |
| CoolzTricks | Amazon Spin & Win | Junk |
| Rogerkart | Myntra Libas "upto 87%" | Sale hub |
| NonStopDeals | Caprese "Surf All Pages" | Category page |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | Not rendered in the virtualized sidebar |

`data/tg-multi-seen.json` now has 5,137 entries (local only, because the file is gitignored).

## Freshness

Nothing was pushed, so no IndexNow ping was needed. `sitemap.xml` (ISR 30 min) and `llms.txt` (force-dynamic) carry the 11-14b batch.

## CEO audit

See `reports/sitemon-2026-11-14c.md`, which comes from the same pass: Prod 7/7 200, LIVE 15,928 = API, cursor 16,506 = max, 0 null, 485 posts with 0 coverless and 0 seo-less, crons 9/9. **11-14 IST had only 1 post at 22:09 IST.** A blogger run was launched to publish the 2nd post before midnight.
