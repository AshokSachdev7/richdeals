# IFS tick 2026-09-25ay — indiafreestuff ingest

**10 deals live** (ids 11300–11309): 9 from Amazon and 1 from Flipkart, pushed with `apps/api/scripts/push-ifs-0925ay.mjs`.
The bulk response returned `count: 10` and every row came back `created: true`. IndexNow returned **HTTP 200 for 13 URLs** (10 slugs + 3).

## Funnel

| Stage | Count |
|---|---|
| Slugs from `/deals` p1–p2 + `/deals/superdeals` | 90 |
| New (not in seen index) | 25 |
| Rejected before resolving: freebie sample, SBI-card Zebronics price | −2 |
| Buy Now resolved | 23 |
| Price needs a bank card or card EMI (5 Flipkart: Whirlpool ×2, Milton, Everflame, boAt; 2 Amazon: Samsung 215 L, LG 185 L) | −7 |
| DB duplicate (B0BR5J92KX Wonderchef kadhai, already LIVE as 5407) | −1 |
| Checked on the product page (14 Amazon in the logged-in tab, 1 Flipkart via ld+json) | 15 |
| Price only reachable with a coupon: Caresmith ₹949 vs ₹699, Unigen ₹299 vs ₹159 | −2 |
| Price drift: Mamaearth ₹150 vs ₹145 | −1 |
| Price read null (B0CHVPQLC7, B0DQPT85TB) | −2 |
| **Pushed live** | **10** |

## Gates in the push script

- Price, M.R.P., stock and image are loaded from the product-page read (`.playwright-mcp/az0925ay.json`), not retyped.
- On Neelam (B00SUYEQ8U) and the 12-container set (B0FJFB8M9G), `.a-text-price` showed a per-count rate (₹61 and ₹30.83), not the M.R.P. The M.R.P. was re-read from the "M.R.P.: ₹X" text instead (₹790 and ₹1,399).
- Title ₹ equals the price, and every `at ₹X` in the copy is checked against the price.
- Price must be an integer below M.R.P. and within ±₹1 of the IFS price. Stock must read In stock or "only N left".
- Images: Amazon rows use `m.media-amazon.com` `_SL1500_` (thumbnails and the `_SL1324_` image were upgraded to it). The Flipkart row uses a `rukmini1.flixcart.com` 1500×1500 image.
- The Flipkart link is `/p/itm067ea24b02d64?pid=DEOHD95MJKUSUMMH&affid=djhackraj`. The real itm id came from the product-reviews link, because the page's canonical URL is generic.
- Every deal has exactly 4 howTo steps. Slugs and product ids are unique.

## Notes on the copy

- Plastic containers: the title says black but one bullet says violet. The copy points readers to the photos instead of stating a colour.
- Neelam: the copy lists what the "10 pieces" actually are.
- Joyroom: the IFS slug says ₹556 but the title and the product page both say ₹359, so the push uses ₹359. Only 1 was left in stock.
- Havells cable: the copy warns that a USB-A to USB-C cable does not carry USB Power Delivery.
- Bellavita: Flipkart does not accept returns on this item, and the copy says so.

## CEO audit (18:45 IST)

- DB: 10,962 live deals, 0 pending, 0 with a null price, 0 with a null image; highest deal id 11309.
- Posts: 331; 0 without a cover and 0 without SEO fields. Today (IST) has 4 posts, which is the daily cap.
- The broadcast cursor is at 11261 against a DB max of 11309. This is a backlog of recent batches that the external cron is draining, not rot.
- Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and the new Bellavita page all return 200.
- There were no unpushed commits before this one.
