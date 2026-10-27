# DESIDIME-INGEST · 2026-10-27h (~08:55Z / 14:25 IST 10-27)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk / grocery / other drops | 9 |
| Resolved to a product (`visit.desidime.com` → merchant) | 27 |
| Already in the DB (dedup by `productId`) | 13 |
| Fresh | 14 (11 Amazon, 3 Flipkart) |
| Already in `dd-rejected` | 4 (3 Flipkart, plus Logitech B07VMS65WX, which was re-checked) |
| PDP-verified | 11 Amazon |
| Rejected (price drift) | 5 |
| **Pushed LIVE** | **6** (`HTTP 201 count=6`, all `created:true`, ids 15143–15148) |

The 3 Flipkart rows were Racold geyser, WILDHORN sling and Portronics fan. Stage 1 flagged all three as price drift and all three were already in `dd-rejected`, so none was pushed.

## Verify table

Read in the logged-in Playwright Amazon tab using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. There was no captcha. The MRP is nulled where it implies ≥80% off, or where the PDP MRP is a per-unit rate.

| ID | Product | Card ₹ | Live ₹ | MRP pushed | Result |
|---|---|---|---|---|---|
| B0BRMSZNSZ | AXE Signature Champion no-gas perfume 200 ml | 90 | 90 | null (the PDP `a-text-price` of 45 is a per-100 ml rate) | #15143 |
| B0G4QJK1D3 | Magnetic train set 38 pcs | 1850 | 1850 | 6999 | #15144 |
| B0GYFVHJXK | Geonix Hercules Rome cabinet, 4 ARGB fans | 1899 | 1899 | 6999 | #15145 |
| B0DR6666GX | Waterproof cooking apron | 39 | 39 | null (92%) | #15146 |
| 9353220661 | Dalit Chintan (paperback) | 49 | 49 | null (80.4%) | #15147 |
| 8197069239 | Mossad, Hindi translation (paperback) | 61 | 61 | null (82.6%) | #15148 |
| B07VMS65WX | Logitech G Pro X headset | 6269 | 10495 | — | rejected |
| B0DPCRLRNJ | Helett HT20pro barcode scanner | 2426 | 2695 | — | rejected |
| B0CTKHC68P | Promate GaN travel adapter | 1259 | 2827 | — | rejected |
| B0GQGQVTTS | Haier 190 L 5-star refrigerator | 14016 | 17490 | — | rejected |
| B0FYNH6PBR | Shark S8201IN steam mop | 12749 | 13999 | — | rejected |

All 6 pushed products are in stock with add-to-cart present. All 6 images are `m.media-amazon.com` and each returned HEAD 200. The apron's `_SX342_` thumbnail was swapped for the base image.

The affiliate link is `/dp/ASIN?tag=ashoksachdev-21`, with `desidime01-21` and `ascsubtag` stripped.

The 5 drift rejects were written to `data/dd-rejected.json` with epoch-ms values; Logitech's timestamp was refreshed. The file now holds 487 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with the 6 slugs → **HTTP 200 for 9 URLs** (the slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Prod check:** `/axe-signature-champion-no-gas-body-perfume-for-men-200-ml-b0brmsznsz` returned 200.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,615 (+6) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15148 |
| Broadcast cursor | `lastId` 15142. That equals the max before this batch; the external tg-broadcast cron drains it |
| Posts: total / coverless | 438 / 0 |
| Posts per IST day | 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 |
| Prod endpoints | 7/7 return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`) |
| Unpushed commits | 0 before this commit |

Nothing is rotting.
