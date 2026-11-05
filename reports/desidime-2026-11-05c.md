# DESIDIME-INGEST 2026-11-05c (~18:45 IST)

**Result: 2 pushed LIVE (#16181 Eplugit hub ₹531, #16182 Lifelong ab roller ₹899), 3 synced (#12664 ₹1,599, #7689 ₹14,990, #10316 ₹39), #16062 IFB expired, 6 rejects. IndexNow 200 (8). Audit: prod 8/8 200, API = DB LIVE 15,616, max 16,182, 0 pending/null, 464 posts, 11-05 IST 3, cursor drained, 0 unpushed.**

## Stage 1

`ingest-desidime.mjs` found 38 cards and resolved 20. Of those, 6 were already in the DB and 3 had been rejected in the last 24h, which left 11 fresh candidates. Every Amazon price was read on the PDP in the logged-in Playwright tab (`#corePriceDisplay .a-price-whole`, `#availability` + add-to-cart).

## Pushed

`POST /admin/deals/bulk` returned 201, count 2.

| id | Product | ASIN | Price | M.R.P. | Status |
|---|---|---|---|---|---|
| 16181 | Eplugit 4-in-1 USB-C hub (USB 3.1 / 4× USB 3.0) | B0CKTFWG93 | ₹531 | ₹3,999 | LIVE |
| 16182 | Lifelong LLAR02 ab roller with rebound + timer | B0CG983RWX | ₹899 | ₹5,999 | LIVE |

Both use the Amazon `?tag=ashoksachdev-21` link and an `m.media-amazon.com` image.

## Price-synced dup LIVE rows

| id | Product | Old | New | M.R.P. |
|---|---|---|---|---|
| 12664 | Fire-Boltt Fire-Lens Dune | ₹1,999 | ₹1,599 (82% Off) | ₹8,999 |
| 7689 | Toshiba 32V35RP | ₹16,990 | ₹14,990 (40% Off) | ₹24,999 |
| 10316 | STANLEY spanner | ₹17 | ₹39 | ₹43 |

Each sync also updated the title and description rupee figures and added a `priceHistory` row. #16173 (₹691) still matched the PDP. #3004 was already EXPIRED.

## Expired

- #16062 IFB 206L (B0GW2Q1JV7): the PDP shows it unavailable. The page stays live with the EXPIRED banner.

## Rejected

| ASIN / item | Product | Reason |
|---|---|---|
| B07M9XYH9K | Dettol | FMCG |
| B0G4H16J8H | DROGO | out of stock |
| B0D638HPNH | Tamron | PDP ₹53,890 vs card ₹46,390 |
| B0D6YG2DZ5 | Bajaj | PDP ₹8,999 vs card ₹8,730 |
| B0GYD33S7Z | HP AIO | PDP ₹81,990 vs card ₹72,740 |
| B097N5VVLY | BERGNER | PDP ₹499 vs card ₹490 |
| Myntra 30194678, 30943278 | — | out of stock |
| Klook | — | not a product |

The 6 ASINs were written to `data/dd-rejected.json`.

## Freshness

- IndexNow: HTTP 200 for 8 URLs (5 slugs + 3 hubs).
- sitemap.xml is ISR with revalidate 1800. New deals are outside the top-100 deals child by design.
- llms.txt is force-dynamic, so it is already current.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod 8 endpoints | 8/8 200 | OK |
| DB LIVE / API total | 15,616 / 15,616 | OK |
| max id | 16,182 | — |
| pending / null price / null image | 0 / 0 / 0 | OK |
| posts / coverless / seo-less | 464 / 0 / 0 | OK |
| posts per day IST | 10-28 4, 10-29 4, 10-30 4, 10-31 4, 11-01 1, 11-02 0 (past), 11-03 4, 11-04 2, 11-05 3 | OK |
| cursor | 16,182 (drained) | OK |
| crons | 9/9 (last CronList, sitemon 05b) | OK |
| unpushed | 0 | OK |

## Still open

- TG 11-04l: B0GXB76VRW (Samsung 43" TV) duplicates #4983, which is LIVE at ₹29,750; the channel's ₹25,175 is after coupon + HDFC. Unchecked: Vyom ×2 BPRHZEE5HKFCZ5YA ₹498, Vyom ×3 BPRHZEHHXUYRZSPZ ₹686, Syska PWBGGD4THDQZYAY6 ₹799, the CELLO Kidzbee link, B0G2BBWKCP Redmi 15C, KTAGY3VM4MDQBXVM Shopsy kurta, B07BK983NP Philips 20W ×2 ₹239, B0CGQ834KW Crompton pump ₹4,079, ENVH9AFZTTYXS38D Shopsy envelopes.
- IFS 11-04k: 79 candidates have never been checked.
- DESIDIME 11-04i: B0FYGSLVRW, Myntra 45523791 / 25483026 / 32632547 / 39321987 / 45374830, Shopsy PERHDFTZNYBDCY7R, Flipkart GSTH5NTJRGPPXBH8 and GSTHFMD5S3VBH2XY.
- INDEXNOW helper filters on `createdAt` instead of `postedAt` and has a stray `publishedAt` OR clause.
- #11896: Flipkart shows ₹664, DB has ₹899. 16 bare Flipkart links. 96 drift rows. Single deals still to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396. #2913 has HDFC EMI text in its description. #6409 is only 7% off. Other shadow rows for IFB B0GW2Q1JV7 may exist now that #16062 is expired.
- Reticle MCP: CONNECTION_CLOSED. Rotating the DO token is the owner's job.
