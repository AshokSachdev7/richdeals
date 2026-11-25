# CONTENT-SEO tick — 2026-11-25b

This tick ran at about 06:39–07:00 IST on 11-25.

**Result:** 1 new TOFU post is published, with its cover generated and IndexNow pinged (HTTP 200). That brings 11-25 to 2 posts, which is inside the 2–3 target. The CEO audit is green: all 7 prod endpoints return 200 and there is nothing to fix.

## Post

| Field | Value |
|---|---|
| URL | https://richdeals.in/blog/how-to-remove-pilling-from-sweaters-lint-remover-guide-india (200) |
| DB id | 640 |
| Funnel | TOFU. The previous post was BOFU, so this one rotates the funnel |
| Words | 1,575 (inside the 900–1,600 band) |
| seoTitle | "How to Remove Pilling from Sweaters: Lint Remover Guide" (55 characters) |
| seoDesc | "Sweater covered in bobbles? Learn which pill removal methods work, corded vs rechargeable lint removers, step-by-step use and how to stop woollens pilling." (155 characters) |
| Cover | `/media/og/how-to-remove-pilling-from-sweaters-lint-remover-guide-india.png` (200). Alt text is the post title |
| In-body images | None |
| IndexNow | HTTP 200, sent by `insert-blog-mdmeta.mjs` |
| Source files | `apps/api/_blog1125/how-to-remove-pilling-from-sweaters-lint-remover-guide-india.{md,meta.json}` (untracked, like earlier blog folders) |

The post follows the GEO playbook:
- It opens with an answer-first paragraph.
- It has a 9-row methods table and a corded vs rechargeable table.
- It has an 8-step how-to, a 10-item prevention checklist and a 5-question FAQ.

A first draft came in at 1,604 words. One FAQ item was cut before insert to get under the 1,600 cap.

The rendered page carries the correct `<title>` and 12 JSON-LD blocks.

### Keyword research

- **Topic choice:** this is seasonal winter-care intent in late November. It is outside the saturated best-X-under-Y and free-samples clusters, and no near-duplicate slug exists.
- **SERP read:** the top results are Tom's Guide, Gentleman's Gazette and Bob Vila. All three are US-centric. None covers corded vs rechargeable shavers, Indian price bands or acrylic shawls and school sweaters. That gap is the angle of this post.
- **Methods scores:** the 1–10 scores in the methods table come from Gentleman's Gazette's own test, and the post credits them in the text.
- **Fetch failures:** the Tom's Guide page returned only navigation, with no body text. The Bob Vila page returned HTTP 410. The search snippets and the Gentleman's Gazette page were enough to cover what those pages say.
- **Our deal cluster:** 5 LIVE lint deals were found. The two lint removers are linked in the post. The three lint rollers (#15957, #15956, #15109) are left out, because the post explains that a roller cannot remove pills.

### Internal links (all 200 on prod)

| Type | Link |
|---|---|
| Deal | `/agaro-elite-corded-lint-remover-b0gxpd559w` (#17321, ₹399, M.R.P. ₹699) |
| Deal | `/lifelong-rechargeable-lint-remover-for-clothes-with-led-display-fabric-shaver-fo-B0DR93` (#2649, ₹775, M.R.P. ₹2,499) |
| Post | `/blog/sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india` |
| Post | `/blog/thermal-wear-cotton-vs-wool-vs-fleece-which-to-buy-india` |
| Post | `/blog/mink-vs-sherpa-vs-fleece-vs-microfibre-blanket-which-is-warmest-india` |
| Hub | `/offers` |

Deal prices are stated as "at the time of writing", and the post tells readers to check the deal page for the current price.

## Prod endpoints

| URL | HTTP | Time |
|---|---|---|
| `/` | 200 | 0.22s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.49s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.09s |
| `/api/deals` | 200 | 0.11s |
| `/llms.txt` | 200 | 0.31s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE | 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 = 17,378 | OK |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK. This is up 1 from 508, the new post |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | Only `content-seo-2026-11-25a` existed, so this report uses `b` | OK |
| Deploy | None. Content only, no code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, which is on target. CONTENT-SEO runs again at 12:39 and 18:39 IST, with room for 1 more before the cap of 4 |

## Still open

- **#16177 `priceValidUntil`:** missing. In-sync re-verifies write no PriceHistory row (SCHEMA-AUDIT 11-25, process gap 1).
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 15 rows repriced between INDEXNOW 11-24d and 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25g).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
