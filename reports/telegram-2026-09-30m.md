# Telegram tick — 2026-09-30m (12:06 IST)

## Scan
One sidebar read across all 13 groups in `data/tg-groups.json`.

| Group | Post | Outcome |
|---|---|---|
| ONLINE SHOPPING DEALS | Vaseline Rosy Lips tinted lip balm ₹125 (B08HN3N28W) | **Pushed** |
| ONLINE SHOPPING DEALS | Shayan mattress ₹5,728 (B0H2F4MCSZ) | Duplicate of id 11981. Price re-verified on the PDP: ₹5,728, In stock. No change. |
| Rogerkart | Zebronics Jukebar 9200 soundbar ₹6,531 (B08SVS3RKL) | Duplicate of id 11967. The PDP now says "Currently unavailable" with no add-to-cart, so **id 11967 → EXPIRED** (the page stays live with an expired banner). |
| CoolzTricks | "179" → Flipkart BSTH5HRYPSY6HXBR (Bajaj Almond Drops lotion) | Skipped: the ld+json price is ₹208, not ₹179 (drift). |
| Dealzone | "Men Shirts at 199" | Skipped: the link resolves to an Amazon `/s?` search page. |
| INDIAN CHEAP DEALS, Loot Deals 24x7, Dealdost, Hidden Loot | — | Already seen. |
| SB Loots | GAS clothing sale | Skipped: sale hub, not a single product. |
| IFS Tips, OMG | — | Skipped: app promo and chatter, no deal. |

## Push
- `/admin/deals/bulk` returned **count 1** (created: true).
- Vaseline (B08HN3N28W) PDP check: ₹125, M.R.P. ₹229, 45% off, In stock, add-to-cart present, 4.2★ (445 ratings). Image is from m.media-amazon.
- The affiliate link uses `tag=ashoksachdev-21`. The description is answer-first and built only from PDP facts.

## Freshness
- IndexNow **HTTP 200** for 5 URLs (the new deal, the expired Zebronics page, plus 3 fixed paths).
- The sitemap (ISR 1800s) and `llms.txt` (force-dynamic) are built from the API.

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,615 (+1 new, −1 expired) · PENDING 0 · LIVE with null price 0 · LIVE with null image 0 · max id 11987.
- **Posts:** 349 · coverless 0 · seo-less 0.
- **Posts per day (IST):** 09-26 = 4, 09-27 = 4, 09-28 = 4, 09-29 = 4, 09-30 = 2 at 12:06.
- **Broadcast cursor:** 11986, one behind max 11987. The deal was pushed seconds earlier and the external cron picks it up; it self-heals.
- **Prod endpoints:** 7/7 return 200.
- **Unpushed commits:** 0 before this report.
- **External blocker:** DataForSEO is paused on their side. The owner needs to email their support.
