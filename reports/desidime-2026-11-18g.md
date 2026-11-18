# DESIDIME-INGEST tick — 2026-11-18g

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on desidime.com/new and the homepage without fetching any deal page, applied the JUNK and GROCERY filters and resolved each Buy Now through visit.desidime.com. Amazon candidates were verified by a same-origin fetch in the logged-in Playwright tab. Flipkart candidates were verified by reading the ld+json `Product.offers` in a Flipkart tab. Run at about 12:46–13:00 IST.

**Result: 8 deals pushed LIVE (#16793–16800), 3 Amazon and 5 Flipkart. The bulk endpoint returned HTTP 201 with count 8, and the readback shows 8 of 8 LIVE. One duplicate LIVE row (#9099) was price-synced from ₹6,315 to ₹5,999. IndexNow returned HTTP 200 for 12 URLs. Every CEO-audit check is green and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 38 |
| Junk or grocery filtered | 15 |
| Resolved to a merchant URL | 20 |
| Already in the DB (dedup) | 4 |
| Rejected in the last 24h | 4 |
| Fresh candidates | 12 |

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16793 | Amazon | B0GSZ8DDJX | Vaseline Gluta-Hya Dewy Radiance Body Lotion 330ml | ₹215 | ₹599 (64% off) |
| 16794 | Amazon | B0HFSB5NWL | GRENARO Wireless Mic for YouTube with Noise Reduction | ₹949 | ₹1,999 (53% off) |
| 16795 | Amazon | B0HPTL5228 | MIKANIX Handheld Ultrasonic Mesh Nebulizer | ₹299 | none |
| 16796 | Flipkart | MIXH9V6BGKZ3SAKB | Havok 750W Juicer Mixer Grinder, 3 Jars, Blue & White | ₹1,236 | ₹3,999 (69% off) |
| 16797 | Flipkart | MIXHHTUEXNZFZKXY | Havok 750W Mixer Grinder + 1100W Dry Iron Combo, 3 Jars, Black | ₹1,609 | ₹2,999 (46% off) |
| 16798 | Flipkart | MIXH5ZXNKMTMDFBZ | Havok 750W Mixer Grinder + 1100W Dry Iron Combo, 4 Jars, Blue & White | ₹1,801 | ₹2,999 (40% off) |
| 16799 | Flipkart | JCKHPUER8YWJUHJJ | METRONAUT Full Sleeve Colorblock Men's Jacket | ₹432 | ₹1,999 (78% off) |
| 16800 | Flipkart | JCKHQHTHARJAVGMZ | METRONAUT Full Sleeve Striped Men's Jacket | ₹541 | none |

Every row was In stock with an add-to-cart button (Amazon) or `InStock` in ld+json (Flipkart), and the page price matched within ₹1. Images come from `m.media-amazon.com` and `rukmini1.flixcart.com`. Affiliate links: Amazon `/dp/ASIN?tag=ashoksachdev-21`, Flipkart `/p/itm…?pid=…&affid=djhackraj`.

## Notes

- **MRP dropped on two rows** under the ≥80%-off rule: the MIKANIX nebulizer (listed MRP implied 82% off) and the METRONAUT striped jacket (₹2,999, also 82% off). Both show price only.
- **GRENARO mic** shows a clip coupon on the PDP. The description says the checkout price can differ.
- **Nebulizer** copy tells readers to check with a doctor about medicine and dose. No medical claims.
- **#9099 Maharaja Whiteline EDNIS NEO 25L geyser** (B0FXX1XRWJ) was reposted on DesiDime. The PDP now shows ₹5,999, so the row's price moved from ₹6,315 to ₹5,999. The MRP stays at ₹9,599, and the title has no ₹ to fix. The slug was included in the IndexNow ping.
- **Same-price duplicates, no change:** #219 (B009319D46), #6981 (B01C8P29T4), #16792 (B0GC4J22D3).

## Rejected

| productId | Product | Reason |
|---|---|---|
| B0DDPY9J3J | Skullcandy Smokin Buds XT | Currently unavailable |
| B0HGFVR965 | Crompton Regera 25L geyser | Price drift: PDP ₹7,629 vs card ₹7,129 |
| B08P41Q9SS | Epson DS-530 II scanner | Price drift: PDP ₹33,349 vs card ₹31,349 |
| WMNHKBJ5TJESSE3S | BOSCH 7kg washing machine | Already in `dd-rejected.json` |

The three new rejects were written to `data/dd-rejected.json` with `Date.now()`.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 8 new slugs plus #9099, **HTTP 200 for 12 URLs** (9 slugs and the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only by design, so new rows stay out until they rank there.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.54s) |
| /offers | 200 (0.17s) |
| /blog | 200 (0.81s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.67s) |
| /vaseline-gluta-hya-dewy-radiance-body-lotion-330ml-b0gsz8ddjx | 200 (0.26s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 13:00 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,220 = 16,220 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,800 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,792 vs 16,800 | OK. The 8 new rows await the external broadcast cron, which drains them on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499. The 77% discount may rest on an inflated MRP.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** title ₹ or howTo ₹ that differs from `price` on rows created before the check.
- **IFS redirector:** dead at g through r (12 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 14:43 IST, per CronList. Other runs on 11-18 (IST): SITEMON and DEAL-INGEST at 12:57, TG at 13:03, INDEXNOW at 13:05, CONTENT-SEO at 18:39. On 11-19: SCHEMA-AUDIT at 04:39 and SEO-AUDIT-FIX at 05:58. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
