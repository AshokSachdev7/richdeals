# DESIDIME tick 2026-10-19b (12:35 IST)

**3 new deals pushed LIVE** (1 Myntra, 2 Amazon).
- The bulk call returned 201 with count 3, all `created: true`.
- All 3 slugs return 200.
- IndexNow returned HTTP 200 for 6 URLs (the 3 slugs plus the 3 hubs).

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 39 |
| Resolved to a single product | 28 |
| Already in the DB | 2 |
| Fresh candidates | 26 (24 Amazon, 1 Myntra, 1 Bigbasket) |
| Non-Amazon passed `productLd()` | 1 (Myntra) |
| Amazon passed the product-page check | 2 of 23 checked (the ₹1 sample listing was skipped as junk) |

## Pushed

| Store | Deal | Price / M.R.P. | Affiliate |
|---|---|---|---|
| Myntra | Teakwood Leathers Concentrix 8-wheel cabin trolley 38L | ₹899; M.R.P. set to null (₹8,199 implied 89% off) | InRDeals |
| Amazon B0BBRJVLWD | Portronics Adapto 45 22.5W GaN charger | ₹349 / ₹999 (65%) | `ashoksachdev-21` |
| Amazon B0C1S894S3 | Wakefit waterproof terry mattress protector, King | ₹724 / ₹1,422 (49%) | `ashoksachdev-21` |

Notes:
- **Myntra:** the ld+json price was ₹899 and in stock. The image is from the Myntra CDN.
- **Wakefit:** the card said ₹992, but the product page showed ₹724. The deal is pushed at the product-page price.
- **Images:** both Amazon images are `#landingImage` hiRes from `m.media-amazon.com`.
- **Copy:** all titles and descriptions are original. DesiDime's tags (`desidime01-21`, `ascsubtag`) and the Cuelinks UTM tail on the Myntra URL were stripped.

## Rejected

The card prices are mostly after a bank offer. Amazon product pages show prices 5-70% higher.

| Reason | Deals |
|---|---|
| **Price drift (card → product page)** | realme Air 7 ₹2,689 → ₹2,988<br>SOLARA pressure pan ₹1,507 → ₹2,599<br>Larah 35-pc dinner set ₹1,399 → ₹1,699<br>GOVO 950 ₹5,580 → ₹6,199<br>Sony HT-S100F ₹6,691 → ₹7,989<br>USPA jeans ₹519 → ₹1,400<br>Lenovo Idea Tab ₹27,999 → ₹32,999<br>IdeaPad Slim 3 ₹65,990 → ₹74,990<br>TCL 65" QD-Mini LED ₹61,740 → ₹76,990<br>Lenovo V15 ₹41,490 → ₹44,990<br>iFFALCON 65" ₹32,499 → ₹39,999<br>Centuary mattress ₹6,599 → ₹10,504<br>Mivi Nex 650 ₹5,850 → ₹6,499<br>Atomberg Althea ₹11,749 → ₹13,499<br>Solimo recliner ₹10,178 → ₹11,309<br>ECOVACS WINBOT ₹15,499 → ₹16,999<br>Crossbeats Lumex Flix ₹14,249 → ₹14,999<br>Kalyan gold coin ₹29,660 → ₹32,763 |
| **No buy box** | Noise ColorFit Pro 5, pTron Dynamo 10000mAh |
| **FMCG and price drift** | Himalaya toothpaste 4-pack ₹213 → ₹388 |
| **Junk** | Amazon ₹1 sample |
| **No ld+json, grocery** | Bigbasket baby wipes |

## CEO audit (12:35 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-17: 4, 10-18: 4, 10-19: 2. The CONTENT-SEO cron still has runs left today. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,207 (+3) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13731, 0 min old |
| DB max id / broadcast cursor | 13731 / 13728. The gap of 3 is this batch, which the external broadcast cron has not reached yet. Not flagged. |
| Prod endpoints (7) | all 200, max 0.63 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | All 9 roster jobs are present (checked at 12:07) |

No rot found.
