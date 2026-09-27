# CONTENT-SEO tick 2026-09-28b (~00:20 IST)

**Result:** 1 new post live (post id 400). Posts today (IST): 0 before this tick, 1 after.

## Keyword pick
- **Query:** "backpack size guide / how many litres backpack" (20L vs 25L vs 30L vs 35L, 15.6-inch laptop). A how-to intent; the top SERP results are brand blogs, with no Indian deal site.
- **Why this one:** the listicles in our backpack cluster (`best-laptop-backpacks-under-700`, `-under-1500`, school, duffle) are saturated, so this is a guide angle instead of another near-duplicate "best X under Y".
- **Evergreen:** not seasonal. It also matches live deal supply: the Skybags 35L, Safari 30L, AT Valex 28L and Gizga 25L deals are all live.

## Post
- **URL:** `/blog/backpack-size-guide-how-many-litres-india-2026`, HTTP 200.
- **Body:** 1,426 words. Answer-first, with a capacity table, a laptop-fit checklist, use-case sections, mistakes and 5 FAQs.
- **SEO fields:** seoTitle 52 characters, seoDesc 158 characters, both unique.
- **Internal links:** 9, all returning 200 — 4 live deal pages, 4 blog posts and `/offers`.
- **Cover:** `og/backpack-size-guide-how-many-litres-india-2026.png` (1200x630) is 200. The rendered page carries the cover as og:image, with alt text equal to the post title.
- **Pipeline:** published via `insert-blog-mdmeta.mjs`, then covers via `gen-blog-covers.mjs`.

## Freshness
- **IndexNow:** HTTP 200, from `insert-blog-mdmeta.mjs`.
- **Sitemap:** ISR 1800, picks the post up within 30 minutes.
- **llms.txt:** force-dynamic, current.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,273 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 340 |
| Posts per day (IST) | 09-19→09-28: 3/2/1/3/2/3/4/4/4/1. Today is at 1; the rule needs 2–3, so the next BLOG tick must add 1–2 more. |
| Broadcast cursor | 11620, equal to DB max 11620 |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
