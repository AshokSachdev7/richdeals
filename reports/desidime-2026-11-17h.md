# DESIDIME-INGEST tick — 2026-11-17h

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards without fetching any per-deal page, applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Every fresh candidate was then verified: Amazon in the logged-in Playwright Amazon tab (richDeals profile), and other stores via `productLd()` (±₹1, InStock). Dedup ran by `productId` against the live DB, plus a shadow-row check by slug and affiliate URL. Run at about 14:45–14:50 IST.

**Result: 5 new deals pushed LIVE (#16747–#16751). 6 candidates rejected (4 price drift, 2 no ld+json), and 4 dup rows re-checked with no change needed. IndexNow returned HTTP 200 for 8 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk, grocery, hub, other-store or unresolved (dropped) | 13 |
| Resolved to a single product | 19 |
| Already in the DB (dup) | 4 |
| Rejected in the last 24 h | 4 |
| Fresh candidates | 11 |

The 4 skipped as rejected in the last 24 h were Klook, Havells B0FBLX3PXW, VIP B09YV753WH and Dettol CBKHEPQZ8ARJZHGG, all from tick 11-17g.

Dropped cards included:
- A Wildcraft Flip Ruck 45 L rucksack at ₹740. It resolved to a Flipkart `/a/p/b?pid=RKSF6DHGYQBE9GUP&affid=…` path, not `/p/itm…`, so stage 1 cannot build our Flipkart link from it.
- NIVEA and DECATHLON Myntra listing pages.
- A Creative puzzles `/s?` search link.

## Candidates

| Product | Id | Card | PDP | Action |
|---|---|---|---|---|
| Dime Store wooden wall-mounted TV unit, Large, white shelves | B08Q1RDKVK | ₹759 | ₹759, "Only 2 left in stock" | Pushed LIVE as #16747 |
| Amazon Basics tripod easel, up to 5 ft, black | B0D9MVLBRB | ₹512 | ₹512, in stock | Pushed LIVE as #16748 |
| AO Smith X2 Neo UV+US+SAPC water purifier | B0BHYVJFGC | ₹6,722 | ₹6,722 / M.R.P. ₹12,100, in stock | Pushed LIVE as #16749 |
| Amazon Basics 25W Type-C compact wall charger, white | B0DS688NKW | ₹305 | ₹305 / M.R.P. ₹1,099, in stock | Pushed LIVE as #16750 |
| GM G+ 25W GaN charger with 60W USB-C to C cable | B0FYQ5RWWX | ₹399 | ₹399 / M.R.P. ₹1,199, in stock | Pushed LIVE as #16751 |
| Shatras | B09WYP62G4 | ₹274 | ₹322 | Rejected: drift |
| Vivela | B0F9PGDQ5N | ₹182 | ₹187 | Rejected: drift |
| durfi | B07HFBTV74 | ₹10,043 | ₹11,398 | Rejected: drift |
| Jabra Speak 510 | B06X15NDTV | ₹11,840 | ₹14,799 | Rejected: drift |
| Hamaramall item | 57dd73dfa98a | — | No ld+json | Rejected |
| Bigbasket item | ad2c64f62861 | — | No ld+json | Rejected |

All 6 rejects were written to `data/dd-rejected.json` under their `productId` with `Date.now()`, so stage 1 skips them for 24 h. The Hamaramall and Bigbasket ids were already there from an earlier tick; their timestamps were refreshed.

## Fresh deals

| Id | Product | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 16747 | Dime Store wooden wall-mounted TV unit, Large, white shelves | ₹759 | — | — | Amazon `/dp/B08Q1RDKVK?tag=ashoksachdev-21` |
| 16748 | Amazon Basics tripod easel, adjustable up to 5 ft, black | ₹512 | — | — | Amazon `/dp/B0D9MVLBRB?tag=ashoksachdev-21` |
| 16749 | AO Smith X2 Neo UV+US+SAPC water purifier | ₹6,722 | ₹12,100 | 44% | Amazon `/dp/B0BHYVJFGC?tag=ashoksachdev-21` |
| 16750 | Amazon Basics 25W Type-C compact wall charger, white | ₹305 | ₹1,099 | 72% | Amazon `/dp/B0DS688NKW?tag=ashoksachdev-21` |
| 16751 | GM G+ 25W GaN charger with 60W USB-C to C cable | ₹399 | ₹1,199 | 67% | Amazon `/dp/B0FYQ5RWWX?tag=ashoksachdev-21` |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:5`, all `created:true` (HTTP 201), so no slug restore was needed. The shadow-row check (productId, slug or affiliate URL containing the id) found no legacy rows.
- **Rows:** all five are LIVE, with `m.media-amazon.com` hiRes images keyed to the `landingAsinColor` variant.
- **M.R.P. nulled:** the Dime Store listing showed 85% off (M.R.P. ₹4,999) and the easel 83% off (M.R.P. ₹2,999). Both are ≥80%, so the M.R.P. and discountPct were nulled.
- **Amazon Basics charger M.R.P.:** the raw-HTML M.R.P. regex gave ₹446, while `#corePriceDisplay .a-text-price` gave ₹1,099 on two separate reads. ₹1,099 was pushed.
- **Copy:** every ₹ in the titles matches the numeric price. The AO Smith description states the TDS-below-200 limit from the PDP title, so buyers on borewell water are not misled.
- **Low stock:** #16747 joins the low-stock re-check list.

## Dup re-checks

| Id | Product | DB | PDP | Action |
|---|---|---|---|---|
| 10652 | Samsung S4 monitor (B0DQ57M8HC) | EXPIRED | No buy box | Stays EXPIRED |
| 12714 | HP 410 Slim Bluetooth mouse (B0B2PGJHMT) | ₹512 | ₹512 | Confirmed, no change |
| 219 | Creative's gift pack (B009319D46) | ₹211 / M.R.P. ₹620 | ₹211 / M.R.P. ₹620 | Confirmed, no change |
| 16740 | Casio Youth LF-30W-3ADF (B0FD3MCMTH) | ₹1,497 | ₹1,497 (read at about 14:00 IST, tg-monitor 11-17o) | No change |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 5 new slugs returned **HTTP 200 for 8 URLs** (5 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **Pages on prod:** Dime Store 200 (0.36s), easel 200 (0.22s), AO Smith 200 (0.27s), Amazon Basics charger 200 (0.26s), GM charger 200 (0.29s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.45s) |
| /offers | 200 (0.15s) |
| /blog | 200 (1.08s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.68s) |

## CEO audit

Run at 14:49 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,171 = 16,171 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,751 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,746 vs 16,751 | OK. The 5-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 14:50 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target; the 18:39 IST CONTENT-SEO run may add a fourth (the cap) or skip.

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, plus #16747 ("Only 2 left").
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **Stage 1 skips Flipkart `/a/p/b?pid=` links:** the Wildcraft card was lost this way. If more cards use this path, stage 1 should map the `pid` to a `/p/itm…` URL through the Flipkart tab instead of dropping it.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 16:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
