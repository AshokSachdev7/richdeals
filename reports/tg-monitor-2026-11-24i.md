# TELEGRAM-DEAL-MONITOR tick — 2026-11-24i

This tick ran at about 09:05–09:20 IST on 11-24. It used Telegram Web (`web.telegram.org/a/`) in the logged-in Playwright profile (richDeals). One `browser_evaluate` read the `.chat-list .ListItem.Chat` sidebar and returned only the rows whose chat id is in `data/tg-groups.json`. The tick opened no chat and did not reload the chat list. Shortlinks were resolved with curl using a browser user agent. Product pages were read through a same-origin fetch in the logged-in Amazon tab.

**Result: 0 new deals were pushed, and 1 LIVE row was repriced. Two groups had new posts since 11-24h:**

- **CoolzTricks** posted the RR Signature water heater at ₹5,849. That product is already LIVE as #11191, so the tick re-read its product page and moved the row from ₹5,599 to ₹5,849. The tick also corrected the row's copy.
- **SB Loots** posted a Cello juicer. Its product page has no buy box, so it was rejected.

**IndexNow returned HTTP 200 for 4 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Sidebar (newest post per group, IST)

| Group | Time | Newest post | Decision |
|---|---|---|---|
| SB Loots And Deals | 08:53 | "BUY" with `amazn.lt/FDP0fFy0`, which resolves to B0FS23TZ4N (Cello Trion Nutri Max Pro 2J juicer mixer grinder, 500W) | Fresh in seen and DB. The product page has no price and no add-to-cart button, so there is no buy box. Rejected |
| CoolzTricks Official | 08:22 | RR Signature 25L water heater @ ₹5,849 (`amzn.to/3Vh0cRc`, which resolves to B0D8LH326T) | Duplicate of LIVE #11191. The product page reads ₹5,849, In stock, with an add-to-cart button. Repriced, see below |
| Dealzone | 01:09 | Sonata watches from ₹487 | Multi-product. Already seen |
| Rogerkart Deals | 00:24 | Zebronics wireless car charger @ ₹999 | Duplicate of LIVE #17059. Already seen |
| Dealdost | Mon | IndusInd Tiger credit card offer | Not a product |
| ONLINE SHOPPING DEALS | Mon | GKD coaster set @ ₹90 | #17081, EXPIRED. Already seen |
| IndiaFreeStuff Tips & Tricks | Fri | Swiggy Instamart tip | Not a product |
| Hidden Loot Deals & Offers | Nov 11 | Swiggy Dineout voucher tip | Not a product |
| INDIAN CHEAP DEALS | Oct 29 | LG washing machine sale | Sale hub. Already seen |
| NonStopDeals | Oct 5 | Caprese handbags (`fkrt.it`) | Category post. Already seen |

As in earlier ticks, Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not among the loaded rows.

## Reprice: #11191

The tick read the RR Signature Zello PRO 25L (B0D8LH326T) product page through a same-origin fetch in the logged-in tab:

| Field | Value |
|---|---|
| Price (`#corePriceDisplay_desktop_feature_div .a-price-whole`) | ₹5,849 |
| M.R.P. | ₹13,500 |
| Discount | 57% |
| Stock | `#availability` shows In stock, and `#add-to-cart-button` is present |
| Coupon | None in `#centerCol` |
| Image | `m.media-amazon.com/images/I/51Mv13QEkWL`, the same as the image already stored |

The DB row held ₹5,599 (59% off), last updated on 10-19. The channel price matches the product page exactly. A single `prisma.deal.update` changed the following:

- **Price:** 5599 → 5849.
- **Discount:** 59 → 57.
- **Title:** the hand-typed "₹5,599 (59% Off)" became "₹5,849 (57% Off)", and "PRO" was added to match the listing. This keeps the visible copy in line with the Offer schema.
- **Description:** the closing price sentence was updated. The tank warranty also changed from "6 years" to "5 years", because the product title states "5 Yr on Tank". The old figure was a factual error.
- **Affiliate URL:** normalised to `/dp/B0D8LH326T?th=1&psc=1&tag=ashoksachdev-21`.

The update does not touch the slug, and the re-read confirmed it is unchanged. The prod deal page already serves `"price":"5849"` in its JSON-LD.

## Push

There was no `/admin/deals/bulk` call, because there was no fresh deal that passed verification. `tg-multi-seen.json` went from 5,801 to 5,805 entries. The 4 new entries are the two shortlinks and the two ASINs.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the #11191 slug plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800` |
| llms.txt | 200 (0.37s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.54s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,529 = 16,529 (16,987 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,137 = 17,137 | OK. The broadcast has picked up deal-ingest 11-24e's 4 deals |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24h` already existed, so this report uses suffix `i` | OK |
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

- **Stale reposts:** #11191 had sat ₹250 below the live price since 10-19. This tick's reprice is another sign that LIVE Amazon prices drift silently. Only a repost or a resweep catches it.
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
  - This tick filtered the sidebar by group id, so it read neither row. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
