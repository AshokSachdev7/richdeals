# SEO-AUDIT-FIX — 2026-10-24 (05:55–06:05 IST)

**51 prod URLs audited, all clean. One real rule gap fixed: 3 posts had no link to a deal page or `/offers`. They are now linked, the fix is live on prod, and IndexNow returned HTTP 200 for 5 URLs. This was a DB-only content fix, so nothing was deployed. No rot.**

## Audit (prod, `richdeals-jw726.ondigitalocean.app`)

| Type | URLs | Title | Desc | h1 | Robots | JSON-LD |
|---|---|---|---|---|---|---|
| Hubs | 12 | ok | ok | 1 each | index | ok |
| Stores | 8 | ok | ok | 1 each | 5 index, 3 noindex (deliberate) | ok |
| Categories | 12 | ok | ok | 1 each | index | ok |
| Deals (6 by clicks + 6 newest) | 12 | ok | ok | 1 each | top-100 rule (newest 6 noindex,follow) | Product, BreadcrumbList, FAQPage on all |
| Posts | 7 | ok | ok | 1 each | index | Article, BreadcrumbList on all |

Checks on every URL: title length 20–65, description 70–165, self-canonical, a single h1, og:image, every `/out/` link carries `rel="sponsored nofollow"`, every img has alt, and no duplicate title or description. No URL failed any check.

## Post sweep (all 427 posts, DB)

- **seoTitle and seoDesc:** all 427 are in range (seoTitle 25–60, seoDesc 120–165).
- **Covers:** 0 posts have no cover.
- **Image alt text:** 0 in-body images have an empty `![](...)` alt.
- **Duplicate seoTitle:** only #300 and #340 (Croma). This is deliberate; see below.
- **No deal or `/offers` link:** 6 posts were flagged:
  - #2, #4 and #116 are redirect sources, so they were skipped.
  - #6, #119 and #120 were real gaps. They are fixed below.

## Site-wide

- **robots.txt:** 16 UA lines, including GPTBot. It has a Sitemap line.
- **llms files:** `/llms.txt` returns 200 (16,980 B) and `/llms-full.txt` returns 200 (42,051 B).
- **Sitemap:**
  - The index has 3 children, all returning 200, with 573 URLs and 0 duplicates.
  - Blog has 410 URLs. That is 427 posts minus the 17 redirect sources.
  - The newest post, `how-to-measure-laptop-size-for-sleeve-bag-backpack-india`, is present.
- **Internal links:** 152 unique links across the 20 newest posts, 0 dead.
- **Script bug, unchanged:** `_seo1020.cjs` prints "sitemap 38 blog 0", so its counter is still wrong. The counts above were taken from each child sitemap directly.

## Fixes shipped

| Post | Before | After |
|---|---|---|
| #6 `best-smartphone-deals-india-2026` | links to `/coupons`, `/freebies`, `/stores` and a blog post only | + `[price-checked offers page](/offers)` |
| #119 `best-trimmers-for-men-under-1500-india-2026` | links to a category, `/stores/amazon`, `/coupons` and a blog post only | + `[latest verified offers](/offers)` |
| #120 `is-it-safe-to-buy-deals-online-india-2026` | links to `/coupons`, `/` and blog posts only | + `[verified offers page](/offers)` |

- **How:** a single sentence was inserted before the FAQ heading in each post via `prisma.post.update`.
- **Copy:** the 3 sentences are different. Each describes only the existing price-check flow, with no fabricated fact.
- **Why:** the hard rule requires at least 1 real link to a live deal page or `/offers`. Hub links such as `/coupons` and `/stores` do not count.
- **Prod check:** each sentence was found on its prod post.
- **Why 10-23 missed these:** its detector also counted hub links. Today's sweep counts only `/offers` and deal slugs.

## Left as is (deliberate)

- **Croma duplicate seoTitle (#340 and #300):** #340 redirects to #300, so the duplicate never renders.
- **17 posts missing from the sitemap:** all 17 are `POST_REDIRECTS` sources (ids 2, 3, 4, 5, 29, 98, 116, 118, 175, 211, 212, 244, 247, 308, 332, 339, 340).
- **Store noindex (pedigree, ajio, cred):** these stores have 0 live deals, so noindex,follow is intended.
- **Deal noindex:** only the top 100 deals by clicks are indexable (owner directive 10-16).
- **`/freebies` and `/coupons` titles:** 61–63 characters, kept as they are.

## Deploy + freshness

- **Deploy:** none. There was no code change, and the DB fix is served through the 300 s post ISR window.
- **IndexNow (`--paths`):** HTTP 200 for 5 URLs: the 3 `/blog/<slug>` paths, `/blog` and `/sitemap.xml`.
- **Sitemap and `llms.txt`:** the post slugs are unchanged, so neither needs updating.

## CEO audit (06:01 IST)

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,004 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14535.
- **Posts (IST 2026-10-24):** 1. CONTENT-SEO runs at 06:39 and ships #2, so this is not rot. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14535, which equals the DB maximum.
- **Crons:** all 9 roster jobs are present in CronList.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
