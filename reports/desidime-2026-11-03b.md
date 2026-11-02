# DESIDIME 2026-11-03b (04:33 IST)

**Result: 1 new deal is LIVE (#15979, Angrox replacement Fire TV remote, ₹499, verified on the PDP). One dup was price-synced (#13308 Zebronics WiFi adapter, ₹199 → ₹169). IndexNow returned HTTP 200 for 5 URLs.**

## Method

`apps/api/scripts/ingest-desidime.mjs` stage 1 read the cards from `/new` and the homepage. It does no per-deal fetch, applies the JUNK/GROCERY filters, and resolves each `visit.desidime.com` link with curl.

The Playwright MCP is hung and reticle is CONNECTION_CLOSED, so I verified the Amazon candidates over curl instead:
- `pdp.cjs` gave the whole price, availability, add-to-cart, title and hiRes image.
- `pdp2.cjs` gave the `#centerCol` text, which carries the price, M.R.P., brand and ratings.

I deduped by `productId` against the live DB. Flipkart PDPs return a 403 to curl, so this tick had no Flipkart candidates I could verify.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 33 |
| Junk, grocery or other-store drops (incl. Spykar → `/s?` search page) | 17 |
| Resolved to a single product | 15 |
| Dups vs live DB | 3 |
| Rejected in the last 24h (script memory) | 11 |
| Fresh, verified, pushed | 1 |

The 11 already rejected: iQOO 15R, HP 15, LG 34", Mankind sample ₹1, Ambrane powerbank, WHP gold coin, Yardley, TCL 43", Sony A6100, Times Prime ₹1, and the Dell sitewide offer.

## Pushed LIVE

| id | Store | Product | Price | MRP | Off | Verify |
|---|---|---|---|---|---|---|
| 15979 | Amazon | Angrox Replacement Remote for Fire TV Stick 3rd Gen, HD and 4K (B0GS2H9CFV) | ₹499 | ₹2,999 | 83% | `#centerCol` ₹499, M.R.P. ₹2,999, In stock, add-to-cart present, 4.1★ from 15,018 ratings |

The copy states that this is a third-party remote, not an Amazon original. The image is `617zyJl5KTL._SL1500_.jpg`. The deal page returns 200 on prod.

## Dups

| DB id | Product | DB before | PDP now | Action |
|---|---|---|---|---|
| 13308 | Zebronics ZEB-USB150WF1 WiFi USB adapter (B093QCY6YJ) | ₹199 (60%) | ₹169, MRP ₹499 (66%) | Price-synced: price, discount, title, description ("66% discount") and a new PriceHistory row. Slug kept; prod page 200 |
| 15977 | Longway (pushed in 11-03a) | ₹398 | ₹398 | none |
| 5192 | Havells 25L geyser (B0FS13QNRW) | ₹7,190 | ₹7,190 | none. DesiDime's ₹5,465 is a coupon price |

## Freshness

`indexnow-ping.mjs` ran in slug mode for 2 slugs plus 3 hub URLs: **HTTP 200 for 5 URLs**. `sitemap.xml` is ISR (30 min), but neither deal is in the top 100, so neither is listed there. `llms.txt` is force-dynamic. Both deal pages return 200 on prod.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | all 200 | ok |
| DB LIVE / prod API total | 15,421 / 15,421 | equal |
| DB max id | 15,979 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 458 / 0 / 0 | ok |
| Posts per day (IST) | 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:3 | 11-02 missed (past day) |
| Broadcast cursor | 15,978 vs max 15,979 | 1 behind, the external cron will drain it |
| Unpushed commits | 0 | ok |

## Still open

- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409. Re-verifying them is blocked on the browser.
- **The Playwright MCP is hung and reticle is down.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart verification is blocked.
- **Single-deal checks still pending:**
  - #15898 needs a price read.
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
- **The DO token needs rotating.** That is the owner's job.
