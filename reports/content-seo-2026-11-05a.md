# CONTENT-SEO 2026-11-05a (~17:55 IST)

**Result: 3 original posts published (#591-#593). Each has a cover, alt text, IndexNow 200 and prod 200. That fixes the 11-05 IST zero-post rot: the day now has 3 posts, under the cap of 4.**

## Keyword research

Each post is tied to a deal that went live today, so the internal links point at real, fresh inventory.

- **(a) M.2 SSD enclosure.** Queries covered: B-key vs M-key, SATA vs NVMe, 5Gbps vs 10Gbps, 2242/2260/2280 fit. The top SERP pages cover protocol OR speed, rarely key + protocol + USB ceiling together. Tied to DesiDime #16169, the Amazon Basics M.2 B-key enclosure at ₹329.
- **(b) Original vs compatible ink cartridges, XL vs standard.** Angle is cost per page under the ISO/IEC 24711 yield standard. Also covers chip rejection, firmware blocking (HP dynamic security) and when an ink tank printer wins. Tied to the HP 920XL deal (₹263 vs ₹2,324 M.R.P.).
- **(c) USB-C hub vs docking station.** Covers DP Alt Mode checks, HDMI 1.4 vs 2.0 (4K@30Hz vs 4K@60Hz), how much power PD pass-through loses, and MST and Mac limits. Tied to the Lifelong 8-in-1 hub (#16172) and the TAG Airlink WiFi adapter (#16170).

## Published

| id | slug | seoTitle | seoDesc | words | cover | prod |
|---|---|---|---|---|---|---|
| 591 | m2-ssd-enclosure-b-key-vs-m-key-sata-vs-nvme-india | 55 | 153 | ~1,086 | yes (og/…png) | 200 |
| 592 | original-vs-compatible-ink-cartridge-xl-vs-standard-india | 54 | 157 | ~1,003 | yes | 200 |
| 593 | usb-c-hub-vs-docking-station-hdmi-dp-alt-mode-india | 59 | 155 | ~1,015 | yes | 200 |

- Each post has an answer-first short answer, question-style H2s, comparison tables, a visible FAQ and a "Live deals we track" section.
- 11 internal links, all checked at prod 200: 8 deal pages and 3 existing posts (sata-vs-nvme, best-external-ssd, best-printers-home-use). Every post also links /offers.
- No in-body images, so there are no empty alt attributes. The cover alt is `post.title`, set by the template.

## Freshness

- IndexNow: HTTP 200, pinged by `insert-blog-mdmeta.mjs` for all 3 slugs.
- sitemap.xml: ISR, revalidate 1800, so the new posts appear within 30 min.
- llms.txt: force-dynamic, rebuilt from `getPosts()` on every request, so it is already current.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod 8 endpoints | 8/8 200 | OK |
| DB LIVE / API total | 15,615 / 15,615 | OK |
| max id | 16,180 | — |
| pending / null price / null image | 0 / 0 / 0 | OK |
| posts / coverless / seo-less | 464 / 0 / 0 | OK |
| posts per day IST | 10-31 4, 11-01 1, 11-03 4, 11-04 2, 11-05 3 | OK (rot fixed) |
| cursor | 16,180 (drained) | OK |
| crons | 5/9: CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX missing | Recreating next |
| unpushed | 0 | OK |

## Still open

- TG 11-04l: B0GXB76VRW (Samsung 43" TV) duplicates #4983, which is LIVE at ₹29,750; the channel's ₹25,175 is after coupon + HDFC. Vyom ×2 / ×3 and Syska fresh items, the CELLO Kidzbee link, and Redmi 15C, a Shopsy kurta, Philips 20W, a Crompton pump and Shopsy envelopes have never been checked.
- IFS 11-04k: 79 candidates have never been checked.
- DESIDIME 11-04i: B0FYGSLVRW, 5 Myntra items, Shopsy PERHDFTZNYBDCY7R, Flipkart GSTH5NTJRGPPXBH8 and GSTHFMD5S3VBH2XY.
- INDEXNOW helper filters on `createdAt` instead of `postedAt` and has a stray `publishedAt` OR clause.
- #11896: Flipkart shows ₹664, DB has ₹899. 16 bare Flipkart links. 96 drift rows. Single deals still to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396. #2913 has HDFC EMI text in its description. #6409 is only 7% off. IFB has duplicate rows for B0GW2Q1JV7.
- Reticle MCP: CONNECTION_CLOSED. Rotating the DO token is the owner's job.
