# DESIDIME 2026-11-04b (02:39 IST)

**Result: 1 new deal pushed LIVE (#16139 Hammer Airflow Flex earbuds, Instamart, ₹349, ld+json-verified). 2 rows synced in place: #11896 American Tourister (₹849 → ₹899) and #16122 NutriPro (null MRP → ₹7,999). 2 duplicates were already in sync. 3 items rejected for price drift. IndexNow returned HTTP 200 for 6 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applies the JUNK and GROCERY filters and resolves each Buy Now link through `visit.desidime.com`.
- **Verification:**
  - Amazon and Flipkart: the logged-in Playwright tab. The Playwright MCP is working again this tick, after the pw-profile Chrome was killed. Reticle is still CONNECTION_CLOSED.
  - Non-Amazon: `productLd()` ld+json, ±₹1, InStock.
- **Dedup:** by productId against the live DB.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 32 |
| Dropped (junk or other-store) | 13 |
| Product-resolved | 19 |
| Already in DB | 4 |
| Rejected in the last 24h | 11 |
| Fresh | 4 |
| **Pushed** | **1** |
| Synced in place | 2 |
| Duplicates already in sync | 2 |
| Rejected | 3 |

## Pushed

| DB id | Slug | Price (MRP) | Discount |
|---|---|---|---|
| 16139 | `hammer-airflow-flex-earbuds-80h-playtime-instamart-63e04zigkb` | ₹349 (₹1,999) | 82% |

- **How it was pushed:** `/admin/deals/bulk` with `status: live`. The response was count 1, created: true.
- **Price:** the ld+json `offers` read ₹349 and InStock. The MRP of ₹1,999 comes from the embedded `price.mrp` JSON.
- **Dedup:** there was no Instamart store row. The existing Hammer rows #2471 and #12110 are different products, so this is not a duplicate.
- **Content and image:** the copy is rewritten, and the image comes from `instamart-media-assets.swiggy.com`.
- **Affiliate link:** Cuelinks, wrapping `instamart.in/item/63E04ZIGKB`.
- **Prod:** the #16139 page returns 200.

## Duplicates and sync

| DB id | Item | Change |
|---|---|---|
| #11896 | American Tourister 17-inch Valex laptop backpack (Flipkart) `LTBGU8QBXR5QDJRV` | Price ₹849 → ₹899, MRP ₹2,500, discount 66% → 64%. Updated the title, the 3 description clauses and the savings amount (₹1,601), and added a priceHistory row. The card's ₹664 did not hold on the PDP. This clears the 11-04a hold. |
| #16122 | NutriPro juicer mixer 50 W (Flipkart) `MIXHSJ3HG3FXFZPK` | MRP null → ₹7,999, discount 90%. This clears the 11-04a null MRP. |
| #4793 | Havells Prolife Stellar Chef `B0D7ZRLH5Z` | No action: already ₹5,194. The card's ₹4,068 is a bank-offer price. |
| #8856 | Sony MDR-ZX310AP `B00K0AL3PQ` | No action: ₹799 with add-to-cart present. This clears the earlier "NULL, no add-to-cart" note. |

## Rejected

| pid | Item | Card | Live | Reason |
|---|---|---|---|---|
| B0DFLT2Q9W | IFB | ₹19,240 | ₹24,990 | drift |
| B0GNWCYQCK | Portronics | ₹2,007 | ₹2,069 | drift |
| ACCHMSRFCKUNFUZK | Zebronics (Flipkart) | ₹9,899 | ₹10,999 | drift |

- `data/dd-rejected.json` now holds 1,567 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with 3 slugs (#16139, #11896, #16122) returned `HTTP 200 for 6 urls` (3 slugs plus 3 hubs).
- **Sitemap:** ISR, 30 minutes. The deals child lists the top 100 only.
- **llms.txt:** dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt`, plus the #16139 page | 9/9 200 | ok |
| DB LIVE / prod API total | 15,582 / 15,582 | equal (+1) |
| DB max id | 16,139 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 is under the rule; CONTENT-SEO (`210ebce0`) at 06:32 IST must ship 1-2 more |
| Broadcast cursor | lastId 16,138 vs max 16,139 (file re-read) | 1 behind; the external cron drains it |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **11-04 needs 1-2 more posts.** The 06:32 IST CONTENT-SEO run must ship them.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409. Playwright works again, so these can be re-read now.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820 Sedell and #14840 Plaeto read NULL with no add-to-cart.
  - #14396 has a null MRP (the PDP shows ₹1,998).
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **Reticle is CONNECTION_CLOSED.** It is not needed while Playwright works.
- **The DO token needs rotating.** That is the owner's job.
