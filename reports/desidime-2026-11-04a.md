# DESIDIME 2026-11-04a (00:39 IST)

**Result: 1 new deal pushed LIVE (#16122 NutriPro juicer mixer 50 W, Flipkart, ₹800, ld+json-verified). 1 duplicate row price-synced in place (#4793 Havells Prolife Stellar Chef air fryer, ₹5,631 → ₹5,194). 5 Amazon items rejected (all drift; the card price is a bank-offer price). 4 items skipped in stage 1. IndexNow returned HTTP 200 for 5 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applies the JUNK and GROCERY filters and resolves each Buy Now link through `visit.desidime.com`.
- **Verification:**
  - Amazon: desktop curl reading `.a-price-whole` in `#corePriceDisplay`, `#availability` and add-to-cart, with a mobile-UA `/gp/aw/d/` fallback. The Playwright MCP is still hung and reticle is CONNECTION_CLOSED.
  - Non-Amazon: `productLd()` ld+json, ±₹1, InStock.
- **Dedup:** by productId against the live DB.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 37 |
| Product-resolved | 21 (dropped: Cred Play Store app, Amazon rewards page, Bella Vita collection page) |
| Already in DB | 4 |
| Rejected in the last 24h | 7 |
| Fresh | 10 |
| Skipped in stage 1 | 4: Flipkart gold coin `CONHRGS8ABTCSSET` (drift), Flipkart Dabur toothpaste `TPSG73TDMM3GDBK4` (drift), Digihaat Chiwda and NAFED Malka (no ld+json) |
| **Pushed** | **1** |
| Synced in place | 1 |
| Rejected | 5 |
| Held (Flipkart, needs a browser) | 1 (#11896) |

## Pushed

| DB id | Slug | Price (MRP) | Discount |
|---|---|---|---|
| 16122 | `nutripro-juicer-mixer-50-w-mixhsj3hg3fxfzpk` | ₹800 (no MRP in ld+json) | — |

- **How it was pushed:** Prisma direct-create (`push-dd1104a.mjs`) with `status: LIVE`, plus a priceHistory row. The push printed `NEW 1 EXISTS 0 SYNCED 1`.
- **Price:** the ld+json read was ₹800 and InStock, which matches the card. ld+json carried no MRP, so mrp and discount are null and the copy has no MRP or discount claim. The FAQ falls back to price-only answers.
- **Content and image:** the copy is rewritten, and the image comes from `rukmini1.flixcart.com`.
- **Affiliate link:** `/p/itm9d457a74ba679?pid=MIXHSJ3HG3FXFZPK&affid=djhackraj`.
- **Prod:** #16122 returns 200.

## Duplicates and sync

| DB id | Item | Change |
|---|---|---|
| #4793 | Havells Prolife Stellar Chef air fryer 5.5 L `B0D7ZRLH5Z` | ₹5,631 / ₹10,995 → ₹5,194 / ₹9,999, 48%. The card showed ₹4,068, which is a bank-offer price, so the PDP price was used. The title has no price, so it was left as is. I added a new pattern to the sync chain for the description clause "live at ₹X on Amazon (MRP ₹Y, N% off)". The affiliate URL was reset. |
| #16095 | Ant Esports `B0D4QRW4H8` | No action: matches the PDP at ₹499 / ₹3,299 (the card showed ₹485). |
| #8856 | Sony MDR-ZX310AP `B00K0AL3PQ` | Not changed: the PDP read null with no add-to-cart. Noted only. The DB has ₹799. |
| #11896 | American Tourister (Flipkart) `LTBGU8QBXR5QDJRV` | Held: the DB has ₹849 and the card shows ₹664, but checking it needs a browser. |

## Rejected

All 5 were in stock with add-to-cart. In every case the card shows a bank-offer price.

| pid | Item | Card | PDP | Reason |
|---|---|---|---|---|
| B0H3KBZ4J9 | OnePlus 15R | ₹59,999 | ₹63,999 | drift |
| B09SB36BJX | INALSA vacuum | ₹3,749 | ₹3,999 | drift |
| B0H293SFTR | REDMI Turbo 5 | ₹35,999 | ₹40,999 | drift |
| B07Q2ZM5LS | Philips straightener | ₹2,167 | ₹2,399 | drift |
| B0GRB3FBBB | OnePlus Nord 6 | ₹42,999 | ₹44,999 | drift |

- `data/dd-rejected.json` now holds 1,531 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with 2 slugs returned `HTTP 200 for 5 urls` (2 slugs plus 3 hubs).
- **Sitemap:** ISR, 30 minutes. The deals child lists the top 100 only.
- **llms.txt:** dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt`, plus the #16122 and #4793 pages | 10/10 200 | ok |
| DB LIVE / prod API total | 15,565 / 15,565 | equal (+1) |
| DB max id | 16,122 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 459 / 0 / 0 | ok |
| Posts per day (IST) | 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, **11-04:0** | It is 00:39 IST and CONTENT-SEO (`210ebce0`) fires now; it must ship 2-3 posts |
| Broadcast cursor | lastId 16,122 vs max 16,122 (file re-read) | drained, 0 behind |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart and Shopsy verification is blocked, and about 22 items are held.
- **11-04 has 0 posts so far.** CONTENT-SEO is due at 00:39 IST.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820 Sedell, #14840 Plaeto and #8856 Sony read NULL with no add-to-cart.
  - #14396 has a null MRP (the PDP shows ₹1,998).
  - #16122 has a null MRP (none in ld+json).
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **The DO token needs rotating.** That is the owner's job.
