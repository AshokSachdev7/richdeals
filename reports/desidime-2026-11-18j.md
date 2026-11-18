# DESIDIME-INGEST tick — 2026-11-18j

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage, with no per-deal page fetch. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and ran the `productLd` check (ld+json price within ₹1, InStock) on non-Amazon merchants. Amazon candidates and the Amazon rows already in the DB were verified with a same-origin fetch of the PDP in the logged-in Playwright Amazon tab, reading `.a-price-whole` in the core price block, `#availability`, the add-to-cart button, the `data-old-hires` image and the MRP in the core block and `#centerCol`. Run at about 18:43–18:50 IST.

**Result: 1 deal pushed LIVE (#16832, Amazon). 4 existing LIVE rows were price-synced to their PDPs. 6 fresh candidates were rejected for price drift or missing data. The bulk endpoint returned HTTP 201 with count 1 (`created:true`, so no slug restore was needed), and the readback shows it LIVE. IndexNow returned HTTP 200 for 8 URLs. Prod returned 200 on 9 of 9 endpoints and every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards read | 34 |
| Dropped as junk or not a product | 10 (Flipkart LiveShop play link, Forever New and Rare Rabbit sale collections, Amazon `/s?` Panasonic search, and others) |
| Resolved to a single product | 20 |
| Already in the DB | 7 |
| Rejected in the last 24 hours (`rej24h`) | 6 |
| Fresh candidates | 7 |
| Pushed | 1 |

The 6 `rej24h` skips were B0GHQVNMKQ Panasonic AC, B0HCZJTD61 JBL PartyBox, B0DB63LKMG Godrej fridge, B0DHVPD75Y Lenovo Tab K11, B09YV753WH VIP vest and Flipkart CBKHEPQZ8ARJZHGG Dettol.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16832 | Amazon | B0DWF1X7C5 | LEGO Speed Champions Dodge Challenger SRT Hellcat Sports Car 77237 | ₹319 | ₹359 (11% off) |

## Notes

- **Verification:** in stock, add-to-cart button present, sold by Opptra. The PDP price matched the card.
- **Affiliate matrix:** Amazon `/dp/B0DWF1X7C5?th=1&psc=1&tag=ashoksachdev-21`. No Myntra or other store came through, so InRDeals and Cuelinks were not used.
- **Image:** `m.media-amazon.com/images/I/81YJa9QUsPL._SL1500_.jpg`. No DesiDime image was used.
- **Copy:** the title and description were written fresh; no DesiDime text was copied.

## Price-synced

Four of the 7 rows already in the DB had moved on the PDP. Each was updated in place with `prisma.deal.update` (slug unchanged) and got a new priceHistory row.

| id | Product | Price | MRP | Notes |
|---|---|---|---|---|
| 174 | Shimmer Pro Max toilet cleaner, 10 L | ₹625 → ₹495 | ₹1,800 kept | Now 73% off (was 65%). |
| 4927 | Bouncefit MG-203 massage gun | ₹649 → ₹499 | ₹2,999 nulled | ₹2,999 would imply 83% off, over the 80% rule. The old MRP and 78%-off claim were removed from the copy. The card claimed ₹389. |
| 5836 | Bouncefit AS-701 scalp massager | ₹599 → ₹499 | ₹2,999 nulled | Same 80% rule. The card claimed ₹389. |
| 8996 | Ant Globe 10 wired mouse | ₹89 → ₹109 | ₹749 nulled | The PDP MRP of ₹699 would imply 84% off. Sold by Clicktech. |

The other 3 were left unchanged:

- **#219 Creative's gift pack (B009319D46):** PDP ₹211 matches the DB. The card's ₹104 was stale.
- **#16816 (B0H4ZXDQHQ, ₹799) and #16829 (B0HF7DDSR4, ₹392):** card, PDP and DB agree.

## Rejected

| Store | productId | Product | Reason |
|---|---|---|---|
| Shopsy | — | Baidyanath Chyawanprash, 1 kg | Price drift vs card ₹188. |
| Swiggy | — | NOICE chips | No ld+json; also grocery. Card ₹16. |
| Flipkart | NDFGRK5DRJUZ38ZA | Open Secret cashews | Price drift vs card ₹760. |
| Flipkart | APFHS6VSJJKZBSZW | Coway Airmega 50 | Price drift vs card ₹6,442. |
| Flipkart | TABH33EKYNNPKGGY | REDMI Pad SE | Price drift vs card ₹14,639. |
| Amazon | B09WTTFK5S | KEXIN 64 GB USB drive, pack of 3 | Price drift: PDP ₹1,399 vs card ₹1,332. |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the new slug and the 4 synced slugs, **HTTP 200 for 8 URLs** (the 5 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.81s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.60s) |
| /lego-speed-champions-dodge-challenger-srt-hellcat-sports-car-77237-b0dwf1x7c5 | 200 (0.22s) |
| /bouncefit-mg-203-handheld-massage-gun | 200 (0.27s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 18:49 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,253 = 16,253 (+1) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,832 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,832 = 16,832 | OK. Fully drained; #16832 was already broadcast. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 resolved at 18h and 7 of 91 at 18i, so the slot stays on IFS. It gets repointed if a tick resolves 0 again.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`. #4927 was one; it was fixed this tick.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **DesiDime card prices lag the PDP:** Bouncefit cards showed ₹389 against ₹499 live, and Creative's showed ₹104 against ₹211. The PDP read stays mandatory for dup rows.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 18:50, DEAL-INGEST 18:53, TG 19:03, INDEXNOW 19:05, DESIDIME 20:43. On 11-19: CONTENT-SEO 00:39, SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
