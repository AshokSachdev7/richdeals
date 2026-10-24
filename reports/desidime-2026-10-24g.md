# DESIDIME — 2026-10-24g (12:17–12:22 IST)

**5 deals pushed LIVE (#14560–#14564), all Amazon. 6 Amazon cards failed the product-page check. IndexNow returned HTTP 200 for 8 URLs.**

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` over `/new` plus the homepage. It applies the JUNK and GROCERY filters, resolves `visit.desidime.com` to the merchant URL, swaps in our affiliate, and checks non-Amazon prices through `productLd()`.
- **Second dedup check:** every fresh candidate was searched in the DB by productId, slug and affiliateUrl. None matched.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`, 2.6 s apart:
  - Price: `#centerCol .priceToPay`.
  - MRP: `.basisPrice`.
  - Stock: `#availability` plus `#add-to-cart-button`.
  - Image: `#landingImage[data-old-hires]`.
- **Rule:** a card is rejected if the page price is more than ₹1 from the card price, or the page has no buy box.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Junk or non-product links | −9 |
| Resolved to a product | 20 |
| Already in the DB | −4 |
| Fresh | 16 |
| Script SKIP | −4 |
| Near-duplicate dropped | −1 |
| Rejected on the Amazon page | −6 |
| **Pushed** | **5** |

## Pushed

| ID | Store | productId | Item | Price | MRP |
|---|---|---|---|---|---|
| 14560 | Amazon | B081Q85RTF | Ant Esports H520W Smartchoice wired gaming headset | ₹710 | ₹2,999 (76%) |
| 14561 | Amazon | B0BS9QGDF3 | Portronics Hydra 10 mechanical wireless gaming keyboard | ₹1,999 | dropped (p/m 0.1999 ≤ 0.2 guard) |
| 14562 | Amazon | B0C3QSKBT4 | Coconut Bling retro typewriter wireless keyboard + mouse set | ₹1,274 | ₹4,499 (72%) |
| 14563 | Amazon | B097GDKGHS | Safari Pentagon Pro 65cm medium hard-case trolley | ₹1,599 | dropped (p/m 0.145) |
| 14564 | Amazon | B0GL8NJLM2 | Zebronics 8-in-1 Type-C hub, 100W PD, HDMI 4K, RJ45 | ₹749 | ₹2,899 (74%) |

- **Price and stock:** every pushed item had a page price equal to the card price, showed In stock, and had add-to-cart live.
- **Copy:** only facts from the product title and bullets were used.
- **Push:** the bulk endpoint returned 201 with `count:5`, all `created:true`.

## Rejected (Amazon)

| ASIN | Item | Page | Card |
|---|---|---|---|
| B07B6J25G8 | amazon basics face towel 12-pack | ₹414 | ₹402 |
| B004YKR92O | Prestige Omega tawa 30cm | ₹1,596 | ₹1,476 |
| B0C3D9ZTGD | Pepe Jeans track pants | ₹698 | ₹668 |
| B076ZPM69Z | Solimo bathmat | ₹259 | ₹251 |
| B0DH2J8ZPM | Home Stylish bedsheet | no buy box | ₹99 |
| B0BN1Y4NX9 | INNOWIN Blaze gaming chair | no buy box | ₹12,123 |

## Script SKIPs and drops

- **Flipkart KJLHK24BH2EBRGFF**, Renee eye trio ₹161: price drift.
- **Blinkit f8e315605145**, Stanley drill kit ₹1,999: out of stock.
- **Digihaat ce621518ea95**, washing machine cleaner ₹62: no ld+json.
- **Flipkart OSCHYQ8GVU9ADNUG**, Godrej Curv chair ₹2,748: price drift. It was also skipped in 10-24e and 10-24f.
- **Blinkit 020e8de9b569**, Ambrane MagSafe ₹799: dropped as a near-duplicate of #14546 (prid 697196), the same as in 10-24f.
- **Junk or non-product:** Bajaj Finserv, an OPPO raffle, and a Marshall Flipkart hyperlocal preview.

## Freshness

- **IndexNow:** HTTP 200 for 8 URLs: the 5 slugs plus `/`, `/offers` and `/sitemap.xml`.
- **Prod:** all 5 pages return 200. The JSON-LD Offer prices are 710, 1999, 1274, 1599 and 749, which match the DB.
- **Sitemap:** ISR revalidates every 1800 s, so the batch appears within 30 minutes. No new static route was added.
- **`llms.txt`:** force-dynamic, so it already reflects the batch.

## CEO audit (12:22 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,033 LIVE (+5), and `/api/deals` reports `total:14033`, a match. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14564.
- **Posts (IST 2026-10-24):** 2, meeting the daily minimum. The next CONTENT-SEO tick (12:39) can ship #3. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14559. The DB maximum is 14564 because this batch was just pushed. The external broadcast cron picks it up on its next run, so this is not rot.
- **Unpushed commits:** 0 before this report.
- **Still open:** 47 shadowed same-ASIN duplicate pages are waiting for a price sync (from TG 10-24j).
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
