# DesiDime ingest — 2026-10-25c (~14:25 IST)

Stage 1 (`ingest-desidime.mjs`, cards only) found 33 deals. 18 resolved to a single product, 9 were already in the DB, and 9 were fresh.

## Pushed LIVE: 2 (#14752–#14753), bulk count 2, created:true

| # | Product | Store | Price | MRP | Off |
|---|---------|-------|-------|-----|-----|
| 14752 | Amazon Basics 5-in-1 USB-C Hub (HDMI, Ethernet) | Amazon B0CFLP2DQS | ₹559 | ₹3,899 | 86% |
| 14753 | iWagon i5626 Cordless Tyre Inflator 130 PSI | Amazon B0D29HGK7L | ₹981 | ₹3,979 | 75% |

Both were checked in the logged-in Playwright tab with an in-tab fetch of `/dp/ASIN`. `.a-price-whole` matched the card price exactly. Both showed In stock with the add-to-cart button present, there was no captcha, and the hiRes image matched landingAsinColor. Links use `?tag=ashoksachdev-21`.

## Rejected (7)

The card price drifted more than ₹1 from the PDP. The card prices are likely bank-card or exchange offer prices.
- Godrej 1.5T 3★ inverter AC B0GMD5NPX6: card ₹28,490, PDP ₹31,490
- Elica 60cm filterless chimney B08CKNVG3B: card ₹10,051, PDP ₹12,490
- VW 65" Pro QLED TV B0GK9NHCL2: card ₹36,499, PDP ₹41,999
- JBL Grip speaker B0FMGXH38Q: card ₹5,972, PDP ₹6,999
- Samsung Galaxy Tab S12+ B0HKJZFTH6: card ₹1,04,499, PDP ₹1,29,999

Other rejects:
- Bikaji Punjabi Tadka 150g (JioMart): low-ticket FMCG covered by the GROCERY filter, and it has no ld+json.
- DesiDiya LED string lights (Instamart): quick-commerce prices and stock are location-locked.

Stage 1 also dropped the Amazon `/s?` search pages, the Flipkart `/desidime/p/` tracking landing page and the Acer Iconia Flipkart deal.

## Freshness

- `indexnow-ping.mjs` (2 slugs, 5 urls) returned **HTTP 200**.
- Sitemap is ISR 1800s. llms.txt is force-dynamic.
- The new deal page returns 200 on prod.

## CEO audit (14:25 IST)

- Prod `/ /offers /blog /sitemap.xml /feed.xml /api/deals /llms.txt` all return 200.
- Live deals: 14,223. Null price: 0. Null image: 0. PENDING_REVIEW: 0. Coverless or seo-less posts: 0.
- Posts today (IST): 1. CONTENT-SEO 87b26cf8 runs next at 18:39 and makes it 2.
- Broadcast cursor 14751 vs max 14753: the external cron is draining it.
- `master` matches `origin/master` before this commit.
