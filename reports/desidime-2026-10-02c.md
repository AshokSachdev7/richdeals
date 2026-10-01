# DESIDIME-INGEST — 2026-10-02 (04:47 IST)

**32 cards → 20 junk/off-host dropped → 12 resolved → 1 already in DB → 11 fresh → 8 skipped by stage 1 → 3 checked → 2 pushed LIVE (1 Amazon + 1 Flipkart). Bulk count 2, created 2/2. IndexNow HTTP 200 for 5 urls.**

## Pushed

| Store | ID | Deal | Live price | MRP | Off | Rating | Verified via |
|---|---|---|---|---|---|---|---|
| Amazon | B0C7KP219S | Luxor Doodles double-decker play dough pot kit | ₹69 | ₹120 | 43% | 3.6 (37) | #centerCol, In stock + ATC |
| Flipkart | JCKHFYT3FYJZSWYJ | Urbano Fashion washed men's denim jacket | ₹806 | ₹3,299 | 76% | 3.6 (169) | ld+json in Playwright, InStock |

The Luxor kit was rejected twice overnight at ₹120. Its price is back to ₹69, which matches the card, so it was pushed this tick.

Affiliate links: Amazon uses `tag=ashoksachdev-21`. Flipkart uses `affid=djhackraj`, with the salescueli params stripped. Both deals have original copy, and the new deal page returns 200.

## Rejected

| Product | ID | Reason |
|---|---|---|
| Canon PIXMA G3000 | B07XH8GC5P | PDP ₹13,781 vs card ₹12,403 (drift), and no MRP. Sixth reject. |
| Fitbit Air / LG AC / Acer Aspire 14 (FK) | — | Price drift, flagged by stage 1 |
| Digihaat mop, Globus combo; Jiomart peanut butter; Bigbasket wipes, toy teeth | — | No ld+json; food/FMCG |
| Stage-1 drops (20) | — | Junk and off-host cards |

## CEO audit (04:47 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,801 (+2) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,279 / 12,277. The gap is this batch of 2; the external tg-broadcast cron catches it up on its own. |
| Posts | 355; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each. 10-02: 0 so far. |
| Unpushed commits | 0 before this report |

**Watch item:** 10-02 has 0 posts so far, and the 00:09 CONTENT-SEO slot did not publish. The next slot is 06:09. If 10-02 is still at 0 by the 06:51 sitemon, I will publish a post inline.
