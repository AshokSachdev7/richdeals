# DESIDIME-INGEST tick — 2026-11-24e

This tick ran at about 08:30–08:45 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards without fetching any deal page, applied the JUNK and GROCERY filters, and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then verified on the live product page in the logged-in Playwright tab (an in-tab fetch, reading `#corePriceDisplay .a-price-whole`, `#availability` and the add-to-cart button). After that the tick deduplicated by productId against the live DB, pushed the survivors as `status:live`, price-synced one duplicate LIVE row and pinged IndexNow.

**Result: 4 new deals went LIVE (#17130–#17133), all with HTTP 201 and count 1. One duplicate LIVE row (#16447) was repriced from ₹2,299 to ₹1,999. IndexNow returned HTTP 200 for 8 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 31 |
| Dropped as junk, grocery or unsupported | 20 |
| Resolved to a single product | 11 |
| Already in the DB | 4 |
| Rejected in the last 24 hours | 3 (LG AC ACNHKZYFMQCKKGAH ₹29,490; wear me blanket BLAGUX9GJJBEZME2 ₹321; an HDFC card offer) |
| Fresh candidates | 4, all Amazon |

## Candidates (verified on the Amazon product page)

Every candidate was In stock, had an add-to-cart button and showed no captcha. No shadow rows existed for any of the 4 ASINs (checked by slug, productId and affiliateUrl).

| ASIN | Product | PDP price | M.R.P. used | Notes |
|---|---|---|---|---|
| B08D9J9WJ7 | Nirlon non-stick cookware set of 4 | ₹1,343 | none | The ₹335 on the page is a per-piece rate. The card M.R.P. of ₹7,490 implies 82% off, so it was dropped |
| B0HGGH42R2 | boAt Stone 510 25W speaker (Midnight Black) | ₹2,099 | ₹7,990 | 74% off |
| B0761PMCHQ | Halonix 22W 4-ft LED batten (cool day light) | ₹127 | none | The ₹700 M.R.P. implies 82% off, so it was dropped |
| B0C6QXCS6V | i2008 140W car vacuum, 5000PA, HEPA | ₹1,017 | ₹3,075 | 67% off |

Affiliate links use `https://www.amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. Images are the PDP `#landingImage` hi-res URLs on `m.media-amazon.com`. Titles and descriptions were written fresh, with no DesiDime text.

## Duplicates (price-sync)

| Row | Product | DB before | PDP now | Action |
|---|---|---|---|---|
| #16447 | Zebronics Silencio 100 wireless headphones (B0HLDFNQV9) | ₹2,299 / ₹4,999, 54% | ₹1,999 / ₹4,999, In stock | Repriced to ₹1,999 at 60% off. Title updated, `priceHistory` row added |
| #17127, #4090, #17084 | Other duplicates | Match the PDP | — | No change |

## Push

| id | Slug | HTTP | count |
|---|---|---|---|
| 17130 | `nirlon-non-stick-cookware-set-of-4-with-bakelite-handles-b08d9j9wj7` | 201 | 1 |
| 17131 | `boat-stone-510-25w-portable-bluetooth-speaker-midnight-black-b0hggh42r2` | 201 | 1 |
| 17132 | `halonix-22w-4-ft-led-batten-tubelight-cool-day-light-b0761pmchq` | 201 | 1 |
| 17133 | `i2008-140w-car-vacuum-cleaner-with-5000pa-suction-and-hepa-filter-b0c6qxcs6v` | 201 | 1 |

After the push, each row was re-read by productId. All four are LIVE and their slugs match what was sent.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, slug mode) | HTTP 200 for 8 URLs: the 4 new deals, #16447, plus `/`, `/offers` and `/sitemap.xml` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800` |
| llms.txt | 200 (0.44s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.62s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,525 = 16,525 (16,983 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,133 vs 17,129 | Expected lag. The 4 rows from this tick wait for the next external tg-broadcast run, which advances the cursor itself |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a` to `-24d` already existed, so this report uses suffix `e` | OK |
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

- **Telegram yield:** the sidebar heads have not changed since 11-24f (tg-monitor 11-24h).
- **IFS yield:** the same 29 candidates failed verification in deal-ingest 11-24c and 11-24d.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), the Caprese sling bag, the two MURPHY wall lamps, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b. (The boAt Stone 510 is now LIVE from Amazon as #17131.)
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
