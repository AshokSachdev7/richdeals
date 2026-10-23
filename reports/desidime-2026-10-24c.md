# DESIDIME — 2026-10-24c (04:19 IST)

**0 deals pushed. The 12 fresh candidates are the same set as DESIDIME 10-24b, plus one new Flipkart sofa: 4 were script SKIPs and all 8 Amazon ASINs were rejected again on the product page. There was nothing to ping on IndexNow.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read `/new` plus the homepage cards:
  - The JUNK and GROCERY filters were applied.
  - Each `visit.desidime.com` Buy Now was resolved to the real merchant URL.
  - Non-Amazon prices were checked with `productLd()` (ld+json price within ±₹1, InStock).
  - Each `productId` was checked against the live DB.
- **Amazon check:** done in the logged-in Playwright tab with an in-page `fetch('/dp/<ASIN>?th=1&psc=1')`, at least 2.6 s apart:
  - Price: `#centerCol .priceToPay`.
  - Stock: `#availability` plus `#add-to-cart-button`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Junk, grocery, other-store or non-product links (incl. a `cred.club` app link) | −14 |
| Product-resolved | 18 |
| Already in the DB | −6 |
| Fresh | 12 |
| Script SKIP (Jiomart: no ld+json; 3 Flipkart: price drift) | −4 |
| Rejected on the Amazon product page | −8 |
| **Pushed** | **0** |

## Rejected (Amazon)

| ASIN | Item | Page | Card |
|---|---|---|---|
| B0F8VHRFBX | Godrej 600 L side-by-side fridge | No buy box | ₹44,499 |
| B0H4GC4BFH | Haier 325 L fridge | ₹40,990 | ₹29,490 |
| B0H2YVXLBR | DREAME D30 Ultra robot vacuum | ₹44,999 | ₹39,449 |
| B00IYF6C4Q | Jabra Link 265 training cable | ₹8,949 | ₹5,355 |
| B0GYD6YC2N | iFFALCON 75" Google TV | ₹69,999 | ₹49,999 |
| B0GYFYMLFX | IFB 222 L fridge | ₹20,990 | ₹16,740 |
| B0CF5PN648 | SleepyHug Ortho Luxe mattress | ₹7,143 | ₹5,768 |
| B0HHRB6DQG | Lenovo Idea Tab Pro Gen 2 | ₹47,999 | ₹41,999 |

- All 8 were also rejected in 10-24b.
- The SleepyHug page price fell from ₹8,409 to ₹7,143, but it is still ₹1,375 above the card price.
- Every other page price is unchanged. The card prices are bank-offer prices, not the buy-box price.

Script SKIPs:

- Jiomart Maxkleen floor cleaner: the page has no ld+json.
- Flipkart Wildcraft luggage set (`STCH3JCUVUF2GBRG`), EcoLink fan (`FANHHXHEXWY6YBFG`) and Interio by Godrej Cresco sofa (`SFSHQ4GBPBC6CQVW`, new this sweep): price drift.

## Freshness

No batch was pushed, so there was no IndexNow ping, and the sitemap and `llms.txt` did not change.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 14,004 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14535.
- **Posts (IST 2026-10-24):** 1 (post 523). The IST day is about 4 hours old, so this is not rot. The next CONTENT-SEO tick (`9 */6`, 06:39) ships #2. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14535, which equals the DB maximum, so it is fully caught up.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
