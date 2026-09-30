# Telegram tick 2026-09-30s

## Pushed (1)
| Store | Product | Price | MRP | Off | Result |
|---|---|---|---|---|---|
| Amazon | Orient Aura Rapid Pro 5.9L instant water heater (B0C82PJH3S) | ₹3,599 | ₹7,990 | 55% | HTTP 201, created:true, LIVE |

## Price fixes on existing rows (2, slug kept via prisma.update)
- id 305 Orient 15L storage geyser (B0C81SZTSF): was junk ₹55 / mrp null → ₹6,099 / ₹11,490 / 47%, full rewrite.
- id 200 Nike Women deo pack of 3 (B07S35H3DK): ₹699 → ₹299 / ₹1,107 / 73%.

## Rejected
- TrustBasket pots (B07QX1NKNT): channel ₹98 vs PDP ₹499, no MRP.
- SanDisk Dual Drive 64GB (B01N6LU1VF): channel ₹749 vs PDP ₹1,799, 18% off.
- Repeats from tick 30r (Colobleach, handbag, Syska); multi-product / cashback / promo posts from Dealdost, IFS Tips, Hidden Loot, OMG.

Seen list: 2414 entries.

## Freshness
IndexNow: HTTP 200, 6 URLs (3 slugs + 3).

## CEO audit
- Posts today (IST): 3. Coverless 0, seo-less 0.
- LIVE deals 11,645 (after cleanup). Null price 0, null image 0. PENDING_REVIEW 0.
- Broadcast cursor 12113 vs DB max 12119: draining.
- Prod endpoints 7/7 200. Unpushed commits: 0.

## Rot found + fixed
1,607 LIVE deals had `mrp` null. Worst slice: July rows under ₹100 with no MRP and no
discount (teaser/junk prices, e.g. "Home Centre Coffee Table at ₹45", "Top Brands Womens
Sports Shoes upto 78% off", "Apply Coupon (Account Specific) at ₹1"). 70+ days old,
never re-verified; stale Offer prices are a demotion signal.

Action: 101 rows (LIVE, mrp null, price < ₹100, created before 2026-08-01) set to
EXPIRED. Pages stay live with the EXPIRED banner, drop from sitemap, noindex. No
deletes. Ids saved in scratchpad `expired-0930s-ids.json`.

Backlog: 1,506 LIVE null-MRP rows remain (mostly ≥ ₹100 or newer). Next: re-verify
by ASIN in batches and backfill mrp, or expire when the PDP no longer matches.
