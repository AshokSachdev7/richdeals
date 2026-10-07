# DesiDime tick 2026-10-08b (02:47 IST)

Stage 1 (`ingest-desidime.mjs`) found 35 cards, resolved 21 to products, and dropped 3 already in the DB, leaving 18 fresh candidates. Each Amazon candidate was read on its product page in the logged-in Playwright tab (`#centerCol` price, `#availability` plus add-to-cart, rating). Flipkart was read from its ld+json in the browser.

## Pushed: 0

Every candidate failed a reject rule. Of the 8 Amazon cards, all 8 showed a higher price on the product page than on DesiDime.

## Rejected (18)

| Candidate | Reason |
|---|---|
| Philips HL7756 mixer grinder (B01GZSQJPA) | Drift: ₹2,999 on the PDP vs ₹2,309 on the card |
| REDTIGER F17 dash cam (B0D3PH398K) | Drift: ₹13,999 vs ₹12,600 |
| IFB 6kg front load washer (B0DFLT2Q9W) | Drift: ₹24,990 vs ₹19,140 |
| ASUS Vivobook 15 i5 (B0H8P895HL) | Drift: ₹66,990 vs ₹56,640; only 4 ratings |
| Lenovo LOQ 27in 200Hz monitor (B0H698MM7K) | Drift: ₹9,999 vs ₹8,000 |
| MSI MAG 276CXF monitor (B0DTHQ5NYF) | Drift: ₹14,499 vs ₹8,072; only 1 left; 3 ratings |
| Daikin 1.5T 3-star AC (B0GRV2DWP3) | Drift: ₹35,990 vs ₹32,490 (same as 08a) |
| Lifelong 4.2L air fryer (B0FH569G3V) | Drift: ₹1,999 vs ₹1,499 (same as 08a) |
| Haier C90 55in OLED, Flipkart (TVSHB9YYESFHJV7X) | Card-only: ld+json shows ₹1,05,009; the ₹79,009 needs a ₹26,000 bank offer |
| boAt Airdopes 311 Pro, BigBasket | Can't verify: BigBasket returns 403 Access Denied to both curl and the browser |
| Kamiliant suitcase, iPhone 17 (Flipkart) | Drift (caught by stage 1) |
| 30000mAh power bank (Flipkart) | Out of stock (caught by stage 1) |
| "3 more samples on Amazon" | Loot / ₹1 sample post |
| Dove serum bar 5-pack and 8-pack, Cetaphil SA cleanser, Nisha henna | FMCG / personal care |

## Fix

The Daikin AC and the air fryer were rejected at 08a and came back this tick, because nothing was writing to the reject list (`data/dd-rejected.json`), which stage 1 reads to skip anything rejected in the last 24h. All 17 rejected product ids from this tick were added to it (71 entries now). The BigBasket candidate has no product id in that file's format, so it can return next tick.

## Freshness

Nothing was pushed, so there was nothing to ping on IndexNow. Sitemap and llms.txt are unchanged.

## CEO audit (02:47 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1** (IST day is 2h47m old; later blog ticks cover the 2–3 target) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,225 |
| Broadcast cursor | 12741 = DB max 12741 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
