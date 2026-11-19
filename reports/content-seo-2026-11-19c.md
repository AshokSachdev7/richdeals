# CONTENT-SEO tick — 2026-11-19c

The tick counted posts per day in IST (`publishedAt + 5:30`). 11-19 had 2 posts (#629 BOFU, #630 TOFU), which is inside the 2–3 target, so a third was allowed under the cap of 4. BOFU was next in the rotation. Headphones were picked because RichDeals has a deep set of LIVE on-ear and over-ear deals and only adjacent audio posts (ANC dB ratings, USB-C vs 3.5 mm). No existing slug covered the on-ear vs over-ear choice. The saturated best-X-under-Y and free-samples clusters were skipped. Keyword research ran WebSearch on two queries and read the top SERP results before writing. The post was written fresh, inserted through `insert-blog-mdmeta.mjs` (upsert, tags, 4/day cap guard, IndexNow ping) and given a cover by `gen-blog-covers.mjs`. Run at about 12:39–12:50 IST.

**Result: 1 post published (id 631), and IndexNow returned HTTP 200. The cover was uploaded to the new GCS media bucket and returns 200 at `richdeals.in/media/og/…`. Prod serves the post with 200, the right title and og:image. 11-19 IST now has 3 posts. Every CEO-audit check is green.**

**Fix shipped: `gen-blog-covers.mjs` was broken by the GCS media migration** (owner commit cd6e79a). The first run failed with `ENOTFOUND richdeals-media.auto.digitaloceanspaces.com`, because the script hardcoded the DO Spaces endpoint while `.env` now points `SPACES_*` at GCS. The script now uses the same pattern as `apps/api/src/auth/upload.ts`:

- it reads `SPACES_ENDPOINT`, and falls back to DO Spaces when that is unset;
- it sends `ACL: public-read` only to DO Spaces, because GCS uniform access rejects per-object ACLs;
- it sets `requestChecksumCalculation: 'WHEN_REQUIRED'` for GCS S3 interop.

Without this fix, every future post would have been published coverless.

## Post

| Field | Value |
|---|---|
| id | 631 |
| Slug | `on-ear-vs-over-ear-headphones-which-to-buy-india` |
| Published | 2026-11-19, about 12:45 IST |
| Title | On-Ear vs Over-Ear Headphones: Which Should You Buy in India? |
| seoTitle | On-Ear vs Over-Ear Headphones: Which to Buy in India (52 chars) |
| seoDesc | On-ear or over-ear headphones? Compare comfort, noise isolation, heat, portability and calls, then pick from live Sony, boAt, Philips and pTron deals in India. (159 chars) |
| Tags | headphones, on-ear headphones, over-ear headphones, buying guide, audio |
| Intent | BOFU (comparison with live deal tables) |
| Length | 1,595 words (9,793 chars) |
| Cover | `richdeals.in/media/og/on-ear-vs-over-ear-headphones-which-to-buy-india.png` (1200x630, 200, image/png). The page sets `alt={post.title}`. |

**Structure:** the post opens with a bold short answer. It then covers:

- a 7-row on-ear vs over-ear comparison table;
- comfort, heat in Indian summers, ANC vs ENC, portability, sound, calls and wired vs wireless;
- a live on-ear deals table (5 rows) and a live over-ear deals table (7 rows), each with a best pick;
- a 6-point decision checklist;
- an FAQ with 4 Q&As.

**Internal links (15):**

- 12 deal pages: #3742 Sony MDR-ZX110A, #14392 boAt Bassheads 900, #5873 Portronics Muffs A3, #11878 Philips TAH4050-RT, #16489 Sony WH-CH520, #16526 Booma Echo, #13809 pTron Studio, #13601 Amazon Basics Pro ANC, #15116 boAt Rockerz 550, #15556 JBL Quantum 100, #16776 HAMMER Bash Pro, #16377 Sony WH-1000XM5;
- 2 blog posts: `anc-db-rating-explained-32db-vs-50db-hybrid-noise-cancellation-india` and `usb-c-vs-3-5mm-wired-earphones-which-to-buy-india`;
- `/offers`.

**Facts:** every price, M.R.P. and spec in the deal tables comes from the deal rows. The post states that prices are as checked when each deal was posted and should be confirmed on the store page. Comfort, seal, ANC and ENC guidance is general audio knowledge that the SERP results agree on. The post has no markdown images, so there is no in-body alt text to check.

## Keyword research

| Query | Use |
|---|---|
| on-ear vs over-ear headphones which to buy India | Primary intent. The SERP results compare comfort, isolation and portability, but none ties the comparison to live Indian prices or Indian heat. |
| how to choose wireless headphones India buying guide codec battery ENC | Supporting sections: ANC vs ENC, wired fallback and dual pairing for calls. |

**Gap we fill:** live on-ear and over-ear deal tables at every budget (₹516 to ₹19,989), a heat section for Indian summers, the ANC vs ENC confusion on budget listings, and a decision checklist.

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
| **11-19** | **3** (target met, under the cap of 4) |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.50s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.40s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,306 = 16,306 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,914 = 16,914 | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Still open

These items are carried from SITEMON 19l and are unchanged by this tick:

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- 95% of LIVE deals have no `priceValidUntil`;
- GSC traffic is down about 70% since 10-28;
- the IFS redirector is dead;
- the inflated M.R.P. list;
- the no-buy-box watch list;
- low-stock items;
- the Stage 1 Flipkart gaps;
- ASIN reuse;
- the DO API token still needs rotating.
