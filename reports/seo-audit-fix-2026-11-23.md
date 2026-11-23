# SEO-AUDIT-FIX daily tick — 2026-11-23

`apps/api/_seo1123.cjs` audited 51 production pages on richdeals.in across 5 page types and checked the crawl surfaces (sitemap, robots, llms). It is an unchanged copy of `_seo1120.cjs`. The tick also re-read the four GSC top deal pages on their merchant product pages, because their `priceValidUntil` was due to lapse on 11-26. Run at about 21:10–21:20 IST on 11-23.

There were no SEO-AUDIT-FIX ticks on 11-21 or 11-22 (no session was running).

**Result: 0 on-page defects. No code changed, so nothing was built or deployed. All four GSC top rows were price-checked on their product pages. Two were repriced and all four got a new price-history row, which moves `priceValidUntil` to 12-07. IndexNow returned HTTP 200 for 7 URLs. All 59 LIVE GSC-proven pins are in the top-100 index set, and the CEO audit is green.**

## GSC top rows (PRIORITY from SCHEMA-AUDIT 11-23)

The price was read on each merchant product page: Amazon in the logged-in tab (`.a-price-whole` in `#corePriceDisplay`, M.R.P. from `#centerCol`, `#availability` plus add-to-cart), and Flipkart through a same-origin fetch of the product page with its `ld+json` parsed.

| Deal | Store | DB price | Product page | Action |
|---|---|---|---|---|
| #2321 S2M handmade soap combo (B0D7MQ2KJS) | Amazon | ₹289 | ₹289, M.R.P. ₹340, in stock | Match; price-history row added |
| #3492 Aadhik gas saver stand (B0CYBW6X6P) | Amazon | ₹223 | ₹216, M.R.P. ₹999, in stock | Repriced to ₹216 (78% off), title updated, history row added |
| #3506 Amazon Basics phone stand (B0H2W6PNB2) | Amazon | ₹249 | ₹249, M.R.P. ₹999, in stock | Match; price-history row added |
| #4188 Bluemix Smart Plus mixer grinder (MIXHZQFZZH6FZMTE) | Flipkart | ₹1,699 | ₹1,697, M.R.P. ₹4,299, InStock | Repriced to ₹1,697 (61% off), title updated, history row added |

The soap page also shows "₹57.80", which is a per-100 g rate and not the M.R.P. The DB M.R.P. of ₹340 is correct.

`dealPriceCheck` dates the 14-day `priceValidUntil` window from the newest price-history row. These four pages therefore carry `priceValidUntil` 2026-12-07 again instead of dropping it on 11-26.

## Page audit

| Type | Pages | Defects |
|---|---|---|
| Hubs | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals (top by clicks, plus the newest) | 12 | 0 |
| Blog posts (newest) | 7 | 0 |
| **Total** | **51** | **0** |

**What each page was checked for:**
- title of 20–65 characters
- meta description of 70–165 characters
- self-referencing canonical
- exactly one H1
- og:image
- expected JSON-LD types
- `/out/` links marked `rel="sponsored nofollow"`
- alt text on every image
- no duplicate titles or descriptions across the set
- noindex only where intended

**Noindex by design (not defects):**
- **Stores with 0 LIVE deals:** `/stores/pedigree`, `/stores/ajio`, `/stores/cred`.
- **Below the value bar** in `topIndexable()`: `the-man-company-perfume-gift-set-timeless-fragrances-200-ml-pergvy`.
- **Newest deals outside the top 100**, which serve `noindex,follow` per the 2026-10-16 directive:
  - both Sony headphones (#17078, #17079)
  - Beardo SPF 60
  - both EVM 256GB SSDs
  - Nova NHS-840

## Top-100 index set

| Check | Value |
|---|---|
| GSC-proven slugs in `gsc-proven.ts` | 71 |
| Of those, LIVE with a price and an image | 59 |
| LIVE pins in the top 100 | **59 of 59** (same as 11-20) |

## Crawl surfaces

| Surface | 11-20 | 11-23 | Status |
|---|---|---|---|
| `sitemap.xml` URLs | 652 | 653 | OK, 0 duplicates; index lists the pages, deals and blog children |
| Blog child URLs | 483 | 484 | OK. The script's `newestPostIn false` is its known artifact: a curl of the blog child finds all 3 newest posts (induction vs LPG, RO vs UV vs UF, filterless vs baffle chimney) |
| `robots.txt` | 16 UA blocks, Sitemap line, GPTBot allowed | same | OK |
| `/llms.txt` | 200, 17,511 bytes | 200, 17,499 bytes | OK |
| `/llms-full.txt` | 200, 38,741 bytes | 200, 38,750 bytes | OK |

## Post sweep

| Check | Result |
|---|---|
| Posts swept | 505 |
| Headline over 110 characters | 0 |
| seoTitle missing or over 60 characters | 0 |
| seoDesc outside 150–160 characters | 0 |
| Coverless | 0 |
| Empty markdown image alt (`![](…)`) | 0 |
| Duplicate seoTitle | 1 pair (#340 = #300). Not a defect: #340 308-redirects to #300 |
| Internal links in post bodies | 1,768 unique targets, 3,425 references, **0 dead** |

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 7 URLs (4 GSC slugs + 3 hubs) |
| sitemap.xml | ISR `revalidate = 1800`; no new static route was added |
| llms.txt | `force-dynamic`; no new hub was added |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at about 21:20 IST | OK |
| DB LIVE vs API total | 16,472 = 16,472 (16,929 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,079 vs 17,058 | OK; the external cron has moved from 17,048 since SCHEMA-AUDIT |
| Posts per day (IST) | 11-17 to 11-20: 3 each; **11-21: 0, 11-22: 0 (missed)**; 11-23: 2 | Flag for the past days; today is within the rule |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `seo-audit-fix-2026-11-23*` existed | OK |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil` because they have not been re-checked in 14 days. The field is recommended, not required.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s, no buy box, low stock, drift retries, ASIN reuse and Flipkart gaps:** unchanged from `tg-monitor-2026-11-23a.md`.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json`; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
