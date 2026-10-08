# DesiDime tick 2026-10-08f (10:50 IST)

Stage 1 (`ingest-desidime.mjs`: discover, resolve, DB dedup): 36 discovered, 23 resolved, 5 already in DB, **18 fresh**. I checked every candidate on its product page: Amazon in the logged-in Playwright tab (`#centerCol` price, `#availability` + add-to-cart, rating), Flipkart via ld+json in a browser tab.

## Pushed: 3 (`/admin/deals/bulk` count 3, all created:true, status live, ids up to 12772, prod 200)

| Deal | Price | MRP | Rating | Affiliate |
|---|---|---|---|---|
| Mini karaoke machine for kids, wireless mic, Blue (B0D2Q8WFPY) | ₹284 | ₹999 | 4.6 (79) | Amazon `tag=ashoksachdev-21` |
| Lucent's General Knowledge + GK 2025, set of 2 books (RBKHHB9HFGZA2RWE) | ₹90 | ₹360 | 4.2 (213) | Flipkart `affid=djhackraj` |
| Dollar Lehar men's cotton vest, pack of 4, White (VESGWV8ZPGNFRREF) | ₹159 | ₹459 | 4.2 (1,43,394) | Flipkart `affid=djhackraj` |

The deal copy uses only facts from each product page. The karaoke image is keyed to the landing colour ("Blue 1 MIC"). The DesiDime card said Light Purple, but the PDP opens on Blue.

## Rejected (15)

| Candidate | Reason |
|---|---|
| IFB 8kg washer (B0DCNVBFCL) | Drift: PDP ₹36,989 vs card ₹28,739 |
| realme Buds Air 8 Pro (B0H2D5V4LG) | Drift: ₹6,699 vs ₹5,330 |
| Philips rope accessory (B0CQYWFN88) | Drift: ₹1,223 vs ₹253 |
| Sony BRAVIA Theatre Bar 7 (B0GSBYNNX1) | Drift: ₹64,989 vs ₹56,239 |
| iQOO Z11 Lite (B0H1WY1D37) | Drift: ₹19,497 vs ₹15,499 |
| Haier 520L fridge (B0GWMFZ5SX) | Drift: ₹80,990 vs ₹59,140 |
| DIY crafts kit (B08QSK1J2N) | No buy box, no add-to-cart |
| Tesla M40 GPU (B0G1PKHMQ2) | No price, no rating, junk seller |
| Atomberg Efficio Alpha fan (FANHFPVYPMJUBN5Z) | Drift: ₹2,497 vs ₹2,100 |
| MacBook Air M5 16/1TB (COMHZQX4HPH9XUPZ) | Drift: ₹1,64,990 vs ₹1,50,480 |
| Acer Nitro 5 i5 14450HX (COMHPCMUDZ93GZRY) | Drift: ₹1,34,990 vs ₹1,09,140 |
| Portronics POR 2192 keyboard (ACCHFQXZUNFEKNQJ) | Drift (flagged in stage 1) |
| Myntra CMF Headphone Pro | Drift (flagged in stage 1) |
| Myntra Sony WH-CH720N | Drift (flagged in stage 1) |
| Santoor soap 6x125g (SOPFVSQJ2PPHPCNY) | FMCG |

## Freshness

- IndexNow: **HTTP 200**, 6 URLs (3 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (10:50 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **2** (meets the 2–3 target; later BLOG ticks can add one more) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,253 |
| Broadcast cursor | 12769 vs DB max 12772: the 3 new rows, which the external cron will pick up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
