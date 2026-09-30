# TELEGRAM-DEAL-MONITOR — 2026-09-30z (23:05 IST)

**Pushed 1 / count 1 (created:true) · IndexNow HTTP 200 (4 urls = 1 + 3)**

## Funnel
Sidebar read over 13 groups → 6 single-product candidates → 4 already in tg-multi-seen → 2 fresh → 1 already in DB → **1 pushed**

## Pushed (live, Amazon `?tag=ashoksachdev-21`)
| ID | Deal | PDP price | MRP | Off | Rating |
|---|---|---|---|---|---|
| B0753ZQDR7 | Signoraware Family Fresh Tab container set of 4 | ₹333 | ₹779 | 57% | 4.4 (3,220), 400+ bought/month |

## Skipped
- boAt Rockerz 113 (SB Loots): `amzn.lt` shortlink does not resolve (NXDOMAIN in curl + browser); already LIVE in the DB twice
- Seen already: link.amazon handbag, Syska 10000 mAh (fkrt.co), Kinsco water purifier (fkrt.pe), Rogerkart wardrobe
- Not single-product: CoolzTricks facial kits (category), Dealdost Draliet (multi-product), IFS ConfirmTkt (app promo), Hidden Loot Supercoins, Nat Habit (beauty, no link)

## Fix
- Deal id 1029 "boAt Rockerz 113 at Rs.899": the title said ₹899 but the price field was ₹999, and ASIN B0F7Y54PJX now returns Amazon 404. Set to **EXPIRED** (page stays up with the banner and is noindexed).

## CEO audit
- Prod 7/7 → 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- DB: LIVE 11,711 · EXPIRED 388 · max id 12,187 · null price 0 · null image 0 · PENDING_REVIEW 0
- Posts: 351 · coverless 0 · seo-less 0 · IST/day 09-28:4, 09-29:4, 09-30:4
- Broadcast cursor 12186 vs max 12187: the 1 row is this tick's push, which the external cron picks up next (self-heals)
- Unpushed commits: 0 before this report
