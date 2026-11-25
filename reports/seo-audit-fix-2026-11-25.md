# SEO-AUDIT-FIX daily tick — 2026-11-25

`apps/api/_seo1125.cjs` audited 51 production pages on richdeals.in across 5 page types and checked the crawl surfaces (sitemap, robots, llms). It is an unchanged copy of `_seo1124.cjs`. `_seo1120pins.cjs` re-checked the GSC-proven pins against the top-100 index set. Run at about 05:58–06:05 IST on 11-25.

**Result: 0 on-page defects. No code changed, so nothing was built, deployed or pinged (no URL changed). All 59 LIVE GSC-proven pins are in the top-100 index set, and the CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Page audit

| Page type | Pages | Defects |
|---|---|---|
| Hubs | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals (6 top by clicks + 6 newest) | 12 | 0 |
| Blog posts (7 newest) | 7 | 0 |
| **Total** | **51** | **0** |

Checks per page: title 20–65 characters, description 70–165, self-referencing canonical, exactly one H1, og:image, the expected JSON-LD types (deal: Product, BreadcrumbList, FAQPage; post: Article, BreadcrumbList), `rel="sponsored nofollow"` on every `/out/` link, alt on every image, no duplicate titles or descriptions across the set, and noindex only where intended.

Noindex by design (not defects):
- **Stores with 0 LIVE deals:** `/stores/pedigree`, `/stores/ajio`, `/stores/cred`.
- **Below the value bar** in `topIndexable()`: `the-man-company-perfume-gift-set-timeless-fragrances-200-ml-pergvy`.
- **Newest deals outside the top 100**, which serve `noindex,follow` per the 2026-10-16 directive: the EvolvIOT switch module (#17378), Lokza doorbell (#17377), FUJIFILM Instax Mini 13 (#17376), FUJIFILM Instax Mini 41 (#17375), gym wrist band (B0H6C71JY4) and TNW Moon Kiss liquid blush (B0FTSDTTH9) pages.

## Top-100 index set

| Check | Value |
|---|---|
| GSC-proven slugs in `gsc-proven.ts` | 71 |
| Of those, LIVE | 59 |
| LIVE pins inside the top-100 set | 59 / 59, none missing |

## Crawl surfaces

| Surface | 11-25 | 11-24 |
|---|---|---|
| `sitemap.xml` (all children) | 655 URLs, 0 duplicates | 655 |
| Blog child | 486 URLs, newest post present | 486 |
| `robots.txt` | 16 user-agent blocks, Sitemap line present, GPTBot allowed | same |
| `/llms.txt` | 200, 17,668 bytes | 17,524 |
| `/llms-full.txt` | 200, 38,750 bytes | 38,750 |

The sitemap count is flat even though 2 posts were published since the 11-24 run. The blog child is ISR (`revalidate = 1800`), and the newest-post check passed, so the flat total is within the cache window, not a missing URL. `/llms.txt` grew by 144 bytes from the new deals and posts.

## Post sweep

| Check | Result |
|---|---|
| Posts swept | 508 |
| Headline over 110 / seoTitle over 60 / seoDesc outside 150–160 | 0 / 0 / 0 |
| No cover / empty in-body alt | 0 / 0 |
| Duplicate seoTitle | #340 = #300. Not a defect: #340 308-redirects to #300 |
| Internal links | 1,789 distinct targets (3,460 references), 0 dead |

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No page changed this tick |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.56s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,771 = 16,771 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,378 = 17,378 | OK |
| Posts / coverless / seo-less | 508 / 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | No `seo-audit-fix-2026-11-25*` existed | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

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
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25f).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
