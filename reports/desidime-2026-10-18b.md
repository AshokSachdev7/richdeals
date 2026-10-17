# DESIDIME tick 2026-10-18b (02:35 IST)

**2 deals pushed live (count 2, both created: ids 13523, 13524). IndexNow 200 (5 URLs).**

## Funnel

| Stage | Count |
|---|---|
| Fresh candidates after stage 1 (`ingest-desidime.mjs`: JUNK/GROCERY filters, visit.desidime.com resolved, DB dedup) | 22, all Amazon |
| Passed the product-page check in the logged-in tab | 2 |

## Pushed

| ID | Deal | Price | MRP |
|---|---|---|---|
| B0F2TC5P52 | Sturlite Titan Shield 4-pole 6 A C-curve MCB | ₹759 | ₹1,835 |
| B0DZCGKKNP | One94Store touch-control rechargeable LED table lamp | ₹199 | null (card MRP ₹999 implies 80% off, nulled per rule) |

- **Sturlite:** the product page said only 1 left, but add-to-cart was present. The card title was just "Sturlite Titan Shield", so the product type (4-pole MCB) was confirmed from the page bullets before the copy was written.
- **Links and images:** links use `?tag=ashoksachdev-21`; images come from the m.media-amazon.com CDN with the size segment stripped.
- **Copy:** titles and descriptions are rewritten from the page bullets, with no fabricated specs.
- **Check:** both slugs return 200 from the API.

## Rejected

| ID | Card | Product page |
|---|---|---|
| B0FC2PZ39Z | ₹2,520 | ₹2,799 |
| B0H2Z4GS59 | ₹706 | ₹742 |
| B0DXTYY2JL | ₹314 | ₹339 |
| B0CW9J2RCL | ₹1,096 | ₹1,187 |
| B08J3YFBV4 | ₹2,272 | ₹2,802 |
| B0HBR1NLVS | ₹213 | ₹229 |
| B09QSD9W4S | ₹237 | ₹248 |
| B07MMY6M5L | ₹2,101 | ₹2,210 |
| B0CHP6D4SC | ₹665 | ₹699 |
| B0FCLPQG26 | ₹3,891 | ₹6,490 |
| B0H6QWQRGP | ₹1,210 | ₹1,272 |
| B07PJK8XM2 | ₹3,599 | ₹3,999 |
| B0HDZDX4KW | ₹28,868 | ₹32,749 |
| B0HCTHQRVJ | ₹18,749 | ₹21,999 |
| B0HCDXQP92 | ₹37,489 | ₹48,989 |
| B0GYD6YC2N | ₹45,999 | ₹69,999 |
| B0H25X3W7F | ₹81,740 | ₹99,990 |
| B0H6WHHSHR | ₹65,990 | ₹74,990 |
| B0DTTZZ6Q3 | ₹32,740 | ₹36,990 |
| B0DHVWY583 (Kalyan gold coin) | n/a | no buy box |

These were 20 rejections, 19 for price drift and 1 with no buy box. The large-ticket cards are bank-card or coupon prices, not the cash price.

## IndexNow

`indexnow-ping.mjs` for the 2 slugs plus 3 hubs: **HTTP 200, 5 URLs**. The sitemap (ISR, 30 min) and `llms.txt` (force-dynamic) pick up the rows on their own.

## CEO audit (02:35 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 1 (2.5 hours into the day; CONTENT-SEO cron runs every 6 h) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,000 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| DB max id / broadcast cursor | 13524 / 13522 (the 2 rows just pushed, picked up by the external cron) |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |

No rot found.
