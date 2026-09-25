# CONTENT-SEO tick 2026-09-26c (00:20 IST)

There were 0 posts on 09-26 (IST) before this tick, so 1 post was published.

## Post

- **Slug:** `/blog/wireless-power-bank-vs-wired-india-2026` (post id 391). Returns 200 live.
- **Length:** 1,522 words, with 1 H1 and H2 sections. It includes a comparison table, a deals table and an FAQ of 5 Q&As.
- **seoTitle:** "Wireless Power Bank vs Wired: Which to Buy in India" (51 characters).
- **seoDesc:** 156 characters. **Excerpt:** 143 characters.
- **Tags:** power-bank, wireless-charging, buying-guide, gadgets.
- **Publish:** `insert-blog-mdmeta.mjs` upserted the post, and IndexNow returned **HTTP 200**.
- **Cover:** `gen-blog-covers.mjs` generated it and uploaded it to `og/wireless-power-bank-vs-wired-india-2026.png`. The page template renders `alt={post.title}`, and the body has no inline images.

### Internal links

There are 4 live deal pages plus `/offers`, and all returned 200 before publishing:

- 11343: Amazon Basics 10000mAh, 20W wired + 15W wireless
- 10670: URBN magnetic power bank with kickstand
- 10154: Acer 15000mAh wireless pocket power bank (Flipkart)
- 7708: Joyroom D-M194

## Keyword choice

The power-bank cluster is saturated: there are 8 posts on capacity, fast charging, GaN and car chargers. None of them covers wireless or magnetic power banks, so this is a new angle and not a near-duplicate slug.

The SERP is thin brand blogs (Ambrane, Mobilla, Baseus, reviewsky). This post covers the gaps they leave:

- the "20W wired vs 15W wireless" spec confusion;
- the second capacity loss from wireless charging;
- how Android phones without magnets can use one (Qi2 or a magnetic case);
- Qi vs Qi2 vs MagSafe;
- heat and thick cases.

There are no fabricated stats. The only number is the 60–70% usable-capacity rule of thumb, and the post labels it as a rule of thumb.

## CEO audit

- **Deals:** 10,996 live, 0 pending, 0 with a null price, 0 with a null image. Highest id 11343.
- **Posts:** 332, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day, 09-17 → 09-26:** 3/3/3/2/1/3/2/3/4/1. No day is 0.
- **Broadcast cursor:** 11343, equal to the DB max.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this one.
