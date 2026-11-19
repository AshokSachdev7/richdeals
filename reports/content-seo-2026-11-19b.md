# CONTENT-SEO tick — 2026-11-19b

The tick counted posts per day in IST (`publishedAt + 5:30`). 11-19 had 1 post (#629, BOFU), so one more was due and TOFU was next in the rotation. Before writing, it checked existing post slugs for a vehicle-cover usage guide and found none; the only related post is #352 `best-car-body-covers-under-500-india-2026`, a buying list. Bike and car covers were a fresh cluster: TG 19g had just pushed a Pulsar bike cover, and several model-cut covers are LIVE. The tick skipped the saturated best-X-under-Y and free-samples clusters. Keyword research covered three queries, reading the top 3 SERP results for each. The post was written fresh, inserted through `insert-blog-mdmeta.mjs` (upsert, tags, 4/day cap guard, IndexNow ping) and given a cover by `gen-blog-covers.mjs`. Run at about 06:40–07:00 IST.

**Result: 1 post published (id 630), and IndexNow returned HTTP 200. The cover was uploaded to DO Spaces, and prod serves the post with 200, the right title and og:image. All 6 internal deal links point to LIVE rows. 11-19 IST now has 2 posts, inside the 2–3 target. Every CEO-audit check is green.**

## Post

| Field | Value |
|---|---|
| id | 630 |
| Slug | `how-to-use-bike-car-cover-without-scratching-paint-or-rust` |
| Published | 2026-11-19, about 06:45 IST |
| Title | How to Use a Bike or Car Cover Without Scratching the Paint or Causing Rust |
| seoTitle | How to Use a Bike Cover Without Scratches or Rust (49 chars) |
| seoDesc | Bike or car cover causing scratches or rust? Wipe off dust, cover only when dry and cool, pick breathable over plastic and strap it tight. Full India guide. (156 chars) |
| Tags | bike cover, car cover, two-wheeler care, car care, monsoon, winter |
| Intent | TOFU (how-to and care guide) |
| Length | 1,676 words (9,437 chars) |
| Cover | `richdeals.sfo3.digitaloceanspaces.com/og/how-to-use-bike-car-cover-without-scratching-paint-or-rust.png` (1200x630). The page sets `alt={post.title}`. |

**Structure:** the post opens with a short answer (clean, dry, cool, snug). It then covers:

- why a cover can damage paint, as a 4-row problem/cause/symptom table;
- five steps: clean first, never cover wet, let the silencer cool, pick waterproof or breathable for the parking spot (4-row table), and get the fit right;
- how to put the cover on and take it off, in 4 steps;
- washing and caring for the cover;
- a 5-row pre-cover checklist;
- an FAQ with 4 Q&As.

**Internal links:**

- 6 deal pages, all LIVE in the DB: #16895 Pulsar 150/125 BS6 cover, #13957 TVS Raider cover, #11710 Kingsway Creta cover, #16305 Kingsway TUV300 cover, #10644 Kozdiko cover with mirror pockets, #13664 Oto2eye universal UV cover;
- 1 blog post, `best-car-body-covers-under-500-india-2026`;
- `/offers`.

**Facts:** no prices or product specs are quoted. The one ₹ figure is inside the linked post's title. The heat-resistant panel advice is conditional ("only if the listing clearly says so"). Cleaning, moisture and fit guidance is general vehicle-care knowledge that the SERP results below agree on. No markdown images, so no alt text to check.

## Keyword research (top-3 SERP)

| Query | Top results | Consensus | Gap we fill |
|---|---|---|---|
| does bike cover damage paint or cause rust India | TVS blog, Neodrift, Team-BHP thread | Plastic or non-breathable covers trap condensation; covering wet causes rust; a loose, flapping cover scratches; a soft lining helps | Scattered tips with no step order |
| how to use bike body cover correctly (hot engine, moisture) | Dowco manuals, Polaris owner manual, carcover.ca | Let it cool first; heat-resistant panel; never wet-on-wet; vents; straps; air-dry the cover | US/Canada manuals with no Indian monsoon or dew context |
| waterproof vs breathable bike cover India monsoon winter dew | NDTV Shopping, Lazada SG/PH guides, NUVE | Waterproof with sealed seams for open monsoon parking; breathable for sheltered spots or dew | No parking-spot matrix, no on/off technique, no care routine |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-09 | 3 |
| 11-10 | 3 |
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| **11-19** | **2** (target met; CONTENT-SEO 12:39 may add a third, cap 4) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.19s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.57s) |
| /blog/how-to-use-bike-car-cover-without-scratching-paint-or-rust | 200 (0.72s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 06:55 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,289 = 16,289 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,897 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,897 = 16,897 | OK. The external cron finished TG 19g's batch. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK. None recreated. |

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves from 18j through 19c. If it stays dead, the first 11-20 DEAL-INGEST tick repoints the slot to reading Telegram history.
- **DesiDime:** 0 fresh deals for two ticks running.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| DESIDIME | 06:46 |
| DEAL-INGEST | 06:53 |
| TG | 07:01 |
| INDEXNOW | 07:05 |
| SITEMON | 07:14 |
| CONTENT-SEO | 12:39 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39. Session crons auto-expire 7 days after creation; if CronList comes back short, the owner says "restore all crons".
