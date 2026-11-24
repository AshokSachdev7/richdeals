# TELEGRAM-DEAL-MONITOR tick — 2026-11-24p

This tick ran at about 15:45–16:20 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One `browser_evaluate` read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId and slug).

Every price was then read on the product page:

- **Amazon:** read in the logged-in Amazon tab. Price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from add-to-cart, and the image from the hiRes `colorImages` (with a hiRes regex fallback).
- **Shopsy:** read in the Flipkart tab. Shopsy has no ld+json, so the price came from `finalPrice`/`mrp` and stock from the absence of the Sold Out widget.

**Result:**

- **3 new deals were pushed LIVE (#17237, #17238, #17239).** Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed.
- **1 candidate was rejected** for price drift (Dell P2426H).
- **4 duplicates were checked and left unchanged.** All four match their live prices within ±₹1.
- **IndexNow returned HTTP 200** for 6 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

These posts were skipped: the Dealzone Dove/Axe combo (multi-product), credit card posts, an Instamart loot post, a Swiggy post, the LG sale hub and the Caprese category post.

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B0BPLM66H4 | Havells Hygiene Grande atta kneader, 5L SS bowl | ₹8,499 | ₹8,499, M.R.P. ₹16,995, in stock | **Pushed as #17237** (50% off) |
| B0G3PDFXJS | CIRCLE JOY rechargeable milk frother with stand | ₹799 | ₹799, M.R.P. ₹1,598, in stock | **Pushed as #17238** (50% off) |
| NAPH8AAWU4UZFTKY | Varniecom microfiber 300 GSM hand towels, pack of 4 (Shopsy) | ₹148 | ₹148, M.R.P. ₹999, in stock | **Pushed as #17239** (85% off) |
| B0GVRCKV8J | Dell P2426H 24-inch monitor | ₹15,499 | ₹15,950 ("Only 1 left") | Rejected: ₹451 drift |
| CareFoam | — | — | ₹809 = DB | Duplicate #17204, no change |
| Hykes | — | — | ₹99 = DB | Duplicate #17140, no change |
| RYLLZ | — | — | ₹149 = DB | Duplicate #17141, no change |
| Figurine | — | — | ₹269.86 vs DB ₹270 | Duplicate #17142, within ±₹1 |

Notes on individual items:

- **Havells:** the plain `/dp/` URL showed no buy box. The seller-pinned URL (`smid=AXOGFIT0PZZ7G`) did, so the affiliate link carries that `smid`.
- **Shopsy towels:** a ₹130 "special price" also appears in the page data. The row uses ₹148, the price shown to buyers.
- **CareFoam's redirect:** the rogerkart link redirects through JavaScript, so it could not be resolved by curl. The product matches the CareFoam duplicate #17204.

## Push

`/admin/deals/bulk` was called once per item on localhost, which writes to prod through the tunnel. All three returned `201 {"count":1,...,"created":true}`. The read-back confirmed status LIVE, the right price and the slug that was sent.

| Row | Slug | Affiliate |
|---|---|---|
| #17237 | `havells-hygiene-grande-atta-kneader-dough-maker-with-5l-ss-bowl-4-speed-b0bplm66h4` | Amazon `?th=1&psc=1&smid=AXOGFIT0PZZ7G&tag=ashoksachdev-21` |
| #17238 | `circle-joy-rechargeable-handheld-milk-frother-wand-with-stand-3-speeds-3-whisks-b0g3pdfxjs` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |
| #17239 | `varniecom-microfiber-300-gsm-hand-towel-set-pack-of-4-naph8aawu4uzftky` | Cuelinks (`cid=527`). Shopsy is not Flipkart |

The Amazon rows use `m.media-amazon.com` `_SL1500_` images and the Shopsy row uses a `rukminim3.flixcart.com` image.

All four ids were added to `data/tg-multi-seen.json`, including the rejected Dell. The file now has 5,832 entries.

All three pages return 200 on prod (0.14–0.20s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 6 URLs: the 3 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.37s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.56s. Slowest: `/blog` (0.56s) | OK |
| DB LIVE vs API total | 16,632 = 16,632 (+3 from this push) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,239 vs 17,236 | OK. The external broadcast cron is current up to the previous tick |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24o` already existed, so this report uses `p` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **DesiDime `/new` returned 0 cards** in desidime 11-24h.
- **Stale reposts:** 18 rows repriced today, plus the #1485 relist in 11-24o.
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 29 of 46 in deal-ingest 11-24h.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215.
- **No buy box:** #7259, #12963, #14154, #13938, #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **The `reticle` MCP is disconnected.** This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
