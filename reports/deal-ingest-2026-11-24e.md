# DEAL-INGEST indiafreestuff tick — 2026-11-24e

This tick ran at about 08:53–09:05 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals`, `?page=2`, `?page=3` and `/deals/superdeals` with a 2.6s gap between requests, resolved the base64 `?rto=` Buy Now ids to store URLs, and deduplicated by `productId` against the live DB. Every fresh candidate, plus every duplicate whose card price differed from the DB, was then re-read on the Amazon product page: first with the mobile-UA curl reader, then (for the 5 ASINs that hit a captcha, and for every survivor) through a same-origin fetch in the logged-in Playwright tab.

**Result: 4 deals were pushed LIVE (#17134–#17137, each HTTP 201 with count 1, slugs confirmed). The other 27 of the 31 fresh candidates were rejected: 22 for price drift and 5 for having no buy box. The 6 duplicates whose card price differed from the DB still match the DB on the product page, so no row was repriced. IndexNow returned HTTP 200 for 7 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 96 |
| Resolved to a single product | 88 (87 Amazon, 1 Myntra) |
| Dropped | 8 |
| Already in the DB (duplicates) | 57 (all LIVE except #8707, which is EXPIRED) |
| Fresh candidates | 31 (all Amazon) |

The Myntra card (39961022) was a duplicate of a LIVE row and matched the DB.

The 8 drops:

- Flipkart cards that did not resolve to a product: the HoneyTouch Jasper single folding bed (an `/indiafreestuff/p/` pid, BDDGXBYNGQAHGNCY, card ₹7,477), boAt Aavante Prime 5050D, Sony WH-CH730N, the boAt Stone 510 Flipkart listing (the Amazon listing is already LIVE as #17131), and the Caprese sling bag.
- Hub pages: the Flipkart Black Friday sale hub, the Amazon try-it-first samples page (`/b?node`) and a Pepe Jeans search (`/s?`).

The two MURPHY wall lamps from 11-24d have left the IFS listing.

## Candidates

The price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box.

**Pushed (4):**

| ID | ASIN | Product | Price | M.R.P. |
|---|---|---|---|---|
| #17134 | B0GXFGYKYN | KP307 80mm thermal receipt printer (USB, LAN, Wi-Fi, Bluetooth, auto cutter) | ₹4,895 | ₹6,999 (30% off) |
| #17135 | B09WWYKP42 | eMeet M1A USB conference speakerphone | ₹4,999 | ₹7,390 (32% off) |
| #17136 | B0HJHN633X | Story@Home 144 TC cotton single bedsheet, Minty Ivory | ₹599 | ₹1,499 (60% off) |
| #17137 | B00FMUOCX4 | POND'S Bright Beauty Spot-less face wash 50g | ₹82 | ₹164 (50% off) |

- The POND'S card gave the M.R.P. as ₹82, the same as the price. The product page shows ₹164, which is what was stored. The page also showed only 2 units left.
- Every image is from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`.
- Every affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.
- Titles and descriptions were written fresh and copy none of the IFS card text.

**No buy box (5):** B0FBM947J3, B0GFM5ZDGX, B0BCVQVLDV, B01M8LNG7B and B0C1CBCH2G. B0C1CBCH2G shows ₹382 but is temporarily out of stock. The other four are unavailable. These are the same five as in 11-24c and 11-24d.

**Price drift (22):**

| ASIN | Card | Product page |
|---|---|---|
| B09V369638 | ₹3,723 | ₹3,799 |
| B0BW4VTWZ8 | ₹10,690 | ₹10,990 |
| B07GFLKTQH | ₹316 | ₹336 |
| B092JDW7G7 | ₹346 | ₹965 |
| B0HGB2LWQY | ₹94 | ₹1,199 |
| B0HJ5C7ZMH | ₹99 | ₹1,599 |
| B0GD7MWVQ5 | ₹79 | ₹99 |
| B0H7MB61SM | ₹104 | ₹110 |
| B0HHMM2VH9 | ₹599 | ₹839 |
| B0BGBKY7V2 | ₹920 | ₹939 |
| B0H94NWNDV | ₹999 | ₹1,699 |
| B0H3M94795 | ₹154 | ₹533 |
| B0FBW7D1BY | ₹176 | ₹385 |
| B07P1M7GRY | ₹832 | ₹849 |
| B0HHK64X5Z | ₹366 | ₹385.57 |
| B0G4R8TW5F | ₹239 | ₹244 |
| B0GMLJCBBM | ₹33,250 | ₹35,500 |
| B0H9F7LNWX | ₹149 | ₹878 |
| B0GSZ9RBWZ | ₹31,740 | ₹34,490 |
| B0H7MCHZJ2 | ₹141 | ₹149 |
| B0HK3XL66F | ₹374 | ₹749 |
| B0868XBJN7 | ₹91 | ₹76, with a "Min Buy 003" condition in the title |

B0868XBJN7 reads lower than the card, but the minimum-quantity condition means a single unit cannot be bought at that price, so it was rejected.

Check: 4 pushed + 5 with no buy box + 22 drifting = 31 fresh candidates.

## Duplicates (price sync)

Of the 57 duplicates, 6 had a card price that differed from the DB. Each was re-read on the product page:

| ASIN | Row | DB | Product page | Note |
|---|---|---|---|---|
| B0DWK8PXF4 | #17085 | ₹169 | ₹169 | The card said ₹93 |
| B0DGQ4VTZS | #17089 | ₹2,140 | ₹2,140 | |
| B0FLJRQPYG | #17054 | ₹725 | ₹725 | The card said ₹137 |
| B0FGVCBZ6N | #17056 | ₹185 | ₹185.99 | Within ₹1 |
| B083KBJ93F | #1688 | ₹232 | ₹232.93 | Within ₹1 |
| B0FH9TZHHG | #8707 | — | Unavailable (₹179) | Stays EXPIRED |

No row was repriced.

## Push

`/admin/deals/bulk` was called once per deal on localhost, which writes to prod through the tunnel. Each call returned HTTP 201 with count 1. Each row was re-read by `productId`: all four are LIVE at the verified price, and each slug matches the one that was sent. None came back as `created:false`, so no slug had to be restored.

Slugs:

- `kp307-80mm-thermal-receipt-printer-with-usb-lan-wi-fi-and-bluetooth-b0gxfgykyn`
- `emeet-m1a-usb-conference-speakerphone-with-360-mic-pickup-b09wwykp42`
- `story-home-144-tc-cotton-single-bedsheet-150x230-cm-minty-ivory-b0hjhn633x`
- `pond-s-bright-beauty-spot-less-germ-removal-face-wash-50g-b00fmuocx4`

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 7 URLs: the 4 deal slugs plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.45s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.60s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,529 = 16,529 (16,987 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,137 vs 17,133 | OK. The gap is this tick's 4 deals, which the external broadcast cron picks up on its next run |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24d` already existed, so this report uses suffix `e` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (ids 637 and 638). The CONTENT-SEO run at 12:39 IST can add a third. The cap is 4 |

## Still open

- **IFS yield:** 27 of the 31 candidates fail verification, and they are mostly the same ASINs as in 11-24c and 11-24d. The card prices keep lying.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), the Caprese sling bag, the HoneyTouch Jasper folding bed (BDDGXBYNGQAHGNCY), and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b. The boAt Stone 510 was removed from this list because it is LIVE as #17131 from Amazon.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
