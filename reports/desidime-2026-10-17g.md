# DESIDIME tick 2026-10-17g (06:32 IST)

**1 deal pushed LIVE (count 1, created:true). IndexNow HTTP 200 (4 URLs). The deal page returns 200.**

## Funnel

| Stage | Count |
|---|---|
| Cards on `/new` and the homepage | 34 |
| Dropped as junk, another store, or a non-product link | 15 |
| Resolved to a merchant product | 19 |
| Already in the DB (productId match) | 9 |
| Fresh candidates | 10 |
| Skipped in stage 1 | 2 (Motorola Edge 70 Fusion: price drift. Bombay Shaving: store-wide sale with no ld+json) |
| Checked on the product page | 8 (7 Amazon in the logged-in tab, 1 Flipkart already rejected) |
| Passed verification | 1 |

## Pushed

| Store | ID | Deal | Price | MRP | Verified by |
|---|---|---|---|---|---|
| Amazon | B0757MBSS6 | Gear 21 L casual backpack, black/grey | ₹249 | ₹999 | Logged-in tab: core price block shows ₹249, M.R.P. ₹999 in `#centerCol`, add-to-cart present, no coupon |

- **Affiliate link:** `?tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was stripped.
- **Image:** the m.media-amazon.com hiRes. The product has a single colour variant ("Solid"), so the first hiRes is the right image.
- **Dedup:** a DB productId re-check just before the push returned 0 rows.

## Rejected

These are the same rejects as 10-17e. Each was re-read on the product page in this tick.

| ID | Item | Card | Product page |
|---|---|---|---|
| B07THTWXX2 | Home Centre Helios Emily sofa | ₹9,729 | ₹11,699 |
| B01LZSWXWI | Roff Cera Clean 1 L | ₹144 | ₹152 |
| B0DHVWY583 | Kalyan 2 g gold coin | ₹29,660 | ₹32,737 |
| B0H9T73HJ7 | Bosch 302 L fridge | ₹25,990 | ₹37,990 |
| B0B8ZMLRH4 | Haier 602 L side-by-side | ₹52,580 | ₹63,680, with a coupon |
| B0GXTVZZWB | Samsung 65" Mini LED TV | ₹58,290 | No price shown, no add-to-cart button |
| CDMG46FZAEVZJ4FF | Deluxe Nirodh | ₹73 | Pack size still unclear, so skipped |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST 10-17) | 1 at 06:32. The 06:09 CONTENT-SEO tick is queued behind this one. The daily floor is 2, so watch for it |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 12,816 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13338 / 13337. The 1-row gap is this batch; the external cron picks it up |
| Prod endpoints (7) | all 200 |
| Session crons | 9 of 9 |
| Unpushed commits | 0 before this report |

No rot found.
