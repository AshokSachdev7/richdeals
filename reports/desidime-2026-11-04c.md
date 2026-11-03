# DESIDIME 2026-11-04c (~04:34 IST)

**Result: 0 new deals, 0 synced. Of the 3 fresh candidates, 2 were rejected (an Instamart gold campaign page and a VIVO promo). The third was the Hammer earbuds already live as #16139, which slipped past dedup because of a productId mismatch. That row's productId is now fixed. The 4 duplicates were already in sync. IndexNow skipped because nothing was pushed.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applies the JUNK and GROCERY filters and resolves each Buy Now link through `visit.desidime.com`.
- **Verification:**
  - Amazon: same-origin fetch in the logged-in Playwright tab, reading `.a-price-whole` in `#corePriceDisplay`, `#availability` and the add-to-cart button.
  - Non-Amazon: `productLd()` ld+json, ±₹1, InStock.
- **Dedup:** by productId against the live DB.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 32 |
| Dropped (junk or other-store, including 2 Play Store links) | 11 |
| Product-resolved | 19 |
| Already in DB | 4 |
| Rejected in the last 24h | 12 |
| Fresh | 3 |
| **Pushed** | **0** |
| Synced in place | 0 |
| Duplicates already in sync | 4 (+1 hash duplicate) |
| Rejected | 2 |

## Duplicates and sync

| DB id | Item | Check |
|---|---|---|
| #8856 | Sony MDR-ZX310AP `B00K0AL3PQ` | PDP ₹799 with add-to-cart; DB ₹799 (MRP ₹2,190). In sync. |
| #4793 | Havells Prolife Stellar Chef `B0D7ZRLH5Z` | PDP ₹5,194, In stock, add-to-cart; DB ₹5,194 (MRP ₹9,999). The card's ₹4,068 is a bank-offer price. In sync. |
| #11896 | American Tourister Valex backpack (Flipkart) | DB ₹899. The card's ₹664 did not hold in 04b. No change. |
| #16122 | NutriPro juicer mixer (Flipkart) | DB ₹800, MRP ₹7,999, same as the card. No change. |
| #16139 | Hammer Airflow Flex earbuds (Instamart) | DB ₹349, same as the card. This is the hash duplicate; see the fix below. |

## Rejected

| pid | Item | Reason |
|---|---|---|
| beebbb9f5652 | Kalyan 24k 1 g gold coin (Instamart) ₹13,221 | Not a product: the link is a campaign-collection page. The price is a bank-offer price (RBL credit card). No ld+json. |
| 7676f1ea6128 | VIVO Spin & Win (In-shopact) | Junk promo with no price and no ld+json. |

## Fix: Instamart productId mismatch

- **Symptom:** #16139 was pushed by hand in 04b with productId `63E04ZIGKB` (the Instamart item code). `affiliate()` in `scripts/lib/ingest-common.mjs` gives every non-Amazon, non-Flipkart merchant a productId made from the first 12 hex characters of the md5 of `origin + pathname`. For this item that is `07c6e01c96d9`. Because the two values differed, DB dedup missed the row and the card came back as "fresh".
- **Fix:** the hand-pushed row was the only one not following the lib's convention, so the row was changed, not the shared lib. #16139's productId was set to `07c6e01c96d9`. No other row used that value. The slug stays `hammer-airflow-flex-earbuds-80h-playtime-instamart-63e04zigkb`, and the prod page returns 200.
- **Rule going forward:** any hand-pushed non-Amazon, non-Flipkart deal must take its productId from `affiliate()`, not from the merchant's own item code.

## Freshness

- **IndexNow:** skipped (0 pushed). The productId change does not affect what the page shows.
- **Sitemap / llms.txt:** unchanged; no new rows.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt`, plus the #16139 page | 9/9 200 | ok |
| DB LIVE / prod API total | 15,589 / 15,589 | equal |
| DB max id | 16,146 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 460 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:1 | 11-04 is under the rule; CONTENT-SEO (`210ebce0`) at 06:32 IST must ship 1-2 more |
| Broadcast cursor | lastId 16,146 vs max 16,146 (file re-read) | drained |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **11-04 needs 1-2 more posts.** The 06:32 IST CONTENT-SEO run must ship them.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820 and #14840 read NULL with no add-to-cart.
  - #14396 has a null MRP.
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **Reticle is CONNECTION_CLOSED.** It is not needed while Playwright works.
- **The DO token needs rotating.** That is the owner's job.
