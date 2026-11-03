# CONTENT-SEO 2026-11-04a (00:32 IST tick)

**Result: 1 post published. `best-body-lotion-for-dry-skin-winter-india` (id 589, 1,417 words) is live on prod (200), with a cover and IndexNow HTTP 200. 11-04 IST now has 1 post, under the cap of 4. The next CONTENT-SEO run must ship 1-2 more to meet the 2-3/day rule.**

## Pre-check

- **Posts per day before the tick (IST):** 11-04 had 0, which is under the cap of 4, so 1 post was shipped.
- **Near-duplicate slug check:** searched post slugs for `lotion`, `moistur`, `dry-skin`, `winter-skin` and `body-butter`. 0 hits, so this is a new cluster, not a padded near-duplicate.
- **Funnel stage:** BOFU/TOFU hybrid. The post is a buying guide with a comparison, and it links to live deal pages. It is seasonal: November is the start of the North Indian winter.

## Keyword research

- **Primary keyword:** "best body lotion for dry skin" (India, winter intent).
- **Secondary keywords:** "body lotion vs body butter", "body oil vs lotion", "how to apply body lotion", "ingredients for very dry skin".
- **Top-ranking pages read:**
  - [stylecraze](https://www.stylecraze.com/articles/10-best-body-lotions-available-in-india/)
  - [apollopharmacy](https://www.apollopharmacy.in/blogs/article/best-body-lotion-dry-itchy-skin-india)
  - [nykaa](https://www.nykaa.com/beauty-blog/no-more-dry-spell-best-body-lotions-for-dry-skin/)
  - [curology](https://curology.com/blog/lotion-vs-body-butter-which-is-better-for-your-skin)
  - [naturium](https://naturium.com/blogs/the-lab-journal/body-oil-vs-body-lotion-vs-body-butter)
- **Gap we filled:** The Indian pages are product lists with no lotion vs butter vs oil decision rule. The US pages have the comparison but no Indian prices or products. This post combines both, adds a label-ingredient checklist and an application method, and links live verified deals.

## Post

| Field | Value |
|---|---|
| Slug | `best-body-lotion-for-dry-skin-winter-india` |
| DB id | 589 |
| Words | 1,417 |
| seoTitle | "Best Body Lotion for Dry Skin in Winter: India Guide" (52 chars) |
| seoDesc | 156 chars |
| Tags | body lotion, skincare, winter skincare, dry skin, buying guide |
| Cover | `https://richdeals.sfo3.digitaloceanspaces.com/og/best-body-lotion-for-dry-skin-winter-india.png` (alt = post title) |
| In-body images | none, so there is no alt text to check |
| Prod | `https://richdeals.in/blog/best-body-lotion-for-dry-skin-winter-india` returns 200 |

- **GEO patterns used:**
  - The short answer comes first.
  - A comparison table.
  - Numbered steps.
  - A 5-question FAQ.
  - A medical disclaimer.
  - No fabricated facts or statistics.
- **Internal links (5 live deal pages plus `/offers`):**
  - Vaseline Deep Moisture 400 ml at ₹220
  - NIVEA Shea Smooth 600 ml at ₹314
  - Parachute Advansed 400 ml ×2 at ₹275
  - BoroPlus Intense Moisture 400 ml at ₹250
  - Biotique Creamy Coconut 180 ml at ₹100

## Pipeline

- **Insert:** `insert-blog-mdmeta.mjs` printed `upserted: best-body-lotion-for-dry-skin-winter-india (id 589, 8218 chars, 5 tags)`, then `DONE: 1 inserted. IndexNow -> HTTP 200`.
- **Cover:** `gen-blog-covers.mjs` printed `DONE: 1 blog covers generated + uploaded`.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt`, plus the new post | 9/9 200 | ok |
| DB LIVE / prod API total | 15,565 / 15,565 | equal |
| DB max id | 16,122 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok (+1) |
| Posts per day (IST) | 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 is under the rule; the next run must ship |
| Unpushed commits | 0 before this report | ok |
| Crons | 9/9 (as of the 11-04a desidime tick) | ok |

## Still open

- **11-04 needs 1-2 more posts.** The next CONTENT-SEO run must ship them.
- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart and Shopsy verification is blocked, and about 22 items are held.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820, #14840 and #8856 read NULL with no add-to-cart.
  - #14396 and #16122 have null MRPs.
  - #11896 American Tourister is held.
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **The DO token needs rotating.** That is the owner's job.
