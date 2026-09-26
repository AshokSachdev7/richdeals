# TELEGRAM-DEAL-MONITOR tick 2026-09-26av (19:05 IST)

**1 deal pushed LIVE: Kesh King Gold Advanced Hair Growth Serum 30 ml, ₹389 / M.R.P. ₹599 (35% off), id 11508. `/admin/deals/bulk` returned count 1 (created). IndexNow HTTP 200 for 4 URLs (1 slug + 3).**

## Sweep
- Playwright profile richDeals, `web.telegram.org/a/`, one `browser_evaluate` over `.chat-list .ListItem.Chat` (title + last message per row).
- 12 of 13 groups from `data/tg-groups.json` visible; NonStopDeals not rendered (virtualised list).
- Shortlinks (`amzn.to`, `link.amazon`, `amazn.lt`, `fkrt.co`) resolved with curl `-L`, then dedup vs `data/tg-multi-seen.json` and the live DB (Prisma, by productId).
- KeshKing B0FLQ4135Z (CoolzTricks) re-read on the PDP in the logged-in Amazon tab: `#centerCol` ₹389 (matches the channel), M.R.P. ₹599, add-to-cart present, no clip coupon, 4.0★, `data-old-hires` image `61TzkWQ+LTL`.
- Copy is original, 3 sentences; brand clinical claims were not repeated as fact.
- `/out/11508` → 302 `https://www.amazon.in/dp/B0FLQ4135Z?tag=ashoksachdev-21`. Prod deal page 200.

## Rejected
| Group | Item | Reason |
|---|---|---|
| ONLINE SHOPPING DEALS | Halonix 10W LED B07LC95P6C | Seen; live id 3429 (DB ₹109 vs post ₹89, stale price) |
| Dealdost | Onida 55" QLED B0FJ8FW86L | Seen; live id 11024 (DB ₹43,499 vs post ₹39,749, stale price) |
| Dealzone | Lakme foundation B018HSHG4E | Seen; live id 4078 (DB ₹307 vs post ₹285, stale price) |
| SB Loots | Vivel soap 4-pack B086LNGH5C | Seen; live id 2607 (DB ₹149 vs post ₹145) |
| INDIAN CHEAP DEALS | Ladies handbag B0G38DGNKM | Seen; live id 7110 |
| Loot Deals 24x7 | Syska 10000 mAh power bank (Flipkart PWBGGD4THDQZYAY6) | Seen earlier, not in DB |
| Rogerkart | Wonderland cashew | Grocery |
| IFS Tips | Swiggy Instamart | Search link, not a product |
| Hidden Loot | Supercoins challenge | Junk |
| Deal Dibba / OMG | t.me join spam / "video dekho paisa kamao" | Junk |

Seen file: 2,084 → 2,085.

**Stale-price note:** Halonix, Onida and Lakme are live above today's channel price. A repricing pass should catch them.

## Freshness
- **IndexNow:** HTTP 200, 4 URLs.
- **Sitemap:** 10,481 `<loc>` (ISR 30 min, the new slug lands on the next rebuild).
- **llms.txt:** 200, dynamic.

## CEO audit
- **Prod:** all 7 endpoints 200, all ≤0.56 s.
- **Deals:** 11,161 live, 0 pending review, 0 null price, 0 null image. DB max 11508.
- **Posts:** 335, 0 coverless, 0 seoless. Posts per IST day 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. Today at the cap.
- **Broadcast cursor:** `lastId` 11502 vs DB max 11508. The external cron is draining it, not rot.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. 1 deal shipped and pinged.
