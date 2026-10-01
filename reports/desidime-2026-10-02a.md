# DESIDIME-INGEST — 2026-10-02 (00:43 IST)

**34 cards → 22 junk/off-host dropped → 11 resolved → 1 already in DB → 10 fresh → 7 skipped by stage 1 → 3 Amazon checked → 0 pushed.** Nothing pushed, so no bulk call and no IndexNow ping.

## Rejected

| Product | ID | Reason |
|---|---|---|
| Luxor Doodles double-decker dough pot | B0C7KP219S | PDP ₹120 vs card ₹69 (drift), no MRP, 3.6 (37) |
| Orient Proton 1200 mm BLDC fan | B0FM3V9558 | PDP ₹3,999 vs card ₹3,949 (drift >₹1) |
| Canon PIXMA G3000 | B07XH8GC5P | PDP ₹13,781 vs card ₹12,403 (drift), no MRP. Fifth reject (repeat) |
| LG 1.42T AC / Acer Aspire 14 (FK) | ACNHZ7TGCDXGRZTT / COMHPDSBJKJFC7MN | Stage 1: no ld+json (repeat) |
| Disano peanut butter (JioMart) | 44b712e3a942 | Food |
| Little's wipes / baby shampoo, Toyshine teeth (BigBasket) | — | No ld+json, low-ticket FMCG |
| Globus face wash combo (Digihaat) | e3e344d24fcb | No ld+json |
| Stage-1 drops (22) | — | Slice app promo and other junk/off-host cards |

## CEO audit (00:43 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,799 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,277 / 12,277 (synced) |
| Posts | 355; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each; 10-02 at 0 (day is 43 min old, CONTENT-SEO cron covers it) |
| Unpushed commits | 0 before this report |

No rot found. Late-night DesiDime yield is low; all Amazon candidates had moved price since posting.
