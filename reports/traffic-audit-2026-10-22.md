# Traffic audit — 2026-10-22

Owner asked: "audit why traffic is not coming and fix".

**Short answer:** almost all of the traffic we ever had came from Google **merchant listings** (product snippets in Shopping and image surfaces). Google turned that surface off for the whole site on 09-28. What is left is a site Google barely crawls. Two on-site causes made that worse:

- The 100-deal index set ignored the pages Google had already rewarded.
- The homepage linked to almost nothing that is indexable.

Both are fixed and deployed. The remaining ceiling is domain authority (backlinks), which only the owner can act on.

## Evidence

### GSC (sc-domain:richdeals.in, service-account pull)

| Window | Clicks | Impressions |
|---|---|---|
| Last 28d | 360 | 6,219 |
| Prior 28d | 10 | 482 |

The 28-day total hides a cliff:

| Period | Daily level |
|---|---|
| 07-26 → 07-30 | Launch honeymoon (see memory `gsc-winner-page`) |
| 07-31 → 09-23 | About 5–25 impressions a day |
| **09-24 → 09-28** | **MERCHANT_LISTINGS spike: up to 140 clicks and 2,137 impressions a day, average position about 2** |
| 09-29 onward | Collapse to about 2–40 impressions a day |
| 10-12 → 10-19 | 1–18 impressions a day |

Merchant listings produced 301 of the 360 clicks (84%) and 2,974 impressions.

**By page type, last 28 days:**

| Page type | Clicks | Impressions | Avg position |
|---|---|---|---|
| Deal pages | 104 | 3,015 | 2.0 |
| Deal pages, legacy uppercase-ASIN slugs | 245 | 2,579 | — |
| Home | 7 | 504 | 7.8 |
| Hubs (`/offers`, `/best`, stores, categories) | 4 | 82 | 24 |
| Blog posts | **0** | **39** | 21.6 |

### URL Inspection API (43 URLs sampled from the sitemap)

| Result | URLs |
|---|---|
| Indexed | 17 |
| **Discovered – currently not indexed** (never crawled) | **20** |
| Unknown to Google | 6 |

- None of the 13 newest blog posts is indexed.
- `/best`, every `/best/*` page and `/submit` are "Discovered – not indexed".
- Google knows these URLs exist from the sitemap but has not spent crawl budget on them. That is a low-authority, low-internal-link signal, not a technical block.

### Live prod checks (all pass, ruled out as causes)

- **robots.txt:** OK. All crawlers, including AI crawlers, are allowed.
- **Sitemap index:** pages 56, deals 100, blog 405. That is by design: owner directive 2026-10-16 indexes only the top 100 of 13,552 LIVE deals.
- **Canonical and noindex** on sampled deal, post and hub pages: correct.
- **TTFB:** 0.1–0.6 s. Speed is not the problem.

### Internal linking

- **Before this fix**, the homepage, which is the strongest page we have, linked to:
  - the 30 newest deals, which are almost all noindex because they sit outside the top 100;
  - category hubs;
  - exactly **one** blog post.
- No homepage link pointed at an indexable deal page or any recent post.
- `/api/posts` returns the whole list, 3.67 MB (4.9 MB at build time). That is over Next's 2 MB data-cache limit, so every consumer refetches it.

### Index set versus GSC evidence

- **78** deal pages have earned clicks or ≥50 impressions in the last 90 days of GSC.
- Only **6** of them were in the top-100 indexable set. That set was ranked purely by `clickCount`, which counts on-site affiliate clicks, not search demand.
- So 72 pages Google had already ranked (many at positions 1–3) were being noindexed.

## Root causes, ranked by impact

1. **Merchant listings were pulled site-wide on 09-28.** They were about 84–97% of clicks, depending on the window.
   - Google decides merchant-listing eligibility. We are an aggregator, not the seller, so Merchant Center is not an option.
   - **Not fixable on-site.** See memory `merchant-listings-pulled`.
2. **Crawl and index starvation.** About 60% of sampled sitemap URLs have never been crawled. The homepage passed its equity to noindex fresh deals.
   - **Fixed:** the homepage now links to 12 latest guides and 24 indexable deals.
3. **The index set ignored GSC-proven pages.** Only 6 of 78 were in the set.
   - **Fixed:** 71 GSC-proven slugs are now pinned first, and `clickCount` fills the rest.
   - The cap is still 100, so the owner directive is respected.
   - 61 of the 71 pins pass the quality gate. The other 10 are EXPIRED or have no discount and thin copy.
4. **Domain authority.** Only about 8 keywords rank, all at positions 26–68 (memory `traffic-ceiling`). **Owner action:** backlinks.
5. **Thin, near-duplicate blog clusters.** The `best-X-under-Y` and free-samples clusters are saturated (memory `dup-slug-thin-content`). Already known; blog posts get 0 clicks.
6. **The `/posts` payload is too heavy.** **Partly fixed:** `?limit=N` added, and the homepage now asks for 20. The blog index and sitemap still fetch the full list.

## Fixes shipped

- **Commit `ade680d`**, deployed as DO deployment `38d7a35c-6cff-4a80-9bb2-3872216c73d5`.
  - `apps/api/src/deals/gsc-proven.ts` (new): 71 slugs from the 90-day GSC page pull.
  - `apps/api/src/deals/deals.service.ts`: `topIndexable()` puts the proven pins first, then fills by `clickCount`, under the same gate (LIVE, price, image, ≤120 days, discount ≥20% or description ≥200 chars), capped at 100.
  - `apps/api/src/deals/deals.controller.ts`: `/deals/top-indexable?titles=1` returns `{slug,title}`.
  - `apps/api/src/posts/*`: `/posts?limit=N`.
  - `apps/web/src/app/page.tsx`: adds "Latest buying guides" (12 posts, redirected slugs filtered out) and "Popular deals" (24 links from the index set).
  - `apps/web/src/lib/api.ts`: `getLatestPosts()` and `getTopDealLinks()`.
  - `apps/web/src/app/sitemaps/pages/sitemap.ts`: drops `/submit` (a form page, Discovered – not indexed).
- **IndexNow:** pinged the newly indexable pinned deals plus `/`, `/blog` and `/sitemap.xml`. The HTTP status is recorded in the Verification section below.

## Follow-ups

- **Proven pins age out soon.** All proven pages are 83–94 days old, so the 120-day gate drops them between **11-20 and 11-30**.
  - Before then, re-verify each pinned deal's price on the PDP and refresh it (reprice, or bump it if the price still holds).
  - Otherwise, decide on a ≥120-day exception for GSC-proven pages that still verify. Do not just lift the age gate blindly; stale Offer prices cost us demotion (memory `gsc-keyword-strategy`).
- **Re-pull GSC** around 11-05 to compare impressions on the pinned deals and the newest posts against this baseline.
- **Cut the full-list `/posts` consumers** (blog index, blog sitemap) over to paged fetches once the list passes 500 posts. `take: 500` will silently truncate the blog sitemap.

## Owner actions (cannot be done on-site)

1. **Backlinks.** This is the real ceiling. See `.claude/backlink-campaign.md`. Outreach posts as the owner, so it needs the owner.
2. **Bing Webmaster Tools.** Verify the site and submit `sitemap.xml`. Bing also feeds Copilot and ChatGPT search.
3. **GSC "Request indexing"** in the UI for `/`, `/blog`, `/best` and the 5 newest posts. The API cannot do this for normal pages.
4. **Merchant listings.** No action is possible: we are not the seller, so there is no Merchant Center path.
5. **DataForSEO** is still paused and needs an email to their support. **The DO API token** still needs rotating.

## Verification

- Deploy `38d7a35c` is **ACTIVE**.
- Prod `/api/deals/top-indexable` returns 100 slugs, of which 61 are pinned GSC-proven pages.
- The homepage renders "Latest buying guides" and "Popular deals".
- `/`, `/blog`, `/sitemap.xml` and the deal sitemap all return 200.
- **IndexNow: HTTP 200** for 64 URLs (the 61 pinned slugs plus 3 hubs) and HTTP 200 for 3 URLs (`/`, `/blog`, `/sitemap.xml`).
- The local API on :4000 was restarted after the deploy.
