# DESIDIME-INGEST tick — 2026-11-18i

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage. It did not fetch any per-deal page. The JUNK and GROCERY filters ran on every card, and each Buy Now link was resolved through `visit.desidime.com`. Every Amazon candidate was then verified with a same-origin fetch of the PDP in the logged-in Playwright Amazon tab. That fetch read `.a-price-whole` in the core price block, `#availability`, the add-to-cart button and the hiRes image. The mobile `/gp/aw/d/` page served as the fallback when the desktop PDP showed no buy box. The Flipkart and Myntra candidates were read in browser tabs. Run at about 16:15–16:50 IST.

**Result: 7 deals pushed LIVE (#16813–16819): 5 Amazon, 1 Flipkart and 1 Myntra. The bulk endpoint returned HTTP 201 with count 7 (all `created:true`), and the readback shows all 7 LIVE. One EXPIRED page (#15386, JBL Wave Buds 2) was revived at a verified price. IndexNow returned HTTP 200 for 11 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Candidates written to `apps/api/dd-candidates.json` | 18 (15 Amazon, 2 Flipkart, 1 Myntra) |
| Already in the DB | 4 (#1754 HP M10, #219 Creative's gift pack, #16768 Lumio, #15386 JBL, the last one EXPIRED) |
| Rejected after verification | 11 |
| Pushed | 7 |
| Revived | 1 |

Stage 1 did not record its card and junk-filter counts for this run, so only the candidate count is reported.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16813 | Amazon | B0C592Y5YJ | Kuber Industries Non-Woven Drawstring Shoe Bags, Pack of 6 | ₹156 | ₹659 (76% off) |
| 16814 | Amazon | B0CV5MDMLL | Ant Esports PS500 Power Strip, 5 sockets, 3 m cord | ₹312 | — (nulled) |
| 16815 | Amazon | B07PFF4RYC | Storite Padded Mini Sling Crossbody Bag, Dark Grey | ₹310 | — (nulled) |
| 16816 | Amazon | B0H4ZXDQHQ | PunnkFunnk Gaming Phone Cooler with RGB, Black Max | ₹799 | ₹2,999 (73% off) |
| 16817 | Amazon | B08ZZW5HDJ | Dove Eventone Deodorant Spray for Women, 150 ml | ₹144 | — (nulled) |
| 16818 | Flipkart | ESOFNYHATJ5F3PGH | eSYSTEMS E-009 6A Three-Pin Socket | ₹215 | ₹999 (78% off) |
| 16819 | Myntra | 35665810 | Levi's Men Loose Fit Typography Printed Pure Cotton Co-Ords | ₹1,287 | ₹4,599 (72% off) |

## Notes

- **Verification:** every pushed row was In stock, and each Amazon row had an add-to-cart button. The PDP price matched the card to within ₹1.
- **Nulled MRPs:**
  - The Ant Esports strip listed ₹1,899, which would imply 83.6% off.
  - The Storite sling listed ₹1,699, which would imply 81.8% off.
  - Both are over the 80% threshold.
  - The Dove PDP's struck-through ₹96 is a per-unit rate below the price.
  - Those three pages show the price with no discount claim.
- **Affiliate matrix:**
  - Amazon: `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
  - Flipkart: `/p/itm…?pid=…&affid=djhackraj`.
  - Myntra: InRDeals (`inr.deals/track?id=inr678975705…`).
  - No other store came through, so Cuelinks was not used.
- **Images:** from the marketplace CDNs (`m.media-amazon.com`, `rukmini1.flixcart.com`, `assets.myntassets.com`).
- **Copy:** titles and descriptions were rewritten, and no DesiDime text was copied.

## Revived: #15386 JBL Wave Buds 2

| Field | Before | After |
|---|---|---|
| status | EXPIRED | LIVE |
| price / MRP | old | ₹2,999 / ₹6,999 (57% off) |

- **PDP read:** ₹2,999 against ₹6,999, In stock, add-to-cart present.
- **Method:** a direct `prisma.deal.update` on status, price, MRP, discountPct, title and description, so the slug `jbl-wave-buds-2-anc-wireless-earbuds-b0dkjjqlk6` stays unchanged.
- **Price history:** a `priceHistory` row `{dealId: 15386, price: 2999}` gives the Offer a fresh `priceValidUntil`.

## Dups with no change

| id | productId | Product | DB = PDP |
|---|---|---|---|
| 1754 | B083GLD16Q | HP M10 mouse | ₹252 / ₹649 |
| 219 | B009319D46 | Creative's gift pack | ₹211 / ₹620 |
| 16768 | B0FF5H4PGD | Lumio Arc 5 projector | ₹5,500, "Only 2 left". The card's ₹4,950 is below the PDP price, so it is stale. |

## Rejected

| productId | Product | Reason |
|---|---|---|
| B07HFBTV74 | Durfi mattress | Price drift: PDP ₹11,398 vs card ₹10,043 |
| B0DHVPD75Y | Lenovo Tab K11 | Price drift: PDP ₹19,999 vs card ₹19,958 |
| B09X5FSQDN | Razer Barracuda X | Price drift: PDP ₹7,213 vs card ₹6,492 |
| B0CCDN6Y2K | Callmate 50000mAh power bank | Price drift: PDP ₹2,698 vs card ₹2,566 |
| B0GXQD4VNT | Body massager | Price drift: PDP ₹999 vs card ₹980 |
| B0HCZJTD61 | JBL PartyBox 130 | Price drift: PDP ₹36,499 vs card ₹33,499 |
| B0HFKMWGX1 | Elica chimney | Price drift: PDP ₹15,483 vs card ₹12,140 |
| B0GHQVNMKQ | Panasonic AC | Price drift: PDP ₹35,490 vs card ₹31,990 |
| B0DB63LKMG | Godrej 472 L fridge | No buy box on desktop or mobile (mobile shows ₹48,990 with no add-to-cart) |
| B0G33921Z7 | Whirlpool 192 L fridge | No buy box (mobile shows ₹17,990 with no add-to-cart) |
| TABH33EK6DHHFQWH | Flipkart Redmi Pad SE | Variant and price drift |

All 11 rejects were written to `data/dd-rejected.json` with `Date.now()`. The file now holds 2,098 keys.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 7 new slugs and the JBL slug, **HTTP 200 for 11 URLs** (the 8 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.16s) |
| /blog | 200 (0.86s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.20s) |
| /llms.txt | 200 (0.64s) |
| /kuber-industries-non-woven-drawstring-shoe-bags-pack-of-6-b0c592y5yj | 200 (0.20s) |
| /jbl-wave-buds-2-anc-wireless-earbuds-b0dkjjqlk6 | 200 (0.28s) |
| /levi-s-men-loose-fit-typography-printed-pure-cotton-co-ords-35665810 | 200 (0.19s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 16:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,240 = 16,240 (+8: 7 new and 1 revived) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,819 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,812 vs 16,819 | OK. #16813 to #16819 are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 16:50 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 0 of 85 resolved at DEAL-INGEST 18h. If the 16:53 and 18:53 IST ticks also resolve 0, the IFS cron slot gets repointed to another source at the 18:53 tick.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** still only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 16:50, DEAL-INGEST 16:53, TG 17:03, DESIDIME 18:43, CONTENT-SEO 18:39, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
