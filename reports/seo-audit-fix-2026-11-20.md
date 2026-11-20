# SEO-AUDIT-FIX daily tick — 2026-11-20

`apps/api/_seo1120.cjs` audited 51 prod pages on richdeals.in across 5 page types. It is a copy of `_seo1119.cjs` with the base URL changed from the deleted DO app to `https://richdeals.in`. It also checked the crawl surfaces (sitemap, robots, llms) and swept every post. Run at about 05:58–06:05 IST on 11-20.

**Result: 0 defects. Nothing was changed, built or deployed, so no IndexNow ping was needed. All 59 LIVE GSC-proven pins are in the top-100 index set. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

Two notes on the cron prompt:
- **Script base URL.** `_seo1119.cjs` pointed at `richdeals-jw726.ondigitalocean.app`, which has been deleted. The new copy, `_seo1120.cjs`, points at `https://richdeals.in`.
- **Deploy step.** The prompt still says `doctl apps create-deployment`, but that app has been deleted. Prod has been the GCP VM since 11-19. Deploy with `git push origin master`, then `ssh … root@34.14.145.203 'bash /opt/richdeals-deploy.sh'`. No deploy was needed this tick.

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
- **Stores with 0 LIVE deals** (DB re-check: 0, 0, 0): `/stores/pedigree`, `/stores/ajio`, `/stores/cred`. These serve `noindex, follow`.
- **Below the value bar** in `topIndexable()`: `the-man-company-perfume-gift-set-timeless-fragrances-200-ml-pergvy`.
- **Newest deals outside the top 100**, which serve `noindex,follow` per the 2026-10-16 directive:
  - `rahul-look-men-s-solid-casual-grey-shirt-xsrh4ftgja6kggzd`
  - `colors-queen-affair-semi-matte-nail-polish-set-of-3-25373988`
  - `axe-sport-blast-3-in-1-face-hair-and-body-wash-400ml-20486210`
  - `popwings-women-s-printed-top-and-joggers-co-ord-set-b0c9cm3n2j`
  - `bajaj-swx-6-800w-2-slice-sandwich-griller-b0db8p9pss`
  - `wonderchef-bullet-nutri-blend-500w-mixer-with-2-jars-b0gtmdjgfv`

## Top-100 index set

| Check | Value |
|---|---|
| `/api/deals/top-indexable` size | 100 |
| GSC-proven slugs in `gsc-proven.ts` | 71 |
| Of those, LIVE with a price and an image | 59 |
| LIVE pins in the top 100 | **59 of 59** (same as 11-19) |

The other 12 pins are EXPIRED or not LIVE, so they are left out by design.

## Crawl surfaces

| Surface | 11-19 | 11-20 | Status |
|---|---|---|---|
| `sitemap.xml` URLs | 647 | 652 | OK, 0 duplicates |
| Blog child URLs | 480 | 483 | OK, newest post is in it |
| `robots.txt` | 16 UA blocks, Sitemap line, GPTBot allowed | same | OK |
| `/llms.txt` | 200 | 200, 17,511 bytes | OK |
| `/llms-full.txt` | 200 | 200, 38,741 bytes | OK |

## Post sweep

| Check | Result |
|---|---|
| Posts | 501 |
| Headline over 110 characters | 0 |
| seoTitle missing or over 60 characters | 0 |
| seoDesc outside 150–160 characters | 0 |
| Coverless | 0 |
| Empty markdown image alt (`![](…)`) | 0 |
| Duplicate seoTitle | 1 pair (#340 = #300). Not a defect: #340 308-redirects to #300 |

## Internal links

The script resolved every internal link in every post body. It found 1,735 unique targets and 3,380 references, and **0 were dead**. On 11-19 the counts were 1,702 targets and 3,344 references.

## Freshness

No URL changed, so IndexNow was not called. `sitemap.xml` (ISR 1800s) and `llms.txt` (`force-dynamic`) both returned 200. No static route was added.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.16s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.55s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.41s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `seo-audit-fix-2026-11-20*` existed, so no suffix | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day is about 6 hours old, and the next CONTENT-SEO tick runs at 06:39 IST.

## Working tree

Only this report is staged. The scratch scripts (`apps/api/_seo1120.cjs`, `_seo1120pins.cjs`) and the files that were already dirty are left unstaged.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

#11896 and #14635 were re-priced at DEAL-INGEST 20c, so they are off the list.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 06:04 |
| SITEMON | 11-20 06:14 |
| CONTENT-SEO | 11-20 06:39 |
| DESIDIME | 11-20 06:43 |
| DEAL-INGEST | 11-20 06:53 |
| INDEXNOW | 11-20 07:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
