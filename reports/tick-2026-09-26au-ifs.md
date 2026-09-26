# DEAL-INGEST indiafreestuff tick 2026-09-26au (18:42 IST)

**30 deals pushed LIVE (26 Amazon + 4 Flipkart). `/admin/deals/bulk` returned 201 with count 30 and created all 30. IndexNow returned HTTP 200 for 33 URLs (30 slugs + 3).**

## Sweep
- Read the IFS `/deals/index` pages and the homepage, with at least 2.5 s between requests. Found 128 slugs, of which 72 were new since 26ai.
- After dropping grocery, banner and multi-product posts, 65 candidates were left.
- Each candidate's base64 `?rto=` Buy Now id was resolved to the real store URL.
- Every price was then re-read on the PDP:
  - **Amazon:** same-origin fetch in a logged-in tab. Checked the `#centerCol` price, the add-to-cart button, the clip-coupon flag and `data-old-hires`.
  - **Flipkart:** ld+json `offers.price` and availability.
- Dedup was done against the live DB by `productId` through Prisma.

## Pushed (ids 11478–11507)
| Store | Product | Price / M.R.P. |
|---|---|---|
| Amazon | Symbol women oversized half-sleeve tee | 439 / 1,598 |
| Amazon | Symbol women crew-neck sweatshirt | 279 / 1,499 |
| Amazon | Antec P20C ARGB E-ATX cabinet | 6,794 / 12,210 |
| Amazon | BABBLER Premier gym gloves (M, navy) | 159 / 320 |
| Amazon | Belkin SheerForce Qi2 case, Galaxy S25 Edge | 1,036 / 3,999 |
| Amazon | Boldfit Typhoon shaker | 199 / 799 |
| Amazon | Crompton Arno Plus 15 L 5-star geyser | 6,359 / 15,800 |
| Amazon | Dabur Red Bae Fresh gel 600 g (2×300 g) | 195 / 360 |
| Amazon | essence What The Fake! lip filler | 262 / 525 |
| Amazon | Faber-Castell Albrecht Dürer watercolour markers, Portrait | 830 / 1,800 |
| Amazon | Faber-Castell Polychromos, Light Green | 178 / 720 |
| Amazon | Faber-Castell Polychromos, Warm Grey VI | 223 / 900 |
| Amazon | FUR JADEN vegan-leather laptop backpack | 1,429 / 5,000 |
| Amazon | JD FRESH 8-inch bypass pruner | 368 / 999 |
| Amazon | KAMILIANT Savvy 55 cm cabin trolley | 1,199 / 8,500 |
| Amazon | KiKiluxxa 1 L borosilicate teapot | 499 / 999 |
| Amazon | Little's AirSense pants M 54 | 613 / 1,299 |
| Amazon | Panasonic 9W motion-sensor LED B22 | 177 / 700 |
| Amazon | Perfora Oral Care Essentials Pack | 549 / 1,224 |
| Amazon | Philips Ujjwal 20W 4 ft batten | 1,159 / 5,000 |
| Amazon | Philips Compact 20W 3-in-1 4 ft batten | 899 / 3,000 |
| Amazon | Puma Dwane IDP running shoes | 1,199 / 3,999 |
| Amazon | Sehaz Artworks silver wall clock 20 cm | 197 / 999 |
| Amazon | Crossbody sling bag | 559 / 1,999 |
| Amazon | Story@Home Sanganeri double bedsheet 250×225 | 899 / 2,999 |
| Amazon | Sunset projection lamp | 495 / 999 |
| Flipkart | Ajmal Prose Fougere EDP 50 ml | 270 / 1,000 |
| Flipkart | AXE Midnight Oak EDP 100 ml | 325 / 1,400 |
| Flipkart | LEE COOPER LC07361.351 men's watch | 1,579 / 14,750 |
| Flipkart | LivHome Infra Pro 2200W infrared cooktop | 1,898 / 7,999 |

- All copy is original: 3 sentences each, written from the PDP title and listing facts.
- The only ₹ figure in the copy is the live price, plus one "about ₹3.3 per ml" per-unit mention.
- Images come from `m.media-amazon.com` or `rukmini1.flixcart.com`.
- Spot-checked `/out/11492` and `/out/11506`: both 302 with our tag (`ashoksachdev-21` and `affid=djhackraj`). The prod deal page returns 200.

## Rejected
| Item | Reason |
|---|---|
| Symbol B08CBGK491, B07TLZSH7Y; Maybelline B08FTKVR2K | No add-to-cart (variant parent) |
| Asai pan B0FNRQR3WY, DR.RASHEL B0B6VC71KT, JAQULINE B0H1BVKHJG, Story@Home curtains B074XSL5PH | Clip coupon needed |
| Derwent B073BF7PVL, Eveready B0CGVDS896, Faber acrylic B0DF2693R4, Amazon Basics cooktop B0FC228YWK, Ant Esports B0CQXNG7SP, Parker Ambient B0BMLM7LQ6, Parker Aster B0CDRQD4BV, Philips 36W B0DQV321HL, Wildcraft jacket B0DMSQDVX9 | Rating 3.5★ or lower |
| Crompton rice cooker B0GSFHDFJD, Luxor B0FR4LNDV3, Miles B0CGM4JXMJ, floor cleaner B0F9R2JNZJ | Weak discount (≤40%) or low-ticket |
| Milton B07D9GVS1Q | IFS ₹150 vs PDP ₹199/270 (drift) |
| Apsara B00LQJ02YI | "MRP error" post, no M.R.P. |
| Classmate B00J4YFUJO, Pilot V5 B08JV9RK68 | Ambiguous pack size |
| ECLET B0CKXKDWD2 | No image |
| Deepanjali vinegar, naturals haldi | Grocery |
| Palak 5-drawer (Flipkart CSDHFYHBBYJS3JRY) | CDN image filename is a different product ("kavira stone drawer") |
| Returno trumpet toy (Flipkart) | Only 25% off, no rating |
| Vaseline Aloe Fresh 600 ml (Myntra 28215558) | ₹255/799, in stock, but the Myntra CDN image is a Streax hair colourant: wrong image |

**Already live (dedup, skipped):**
- B0DW8PY7TR selfie stick (id 4791)
- B09V36YJZW Vatika (id 7714)
- B0HHPQYWVB HRX Kyoto (id 10419)
- PERGVYSZHSZFCRGB TMC gift set (id 6409)
- B0FJMGWF5K Lifelong saucepan (id 11122)

**Stale-price note:** Vatika's DB row shows ₹327 but the PDP is now ₹252. HRX Kyoto's DB row shows ₹2,199 but the PDP is now ₹1,299. Both are live at a higher price than today's; a repricing pass should pick them up.

## Freshness
- **IndexNow:** HTTP 200 for 33 URLs (30 slugs + 3).
  - The first ping sent only 14 slugs, because `tee | head` truncated the slug file. It was re-sent from the payload JSON.
- **Sitemap:** 10,481 `<loc>`, which is 10,450 + 30 deals + 1 post.
  - The first read returned a static-only sitemap with 19 URLs, which was an ISR regeneration blip. Three re-reads gave 10,481.
- **llms.txt:** 200. It is dynamic, so it already includes the batch.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.60 s.
- **Deals:** 11,160 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11507.
- **Posts:** 335, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. No day is 0, and today is at the cap.
- **Broadcast cursor:** `lastId` is 11477, against a DB max of 11507. That gap is this batch, which the external tg-broadcast cron drains, not rot.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. 30 deals shipped and pinged.
