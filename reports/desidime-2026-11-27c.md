# DESIDIME-INGEST tick: 2026-11-27c

**Result:** 3 new deals are LIVE (#17518 to #17520). The bulk push returned HTTP 201 with count 3, and every row came back `created:true`. IndexNow returned HTTP 200 for 6 URLs. Four duplicate LIVE rows were re-read on their PDPs. Three had stale prices and were synced; the fourth (Toshiba) had the right price but one wrong how-to step, now fixed. A second IndexNow ping returned HTTP 200 for 7 URLs. All prod endpoints returned 200.

## Stage 1

- **Fetch flapped.** The first attempt got 0 cards because Cloudflare blocked curl. The `/new` page then returned 503 in the browser too, which was a short DesiDime outage. A later curl got 200, and stage 1 was rerun cleanly.
- 34 cards discovered (`/new` plus homepage). 18 dropped as junk, 12 resolved to merchant URLs, 5 duplicates.
- **Stage-1 false positive.** Curl marked Havells HD1901 as price drift and wrote it to `dd-rejected.json`. The browser read of its Flipkart ld+json showed ₹799, which matches the card. I pushed it and removed its reject key. The browser read is the price truth for Flipkart.

## Cards (34)

| Outcome | Count | Detail |
|---|---|---|
| Junk, grocery or restricted (dropped in stage 1) | 18 | BHIM, CRED, Funzone `/b?node` category page, HDFC offers and others |
| Price drift or not a single product | 4 | See Rejects |
| Duplicate, price-synced | 4 | #3880, #5288, #15298, plus a how-to fix on #12224 |
| Duplicate, price already correct | 1 | #17504 Boldfit, ₹299 |
| **Pushed** | **3** | Below |

## Pushed

| # | Deal | Store | Price | M.R.P. | Off | How verified |
|---|---|---|---|---|---|---|
| 17518 | Marshall Acton III Bluetooth speaker | Amazon | ₹21,999 | ₹31,999 | 31% | Logged-in PDP tab, `#corePriceDisplay .a-price-whole`, add-to-cart present |
| 17519 | Havells HD1901 hair dryer | Flipkart | ₹799 | ₹1,095 | 27% | Browser ld+json, InStock |
| 17520 | NOVA NHT 1042 trimmer | Flipkart | ₹552 | ₹899 | 39% | ld+json, InStock |

- **Affiliate:** Amazon uses `?tag=ashoksachdev-21` on `/dp/ASIN`. Flipkart uses `/p/itm…?pid=…&affid=djhackraj`, with the source `affid`/`affExtParam*` stripped.
- **Images:** from the marketplace CDN only (`m.media-amazon.com`, `rukminim*.flixcart.com`).
- **Copy:** titles and descriptions are rewritten and answer-first. The ₹ guard passed on every row.

## Price sync (duplicate reposts, re-read on PDP)

| Row | Product | Field | Before | After (PDP) |
|---|---|---|---|---|
| #5288 | Ninja Foodi AF300IN (B0FWY81CXR) | Price | ₹15,999 | ₹9,999 |
| #5288 | Ninja Foodi AF300IN (B0FWY81CXR) | M.R.P. | ₹39,999 | ₹22,990 |
| #5288 | Ninja Foodi AF300IN (B0FWY81CXR) | Discount | 60% | 57% |
| #3880 | NOVA NHT 1137 (TMRHETWXGBVPEBCZ) | Price | ₹680 | ₹644 |
| #3880 | NOVA NHT 1137 (TMRHETWXGBVPEBCZ) | Discount | 38% | 41% |
| #15298 | Havells BT4441 (TMRH2PA4UAVUUQZZ) | Price | ₹699 | ₹849 |
| #15298 | Havells BT4441 (TMRH2PA4UAVUUQZZ) | Discount | 65% | 57% |
| #12224 | Toshiba V37SP 50" (TVSHZTYRVBSWQJS5) | How-to step 2 | "₹29,999" | "₹29,990" |

- The title, description and how-to steps were rewritten to the new figures. The ₹ guard and a % guard both passed. All slugs are unchanged.
- **Card prices were wrong on 2 of these 4.** Ninja card ₹9,499 vs PDP ₹9,999. Toshiba card ₹24,990 vs PDP ₹29,990, most likely a bank-offer price, so its DB price was kept. The NOVA (₹644) and Havells BT4441 (₹849) cards matched the PDP, so there the DB was the stale side.
- #15298 went **up** (₹699 → ₹849). The old page was understating the price, which is a stale-Offer risk for Google.

## Rejects (added to `dd-rejected.json` for 24h)

| Card | Product | Card price | Live price |
|---|---|---|---|
| 2202849 | Kenstar Jacuzzi B0DLW3RXKZ | ₹2,199 | ₹2,299 |
| 2202828 | Motorola AirShield APFHN6YQKSHXJAYR | ₹3,471 | ₹3,999 |
| — | Kenstar Aqualia B0HGF7VFK6 | — | Already rejected within 24h (tick 27b) |
| 2202858 | Kindle free ebooks B01CSKD9AW | — | Multi-product |

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs (the 3 new slugs, `/`, `/offers` and `/sitemap.xml`), then HTTP 200 for 7 URLs (the 4 synced slugs plus the same 3).
- **Prod pages:** Marshall, Havells HD1901, Havells BT4441 and NOVA NHT 1137 all return 200.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** dynamic, so the new deals and synced prices appear there automatically.
