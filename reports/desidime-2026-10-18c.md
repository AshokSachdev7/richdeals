# DESIDIME tick 2026-10-18c (04:33 IST)

**1 deal pushed live (count 1, created: id 13543). IndexNow 200 (4 URLs).**

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards) | 37 |
| Resolved to a store product | 26 |
| Already in the DB | 8 |
| Fresh after stage 1 | 18 (17 Amazon, 1 Instamart) |
| Passed the product-page check | 1 |

## Pushed

| ID | Deal | Price | MRP |
|---|---|---|---|
| B0DPSN7JHM | TEKCOOL stainless steel wire dish cloths, pack of 25 | ₹134 | ₹399 (66% off) |

- **Product-page check:**
  - `#centerCol` price ₹134 equals the card price.
  - In stock, with add-to-cart present.
  - The `landingAsinColor` value is "Pack of 25", which matches the title.
- **Image:** the `#landingImage` hi-res image from the m.media-amazon.com CDN, with the size segment stripped. It returns 200.
- **Copy:** rewritten from the page bullets.
- **Link:** `?tag=ashoksachdev-21`.
- **Discount field:** sent as `discountPct`. The row reads back with `discountPct` = 66, so the field-name bug from IFS 18b did not recur.
- **Check:** the API returns 200 for the slug.

## Rejected

| ID | Card | Product page |
|---|---|---|
| B0FC2PZ39Z | ₹2,520 | ₹2,799 |
| B0DXTYY2JL | ₹314 | ₹339 |
| B0CW9J2RCL | ₹1,096 | ₹1,187 |
| B08J3YFBV4 | ₹2,272 | ₹2,802 |
| B0HBR1NLVS | ₹213 | ₹229 |
| B07MMY6M5L | ₹2,101 | ₹2,210 |
| B0CHP6D4SC | ₹665 | ₹699 |
| B0FCLPQG26 | ₹3,891 | ₹6,490 |
| B0HDZDX4KW | ₹28,868 | ₹32,749 |
| B0HCTHQRVJ | ₹18,749 | ₹21,999 |
| B0HCDXQP92 | ₹37,489 | ₹48,989 |
| B0GYD6YC2N | ₹45,999 | ₹69,999 |
| B0H25X3W7F | ₹81,740 | ₹99,990 |
| B0H6WHHSHR | ₹65,990 | ₹74,990 |
| B0DTTZZ6Q3 | ₹32,740 | ₹36,990 |
| B0DHVWY583 (Kalyan gold coin) | ₹29,660 | no buy box |
| Instamart Pigeon mixer | ₹805 | price drift, skipped in stage 1 |

That is 17 rejected:
- 15 Amazon IDs where the card price is below the product-page price;
- 1 Amazon ID with no buy box;
- 1 Instamart item skipped in stage 1.

The 16 Amazon rejections are the same IDs and the same product-page prices as at 18b, two hours ago. DesiDime keeps listing bank-card and coupon prices as the deal price.

## IndexNow

`indexnow-ping.mjs` for the 1 slug plus 3 hubs: **HTTP 200, 4 URLs**. The sitemap (ISR, 30 min) and `llms.txt` (force-dynamic) pick up the row on their own.

## CEO audit (04:33 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 1 (4.5 hours into the day; the next CONTENT-SEO run is at 06:09) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,019 (13,018 + 1) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13543 / 13542. The new row is seconds old and the external broadcaster hasn't picked it up yet, so this is not rot |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |

No rot found.
