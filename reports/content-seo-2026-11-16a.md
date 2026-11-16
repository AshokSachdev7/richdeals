# CONTENT-SEO tick — 2026-11-16a

Posts per day were checked in IST first: 11-16 had 0 posts, under the 2-3 target. Keyword research covered WebSearch, the top-3 SERP pages and our own live deal clusters. The topic avoids the saturated best-X-under-Y and free-samples clusters. It is a TOFU winter question that sits next to the existing winter-comfort posts and links to live curtain deals. Run at about 10:00–10:35 IST.

**Result: 1 post published (id 618), cover generated and uploaded, IndexNow returned HTTP 200. The post returns 200 on prod. Prod is 7/7 at 200 and every DB check is green.**

## Post

| Field | Value |
|---|---|
| Slug | `do-thermal-blackout-curtains-keep-room-warm-winter-india` |
| Title | Do Thermal Blackout Curtains Keep a Room Warm in Winter? (India Guide) |
| seoTitle | Do Thermal Curtains Keep a Room Warm in Winter? India Guide (59 chars) |
| seoDesc | 153 chars, unique |
| Tags | curtains, winter, home |
| Length | 1,482 words |
| Funnel | TOFU (the previous posts on 11-15 were a BOFU blanket comparison and a TOFU lip-care guide) |
| Cover | `og/do-thermal-blackout-curtains-keep-room-warm-winter-india.png` on DO Spaces, alt = post title |

Structure: an answer-first "Short answer" paragraph, how windows lose heat, what thermal curtains do, a thermal vs blackout vs regular table, where they help in India, fitting steps, open/close timing, limits, a buying checklist, live deals and a 4-question FAQ.

Facts are framed honestly. The 30% window heat-loss figure is given as "often quoted and attributed to the US DOE", with the lower UK figure beside it. The 25-40% curtain claims are labelled as manufacturer claims, not independent tests. No savings numbers for Indian homes were invented, because none were found.

## Internal links (all 200 on prod)

- Deals: `/thermal-insulated-blackout-curtain-4-ft-window-b0fq5x2j5q` (#16197), `/thermal-insulated-blackout-window-curtain-4-ft-brown-b0fq5y71xr` (#14944), `/blackout-window-curtain-4-ft-wine-b0fq5zpbp6` (#15831), and `/offers`.
- Posts: room heater safety, curtain size guide, thermal wear fabrics, electric blanket safety, hot water bag vs gel bag.

## Freshness

- IndexNow: `insert-blog-mdmeta.mjs` pinged the post and returned **HTTP 200**.
- `sitemap.xml`: the blog child is ISR, at most 30 min stale.
- `llms.txt`: force-dynamic, so it already lists the post.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.59s) |
| /blog/do-thermal-blackout-curtains-keep-room-warm-winter-india | 200 (0.65s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,062 = 16,062 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,641 = 16,641 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post for 11-16 (the cap is 4).

## Still open

- No new deal has been ingested since about 12:00 IST on 11-15 (DB max is still 16,641). The TG, DEAL-INGEST and DESIDIME ticks run next.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC La Opala, #360 Sulfar, Reebok MACHRUN M (B0HKNB18Q6), #652.
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
