# DESIDIME-INGEST tick — 2026-11-19g

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage listing cards. It did not fetch any per-deal pages. It applied the JUNK and GROCERY filters and resolved every Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were then read on the PDP in the logged-in Playwright tab, using the `#centerCol` price and M.R.P. Non-Amazon candidates were checked against their `ld+json` price, which had to be within ±₹1 and InStock. Candidates were deduped by productId against the live DB, and the survivors were pushed `status:live`. Run at about 12:43–13:10 IST.

**Result: 12 deals pushed (#16915–#16926). The bulk push returned HTTP 201 with count 12, all created:true, and each productId has exactly one row. Two duplicate LIVE rows were repriced (#11658, #9894), and three were confirmed at the same price. 2 candidates were rejected. IndexNow returned HTTP 200 for 17 URLs. Prod returned 200 on 7 of 7 endpoints and on the new pages probed, and every CEO-audit check is green.**

## Pushed

| Deal | Slug | Store | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| #16915 | `solimo-plastic-storage-container-set-of-15-b0ghnr43p7` | Amazon | ₹629 | ₹1,199 | 48% |
| #16916 | `samsung-galaxy-ring-smart-ring-b0djm98jdl` | Amazon | ₹19,125 | ₹39,999 | 52% |
| #16917 | `flux-15l-storage-water-heater-b0c3gm8hpb` | Amazon | ₹8,639 | ₹17,990 | 52% |
| #16918 | `kreo-surge-ultra-wireless-gaming-controller-b0ghn2nlg1` | Amazon | ₹3,699 | ₹8,999 | 59% |
| #16919 | `milton-artis-800w-mixer-grinder-3-jars-blender-b0g2ymchgw` | Amazon | ₹3,622 | ₹8,449 | 57% |
| #16920 | `iball-dhun-180-50w-bluetooth-party-speaker-b0gx9bs2gl` | Amazon | ₹4,499 | ₹9,999 | 55% |
| #16921 | `cg-iraya-5-9l-instant-water-geyser-b0h9fk9xzz` | Amazon | ₹3,199 | ₹7,990 | 60% |
| #16922 | `havells-instanio-3l-instant-water-heater-b078jdnzj8` | Amazon | ₹3,690 | ₹6,190 | 40% |
| #16923 | `apple-watch-series-11-gps-cellular-42mm-natural-titanium-b0fqfjf5kr` | Amazon | ₹49,990 | ₹79,900 | 37% |
| #16924 | `sony-mdr-zx310ap-wired-on-ear-headphones-blue-b00k0amyfo` | Amazon | ₹851 | ₹2,190 | 61% |
| #16925 | `philips-tab4120bk-20w-bluetooth-soundbar-b0g7kkjr35` | Amazon | ₹1,679 | ₹3,999 | 58% |
| #16926 | `dell-kb216-ms116-wired-keyboard-mouse-combo-b009dix5qq` | Amazon | ₹875 | ₹2,798 | 69% |

- **Affiliate links:** all 12 are Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. No Myntra or other non-Amazon deal survived verification, so neither InRDeals nor Cuelinks was used.
- **Coupons:** Havells Instanio #16922 has a ₹250 clip coupon (effective ₹3,440), and Flux #16917 has a ₹1,000 clip coupon (effective ₹7,639). Both are recorded as couponNote, and the stored price stays at the pre-coupon PDP price.
- **Card vs PDP drift:** Dell (card ₹872), Sony (card ₹826), Apple Watch (card ₹47,499, most likely a bank offer) and Samsung Galaxy Ring (card ₹17,875) all differed from the PDP. The PDP price was published in every case, and the copy for the Apple Watch says bank offers at checkout may lower it further.
- **M.R.P. reads:** `.a-text-price` returned a per-unit rate on the Solimo and besquestix PDPs. The M.R.P. was taken from the "M.R.P." text in `#centerCol` instead.
- **Low stock:** Flux #16917 showed only 1 unit left at check time.
- **Copy and images:** each description and set of how-to steps was written for this page, and no source text was copied. All images come from `m.media-amazon.com`.
- **Prod pages:** Kreo #16918, Apple Watch #16923 and Flux #16917 return 200, with the Offer price matching the DB (3699, 49990, 8639).

## Title-₹ guard

Before the POST, the script checked every ₹ figure in each title and how-to step against the numeric price, skipping strings that describe a coupon. It also checked that each title carries `(N% Off)` equal to `round((1 − price/mrp) × 100)`. All 12 passed.

## Duplicate LIVE rows

| Deal | Before | PDP now | Action |
|---|---|---|---|
| #11658 besquestix heel socks | ₹185, 69% off | ₹195, 67% off | Repriced. The title was rewritten to match, and a priceHistory row was written. |
| #9894 Havells ESO 750W mixer grinder | ₹3,673, 37% off | ₹3,495, 40% off, plus a 20% clip coupon | Repriced. The title was rewritten to match, and a priceHistory row was written. The stale "₹690 coupon … ₹2,983" couponNote was replaced with "Apply the 20% coupon on the product page before checkout." Prod serves the new 3495 Offer price. |
| #219 Creative gift pack | ₹145 | ₹145 | Same price, no write |
| #15305 boAt Stone Edge | ₹3,299 | ₹3,299 | Same price, no write |
| #16561 Eureka Forbes AP 175 (Flipkart) | ₹3,599 | ₹3,599, InStock | Same price, no write |

All slugs are unchanged.

## Rejected

| Key | Product | Reason |
|---|---|---|
| B0CGJFJ8WY | Luke and Lilly | No price and no add-to-cart on the PDP |
| e62745a1dad5 | Hamaramall Bombay Shaving lotion | No `ld+json`, so the price cannot be verified (already in the reject list) |

`B0CGJFJ8WY` was added to `data/dd-rejected.json` with `Date.now()` (2,126 keys).

## Freshness

| Check | Result |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 14 slugs plus 3 hubs) | HTTP 200, 17 URLs |
| `sitemap.xml` | ISR 1800s. Deals child is top-100 only by design, so it was not regenerated. |
| `llms.txt` | `force-dynamic`, no new hub page, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.55s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.48s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,318 = 16,318 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,926 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,914 vs 16,926 | OK. The gap is this tick's 12 deals, which the external tg-broadcast cron will pick up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Local API on :4000 | Up | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):**

| Day | Posts |
|---|---|
| 11-09 | 3 |
| 11-10 | 3 |
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| **11-19** | **3** (target met, under the cap of 4) |

## Still open

These items are carried from SITEMON 19l. The only change from this tick is a new low-stock item.

- the GCP live host still needs owner confirmation;
- #11896 and #14635 have no `priceValidUntil`;
- 95% of LIVE deals have no `priceValidUntil`;
- GSC traffic is down about 70% since 10-28;
- the IFS redirector is dead;
- the inflated M.R.P. list;
- the no-buy-box watch list;
- low-stock items, now including #16917 Flux (1 left);
- the Stage 1 Flipkart gaps;
- ASIN reuse;
- the DO API token still needs rotating.
