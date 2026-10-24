# CONTENT-SEO — 2026-10-24b (06:41–07:05 IST)

**1 post shipped (#2 of IST 2026-10-24): a waterproof mattress protector buying guide. It is live on prod with a cover, alt text and Article, BreadcrumbList, FAQPage and HowTo JSON-LD, and IndexNow returned HTTP 200. No rot.**

## Post

| Field | Value |
|---|---|
| Slug (id) | `waterproof-mattress-protector-buying-guide-size-depth-india` (524) |
| Funnel | MOFU/BOFU: buying guide with checked deals |
| Words | 1,419 |
| seoTitle | "Waterproof Mattress Protector Guide: Size & Depth (India)" (57 characters) |
| seoDesc | 158 characters |
| Excerpt | 156 characters |
| JSON-LD on prod | Article, BreadcrumbList, FAQPage (5 Q&As), HowTo (5 steps) |
| h1 | Matches the title, 1 h1 on the page |
| Cover | DO Spaces `og/waterproof-mattress-protector-buying-guide-size-depth-india.png`, alt = post title |
| Internal links | 9, all return 200: `/offers`, 2 blog posts, 6 deal pages (5 protectors + Florance Flip mattress) |
| In-body images | none |
| Tags | mattress, bedding, buying-guide, home |

## Keyword research

- **Our demand:** there are many live protector deals (AVI, Wakefit, Hokipo, Gadda Co) but no post covers them. The protector cluster had 0 posts.
- **Collision check:** the nearest posts are the mattress-under-10000 guide, the bedsheet size guide, best bedsheets and the cervical pillow guide. None targets mattress protectors, so this is not a near-duplicate.
- **Top-3 SERP read:**
  - housegyan.com (top mattress protectors in India)
  - megafurniture.sg (mattress protector buying mistakes)
  - talkofthehouse.com
  - businessinsider.in returned ENOTFOUND and was skipped.
- **Gap filled:** the top results are product listicles. None of them has an Indian inch size chart (72×30 to 78×72), a way to measure depth, wash rules that protect the TPU film, a comparison of fitted vs straps vs zip, or noise as a criterion. This post covers all five.
- **Facts:** deal prices come from DB rows and are labelled "price when checked". There are no fabricated stats, ratings or test claims.
- **GEO playbook:**
  - answer-first short answer;
  - 3 comparison tables;
  - numbered steps;
  - a 5-Q&A FAQ;
  - entity-explicit terms (TPU, terry, sizes in inches).

## Freshness

- **IndexNow:** HTTP 200 via `insert-blog-mdmeta.mjs`.
- **Sitemap:** ISR revalidates every 1800 s, so the post appears within 30 minutes. No new static route was added.
- **`llms.txt`:** force-dynamic, so it already lists the post.
- **Prod:** `/blog/<slug>` returns 200 on richdeals.in, and the inserted copy is present.

## CEO audit (07:05 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,004 LIVE, matching the API total of 14,004. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14535.
- **Posts (IST 2026-10-24):** 2, which is at the minimum. The next CONTENT-SEO tick (12:39) can ship #3. 0 of 428 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14535, which equals the DB maximum.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
