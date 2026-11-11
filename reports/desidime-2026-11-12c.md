# DESIDIME-INGEST tick — 2026-11-12c

Stage 1 `apps/api/scripts/ingest-desidime.mjs`: `/new` + homepage cards only (no per-deal fetch), JUNK/GROCERY filters, Buy Now → `visit.desidime.com` resolved to the merchant URL. Amazon verified in the logged-in Playwright tab (in-tab PDP fetch, `.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart). Dedup by resolved productId vs live DB.

## Funnel

| Step | Count |
|---|---|
| Cards read | 35 |
| Resolved to a single product | 19 |
| Dup of LIVE row (productId) | 15 |
| Rejected (junk / non-product) | 3 |
| Fresh | 1 |
| Fresh rejected (price drift) | 1 |
| Pushed | **0** |

Rejected at stage 1: Jiomart hing ₹17 (GROCERY), Gunmaster movie voucher (JUNK), Klook sale (sale hub, not a product).

Fresh reject: B0FK3Y39BZ SignoraWare glass container, card ₹197 vs PDP ₹568 → drift, rejected (same as 12b).

## Dup LIVE rows — PDP re-verify

Synced (2) — `prisma.deal.update` on price/mrp/discountPct/title/description (₹ in copy = price), new priceHistory row, slug kept, still LIVE:

| id | Product | ASIN | Before | After |
|---|---|---|---|---|
| 16323 | atomberg Renesa Elite Smart BLDC fan | B0F8QDHFG7 | ₹2,999 / MRP 8,400 / 64% | **₹4,799 / MRP 7,200 / 33%** |
| 16349 | Sparkmate scrub sponge, pack of 3 | B0C77G6YVL | ₹20 / MRP null | **₹65 / MRP 69 / 6%** |

Confirmed PDP = DB (9): B0GVNHJ3LY ₹23,990 · B0H3PM4CR6 ₹1,14,990 · B0FCXX1SHC ₹293 · B0GP22GR62 ₹1,209 · B0FYGSLVRW ₹3,199 · B01568SIG8 ₹110 · B075XSM8RK ₹50 · B0CCVHHNTZ ₹300 · B0BCGC1V4Q ₹1,199. lastPH 11-11, no PH row added.

Card = DB, not re-fetched (3): B0GVFPHS69 ₹94 · B0HC3N7G4R ₹2,899 · Myntra 29629756 ₹349.

Flag (1): **#16364 B009319C06** Creative's Classic Game Pack chess, DB ₹141 — PDP has no buybox, no add-to-cart (AOD sellers only). Left LIVE as-is; next price-sync pass should re-check and delist to EXPIRED if still no buybox.

Card prices below PDP on some dups = post-coupon / bank-offer prices; DB keeps the buybox price.

Affiliate matrix unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, others → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for the 2 synced slugs → **HTTP 200** (5 URLs: 2 slugs + 3 hubs).
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.55s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,829 = 15,829 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

Still open (from schema-audit 11-12): same-price confirmations write no priceHistory row → 91% of LIVE Offers lack priceValidUntil.

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
