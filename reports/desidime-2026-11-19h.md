# DESIDIME-INGEST tick — 2026-11-19h

Stage 1 ran `apps/api/scripts/ingest-desidime.mjs`, which reads the `/new` and homepage cards only, with no per-deal fetch. It applies the JUNK and GROCERY filters and resolves each Buy Now link through `visit.desidime.com`. Amazon candidates were verified on the PDP in the logged-in Playwright tab, and Flipkart candidates had their live price read in the tab. Non-Amazon merchants were checked with `productLd()` (±₹1, InStock). Every candidate was deduped by productId against the live DB, and duplicate LIVE rows were re-verified and price-synced. Run at about 14:30–14:53 IST.

**Result: 5 new deals pushed LIVE (HTTP 201, count 5, all `created:true`, #16929–#16933) and 4 duplicate LIVE rows repriced. 3 candidates were rejected. IndexNow returned HTTP 200 for 12 URLs. Prod returned 200 on 7 of 7 endpoints and on every new page.**

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16929 | SNOCKERS Velvet Leaf Cushion Cover 40x40 cm, Blue, Pack of 2 (B0GQMX966C) | Amazon | ₹284 | ₹499 | 43% |
| 16930 | ZEBRONICS Zeb Buds 50 Wired Earphones with Mic, Black | Flipkart | ₹300 | ₹499 | 40% |
| 16931 | STRAY88 Printed Men Wind Cheater | Flipkart | ₹799 | ₹2,699 | 70% |
| 16932 | Havok Elegant Mixer Grinder 750 W | Flipkart | ₹1,105 | ₹4,999 | 78% |
| 16933 | Maybelline Baby Lips Tinted Lip Balm, Pink Lolita + Berry Crush, Pack of 2 | Flipkart | ₹180 | ₹458 | 61% |

Affiliate links: Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`. Images are the marketplace CDN (`m.media-amazon.com`, `rukmini1.flixcart.com`). Every ₹ in titles and howTo equals the price, every ₹ in descriptions equals the price or the M.R.P., and every "N% Off" equals discountPct.

## Repriced (duplicate LIVE rows)

| Id | Deal | Old | New | Note |
|---|---|---|---|---|
| 3538 | Bajaj Celesta 5W 3-in-1 LED Downlight, Pack of 6 | ₹1,033 | ₹493 | M.R.P. nulled: the listed M.R.P. implies 84% off, which breaks the 80% rule. Title and description rewritten. |
| 4722 | Born Good Plant Based Floor Cleaner, Turkish Applewood, 3 L | ₹399 | ₹379 | M.R.P. ₹1,369, 72% off. Description rewritten. |
| 13345 | Dr. Morepen Gluco-One BG-03 Test Strips, Pack of 50 | ₹575 | ₹594 | M.R.P. ₹795, 25% off. Title, description and howTo rewritten. |
| 3221 | Kwality Corn Flakes 800 g | ₹135 | ₹150 | M.R.P. ₹375, 60% off. Only 1 left in stock. |

Each reprice wrote a `priceHistory` row. Re-verified at the same price, so nothing was written: #9894 Havells (₹3,495), #16561, #16924, #16925, #16926 and #219.

## Rejected

| Product id | Product | Reason |
|---|---|---|
| B07DYBJV19 | Bosch drill point | PDP ₹408 vs card ₹396 |
| a165264f8b7b | Hamaramall brandy glass | No ld+json, so the price can't be verified |
| CBKHEPQZ8ARJZHGG | Dettol kit | Live ₹341 vs card ₹250 |

These were written to `data/dd-rejected.json` with `Date.now()`, which now holds 2,128 entries. Four more candidates (e62745a1dad5, B0BKZVR1J8, B0F9KBZ8W3, B09YV753WH) were skipped because they were already rejected within the last 24 hours.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 12 URLs: the 5 new slugs, the 4 repriced slugs, plus the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.55s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.39s) |
| 5 new deal pages + #3538 | 200 on the first probe |

All probes used `curl -m 30`.

## CEO audit

Run at about 14:52 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,324 = 16,324 | OK (+5 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, **16928**) | OK. #16928 is a new member submission (CH95 Curcumin capsules, ₹599, 08:45 UTC). It is in the member queue for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,933 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,927 vs 16,933 | Lagging by this tick's 5 pushes plus #16928. The external broadcast cron catches up on its next run, so this is not rot. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

These items are carried forward:

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- about 95% of LIVE deals have no `priceValidUntil`, because same-price confirms write no priceHistory row (six more this tick);
- GSC traffic is down about 70% since 10-28;
- the IFS redirector is dead (12 zero ticks);
- the inflated M.R.P. list (#16784, #16792, #16891, #16882, #12328, #4927, #16246);
- the no-buy-box watch list (#9689, #15663, #14424, #16741, #16756, #3906);
- low-stock items (#16768, #16779, #12651, the Max sweatshirt, #16917 Flux, and now **#3221 Kwality, 1 left**);
- the Stage 1 Flipkart gaps;
- ASIN reuse (#2351, #15344, #6989, #4097; B0C7BM7L45 on #5577 and #7673);
- the DO API token still needs rotating.

## CronList next runs

All times are IST on 11-19:

| Job | Next run |
|---|---|
| DEAL-INGEST | 14:53 |
| TG | 15:01 |
| SITEMON | 15:14 |
| DESIDIME | 16:43 |
| CONTENT-SEO | 18:39 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58, and AI-OVERVIEW 11-25 at 11:39.
