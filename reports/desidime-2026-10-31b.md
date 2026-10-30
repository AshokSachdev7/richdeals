# DESIDIME-INGEST: 2026-10-31b (~02:35 IST)

**Result: 1 new deal pushed LIVE (#15710 Atom hinges, Amazon, price read on the PDP). One fix: #14231's title and copy said 5 L, but the PDP now lists the item as 3 Litre. IndexNow returned HTTP 200 for 5 URLs. CEO audit is clean apart from a single `/blog` 504 that went away on recheck.**

## Method
- Stage 1: `node scripts/ingest-desidime.mjs` → `scratchpad/dd1031b.json`. It reads cards only (no per-deal fetch), applies the JUNK/GROCERY filters and resolves `visit.desidime.com` links.
- Amazon: desktop curl of the PDP. Price from `#corePriceDisplay .a-price-whole`, stock from `#availability` plus add-to-cart, image from the `landingAsinColor` hiRes. No captcha.
- Flipkart: no browser (Playwright MCP is hung), so stage 1's `productLd` result was used.
- Dedup against the live DB by `store_product` and by slug.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 25 |
| Junk / other-store dropped | 11 |
| Resolved to a product | 10 |
| Already in DB | 1 (B0H4RSRSB5 → #14231) |
| Rejected <24 h | 7 (WATFB4N4XTWAUZ8Z, B0FR27R9BB, B0CXQ5TGDZ, B0CZTGRS2S, Dellstore, District, Klook) |
| Fresh | 2 |
| Pushed LIVE | 1 |

## Pushed (LIVE)
| id | Product | Price / MRP | Store |
|---|---|---|---|
| 15710 | Atom stainless steel door butt hinges, 5" x 12 gauge, pack of 20 | ₹969 / ₹9,698 (90%) | Amazon |

- The PDP price matches the card's ₹969. It is in stock with add-to-cart.
- Title and description are rewritten, and the "% off" text matches price and MRP.
- Affiliate link: `/dp/B09XJ39Z7R?th=1&psc=1&tag=ashoksachdev-21`.

## Rejected (fresh)
| Key | Item | Reason |
|---|---|---|
| WATHGXZJWZNB5MTT | Casio Edifice (Flipkart) | Out of stock. Live price ₹15,995 vs card ₹12,845, which needs supercoins. Stage 1 logged it in `dd-rejected.json` (21:00Z) |

## Dups
| id | PDP | DB | Action |
|---|---|---|---|
| 14231 | Bajaj Prohot **3 Litre**, ₹2,699 / ₹5,720 | Same price, but the title and copy said 5 litre | Price unchanged, so no sync. Title and description corrected to 3 Litre. Slug kept so the URL doesn't 404 |

The card said ₹2,430, which is a bank-offer price. The PDP price of ₹2,699 is the one kept.

## Freshness
- `indexnow-ping.mjs` (slug mode) sent #15710 and #14231, plus `/`, `/offers` and `/sitemap.xml`: **HTTP 200 (5 URLs)**.
- Both deal pages return 200 on prod.
- `llms.txt` (force-dynamic) returns 200. The deals sitemap carries the top 100 only, by design.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints | `/`, `/offers`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all 200. `/blog` returned **504 once (30.6 s)**, then 200 on 3/3 rechecks (0.59–0.62 s); `/blog?page=2` and `/api/posts` returned 200. Likely an ISR regeneration timeout; watch it at the next SITEMON |
| API total vs DB LIVE | 15,156 = 15,156 |
| API newest id vs DB max | 15,710 = 15,710 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 451 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 1 (so far) |
| Broadcast cursor vs DB max | `lastId` 15,709 vs 15,710. #15710 is minutes old, so this is drain lag |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle fails with CONNECTION_CLOSED. As a result:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- 10-31 IST is at 1/4 posts. CONTENT-SEO runs next at 06:32.
- Rotate the DO API token.
