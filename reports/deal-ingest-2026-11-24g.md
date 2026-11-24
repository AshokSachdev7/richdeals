# DEAL-INGEST (indiafreestuff) tick — 2026-11-24g

This tick ran on 11-24 and finished at about 13:13 IST.

- Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals`, and resolved the base64 `?rto=` Buy Now ids to store URLs.
- Every fresh Amazon candidate was verified with a same-origin fetch of its product page in the logged-in Amazon tab of the Playwright profile.

**Result: 35 new deals were pushed LIVE (#17168 to #17202). Each call returned HTTP 201 with count 1, and each slug was confirmed. Three duplicate LIVE rows were repriced in place. IndexNow returned HTTP 200 for 41 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 95 |
| Resolved to a store URL | 84 |
| Dropped at stage 1 | 11: nine Flipkart `/indiafreestuff/p/` cards (cihlex earbuds, BBS earbuds, Godrej 308L fridge, Crompton fan, Colorbot BLDC fan, Vim liquid, Bosch 302L fridge, iBall Cinebar, Honeytouch folding bed), one Flipkart Black Friday hub, and one Amazon `/b?node` samples page |
| Already in the DB (by `productId`) | 24 |
| Fresh candidates | 60 |
| Pushed | 35 |

## Verification

Each candidate was checked on its live product page:

- **Price:** read from `#corePriceDisplay_desktop_feature_div .a-price-whole` plus `.a-price-fraction`.
- **Stock:** read from `#availability` plus `#add-to-cart-button`.
- **M.R.P.:** taken from `#centerCol`, because `.a-text-price` can show a per-unit rate.
- **Rejected:** any drift above ₹1, and any page without a buy box.
- **Images:** from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`.
- **Affiliate link:** every link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, and the source tag was stripped.

Titles and descriptions are original, written from the product listing. No indiafreestuff copy was used.

### Rejected or skipped (25)

| Reason | Items |
|---|---|
| Price drift | SOULEVA B0HKZTF8CW, Expresso B0HL4K6Q2K and B0F3BH5HWJ (rejected as a block), HP OmniBook B0HHS5PYJJ, shelf B0FYNQ567Q, DOCAT B0GG9Y24SJ, cork lights B082QM85FJ, knee brace B0DRXZPH6Y, toucan B0HH8DRD31, Roughhouse B0DXF9DHHZ and B0F8Q9Q8QQ (rejected as a block), Ashwagandha B0F27S43PK, FURLAY B09V369638, GOLENS B0BW4VTWZ8, Hawkins B07TGXSFTF, triply kadai B0H18D9LKW (₹970 listed, ₹1,389 live), Ambrane B0F8QXJ12T |
| No buy box | Sony HT-S20R B084685MT1 |
| No image | CAHOOT B0D2RK58LB |
| Not a fit | Pulsar B0HLLFGNDT (a vehicle), Dove B008KH5FBE (minimum purchase of 3), wipro Garnet panel B0C8ZJHYDX (pack quantity unclear), ACTION PILO B0GRNKGGGR (the image may show the wrong colour) |
| Near-duplicate listings | ATORSE mouse B0F4KM18T4 and B0FWBYSX92: both ₹555, with the same image as the SYDL mouse |

## Pushed (35)

| Row | ASIN | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| #17168 | B07B4CSPBJ | Nirlon 2-way non-stick aluminium cookware set, 4 pieces | ₹746 | ₹3,190 | 77% |
| #17169 | B09Y931RPZ | Patiofy cotton netted round hanging swing, large | ₹949 | ₹2,999 | 68% |
| #17170 | B0H4R3HRB8 | Teakwood large hard-shell cabin trolley, 8 wheels | ₹2,199 | ₹11,999 | 82% |
| #17171 | B0CDSCKJ6W | JIALTO SUS304 wall-mounted utensil shelf | ₹599 | ₹1,999 | 70% |
| #17172 | B0HFHVBDBQ | Kenstar CROMEX 1000W mixer grinder, 3 jars | ₹3,888 | ₹10,990 | 65% |
| #17173 | B0DW46CZ7W | Homesake antique brass E27 wall sconce | ₹469 | ₹2,000 | 77% |
| #17174 | B0F145C8YG | CALANDIS 3-inch full-range speaker driver | ₹244 | ₹391 | 38% |
| #17175 | B0FKH4DBHS | SYDL hair removal epilator | ₹338 | ₹608 | 44% |
| #17176 | B0GWDX86D2 | UCB insulated lunch bag with 3 glass containers | ₹799 | ₹1,599 | 50% |
| #17177 | B0H6C49C5X | X-Cross neoprene posture corrector belt | ₹539 | ₹1,999 | 73% |
| #17178 | B0G3Q7M5G4 | Honeywell Zest 65W GaN dual Type-C charger | ₹1,999 | ₹8,599 | 77% |
| #17179 | B0HMJKHLS5 | iBall Trumpet 100 Type-C wired earphones | ₹299 | ₹699 | 57% |
| #17180 | B0DKTHFWNZ | Prodot PS2 ergonomic wired mouse | ₹198 | ₹300 | 34% |
| #17181 | B08R42JH4M | HP M10 G2 wired USB mouse | ₹259 | ₹649 | 60% |
| #17182 | B0DGXW7BFH | ProDot MU-Comfy wired USB mouse | ₹198 | ₹249 | 20% |
| #17183 | B07LCK5QKJ | Prodot ergonomic wired PS2 mouse | ₹379 | ₹600 | 37% |
| #17184 | B0HGM5D9WG | 75L foldable laundry basket | ₹299 | ₹999 | 70% |
| #17185 | B0H2ZG34WZ | MiniExplorer baby activity walker | ₹999 | ₹3,599 | 72% |
| #17186 | B0H1JGM1GJ | DOCOSS 1.8L kettle with 5 temperature presets | ₹1,295 | ₹1,999 | 35% |
| #17187 | B0HRG2N6QJ | LONGWAY Gusto 150mm exhaust fan | ₹649 | ₹1,979 | 67% |
| #17188 | B0FJMCBGJR | SYDL 7-button wired gaming mouse with LED | ₹549 | ₹988 | 44% |
| #17189 | B0HJR6Z8NS | Nutripro 1.5L multipurpose cook kettle | ₹999 | ₹2,000 | 50% |
| #17190 | B0H3VR2CHM | Tesora 1.8L electric kettle with recipe book | ₹999 | ₹2,000 | 50% |
| #17191 | B0BW3NDGQF | SS304 folding towel rack | ₹999 | ₹3,500 | 71% |
| #17192 | B0CKPC723R | JIALTO aluminium bathroom organiser, pack of 2 | ₹579 | ₹1,999 | 71% |
| #17193 | B0H8Y31QND | Hot Wheels Cool Classics '55 Chevy | ₹179 | none listed | n/a |
| #17194 | B0GCLMF8FH | Fogg f20 Fabulous Power EDP 100ml | ₹899 | ₹1,999 | 55% |
| #17195 | B0F1PW2PF8 | Leatherkraft formal slip-on shoes | ₹437 | ₹2,499 | 83% |
| #17196 | B0BGJMW573 | Spiro soft practice cricket balls, multi-pack | ₹4,131 | ₹13,950 | 70% |
| #17197 | B0H5GB71GB | HE Advanced Grooming perfume gift set, 4 x 20ml | ₹365 | ₹849 | 57% |
| #17198 | B0GYJ3M2J5 | Zebronics Heat Buster 500 tower fan | ₹1,399 | ₹3,999 | 65% |
| #17199 | B08CCXF7GT | Oslen double-layer wall shelf | ₹999 | ₹5,999 | 83% |
| #17200 | B01GTQ93ZQ | Dell 3-pin laptop power cord | ₹129 | ₹499 | 74% |
| #17201 | B0DKNNB4RR | Ant Esports Bungee 212 mouse cable manager | ₹399 | ₹2,999 | 87% |
| #17202 | B0C7V1R8CK | Amazon Brand Symbol cotton padded T-shirt bra | ₹409 | ₹3,499 | 88% |

Three items showed paisa amounts on the live page: B07B4CSPBJ, B0BGJMW573 and B0H5GB71GB. Their stored prices are rounded to the nearest rupee, and each description says so. The Hot Wheels car has no M.R.P. on its page, so the row carries no M.R.P. and no discount.

## Duplicates (price-sync)

Each of these LIVE rows was re-read on its product page. Each was repriced with one `prisma.deal.update`, which also changed the ₹ figure and the discount in the title and description, so the visible copy matches the Offer schema. The affiliate URL was normalised, and a `priceHistory` row was added. The slug was not touched, and the re-read confirmed it is unchanged.

| Row | Product | DB before | Live | Off |
|---|---|---|---|---|
| #16354 | Crystal 6-piece non-stick cookware set (B0H41D4CXQ) | ₹1,140 | ₹1,057, M.R.P. ₹3,499 | 67% → 70% |
| #12449 | Inalsa Tasty Fry D5.5 air fryer (B0FQNDD9BJ) | ₹3,793 | ₹3,648, M.R.P. ₹11,995 | 68% → 70% |
| #16215 | Flybot Blaze Bluetooth neckband (B07X1T9MJC) | ₹374 | ₹318, M.R.P. ₹2,499 | 85% → 87% |

## Push

`/admin/deals/bulk` was called once per deal on localhost, which writes to prod through the tunnel. All 35 calls returned HTTP 201 with count 1. Each row was re-read by `productId`: all are LIVE at the verified price, and every slug matches the one sent. None came back as `created:false`, so no slug had to be restored. The prod page for #17202 returns 200, and it heads the prod `/api/deals` list.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 41 URLs: the 38 slugs (35 new and 3 repriced) plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.42s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.05–0.63s. `/blog` (0.63s) and `/llms.txt` (0.42s) were the slowest | OK |
| DB LIVE vs API total | 16,594 = 16,594 (17,052 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,202 vs 17,167 | OK. The gap is this tick's 35 deals. The external broadcast cron picks them up over its next runs |
| Coverless / SEO-less posts | 0 / 0 (507 posts) | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24f` already existed, so this report uses suffix `g` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2. This meets the target of 2–3. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **IFS yield:** 35 of 60 candidates this tick, up from 19 of 46 in 11-24f. Price drift is still the main reason for rejection (18 items).
- **Flipkart drops:** the earlier list, 13 `/indiafreestuff/p/` cards from 11-24f, and 9 more this tick.
- **Block rejections:** the Roughhouse and Expresso listings drifted together, so each brand was rejected as a block.
- **Near-duplicate listings:** the ATORSE mice reuse the SYDL image at the same price. They were skipped.
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH) was rejected two ticks in a row on DesiDime.
- **Stale reposts:** LIVE Amazon prices drift silently. This tick repriced 3 rows, desidime 11-24g repriced #12555, and deal-ingest 11-24f repriced 4.
- **Legacy truncated titles:** #299 still carries a cut-off marketplace title. It needs a geo-optimizer rewrite.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`, and #17167 (Fire-Boltt, ₹16,999 M.R.P.).
- **No buy box:** #7259, #12963 and #14154.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
