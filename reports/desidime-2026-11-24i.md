# DESIDIME-INGEST tick — 2026-11-24i

This tick ran at about 10:50–11:20 UTC (16:20–16:50 IST) on 11-24. It was run inline. Stage 1 was `apps/api/scripts/ingest-desidime.mjs`: listing cards only (no per-deal fetch), the JUNK and GROCERY filters, and the `visit.desidime.com` redirect resolved to the real merchant URL. Amazon candidates were then verified with a same-origin fetch in the logged-in Amazon tab of the Playwright MCP (richDeals profile): `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. Flipkart was verified through the ld+json `Product.offers` in a Flipkart tab. Myntra was verified through `productLd()` (±₹1, InStock).

**Result:**

- **DesiDime `/new` is fixed.** It returned 20 cards, against 0 in desidime 11-24h.
- **6 new deals were pushed LIVE (#17240 to #17245).** Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **2 duplicate LIVE rows were repriced in place (#9014, #5968).** Both kept their slugs.
- **6 candidates were rejected for price drift.**
- **IndexNow returned HTTP 200** for 11 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 33 |
| Dropped by JUNK / GROCERY | 10 |
| Resolved to a merchant URL | 21 |
| Already in the DB | 6 |
| Rejected in the last 24h | 3 (Prestige GSTGZG72ZZW3FPFY, wear me BLAGUX9GJJBEZME2, an HDFC offer) |
| Fresh | 12 |

## Fresh candidates

| ID | Product | Store | Card | Live read | Decision |
|---|---|---|---|---|---|
| B0D7Q9PH3H | Fiama Blackcurrant & Bearberry shower gel, 700ml refill | Amazon | ₹132 | ₹132, M.R.P. ₹220, add-to-cart present | **Pushed as #17240** (40% off) |
| B0F4Y3CDNJ | Premier 2-ply toilet tissue, 2560 pulls | Amazon | ₹259 | ₹259, M.R.P. ₹500, in stock | **Pushed as #17241** (48% off) |
| B0B34L1BJK | Nike Men Quest 5 running shoes | Amazon | ₹4,407 | ₹4,407, M.R.P. ₹6,295, 1 left | **Pushed as #17242** (30% off) |
| B0FRNB1JQB | Nike Men Court Vision Low sneakers | Amazon | ₹4,546 | ₹4,546, M.R.P. ₹6,495, 1 left | **Pushed as #17243** (30% off) |
| HSYHHFVHNYSSUCEQ | Parachute Advansed Rosemary Water hair spray, 100ml | Flipkart | ₹109 | ₹109, M.R.P. ₹199, InStock | **Pushed as #17244** (45% off) |
| 39479266 | BAYSTREET women colourblocked crop puffer jacket | Myntra | ₹748 | ₹748, M.R.P. ₹1,999, InStock | **Pushed as #17245** (63% off) |
| B0FG8GVHSW | Whisper | Amazon | ₹357 | ₹419 | Rejected: drift |
| B0H99FTPDR | Livpure chimney | Amazon | ₹10,150 | ₹12,999 | Rejected: drift |
| B0H99ZZCFB | Longway geyser | Amazon | ₹3,959 | ₹4,399 | Rejected: drift |
| B0H8PBSZMY | Khaitan Volt | Amazon | ₹3,150 | ₹3,499 | Rejected: drift (repeat) |
| B0F9KBZ8W3 | ASUS VA259HGA monitor | Amazon | ₹6,992 | ₹9,999 | Rejected: drift (repeat) |
| B076KYPQMH | BLACK+DECKER steam mop | Amazon | ₹5,683 | ₹6,315 | Rejected: drift (4th time) |

The six rejections were written to `data/dd-rejected.json` with `Date.now()` timestamps. It now has 2,198 keys; B076KYPQMH was already present and was refreshed.

The Parachute card's resolved Flipkart URL carried an unrelated path slug (a microwave oven) in front of the right `itm`/`pid`. The affiliate URL was rebuilt on the clean Parachute path with `affid=djhackraj`.

## Duplicates (price sync)

| Row | Product | DB | Live | Action |
|---|---|---|---|---|
| #9014 | CELLO Puro Steel-X Benz 900 bottle (B0BVVQ4GVS) | ₹297, M.R.P. ₹545 | ₹283, M.R.P. ₹587, in stock | **Repriced** to ₹283 / ₹587 / 52% off |
| #5968 | Portronics Vader RGB gaming mouse (B0CPYKD7G5) | ₹299, M.R.P. ₹999 | ₹326, M.R.P. ₹999 | **Repriced** to ₹326 / 67% off. Title updated to ₹326 |
| #17229 | SLOVIC bottle (B0FBRQQXDZ) | ₹199 | ₹199 | No change |
| #17164 | EcoLink fan (B0GD8MV3SC) | ₹1,827 | ₹1,826 | No change (within ±₹1) |
| #17205 | GAP tee (TSHHB2C6GFZZXEXD) | ₹386 | ₹386, InStock | No change |
| #17078 | Sony WH-CH730N (ACCHSSBFSWJSFNPG) | ₹12,990 | ₹12,990, InStock | No change. The ₹11,950 card was a bank-offer price |

Both reprices used `prisma.deal.update` plus a `priceHistory` row, because a bulk push matches on productId and would rewrite the slug.

## Push

`/admin/deals/bulk` was called once per new item on localhost, which writes to prod through the tunnel. All six returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the right price and the slug that was sent.

| Row | Slug | Affiliate |
|---|---|---|
| #17240 | `fiama-blackcurrant-and-bearberry-shower-gel-700ml-refill-pouch-b0d7q9ph3h` | Amazon `?tag=ashoksachdev-21` |
| #17241 | `premier-2-ply-toilet-tissue-paper-rolls-2560-pulls-b0f4y3cdnj` | Amazon |
| #17242 | `nike-men-quest-5-running-shoes-b0b34l1bjk` | Amazon |
| #17243 | `nike-men-court-vision-low-sneakers-b0frnb1jqb` | Amazon |
| #17244 | `parachute-advansed-rosemary-water-hair-spray-100ml-hsyhhfvhnyssuceq` | Flipkart `affid=djhackraj` |
| #17245 | `baystreet-women-colourblocked-insulator-crop-puffer-jacket-39479266` | Myntra via InRDeals |

Images are from the marketplace CDNs (`m.media-amazon.com`, `rukmini1.flixcart.com`, `assets.myntassets.com`). All six new pages and the repriced #5968 page return 200 on prod (0.13–0.25s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 11 URLs: the 8 slugs (6 new + 2 repriced), plus `/`, `/offers` and `/sitemap.xml`. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.35s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.49s. Slowest: `/blog` (0.49s) | OK |
| DB LIVE vs API total | 16,638 = 16,638 (16,632 at sitemon 11-24p, = +6) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,245 vs 17,244 | OK. The external broadcast cron is on the batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24h` already existed, so this report uses `i` | OK |
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

- **Stale reposts:** 20 rows repriced today, including #9014 and #5968 in this tick.
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH, 4th time), Khaitan Volt (B0H8PBSZMY) and ASUS VA259HGA (B0F9KBZ8W3). DesiDime keeps reposting stale card prices for these.
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 29 of 46 in deal-ingest 11-24h.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215.
- **No buy box:** #7259, #12963, #14154, #13938 and #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick used only the Amazon and Flipkart tabs and did not touch Telegram. It did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
