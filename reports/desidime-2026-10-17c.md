# DESIDIME tick 2026-10-17c (02:34 IST)

**2 deals pushed LIVE (count 2, both created:true). IndexNow HTTP 200 (5 URLs). Both deal pages return 200.**

## Funnel

| Stage | Count |
|---|---|
| Cards found on `/new` and the homepage | 36 |
| Dropped as junk or a non-product link | 13 |
| Resolved to a merchant product | 18 |
| Already in the DB (productId match) | 2 |
| Skipped in stage 1 (Epson L3350/L3250 price drift, Instamart out of stock) | 3 |
| New candidates: Amazon / Flipkart / Myntra | 11 / 1 / 1 |
| Recovered from the drop list (boAt Trinity, `/p/itm` with no pid, resolved in the browser tab) | 1 |
| Passed verification | 2 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Flipkart | ACCHDYCGHPEDT9UY | boAt Rockerz Trinity Gen2 neckband, black | ₹999 | ₹3,290 | ld+json in the browser tab, InStock; pid confirmed against ld+json |
| Myntra | 38264237 | Aeropostale men's pure cotton polo t-shirt | ₹417 | ₹2,199 | ld+json via curl, InStock |

Affiliate links: Flipkart uses `?pid=…&affid=djhackraj`. Myntra goes through InRDeals. The DesiDime tags `salescueli` and the Cuelinks UTM tags were stripped. Images come from the Flipkart and Myntra CDNs.

## Rejected

| ID | Item | Card | Product page |
|---|---|---|---|
| B07THTWXX2 | Home Centre Helios Emily sofa | ₹9,729 | ₹11,699 |
| B01LZSWXWI | Roff Cera Clean 1 L | ₹144 | ₹152 |
| B0H2FD3L97 | Lenovo Idea Tab with keyboard | ₹27,999 | ₹32,999 |
| B0FQFJM9MK | Apple Watch Series 11 42 mm | ₹32,249 | ₹34,499 |
| B082PFY9S7 | Neutrogena Ultrasheer SPF 50+ | ₹267 | ₹445, 5% coupon |
| B08MCD2WQJ | F Gear Platoon 46L rucksack | ₹1,107 | ₹1,199 |
| B07N5ZBP6S | neelam 4-tier tiffin | ₹221 | ₹590 |
| B0DHVWY583 | Kalyan 2 g gold coin | ₹29,660 | ₹32,737 |
| B0H9T73HJ7 | Bosch 302 L fridge | ₹25,990 | ₹37,990 |
| B0B8ZMLRH4 | Haier 602 L side-by-side | ₹52,580 | ₹63,680, ₹3,000 coupon |
| B0GXTVZZWB | Samsung 65" Mini LED TV | ₹58,290 | No price shown, no add-to-cart button |
| CDMG46FZAEVZJ4FF | Deluxe Nirodh (Flipkart) | ₹73 | Price ₹73, but the card says "Set of 5" and the product page says "100 PCS". Pack size unclear, so skipped |

Also dropped: Flipkart SuperCoins promos (2), a DesiDime landing page for the Haier microwave, and a Xiaomi 75" TV with a malformed `/product/p/itme` link.

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-15 / 10-16 / 10-17) | 3 / 4 / 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals / DB max id | 12,796 / 13317 |
| Newest deal age | 0 min (this batch) |
| Broadcast cursor | 13317, has already picked up this batch |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 (CronList, 02:07 IST) |
| Unpushed commits | 0 before this report |

No rot found.
