# CONTENT-SEO tick 2026-09-26b (06:21 IST)

**1 post shipped. Today (IST) now has 2 posts, up from 1.**

## Post
- **URL:** https://richdeals.in/blog/trolley-bag-set-of-3-vs-single-suitcase-india-2026 (DB post id 392)
- **Live check:** HTTP 200.
- **Word count:** about 1,440 (this counts the link markup).
- **seoTitle:** "Trolley Bag Set of 3 vs Single Suitcase: Which to Buy" (53 characters).
- **seoDesc:** 154 characters.
- **Tags:** luggage, trolley-bags, buying-guide, travel.
- **Cover:** the DO Spaces OG png is served as `og:image`. The alt text is the post title, which names the subject. 0 posts are coverless.
- **Schema:** the Article and FAQPage blocks are present.

## Keyword research
- **Angles considered:** "trolley bag set of 3 vs single suitcase" and "polypropylene vs polycarbonate luggage".
- **Competition:** both SERPs are brand blogs (Nasher Miles, Rock Luggage, Uppercase, EUME, Luggit). There is no marketplace or big publisher, so competition is low. Both are evergreen.
- **Chosen:** the set-vs-single angle, with PP vs PC as a section of it. The live luggage-set deals give it real per-bag price data.
- **Duplicate check:** the only luggage post was `best-trolley-bags-luggage-india`, a general guide. This post links to it and does not repeat its angle.

## Content
- **Answer first:** the first 100 words give a short answer.
- **Tables:** one table of per-bag cost across 9 live deals, all checked as LIVE in the DB before linking, and one table comparing PP and PC.
- **Other sections:** a section on the 7 kg / 15 kg airline allowance, a buying checklist, and a visible 5-question FAQ.
- **Internal links:** 11 deal pages, `/offers`, and the luggage guide.
- **Facts:** every price comes from the deal rows. No specs were invented; set sizes are stated only where the deal title gives them.

## Freshness
- **IndexNow:** HTTP 200, sent by `insert-blog-mdmeta.mjs`.
- **`llms.txt`:** carries the post.
- **`sitemap.xml`:** does not list the post yet. The sitemap is ISR with `revalidate = 1800`, so it will appear within 30 minutes. This is not rot.

## CEO audit (checked against the DB and prod)
| Check | Result |
|---|---|
| LIVE deals | 11,033 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price or null image | 0 / 0 |
| Posts | 333 in total, 0 coverless, 0 seoless |
| Posts per day (IST), 09-17 → 09-26 | 2, 3, 3, 2, 1, 3, 2, 3, 4, **2** |
| Broadcast cursor | 11380, equal to max id 11380 |
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200 (slowest: `/llms.txt` at 0.74 s) |
| Sitemap | 10,351 `<loc>` |
| Unpushed commits | 0 before this report |

Verdict: green.
