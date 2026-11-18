# DESIDIME-INGEST tick — 2026-11-18h

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage. It did not fetch any per-deal page. The JUNK and GROCERY filters ran on every card, and each Buy Now link was resolved through `visit.desidime.com`. Every Amazon candidate was then verified with a same-origin fetch of the PDP in the logged-in Playwright Amazon tab. That fetch read `.a-price-whole` in the core price block, `#availability`, the add-to-cart button and the hiRes image. The mobile `/gp/aw/d/` page served as the fallback when the desktop PDP showed no buy box. Run at about 14:43–14:47 IST.

**Result: 5 deals pushed LIVE (#16805–16809), all from Amazon. The bulk endpoint returned HTTP 201 with count 5, and the readback shows all 5 LIVE. IndexNow returned HTTP 200 for 8 URLs. Every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 36 |
| Junk, grocery or non-product links filtered | 19 (includes Myntra category links for Reebok and Rare Rabbit) |
| Resolved to a product | 15 |
| Already in the DB | 1 (B009319D46, LIVE as #219) |
| Rejected in the last 24h | 3 (B0HGFVR965 Crompton Regera, B07HFBTV74 Durfi mattress, B08P41Q9SS Epson DS-530 II) |
| Fresh candidates | 11 |
| Pushed | 5 |

Stage 1 also skipped Flipkart CBKHEPQZ8ARJZHGG, a Dettol kit carded at ₹250, because its price had drifted.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16805 | Amazon | B0H6N2QB6R | Active Pain Relief Cream for Knee, Joint and Back Pain | ₹99 | — (nulled) |
| 16806 | Amazon | B0F9TFTQM6 | Colors Queen Nail Trend Glossy Nail Paint, Set of 3 with Remover Wipes | ₹135 | — (nulled) |
| 16807 | Amazon | B0GN2TCG32 | GLUN 50x25mm Direct Thermal Sticker Roll, 1000 Labels | ₹142 | ₹499 (72% off) |
| 16808 | Amazon | B0GRV17BMX | Amazon Basics 61-Inch Tripod Stand with Mobile Phone Holder | ₹988 | ₹2,999 (67% off) |
| 16809 | Amazon | B0CRDZ4TPC | Nayasa Easy Containers 22, 2000 ml, Set of 2 | ₹259 | ₹1,259 (79% off) |

## Notes

- **Verification:** every pushed row was In stock with an add-to-cart button. The PDP price matched the card to within ₹1. The Nayasa containers were carded at ₹260 and read ₹259 on the PDP.
- **Nulled MRPs:** the pain cream listed ₹599 and the nail paint ₹776. Each would imply 83% off, which is over the 80% threshold, so both MRPs were nulled. Those pages show the price with no discount claim.
- **Images:** from `m.media-amazon.com`.
- **Affiliate links:** `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
- **Copy:** titles and descriptions were rewritten, and no DesiDime text was copied.
- **Store mix:** no Myntra or other non-Amazon candidate survived to verification this tick, so neither InRDeals nor Cuelinks was used.
- **Dup check:** B009319D46, a Creative's gift pack, is LIVE as #219 at ₹211 against an MRP of ₹620. The PDP read ₹211 / ₹620, In stock, with an add-to-cart button, so no price-sync was needed. The card's ₹104 was stale.

## Rejected

| productId | Product | Reason |
|---|---|---|
| B00ZYLMQH0 | Dell KB216 keyboard | Price drift: PDP ₹563 vs card ₹529 |
| B0FBLX3PXW | Havells Bianca+ 15L water heater | Price drift: PDP ₹13,343 vs card ₹9,726 |
| B0H2DWFYR7 | Party Co glue dots | No buy box on desktop or mobile; no price |
| B0G9194VNK | Halonix Fan-O-Light | No buy box; "Currently unavailable" |
| B09YV753WH | VIP vest | No buy box; unavailable, "See All Buying Options" only |

All five rejects were written to `data/dd-rejected.json` with `Date.now()`.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 5 new slugs, **HTTP 200 for 8 URLs** (the 5 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.52s) |
| /offers | 200 (0.29s) |
| /blog | 200 (0.81s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.60s) |
| /amazon-basics-61-inch-tripod-stand-with-mobile-phone-holder-b0grv17bmx | 200 (0.23s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 14:47 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,229 = 16,229 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,809 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,804 vs 16,809 | OK. The 5 new rows are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList in SITEMON 18n, about 13:50 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** 7 of 99 resolve, all Amazon; the rest 302 to the homepage.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 14:50, DEAL-INGEST 14:53, TG 15:03, DESIDIME 16:43, CONTENT-SEO 18:39, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
