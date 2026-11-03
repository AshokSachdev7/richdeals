# SEO-AUDIT-FIX 2026-11-03 (05:58–06:06 IST)

**Result: the full-site audit passed every page type. One safe on-page fix: in 44 LIVE non-top-100 deals, the "N% off" figure in the title or description was stale against the DB `discountPct`, and I rewrote those figures to match. This was a data-only fix (Prisma update), so there was no build and no deploy (same as 10-31). IndexNow returned HTTP 200 for 47 URLs.**

Missed ticks: there is no seo-audit-fix report for 11-01 or 11-02. Those daily runs didn't happen; this tick covers the gap.

## Page audit (51 URLs, prod richdeals.in)

| Type | Result |
|---|---|
| Home, `/offers`, `/freebies`, `/coupons`, `/blog` | all 200; canonical, title and description ok |
| Deal pages (top-100 sample + newest) | 200, Product/Offer + BreadcrumbList + FAQPage JSON-LD |
| Non-top-100 deals (#15979, #15978, Longway iron, SmartBuy bottle, JYY diyas, KVY hair clips) | `noindex,follow` (by design) |
| Store/category | 200. Stores pedigree, ajio and cred have 0 LIVE deals (thin, but by design) |
| Blog posts (newest 585–587) | 200, Article JSON-LD, cover + alt |

## Crawl surfaces

- **sitemap.xml:** 600 URLs, 0 dups, 437 blog URLs. The deals child is the top 100 only (by design). Newest posts 585–587 are present on prod. (The DO host's cached sitemap was stale; prod is correct.)
- **robots.txt:** 16 UA blocks, `Sitemap:` line present, GPTBot/ClaudeBot/PerplexityBot allowed.
- **llms.txt:** 200 (16,948 B). **llms-full.txt:** 200 (38,969 B).

## Post sweep (458 posts)

- 0 bad seoTitle/seoDesc, 0 coverless, 0 empty alt.
- The duplicate pair 340/300 is known; 340 redirects (308) to 300.

## Internal links

1,471 targets and 3,013 references; 0 dead.

## Copy versus DB drift scan (all LIVE)

| Drift | All LIVE | Top-100 |
|---|---|---|
| title % | 32 | 0 |
| title ₹ | 3 | 0 |
| description % | 118 | 0 |
| description ₹ | 1,203 | 6 (known false positives) |

## Fix applied: stale "N% off" → DB discountPct

**Why:** a deal title or description that says "64% off" while the Offer schema price implies 60% is a visible-copy/schema mismatch. That's a trust signal for Google and a factual error for AI answer engines that quote the copy.

**How:** `apps/api/_seo1103c.cjs`. Its guards:
1. The DB itself must be consistent: round((mrp−price)/mrp×100) is within ±1 of discountPct.
2. Exactly one distinct % value in the field (otherwise skip `multi%`).
3. **rs-mismatch guard:** every ₹/Rs/@ number in the field must match the DB price, mrp or saving within ±₹1. Without it, the first dry run would have corrupted rows like #9348 ("down from ₹11956, 41% off"), where the copy is consistent with itself and the DB mrp is the outlier. Those rows need a PDP price re-verify, not a % edit.
4. Context skip: bank/card/coupon/cashback/extra/up-to/EMI/code/flat within ±40 chars (it's an offer %, not the product discount).
5. Only the % digits are replaced; nothing else in the text changes.

Dry run: 44 rewrites, 96 skips (83 rs-mismatch, the rest multi% or ctx). After `GO=1`, the result was `UPDATED 44`. A re-run gave rewrite 0, so it's idempotent.

The rewritten ids: 396, 3829, 749, 762, 384, 8966, 5181, 2025, 2473, 2125, 4822, 13835, 1486, 2995, 1418, 5689, 5724, 3660, 1529, 12707, 8726, 8016, 11437, 6012, 8692, 6380, 8903, 9038, 5703, 1953, 9583, 12742, 12955, 11029, 598, 2503, 1966, 195, 928, 2269, 2323, 3560, 3728, 15440.

Sample rewrites:

| id | Product | Copy → DB |
|---|---|---|
| 396 | Rexona (title + description) | 64% → 60% |
| 3829 | Zebronics | 38% → 44% |
| 749 | Harpic | 59% → 33% |
| 762 | Samsung Buds | 68% → 66% |
| 8966 | Amazon Basics | 75% → 78% |
| 4822 | ACTIVA | 42% → 47% |
| 13835 | Eauset | 71% → 74% |

Spot-checked against price/mrp: 793/3545 = 78% ✓, 2099/3980 = 47% ✓, 262/990 = 74% ✓.

### Four-stage status

| Stage | Status |
|---|---|
| Implemented | yes, 44 DB rows |
| Deployed and observable | yes. Deal pages render from the DB (ISR), and the new copy shows on the next revalidate |
| Processed by the search platform | IndexNow submitted (HTTP 200); crawl pending |
| Outcome observed | unknown; watch GSC for those 44 URLs (mostly noindex, non-top-100) |

Rollback: the old values were in `_seo1103c.out.json` before the idempotency re-run emptied it. Re-derive them from `discountPct` history if ever needed. Low risk: only the % digit changed.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 44 slugs returned **HTTP 200 for 47 URLs** (44 + `/`, `/offers`, `/sitemap.xml`).
- **Sitemap:** ISR, 30 min. No membership change (none of the 44 is top-100).
- **llms.txt:** force-dynamic.

## CEO audit (06:06 IST)

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | all 200 | ok |
| DB LIVE | 15,420 | ok |
| DB max id | 15,979 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 458 / 0 / 0 | ok |
| Posts per day (IST) | 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:3 | 11-02 missed (past day) |
| Broadcast cursor | 15,979 vs max 15,979 | caught up |
| Unpushed commits | 0 | ok |
| Session crons | 9/9, matches roster | ok |

## Carried forward

- **96 skipped drift rows**, mostly rs-mismatch: the copy's MRP or price disagrees with the DB. These need a PDP price re-verify (the price-sync path), not a text edit.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430, #6409. Blocked on the browser.
- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.**
- **Single-deal checks still pending:** JioMart #37 delist candidate, #1665/#1656 no ld+json price, #6405/#6426 manual check.
- **The DO token needs rotating** (owner).
