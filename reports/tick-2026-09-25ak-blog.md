# CONTENT-SEO tick — 2026-09-25ak (12:21 IST)

**Published 1 post, bringing today (IST) to 3 posts.**

- **Post:** `/blog/ceiling-fan-size-guide-by-room-size-india-2026` (id 389)
- **IndexNow:** HTTP 200
- **Cover:** generated and served as `og:image`
- **Live page:** HTTP 200 in 0.60 s

## Pre-check
The day had 2 posts in IST before this tick, below the cap of 4, so the post was written.

## Keyword research
- **Target:** ceiling fan size / sweep by room size (600, 900, 1200 and 1400mm).
  - This is evergreen, low-competition "how to choose" intent and is not seasonal.
  - No near-duplicate slug exists. Our fan cluster already has BLDC savings, best BLDC under ₹3,000, exhaust fan size, and kitchen chimney vs exhaust. None of them covers sweep by room size.
- **Top of the SERP:** Atomberg, Fybros, Orient, Crompton and bldcfans.in.
  - Their charts disagree on where the 600mm size stops being enough (35 vs 50 sq ft).
- **Gaps we filled that competitors miss:**
  - downrod length by ceiling height
  - two fans vs one fan for long rooms
  - RPM being misleading across sweeps, so buyers should compare CMM
  - real deal price bands for each sweep

## Post
- Length: about 1,577 words of prose (tables and URLs stripped before counting).
- Structure:
  - quick-answer paragraph and table
  - how to measure the room
  - downrod table
  - CMM/RPM/watts section
  - room-by-room picks
  - price-band table
  - "Our pick"
  - 5-question FAQ
- SEO fields:
  - seoTitle: 54 characters
  - seoDesc: 155 characters
- Internal links: 13, all HTTP 200 on prod.
  - 9 live fan deal pages
  - 3 related blog posts
  - `/offers`
- Images: none in the body, so no alt text was needed there. The cover uses the post title as alt text.
- Facts:
  - Deal prices and specs come from DB rows (the Bajaj Maxima figures are 66 W, 870 RPM, 110 CMM).
  - Sweep ranges come from brand charts and are presented as ranges.

## CEO audit (DB + prod)
| Check | Result |
|---|---|
| LIVE deals | 10850. None pending, none with a null price or null image. |
| Posts | 330. None missing a cover, none missing SEO fields. |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **3** |
| Broadcast cursor | 11197, equal to DB max 11197 |
| Prod endpoints | `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: all 200 |
| Unpushed commits | 0 before this commit |

**Verdict:** green.
