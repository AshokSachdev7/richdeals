# DESIDIME tick 2026-10-18h (14:33 IST)

**4 deals pushed LIVE (count 4, all created, all slugs 200). IndexNow returned HTTP 200 for 7 URLs.**

## Funnel

| Stage | Count |
|---|---|
| Discovered on the listing cards | 34 |
| Resolved to a product page | 21 |
| Already in the DB (by productId) | 4 |
| Fresh candidates | 17 (15 Amazon, 2 Flipkart) |
| Rejected | 13 |
| Passed | 4 |

## Pushed

| ASIN | Deal | Price | MRP | Verified by |
|---|---|---|---|---|
| B0BWJ64RQS | BASSOHOLIC BLWC01 15W wireless car charger mount | ₹759 | none (the listed ₹4,990 implies 85% off, so it was nulled) | `priceToPay`, In stock, add-to-cart present |
| B0H3BMSM6T | Noise ColorFit Pulse Air smartwatch | ₹999 | none (the listed ₹4,999 implies 80% off, so it was nulled) | `priceToPay`, In stock, add-to-cart present |
| B0F6BTDHFL | Havells FAB BLDC 1200mm 5-star ceiling fan | ₹2,550 | ₹6,100 (58% off) | `priceToPay`, In stock, add-to-cart present |
| B0DHSFF382 | LEGO Harry Potter Charms Class 76442 | ₹1,373 | ₹2,499 (45% off) | `priceToPay`, In stock, add-to-cart present |

The Havells PDP title says "Up to 65%" but is truncated. That claim was left out of the description rather than guessed.

## Rejected

| Product | Card price | Live PDP price | Reason |
|---|---|---|---|
| Jaquline lipstick B0DTPVSDBP | ₹270 | ₹299 | price drift |
| Glen air fryer B0HHMBYNFJ | ₹3,060 | ₹3,399 | price drift |
| LG 32UN880K monitor B0FJFX9LQ1 | ₹36,499 | ₹39,999 | price drift |
| MMTC PAMP 1g gold coin B0FGJ5V2ST | ₹15,190 | ₹16,440 | price drift |
| Bajaj DHX-9 iron B009P2L7CO | ₹858 | ₹1,099 | price drift |
| TCL 65" QD-Mini LED B0F3HWJXZ5 | ₹61,740 | ₹76,990 | price drift (the card price is bank-offer stacked) |
| Lumio Vision 9 65" B0GWF132YH | ₹64,498 | none | no buy box, no add-to-cart |
| Kalyan 2g gold coin B0DHVWY583 | ₹29,660 | none | no buy box (it was also rejected at 18g) |
| Lifelong foot massager B0DBHM2GHV | ₹5,923 | ₹6,999 | price drift |
| Samsung 550L French door fridge B093Q1SLL4 | ₹57,390 | ₹74,990 | price drift (bank offer) |
| Lenovo Idea Tab B0HBBGL6C2 | ₹18,749 | ₹21,999 | price drift (also rejected at 18g) |
| Reynolds pens ×70 (Flipkart) | ₹149 | | the script's ld+json check returned `price-drift` |
| Wakefit Flipper sofa cum bed (Flipkart) | ₹9,589 | | the script's ld+json check returned `price-drift` |

## CEO audit (14:33 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,104 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13629 / 13625. The 4 new rows are waiting for the external broadcast cron. |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |

`/blog` took 1.11 s on the first hit. Four retries took 1.66, 0.82, 0.46 and 0.73 s. The page is `force-dynamic` (pagination through `searchParams`), so Cloudflare does not cache it (`DYNAMIC`, `no-store`) and every request renders a 155 KB page from scratch. That is variance by design, not a regression, so it is not flagged as rot. If it ever goes above 2 s, move it to ISR with `?page` handled by a statically generated `/blog/page/[n]` route.
