# SEO/AEO/GEO: merchant listings focus (2026-09-28)

## GSC finding (28 days, 08-29 → 09-26)
- Totals: 58 clicks, 1,474 impressions, CTR 3.9%, average position 5.6.
- The previous 28 days had 3 clicks and 242 impressions.
- **MERCHANT_LISTINGS** accounts for 40 of the 58 clicks (69%): 577 impressions, CTR 6.9%, position 2.0.
- PRODUCT_SNIPPETS: 1 impression.
- Top pages are deal pages:

| Page | Clicks / Impr | Pos |
|---|---|---|
| vivo Y05 | 10 / 166 | 1.4 |
| Powermax treadmill | 5 / 62 | — |
| realme narzo 100x | 5 / 45 | — |
| homepage | 3 / 109 | 10 |

- Conclusion: the growth engine is the Product/Offer schema on deal pages. It needs to be accurate and complete.

## Shipped (commit 67ee5eb, deployed, ACTIVE)
- `Product.sku` now carries the marketplace id (ASIN or Flipkart pid). Merchant Listings recommends this field, and the value is real data we already store.
- `productId` is added to `DealDTO` (API mapper and shared type). affiliateUrl is still never exposed.
- Verified on prod: `/orient-electric-...-elwhzgursfqyg75z` → `"sku":"ELWHZGURSFQYG75Z"`.
- 358 LIVE deals have no productId. They simply emit no sku, which is valid.

## Deliberately NOT added (never fabricate)
- `brand`: the manufacturer is not a stored field, and the store is the seller, not the brand.
- `shippingDetails` and `hasMerchantReturnPolicy`: we are not the merchant and cannot verify these per product. GSC shows them only as warnings, not errors.
- `aggregateRating` and `review`: no real reviews exist.

## Open for owner
- 7 LIVE Flipkart deals have no ld+json, which suggests they are out of stock, yet their schema still says InStock. Should they be set to EXPIRED? (List in `flipkart-affid-fix-2026-09-28.md`.)

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,453 |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343, coverless 0 |
| Posts per day (IST) | 09-26 4 · 09-27 4 · 09-28 4 |
| Broadcast cursor | 11800 = DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 |

Result: **0 rot.**
