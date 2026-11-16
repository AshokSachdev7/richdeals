# CONTENT-SEO tick — 2026-11-16b

Posts per day were checked in IST first: 11-16 had 1 post (tick a), under the 2-3 target. Keyword research covered WebSearch (homebuilding.co.uk, Croma Unboxed, digit.in, Bajaj Finserv, toireviews), a full read of the digit.in fan heater vs oil-filled radiator article, and our own live room heater deals. The topic avoids the saturated best-X-under-Y and free-samples clusters and fills a gap in the winter heater cluster: we had quartz vs halogen vs carbon, electricity use and oxygen safety, but no OFR vs fan heater vs convector comparison. Funnel is BOFU (tick a was TOFU). Run at about 12:39–13:05 IST.

**Result: 1 post published (id 619), cover generated and uploaded, IndexNow returned HTTP 200. The post returns 200 on prod. Prod is 7/7 at 200 and every DB check is green. 11-16 now has 2 posts.**

## Post

| Field | Value |
|---|---|
| Slug | `oil-filled-radiator-vs-fan-heater-vs-convector-which-to-buy-india` |
| Title | Oil-Filled Radiator vs Fan Heater vs Convector: Which Should You Buy in India? |
| seoTitle | Oil-Filled Radiator vs Fan Heater vs Convector: India Guide (59 chars) |
| seoDesc | 159 chars, unique |
| Tags | room heater, winter, home |
| Length | about 1,580 words |
| Funnel | BOFU (tick a was a TOFU thermal-curtain guide) |
| Cover | `og/oil-filled-radiator-vs-fan-heater-vs-convector-which-to-buy-india.png` on DO Spaces (200), alt = post title |

Structure: an answer-first "Short answer" paragraph, how each heater type works, a 9-row side-by-side table, a room-by-room picker (bedroom, study, living room, bathroom, homes with kids or elderly people), running-cost maths, a 7-point safety checklist, a buying checklist, live heater deals and a 4-question FAQ.

Facts framing: no invented figures. Running cost is given as a formula (kW × hours × your tariff, scaled by thermostat duty cycle) rather than a rupee claim. Warm-up times are labelled as typical ranges, not lab figures. The deals section says plainly that no oil-filled radiator deal is live, quotes no prices ("check the deal page for today's price"), and describes the Orient Areva neutrally because its heater type is not confirmed on the deal row.

## Internal links (all 200 on prod)

- 7 deal pages: Techking 1200W ceramic heater fan, Orient Electric Areva 2000W, Havells Calenter 1050W, Venus Sun CH900 carbon, Halonix Jasper Neo halogen, Homly Ritz quartz, Longway Blaze quartz.
- `/offers`.
- 6 blog posts: quartz-vs-halogen-vs-carbon-heater-difference-india, does-room-heater-reduce-oxygen-dry-air-safety-tips-india, room-heater-electricity-consumption-units-per-hour-bill-india, best-room-heaters-india-winter-guide, humidifier-buying-guide-india-cool-mist-vs-warm-mist, do-thermal-blackout-curtains-keep-room-warm-winter-india.

## Freshness

- IndexNow: `insert-blog-mdmeta.mjs` pinged it and returned **HTTP 200**.
- `sitemap.xml`: ISR, at most 30 min stale. The blog child picks up the post automatically.
- `llms.txt`: force-dynamic, so it already lists the post.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| / | 200 | 0.23s |
| /offers | 200 | 0.11s |
| /blog | 200 | 0.70s |
| /sitemap.xml | 200 | 0.09s |
| /feed.xml | 200 | 0.11s |
| /api/deals | 200 | 0.30s |
| /llms.txt | 200 | 0.60s |
| /blog/oil-filled-radiator-vs-fan-heater-vs-convector-which-to-buy-india | 200 | 0.67s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,087 = 16,087 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,666 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,666 vs 16,666 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 2-per-day floor is met. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- IFS yield: if the 12:53 IST IFS tick finds 0 new ids again, check whether the Buy Now format changed.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
