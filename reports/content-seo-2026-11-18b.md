# CONTENT-SEO tick — 2026-11-18b

The tick checked posts per day in IST, researched a keyword, then wrote and published one original post through `insert-blog-mdmeta.mjs` (which pings IndexNow) and gave it a cover with `gen-blog-covers.mjs`. A CEO audit followed. Run at about 06:39–06:45 IST.

**Result: 1 BOFU post published (#626). 11-18 IST is now at 2 posts, inside the 2–3 target. IndexNow returned HTTP 200. The cover and the post both return 200 on prod. Every CEO-audit check is green and all 9 session crons are armed.**

## Post

| Id | Slug | Published (IST) | Cover |
|---|---|---|---|
| 626 | `garment-steamer-vs-steam-iron-which-to-buy-india` | 11-18 ~06:42 | `og/garment-steamer-vs-steam-iron-which-to-buy-india.png` (200) |

- **seoTitle (52):** Garment Steamer vs Steam Iron: Which to Buy in India
- **seoDesc (157):** Garment steamer or steam iron? Fabric-by-fabric guide for Indian wardrobes: sarees, silk, cotton shirts, uniforms, plus handheld vs standing and a checklist.
  - The first upsert went out with a 161-character seoDesc. It was trimmed and re-upserted on the same id, which pinged IndexNow again (HTTP 200).
- **Tags:** garment steamer, steam iron, buying guide, home appliances
- **Intent:** BOFU comparison. The previous post (#625, drying clothes indoors) was TOFU, so the rotation holds.
- **Length:** about 1,580 words. It opens with the answer and includes:
  - a side-by-side comparison table;
  - a garment-by-garment table for Indian wardrobes;
  - handheld vs standing steamer advice;
  - an 8-point buying checklist;
  - hard-water and descaling care;
  - 5 FAQs.
- **Keyword research:**
  - WebSearch, then a read of the top SERP results (Lifelong, Crompton, InstaCuppa; the Tom's Guide fetch returned no article body).
  - Our own clusters were checked: no post covered garment steamers.
  - Gaps the post fills: no competitor had a comparison table, a fabric table for Indian wardrobes, handheld vs standing advice, descaling for hard water, or a box checklist.
- **Internal links (all checked at 200 on prod):**
  - Steamer deals: #16078 Balzano 1700W, #14454 Lifelong 1200W, #14516 Bajaj Steam Majesty 1000W, and #5556 Philips STH3000 (a 2-in-1).
  - Steam iron deals: #16177 Philips GC1905, #15916 Crompton Fabrimagic Neo, #14589 Orient 1300W, #12962 Havells Trusteam 1600W.
  - Posts: `/blog/steam-iron-vs-dry-iron-india-2026`, `/blog/best-steam-irons-under-1500-india-2026`, `/blog/how-to-dry-clothes-indoors-winter-without-damp-smell-india`.
  - Hub: `/offers`.
- **Facts:**
  - No prices are quoted; readers are sent to the deal pages for the verified price.
  - The only wattages used are those in the live deal titles, plus generic ranges taken from the SERP consensus.
  - No fabricated steam-output or running-cost figures.
- **Prod:** `/blog/<slug>` returns 200, and the post is listed on `/blog` and in `/llms.txt`.

## Freshness

- **IndexNow:** HTTP 200 on both upserts.
- **`sitemap.xml`:** the blog child is ISR 1800s, so the post appears within 30 minutes. No static route was added.
- **`llms.txt`:** carries the post (force-dynamic).
- **`/feed.xml`:** does not list the post yet. Its cache has not turned over; this tick did not wait for it.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.29s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.21s) |
| /llms.txt | 200 (0.68s) |

## CEO audit

Run at 06:44 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 06:44 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The next CONTENT-SEO run is at about 12:39 IST and can take 11-18 to 3.

## Still open

- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **IFS redirector:** dead at g through o. Probe-only until the end of 11-18 IST.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
