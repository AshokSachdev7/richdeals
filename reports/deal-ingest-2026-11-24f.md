# DEAL-INGEST (indiafreestuff) tick — 2026-11-24f

This tick ran at about 10:53–11:15 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept both `/deals` and `/deals/superdeals` on indiafreestuff.in, with at least 2.5s between requests, and resolved each base64 `?rto=` Buy Now id to its real store URL. Every candidate was then verified on its live product page. Amazon pages were read through a same-origin fetch in the logged-in Amazon tab (tab 1) of the Playwright profile, and the Myntra duplicate was checked against its ld+json. Nothing was pushed on the strength of an IFS card price.

**Result: 19 new deals were pushed LIVE (#17145–#17163). Each call returned HTTP 201 with count 1, and each slug was confirmed. Four duplicate LIVE rows were repriced in place. IndexNow returned HTTP 200 for 26 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards swept (`/deals` + `/deals/superdeals`) | 101 |
| Resolved to a single product | 86 (85 Amazon, 1 Myntra) |
| Dropped | 15: 13 Flipkart `/indiafreestuff/p/` cards whose pid stage 1 nulls, the Flipkart Black Friday hub, and an Amazon try-it-first `/b?node` page |
| Already in the DB | 40 |
| Fresh candidates | 46 |
| Product pages read | 50, plus 9 re-reads. No captcha |

## Verification

Price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box. Images are from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`. Every Amazon affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, and IFS's `dealhind-21` tag was stripped.

| Outcome | Count | Detail |
|---|---|---|
| Passed and pushed | 19 | See the table below |
| Price drift | 23 | 10 new this tick: B082QM85FJ (card ₹95, live ₹98), B0DRXZPH6Y (₹244 → ₹249), B0DXF9DHHZ (₹169 → ₹299), B0HH8DRD31 (₹224 → ₹249), B0F27S43PK (₹290 → ₹299), B07TGXSFTF Hawkins (₹2,773 → ₹3,013), B0D7MJ8WG7 (₹200 → ₹505.75), B076KYPQMH BLACK+DECKER (₹5,685 → ₹6,315.98), B0CQM61N1J Pigeon (₹799 → ₹1,118.83), B0FNCW1XNF Baidyanath (₹279 → ₹285). The other 13 drifted again after 11-24e: B09V369638, B0BW4VTWZ8, B07GFLKTQH, B092JDW7G7, B0HGB2LWQY, B0HJ5C7ZMH, B0GD7MWVQ5, B0H7MB61SM, B0HHMM2VH9, B0BGBKY7V2, B0H94NWNDV, B0H3M94795, B0FBW7D1BY |
| No buy box | 3 | B0FBM947J3, B0GFM5ZDGX, B084685MT1 (Sony HT-S20R) |
| Minimum quantity | 1 | B008KH5FBE (Dove serum bar) has a minimum order of 3, so the card price is not a single-unit price |

The Baidyanath block was checked ASIN by ASIN rather than rejected whole: B0FNCW1XNF drifted, while its sibling B0B4FXVK7V matched the card exactly and was pushed.

## Pushed

| ID | ASIN | Product | Price | M.R.P. | Note |
|---|---|---|---|---|---|
| #17145 | B0843D2TRX | Cutting EDGE Nesterware 500ml containers, set of 6 | ₹252 | ₹585 | Page showed ₹252.44, rounded |
| #17146 | B0FD7R6CRB | Red Lemon BANGE office laptop messenger bag 13L | ₹2,190 | ₹8,999 | |
| #17147 | B0H6F8Q8XF | Ear-shaped stainless steel pet bowl | ₹126 | ₹499 | Rounded |
| #17148 | B0H6QJ9NMQ | SKKIN vitamin C face toner 200ml | ₹145 | ₹499 | |
| #17149 | B0FL8VXVQP | NODENS nylon knee support, orange, L | ₹149 | ₹499 | |
| #17150 | B0HDJLJPKW | SANMARINO 260 GSM fleece blanket, single | ₹399 | ₹1,499 | |
| #17151 | B07QH1YRYP | Kayra Decor PVC wall stencil, pack of 4 | ₹133 | ₹1,596 | |
| #17152 | B09JVM1KMG | Amazon Brand Myx women's night suit set | ₹429 | ₹1,999 | |
| #17153 | B0DG55T8PP | CBK retro twin bell table clock | ₹299 | ₹999 | Only 1 left at check time |
| #17154 | B0F5KSRM5Y | Bhumi organic spinach powder 350g | ₹299 | ₹500 | |
| #17155 | B0DRGDDKMS | Lux Cozi men's cotton vest, pack of 3 | ₹359 | ₹606 | |
| #17156 | B0GDGFG7JX | Wembley musical gun toy | ₹269 | ₹399 | |
| #17157 | B0B4FXVK7V | Baidyanath Kumari Asav 220ml, pack of 2 | ₹155 | ₹210 | |
| #17158 | B0CMCGCJRZ | Wooden learning board for kids | ₹250 | ₹999 | |
| #17159 | B0G25S6HTH | Livon hyaluron hair serum | ₹72 | ₹150 | |
| #17160 | B09B438CFX | Terracotta donga with stand, set of 3 | ₹493 | ₹1,790 | Rounded; only 2 left |
| #17161 | B09NDKDJJB | Wipro Garnet 6W round LED surface panel | ₹169 | ₹690 | |
| #17162 | B0GH7TCQ81 | SSC GD 2026 Gagar Mein Sagar book (Hindi) | ₹47 | ₹398 | Rounded |
| #17163 | B09VMKXV5C | 4+4 extension board with LED indicator | ₹270 | ₹999 | Rounded |

The `price` column is an integer. Where the page showed paisa, the price was rounded to the nearest rupee, which stays inside the ₹1 tolerance, and the description says so. Every title and description is original, written from the product listing, with no IFS copy.

`/admin/deals/bulk` was called once per deal on localhost, which writes to prod through the tunnel. Each call returned HTTP 201 with count 1. Each row was re-read by `productId`: all 19 are LIVE at the verified price, and each slug matches the one sent. None came back as `created:false`, so no slug had to be restored.

## Duplicates (price-sync)

All 40 duplicate cards were compared against their LIVE rows. 36 needed no change: 33 where card and DB agree, plus #17085 (B0DWK8PXF4, row ₹169, card ₹93), #17089 (B0DGQ4VTZS, ₹2,140) and #299 (B0D6QV5FHD, ₹319, repriced in desidime 11-24f), which matched the live page. Four rows had drifted and were repriced with `prisma.deal.update`:

| Row | Product | Before | After | Other changes |
|---|---|---|---|---|
| #16071 | Unibic Swaadesi Bandhan Diwali gift pack (B0D9TSXL11) | ₹235, M.R.P. ₹460 (49%) | ₹180, M.R.P. ₹470 (62%) | Title and description figures updated |
| #13349 | ROSS BROWN mini satchel bag (B0C97JVGR9) | ₹345 (86%) | ₹336 (87%) | Description now says "an 87% saving". Affiliate URL normalised |
| #4902 | Amazon Basics 1.5L glass kettle (B0F6D5C229) | ₹790 (68%) | ₹954 (62%) | Affiliate URL normalised |
| #8341 | BLA BLI BLU On The Hills perfume 90ml (Myntra) | ₹220 (83%) | ₹259 (80%) | Description M.R.P. now ₹1,299. Myntra ld+json showed InStock. The InRDeals link was kept |

Each update also changed the ₹ figures and the discount in the title and description, so the visible copy matches the Offer schema. A `priceHistory` row was added for each. No slug was touched, and the re-read confirmed all four are unchanged.

Slugs pinged (19 new + 4 repriced):

- `cutting-edge-nesterware-500ml-stackable-food-containers-set-of-6-blue-b0843d2trx`
- `red-lemon-bange-office-laptop-messenger-bag-13l-b0fd7r6crb`
- `ear-shaped-stainless-steel-pet-bowl-b0h6f8q8xf`
- `skkin-vitamin-c-face-toner-200ml-alcohol-free-b0h6qj9nmq`
- `nodens-nylon-knee-support-orange-size-l-b0fl8vxvqp`
- `sanmarino-260-gsm-fleece-blanket-single-b0hdjljpkw`
- `kayra-decor-pvc-wall-stencil-16x24-inch-pack-of-4-b07qh1yryp`
- `amazon-brand-myx-women-s-cotton-t-shirt-and-rayon-pyjama-night-suit-set-b09jvm1kmg`
- `cbk-retro-twin-bell-table-clock-b0dg55t8pp`
- `bhumi-organic-spinach-powder-350g-b0f5ksrm5y`
- `lux-cozi-men-s-100-cotton-sleeveless-vest-pack-of-3-b0drgddkms`
- `wembley-musical-gun-toy-b0gdgfg7jx`
- `baidyanath-kumari-asav-220ml-pack-of-2-b0b4fxvk7v`
- `wooden-learning-educational-board-for-kids-b0cmcgcjrz`
- `livon-hyaluron-hair-serum-b0g25s6hth`
- `earthenware-terracotta-donga-with-stand-set-of-3-hand-painted-b09b438cfx`
- `wipro-garnet-6w-round-led-surface-panel-light-b09ndkdjjb`
- `ssc-gd-2026-gagar-mein-sagar-book-hindi-b0gh7tcq81`
- `4-4-extension-board-with-led-indicator-b09vmkxv5c`
- `unibic-swaadesi-bandhan-diwali-gift-pack-300g-b0d9tsxl11` (repriced)
- `ross-brown-pu-leather-mini-satchel-bag-purple-b0c97jvgr9` (repriced)
- `amazon-basics-1-5l-electric-glass-kettle-1350w-auto-shut-off` (repriced)
- `bla-bli-blu-on-the-hills-perfume-90ml` (repriced)

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 26 URLs: the 23 slugs above plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.38s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.53s. `/blog` (0.53s) and `/llms.txt` (0.38s) were the slowest | OK |
| DB LIVE vs API total | 16,555 = 16,555 (17,013 rows in total), exactly +19 on desidime 11-24f | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,163 vs 17,144 | OK. The gap is this tick's 19 deals, which the external broadcast cron picks up on its next run |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24e` already existed, so this report uses suffix `f` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2. The CONTENT-SEO run at 12:39 IST can add a third. The cap is 4 |

## Still open

- **Stale LIVE prices:** this tick repriced 4 rows that had drifted silently (#16071 was ₹55 above the live price, #4902 was ₹164 below it). #299 and #11191 were caught the same way earlier today. Only a repost or a resweep catches this.
- **Legacy truncated titles:** #299's title and description still carry a cut-off marketplace title ("…Mixed Sizes (Bla"). This needs a geo-optimizer rewrite.
- **IFS yield:** 19 of 46 fresh candidates passed in this tick (23 drift, 3 no buy box, 1 minimum quantity). 13 of the drifters were already rejected in 11-24e, so IFS keeps relisting stale card prices.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), the Caprese sling bag, the HoneyTouch Jasper folding bed (BDDGXBYNGQAHGNCY), the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b, and this tick's 13 `/indiafreestuff/p/` cards (Crompton Hyperboost, Colorbot Stella BLDC, Vim dishwash liquid, Bosch 302L fridge, iBall Cinebar 100, HoneyTouch Jasper bed, boAt Aavante Prime 5050D, Sony WH-CH730N, boAt Stone 510, REO by Havells Unnovate ×2, Kenstar Snow Breeze, Kenstar Wind Breeze Pro). They need the in-tab Flipkart itm + price resolution.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
