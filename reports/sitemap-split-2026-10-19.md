# Sitemap split + top-100 GEO surface — 2026-10-19 (13:45 IST)

Owner ask: "focus SEO AEO and GEO, create multiple page and sitemap me top 100 deals hi baki sab remove kar de".

The sitemap already listed only the top-100 deals before this change. The `dealIndexable()` rule has been live since 2026-10-16, and every other deal is served `noindex, follow`.

What this change adds:

## Sitemap index (commit 6b8934b, deploy b4d2d5c4 ACTIVE)

`/sitemap.xml` is now a `<sitemapindex>` with 3 child sitemaps. `robots.txt` still points to `/sitemap.xml`.

| Child | URLs | Contents |
|---|---|---|
| `/sitemaps/pages/sitemap.xml` | 56 | home, hubs, `/best/*`, stores with deals or hand-written copy, categories, `/compare/*`, trust pages |
| `/sitemaps/deals/sitemap.xml` | **100** | top-100 indexable deals only |
| `/sitemaps/blog/sitemap.xml` | 397 | posts, minus the 17 slugs in `post-redirects.json` |

Total 553 URLs, the same as before. GSC can now report indexing separately for each child.

The deal sitemap used to page through all ~13k deals (~220 API calls) just to filter them down to 100. It now looks up the top-100 slugs directly (100 calls, in batches of 20) through the new `getTopDeals()` in `lib/api.ts`. The empty-fetch guard (throw instead of caching an empty sitemap) is kept.

## GEO: llms-full.txt

`/llms-full.txt` used to list the 300 freshest deals, most of them noindex. It now lists the same top-100 indexable set as the deal sitemap, so AI answer engines see the same pages Google is allowed to index. It links both the sitemap index and the deal sitemap.

## Freshness

- IndexNow returned **HTTP 200** for 6 URLs: the index, the 3 child sitemaps, `/llms-full.txt` and `/llms.txt`.
- All 6 endpoints return 200, ≤0.19 s each, except `/llms-full.txt` at 1.66 s on a cold force-dynamic render.

## Notes

- The first deploy failed in `next/font`: the Google Fonts fetch on DO's builder flaked. The retry went ACTIVE, and production served the old build in between.
- No deals were deleted. Non-top deals stay LIVE and reachable, noindexed, with no sitemap entry.
