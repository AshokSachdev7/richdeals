# CONTENT-SEO tick — 2026-11-17a

The tick checked posts per day in IST first. 11-17 had 0 posts at 00:39 IST, which is under the 2–3 target, so it wrote one original post. Run at about 00:39–01:00 IST.

**Result: 1 post published (#621), with a cover, IndexNow HTTP 200, 5 live deal links plus `/offers`, and the page returns 200 on prod. It is the first post of 11-17 (IST). Every CEO-audit check is green, and all 9 session crons are armed.**

## Post

| Field | Value |
|---|---|
| Id | 621 |
| URL | /blog/hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india |
| Title | Hair Straightener Buying Guide: Ceramic vs Titanium Plates and the Right Temperature for Your Hair Type (India) |
| seoTitle | Ceramic vs Titanium Hair Straightener: Temperature Guide (56 chars, unique) |
| seoDesc | 159 chars, unique |
| Funnel | BOFU (buying guide); the previous post, #620, was TOFU |
| Length | 1,537 words |
| Tags | hair straightener, hair care, buying guide |
| Cover | `og/hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india.png` on DO Spaces (200), via `gen-blog-covers.mjs`; the page renders `alt={post.title}` |

**Keyword angle:** "ceramic vs titanium hair straightener", "hair straightener temperature for hair type" and "best hair straightener for daily use India". We had 0 posts with "straightener" in the slug, but 5 LIVE straightener and hot-brush deals, so this is a gap. It is not a best-X-under-Y near-duplicate.

**SERP gap:**
- **Nykaa's ceramic vs titanium vs ionic post** gives no temperature numbers at all, and skips plate width, clamp pressure, voltage, wet hair and keratin or rebonded hair.
- **Vijay Sales' post** gives conflicting ranges for coarse hair, and skips clamp pressure, keratin or rebonded hair, and fixed vs adjustable heat.
- **Stylecraze** returned 406 to WebFetch.

The post covers all of those, plus a buying checklist.

**Structure (GEO playbook):**
- A short-answer lead.
- A plate comparison table.
- Temperature bands by hair type.
- Fixed vs adjustable heat, plate width, and clamp pressure and floating plates.
- Safety and practical features.
- A seven-step low-damage method.
- Aftercare for keratin-treated or rebonded hair.
- Straightener vs hot air brush.
- A checklist and a five-question FAQ.

There are no fabricated specs. Temperatures are stated as industry guidance ranges. Model temperatures are not stated; readers are told to check the box. No prices appear in the copy, because Amazon prices drift, and the deal pages carry the live price.

**Internal links (all present in the rendered prod HTML):**
- **Deals, all LIVE:**
  - #14160 Havells HS4101
  - #5034 Philips HP8302
  - #13840 Vega Adore
  - #14813 Ceramic tourmaline straightener
  - #10467 4-in-1 hot air brush
- **Hub:** `/offers`.
- **Blog:** bldc-vs-normal-hair-dryer-which-to-buy-india, best-hair-dryers-india-2026.

## Freshness

- **IndexNow:** `insert-blog-mdmeta.mjs` pinged it and got **HTTP 200**.
- **`sitemap.xml`:** ISR; the blog child picks the post up within 30 min.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** built from `getPosts()`.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.36s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.24s) |
| /llms.txt | 200 (0.65s) |
| /blog/hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india | 200 (0.89s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,139 = 16,139 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,719 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,719 vs 16,719 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 still needs at least one more post to reach the target; the next CONTENT-SEO run is at 06:39 IST, and the 12:39 IST run can add a third.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (7 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
