# DESIDIME-INGEST — 2026-10-02 (02:43 IST)

**30 cards → 19 junk/off-host dropped → 10 resolved → 1 already in DB → 9 fresh → 8 skipped by stage 1 → 1 Amazon checked → 0 pushed.** Nothing was pushed, so the bulk call and the IndexNow ping were skipped.

## Rejected

| Product | ID | Reason |
|---|---|---|
| Luxor Doodles dough pot | B0C7KP219S | PDP still ₹120 vs card ₹69 (drift; same as 10-02a) |
| Google Fitbit Air (FK) | SBNHR38GGZKBSRAS | Stage 1: price drift |
| LG 1.42T AC / Acer Aspire 14 (FK) | ACNHZ7TGCDXGRZTT / COMHPDSBJKJFC7MN | Stage 1: price drift (repeat) |
| Self-squeeze mop, Globus face wash combo (Digihaat) | 802c72a26d04 / e3e344d24fcb | No ld+json |
| Disano peanut butter (JioMart) | 44b712e3a942 | Food, no ld+json |
| Little's wipes, Toyshine teeth (BigBasket) | — | No ld+json, low-ticket FMCG |
| Stage-1 drops (19) | — | Pop UPI app promo and other junk/off-host cards |

## CEO audit (02:43 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,799 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,277 / 12,277 (synced) |
| Posts | 355; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each; 10-02: 0 so far (02:43, CONTENT-SEO cron covers it) |
| Unpushed commits | 0 before this report |

No rot. The DesiDime feed barely changed between ticks overnight (the same 9 fresh cards as 10-02a, minus Orient and Canon, plus Fitbit and the mop).
