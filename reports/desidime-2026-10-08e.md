# DesiDime tick 2026-10-08e (08:47 IST)

Stage 1 (`ingest-desidime.mjs`) discovered 33 cards and resolved 24. Of those, 11 were already in the DB, leaving 13 fresh candidates. Each one was checked on its product page: Amazon in the logged-in Playwright tab (`#centerCol` price, `#availability` + add-to-cart, rating), Flipkart via a same-origin fetch of ld+json in the Playwright tab (curl gets a 403 reCAPTCHA).

## Pushed: 0

## Rejected (13)

| Candidate | Reason |
|---|---|
| Dell SE 27" monitor (Flipkart MONHE5DMDWP5UPDP) | Drift: PDP ₹9,999 vs card ₹7,453 |
| Dell SE 22" monitor (MONHAEETN8ZRFB5K) | Drift: ₹6,099 vs ₹4,664 |
| Borosil 400ml glass container (CNTEMPTABMTZKEQP) | Drift: ₹299 vs ₹186 |
| Borosil Zest 3pc glass lunchbox (LBXH2XDHB4VBZMWP) | Drift: ₹499 vs ₹324 |
| Luxor A5 300-page notebook (DIAF8U99CQBZFDYS) | Drift: ₹126 vs ₹116 |
| realme Buds T310 (ACCH2PGXGP4BV2JF) | Drift: ₹1,899 vs ₹1,615 |
| OnePlus Nord Buds 4 (ACCHZ3ACGTWVGBYG) | Drift: ₹2,899 vs ₹2,519 |
| Portronics POR 2192 keyboard (ACCHFQXZUNFEKNQJ) | Drift: ₹749 vs ₹202 |
| EcoLink fan (FANHPKZPXCUUY2BG) | Out of stock |
| Cello Tropical Lagoon 35pc dinner set combo (B0C99N2NZM) | Price ₹1,714 matched, but no rating on the PDP (0–7 ratings rule) |
| Patanjali Kesh Kanti shampoo (B0CR7DDRVB) | Drift ₹169 vs ₹161; FMCG |
| Acer Aspire Lite laptop (B0H8NKM98J) | No price read; only 3 ratings |
| Oppo Reno 16c on Instamart | Location-locked |

Every Flipkart drift came from a card price lower than the PDP price: the DesiDime cards carried bank-offer or expired-sale prices. All 12 IDs were added to `data/dd-rejected.json`.

## Freshness

Nothing was pushed, so there was no IndexNow ping. The sitemap and llms.txt are unchanged.

## CEO audit (08:47 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,238 |
| Broadcast cursor | 12757 = DB max 12757 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
