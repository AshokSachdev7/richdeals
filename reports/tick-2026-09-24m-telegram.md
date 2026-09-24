# TELEGRAM-DEAL-MONITOR tick — 2026-09-24m

**Published: 1 deal LIVE** through `/admin/deals/bulk`. The response was `count:1` with `created:true`, and it read back as LIVE (id 11081).
IndexNow: **HTTP 200 for 4 URLs** (1 slug + 3 hub paths).

## Funnel
- **Discovery:** one sidebar `browser_evaluate` covered all 13 groups.
- **Candidates (3):** single-product Amazon posts, shortlinks resolved.
- **Duplicate, already LIVE (1):** Garmin B0DDM3233B (deal 10270).
- **Skipped for quality (1):** coffee table B0FR4X2TW6. It has a 1.0★ rating from a single review and no `_SL1500_` image.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Caresmith Revive back and neck cushion massager with heat, Matte Black | Amazon | B0DJBYDNGC | 1899 | 2500 | 24% |

- **Price:** the channel posted ₹1,691, which assumes an 11% coupon. The product page (`#centerCol`) showed no coupon line, so the deal is listed at the live ₹1,899 with no `coupon` field.
- **Copy:** only facts shown on the product page:
  - 4 nodes, 2 speeds, warmth, two-way rotation
  - 1 kg, 32 x 11 x 21 cm
  - home and car adapters
  - 4.2★ from 324 reviews, Amazon's Choice, 400+ bought last month
  - Delivery and return claims were left out because they weren't checked.

## Gates
- **Pricing:** the title ₹ matches the price, and the price is below the MRP.
- **Image:** `m.media-amazon.com` at `_SL1500_`.
- **Content:** the description is original and ≥900 chars, with 4 how-to steps.
- **Affiliate link:** Amazon `?tag=ashoksachdev-21`.
- **Records:** `tg-multi-seen.json` grew from 1947 to 1950. Script: `apps/api/scripts/push-tg-0924m.mjs`.

## CEO audit (checked against the DB)
- **Deals:** 10734 LIVE, max id 11081, 0 PENDING_REVIEW. No LIVE deal has a null price or null image.
- **Posts:** 327 in total. None is missing a cover or SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. No day at 0, none over the cap.
- **Broadcast cursor:** 11080 against a max id of 11081. The gap is this deal, which the external cron will pick up.
- **Production endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** no commits were waiting to be pushed before this tick.

Verdict: green.
