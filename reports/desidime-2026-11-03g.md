# DESIDIME 2026-11-03g (14:35 IST)

**Result: 1 new deal pushed LIVE and PDP-verified: #16046, a SMILEDRIVE portable air quality / pollution monitor (B0774YF8K1) at ₹4,748 against a ₹9,999 MRP (53% off). Three duplicates matched their PDPs, so none needed a sync. 6 candidates were rejected (5 Amazon, 1 Klook) and 6 Flipkart/Shopsy items are held because they cannot be verified without the browser. IndexNow returned HTTP 200 for 4 URLs.**

## Method

- **Stage 1:** `ingest-desidime.mjs` read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK/GROCERY filters and resolved each Buy Now through `visit.desidime.com`.
- **Amazon verify:** the Playwright MCP is hung and reticle is CONNECTION_CLOSED, so I used `azv.cjs`: desktop curl reading `.a-price-whole` in `#corePriceDisplay`, `#availability` and add-to-cart, with a mobile-UA fallback at `/gp/aw/d/ASIN`.
- **Flipkart / Shopsy:** curl gets a 403 reCAPTCHA (Shopsy has no ld+json) and the browser is down, so these items are held.
- **Dedup:** by resolved `productId` against the live DB via Prisma.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 35 |
| Resolved to a product | 21 |
| Already in the DB | 3 |
| Rejected in the last 24 h (skipped) | 5 |
| Fresh candidates | 13 (6 Amazon, 5 Flipkart, 1 Shopsy, 1 Klook) |
| Pushed | **1** |
| Rejected | 6 |
| Held | 6 |

## Pushed

| DB id | Slug | Price (MRP) | Discount |
|---|---|---|---|
| 16046 | `smiledrive-portable-air-quality-pollution-monitor-b0774yf8k1` | ₹4,748 (₹9,999) | 53% |

- **How it was pushed:** Prisma direct-create with `status: LIVE`, plus a priceHistory row. The script printed `NEW 1 EXISTS 0 SYNCED 0 EXPIRED 0`.
- **Content:** the copy is rewritten and the image comes from `m.media-amazon.com`.
- **Affiliate link:** `/dp/B0774YF8K1?th=1&psc=1&tag=ashoksachdev-21`.
- **Prod:** the page returns 200.

## Duplicates (PDP re-read)

| DB id | Item | Card | DB price | PDP | Action |
|---|---|---|---|---|---|
| 7858 (B09M9ZML9B) | Nyle shampoo | — | ₹257 (MRP ₹445) | ₹257 | none. The PDP MRP read ₹630; MRP was left unchanged because that read is unconfirmed (see Still open) |
| 15689 (B0GPQR66B7) | Bosch 368 L | ₹28,990 (after an offer) | ₹39,990 (MRP ₹73,590) | match | none |
| 8941 (B0GMPXF2SY) | Bosch 335 L | ₹28,240 (after an offer) | ₹41,990 (MRP ₹69,790) | match | none |

## Rejected

| Candidate | Item | Card | PDP | Reason |
|---|---|---|---|---|
| B0FDGWRMMN | Harley-Davidson X440, Red | ₹2,00,950 | null | no add-to-cart |
| B0FDGY3Q18 | Harley-Davidson X440, Silver | ₹2,00,950 | ₹2,35,000 | drift |
| B0H335B5HF | Livpure Fenix Plus chimney | ₹7,960 | ₹9,699 | drift |
| B0D8JFV4V6 | Godrej Cresco sofa | ₹11,331 | ₹12,590 | drift |
| B0D3HG5CMG | HP 15 Ryzen 3 | ₹46,700 | ₹49,400 | drift |
| Klook `6f90d6024061` | Klook | — | — | sale page, not a single product |

All 6 were written to `data/dd-rejected.json` with a `Date.now()` value (the file now holds 1,439 entries).

Held, because Flipkart and Shopsy cannot be verified without the browser:

- Flipkart `ACCG49GHTVKEYVZZ`, `ACCH3ANYRBEA2CTH`, `MOBHERZEN4ZUNYQV`, `ACCHETEHKXYPUSK2`, `COMH898FYYFGRAFZ`
- Shopsy `85f2bcc1842f`

Stage 1 also stamped 4 of these (`ACCH3ANYRBEA2CTH`, `MOBHERZEN4ZUNYQV`, `COMH898FYYFGRAFZ`, `85f2bcc1842f`) into `dd-rejected.json` at 14:28 IST, so they are skipped for 24 h. Re-check them from the hold list when the browser is back, not from the next sweep.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 1 slug returned HTTP 200 for 4 URLs (1 slug plus 3 hubs).
- **Sitemap:** ISR, 30 minutes. The deals child lists the top 100 only, so the new page is reached through the hubs.
- **llms.txt:** dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt`, plus the #16046 page | 9/9 200 | ok |
| DB LIVE / prod API total | 15,488 / 15,488 | equal (+1) |
| DB max id | 16,046 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 459 / 0 / 0 | ok |
| Posts per day (IST) | 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4 | 11-03 at cap; 11-02 missed (past day) |
| Broadcast cursor | lastId 16,045 vs max 16,046 (file re-read) | 1 behind: the new row, which the external broadcast cron will drain |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart and Shopsy verification is blocked. 17 items are held: `RPTEWGU8MGGQXHRR`, `OILHB85PQNRE`, the 3 dealdibba Shopsy items, the 6 DesiDime Flipkart items from 11-03f, and this tick's 5 Flipkart and 1 Shopsy.
- **11-04 needs 2-3 posts.** The CONTENT-SEO ticks must not skip it.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **#7858 Nyle MRP**: ₹445 in the DB against a ₹630 PDP read. Confirm in the browser before changing it.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820 Sedell read NULL with no add-to-cart.
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **The DO token needs rotating.** That is the owner's job.
