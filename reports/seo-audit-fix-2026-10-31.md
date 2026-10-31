# SEO-AUDIT-FIX: 2026-10-31 (~06:00 IST)

**Result: the full-site audit is clean. Every flag either matches an intended rule or is never served. The fix was a data-only text pass on 20 top-100 LIVE deals (the only deal pages in the sitemap): 24 stale "% Off" / old-MRP / old-price figures in titles and descriptions were rewritten to match the DB price, mrp and discountPct. This closes the "text left as it was" item from 10-30. No code changed, so nothing was built or deployed. IndexNow returned 200 for 23 URLs.**

The audit followed the qiaomu-seo method. Each item is tagged *observed* (seen directly), *inferred* (reasoned from evidence), or *missing evidence*.

## Page audit, 51 URLs (`apps/api/_seo1031.cjs`), observed
| Type | URLs | Result |
|---|---|---|
| Hubs | 12 | PASS: title, description, canonical, h1, OG and JSON-LD all present; no duplicates |
| Stores | 8 | 5 PASS. pedigree, ajio and cred are `noindex` **by design**, because they have 0 LIVE deals |
| Categories | 12 | PASS |
| Deals | 12 | PASS. The ones outside the top 100 (incl. #15718–15720) are `noindex,follow` **by design**. Outbound links carry `rel="sponsored nofollow"`, images have alt text |
| Blog posts | 7 | PASS: Article JSON-LD, cover image with alt text |

## Crawl surfaces, observed
- `sitemap.xml`: 596 URLs (pages 63, deals 100, blog 433), 0 duplicates. The deals child holds only the top 100, by design.
- 18 posts are not in the blog sitemap: ids 2, 3, 4, 5, 29, 48, 98, 116, 118, 175, 211, 212, 244, 247, 308, 332, 339, 340. All are merged slugs that 308 to their canonical post. Correct, not rot.
- The first checker pass printed "63 URLs, blog 0". That was a checker quirk on the `.ondigitalocean.app` host. A recount with curl and node over `richdeals.in` gave 596.
- `robots.txt`: OK. 16 UA blocks, `Sitemap:` line present, GPTBot and the other AI crawlers allowed.
- `/llms.txt` returns 200 (16,905 B). `/llms-full.txt` returns 200 (38,979 B).

## Post sweep (all 451 posts), observed
- No seoTitle over 60 characters. No seoDesc outside 150–160 characters.
- 0 posts without a cover, 0 empty alt text.
- The duplicate seoTitle pair 340/300 is unchanged: post 340 308s to post 300 and is never served.

## Internal links in post bodies, observed
1,433 unique targets, 2,965 references. **0 dead**: every target returns 200, 301 or 308.

## Fix applied: top-100 prose drift
**Why.** The 10-30 price re-sync fixed the price, mrp and discount fields and the Offer, but some titles and descriptions still quoted the old figures. The visible copy then disagreed with the Product/Offer schema and with the FAQ built from the DB row. That is a schema vs visible-copy mismatch on the 100 indexable deal pages. *Observed.*

**How.**
- `apps/api/_seo1031c.cjs` scanned every LIVE deal for 4 kinds of drift: title "N% Off" ≠ discountPct ±1 (tPct), title ₹ ≠ price (tRs), description % ≠ discountPct (dPct), and a description ₹ that is neither price nor mrp (dRs, loose).
- `apps/api/_seo1031e.cjs` applied exact-substring replacements through Prisma `update`. It aborts on any miss and ran as a dry run first, then `go`. Slugs were not touched.

| Drift | Before: all LIVE / top-100 | After: all LIVE / top-100 |
|---|---|---|
| tPct | 34 / 2 | 32 / 0 |
| tRs | 3 / 0 | 3 / 0 |
| dPct | 138 / 20 | 118 / 0 |
| dRs | 1,205 / 11 | 1,200 / 6 (all known false positives, below) |

**Replacements (24 across 20 deals; new values come from the DB row):**
| # | Field | Old | New |
|---|---|---|---|
| 1905 | title | "84% Off : Gear 31L Anti Theft Laptop Backpack @699. – Amazon" | "Gear 31L Anti Theft Laptop Backpack at ₹1,259 (71% Off) – Amazon" |
| 1905 | desc | copy of the old title | "Gear 31L anti-theft laptop backpack, ₹1,259 on Amazon against an MRP of ₹4,399 (71% off)." |
| 6422 | title + desc | 35% | 45% |
| 1192 | desc | 40% | 55% |
| 1754 | desc | 67% | 61% |
| 2913 | desc | at ₹43,690 (52% off) | at ₹46,490 (49% off). HDFC ₹2,800 line kept |
| 10945 | desc | ₹157, 65%, ₹79 a lock | ₹165, 63%, ₹83 a lock |
| 4408 | desc | 58% | 51% |
| 4409 | desc | ₹246 (46%) | ₹285 (20%) |
| 4410 | desc | 67% | 69% |
| 6400 | desc | 54% | 34% |
| 6402 | desc | 78% | 53% |
| 6403 | desc | 53% | 61% |
| 6407 | desc | 84% | 82% |
| 6413 | desc | 67% | 50% |
| 6416 | desc | 68% | 58% |
| 6418 | desc | 35% | 11% |
| 6421 | desc | ₹280 MRP, 50% | ₹300 MRP, 53% |
| 6423 | desc | ₹399 MRP, 46% | ₹449 MRP, 40% |
| 6424 | desc | ₹159 MRP, 40% | ₹149 MRP, 34% |
| 6428 | desc | 73% | 18% |

**#1905's slug was kept** (`84-off-gear-31l-anti-theft-laptop-backpack-699-B0DY4D`). It is a top-100 URL. Renaming it would 404 an indexed page and lose its signals, and the slug is not shown as copy.

**Skipped as false positives** (the extra ₹ is a saving, a price history, or a per-unit rate, not a stale price):
| # | Figure |
|---|---|
| 979 | ₹19,000 off; July ₹12,999 history |
| 2737 | saving ₹3351 |
| 5779 | "under ₹500" |
| 8952 | per-kg rate |
| 10031 | ₹2220 cut |
| 10945 | ₹83 a lock |

The 10-30 list also named #1953, #3598, #3660, #2995 and #4179. None of them flag in the top-100 scan now: they are either out of the top 100 (noindex) or their figures already match.

**Status in four stages:**
- **Implemented:** done (20 rows updated).
- **Deployed and observable:** done. `/odonil-neem-bathroom-toilet-air-freshener` (#6422) shows "(45% Off)" on prod. Other pages refresh within the web fetch cache window (`revalidate: 300`).
- **Processed by the search platform:** unknown. IndexNow 200 does not guarantee a recrawl.
- **Outcome observed:** missing evidence. Re-check GSC product surfaces for these pages in about 7 days.

## Freshness
- `node apps/api/scripts/indexnow-ping.mjs <20 slugs>` returned **HTTP 200 for 23 URLs**: the 20 changed slugs plus `/`, `/offers` and `/sitemap.xml`.
- `sitemap.xml` is ISR with a 1800 s revalidate. URLs did not change, so no sitemap change was needed. No static routes were added.
- `llms.txt` is force-dynamic, so it already reflects the change.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.11–0.82 s) |
| API total vs DB LIVE | 15,167 = 15,167 |
| API newest id vs DB max | 15,720 = 15,720 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 451 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 1 so far. CONTENT-SEO next fires 06:32 IST |
| Broadcast cursor vs DB max | `lastId` 15,720 = 15,720 (drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Carried forward
- **Non-top-100 prose drift:** 118 descriptions (dPct) and 32 titles (tPct) still carry a % that differs from discountPct. These pages are `noindex` and out of the sitemap, so they are lower priority. A generic regex pass (rewrite "N% off" from discountPct when there is exactly one % in the text) would clear most of them.
- Playwright MCP is hung and reticle fails with CONNECTION_CLOSED. As a result:
  - TG reads 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- 10-31 IST is at 1/4 posts. CONTENT-SEO runs at 06:32.
- Rotate the DO API token.
