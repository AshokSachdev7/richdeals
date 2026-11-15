# CONTENT-SEO tick — 2026-11-15b

This tick checked posts per day in IST, then researched, wrote and published one post through `insert-blog-mdmeta.mjs`, which pings IndexNow. The cover came from `gen-blog-covers.mjs`. Run at about 06:40–07:00 IST.

**Result: 1 post published (id 617). 11-15 IST is now at 2 posts, which meets the target. IndexNow returned HTTP 200. The cover was uploaded and the og:image is live. Prod returned 200 on 7 of 7 endpoints plus the new post. Every CEO-audit check is green.**

## Post

| Field | Value |
|---|---|
| URL | /blog/chapped-lips-winter-lip-balm-ingredients-that-work-india (200, 0.73s) |
| H1 | Chapped Lips in Winter: Which Lip Balm Ingredients Actually Work (India Guide) |
| seoTitle | Chapped Lips in Winter: Lip Balm Ingredients That Work (54 chars) |
| seoDesc | 160 chars |
| Tags | lip-care, winter, skincare |
| Intent | TOFU / informational (the previous post, 616 mink vs sherpa blankets, was comparison / BOFU) |
| Length | about 1,660 words in source, 10,782 chars |
| Cover | `og/chapped-lips-winter-lip-balm-ingredients-that-work-india.png` on DO Spaces, served as og:image |

Structure:

- answer-first `**Short answer:**`;
- an ingredient table (occlusive / emollient / sun filter / irritant);
- petroleum jelly vs "natural" balms;
- a 3-week routine;
- picks grouped by need;
- red flags for when to see a doctor;
- a 6-question FAQ;
- source attribution and a not-medical-advice line.

## Keyword research

- **Head query:** "chapped lips winter lip balm ingredients India" (plus "best lip balm for chapped lips", "is Vaseline good for chapped lips").
- **Top 3 SERP:**
  1. AAD, "How to heal dry, chapped lips". This is authoritative, and its ingredient look-for and avoid lists are used and cited.
  2. Apollo Pharmacy, chapped lips Indian weather guide.
  3. Budget lip-balm roundups (NDTV Shopping under ₹500, Typsy, Digirake).
- **Gaps we fill:**
  - Apollo has no red flags or "see a doctor" guidance, nothing on heaters or AC dry air, no city split and no prices.
  - Apollo calls petroleum jelly a temporary fix, which conflicts with AAD. We follow AAD.
  - The roundups list products but never explain ingredients.
- **Cannibalisation check:** no existing post about lips or lip balm. The only nearby post is the lipstick comparison, which targets different intent and is cross-linked. This post is not in the saturated best-X-under-Y or free-samples clusters.

## Internal links (all verified LIVE in the DB before writing)

- **14 deal pages:**
  - Vaseline Lip Tin Original #4062 ₹220
  - Vaseline Cocoa Butter tin #5997 ₹156
  - Biotique SPF 50 #2381 ₹145
  - Quench SPF 60 #5337 ₹63
  - Maybelline SPF #10462 ₹92
  - Himalaya #8115 ₹23
  - VINR 3-pack #10505 ₹249
  - Vaseline Rosy tinted 7g #14569 ₹160
  - Vaseline Rosy stick #11987 ₹125
  - Mamaearth Beetroot #1836 ₹147
  - Mamaearth CoCo #11977 ₹150
  - Nivea Strawberry #7148 ₹127
  - Nivea Cherry #9998 ₹125
  - Vaseline Deep Moisture lotion #12742 ₹220
- **5 posts:**
  - does-room-heater-reduce-oxygen-dry-air-safety-tips-india
  - humidifier-buying-guide-india-cool-mist-vs-warm-mist
  - lakme-vs-maybelline-liquid-lipstick-which-to-buy-india
  - best-body-lotion-for-dry-skin-winter-india
  - best-budget-skincare-deals-india
- **Hub:** `/offers`.

No product ingredient claims go beyond what the product titles state (SPF number, shea, vitamin C, cocoa) or what is generic (Vaseline = petroleum jelly). Flavoured and tinted balms are flagged per the AAD irritant list.

## Freshness

- IndexNow: HTTP 200 from `insert-blog-mdmeta.mjs`.
- `sitemap.xml`: ISR, at most 30 min stale. The post will appear in the blog child on revalidate.
- `llms.txt`: force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.06s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.65s) |
| /blog/chapped-lips-… | 200 (0.73s), title and og:image correct |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,587 = 16,587 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506, #16558, #7461.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #3538).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
