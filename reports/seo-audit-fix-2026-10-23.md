# SEO-AUDIT-FIX — 2026-10-23 (05:58–06:03 IST)

**51 prod URLs audited, all clean. One real rule gap fixed: 4 telecom posts had no deal or `/offers` link. They are now linked, the fix is live on prod, and IndexNow returned HTTP 200 for 6 URLs. This was a DB-only content fix, so nothing was deployed. No rot.**

The audit ran `apps/api/_seo1020.cjs` against the DO ingress (`richdeals-jw726.ondigitalocean.app`). It then swept all 424 posts in the DB for seoTitle 25–60, seoDesc 120–165, duplicate titles, empty alt text, and a deal or `/offers` link.

## Audit

| Type | URLs | Title | Desc | h1 | Robots | JSON-LD |
|---|---|---|---|---|---|---|
| Hubs | 12 | ok | ok | 1 each | index | parses |
| Stores | 8 | ok | ok | 1 each | 5 index, 3 noindex (deliberate) | parses |
| Categories | 12 | ok | ok | 1 each | index | parses |
| Deals (6 by clicks, 6 newest) | 12 | ok | ok | 1 each | per `dealIndexable()` | Product + BreadcrumbList + FAQPage |
| Posts (7 newest) | 7 | ok | ok | 1 each | index | parses |

Across all 51 URLs:
- Every URL returned 200 with a self-canonical and an og:image.
- No titles or descriptions are duplicated.
- Every `/out/` link carries `rel="sponsored nofollow"`.

Site-wide checks:
- **robots.txt:** 16 UA lines, including GPTBot. It has a Sitemap line.
- **llms files:** `/llms.txt` returns 200 (16,850 B) and `/llms-full.txt` returns 200 (41,925 B).
- **Sitemap children:** pages 56, deals 100, blog 407. The newest post, `glass-vs-steel-lunch-box-which-to-buy-india`, is present.
- **Internal links:** the 20 newest posts hold 149 internal links, and none are dead.
- **504 burst on the first run:** posts, sitemap, robots, llms and some internal links returned 504. A prod check right after returned 200 on both hosts in 0.1–0.7 s, and the re-run was clean. This was a transient ingress problem, not a site defect.
- **Script bug:** `_seo1020.cjs` prints "sitemap 33 blog 0". Its counter is wrong; the counts above were taken from each child sitemap directly.

## Fixes shipped

| Post | Before | After |
|---|---|---|
| #360 `vi-number-check-code-india-2026` | links to `/blog` only | + `[price-checked offers page](/offers)` |
| #361 `how-to-know-my-jio-number-india-2026` | links to `/blog` only | + `[latest verified offers](/offers)` |
| #362 `airtel-balance-check-number-india-2026` | links to `/blog` only | + `[verified offers page](/offers)` |
| #363 `how-to-port-your-number-to-jio-india-2026` | links to `/blog` only | + `[live offers page](/offers)` |

- **How:** a single sentence was inserted before `## FAQ` in each post via `prisma.post.update`.
- **Copy:** the 4 sentences are different, and none contains a fabricated fact.
- **Why:** the hard rule requires at least 1 real link to a live deal page or `/offers`.
- **Prod check:** all 4 posts show the new link on prod after the 300 s ISR window.

## Left as is (deliberate)

- **Croma duplicate seoTitle (#340 and #300):** #340 is in `post-redirects.json` and redirects to #300, so the duplicate never renders.
- **17 posts missing from the sitemap:** all 17 are `POST_REDIRECTS` sources (ids 2, 3, 4, 5, 29, 98, 116, 118, 175, 211, 212, 244, 247, 308, 332, 339, 340). They are expected to be absent.
- **"No deal link" false positives:**
  - `amazon-pay-later-vs-credit-card-india-2026` and `amazon-prime-day-india-2026-guide` link to deals with absolute `https://richdeals.in/<deal>` URLs.
  - `amazon-great-indian-festival-vs-flipkart-bbd` is a redirect source.
- **Store noindex (pedigree, ajio, cred):** these stores have 0 live deals and no store SEO copy, so noindex,follow is intended. It matches the sitemap filter.
- **Deal noindex:** only the top 100 deals by clicks are indexable, per the owner's 10-16 decision.
- **`/freebies` and `/coupons` titles:** 61–63 characters, kept as they are.

## Deploy + freshness

- **Deploy:** none. There was no code change, the content fix lives in the DB and ISR picked it up. The active deployment is still `38d7a35c`.
- **IndexNow:** HTTP 200 for 6 URLs: the 4 `/blog/<slug>` paths, `/blog` and `/sitemap.xml`.
- **Sitemap and `llms.txt`:** the post slugs are unchanged, so neither needs updating.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-23):** 1. This is not rot: the next CONTENT-SEO run is at 06:39 IST. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,737 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14267.
- **Broadcast cursor:** 14267, equal to the highest deal ID.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
