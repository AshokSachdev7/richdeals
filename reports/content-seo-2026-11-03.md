# CONTENT-SEO 2026-11-03 (08:42 IST)

**Result: 3 original posts are LIVE (ids 585–587) and all 3 have covers. IndexNow returned HTTP 200. 11-03 IST now has 3 posts, which clears the blog rot for today. 11-02 still has 0 posts, and that cannot be backfilled.**

## Posts published

| id | Slug | seoTitle (chars) | seoDesc | Words | Internal links |
|---|---|---|---|---|---|
| 585 | `period-panties-vs-sanitary-pads-which-to-use-india` | Period Panties vs Sanitary Pads: Which Is Better? (India) (57) | 158 | ~1,510 | 5 deals + /offers |
| 586 | `how-to-make-perfume-last-longer-india-humid-weather` | How to Make Perfume Last Longer in Indian Heat (9 Tips) (55) | 156 | ~1,250 | 5 deals + /offers + 1 post |
| 587 | `geyser-size-guide-litres-by-family-bathroom-india` | Geyser Size Guide: How Many Litres for Your Family? (51) | 159 | ~1,260 | 6 deals + /offers + 2 posts |

Every post has:
- a "Short answer" opening;
- the keyword in the first 100 words;
- H2 sections;
- one comparison or size table;
- a 5-question FAQ.

Excerpts run 156–158 characters.

## Keyword research

I ran WebSearch on each topic and read the top SERP results. Each topic was checked against all existing slugs, and none of them duplicate an existing post. Each topic fills a gap next to deal clusters we already have:

- **Period panties vs pads:** we have live deals for Plush, Carmesi, Stayfree and Whisper. The SERP is dominated by reusable-panty brands, and none of the top results compare the disposable kind.
- **Perfume longevity in humid weather:** this question-intent query sits next to our perfume-combo deals and the existing `edp-vs-edt-vs-body-spray-india-2026` post.
- **Geyser size:** this is a seasonal winter query, and the geyser cluster is active (#13962–#15877). It cross-links the instant-vs-storage and electricity-consumption posts.

## Link check before publish

- All 17 unique deal and `/offers` links returned 200 on prod.
- The perfume post linked `/blog/edp-vs-edt-vs-body-spray-difference-india`, which returned **404**. I fixed the link to the real slug, `/blog/edp-vs-edt-vs-body-spray-india-2026`, which returns 200.
- The two geyser cross-link posts both return 200.
- The perfume seoDesc was first 165 characters. I trimmed it to 156.

## Freshness

- `insert-blog-mdmeta.mjs` upserted all 3 posts with 5 tags each. **IndexNow returned HTTP 200.**
- `gen-blog-covers.mjs` generated and uploaded 3 covers to DO Spaces (`og/<slug>.png`). Coverless posts: 0.
- All 3 post URLs return 200 on prod.
- sitemap.xml is ISR 1800s and llms.txt is force-dynamic. Both return 200.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | all 200 | ok |
| DB LIVE / prod API total | 15,419 / 15,419 | equal |
| DB max id | 15,977 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 458 / 0 / 0 | ok |
| Posts per day (IST) | 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:3 | 11-02 missed |
| Broadcast cursor | 15,955 vs max 15,977. It moved up from 15,950, so it is draining. | ok |
| Unpushed commits | 0 | ok |

## Still open

- **11-02 IST shipped 0 posts.** No CONTENT-SEO tick ran that day. This tick fixes 11-03, but the gap on 11-02 stays.
- The Playwright MCP is hung and reticle is down. Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified.
- #15898 needs a price read. JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual check.
- The DO token needs rotating. That is the owner's job.
