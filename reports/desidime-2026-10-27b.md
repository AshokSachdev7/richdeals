# DESIDIME-INGEST · 2026-10-27b (~21:00Z 10-26 / 02:30 IST 10-27)

## Funnel

I ran stage 1 with `node scripts/ingest-desidime.mjs`. It reads the `/new` and homepage cards only; no per-deal pages are fetched.

| Step | Count |
|---|---|
| Cards discovered | 32 |
| Dropped by JUNK, GROCERY or other-store rules | 16 (one was a Flipkart Play Store app link) |
| Resolved through visit.desidime.com | 15 |
| Already in the DB by productId | 13 |
| Fresh | 2. Both are Amazon, and a Prisma recheck found 0 rows for either |
| Verified and **pushed** | **1** |
| Rejected | 1 |

## Verify (Amazon, logged-in Playwright tab, same-origin `/dp/` fetch, no captcha)

| ASIN | Product | Card ₹ | PDP `.a-price-whole` | Stock | Result |
|---|---|---|---|---|---|
| B09TB7R7SP | Bergner Centro 3-pc nylon kitchen tool set | 387 | **387** | In stock, add-to-cart | **Pushed.** MRP nulled: the PDP's ₹129 list price is below the price |
| B0FV2VGWFJ | Crossbeats RoadEye DC04 4K 3-channel dash cam | 9,735 | **10,275** | In stock | **Rejected.** The card title says `[Apay ICICI CC]`, so ₹9,735 is a card-dependent price; the PDP drifts by ₹540 |

## Push

- `POST /admin/deals/bulk` returned **HTTP 201, `count: 1`**, `created: true`.
- New ID: #15068, `/bergner-centro-3-pcs-nylon-kitchen-tool-set-turner-ladle-skimmer-b09tb7r7sp`.
- The image is a `m.media-amazon.com` hiRes (`719VvK4F4xL`) and returns HEAD 200.
- Affiliate link: `/dp/B09TB7R7SP?th=1&psc=1&tag=ashoksachdev-21`. The DesiDime tag was stripped.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` sent 1 slug plus the 3 standard paths → **HTTP 200** (4 URLs).
- **Prod:** the deal page returns 200.
- **Sitemap:** ISR, rebuilds within 30 min.
- **llms.txt:** `force-dynamic`, so it already reflects the DB.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,534 (+1) |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Broadcast cursor | `lastId` 15067 vs DB max 15068. The gap is this tick's deal; the external cron drains it |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |

Nothing rotting.
