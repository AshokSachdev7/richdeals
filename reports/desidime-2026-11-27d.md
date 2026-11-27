# DESIDIME-INGEST tick: 2026-11-27d

**Result:** 2 new Amazon deals are LIVE (#17555, #17556). The bulk push returned HTTP 201 with count 2, and both rows came back `created:true`. Three duplicate LIVE rows had stale prices and were synced from their PDPs. IndexNow returned HTTP 200 for 8 URLs. All prod endpoints and the new and synced deal pages returned 200.

## Stage 1

- `ingest-desidime.mjs` read cards only, from `/new` plus the homepage, with no per-deal fetches. 35 cards.
- JUNK/GROCERY filters killed 17. 13 resolved via `visit.desidime.com` to a single product.
- Of those 13: 4 were already in the DB (by productId, including the null-pid legacy check), 1 was rejected in the last 24 h (Motorola APFHN6YQKSHXJAYR), and 8 were fresh.
- **Dropped at resolve:**
  - Amazon rewards subscribe page.
  - Zave Play Store app.
  - Amazon Pay gift card, Kenstar Aqualia and Toshiba V37SP: Cloudflare kept them on `visit.desidime` (transient).

## Cards (8 fresh)

| Outcome | Count | Detail |
|---|---|---|
| **Pushed** | **2** | Below |
| Price drift (card vs PDP, more than ₹1) | 4 | See Rejects |
| Junk / not a single product | 2 | Bigbasket MFA-51 zipper bag (₹9, no ld+json); Kindle free ebooks B01CSKD9AW (multi-product) |

## Pushed

| # | Deal | ASIN | Price | M.R.P. | Off | How verified |
|---|---|---|---|---|---|---|
| 17555 | Signoraware BoroFlow borosilicate glass jug with bamboo lid, 1.6L | B0F9FZP51L | ₹522 | ₹1,249 | 58% | PDP |
| 17556 | Human Hydro pre-seasoned cast iron kadai, 23cm, 2.2L | B0DHSGSJ9J | ₹882 | ₹3,999 | 78% | PDP |

- **PDP** means a read in the logged-in Playwright tab: price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, M.R.P. from the `#centerCol` regex, stock from `#availability` plus an add-to-cart button.
- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`, with the source tag `desidime01-21` stripped.
- **Images:** `m.media-amazon.com`, from `#landingImage` `data-old-hires`.
- **Copy:** rewritten and answer-first, dated "checked on Amazon.in on 27 November 2026". The how-to drops "pick your size or colour", because both items are single-variant (this fixes the sitemon 11-27h note). The ₹ guard passed before the POST.

## Price sync (duplicate LIVE rows, re-read on PDP)

| Row | Product | Field | Before | After (PDP) |
|---|---|---|---|---|
| #14560 | Ant Esports H520W headset (B081Q85RTF) | Price | ₹710 | ₹798 |
| #14560 | Ant Esports H520W headset (B081Q85RTF) | Discount | 76% | 73% |
| #4121 | Philips Ecolink 9W B22 LED bulb (B0D1FN2WX3) | M.R.P. | null | ₹900 |
| #4121 | Philips Ecolink 9W B22 LED bulb (B0D1FN2WX3) | Discount | null | 56% |
| #2979 | Toyzone Barbie kitchen set (B09CPN8QZZ) | Price | ₹122 | ₹130 |
| #2979 | Toyzone Barbie kitchen set (B09CPN8QZZ) | Discount | 80% | 78% |

- **#14560:** the title and description ₹/% were rewritten to match.
- **#4121:** the PDP is a **pack of 10**, so ₹399 is the pack price. The title, description and how-to now say "Pack of 10". The first draft had a per-bulb figure ("about ₹40 a bulb"); the ₹ guard rejected it because it was neither price nor M.R.P., and it was removed before the write. The image was refreshed from the PDP.
- **#2979:** the copy has no ₹ figures, so only the numeric fields changed.
- Slugs are unchanged. The ₹ guard and % guard passed. Boldfit #17504 was re-read and is unchanged at ₹299.

## Rejects

| Item | Card price | PDP price |
|---|---|---|
| Revlon (B09CY48D6Q) | ₹193 | ₹200 |
| Laguna (B0FLVBC3SP) | ₹386 | ₹749 |
| Haier fridge (Flipkart RFRHKMPPAZCGMYJP) | ₹19,490 | ₹23,340 |
| Acer laptop (Flipkart COMGTGFGB8GK3NV7) | ₹41,233 | ₹43,404 |
| Bigbasket MFA-51 zipper bag | ₹9 | No ld+json, low-ticket |
| Kindle free ebooks (B01CSKD9AW) | — | Multi-product |

- `data/dd-rejected.json` now holds 2,351 keys: B09CY48D6Q, B0FLVBC3SP and B01CSKD9AW were added. The two Flipkart pids were already in it.

## Freshness

- **IndexNow:** HTTP 200 for 8 URLs (2 new slugs, 3 synced slugs, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` returned 200, as did both new deal pages and the synced Philips page.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** generated on each request, so the new deals show up there without any extra step.
- **Audit after the push:** 0 LIVE deals with a null price or null image, 0 PENDING_REVIEW. Newest deal is #17556.
