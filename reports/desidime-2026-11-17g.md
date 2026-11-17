# DESIDIME-INGEST tick — 2026-11-17g

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards without fetching any per-deal page, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Every fresh candidate was then verified: Amazon in the logged-in Playwright Amazon tab (richDeals profile), Flipkart in a Playwright tab (curl gets reCAPTCHA), and other stores via `productLd()` (±₹1, InStock). Dedup ran by `productId` against the live DB, plus a shadow-row check by slug. Run at about 12:43–12:55 IST.

**Result: 3 new deals pushed LIVE (#16741–#16743). 9 candidates rejected (5 price drift or stock, 1 no ld+json, 2 hub/promo pages, 1 no buy box), and 3 dup LIVE/EXPIRED rows re-checked with no change needed. IndexNow returned HTTP 200 for 6 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 37 |
| Junk, grocery, hub or unresolved (dropped) | 22 |
| Resolved to a single product | 15 |
| Already in the DB (dup) | 3 |
| Rejected in the last 24 h | 0 |
| Fresh candidates | 12 |

Dropped cards included a Van Heusen `/s?` search link, an Ultahost hosting promo and a JioMart icubeswire tracking link.

## Candidates

| Product | Id | Card | PDP | Action |
|---|---|---|---|---|
| Biotique Bio Morning Nectar lotion, 120 ml, pack of 2 | B078LH5DWT | ₹204 | ₹204 / M.R.P. ₹600, in stock, fulfilled by Amazon | Pushed LIVE as #16741 |
| URBN 10000 mAh MagSafe wireless power bank, 22.5 W, with stand | B0FB97VZS7 | ₹1,199 | ₹1,199 / M.R.P. ₹3,999, in stock | Pushed LIVE as #16742 |
| boAt Swift Lynk 3-in-1 USB hub (Flipkart) | USGGVP5ZA2E3GNQJ | ₹299 | ₹299, in stock | Pushed LIVE as #16743 |
| OPPO Reno16c | B0HBBKNFGY | ₹48,999 | ₹52,999 | Rejected: drift |
| Jabra Evolve2 65 | B086MLRY4H | ₹10,964 | ₹13,704 | Rejected: drift |
| Havells Bianca+ geyser | B0FBLX3PXW | ₹9,726 | ₹12,008.70 | Rejected: drift (also drifted on IFS 11-17f) |
| truke Buds Clarity 5 v2 | B0CQLM381M | — | Out of stock | Rejected |
| VIP Bonus vest combo | B09YV753WH | — | No buy box; mobile PDP says currently unavailable | Rejected |
| Dettol kit (Flipkart) | CBKHEPQZ8ARJZHGG | ₹250 | ₹341 | Rejected: drift |
| Digihaat cinnamon | e47d1c39cec4 | — | No ld+json | Rejected |
| Dyson | cbf921cc8678 | — | Sale hub page, not a product | Rejected |
| Klook | 6f90d6024061 | — | Promo page, not a product | Rejected |

All 9 rejects were written to `data/dd-rejected.json` under their `productId` with `Date.now()`, so stage 1 skips them for 24 h. The three non-Amazon rejects were first written under descriptive keys, which stage 1 never matches; they were re-keyed to the real hex productIds before the tick closed.

## Fresh deals

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16741 | Biotique Bio Morning Nectar moisturising lotion, 120 ml, pack of 2 | ₹204 | ₹600 | 66% | Amazon `/dp/B078LH5DWT?tag=ashoksachdev-21` |
| 16742 | URBN 10000 mAh MagSafe wireless power bank, 22.5 W, with stand | ₹1,199 | ₹3,999 | 70% | Amazon `/dp/B0FB97VZS7?tag=ashoksachdev-21` |
| 16743 | boAt Swift Lynk 3-in-1 USB hub | ₹299 | — | — | Flipkart `/p/itme4vr5zgpgyfud?pid=USGGVP5ZA2E3GNQJ&affid=djhackraj` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:3`, all `created:true` (HTTP 201), so no slug restore was needed. The shadow-row check (slug contains the id, or productId in the set) found no legacy rows.
- **Rows:** all three are LIVE. Amazon images come from `m.media-amazon.com`, the boAt image from `rukmini1.flixcart.com`.
- **Biotique M.R.P.:** `.a-text-price` first returned ₹85, which is the per-unit rate. The M.R.P. regex on the raw PDP gave ₹600, and that is what was pushed.
- **boAt:** the listing showed 90% off. That is ≥80%, so the M.R.P. and discountPct were nulled.

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 10652 | Samsung S4 monitor | EXPIRED | No buy box | Stays EXPIRED |
| 12714 | HP 410 Slim Bluetooth mouse | ₹512 | ₹512 | Confirmed, no change. The card's ₹497 is not live. |
| 219 | Creative's gift pack | ₹211 / M.R.P. ₹620 | ₹211, in stock | Confirmed, no change. The card's ₹104 is not live. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs returned **HTTP 200 for 6 URLs** (3 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **Pages on prod:** Biotique 200 (0.22s), URBN 200 (0.27s), boAt 200 (0.23s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.27s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

Run at 12:54 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,163 = 16,163 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,743 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,743 vs 16,743 | OK. The external broadcast cron already picked up this tick's push. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 12:55 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target; the 18:39 IST CONTENT-SEO run may add a fourth (the cap) or skip.

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 14:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
