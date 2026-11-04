# DESIDIME-INGEST 2026-11-04e (~08:35 IST)

**Result: 1 deal pushed LIVE, 0 price syncs.** The new deal is #16148, a Lifelong LLHFD439 1350W 4.2 L air fryer on Bigbasket at ₹1,795. The bulk push returned 201 with count 1 and created:true. IndexNow returned HTTP 200 for 4 URLs, Bing returned 200 for 4, and the prod page returns 200.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Resolved via visit.desidime.com | 20 |
| Dup (productId already in DB) | 6 |
| Rejected (JUNK/GROCERY/seen in last 24h) | 13 |
| Fresh candidates | 1 |
| Pushed | **1** |

## Pushed

| # | Deal | Store | Price | MRP | Verify |
|---|---|---|---|---|---|
| 16148 | `/lifelong-llhfd439-1350w-air-fryer-4-2-l-black-771b39027df7` | Bigbasket → Cuelinks | ₹1,795 | ₹12,499 (-86%) | Plain curl returned no ld+json, so the price was read in a Playwright tab. In the tab, the Product ld+json shows `offers.price` 1795 with `availability` InStock, the visible price is ₹1,795, and the add-to-basket button is present. Image from the bbassets.com CDN |

The ₹12,499 MRP is the merchant's own listed MRP and is shown as-is. The copy notes that delivery depends on the user's Bigbasket pincode.

## Dups: price check

| Product id | Row | DB price | Live | Action |
|---|---|---|---|---|
| B0D4QRW4H8 (Ant Esports GM320 mouse) | #16095 | ₹499 | Amazon PDP `.a-price-whole` 499, In stock, add-to-cart present. The card's ₹485 is not the PDP price | none |
| B0D7ZRLH5Z | #4793 | ₹5,194 | matches card | none |
| B00K0AL3PQ | #8856 | ₹799 | matches card | none |
| LTBGU8QBXR5QDJRV | #11896 | ₹899 | matches card | none |
| MIXHSJ3HG3FXFZPK | #16122 | ₹800 | matches card | none |
| 07c6e01c96d9 | #16139 | ₹349 | matches card | none |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` in slug mode, HTTP 200 for 4 URLs (the slug plus `/`, `/offers`, `/sitemap.xml`).
- **Bing:** HTTP 200 for 4 URLs.
- **Sitemap:** the deals child is top-100 only by design. The new page is live and `noindex,follow` unless it ranks into the top 100.
- **llms.txt:** force-dynamic, so it picks the deal up per request.

## CEO audit (08:35 IST)

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,584 / 15,584 | equal |
| DB max id | 16,148 | ok (+1) |
| PENDING_REVIEW / LIVE null price / LIVE null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, **11-04:2** | 11-04 meets the rule. 11-01 and 11-02 are past misses |
| Broadcast cursor | lastId 16,147 vs max 16,148 (file re-read) | 1 behind because of this tick's new deal; the external cron sends it |
| Crons | 9/9: CronList matches the roster | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The 12:32 IST CONTENT-SEO run can add a 3rd post for 11-04.** It is optional and must stay ≤4.
- **16 unresolved bare Flipkart links:**
  - With a known itm id: #12919, #12958, #1396, #12771, #15066.
  - Without: #12263, #12380, #12111, #12215, #12216, #12379, #12155, #12153, #12168, #12212, #12213.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **#2913's description still mentions the HDFC EMI offer.**
- **#6409 is only 7% off.**
- **Reticle MCP is CONNECTION_CLOSED.** Not needed.
- **The DO token needs rotating.** Owner's job.
