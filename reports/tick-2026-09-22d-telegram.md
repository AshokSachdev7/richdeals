# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 03:47 IST

**Result: 0 published.** One new candidate since the 02:05/03:03 sweeps; it failed verification. No batch → no IndexNow ping (correctly skipped).

Read: one `browser_evaluate` over `.chat-list .ListItem.Chat` in the logged-in Playwright profile `richDeals` (tab 0). 25 rows, 13 of them sanctioned groups from `data/tg-groups.json`.

## Triage

| Group | Newest post | Action |
|---|---|---|
| RichDeals | our own Police trolley broadcast | own channel — skip |
| SB Loots And Deals | "not getting notifications" setting post | not a deal |
| CoolzTricks Official | HP Travel Hub USB-C @1186 | already live (#10836, B0D95QS6DQ) |
| Rogerkart Deals | Police Cabin Trolley 65L @₹1,599 | already live (#10838, B0GS9N5KRP) |
| Dealzone | "Upto 88% Off branded shoes" + 6 brand links | multi-product category — skip |
| ONLINE SHOPPING DEALS | Clensta shampoo+conditioner ₹399 | already live (#10837, B0GSKLW894) |
| Dealdost | "Loot: mobile protection starts 199" | loot/category — skip |
| IndiaFreeStuff Tips & Tricks | "Swiggy Instamart loot, search Let's Try" | search post — skip |
| Hidden Loot Deals | "Zepto loot, search Jensons" | search post — skip |
| Deal Dibba | "₹14 : join channel" | junk — skip |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500 → `link.amazon/B05yvriRF` → **B0G38DGNKM** | already live as **#7110** ₹3,459 — dup |
| OMG LOOTDEALS | "video dekho paisa kamao" | junk — skip |
| **Loot Deals 24x7** | **Syska 10000 mAh Power Bank ₹799**, `fkrt.co/l5KOxl` | **new — verified, rejected** (below) |

## The one candidate

`fkrt.co/l5KOxl` → `flipkart.com/syska-10000-mah-power-bank-fast-charging/p/itm4cfc25dfd4dc7?pid=PWBGGD4THDQZYAY6` (their `affid=adminpais` + `affExtParam1/2` stripped). `pid` fresh against the live DB.

PDP read in the Playwright tab (curl gets a 403 reCAPTCHA on Flipkart):

- **Out of stock** on the Elegant Black variant the pid points at.
- Price **₹1,388** (MRP ₹1,799, 23% off), not the ₹799 the channel claimed — 74% drift.
- No ld+json `Product` block on this page at all; price had to come off the rendered DOM.

Rejected on both counts. Added to `data/tg-multi-seen.json` (already present — a prior tick had seen and rejected the same post).

## Unlisted group, still not actioned

`𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦 𝗨𝗣𝗗𝗔𝗧𝗘𝗦` (`-1004400885213`) again posted a single-product Tata Cliq link (`bilty.co/njBm8j`). Right shape, Cuelinks-eligible, but the group is **not in `data/tg-groups.json`** — that list was deliberately re-verified 2026-09-13. Flagged for the owner a second time rather than silently widening the source list.

## CEO audit

| Check | Value | Status |
|---|---|---|
| posts/day IST | 09-17=2 09-18=3 09-19=3 09-20=2 **09-21=1** 09-22=3 | 09-21 short (known, unfixable) |
| coverless / seo-less posts | 0 / 0 | OK |
| LIVE deals | 10,491 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| PENDING_REVIEW | 0 | OK |
| tg-broadcast cursor | 10838 = DB max | OK |
| unpushed commits | 0 | OK |

**Standing structural risk (unchanged):** all of this runs only while this Claude session is open — `schtasks` has no richdeals entries, session crons are in-memory. Task Scheduler wiring was offered and never approved, so nothing was changed.
