# DESIDIME-INGEST tick — 2026-11-24g

This tick ran at about 12:43–12:50 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `desidime.com/new` and homepage listing cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then verified through a same-origin fetch in the logged-in Amazon tab of the Playwright profile. The Flipkart duplicate was checked against the ld+json on its product page in a second tab.

**Result: 1 new deal was pushed LIVE (#17167). The call returned HTTP 201 with count 1, and the slug was confirmed. One duplicate LIVE row (#12555) was repriced from ₹998 to ₹1,249. IndexNow returned HTTP 200 for 5 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped as junk or not a single product | 18, plus an Amazon Prime link |
| Resolved to products | 15 |
| Already in the DB | 4 |
| Rejected within the last 24h | 3 (KUHL fan, a wearable blanket, an HDFC card offer) |
| Fresh candidates | 8 |

## Candidates

Price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole` plus `.a-price-fraction`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box. Images are from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`. Every Amazon affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, and DesiDime's `desidime01-21` tag was stripped.

| Product | Card price | Live price | Decision |
|---|---|---|---|
| Fire-Boltt Glitz women's smartwatch, 1.19" AMOLED, Bluetooth calling (B0GH85QLT3) | ₹1,299 | ₹1,299, M.R.P. ₹16,999 (92% off), ships in 1–2 days, add-to-cart present | Pushed as #17167 |
| Bombay Kookware triply kadai 26cm (B0H18D9LKW) | ₹943 | No price, no add-to-cart | Rejected: no buy box |
| Philips 10000mAh 30W power bank (B0FJMCX7CV) | ₹1,350 | ₹1,558.04 | Rejected: price drift of ₹208 |
| Khaitan Volt 5.5L geyser (B0H8PBSZMY) | ₹3,150 | ₹3,499 | Rejected: price drift of ₹349 |
| ASUS VA259HGA monitor (B0F9KBZ8W3) | ₹6,992 | ₹9,999 | Rejected: price drift of ₹3,007 |
| BLACK+DECKER FSM1605 steam mop (B076KYPQMH) | ₹5,683 | ₹6,315.98 | Rejected: price drift of ₹633. This is the second tick in a row (also rejected in 11-24f) |
| Adobe Black Friday page | n/a | n/a | Skipped: a sale page, not a product, and it has no ld+json |
| Instamart Senco silver item | n/a | n/a | Skipped: no ld+json, and the card price depends on an SBI card offer |

The Fire-Boltt M.R.P. of ₹16,999 looks inflated. The description says it is the figure Amazon lists and asks readers to judge the deal on the ₹1,299 price. The title and description are original, written from the product listing, with no DesiDime copy.

## Duplicates (price-sync)

Every duplicate LIVE row was re-read on its product page.

| Row | Product | DB before | Live | Action |
|---|---|---|---|---|
| #12555 | Acer DreamWave 5W Bluetooth speaker (B0GKHYTGB3) | ₹998, M.R.P. ₹4,000 (75%) | ₹1,249, M.R.P. ₹4,000, In stock | Repriced, see below |
| #14154 | boAt Airdopes 141 Gen 2 (B0F8BW85MZ) | ₹899 | No buy box; only the all-offers widget. The card says ₹799 | No change. Flagged under Still open |
| #17164 | EcoLink AiroMax BLDC fan (B0GD8MV3SC) | ₹1,827 | ₹1,826.98 | No change. The card's ₹1,645 is not the live price |
| #17078 | Sony WH-CH730N, Flipkart (ACCHSSBFSWJSFNPG) | ₹12,990 | ld+json price 12,990, InStock, not sold out | No change. The card's ₹11,950 is most likely a bank-offer price |

**#12555 reprice:** one `prisma.deal.update` set the price from 998 to 1,249 and the discount from 75% to 69%, keeping the M.R.P. at ₹4,000. It also changed the ₹ figure and the discount in the title and description, so the visible copy matches the Offer schema. The affiliate URL was normalised to `/dp/B0GKHYTGB3?th=1&psc=1&tag=ashoksachdev-21`. A `priceHistory` row was added at ₹1,249. The slug was not touched, and the re-read confirmed it is unchanged.

## Push

`/admin/deals/bulk` was called once on localhost, which writes to prod through the tunnel. It returned HTTP 201 with count 1. The row was re-read by `productId`: #17167 is LIVE at ₹1,299, and its slug matches the one sent. It did not come back as `created:false`, so no slug had to be restored. The prod deal page returns 200.

Slugs:

- `fire-boltt-glitz-women-s-smartwatch-with-1-19-inch-amoled-display-and-bluetooth-b0gh85qlt3`
- `acer-dreamwave-bluetooth-5w-speaker-with-night-light-and-white-noise-1500mah-b0gkhytgb3` (repriced)

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 5 URLs: the 2 slugs above plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.35s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.08–0.47s. `/blog` (0.47s) and `/llms.txt` (0.35s) were the slowest | OK |
| DB LIVE vs API total | 16,559 = 16,559 (17,017 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,167 vs 17,166 | OK. The gap is this tick's 1 deal, which the external broadcast cron picks up on its next run |
| Coverless / SEO-less posts | 0 / 0 (507 posts) | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24f` already existed, so this report uses suffix `g` | OK |
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

- **Stale reposts:** LIVE Amazon prices drift silently. This tick caught #12555 sitting ₹251 below the live price. deal-ingest 11-24f repriced 4 duplicates, and #299 and #11191 were caught the same way earlier.
- **Legacy truncated titles:** #299 still carries a cut-off marketplace title. It needs a geo-optimizer rewrite.
- **IFS yield:** 19 of 46 candidates in deal-ingest 11-24f.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`. The Fire-Boltt row (#17167) lists a ₹16,999 M.R.P.
- **No buy box:** #7259, #12963 and now #14154 (boAt Airdopes 141 Gen 2).
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the earlier list plus 13 `/indiafreestuff/p/` cards from deal-ingest 11-24f.
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH) is still listed at ₹5,683 on DesiDime but costs ₹6,316 on Amazon. It has been rejected two ticks in a row.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
