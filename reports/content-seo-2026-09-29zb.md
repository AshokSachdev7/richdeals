# CONTENT-SEO tick: 2026-09-29zb (18:22 IST)

**Result:** 1 new post is live (post id 407). Today (IST) had 3 posts before this tick and has 4 after, which is the cap.

## Keyword pick
- **Query:** "shade net percentage": 35% vs 50% vs 75% vs 90%, and which one to use for a terrace garden.
- **Why this query:**
  - The intent is informational and evergreen, not seasonal.
  - The SERP is held by small niche sites (agriplast, trinqet, sunsafenets, myowngarden). No big publisher and no Indian deal site ranks.
  - The cluster was uncovered on our site, so this is not a near-duplicate of an existing slug.
  - It follows the size/spec-guide pattern and is not another "best X under Y" post.
- **Supply:** 3 live shade-net deals exist to link to.

## Post
- **URL:** `/blog/shade-net-percentage-guide-35-50-75-90-india`, HTTP 200.
- **Body:** 1,481 words. It opens with the short answer, then covers:
  - a percentage-by-plant chart;
  - city and season advice;
  - the risks of too much shade;
  - net colour, GSM, UV treatment and stitched edges;
  - how to size the net and install it;
  - 5 FAQs.
- **SEO fields:** seoTitle is 55 characters and seoDesc is 153 characters. Both are unique.
- **Internal links:** 4, all returning 200:
  - `/essoti-75-percent-green-shade-net-10x6-ft-b0c39yvrsf`
  - `/amazon-solimo-high-density-shade-net-75-10ft-x-10ft-b0c245b77h`
  - `/essoti-multi-purpose-shade-netagrogreen-75-…-5-x-5-ft`
  - `/offers`
- **Images:** the body has no in-body images. The cover is `og/shade-net-percentage-guide-35-50-75-90-india.png`, returns 200, and is the page's og:image. The page renders the cover with alt text equal to the post title.
- **Pipeline:** published through `insert-blog-mdmeta.mjs`, then `gen-blog-covers.mjs` (1 cover).

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200** (from insert-blog-mdmeta) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,563, matches the API total (max id 11911) |
| Pending | 0 |
| Null price / null image | 0 / 0 |
| Posts | 347; 0 without a cover, 0 without SEO fields |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 4 (cap reached) |
| Broadcast cursor | 11911, equals DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

**Result: 1 post live, IndexNow 200, cover 200, no rot found.** No more BLOG posts today; the cap is 4.
