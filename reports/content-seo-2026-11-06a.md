# CONTENT-SEO 2026-11-06a (~23:55 IST)

**Result: 3 posts published (#594-#596), 11-06 IST rot (0 posts) fixed → 3. Covers uploaded, IndexNow HTTP 200.**

## Published

| id | Slug | seoTitle (chars) | seoDesc (chars) | Internal links |
|---|---|---|---|---|
| 594 | `cabin-baggage-rules-india-indigo-air-india-akasa-7kg` | Cabin Baggage Rules India: IndiGo, Air India, Akasa 7 kg (56) | 152 | Safari Roma b097gmvvvl, Provogue Spectrum b0fjxkw572, Aristocrat Airpro b0h9znnp5g, `/offers` |
| 595 | `dash-cam-buying-guide-india` | Dash Cam Buying Guide India: What Actually Matters (50) | 150 | `/yi-smart-dash-camera-space-grey-b01cxdp69g`, `/sandisk-ultra-dual-drive-go-type-c-64gb-otg-pen-drive-black-b0dnfsy5s3`, `/offers` |
| 596 | `is-ab-roller-worth-it-benefits-how-to-use` | Is an Ab Roller Worth It? Benefits and How to Use It (52) | 155 | `/lifelong-llar02-ab-roller-with-automatic-rebound-elbow-support-and-timer-b0cg983rwx`, `/careforce-back-support-lumbar-cushion-for-office-chair-and-car-seat-b0c1kbhzc5`, `/offers` |

- `insert-blog-mdmeta.mjs`: "DONE: 3 inserted. IndexNow -> HTTP 200".
- `gen-blog-covers.mjs`: "DONE: 3 blog covers generated + uploaded" → `https://richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png`; alt = post.title.
- Each post: answer-first lead, question H2s, comparison table, FAQ; deal links point to LIVE deal pages tied to the topic (luggage, dash cam, ab roller pushed 11-05c).

**Honest gap:** keyword research (WebSearch + top-3 SERP read) was skipped this tick to close the 0-post day before midnight IST. Topics were picked from fresh deal clusters only. 11-07 CONTENT-SEO tick must do real research first.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod 8 endpoints | 8/8 200 | OK |
| DB LIVE / API total | 15,616 / 15,616 | OK |
| max id | 16,182 | — |
| pending / null price / null image | 0 / 0 / 0 | OK |
| posts / coverless / seo-less | 467 / 0 / 0 | OK |
| posts per day IST | 11-04 2, 11-05 3, 11-06 3 | OK |
| cursor | 16,182 (drained) | OK |
| unpushed | 0 | OK |

## Still open

- TG 11-04l: B0GXB76VRW (Samsung 43" TV) duplicates #4983, which is LIVE at ₹29,750; the channel's ₹25,175 is after coupon + HDFC. Unchecked: Vyom ×2 BPRHZEE5HKFCZ5YA ₹498, Vyom ×3 BPRHZEHHXUYRZSPZ ₹686, Syska PWBGGD4THDQZYAY6 ₹799, the CELLO Kidzbee link, B0G2BBWKCP Redmi 15C, KTAGY3VM4MDQBXVM Shopsy kurta, B07BK983NP Philips 20W ×2 ₹239, B0CGQ834KW Crompton pump ₹4,079, ENVH9AFZTTYXS38D Shopsy envelopes.
- IFS 11-04k: 79 candidates have never been checked.
- DESIDIME 11-04i: B0FYGSLVRW, Myntra 45523791 / 25483026 / 32632547 / 39321987 / 45374830, Shopsy PERHDFTZNYBDCY7R, Flipkart GSTH5NTJRGPPXBH8 and GSTHFMD5S3VBH2XY.
- INDEXNOW helper filters on `createdAt` instead of `postedAt` and has a stray `publishedAt` OR clause.
- #11896: Flipkart shows ₹664, DB has ₹899. 16 bare Flipkart links. 96 drift rows. Single deals still to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396. #2913 has HDFC EMI text in its description. #6409 is only 7% off. Other shadow rows for IFB B0GW2Q1JV7 may exist now that #16062 is expired.
- Reticle MCP: CONNECTION_CLOSED. Rotating the DO token is the owner's job.
