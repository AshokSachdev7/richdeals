# DESIDIME-INGEST tick — 2026-11-25f

This tick ran at about 10:30–10:52 IST on 11-25 (it finished at 05:22 UTC).

**Result:** 6 new Amazon deals are LIVE (#17384–#17389). The bulk push returned HTTP 201 with count 6, and every row was created (`created:true`), so no slug needed restoring. Two duplicate LIVE rows were price-synced in place: #8525 went from ₹2,499 to ₹2,999 and #1547 from ₹154 to ₹128. IndexNow returned HTTP 200 for 11 URLs. The CEO audit is green.

## Stage 1

`apps/api/scripts/ingest-desidime.mjs` read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each card through `visit.desidime.com`.

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Dropped (junk, grocery or unsupported) | 17 |
| Resolved to a single product | 18 |
| Already in the DB | 4 |
| On the 24-hour reject list | 6 |
| Fresh candidates | 8 |

The 6 cards on the 24-hour reject list were Daikin ACNHMKN3G8BVHGF5, Bosch B0H9T73HJ7, Khaitan B0H8PBSZMY, ASUS B0F9KBZ8W3, a peanut product PLSHDVGHERMKDBSJ, and an HDFC Offers card.

## Pushed (8 fresh → 6 verified)

| Deal | Store | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|
| #17384 ATTRO Prime Linear Deluxe water bottle set of 2, 1.5L | Amazon B0H7B6DP6D | ₹192 | ₹699 | 73% | Logged-in PDP tab: ₹192, in stock with add-to-cart |
| #17385 Halonix 20W 4ft LED batten, warm white, pack of 4 | Amazon B07GM55HM4 | ₹499 | ₹1,396 | 64% | PDP ₹499 with add-to-cart; availability text was empty. The PDP M.R.P. was a per-unit ₹124.75, so the pack M.R.P. from the card was used |
| #17386 Streax Insta Shampoo Hair Colour, Natural Black 1, 200ml | Amazon B0DCW3M92W | ₹174 | ₹349 | 50% | PDP ₹174, in stock with add-to-cart. The PDP M.R.P. was a per-unit ₹87, so the card M.R.P. was used |
| #17387 ATTRO Crunch airtight lunch box with fork and spoon | Amazon B0FD3ZDCWJ | ₹99 | ₹249 | 60% | PDP ₹99 against the card's ₹100 (within ₹1). The PDP price was used |
| #17388 Asian Plastowares Super Seal container set, 500ml to 2.5L | Amazon B07PHNPB3N | ₹182 | ₹310 | 41% | PDP ₹182, in stock with add-to-cart |
| #17389 Eurotex Pixel Heart Controller LED neon sign | Amazon B0HRZ7NXZV | ₹999 | null | none | PDP ₹999, in stock with add-to-cart. The ₹5,999 M.R.P. implied 83% off, so it was nulled and the title carries no "% Off" |

Affiliate links:
- **Amazon:** `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, with DesiDime's `desidime01-21` tag stripped.
- No Myntra card (InRDeals) or other-store card (Cuelinks) passed verification this tick.

Images come from `m.media-amazon.com`. Titles and descriptions were rewritten. The push script checked every ₹ figure and every "N% off" against the row before posting. Its dry run caught two descriptions with per-unit ₹ figures (₹100 per bottle and ₹125 per batten), which were reworded before the push.

## Rejects

| Candidate | Reason |
|---|---|
| adidas B08HJ33SGM | Price drift: card ₹1,407, PDP ₹1,562 |
| Zebronics 19" monitor MONGRZKZUAH6FGUJ (Flipkart) | Price drift: card ₹2,836, live ₹2,984 |

Both were added to `data/dd-rejected.json` (2,301 keys).

## Duplicates

| Row | Product | DB before | PDP | Action |
|---|---|---|---|---|
| #8525 | Kenneth Cole Reaction watch, B09KYFG25V | ₹2,499 / M.R.P. ₹9,499 / 74% | ₹2,999, "Only 2 left", add-to-cart | **Price-synced** to ₹2,999, 68%. The description was rewritten to match (the title has no ₹). A PriceHistory row was added |
| #1547 | Santoor shower gel 500ml, B0CQYG22TN | ₹154 / M.R.P. ₹350 / 56% | ₹128, in stock, add-to-cart | **Price-synced** to ₹128, 63%. The title is now "Santoor Brightening Shower Gel 500ml at ₹128 (63% Off) – Amazon" and the description was rewritten. The legacy slug `66-off-santoor-shower-gel-500ml-119-B0CQYG` was kept to avoid a 404. A PriceHistory row was added |
| #17250 | B0G6DWH1XF | In sync | n/a | None |
| #17205 | TSHHB2C6GFZZXEXD | In sync | n/a | None |

## Push

`POST localhost:4000/admin/deals/bulk` returned **HTTP 201, count 6**, with `created:true` for all 6 rows. The first new deal page and the price-synced #1547 return 200 on prod.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200**, 11 URLs: the 6 new slugs, #8525 and #1547, plus `/`, `/offers` and `/sitemap.xml` |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.34s, `/offers` 0.07s, `/blog` 0.62s, `/sitemap.xml` 0.09s, `/feed.xml` 0.07s, `/api/deals` 0.09s, `/llms.txt` 0.37s | OK |
| DB LIVE vs API total | 16,782 = 16,782 (up 6 from the push) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,389 vs 17,383 | OK. The 6 new rows wait for the external tg-broadcast cron, and the cursor catches up on its own |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-25a` to `e` exist, so this report uses `f` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, on target. CONTENT-SEO runs again at 12:39 and 18:39 IST |

No day exceeds the cap of 4.

## Still open

- **#16177 `priceValidUntil`:** missing. In-sync re-verifies write no PriceHistory row (SCHEMA-AUDIT 11-25, process gap 1).
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver uses the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** #8525 and #1547 were repriced this tick.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590, #1544 and #1547 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377, #17378 and #17389.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards still null their pid at stage 1. The fix belongs in stage 1.
- **Sidebar coverage:** 10 of 13 TG groups loaded in TG 11-25k. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were missing.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
