# DESIDIME-INGEST — 2026-10-02 (10:46 IST)

**34 cards → 19 junk/off-host dropped → 12 resolved → 2 already in DB → 10 fresh → 3 dropped by stage 1 → 7 checked on the PDP → 4 pushed LIVE (all Amazon). Bulk count 4, created 4/4. IndexNow HTTP 200 for 7 urls.**

## Pushed

| ID | Deal | Live price | MRP | Off | Rating | Verified via |
|---|---|---|---|---|---|---|
| B08444Y1P4 | MILTON Gripper 750 steel water bottle | ₹205 | ₹410 | 50% | 3.8 (348) | #centerCol, In stock + ATC |
| B00T6DHFO6 | Pigeon Favourite 3 L induction pressure cooker | ₹699 | ₹1,549 | 55% | 3.8 (30,124) | #centerCol, In stock + ATC |
| B0G4GXDBR6 | Nestasia PickSip40 1.2 L tumbler | ₹999 | ₹2,499 | 60% | 4.0 (160) | #centerCol, In stock + ATC |
| B0GJMBYYLJ | Cervical roll memory foam pillow | ₹289 | ₹899 | 68% | 3.8 (19) | #centerCol, In stock + ATC |

Affiliate: `tag=ashoksachdev-21` on clean `/dp/ASIN` (DesiDime `th`/`psc` params dropped). All copy original. New deal page returns 200.

## Rejected

| Product | ID | Reason |
|---|---|---|
| Sharp 0.95 T 3★ split AC | B0GRTMHWLD | No add-to-cart, no price |
| adidas Originals gold dial watch | B0B3M28R2S | Rating 1.0 (1 rating), only 2 left |
| TCL 1.5 T 5★ split AC | B0H4M1WHYV | PDP ₹36,990 vs card ₹30,735 (drift), unrated |
| JioMart True Elements | — | Search page, no ld+json |
| LG 1.42 T AC / Acer Aspire 14 (FK) | — | Price drift, flagged by stage 1 (repeat) |
| Stage-1 drops (19) | — | Ajio Luxe employee offer, Amazon bank promotion page, and others |

## CEO audit (10:46 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,807 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,285 / 12,281. Gap is this batch of 4; the external tg-broadcast cron catches it up. |
| Posts | 356; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-24 → 10-01: 3–4 each; 10-02: 1 so far (10:46, blog cron still has the day) |
| Unpushed commits | 0 before this report |

No rot found.
