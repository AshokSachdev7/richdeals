# SCHEMA-AUDIT tick — 2026-11-17

Report only. The tick fetched and parsed the JSON-LD on 32 prod URLs, then checked it against the DB and the visible page copy. Run at about 04:39 IST, with the posts re-checked at 04:41.

**Result: no stale Offer prices. 0 parse errors, and every page carries the expected types. Yesterday's three stale pages (#7683, #16134, #16632) now serve the DB price, so the `getDeal()` revalidate-0 fix (`48a58f1`) holds. 1 real FAIL is carried over: #14635 Mivi has no priceValidUntil. 1 minor issue is new: one post headline is 111 characters.**

## What was checked

- Every `application/ld+json` block parses.
- **Deal pages:**
  - Product and Offer: INR currency, Offer price equal to the DB price, the same ₹ figure in the visible copy, priceValidUntil present and in the future, availability (InStock, Discontinued or OutOfStock), and an image.
  - FAQPage, with every question and answer visible on the page.
  - BreadcrumbList.
- **Posts:** Article (headline ≤110, datePublished, image, author), BreadcrumbList, and visible FAQ questions.
- Every breadcrumb item except the last has a url.

## Results

| Group | URLs | Clean | Issues |
|---|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/stores/amazon`) | 4 | 4 | — |
| GSC top deals (#4142, #2440, #3498, #2321, #3492, #3506, #4188, #3593) | 8 | 8 | #4142, #2440 and #3498 are EXPIRED. Their Offer is Discontinued with no priceValidUntil, which is correct. |
| Flagged (#14635, #11896) | 2 | 1 | #14635 has no priceValidUntil (FAIL, carried over) |
| Yesterday's stale pages (#7683, #16134, #16632) | 3 | 3 | Fixed |
| Other re-checks (#652, #16224, #16722) | 3 | 3 | — |
| Newest LIVE deals (#16714–#16722) | 9 | 9 | — |
| Newest posts (4) | 4 | 3 | Hair-straightener headline is 111 characters |
| **Total** | **33 checks (32 unique URLs; #16722 is in two groups)** | **31** | |

### Deal Offers

- **GSC top deals, LIVE:**
  - #2321 ₹289, #3492 ₹223, #3506 ₹249 and #4188 ₹1,699 are valid until 11-26.
  - #3593 ₹617 is valid until 11-28.
- **Yesterday's stale pages:** #7683 ₹1,899, #16134 ₹374 and #16632 ₹2,699 now match the DB and are valid until 11-30.
- **Other re-checks:**
  - #652 ₹1,604 is valid until 11-30.
  - #16224 ₹225 is valid until 11-23.
  - #16722 ₹780 is valid until 11-30.
- **#11896 (American Tourister):** ₹899. Its priceValidUntil is 11-18, so it lapses tomorrow.

### Posts

| Post | Types | Issue |
|---|---|---|
| `hair-straightener-ceramic-vs-titanium-temperature-by-hair-type-india` | Article, BreadcrumbList, FAQPage, HowTo | Headline is 111 characters (below) |
| `health-faucet-dripping-weak-spray-fix-by-symptom-india` | Article, BreadcrumbList, FAQPage | — |
| `oil-filled-radiator-vs-fan-heater-vs-convector-which-to-buy-india` | Article, BreadcrumbList, FAQPage | — |
| `do-thermal-blackout-curtains-keep-room-warm-winter-india` | Article, BreadcrumbList, FAQPage, HowTo | — |

- **Transient 504s:** the first fetch of all four posts returned HTTP 504. A curl re-probe returned 200 in 0.6–0.8s, and the re-run validated them. A 504 does not mean the page is dead.
- **Long headline:** the hair-straightener post's Article headline is "Hair Straightener Buying Guide: Ceramic vs Titanium Plates and the Right Temperature for Your Hair Type (India)" (111 characters). The `<title>` is 56 characters. Google no longer enforces a hard 110-character limit, but a long headline gets truncated. This is low priority; shortening the post's headline field to 110 characters or fewer clears it.
- **HowTo:** two posts emit a HowTo block. Google removed HowTo rich results in 2023, so the block is harmless but earns nothing. This is Info only.
- **FAQPage:** FAQ rich results were retired for all sites on 2026-05-07. The visible FAQ still helps answer engines, so FAQPage stays. This is Info only.

## PRIORITY: stale Offer price

**None this run.** Every LIVE Offer matches the DB price and the visible ₹ copy.

| Row | Offer | Last priceHistory | State |
|---|---|---|---|
| #14635 Mivi DuoPods Zig | ₹599, no priceValidUntil | 10-24 | FAIL. No price row in 14+ days. |
| #11896 American Tourister | ₹899, valid until 11-18 | — | Lapses tomorrow unless the PDP is re-read |

## Sitewide: age of the last priceHistory row (LIVE deals)

| Bucket | Deals | Offer state |
|---|---|---|
| none | 453 | no priceValidUntil |
| older than 14 days | 14,750 | no priceValidUntil |
| 12–14 days | 305 | valid, lapses within 2 days |
| under 12 days | 634 | valid |
| **Total** | **16,142** | |

**94.2% of LIVE deals carry no priceValidUntil**, unchanged from 11-16 (94.7% on 11-15). The same-price confirm paths still write no priceHistory row, so a deal that was re-checked and found unchanged still ages out. Only the top-100 deals are indexable, and every one sampled today is valid.

## CEO audit

Run at 04:41 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Prod endpoints | 7 of 7 at 200 (`/` 0.32s, `/offers` 0.12s, `/blog` 0.77s, `/sitemap.xml` 0.13s, `/feed.xml` 0.14s, `/api/deals` 0.24s, `/llms.txt` 0.59s) | OK |
| Session crons vs roster | 9 of 9 present | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **#14635 Mivi:** re-read the Flipkart PDP and write a priceHistory row, or delist it.
- **Same-price confirms:** they should write a priceHistory row so priceValidUntil stays current.
- **#11896:** Flipkart drift; lapses 11-18.
- **Hair-straightener post:** headline is 111 characters (low priority).
- **IFS source blocked:** every `?rto=` redirects home (9 dry ticks).
- **No buy box, on watch:** #9689, #15663, #14424.
- **Low-stock re-check list:**
  - Deal ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next SCHEMA-AUDIT run is at about 04:39 IST on 11-18, per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
