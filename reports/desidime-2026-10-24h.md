# DESIDIME — 2026-10-24h (14:05–14:22 IST)

**4 new deals pushed LIVE (#14592–#14595):**
- Cotton-net embroidered 4-seater table cover, ₹99 on Amazon
- Generic tote bag for women, ₹79 on Amazon
- ZEBRONICS NS4000 PRO rotatable laptop stand with fan, ₹1,399 (69% off) on Amazon
- Portronics iKonnect C Pro Type-C to 3.5 mm adapter, ₹99 on Blinkit (via Cuelinks)

**IndexNow returned HTTP 200 for 7 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage. It found 33 cards and dropped 11 as junk or non-product links (Flipkart search and hyperlocal pages, the Play Store, the Flipkart login page, and the Flipkart home page). 15 cards resolved to a product, 6 of those were already in the DB, and 9 were fresh.
- **Non-Amazon check:** done by the script with ld+json `productLd()` (price within ±₹1, InStock).
- **Amazon check:** in-tab `fetch('/dp/<ASIN>?th=1&psc=1')` in the logged-in Amazon tab (Playwright, profile richDeals):
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Dedup:** against the DB by productId, slug and affiliateUrl.
- **MRP guard:** the MRP is dropped when it is at or below the price, at least 100× the price, or when price ÷ MRP ≤ 0.2.

## Candidates

| Product id | Item | Page | DB before | Action |
|---|---|---|---|---|
| B0GGHCM87C | Cotton-net embroidered table cover, 40×60 in, cream | ₹99, M.R.P. ₹999, add-to-cart live | — | Pushed as **#14592**. MRP dropped (price ÷ MRP 0.099). |
| B0HNVT2YNH | Tote bag for women and college girls | ₹79, M.R.P. ₹1,999, add-to-cart live | — | Pushed as **#14593**. MRP dropped (price ÷ MRP 0.04). In IFS it had no buy box earlier; it has one now. No bullets on the page, so the copy uses the title only. |
| B0DB8H4JWR | ZEBRONICS NS4000 PRO rotatable metal laptop stand with fan | ₹1,399, M.R.P. ₹4,499, add-to-cart live | — | Pushed as **#14594** (69% off). |
| faf923a06884 (Blinkit prid 548091) | Portronics iKonnect C Pro Type-C to 3.5 mm adapter | ld+json ₹99, InStock | — | Pushed as **#14595** via Cuelinks. MRP dropped (price ÷ MRP 0.198). |
| B08J8DCCML | Gainda phenyl floor cleaner, 1 L, ₹59 | — | — | Rejected: low-ticket FMCG. The GROCERY rule's intent covers it, though the regex let it through. |
| 020e8de9b569 (Blinkit) | Ambrane MagSafe 10000 mAh power bank, ₹799 | ld+json ₹799 | #14546 (prid 697196) | Dropped as a near-duplicate, the same call as in 10-24f and 10-24g. |
| SHKH2M57GV7EYDBT (Flipkart) | Godrej Interio Ewa shoe rack, card ₹4,011 | ld+json ₹5,490 | — | Rejected: price drift. |
| COMHCQ5E5A5TZUVJ (Flipkart) | ASUS Vivobook S16 OLED, card ₹61,990 | ld+json ₹79,051 | — | Rejected: price drift. |
| 16943287f3f4 (Bigbasket) | Kent Digi Plus 4 L air fryer, ₹1,799 | No ld+json | — | Rejected: price could not be verified. |

- **Copy:** only facts from the product title and bullets are used.
- **Push:** the bulk endpoint returned 201 with `count:4`, all `created:true`.

## Freshness

- **IndexNow:** HTTP 200 for 7 URLs: the 4 slugs plus `/`, `/offers` and `/sitemap.xml`.
- **Prod:** all 4 pages return 200. The JSON-LD Offer prices are 99, 79, 1399 and 99, matching the product pages.
- **Sitemap:** ISR revalidates every 1800 s, so the 4 new URLs appear within 30 minutes. No new static route was added.
- **`llms.txt`:** force-dynamic, so it already reflects the batch.

## CEO audit (14:22 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,064 LIVE (+4), and `/api/deals` reports `total:14064`, a match. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14595.
- **Posts (IST 2026-10-24):** 3. The cap is 4. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14591. The 4 deals in this batch (#14592–#14595) are still waiting for the external broadcast cron, so the gap is not rot.
- **Unpushed commits:** 0 before this report.
- **Still open:** 47 shadowed same-ASIN duplicate pages are waiting for a price sync (from TG 10-24j).
- **Still open:** #7251 B08KFL2T8J has no add-to-cart button but is still LIVE.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** the DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** the 71 GSC-pinned deals need re-verifying before 11-20.
