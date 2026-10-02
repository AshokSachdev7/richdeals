# TELEGRAM-DEAL-MONITOR — 2026-10-02 (15:01 IST)

**Read 13 groups from the sidebar, plus the open chat "ONLINE SHOPPING DEALS" in depth. 17 new links → 13 resolved Amazon ASINs → 2 already LIVE (both price-fixed) → 11 fresh → 5 pushed LIVE. Bulk count 5, created 5/5. IndexNow HTTP 200 for 10 urls. New deal pages return 200 on prod.**

## Pushed

Each item was checked on its Amazon product page in the logged-in tab. The price matched the channel's "Deal Price" exactly, the item was In stock, and the add-to-cart button was present.

| ASIN | Deal | Price | MRP | Rating |
|---|---|---|---|---|
| B0D6VPJ5RM | Puma Women's Exoteric WNS running shoe | ₹1,500 | ₹4,999 | 4.1 (85) |
| B07VJGFJ2N | ARISTO 70 L pedal dustbin | ₹1,312 | ₹2,999 | 4.2 (1,504) |
| B0DNMGKY6G | Beardo Power Scrub loofah | ₹100 | ₹200 | 4.2 (1,251) |
| B0CRF2W637 | Wonderchef Magneto blender | ₹3,499 | ₹12,000 | 4.1 (10) |
| B01KQGZZY8 | Maybelline Blushed Nudes eyeshadow palette | ₹475 | ₹999 | 4.1 (7,353) |

- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`. Their tags (`vivek123034-21`, `glitzdeal05-21`, `bhavesh015-21`, offertag) were stripped.
- **Images:** m.media-amazon.com.
- **Copy:** original.

## Fixed (dedup hit on a LIVE row, price had moved)

| id | Deal | Before | After |
|---|---|---|---|
| 2997 | Lifelong LLGM109 massage gun | ₹999, 71% off, "7 heads" | ₹849, 76% off, "8 heads" (matches the product page) |
| 3795 | Ant Globe 18 Type-C mouse | ₹99, 86% off | ₹89, 87% off |

The title and description were rewritten to the new price. Both slugs were included in the IndexNow ping.

## Rejected

| Item | Reason |
|---|---|
| RENEE nail-paint remover wipes B0D9KW3K8N | Channel ₹54 vs product page ₹79 |
| Orista mattress topper B0FPFB9H5N | Channel ₹2,773 vs product page ₹2,823 |
| Red Chief derby shoes B075LDSP99 | Channel ₹1,521 vs product page ₹1,711 |
| Bata slip-on slide B09W5Y1GPQ | Channel ₹274 vs product page ₹439 |
| L'Oreal gift box B0FT3MWBYN | Only 7 ratings |
| Symbol kurta pyjama set B09MR7FTBZ | No price and no add-to-cart on the product page |
| Baidyanath chyawanprash, Keya pasta, Marwadi figs, Rogerkart dry fruits | Food or health products |
| Dealdost "Retro Denim Edit" | Category post |

The Dealzone ₹89 "free OTG" post resolved to the same Ant Globe mouse (B0H4ZWC2BC), so it was covered by the price fix above. 17 link keys were added to `tg-multi-seen.json` (now 2,523 entries).

## CEO audit (15:01 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,860 (+5) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,338 / 12,333. The external cron runs every 5 min and will take the new batch on its next run. |
| Unpushed commits | 0 before this report |

No rot found.
