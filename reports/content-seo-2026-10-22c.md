# CONTENT-SEO — 2026-10-22c (19:34 IST)

**Published 1 TOFU troubleshooting post (#518). It went live with a cover, alt text and IndexNow HTTP 200. Posts for IST 2026-10-22 are now 3, within the 2–4 target.**

It rotates away from the recent "X vs Y" and size-guide run to a how-to/fix query backed by about 25 live cooker deals.

## Post

| Field | Value |
|---|---|
| Slug (id) | `pressure-cooker-not-whistling-leaking-steam-gasket-fix-india` (#518) |
| Funnel | TOFU troubleshooting, with BOFU exits to deals |
| Words | ~1,880 raw (`wc -w`, including tables and link markup); about 1,500 words of prose |
| seoTitle | "Pressure Cooker Not Whistling or Leaking? 9 Fixes (India)" (57 chars) |
| seoDesc | 159 chars |
| Excerpt | 158 chars |
| JSON-LD on prod | Article, BreadcrumbList, FAQPage (5 Q&As), Organization, ImageObject |
| h1 on prod | 1 |
| Cover | `og/pressure-cooker-not-whistling-leaking-steam-gasket-fix-india.png` on DO Spaces; alt = post title |
| Internal links | 9 links, all 200 on prod: 5 live deal pages (Pigeon 3L inner lid, Pigeon Favourite 3L, Wonderchef Taurus 3L, Pigeon ceramic 5L, Bergner TriPro 5L), 3 blog posts and `/offers` |
| In-body images | None (the cover is the image) |

## Keyword research

- **Our demand:** about 25 live pressure-cooker deals (Pigeon, Bergner, Wonderchef, Judge, Milton, Greenchef, Butterfly). Existing cooker posts are only the best-of roundup and the size guide, and no slug contains "gasket" or "whistle", so the cluster is not saturated.
- **SERP (top 3 read):**
  - potsandpans.in: ~650 words, one H2 per cause, no table, no FAQ.
  - stahlkitchens: ~850 words covering 7 problems, no table, no FAQ, and it mixes up the regulator, valve and gasket.
  - asianet: overflow tips only.
- **Gap filled:**
  - A symptom → cause → fix table and a check-in-order list.
  - Clear terms: whistle vs vent pipe vs safety valve vs gasket.
  - An inner-lid vs outer-lid leak table.
  - What to do when the safety valve blows (genuine part, never plug the hole).
  - A 10-minute plain-water test.
  - A repair-or-replace table.
  - A 5-question FAQ.
- **GEO:** answer-first "Short answer" paragraph, then tables. No brand-specific claims and no invented intervals; gasket life is framed as wear signs plus "roughly yearly for daily cooking".
- **Saturation check:** this is a new cluster. It mirrors the existing mixer-grinder fix post and links to it.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200. The new post returns 200.
- **Posts (IST 2026-10-22):** 3. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,631 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14161.
- **Broadcast cursor:** 14137 against a highest ID of 14161. It moved from 14132, so the external cron is draining the queue.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
