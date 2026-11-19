# CONTENT-SEO tick — 2026-11-20a

Run at about 00:15–00:45 IST on 11-20 (18:45–19:15 UTC on 11-19). The tick checked IST posts-per-day first. 11-20 had 0 posts, which is below the 2–3 target, so it published one post.

**Result: 1 post published (#632, TOFU). IndexNow returned HTTP 200, the cover is live, and prod returned 200 on all 9 probes. The CONTENT-SEO session cron was missing from CronList, so this tick recreated it (9 of 9 jobs now).**

## Post

| Field | Value |
|---|---|
| id | 632 |
| Slug | `belt-size-guide-leather-vs-pu-vs-canvas-india` |
| Published | 2026-11-20 IST |
| Title | Belt Size Guide for India: How to Measure, Plus Leather vs PU vs Canvas |
| seoTitle | Belt Size Guide India: Measure + Leather vs PU vs Canvas (56 chars) |
| seoDesc | Belt size is usually your trouser waist plus 2 inches. Learn how to measure at home, compare genuine leather, PU and canvas belts, and shop belt deals from ₹79. (160 chars) |
| Tags | belt, belt size, leather belt, buying guide, men's fashion |
| Intent | TOFU (informational guide). The rotation follows 11-19c. |
| Length | 1,427 words |
| Cover | `/media/og/belt-size-guide-leather-vs-pu-vs-canvas-india.png`, 1200x630, from `gen-blog-covers.mjs`. Alt text is the post title. |

## Keyword research

- **Angle:** belt sizing combined with a material comparison, for Indian buyers. RichDeals has no belt post, and the angle avoids the saturated best-X-under-Y and free-samples clusters.
- **Our deal cluster:** 9 LIVE belt deals across leather, PU, canvas and stretch, priced from ₹79 to ₹774.
- **SERP read (top results):**
  - [popovleather](https://popovleather.com/blogs/from-the-workshop/best-leather-belt) covers leather grades.
  - [basicslife](https://basicslife.com/collections/belts) is an Indian brand collection page with no sizing guide.
  - [thementhing](https://www.thementhing.com/blogs/news/types-of-belts-for-men-which-style-works-for-you) covers belt styles.
  - [nimble-made](https://www.nimble-made.com/blogs/news/belt-sizes-for-men) covers the waist + 2 rule, with US framing.
- **Gap:** none of these combines a waist→belt table, at-home measurement, a leather vs PU vs canvas table and Indian price points in one page. The post fills that gap with an answer-first lede and a 5-question FAQ.

## Structure

The post is laid out as follows:

1. A short answer at the top.
2. How belt sizes work, with a waist→belt table from 28→30 to 40→42.
3. How to measure at home.
4. A table comparing leather, PU and canvas.
5. How to tell genuine leather.
6. Width and buckle.
7. Care.
8. Live belt deals.
9. A 5-question FAQ.

There are no fabricated stats or first-hand claims.

## Internal links

The post links 9 deal pages plus `/offers`. Each ₹ figure in the post was checked against the DB price, and all 9 deals are LIVE.

| Deal | Price | M.R.P. |
|---|---|---|
| #12718 Tommy Hilfiger leather | ₹774 | ₹2,999 |
| #3364 PUMA leather | ₹599 | ₹1,999 |
| #7564 GIOLYNN autolock | ₹269 | ₹1,399 |
| #4869 Urban Alfami | ₹259 | ₹1,499 |
| #3363 Puma women's synthetic | ₹449 | ₹1,499 |
| #15435 Trendy Girl PU | ₹79 | ₹699 |
| #15692 Nexbelt canvas | ₹118 | ₹999 |
| #16524 Buckleless stretch | ₹263 | ₹499 |
| #12064 Aferelle shirt stays | ₹166 | ₹599 |

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200, via `insert-blog-mdmeta.mjs` |
| `sitemap.xml` | 200. The blog child is ISR (1800s), so the post appears within 30 minutes. |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| URL | Status | Time |
|---|---|---|
| `/blog/belt-size-guide-leather-vs-pu-vs-canvas-india` | 200 | 0.67s |
| `/media/og/belt-size-guide-leather-vs-pu-vs-canvas-india.png` | 200 | 0.71s |
| `/` | 200 | 0.39s |
| `/offers` | 200 | 0.24s |
| `/blog` | 200 | 0.52s |
| `/sitemap.xml` | 200 | 0.10s |
| `/feed.xml` | 200 | 0.15s |
| `/api/deals` | 200: total 16,363, newest id 16,970 | 0.20s |
| `/llms.txt` | 200 | 0.48s |

The post's `<title>` renders correctly.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,363 = 16,363 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,970 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,970 = 16,970 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `content-seo-2026-11-20*` file existed, so this report uses suffix `a` | OK |
| Session crons vs roster | 8 of 9, CONTENT-SEO missing | **Fixed**: recreated as `449629b1` (`9 */6 * * *`) |

**Posts per day (IST):**

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
| 11-19 | 3 |
| **11-20** | **1** (day just started) |

The next CONTENT-SEO ticks (06:39 and 12:39 IST) should take 11-20 to 2–3.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DESIDIME | 11-20 00:46 |
| DEAL-INGEST | 11-20 00:53 |
| TG | 11-20 01:01 |
| INDEXNOW | 11-20 01:05 |
| SITEMON | 11-20 01:14 |
| SCHEMA-AUDIT | 11-20 04:39 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| AI-OVERVIEW | 11-25 11:39 |
