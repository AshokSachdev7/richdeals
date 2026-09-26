# TELEGRAM-DEAL-MONITOR tick 2026-09-26bg (23:04 IST)

**2 deals pushed LIVE (1 Amazon, 1 Flipkart). `/admin/deals/bulk` returned 201 with count 2 and created both. IndexNow returned HTTP 200 for 5 URLs (2 slugs + 3).**

## Sweep
- One `browser_evaluate` over `.chat-list .ListItem.Chat` read the newest post from all 13 groups in `data/tg-groups.json`.
- Shortlinks were resolved with curl, following the redirect hop by hop:
  - `amzn.lt`, `amzn.to`, `fkrt.cc`: one hop to the store URL.
  - `link.amazon`: goes through `amzlinks.in` before the store URL.
  - `fkrt.co`: goes through `fkrt.it` before the store URL.
- Dedup was checked against both `data/tg-multi-seen.json` and the live DB (Prisma, by `productId`).

## Pushed (ids 11527–11528)
| Group | Store | Product | Price / M.R.P. | Check |
|---|---|---|---|---|
| Dealdost | Amazon | Swiss Beauty Glow Fusion 10% vitamin C serum, 30 ml | 249 / 499 | `#centerCol` shows ₹249 and "lowest price in 30 days"; add-to-cart present; no clip coupon; 4.3★ (58) |
| CoolzTricks | Flipkart | realme TechLife 32" QLED HD Ready smart TV | 9,899 / 22,999 | ld+json shows ₹9,899, InStock, 4.3★ (8,931 ratings) |

- All copy is original: 3 sentences each plus a variant note.
- Images come from `m.media-amazon.com` or `rukmini1.flixcart.com`.
- `/out/11527` redirects to `/dp/B0FLXKG1QV?tag=ashoksachdev-21`.
- `/out/11528` redirects to `?pid=TVSHPCXWC8Y9UYSU&affid=djhackraj`.

## Skipped
| Group | Post | Reason |
|---|---|---|
| SB Loots | Wipro 6A bell push ×20 @518 (B0BNNG2QQP) | Already live as id 7988 (DB ₹761, so the listing is stale-high) |
| Dealzone | Panasonic 9W bulb ×2 @94 (B0CCL6ML79) | Already live as id 246 (DB ₹99) |
| INDIAN CHEAP DEALS | Handbag B0G38DGNKM | Already seen (live as id 7110) |
| Loot Deals 24x7 | Syska 10000 mAh power bank | Already seen |
| ONLINE SHOPPING DEALS | Roff Cera Clean | Pushed in 26bd |
| Rogerkart | Wonderland cashew | Grocery |
| Hidden Loot / IFS Tips / Deal Dibba / OMG | Supercoins, Instamart, join-channel, "video dekho" | Not a product |

The seen file now holds 2,106 entries: the 2 pushed ids plus the 2 already-live ids.

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs.
- **Sitemap:** 10,496 `<loc>`. It is ISR with `revalidate = 1800`, so the 26bf and 26bg rows land on the next regeneration.
- **llms.txt:** 200. It is dynamic, so it already includes the batch.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.50 s.
- **Deals:** 11,181 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11528.
- **Posts:** 335, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. No day is 0.
- **Broadcast cursor:** `lastId` is 11526, against a DB max of 11528. That gap is this batch, which the external cron drains.
- **Git:** 0 unpushed commits before this commit.
- **Stale-price backlog:** Wipro id 7988 is ₹761 in the DB against ₹518 on the channel. This joins Vatika and HRX Kyoto from 26au. A repricing pass is still owed.

Verdict: green. 2 deals shipped and pinged.
