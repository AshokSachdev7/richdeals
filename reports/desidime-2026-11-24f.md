# DESIDIME-INGEST tick — 2026-11-24f

This tick ran at about 10:43–11:00 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `desidime.com/new` and homepage listing cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then verified through a same-origin fetch in the logged-in Amazon tab of the Playwright profile. The Flipkart candidate was checked against its live price.

**Result: 2 new deals were pushed LIVE (#17143 and #17144). Each call returned HTTP 201 with count 1, and each slug was confirmed. One duplicate LIVE row (#299) was repriced from ₹310 to ₹319. IndexNow returned HTTP 200 for 6 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 33 |
| Dropped as junk or not a single product | 20 |
| Dropped for a non-product resolved URL | 2 (MobiKwik resolved to mobikwik.com; Sparnod resolved to a cuelinks.com landing page) |
| Resolved to products | 11 |
| Already in the DB | 4 |
| Rejected within the last 24h | 3 (LG window AC, a wearable blanket, an HDFC card offer) |
| Fresh candidates | 4 |

## Candidates

Price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box. Images are from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`. Every Amazon affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, and DesiDime's `desidime01-21` tag was stripped.

| DesiDime id | Product | Card price | Live price | Decision |
|---|---|---|---|---|
| 2201390 | Ant Esports MK3400 Pro V3 mechanical RGB keyboard, red switch (B0FBRJSX6X) | ₹1,299 | ₹1,299, M.R.P. ₹3,999 (68% off), In stock | Pushed as #17143 |
| 2201388 | Solimo triply stainless steel kadhai 20cm, without lid (B07PB6GSL7) | ₹694 | ₹694, M.R.P. ₹2,200 (68% off), In stock | Pushed as #17144 |
| 2201392 | BLACK+DECKER FSM1605 1300W steam mop (B076KYPQMH) | ₹5,683 | ₹6,315 | Rejected: price drift of ₹632 |
| 2201400 | KUHL Prima A3 BLDC ceiling fan, Flipkart (FANGHSKG6GKVCYMP) | ₹2,175 | ₹2,719 | Rejected: price drift of ₹544 |

Both pushed deals have an original title and a short description written from the product listing, with no DesiDime copy.

## Duplicates (price-sync)

Every duplicate LIVE Amazon row was re-read on its product page.

| Row | Product | DB before | Live | Action |
|---|---|---|---|---|
| #299 | Solimo family tree photo frame set of 7 (B0D6QV5FHD) | ₹310, M.R.P. ₹1,599 (81%), last updated 10-04 | ₹319, M.R.P. ₹1,499, In stock | Repriced, see below |
| #16832 | LEGO Speed Champions 77237 (B0DWF1X7C5) | ₹319, M.R.P. ₹359 | ₹319, M.R.P. ₹359 | No change |
| #17042 | boAt Aavante Bar B30 (B0HHS9L59Z) | ₹1,699, M.R.P. ₹7,999 | ₹1,699, M.R.P. ₹7,999 | No change |
| #17084 | Skybags Xpressionz 67L trolley, Myntra 25221442 | ₹3,738 | Card ₹3,738 | No change. The card matches the row, and Myntra cannot be read with curl |

**#299 reprice:** one `prisma.deal.update` set the price from 310 to 319, the M.R.P. from 1,599 to 1,499 and the discount from 81% to 79%. It also changed the ₹ figure and the discount in the title and description, so the visible copy matches the Offer schema. The affiliate URL was normalised to `/dp/B0D6QV5FHD?th=1&psc=1&tag=ashoksachdev-21`. A `priceHistory` row was added at ₹319. The slug was not touched, and the re-read confirmed it is unchanged. The row's title is still a truncated legacy marketplace title ("…Mixed Sizes (Bla"), so it is flagged under Still open for a rewrite.

## Push

`/admin/deals/bulk` was called once per deal on localhost, which writes to prod through the tunnel. Each call returned HTTP 201 with count 1. Each row was re-read by `productId`: both are LIVE at the verified price, and each slug matches the one sent. None came back as `created:false`, so no slug had to be restored. The prod deal page for #17143 returns 200.

Slugs:

- `ant-esports-mk3400-pro-v3-mechanical-rgb-keyboard-red-switch-b0fbrjsx6x`
- `solimo-triply-stainless-steel-kadhai-20cm-without-lid-b07pb6gsl7`
- `solimo-family-tree-photo-frame-set-of-7-mdf-plaque-plexi-glass-rectangular-wall--B0D6QV` (repriced)

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 6 URLs: the 3 slugs above plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.09s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.38s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.54s. `/blog` (0.54s) and `/llms.txt` (0.38s) were the slowest | OK |
| DB LIVE vs API total | 16,536 = 16,536 (16,994 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,144 vs 17,142 | OK. The gap is this tick's 2 deals, which the external broadcast cron picks up on its next run |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24e` already existed, so this report uses suffix `f` | OK |
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

- **Stale reposts:** #299 had sat ₹9 below the live price since 10-04, and #11191 had sat ₹250 below it from 10-19 until tg-monitor 11-24i caught it. LIVE Amazon prices drift silently, and only a repost or a resweep catches them.
- **Legacy truncated titles:** #299's title and description still carry a cut-off marketplace title ("…Mixed Sizes (Bla"). This needs a geo-optimizer rewrite.
- **IFS yield:** 27 of 31 candidates failed verification in deal-ingest 11-24e.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), the Caprese sling bag, the HoneyTouch Jasper folding bed (BDDGXBYNGQAHGNCY), and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
