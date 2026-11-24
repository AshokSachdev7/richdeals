# SEO-AUDIT-FIX daily tick — 2026-11-24

`apps/api/_seo1124.cjs` audited 51 production pages on richdeals.in across 5 page types and checked the crawl surfaces (sitemap, robots, llms). It is an unchanged copy of `_seo1123.cjs`. `_seo1120pins.cjs` re-checked the GSC-proven pins against the top-100 index set. Run at about 05:58–06:05 IST on 11-24.

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
- **Newest deals outside the top 100**, which serve `noindex,follow` per the 2026-10-16 directive: the RGB headphone stand, rose bath soap, baby walker (#17127), toilet paper, Colgate Visible White and OceanEvo tumbler pages.

## Top-100 index set

| Check | Value |
|---|---|
| GSC-proven slugs in `gsc-proven.ts` | 71 |
| Of those, LIVE | 59 |
| LIVE pins inside the top-100 set | 59 / 59, none missing |

## Crawl surfaces

| Surface | 11-24 | 11-23 |
|---|---|---|
| `sitemap.xml` (all children) | 655 URLs, 0 duplicates | 653 |
| Blog child | 486 URLs, newest post present | 484 |
| `robots.txt` | 16 user-agent blocks, Sitemap line present, GPTBot allowed | same |
| `/llms.txt` | 200, 17,524 bytes | 17,499 |
| `/llms-full.txt` | 200, 38,750 bytes | 38,750 |

The +2 sitemap and blog URLs are the two posts published since the 11-23 run.

## Post sweep

| Check | Result |
|---|---|
| Posts swept | 506 |
| Headline over 110 / seoTitle over 60 / seoDesc outside 150–160 | 0 / 0 / 0 |
| No cover / empty in-body alt | 0 / 0 |
| Duplicate seoTitle | #340 = #300. Not a defect: #340 308-redirects to #300 |
| Internal links | 1,779 distinct targets (3,438 references), 0 dead |

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No page changed this tick |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.61s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | No `seo-audit-fix-2026-11-24*` existed | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
