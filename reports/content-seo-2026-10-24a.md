# CONTENT-SEO — 2026-10-24a

**1 post shipped (TOFU, id 523): "How to Measure Laptop Size for a Sleeve, Bag or Backpack (India Guide)". It has a cover, alt text, Article and FAQPage JSON-LD on prod, and 11 internal links that all return 200. IndexNow returned HTTP 200. IST 2026-10-24 now has 1 post, so 1–2 more are due today.**

## Post

| Field | Value |
|---|---|
| Slug (id) | `how-to-measure-laptop-size-for-sleeve-bag-backpack-india` (523) |
| Funnel | TOFU (the previous post, 10-23c, was MOFU/BOFU) |
| Words | ~1,300 of prose (9,100 chars of markdown) |
| seoTitle (len) | "How to Measure Laptop Size for a Sleeve or Bag (India)" (54) |
| seoDesc (len) | 155 |
| Excerpt (len) | 149 |
| JSON-LD on prod | Article + FAQPage |
| h1 on prod | 1 |
| Cover | `og/how-to-measure-laptop-size-for-sleeve-bag-backpack-india.png` on DO Spaces, returns 200, alt = title |
| Internal links (all 200) | 11: 8 LIVE deal pages (#14390, #13597, #14507, #12551, #13122, #13619, #14506, #14321), `/offers`, and 2 blog posts (backpack litres guide, laptop backpacks under ₹1,500) |
| In-body images | 0 |
| Tags | laptop bags, laptop sleeve, backpacks, buying guide, size guide |

## Keyword research

- **Our demand:** about 30 LIVE laptop backpack, sleeve and bag deals. These include #14507, the HP 15" sleeve pushed in DESIDIME 10-24a, and #14506, the Protecta office bag that fits 15.6"/16" laptops. Most bag listings say only "fits up to 15.6 inch", and that label is the question this post answers.
- **Collision check:** no existing post covers measuring a laptop or laptop fit. The only "measure" slug is the helmet size chart. This is not a near-duplicate of the saturated best-X-under-Y or free-samples clusters.
- **Top-3 SERP read:**
  - backpacks4less: measure width, depth and thickness, add clearance. Inches only.
  - thetoolstrunk: screen diagonal vs body size. Inches only, US-focused.
  - laptopoutlet.co.uk: returned 403, so it was not read.
- **Gap filled:**
  - Millimetres and centimetres, the units Indian listings use.
  - The 16:9 vs 16:10 geometry. A 15.6" 16:9 screen and a 16" 16:10 screen are both 345 mm wide, but the 16" screen is about 21 mm taller. That depth difference is why 16" laptops often fail "15.6 inch" bags.
  - Clearance rules for each dimension.
  - A comparison of sleeve vs backpack vs office bag, including orientation (vertical vs horizontal).
  - How to read an Amazon or Flipkart bag listing.
- **Facts:** screen dimensions were calculated from the diagonal and aspect ratio, and the post says so. No prices are quoted in the body; it links to the deal pages for live prices. No specs were invented.
- **GEO playbook:** an answer-first short answer, tables for dimensions, clearance and bag types, and 5 FAQ Q&As written as H3s.

## Freshness

- **IndexNow:** HTTP 200, sent by `insert-blog-mdmeta.mjs`.
- **Sitemap:** ISR 1800 s, so it will carry post 523 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already carries the post.
- **Prod:** `/blog/how-to-measure-laptop-size-for-sleeve-bag-backpack-india` returns 200.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,978 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14509.
- **Posts (IST 2026-10-24):** 1. The minimum of 2 is not met yet, but the IST day is still young. The next CONTENT-SEO tick (`9 */6`) should ship #2. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14509, which equals the DB maximum, so it is fully caught up.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
