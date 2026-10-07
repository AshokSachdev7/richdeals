# DesiDime tick 2026-10-07b (10:46 IST)

Stage 1 (`ingest-desidime.mjs`): 36 cards discovered, 8 resolved to a single product, 2 already in the DB, 6 fresh (all Amazon). The rest were Ajio/Myntra "Min N% off" curated sale hubs, which were dropped.

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Nike Men Downshifter 13 Running Shoes, UK 6 (B0DV7FS4K6) | ₹2,499 | ₹4,295 | 3.7 (19) |

The Amazon PDP (same-origin fetch in the logged-in tab) shows ₹2,499, matching the card, with In stock and add-to-cart present. The image is the `#landingImage` hi-res for the selected listing.

## Rejected (5)

| Candidate | Reason |
|---|---|
| DABUR Fem handwash (B0D314FYDY) | Personal-care FMCG |
| PHILIPS PowerPro FC9352 vacuum (B072J83V9W) | Price drift: ₹8,499 on the PDP vs ₹7,650 on the card |
| STHIRA car headrest cover (B0G13VYHPV) | Price drift: ₹465 vs ₹451 |
| Bluetooth pillow speaker (B0HJYYWPS5) | Price drift: ₹246 vs ₹234, and no ratings |
| Hitachi 2 Ton 3 Star inverter AC (B0GP6PGNZM) | Price drift: ₹47,498 vs ₹41,748 |

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (1 deal slug plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | **0 at 10:46 IST.** Still flagged from the IFS tick 10-07a. The 12:09 BLOG tick has to publish 2–3. |
| Coverless posts | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
