# DESIDIME 2026-11-03f (12:20 IST)

**Result: 1 new deal pushed LIVE. #16023 is the Aksmit bike HSRP number-plate frame (B0DQ1K2189), at ₹74 against a ₹1,099 MRP (93% off). The PDP confirmed ₹74 with add-to-cart. The 3 duplicate rows already matched their PDPs, so none needed a sync. 8 Amazon candidates were rejected and 6 Flipkart items are held because they cannot be verified. IndexNow returned HTTP 200 for 4 URLs.**

## Method

- **Stage 1:** `ingest-desidime.mjs` read the `/new` and homepage cards only, applied the JUNK and GROCERY filters, and resolved each link through `visit.desidime.com`.
- **Amazon verify:** The Playwright MCP is hung and reticle is CONNECTION_CLOSED, so I used `azv.cjs` (desktop curl reading `.a-price-whole`, `#availability` and add-to-cart). Null reads were retried with the mobile UA at `/gp/aw/d/ASIN`.
- **Flipkart:** curl gets a 403 reCAPTCHA and the browser is down, so these items are held.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 36 |
| Junk or non-store links dropped (including 2 Bajaj UPI items that point to the Play store) | 13 |
| Resolved to a product | 21 |
| Already in the DB | 3 |
| Rejected in the last 24 h | 4 |
| Fresh candidates | 14 (8 Amazon, 6 Flipkart) |
| Pushed | **1** |

## Pushed

| DB id | Slug | Price (MRP) | Discount |
|---|---|---|---|
| 16023 | `aksmit-bike-number-plate-frame-for-hsrp-plates-b0dq1k2189` | ₹74 (₹1,099) | 93% |

The push used Prisma direct-create (`status: LIVE`) plus a priceHistory row. The copy is rewritten, the image comes from `m.media-amazon.com`, and the affiliate URL is `/dp/B0DQ1K2189?th=1&psc=1&tag=ashoksachdev-21`. The page returns 200 on prod.

## Duplicates (PDP re-read)

| DB id | ASIN | DB price | PDP | Action |
|---|---|---|---|---|
| 15689 | B0GPQR66B7 (Bosch 368 L) | ₹39,990 | ₹39,990, in stock | none |
| 8941 | B0GMPXF2SY (Bosch 335 L) | ₹41,990 | ₹41,990, in stock | none |
| 2913 | B0H4H59Q78 (LG 1.42 T AC) | ₹46,990 | ₹46,990, in stock | none |

The DesiDime card prices (₹28,990, ₹28,240 and ₹39,990) include a bank-card offer, so they are not the shelf price.

## Rejected

| ASIN | Item | Card | PDP | Reason |
|---|---|---|---|---|
| B0G6LTHMLF | Philips 55" QD-MiniLED | ₹37,999 | ₹44,199 | drift |
| B0CX95X8ZJ | Bosch Go 3 | ₹3,306 | ₹4,349 | drift |
| B0F62F1VHL | Godrej 600 L (HDFC card price) | n/a | null | currently unavailable (mobile UA confirmed) |
| B0GK7VR8ZH | Godrej 185 L | ₹14,390 | ₹18,390 | drift |
| B0CQ827JFR | Lapcare DP-to-VGA | ₹24 | null | currently unavailable, no add-to-cart (mobile UA confirmed) |
| B0GTZPF1ZS | Haier 215 L | ₹16,190 | ₹20,190 | drift (also rejected in TG 11-03k) |
| B0GP6YWSY2 | Lenovo Idea Tab Pro | ₹32,749 | ₹37,999 | drift |
| B0GCDZ3BSK | Carrier 1.5 T 5-star | ₹35,490 | ₹45,990 | drift |

All 8 were written to `data/dd-rejected.json` with a `Date.now()` value (the file now holds 1,419 entries).

Held, because Flipkart cannot be verified without the browser:

- ACCGGXFHDSDF8WYA (Noise TWO, ₹1,499)
- MIXHSJ3HG3FXFZPK (NutriPro, ₹800)
- STCHF2JARYJ5QJDZ, STCGE2DCFXHW2T9F and COMHRAZ6JGG5ENNC (the script also flagged these three for price drift)

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the #16023 slug returned HTTP 200 for 4 URLs (1 slug plus 3 hubs).
- **Sitemap:** ISR, 30 minutes. The deals child lists the top 100 only, so the new page is reached through the hubs.
- **llms.txt:** dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` plus the #16023 page | 9/9 200 | ok |
| DB LIVE / prod API total | 15,465 / 15,465 | equal (+1) |
| DB max id | 16,023 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 459 / 0 / 0 | ok |
| Posts per day (IST) | 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4 | 11-03 at cap; 11-02 missed (past day) |
| Broadcast cursor | 16,022 vs max 16,023 (file re-read) | 1 behind, which is just the new row |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart and Shopsy verification is blocked. Eleven items are held: `RPTEWGU8MGGQXHRR`, `OILHB85PQNRE`, the 3 dealdibba Shopsy items, and the 6 DesiDime Flipkart items above.
- **11-04 needs 2-3 posts.** The CONTENT-SEO ticks must not skip it.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820 Sedell read NULL with no add-to-cart.
- **#2913's description still mentions the HDFC EMI offer.** The PDP price was re-verified this tick (₹46,990), but the card-offer claim was not.
- **The DO token needs rotating.** That is the owner's job.
