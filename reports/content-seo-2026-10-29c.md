# CONTENT-SEO: 2026-10-29c (~12:45 IST)

**Result: 1 post shipped (#574, air purifier CADR sizing guide). IST count for 10-29 is now 3, within the 2-3/day rule and under the cap of 4. IndexNow returned 200. Cover is live. Prod returns 200.**

## Post
| Field | Value |
|---|---|
| URL | https://richdeals.in/blog/air-purifier-cadr-room-size-guide-india |
| id | 574 |
| seoTitle | "Air Purifier CADR by Room Size: How Much You Need in India" (58 chars) |
| seoDesc | ~157 chars, room sq ft × 0.67 formula plus the hook to the size table |
| Length | ~1,550 words |
| Funnel | TOFU (sizing / how-to), with a BOFU block of live purifier deals |
| Tags | air-purifier, buying-guide, pollution, home-appliances, cadr |
| Cover | `og/air-purifier-cadr-room-size-guide-india.png` (1200x630, DO Spaces), alt = post title |
| Source | `apps/api/_blog1029c/air-purifier-cadr-room-size-guide-india.md` + `.meta.json` |

## Why this keyword
- Seasonal: the North India smog season starts in late October, so purifier searches climb now.
- The existing purifier posts are "best purifiers 2026" (BOFU list) and "dust allergy" (FAQ). Neither answers "how much CADR for my room", which is the question asked before buying. There is no near-dup slug.
- The SERP read showed brand pages and US-centric AHAM explainers in CFM. An India-specific answer in m³/h, with the coverage-claim caveat, is the gap.

## GEO patterns applied
- Answer-first short answer with the formula in the first paragraph.
- A formula block, a room-size table, a ceiling-height table, a worked example and a 5-point checklist.
- 5 FAQ Q&As with self-contained answers.
- No fabricated facts: CADR figures are the ones stated in the product listings, and prices are labelled "at writing".

## Internal links
- 8 live deal pages: LINSO FLO, LINSO STORM, Eureka Forbes 150, pTron EaseMate H1, Havells AP310, Dyson Big+Quiet, Philips FY3200 filter, TROO Mi filter.
- 2 blog posts: best air purifiers 2026, dust allergy.
- `/offers`.

## Pipeline
1. `insert-blog-mdmeta.mjs`: upserted, 5 tags, IndexNow 200.
2. `gen-blog-covers.mjs`: 1 cover generated (cover IS NULL only).
3. Prod check: `/blog/air-purifier-cadr-room-size-guide-india` returned 200.

## CEO audit
Same tick as ifs-2026-10-29g; see that report. Clean: posts 445, 0 coverless, 0 seo-less. IST posts/day: 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 3.

Next CONTENT-SEO tick (18:32 IST): 10-29 is already at 3, so a 4th post is optional. Prefer a BOFU deal-led post, or skip to stay at 3.
