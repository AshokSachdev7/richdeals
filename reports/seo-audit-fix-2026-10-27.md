# SEO-AUDIT-FIX · 2026-10-27 (~01:00Z / 06:30 IST)

**Verdict:** I found 1 issue across all page types, and it is fixed. Post #429's seoDesc was 162 characters, above the 150–160 rule, and is now 156. That was a DB-only change, so there was no code change and no deploy. The IndexNow ping returned HTTP 200.

## Page audit (51 URLs, fetched from the DO origin, canonicals compared against https://richdeals.in)

The 51 URLs covered:

- 12 hubs: `/`, `/offers`, `/freebies`, `/coupons`, `/blog`, `/stores`, `/categories`, `/best`, `/about`, `/contact`, `/privacy` and the washing-machine compare page
- 8 stores and 12 categories
- 12 deals: the top 6 by clicks and the 6 newest
- the 7 newest posts

Each page was checked for:

- a title of 20–65 characters and a description of 70–165 characters
- a self-canonical and exactly one h1
- an og:image, and JSON-LD that parses
- `rel="sponsored nofollow"` on every `/out` link
- alt text on every image
- no duplicate titles or descriptions across pages

| Page type | URLs | Issues |
|---|---|---|
| Home + hubs | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals | 12 | 0 |
| Posts | 7 | 0 |

These results are expected and are not bugs:

- `/stores/pedigree`, `/stores/ajio` and `/stores/cred` are `noindex` because they have 0 deals.
- The 6 newest deals are `noindex, follow`. `dealIndexable()` indexes only the top 100 deals by clicks.

## Expired deal

`/boat-airpods-pin-it-78fhs0qbj` returns 200 with the EXPIRED banner, `noindex, follow`, and a self-canonical. That is correct, because expired deals never 404.

## Crawl surfaces

| Surface | Result |
|---|---|
| `/sitemap.xml` index | 3 chunks, each 200 |
| `/sitemaps/pages/sitemap.xml` | 63 locs |
| `/sitemaps/deals/sitemap.xml` | 100 locs (the indexable top 100) |
| `/sitemaps/blog/sitemap.xml` | 419 locs, which is 436 posts minus 17 redirect sources. The newest post is present |
| `robots.txt` | 16 user agents, a `Sitemap:` line, GPTBot / ClaudeBot / PerplexityBot allowed |
| `/llms.txt` | 200, 16,935 B |
| `/llms-full.txt` | 200, 42,102 B |

The first run of the script reported "38 chunks, blog 0", but that was one bad fetch. Re-fetching with curl on both prod and the origin showed the 3 chunks above. It is not a real regression.

## Post sweep (all 436 posts, excluding the 17 redirect sources)

| Check | Bad |
|---|---|
| seoTitle longer than 60 | 0 |
| seoDesc outside 150–160 | **1, now fixed** |
| No cover | 0 |
| Empty `![]()` alt | 0 |
| Duplicate seoTitle | 0 |

**Fix.** Post #429 is `how-to-remove-watch-links-adjust-metal-strap-at-home-india`. Its seoDesc went from 162 to 156 characters through `prisma.post.update`:

> Resize a steel watch strap at home: count the links, follow the arrows, push pins out the right way, remove from both sides of the clasp, then micro-adjust.

After ISR refreshed (300 s), I curled the live meta description and it now carries the new text.

## Internal links (ALL post bodies)

The scan covered every relative link and every absolute `richdeals.in` link in every post body: **1,322 unique links (2,756 references), 0 non-200**. Links were fetched 8 at a time, with 2 tries each. No root-level blog slugs return 404.

## CWV basics (prod, curl TTFB)

| Path | TTFB | Size |
|---|---|---|
| `/` | 0.15 s | 32.8 KB |
| `/offers` | 0.12 s | 9.2 KB |
| `/freebies` | 0.16 s | 20.5 KB |
| `/coupons` | 0.18 s | 23.0 KB |
| `/blog` | 0.65 s | 16.4 KB |
| Deal #15080 | 0.15 s | 17.7 KB |
| Newest post | 0.55 s | 15.4 KB |
| `/stores/amazon` | 0.18 s | 29.3 KB |

- The home page has 1 LCP image with `fetchPriority="high"`. Images further down are `loading="lazy"`.
- `/blog` and the post pages have the slowest TTFB, at 0.55–0.65 s on an ISR miss. That is still under the 0.8 s "good" threshold, so no action is needed.

## Freshness

- **IndexNow.** `indexnow-ping.mjs --paths /blog/how-to-remove-watch-links-adjust-metal-strap-at-home-india /sitemaps/blog/sitemap.xml` returned **HTTP 200 (2 URLs)**.
- **Sitemap and llms.txt.** No new routes were added, so these did not need to change.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,546 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15080 |
| Broadcast cursor | 15080, which equals the DB max |
| Posts total / without cover / without SEO title or description | 436 / 0 / 0 |
| Posts per IST day | 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 1 (CONTENT-SEO runs at about 06:39 IST) |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |

## Carried forward

- Rotate the DO API token.
- The chrome-devtools and reticle MCPs fail with CONNECT_TIMEOUT. Playwright works.
- Re-verify the prices of the 71 GSC-pinned deals before 11-20.
