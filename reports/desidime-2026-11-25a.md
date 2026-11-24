# DESIDIME-INGEST tick — 2026-11-25a

This tick ran at about 00:40–01:00 IST on 11-25 (19:10–19:30 UTC on 11-24). It was run inline per `.claude/agents/desidime-ingest.md`.

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then verified on the product page in the logged-in Playwright Amazon tab. Non-Amazon candidates were verified with `productLd()` (ld+json price within ₹1, InStock).

**Result:**

- **5 deals were pushed LIVE** (#17346–#17350). Each returned HTTP 201 with `count: 1` and `created: true`.
- **4 Amazon candidates were rejected:** 3 for price drift and 1 low-ticket OTC item.
- **2 duplicates were re-checked.** Both prices are unchanged, so no reprice was needed.
- **IndexNow returned HTTP 200** for 8 URLs.
- **The CEO audit is green.**

## Stage 1

| Step | Count |
|---|---|
| Fresh candidates after the filters, the DB dedup and the 24-hour reject list | 9 |
| Verified and pushed | 5 |
| Rejected in verification (Amazon) | 4 |
| Duplicates of LIVE rows (price sync) | 2 |

## Fresh candidates

| ID | Store | Product | Card price | Live read | Decision |
|---|---|---|---|---|---|
| HSAHSNHJAMHDCG6H | Flipkart | DENVY bulb-holder indoor security camera with audio and video recording | ₹1,910 | ₹1,910, M.R.P. ₹5,999, in stock | **Pushed** #17346 |
| 45268342 | Myntra | Cut notched-lapel single-breasted overcoat | ₹2,024 | ₹2,024, M.R.P. ₹6,799, in stock | **Pushed** #17347 |
| 44958403 | Myntra | Troo blue single-breasted notched-lapel overcoat | ₹1,934 | ₹1,934, M.R.P. ₹6,699, in stock | **Pushed** #17348 |
| 14231020 | Myntra | All About You women's black longline overcoat with faux-fur detail | ₹2,209 | ₹2,209, M.R.P. ₹6,499, in stock | **Pushed** #17349 |
| 33357095 | Myntra | DressBerry notched-lapel flannel overcoat | ₹1,859 | ₹1,859, M.R.P. ₹5,999, in stock | **Pushed** #17350 |
| B0DHHB2YS7 | Amazon | Samsung Galaxy Tab S10+ | ₹77,874 | ₹79,999 | **Rejected:** drift |
| B0DD8SHVZL | Amazon | Sony MDR-M1 headphones | ₹14,739 | ₹15,989 | **Rejected:** drift |
| B0C45D5C8Q | Amazon | CUPEISI tablet | ₹9,714 | ₹10,432 | **Rejected:** drift. The ₹37,545 M.R.P. also looks inflated |
| B0868XBJN7 | Amazon | Dabur Tulsi Drops | ₹76 | ₹76 | **Rejected:** low-ticket OTC/FMCG, in the spirit of the GROCERY filter |

All 4 Amazon rejects were added to `data/dd-rejected.json` with `Date.now()` (now 2,276 keys).

## Duplicates (price sync)

| Row | Product | Card | DB | Decision |
|---|---|---|---|---|
| #17330 | Razer Goliathus Mobile Stealth mouse pad | ₹499 | ₹499 | Unchanged. Re-read live at ₹499, M.R.P. ₹849, in stock |
| #17205 | GAP | ₹386 | ₹386 | Unchanged. The card matches the DB; the Flipkart product page was not re-read |

## Push

Each row was pushed to `POST /admin/deals/bulk` on the local API (`localhost:4000`), which writes to the prod DB through the tunnel. Each row was checked for duplicates by productId and affiliate URL with Prisma before the push. Status is `live`. Images come from the marketplace CDNs (`rukmini1.flixcart.com`, `assets.myntassets.com`). The word "secret" was dropped from the DENVY title.

| ID | Slug | Affiliate |
|---|---|---|
| #17346 | `denvy-bulb-holder-indoor-security-camera-with-audio-and-video-recording-hsahsnhjamhdcg6h` | Flipkart `/p/itm…?pid=HSAHSNHJAMHDCG6H&affid=djhackraj` (only `pid` and `affid`, confirmed) |
| #17347 | `cut-notched-lapel-single-breasted-overcoat-45268342` | InRDeals |
| #17348 | `troo-blue-single-breasted-notched-lapel-overcoat-44958403` | InRDeals |
| #17349 | `all-about-you-women-s-black-longline-overcoat-with-faux-fur-detail-14231020` | InRDeals |
| #17350 | `dressberry-notched-lapel-flannel-overcoat-33357095` | InRDeals |

All 5 pages return 200 on prod (0.13–0.18s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 8 URLs: the 5 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.38s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.14s, `/offers` 0.10s, `/blog` 0.59s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.09s, `/llms.txt` 0.38s, all 200 | OK |
| DB LIVE vs API total | 16,743 = 16,743 (up 5 from 16,738) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,350 vs 17,345 | OK. The 5 new rows wait for the next external broadcast run |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | No `desidime-2026-11-25*` existed, so this report uses `a` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (closed, meets the 2–3 target) |
| 11-25 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 34 rows repriced in the last 24 hours.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. #17334 has a null M.R.P.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25a).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
