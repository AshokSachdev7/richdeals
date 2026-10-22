# CONTENT-SEO — 2026-10-22b (06:44 IST)

**1 published · IndexNow HTTP 200 · cover OK · prod 200**

Before this tick there was 1 post for IST 2026-10-22 (#516). The target is 2–3 and the cap is 4, so this tick shipped 1 post. Today's count is now 2.

## Post

| Field | Value |
|---|---|
| Slug (id) | `helmet-size-chart-india-how-to-measure-head-mm-cm` (517) |
| Funnel | TOFU how-to / size guide. Rotates away from the recent "X vs Y which to buy" run. |
| Words | about 1,800 including tables and FAQ |
| seoTitle (chars) | Helmet Size Chart India: Measure Your Head (cm & mm) (52) |
| seoDesc chars | 156 |
| JSON-LD on prod | Article, BreadcrumbList (3), FAQPage (5 Q&As), HowTo (4 steps) |
| h1 count | 1 |
| Cover | `og/helmet-size-chart-india-how-to-measure-head-mm-cm.png`, with alt text equal to the title |
| Internal links | 10. Seven deal pages (Steelbird SBA-1 580mm, Vega Crux M, Vega Bolt Bunny L, RE Mod Adroit XL, Vega Edge, TVS Racing Titan, TVS Ronin), 2 helmet posts and `/offers`. Every link returned 200 before publishing. |
| In-body images | none |

## Keyword research

- **Our demand:** the helmet cluster has 13 LIVE deals in the last 21 days and only 2 posts: a style comparison and an under-₹1,000 list. Neither is a size guide, although size guides already exist for crocs, backpacks, cycles and bedsheets.
- **SERP:** queries were "helmet size chart india how to measure head cm" and "how to choose right helmet size India 580mm". The top 3 results read were:
  - iamabiker: about 2,000 words, with a brand table.
  - TVS shop: about 1,900 words, with a cm chart.
  - HDFC ERGO: about 850 words, with a measure-and-shake test.
- **Gap filled:**
  - Decoding the 560/580/600/620 mm labels on listings. None of the top 3 does this.
  - The top 3 publish cm charts that disagree with each other (TVS M is 56–57 cm, iamabiker M is 57–58 cm). The post says this openly and tells readers to use the brand's own chart.
  - Size hidden in the variant picker.
  - "Free size" helmets.
  - Industrial hard hats and skate helmets that show up in helmet search results. This angle comes from our own deal data.
  - An online returns checklist, glasses, long hair, and pillion/child riders.
- **GEO:** the post opens with an answer-first summary that has the numbers in it. It has a labelled cm/mm/letter table, numbered measuring steps, five named fit checks, and a 5-question FAQ that matches what people ask ("what size is 58 cm", "what does 580mm mean"). No prices appear in the body. All facts are general: BIS/IS 4151, and the 2022 CMVR rule for children aged 9 months to 4 years.
- **Saturation check:** no existing slug contains `helmet-size`. The post avoids the saturated best-X-under-Y and free-samples clusters.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The post itself returns 200.
- **Feed:** `feed.xml` does not list post 517 yet. This is ISR lag, not a fault; INDEXNOW 07:23 will re-check.
- **Deals:** 13,536 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14065.
- **Broadcast cursor:** 14065, matching the highest deal ID.
- **Posts (IST 2026-10-22):** 2. The minimum is met; the next CONTENT-SEO run can add a 3rd. 0 posts lack a cover and 0 lack SEO fields.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** Deal Dibba has been missing from the TG sidebar for 6+ ticks.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
