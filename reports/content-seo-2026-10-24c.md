# CONTENT-SEO — 2026-10-24c (12:39–12:44 IST)

**Post #3 for IST 2026-10-24 is live: "How to Choose a Monitor Arm: VESA, Weight and Desk Clamp Guide (India)" (id 525, TOFU, 1,528 words). It has a cover with alt text and 7 internal links, all returning 200. IndexNow returned HTTP 200. That makes 3 posts today, inside the 2–4 target. No CONTENT-SEO post is needed until IST 10-25.**

## Post

| Field | Value |
|---|---|
| Slug (id) | `how-to-choose-monitor-arm-vesa-weight-desk-clamp-india` (525) |
| Funnel | TOFU. It follows the BOFU/MOFU mattress-protector post from 10-24b. |
| Words | 1,528 |
| seoTitle (54 chars) | How to Choose a Monitor Arm: VESA, Weight & Desk Clamp |
| seoDesc (154 chars) | Monitor arm buying guide for India: check VESA 75/100, weigh the panel without its stand, fit the clamp to thin particle-board desks, and set gas tension. |
| Excerpt | 150 chars |
| JSON-LD on prod | Article, BreadcrumbList, FAQPage (5 Q&As), Organization, WebSite |
| h1 | Matches the title |
| Cover | DO Spaces `og/how-to-choose-monitor-arm-vesa-weight-desk-clamp-india.png`, 200. Alt text is the title. |
| Internal links | 7, all 200. Deals: #14549 STRIFF, #10099 Amazon Basics Pro, #6 WALI M001XL, #5564 HOSS, #5112 Jin Office stand. Also the WFH ergonomics post and `/offers`. |
| In-body images | None |
| Tags | monitor-arm, work-from-home, buying-guide, electronics |

## Keyword research

- **Our demand:** 5 LIVE monitor-arm and monitor-stand deals, including #14549 STRIFF from IFS 10-24f, and no blog post linking to any of them.
- **Collision check:** there is no existing monitor-arm or VESA post. Three other candidates were rejected because they would collide with existing posts:
  - USB-C hub (`best-usb-c-hubs-laptop-india-2026` exists).
  - Luggage (several posts already).
  - Keyboards (the 2.4 GHz vs Bluetooth post and the mechanical-under-3000 post exist).
- **Top-3 SERP read:**
  - **BenQ en-in, about 2,000 words.** Covers arm types, desk support, VESA special cases and the weight margin.
  - **Evetech, about 2,400 words.** Gives a 15–90 mm clamp range, a VESA-by-screen-size table and 2–3 kg of headroom.
  - **Progressive Automations, about 300 words.** Thin.
  - Coolblue returned 405 and was skipped.
- **Gap filled:** none of the three cover these, so the post does:
  - Indian particle-board and MDF desks near the bottom of the clamp range, and the reinforcement-plate fix.
  - How to weigh the panel without its stand (spec sheet first, otherwise the bathroom-scale method).
  - Step-by-step gas-spring tension adjustment.
  - Eye height and viewing distance.
  - A fill-in pre-buy checklist table.
- **Facts:** every number comes from the SERP sources or the deal listings: clamp range, 5 cm clearance, 4–6.5 cm grommet hole, 2.5 cm bevel, accessory weights, and each arm's kg and inch ratings. No prices are quoted in the body, because they would go stale.
- **GEO playbook:**
  - Answer-first paragraph.
  - Numbered steps.
  - 4 tables.
  - Entity-explicit specs (VESA mm, kg, mm).
  - FAQ that matches the FAQPage schema.

## Freshness

- **IndexNow:** HTTP 200 via `insert-blog-mdmeta.mjs`.
- **Sitemap:** ISR revalidates every 1800 s, so the post appears within 30 minutes. No new static route was added.
- **`llms.txt`:** force-dynamic, so it already lists the post.
- **Prod:** `/blog/how-to-choose-monitor-arm-vesa-weight-desk-clamp-india` returns 200.

## CEO audit (12:44 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,033 LIVE, and `/api/deals` reports `total:14033`, a match. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14564.
- **Posts (IST 2026-10-24):** 3 (ids 523, 524, 525). The cap is 4. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14564, equal to the DB maximum.
- **Unpushed commits:** 0 before this report.
- **Still open:** 47 shadowed same-ASIN duplicate pages are waiting for a price sync (from TG 10-24j).
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
