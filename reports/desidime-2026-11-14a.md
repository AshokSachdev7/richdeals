# DESIDIME-INGEST tick — 2026-11-14a

Ran stage 1 with `apps/api/scripts/ingest-desidime.mjs`. It reads only the listing cards from `/new` and the homepage, applies the JUNK and GROCERY filters, and resolves each `visit.desidime.com` link to the real merchant URL. Verified every Amazon candidate on the PDP in the logged-in Playwright tab and every non-Amazon candidate with `productLd()` (±₹1, InStock). Deduped by productId against the live DB, then pushed through `/admin/deals/bulk` as `status:live`. Run at about 13:00–14:50 IST.

**Result: 3 new deals pushed (`count:3`, all `created:true`). 1 duplicate LIVE row was price-synced in place, and 10 candidates were rejected. IndexNow returned HTTP 200 for 7 urls. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

| Slug | Price | MRP | Off |
|---|---|---|---|
| `solimo-airtight-plastic-storage-jar-set-green-pack-of-6-b0ccvh5g6t` | ₹418 | ₹1,299 | 68% |
| `ebee-8-pair-plastic-shoe-stand-with-4-shelves-blue-b089ftg2yl` | ₹298 | ₹899 | 67% |
| `walking-bunny-rabbit-toy-with-leash-music-and-led-lights-b0gd19f3wd` | ₹590 | ₹1,999 | 70% |

Each deal uses the Amazon affiliate tag (`tag=…-21`) on a clean `/dp/ASIN` link and a `m.media-amazon.com` image. All text was rewritten.

## Dup re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #15255 | Amazon Brand Solimo stainless steel dinner set B0CB5QMMR4 | DB had ₹636 (58% off). PDP shows ₹463, MRP ₹1,499, in stock. | Price-synced to ₹463 (69% Off). Title and description fixed, slug kept. |
| — | Pigeon fry pan B0CZTPS5G2 | PDP ₹705 matches the DB | No change |

## Rejected

| Source | Item | Reason |
|---|---|---|
| Amazon | TrustBasket B08635SZC3 | No buybox, so the price cannot be verified |
| Amazon | Athom B07NQL4PXC | PDP ₹809 vs card ₹304 |
| Amazon | Athom B0BFWVYTW5 | Drift and no buybox (whole brand block rejected) |
| Amazon | Sony HT-S20R B084685MT1 | PDP ₹22,989 vs card ₹10,791 |
| Amazon | Sparkmate B0BC8MH6YY | Low-ticket FMCG |
| Amazon | Dr.Rashel B0H6F78JX1 | Low-ticket FMCG |
| Zepto | Beyblade | Hyperlocal, location-locked |
| Flipkart | Acer COMHRGGZT6CXWPMG | Price drift |
| Amazon | Sennheiser B08SW56CDQ | Price only with a bank offer |
| Amazon | CG Iraya B0H9FK9XZZ | Price only with a bank offer |

All 10 were added to `data/dd-rejected.json`. The two bank-offer rejects no longer come back on every sweep, so that open item is closed.

## Freshness

- IndexNow: `indexnow-ping.mjs` with the 3 new slugs plus the #15255 slug returned **HTTP 200** for 7 urls (4 slugs plus 3 hub paths).
- `sitemap.xml`: ISR (`revalidate = 1800`), at most 30 min stale. The deals child lists only the top 100, so new deals stay out of it by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.52s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,921 = 15,921 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 485, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,499 = 16,499 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 1 so far. The 18:39 IST CONTENT-SEO run owes the second post.

## Still open

- CONTENT-SEO: 11-14 IST has 1 post. The 18:39 IST run owes the second; rotate to BOFU and avoid the best-X-under-Y and free-samples clusters.
- DEAL-INGEST 11-14 runs next in this session.
- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses TODAY (11-14). Re-verify it.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), SilverArrow B0GD1K98VM (5 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
