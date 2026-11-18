# CONTENT-SEO tick — 2026-11-19a

The tick counted posts per day in IST (`publishedAt + 5:30`). 11-19 had 0 posts, so one post was due, and BOFU was next in the rotation. Before writing, it compared our live deal clusters with existing post slugs to find a gap. Sweatshirt (71 LIVE deals), hoodie (15) and sweater (9) had no post at all. It skipped the saturated best-X-under-Y and free-samples clusters. Keyword research covered three queries, reading the top 3 SERP results for each. The post was written fresh, inserted through `insert-blog-mdmeta.mjs` (upsert, tags, 4/day cap guard, IndexNow ping) and given a cover by `gen-blog-covers.mjs`. Run at about 00:40–01:00 IST.

**Result: 1 post published (id 629), and IndexNow returned HTTP 200. The cover was uploaded to DO Spaces, and prod serves the post with 200, the right title and og:image. All 11 internal deal links point to LIVE rows. 11-19 IST now has 1 post. Every CEO-audit check is green.**

## Post

| Field | Value |
|---|---|
| id | 629 |
| Slug | `sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india` |
| Published | 2026-11-19, about 00:50 IST |
| Title | Sweatshirt vs Hoodie vs Sweater: Which Is Warmest for Indian Winter? |
| seoTitle | Sweatshirt vs Hoodie vs Sweater: Which Is Warmest? (50 chars) |
| seoDesc | Fleece vs french terry vs knit: which sweatshirt, hoodie or sweater keeps you warmest in an Indian winter, what GSM to pick, and how to layer and wash them. (156 chars) |
| Tags | sweatshirt, hoodie, sweater, winter wear, buying guide |
| Intent | BOFU (comparison and buying guide) |
| Length | 1,265 words (8,043 chars) |
| Cover | `richdeals.sfo3.digitaloceanspaces.com/og/sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india.png` (1200x630). The page sets `alt={post.title}`. |

**Structure:** the post opens with a short answer. It then covers:

- what separates the three garments;
- a 6-row comparison table of fabric, warmth and breathability;
- a GSM table with 4 bands;
- a pick for each city type: north India, hill stations, mild-winter cities and office wear;
- pullover vs zip hoodie;
- live deals, with no prices quoted;
- 5 care steps;
- an FAQ with 5 Q&As.

**Internal links:**

- 11 deal pages, all LIVE in the DB: 3 fleece sweatshirts, 2 hoodies, 2 zip hoodies, 3 sweaters and the Lifelong lint remover;
- 1 blog post, the thermal-wear guide;
- `/offers`.

**Facts:** no prices or product specs are quoted. Fabric and GSM guidance is general textile knowledge that the SERP results below agree on.

## Keyword research (top-3 SERP)

| Query | Top results | Consensus | Gap we fill |
|---|---|---|---|
| fleece vs french terry | naturesfabrics, silverbobbin, necesera | Fleece is warmer (brushed pile); french terry breathes better | Vendor blogs with no India climate or city guidance |
| sweatshirt GSM guide | melbournemerch, modaknits, an Alibaba seller blog, sanvt | 280–320 is all-round; 350–400 is winter weight | No Indian city mapping; no note on listings that omit GSM |
| sweatshirt vs hoodie vs sweater | ecommercefastlane, fuaark, volcom, printful | A hoodie is a sweatshirt with a hood; a sweater is a knit; fabric decides warmth | No 3-way warmth table, no India picks, no care steps, no live deals |

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
| **11-19** | **1** (CONTENT-SEO 06:39 and later ticks will bring it to 2–3) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.40s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.66s) |
| /blog/sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india | 200 (0.55s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 01:00 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,276 = 16,276 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,883 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,883 = 16,883 | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK. None recreated. |

## Still open

- **Local API on :4000 is down.** Prod is unaffected; the blog insert goes straight to the DB.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 87 at 18j, 0 of 94 at 18k and 0 of 96 at 18l. Repoint the slot if every 11-19 tick resolves 0.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`, or unverified feature claims.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart price drift.
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** the PDP read stays mandatory for dup rows.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| DESIDIME | 00:45 |
| SITEMON | 00:50 |
| DEAL-INGEST | 00:53 |
| TG | 01:03 |
| INDEXNOW | 01:05 |
| SCHEMA-AUDIT | 04:39 |
| SEO-AUDIT-FIX | 05:58 |
| CONTENT-SEO | 06:39 |

AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
