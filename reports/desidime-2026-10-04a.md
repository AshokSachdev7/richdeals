# DESIDIME-INGEST — tick 2026-10-04a

Run 2026-10-03 20:45 IST. **0 pushed.** No IndexNow ping (nothing new to submit).

Stage 1 (`ingest-desidime.mjs`): 32 discovered, 15 junk/hub/app dropped, 10 product-resolved, 4 already in DB, 6 fresh. All 6 failed verification; every one is a repeat of tick 1003x and fails for the same reason.

## Rejected

| Candidate | Check | Reason |
|---|---|---|
| Mother's ginger-garlic paste (BigBasket) | no ld+json | food / perishable |
| Dental floss picks B0HKMLC62T | — | health/oral care, 0 ratings |
| Dove Dryness Care shampoo 340 ml B07HB1YHZP | PDP ₹218 / ₹435, 4.2 (3,482), In stock | low-ticket FMCG (GROCERY rule); same call as 1003x |
| IFB 1.5 T 3★ AC B0GSJLW576 | PDP ₹33,990 vs card ₹28,740 | drift (bank-offer card price) |
| GOVO GoSurround 900 B09YV5LC7F | PDP ₹4,999 vs card ₹4,185 | drift (bank-offer card price) |
| Samsung G3 24" monitor (Flipkart MONHQ5UXTGZAUPVG) | ld+json ₹8,699 vs card ₹7,829 | drift (bank-offer card price) |

DesiDime /new is surfacing the same stale set for a second straight tick. The yield right now comes from the IFS and Telegram sources.

## CEO audit

| Check | Result |
|---|---|
| Live / pending / nullPrice / nullImage | 12,005 / 0 / 0 / 0 |
| Posts / coverless / seoless | 362 / 0 / 0 |
| Posts per day (IST) | 09-25..10-01: 4, 10-02: 3, 10-03: 4 — OK |
| Prod endpoints (7) | all 200 |
| Broadcast cursor | 12484 == DB max 12484 — caught up (incl. IFS 1004a batch) |
| Unpushed commits | 0 |
