# SEO-AUDIT-FIX: 2026-10-29 (~06:10 IST)

**Result: the full-site audit is clean. Every flag either matches an intended rule or is never served. The one fix was a PDP-verified price re-sync on the 4 GSC deal pages that schema-2026-10-29 flagged as stale. It was a data-only fix: no code changed, so nothing was built or deployed. IndexNow returned 200 for 7 URLs.**

The audit followed the qiaomu-seo method. Each item is tagged *observed* (seen directly), *inferred* (reasoned from evidence), or *missing evidence*.

## Page audit, 51 URLs (`apps/api/_seo1029.cjs`), observed
| Type | URLs | Result |
|---|---|---|
| Hubs | 12 | PASS: title, description, canonical, h1, OG, JSON-LD all present; no duplicates |
| Stores | 8 | 5 PASS. pedigree, ajio and cred are `noindex` **by design**, because they have 0 LIVE deals |
| Categories | 12 | PASS |
| Deals | 12 | PASS. 6 are `noindex,follow` **by design** because they are outside the top 100. Outbound links carry `rel="sponsored nofollow"` and images have alt text |
| Blog posts | 7 | PASS: Article JSON-LD, cover image with alt text |

## Crawl surfaces, observed
- `sitemap.xml`: 588 URLs, 0 duplicates, 425 blog URLs, and the newest post is included. The deals child holds only the top 100, by design.
- `robots.txt`: 16 user agents, `Sitemap:` line present, GPTBot and the other AI crawlers allowed.
- `/llms.txt` returns 200 (16,740 B). `/llms-full.txt` returns 200 (38,667 B).

## Post sweep (all 443 posts), observed
- No seoTitle over 60 characters.
- No seoDesc outside 150–160 characters.
- 0 posts without a cover, 0 empty alt text.
- 1 duplicate seoTitle: post 340 and post 300 (Croma coupons). Post 340 already 308s to post 300 through `post-redirects.json`, and only post 300 is in the sitemap. The duplicate is never served, so no action is needed.

## Internal links in post bodies, observed
1,390 unique targets (2,902 references). **0 dead**: every target returns 200, 301 or 308.

## TTFB, single lab run from one location (observed; this is not field CWV)
| URL | TTFB |
|---|---|
| `/` | 0.19 s |
| `/offers` | 0.11 s |
| `/blog` | 0.63 s |
| `/stores` | 0.09 s |
| Croma blog post | 0.66 s |
| deal #15391 | 0.13 s |

Every request returned 200.

## Fix applied: price re-sync on the stale GSC deals
`[dealSlug]/page.tsx` omits `priceValidUntil` when the newest `PriceHistory` row is more than 14 days old (`apps/web/src/lib/site.ts:265`). I read each PDP live:
- Amazon in a logged-in Playwright tab, from `#corePriceDisplay .a-price-whole`. Add-to-cart was present and the page said In stock.
- Flipkart from its ld+json, which showed InStock.

`apps/api/_seo1029d.cjs` then updated price, discountPct, and the ₹ amount and % in the title and description. It also wrote one `PriceHistory` row per deal (ids 14945–14948).

| Deal | Before | After (PDP) | Discount |
|---|---|---|---|
| #3492 AADHIK gas saver (Amazon) | ₹243 | ₹299 | 76% → 70% |
| #3498 boAt Aavante 2.1 (Amazon) | ₹4,999 | ₹4,299 | 74% → 77% |
| #3506 Amazon Basics phone stand (Amazon) | ₹249 | ₹249 (unchanged) | 75% |
| #4188 Bluemix mixer + iron (Flipkart) | ₹1,609 | ₹1,709 | 63% → 60% |

Script bug caught in the dry run, before any write: inside a string passed to `new RegExp`, `'\b'` is a backspace character and `\s` / `\d` lose their backslash. The % replacement silently matched nothing. Doubling the escapes fixed it, and the second dry run was correct.

**Status in four stages:**
- **Implemented:** done (DB rows updated).
- **Deployed and observable:** done. All 4 prod pages show the PDP price in both the title and the Offer, with `priceValidUntil` 2026-11-12. The web fetch cache (`revalidate: 300`) served the old price for about 5 minutes after the write. The API was fresh immediately.
- **Processed by the search platform:** unknown. IndexNow returned 200 but does not guarantee a recrawl.
- **Outcome observed:** missing evidence. Re-check GSC for these 4 pages after about 7 days.

Still open, *inferred*: 12,440 LIVE deals (about 84%) are still stale. The top-100 indexable deals are the next batch to re-verify, because they are the only deal pages in the sitemap.

## Freshness
- `node apps/api/scripts/indexnow-ping.mjs <4 slugs>` returned **HTTP 200 for 7 URLs** (the 4 slugs plus 3 hubs).
- The sitemap is unchanged: no new static routes and no new deals.
- `llms.txt` is force-dynamic, so it already reflects the change.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,853 = 14,853 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 443 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 1 so far (CONTENT-SEO fires at 06:32) |
| Broadcast cursor vs DB max | 15,391 = 15,391 |
| Unpushed commits | none before this report |

## Carried forward
- Rotate the DO API token (it was exposed in chat during setup).
- The reticle MCP fails with CONNECTION_CLOSED. Playwright still works.
- Re-verify the 71 GSC-pinned deals before 11-20.
- Run a top-100 PDP re-sync batch to restore `priceValidUntil` at scale.
