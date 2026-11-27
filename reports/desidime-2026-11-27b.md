# DESIDIME-INGEST tick: 2026-11-27b

**Result:** 6 new Amazon deals are LIVE (#17480 to #17485). The bulk push returned HTTP 201 with count 6, and every row came back `created:true`. Two duplicate LIVE rows were synced to their PDP prices: #15932 (adidas Airshift) and #12254 (Logitech MK270r). IndexNow returned HTTP 200 for 11 URLs. All prod endpoints returned 200.

## Stage 1

- curl got through this time: 36 cards from `/new` plus the homepage.
- Two cards were still on `visit.desidime` after the curl resolve: 2202801 (adidas Basenew) and 2202796 (pTron). Both were resolved in the logged-in Playwright profile instead.
- **First push failed:** `howTo` was sent as a single string, but the API expects `String[]`. The API answered 201 with count 0 and `ok:false` on all 6 rows. I resent `howTo` as an array and that push succeeded.

## Cards (36)

| Outcome | Count | Detail |
|---|---|---|
| Junk, grocery or restricted (dropped in stage 1) | 18 | Includes HDFC transactions, Amazon Home cashback and Patanjali Kesh Kanti |
| Homepage only, not on /new | 2 | Ganesh Livo lunch box, Toshiba V37SP 50" QLED. Retry next tick |
| Price drift or unverifiable | 3 | See Rejects |
| Duplicate, price-synced | 2 | #15932, #12254 |
| Duplicate, price already correct | 1 | #15943 Noise Buds Mini X, ₹999 / ₹2,999 |
| **Pushed** | **6** | Below |

## Pushed

| # | Deal | Store / ID | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|
| 17480 | GIVA 925 Silver Butterfly Stud Earrings | Amazon B0BBW4N3YS | ₹726 | ₹3,499 | 79% | Logged-in PDP tab, add-to-cart present |
| 17481 | ASICS Men JOLT 4 Running Shoes | Amazon B0CYSZ58GB | ₹2,499 | ₹4,999 | 50% | Logged-in PDP tab, in stock |
| 17482 | adidas Men Flydoot M Running Shoe | Amazon B094PH5ZSK | ₹2,159 | ₹4,799 | 55% | Logged-in PDP tab, in stock |
| 17483 | adidas Men Seize The Street M Running Shoe | Amazon B096NDY51M | ₹1,920 | ₹4,799 | 60% | Logged-in PDP tab. "Only 2 left", and the description says so |
| 17484 | adidas Men Basenew Running Shoe | Amazon B0CPVMGRY8 | ₹1,915 | ₹4,299 | 55% | Visit link resolved in the browser, then logged-in PDP tab, in stock |
| 17485 | pTron Bassbuds Encore TWS earbuds, 50h playtime | Amazon B0H2Z2YPSM | ₹699 | ₹1,999 | 65% | Visit link resolved in the browser, then logged-in PDP tab, in stock |

- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`.
- **Images:** `m.media-amazon.com`, taken from `#landingImage` `data-old-hires` or the largest `data-a-dynamic-image` entry.
- **Copy:** titles and descriptions are rewritten and answer-first. A ₹ guard checked that every ₹ figure in the title, description and how-to steps equals the deal's price or M.R.P.

## Price sync

| Row | Product | Field | Before | After (PDP) |
|---|---|---|---|---|
| #15932 | adidas Airshift M (B0GPRHNYSV) | Price | ₹1,242 | ₹1,788 |
| #15932 | adidas Airshift M (B0GPRHNYSV) | Discount | (old) | 53% |
| #12254 | Logitech MK270r (B00CEQEGPI) | M.R.P. | ₹2,295 | ₹2,495 |
| #12254 | Logitech MK270r (B00CEQEGPI) | Discount | 35% | 40% |

- #15932: the title and description were rewritten to match the new price.
- #12254 had stale copy from before this tick, which is now fixed:
  - The title said "35% Off". It now says 40%.
  - The lead said "52% below" and "saves ₹1,300". It now says 40% below and saves ₹1,000.
  - A how-to step said "check the price shows ₹1,195". It now says ₹1,495.
- Both slugs are unchanged.

## Rejects (added to `dd-rejected.json` for 24h)

| Card | Product | Card price | Live price |
|---|---|---|---|
| 2202819 | Kenstar Aqualia Neo 10L B0HGF7VFK6 | ₹4,769 | ₹6,299 |
| 2202798 | Dell KB216 B00ZYLMQH0 | ₹563 | ₹599 (M.R.P. ₹649) |
| 2202806 | hamaramall SKUC0A69ED9 water heater rod | ₹279 | Unverifiable: the ld+json shows 139 mixed in with unrelated prices |

## Freshness

- **IndexNow:** HTTP 200 for 11 URLs (the 6 new slugs, the 2 synced slugs, `/`, `/offers` and `/sitemap.xml`).
- **Prod pages:** `/ptron-bassbuds-encore-tws-earbuds-50h-playtime-b0h2z2ypsm` and `/adidas-airshift-m-running-shoes-for-men-b0gprhnysv` both return 200.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** dynamic, so the new deals appear there automatically.
