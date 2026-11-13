# TELEGRAM-DEAL-MONITOR tick — 2026-11-13b

Read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). Extracted the single-product deals, resolved the shortlinks, and deduped against `data/tg-multi-seen.json` and the live DB productId. Every price was verified on the Amazon PDP in the logged-in tab (`#corePriceDisplay .a-price-whole`, `#availability` + add-to-cart). Run at about 15:44 IST.

**Result: 3 pushed (`/admin/deals/bulk` 201, count:3, all created:true, no slug restore). 1 ASIN-reuse row expired, 1 same-price confirm written. IndexNow HTTP 200 (8 urls).**

## Deals

| ASIN | Deal | Price | MRP | Off | Outcome |
|---|---|---|---|---|---|
| B0BHSRXFVD | Puma Women Cassey Revamp sneaker, carnation pink/white | ₹999 | ₹3,999 | 75% | Pushed LIVE |
| B0FS8T35D8 | Homly Ritz 800W quartz room heater, dual tubes | ₹830 | ₹2,499 | 67% | Pushed LIVE |
| B06XGF712L | Inalsa Kwik electric kettle 1.5L, stainless steel | ₹584 | ₹1,695 | 66% | Pushed LIVE |
| B08NQZZXS7 | Channel post "HP 360 speaker ₹493" | — | — | — | **ASIN reused**: the PDP is now an HP S305 at ₹1,599, so the ₹493 deal does not exist. Not pushed. DB #15344 (HP 360 at ₹616) moved LIVE → EXPIRED; its page stays live with the EXPIRED banner |
| B0DPHTSTYJ | LG T80VBMB4Z 8kg top-load washer (#5035) | ₹20,990 | — | — | Dedup hit on a LIVE row. Same price on the PDP, so priceHistory row 16550 was written (priceValidUntil now 11-27) |

Affiliate: Amazon `/dp/ASIN?tag=…-21`. Images: `m.media-amazon.com` hiRes, keyed by the landing colour. All 5 ASINs were appended to the seen array (5,109 entries).

## Freshness

- IndexNow: `indexnow-ping.mjs` for the 3 new slugs plus #5035 and #15344 returned **HTTP 200 for 8 urls** (5 slugs + 3 hubs).
- `sitemap.xml`: ISR 1800s. The deals child is top-100 by design, so new deals enter only through the hubs.
- `llms.txt`: force-dynamic, carries the batch on the next request.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.67s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,894 = 15,894 (+3 pushed, −1 expired) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,471 = 16,471 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3. **11-13 still has 0 at 15:44 IST.** CONTENT-SEO runs next in this session.

## Still open

- 11-13 IST has 0 posts. The target is 2 to 3.
- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil. This tick wrote one by hand (#5035).
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it before then.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, now #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
