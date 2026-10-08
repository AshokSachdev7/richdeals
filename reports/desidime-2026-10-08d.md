# DesiDime tick 2026-10-08d (06:45 IST)

Stage 1 (`ingest-desidime.mjs`) found 28 cards. 8 were dropped as junk or other-store, 20 resolved to a product, 15 were already in the DB, and **5 were fresh**.

## Pushed: 0

## Rejected (5)

| Candidate | Reason |
|---|---|
| Google Pixel 11 256GB, Flipkart (MOBHPHNV4FA6ZKGF) | Drift: PDP ₹89,999 vs card ₹71,249 (card price includes a bank/exchange offer) |
| Samsung Galaxy S25 128GB, Flipkart (MOBHQDMKYG8JCE4R) | Drift: ₹54,999 vs ₹52,249 |
| EcoLink AiroMax BLDC 1200mm fan, Flipkart (FANHPKZPXCUUY2BG) | Drift: ₹2,299 vs ₹1,300 |
| Insta360 X3, Flipkart (SAYGHU4BKRSZ88WD) | Drift: ₹24,990 vs ₹19,413 |
| OPPO Reno16c 8/128, Instamart | Location-locked (URL is pinned to `locId`/`region_id`); not a merchant we can verify site-wide |

## Freshness

- IndexNow: not pinged, because nothing was pushed.
- Sitemap and llms.txt: unchanged.

## CEO audit (06:45 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **2** (meets the 2–3 rule) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,229 |
| Broadcast cursor | 12748 = DB max 12748 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
