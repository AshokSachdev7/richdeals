# DESIDIME-INGEST tick — 2026-11-19k

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage. It does not fetch per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com` to the real merchant URL. Amazon candidates were then checked on the PDP in the logged-in Playwright tab: price from `#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button, and the image from the `landingAsinColor` hiRes. The one non-Amazon candidate (Myntra) was checked with `productLd()`, which requires the price within ±₹1 and InStock. Candidates were deduped by productId against the live DB. Run at about 20:43–20:51 IST (15:13–15:21 UTC).

**Result: 12 new deals pushed LIVE (HTTP 201, count 12, all `created:true`, #16954–#16965). 3 were rejected and none needed a reprice. IndexNow returned HTTP 200 for 15 URLs. Prod returned 200 on 7 of 7 endpoints and on all 12 new pages at the first probe.**

## Stage 1

Stage 1 read about 39 cards. Besides the candidates below, it skipped:

- Flipkart PLSHDVGHERMKDBSJ (Rajdhani peanut), which was out of stock and is grocery;
- 4 ASINs already rejected in the last 24 hours (AUN projector, iBELL air fryer, PHILIPS fan, iPad mini).

## Pushed

| Id | Deal | Price | M.R.P. | Off | Note |
|---|---|---|---|---|---|
| 16954 | Aliensware 4-pc XL cabinet storage organiser, clear (B0F5WXCZVB) | ₹1,585 | ₹6,999 | 77% | Card said ₹1,586, within ±₹1 |
| 16955 | Epson 664 ink bottle set, BCYM (B0H5JSSN6D) | ₹1,777 | ₹2,450 | 27% | |
| 16956 | Lenovo L22-4e 21.5" FHD IPS 100Hz monitor (B0G1T71B9Z) | ₹5,532 | ₹9,690 | 43% | |
| 16957 | FRONTECH 512GB 2.5" SATA SSD (B0DGQP66PK) | ₹5,239 | ₹12,000 | 56% | |
| 16958 | HP S5 Pro 324pv 23.8" FHD monitor (B0DSBXWSND) | ₹7,650 | ₹14,067 | 46% | |
| 16959 | ADATA 32GB DDR4 SO-DIMM laptop RAM (B086XF2SFS) | ₹20,880 | ₹39,999 | 48% | No speed claimed in the copy |
| 16960 | Lenovo L27-4e 27" FHD IPS 100Hz monitor (B0FYF4TXW3) | ₹8,364 | ₹13,790 | 39% | |
| 16961 | Canon PIXMA MegaTank G2730 ink tank printer (B0BY931HVL) | ₹9,840 | ₹13,365 | 26% | |
| 16962 | ASUS Prime B760M-A LGA1700 mATX motherboard (B0C3VZJQCV) | ₹8,776 | ₹24,000 | 63% | Only 1 left |
| 16963 | Crucial Basics 8GB DDR4-3200 SODIMM (B0GMR2577F) | ₹5,015 | none | none | The listed ₹15,000 M.R.P. was nulled as inflated |
| 16964 | HP 712w 256GB USB 3.2 flash drive, blue (B0DG8VMJ5L) | ₹2,433 | ₹4,959 | 51% | |
| 16965 | URBAN FOREST men's leather two-fold wallet (Myntra 39939918) | ₹381 | none | none | The listed M.R.P. implied 81% off, so it was nulled. InRDeals link; `productLd()` verified. |

The Amazon links are `/dp/ASIN` with `tag=ashoksachdev-21`, and the Myntra link goes through InRDeals (`inr678975705`), not Cuelinks. All images are from the marketplace CDN. Titles and descriptions were written fresh. The validators passed: every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., discountPct is under 80, and the rows with no M.R.P. have a null discountPct and no "% Off" in the title. All 12 rows came back `created:true`, so no slug restore was needed.

## Repriced

None. Two candidates hit LIVE rows, and both PDP prices already match the DB:

- #16917 (B0H9FK9XZZ, CG Iraya geyser): DB ₹3,199 = PDP ₹3,199. The card's ₹2,880 is a bank-offer price.
- #16938 (B07FD54CBQ, HIKVISION camera): DB ₹946 = PDP ₹946.

## Rejected

| Item | Reason |
|---|---|
| B0FLQ8XZS8 boAt Aavante Prime 5.1 5050D | No buy box |
| B0D6YXMY7G Booster 411 USB hub | No buy box |
| B0BQDX2MXS GLUN corrugated box, pack of 10, ₹34 | Low-ticket packaging, and the ₹399 M.R.P. implies 91% off |

`data/dd-rejected.json` went from 2,143 to 2,146 entries.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 15 URLs: 12 new slugs and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.53s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.46s) |
| New pages #16954–#16965 | 200 on all 12, first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 20:51 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,356 = 16,356 | OK (+12 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,965 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,953 vs 16,965 | Behind by this tick's 12 pushes only. It caught up on TG 19u, so the external cron is working. |
| Local API on :4000 | Up (bulk push 201) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. No day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** partial revival, 7 of 92 at DEAL-INGEST 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, and now **#16963** (Crucial RAM) and **#16965** (URBAN FOREST wallet), both nulled at push.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, and now **#16962** (ASUS motherboard, 1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-19 20:53 |
| TG | 11-19 21:01 |
| SITEMON | 11-19 21:14 |
| DESIDIME | 11-19 22:43 |
| CONTENT-SEO | 11-20 00:39 |
| INDEXNOW | 11-20 01:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
