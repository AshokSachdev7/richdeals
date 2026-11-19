# DESIDIME-INGEST tick — 2026-11-19i

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were then verified on the PDP in the logged-in Playwright Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). Flipkart candidates were verified in-tab from the ld+json `offers.price` and `availability`, with the M.R.P. read from the `"mrp"` field. Candidates were deduped by productId against the live DB, and duplicate LIVE rows were price-synced. Run at about 16:13–16:49 IST.

**Result: 4 new deals pushed LIVE (HTTP 201, count 4, all `created:true`, #16937–#16940). 1 duplicate LIVE row was repriced and 4 were re-verified with no write. 3 candidates were rejected after the PDP read and the rest were dropped as drift, non-product or junk. IndexNow returned HTTP 200 for 8 URLs. Prod returned 200 on 7 of 7 endpoints and on all 4 new pages at the first probe.**

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16937 | Noise Twist Go smartwatch, 1.39-inch, BT calling, IP68 (B0FPCZ6Q8Y) | Amazon | ₹1,599 | ₹4,999 | 68% |
| 16938 | HIKVISION wired 1080p HD 2MP security camera, white (B07FD54CBQ) | Amazon | ₹946 | ₹3,200 | 70% |
| 16939 | Glen Active Blender 350 W mixer grinder SA 4048 (MIXG496SXVUYKGP5) | Flipkart | ₹3,052 | ₹4,995 | 39% |
| 16940 | Glen SA4048MF 350 W juicer mixer grinder (MIXFB5HEKPWMHWKY) | Flipkart | ₹3,999 | ₹6,295 | 36% |

Affiliate links: Amazon `https://www.amazon.in/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`. No Myntra or Cuelinks merchant passed verification this tick. Images are the marketplace CDN (`m.media-amazon.com`, `rukminim*.flixcart.com`). Every ₹ in titles and howTo equals the price, every ₹ in descriptions equals the price or the M.R.P., and every "N% Off" equals discountPct. Spec claims that could not be confirmed on the PDP were cut before the push. Descriptions are original copy.

## Repriced (duplicate LIVE rows)

| Id | Deal | PDP | Action |
|---|---|---|---|
| 13527 | Dove Shea Butter & Vanilla hand wash, 250 ml | ₹67 / M.R.P. ₹149, in stock | **Repriced** ₹81 → ₹67 (46% → 55%). Title and description rewritten, priceHistory row added |
| 16561 | Eureka Forbes AP 175 | ₹3,599 / ₹5,999 | Same price, no write |
| 9894 | Havells ESO | ₹3,495 / ₹5,795 with the 20% coupon | Same price, no write |
| 16924 | Apple Watch Series 11 | ₹49,990 / ₹79,900 | Same price, no write |
| 16917 | CG Iraya geyser | ₹3,199 / ₹7,990 | Same price, no write. Still on the low-stock watch |

## Rejected

| Candidate | Reason |
|---|---|
| B0BN38822R Longway | DesiDime ₹1,668 vs PDP ₹1,699 |
| B07FPLKKCS boAt Aavante Bar 610 | ASIN now lands on the Bar 1500, no add-to-cart |
| B0BWS9FY8K Philips CX5535 | DesiDime card deleted, no price |
| MIXFHC2GNBFNQWZH Glen 2-jar | Stage 1 price drift |
| MOBHQDFAGHJJMSJG Lava Virat V1 Pro | Stage 1 price drift |
| Bigbasket Kent griller | No ld+json, price unverifiable |
| Cleartrip Elite | No ld+json, not a product |
| B0HPBQNPYY iPad mini | Already rejected within 24h |
| Promptwatch, Skechers category | Junk / category page |

The first three were added to `data/dd-rejected.json` (now 2,135 entries).

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 8 URLs: the 4 new slugs, the repriced Dove slug, and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.46s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.39s) |
| New page #16937 | 200 (0.16s), first probe |
| New page #16938 | 200 (0.15s), first probe |
| New page #16939 | 200 (0.18s), first probe |
| New page #16940 | 200 (0.17s), first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 16:49 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,331 = 16,331 | OK (+4 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,940 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,936 vs 16,940 | Behind by this tick's 4 pushes only. The external broadcast cron catches up on its next run, so this is not rot. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil` (four more same-price confirms this tick).
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for thirteen ticks in a row.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 (CG Iraya geyser), #3221 Kwality (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| DEAL-INGEST | 16:53 |
| TG | 17:01 |
| SITEMON | 17:14 |
| CONTENT-SEO | 18:39 |
| DESIDIME | 18:43 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
