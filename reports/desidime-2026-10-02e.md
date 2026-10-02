# DESIDIME-INGEST — 2026-10-02 (08:44 IST)

**30 cards → 20 junk/off-host dropped → 7 resolved → 2 already in DB → 5 fresh → 3 skipped by stage 1 → 2 Amazon re-verified → 0 pushed. No bulk call and no IndexNow ping (nothing to send).**

## Rejected

| Product | ID | Reason |
|---|---|---|
| TwinCharm matte lip colour | B0FKZC971R | ₹285, in stock with add-to-cart, but **0 ratings** (same as 10-02d) |
| Handmade earthen diya | B0GZNL1ZXP | ₹47, in stock, but **1 rating** (0-7 rule) |
| Dove serum bar soap, pack of 5 (Store1) | 52a8cdf1251c | No ld+json; personal care |
| LG 1.42T AC / Acer Aspire 14 (FK) | — | Price drift, flagged by stage 1 (repeat) |
| Stage-1 drops (20) | — | Myntra brand listing (MK watches), Cred contest app, Invicta FK non-`/p/` URL, and others |

## CEO audit (08:44 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,801 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,279 / 12,279 |
| Posts | 356; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each · 10-02: 1. CONTENT-SEO next fires at 12:09. |
| Unpushed commits | 0 before this report |

## Watch

- **Deal intake stalled.** No new LIVE deal since about 22:46 IST on 10-01 (max id 12279), across 3 DesiDime ticks in a row (10-02c/d/e). The DesiDime feed is recycling the same cards.
- The telegram-deal-monitor and deal-ingest (IFS superdeals) session crons are absent, so DesiDime is the only source running.
- The DesiDime card pool should turn over by late morning. If it is still 0 at the next tick, run an IFS superdeals sweep inline.
