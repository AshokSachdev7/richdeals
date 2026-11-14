# CONTENT-SEO tick — 2026-11-14a

Counted posts per day in IST first. 11-14 had 0 posts, so a post was required. Ran keyword research with WebSearch, read the top-3 SERP results, and checked our own live yoga-mat deal cluster. Picked a TOFU topic outside the saturated best-X-under-Y and free-samples slug clusters. Inserted the post with `apps/api/scripts/insert-blog-mdmeta.mjs`, which upserts it, adds tags and pings IndexNow. Generated the cover with `apps/api/scripts/gen-blog-covers.mjs`. Run at about 12:39–12:54 IST.

**Result: 1 post published (id 614, 9,266 chars, 4 tags). IndexNow returned HTTP 200, the cover is uploaded, and the prod URL returns 200. 11-14 IST now has 1 post; the 18:39 IST CONTENT-SEO run owes the second.**

## Post

| Field | Value |
|---|---|
| URL | `/blog/yoga-mat-thickness-4mm-vs-6mm-vs-8mm-eva-vs-tpe-vs-nbr-india` (200) |
| H1 | Yoga Mat Thickness Guide: 4mm vs 6mm vs 8mm, and EVA vs TPE vs NBR (India) |
| seoTitle | Yoga Mat Thickness: 4mm vs 6mm vs 8mm, EVA vs TPE (India) (57 chars) |
| seoDesc | Yoga mat thickness explained: 4mm vs 6mm vs 8mm, EVA vs TPE vs NBR vs rubber, the best pick for knee pain, a 5-step home test, and live yoga mat deals. (151 chars) |
| Tags | fitness, yoga-mat, buying-guide, home-workout |
| Intent | TOFU (thickness and material questions: "4mm or 6mm", "is 8mm too thick", "EVA vs TPE", "knee pain") |
| Cover | `https://richdeals.sfo3.digitaloceanspaces.com/og/yoga-mat-thickness-4mm-vs-6mm-vs-8mm-eva-vs-tpe-vs-nbr-india.png` (alt = post title) |

Structure: a bold answer-first lead, a thickness table and a material table, question-style H2s that match the search queries, a knee-pain section, a 5-step home test, a live deals table, a care section and a 5-question FAQ. Every fact is general product knowledge or a live deal row; no stats are made up.

Internal links (9):

- 7 live deal pages: Cult 4mm EVA B0FGWBK7RF ₹398, Bodyband 4mm EVA ₹198, Symactive 4mm EVA ₹246, Fitness Mantra 6mm TPE ₹555, Amazon Basics TPE ₹661, Lifelong kids 4mm ₹289, Lifelong mat bag ₹99
- `/blog/best-yoga-mats-india-2026` (the brand-comparison post, so the two posts do not compete for the same query)
- `/offers`

## Freshness

- IndexNow: `insert-blog-mdmeta.mjs` pinged the post URL and returned **HTTP 200**.
- `sitemap.xml`: the blog child is ISR (`revalidate = 1800`), so the post appears within 30 minutes.
- `llms.txt`: force-dynamic, built from `getPosts()` on each request, so it already lists the post.
- `feed.xml`: built from the posts API, so it already carries the post.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.88s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.44s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,918 = 15,918 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 485, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,496 = 16,496 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 1 so far. The 0-post rot for 11-14 is fixed. The 18:39 IST run must publish the second post to reach the 2-3 target.

Next cron runs (IST): TELEGRAM 13:03, INDEXNOW 13:05, CONTENT-SEO 18:39, SCHEMA-AUDIT Nov 15 04:39, SEO-AUDIT-FIX Nov 15 05:58, AI-OVERVIEW Nov 18 11:39.

## Still open

- CONTENT-SEO: 11-14 IST has 1 post. The 18:39 IST run owes the second; rotate to BOFU.
- DEAL-INGEST 11-14 and DESIDIME 11-14 are unfinished. Both run next in this session.
- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses TODAY (11-14). Re-verify it.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), SilverArrow B0GD1K98VM (5 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- Bank-offer rejects B08SW56CDQ (Sennheiser) and B0H9FK9XZZ (CG Iraya) are not in `dd-rejected.json`, so they come back as candidates on every sweep.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
