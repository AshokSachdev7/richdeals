# CONTENT-SEO tick — 2026-11-15a

Checked posts per day in IST first: 11-15 IST had 0 posts, so 1 post was needed. The last two posts (lunch box, yoga mat thickness) were explainer and TOFU, so this one is BOFU. Keyword research covered WebSearch, the top-3 SERP pages and our own live blanket deals. The post went in through `insert-blog-mdmeta.mjs` (IndexNow ping) and got its cover from `gen-blog-covers.mjs`. Run at about 00:40 IST.

**Result: 1 BOFU post published, `/blog/mink-vs-sherpa-vs-fleece-vs-microfibre-blanket-which-is-warmest-india` (post id 616, 1,465 words). IndexNow HTTP 200. Cover uploaded to DO Spaces. Prod returns 200 for the post and 7/7 endpoints. Every DB check is green.**

## Post

| Field | Value |
|---|---|
| URL | /blog/mink-vs-sherpa-vs-fleece-vs-microfibre-blanket-which-is-warmest-india |
| H1 | Mink vs Sherpa vs Fleece vs Microfibre Blanket: Which Is Warmest for Indian Winters? |
| seoTitle | Mink vs Sherpa vs Fleece Blanket: Which Is Warmest? (51 chars) |
| seoDesc | 154 chars, unique |
| Tags | blanket, winter, buying-guide |
| Intent | BOFU comparison (choosing which blanket to buy) |
| Cover | `og/mink-vs-sherpa-vs-fleece-vs-microfibre-blanket-which-is-warmest-india.png`. Served as og:image, and the page alt text is the post title |

## Keyword research

- Head query: "mink vs sherpa vs fleece blanket" plus the "which is warmest" variants. It is seasonal, peaks November to January, and Indian intent is rising.
- Top-3 SERP: housedigest, puffy and bedgear. All three are US-centric. None of them gives GSM or kg figures, India climate or city guidance, INR prices, or explains that Indian "mink" is a polyester pile finish.
- Our gap: a weight and GSM chooser by city, a comparison table, care tips, an FAQ, and live deal prices taken from our DB rows.
- Cannibalisation check: the comforter/quilt/dohar GSM guide covers bedding types, and the thermal and electric-blanket posts cover adjacent topics. None of them compares blanket finishes, so this is not a near-duplicate slug. The post links to all three.

## Internal links (all verified in the DB)

- 10 deal pages, all LIVE, each price matching the copy: #12354, #16514, #12356, #13237, #16555, #11082, #15034, #16500, #16264, #15192.
- 3 blog posts: comforter-vs-quilt GSM guide, thermal wear guide, electric blanket safety guide.
- `/offers`.

## Freshness

- IndexNow: `insert-blog-mdmeta.mjs` returned **HTTP 200**.
- `sitemap.xml`: the blog child is ISR, at most 30 min stale.
- `llms.txt`: force-dynamic, so it already carries the post.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.97s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.68s) |
| new post | 200 (0.74s). Title and og:image are correct |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,989 = 15,989 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,567 = 16,567 | OK. The backlog has drained |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run should add a second post (TOFU) to reach the target of 2 to 3.

## Still open

- 11-15 IST is 1/2. The next CONTENT-SEO run at 06:39 IST must publish a TOFU post.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Same-price confirm paths in the other ingests still write no priceHistory row.
- Low-stock rows to re-check: #16506 Shatras, Symbol shorts B0F79NPMPQ, plus earlier carry-overs.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
