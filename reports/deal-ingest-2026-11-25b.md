# DEAL-INGEST indiafreestuff tick — 2026-11-25b

This tick ran at about 02:50–03:05 IST on 11-25 (21:20–21:35 UTC on 11-24). It was run inline per `.claude/agents/deal-ingest.md` and CLAUDE.md.

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids to store URLs. Candidates were deduped by `productId` against the live DB and against the 24-hour reject list. The two fresh Amazon candidates were read on the product page with a same-origin `fetch()` from the logged-in Amazon tab, parsed with DOMParser (`.a-price-whole` in `#corePriceDisplay`, `#availability`, add-to-cart). No tab was navigated, and the other driver's tabs were not touched.

**Result:**

- **0 deals were pushed.** Both fresh candidates failed verification.
- **55 duplicates were checked.** All 55 are LIVE and within ₹1 of the card price, so nothing was repriced.
- **IndexNow was not run,** because there were no new or repriced slugs.
- **The CEO audit is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 85 |
| Dropped (sale hubs, category pages, unresolved Flipkart cards) | 7 |
| Resolved to a single product | 78 |
| Already in the DB (duplicates, price sync) | 55 |
| On the 24-hour reject list | 21 |
| Fresh candidates | 2 |
| Verified and pushed | 0 |
| Rejected in verification | 2 |

## Drops

- Noise Buds Mini X and Acer Aspire One: Flipkart `/indiafreestuff/p/` cards that stage 1 cannot resolve to a pid (the known Flipkart-drop issue).
- Flipkart Black Friday sale hub, women's innerwear "min 70% off", Network & Netplay blazers "min 70% off", GAP clothing "min 70% off": category or sale pages, not single products.
- "Try it First" samples from ₹1: not a product.

## Rejected and skipped

| ASIN | Product | Card | Product page | Decision |
|---|---|---|---|---|
| B0B9JTHGSG | ANTINA Indigo freestyle skipping rope, red | ₹49 "(Min Buy 2)", M.R.P. ₹499 | ₹49, "Only 1 left in stock", add-to-cart present | **Rejected:** the card's price needs a 2-unit minimum but only 1 unit is in stock, so the deal cannot be bought as posted. The ₹499 M.R.P. would also be an inflated 90% off |
| B07BMWTY61 | Yuvika Ber Pathar, 400 g | ₹359, M.R.P. ₹2,899 | ₹2,053, in stock (the ₹513.25 M.R.P. read is a per-unit rate) | **Rejected:** price drift |

Both were added to `data/dd-rejected.json` with `Date.now()` (now 2,288 keys).

The 21 candidates already on the 24-hour reject list were skipped without a re-read: SYDLHDMI set-top box, Timex Fria, Sanfe, three Spykar items, KBS key cover, a foot patch, Pink Root, Grazia ladder, SJCAM SJ6, a dog shampoo, Underjeans, a Zebronics mouse pad, a Maa Silver Ganesha, Alketron AIO, HP 15, OPPO A6c, Eureka Forbes AP175, a Goldmedal MCB and a Sanmarino pooja mat.

## Duplicates (price sync)

All 55 duplicates are LIVE rows whose stored price matches the card within ₹1: every row from 11-25a (#17351–#17374), #17348 and #17349 (Myntra), #17331–#17336, #17314–#17319, #17281–#17294, and #4112, #5848 and #16917.

Two were exactly ₹1 apart, inside the tolerance, so they were left alone: B0DQV4Z4TM (card ₹1,751, DB ₹1,750, #17355) and B0G3HFY8GG (card ₹122, DB ₹121, #17360).

## Push

None. No bulk call was made.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **Not run.** No new or repriced slugs this tick |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.44s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.18s, `/offers` 0.10s, `/blog` 0.57s, `/sitemap.xml` 0.05s, `/feed.xml` 0.07s, `/api/deals` 0.08s, `/llms.txt` 0.44s, all 200 | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 vs 17,378 | OK. The external broadcast has sent DESIDIME 11-25b's 4 rows |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-25a` exists, so this report uses `b` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 15 rows repriced between INDEXNOW 11-24d and 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards (Noise Buds Mini X and Acer Aspire One this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25c).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
