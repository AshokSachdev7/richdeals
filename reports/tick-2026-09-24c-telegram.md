# TELEGRAM-DEAL-MONITOR tick — 2026-09-24c

**Published: 7 deals LIVE** through `/admin/deals/bulk`. The response was `count:7` with all 7 rows `created:true`, and each read back as LIVE (ids 10983–10989).
IndexNow: **HTTP 200 for 10 URLs** (7 slugs + 3 hub paths).

## Funnel
- The sidebar read of all 13 groups found only one new product post, in ONLINE SHOPPING DEALS. Every other group was showing category, loot, seen, t.me or spam posts.
- I opened that chat and read its last 20 messages: 19 `link.amazon` posts plus 1 Ajio "Start ₹944" range post, which was rejected.
- Resolved the shortlinks to ASINs and deduped:
  - 2 already in `tg-multi-seen`: Yonex grip, Parachute lotion.
  - 3 already in the DB: Sparkmate brush, Presto spin mop, Lakmé face wash.
- The remaining 14 were read on the PDP in the logged-in Amazon tab.

## Published
| Product | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| Symbol cotton-rich polo T-shirt | B073X4H6BG | 199 | 1099 | 82% |
| ishro home anti-skid bedside runner | B09P6F3MDB | 299 | 3899 | 92% |
| Organic India Triphala powder 100g | B00K5KC2E2 | 120 | 240 | 50% |
| BHARVITA Anarkali kurta + palazzo + dupatta set | B0GYXBHKRK | 835 | 2199 | 62% |
| Caffiora black coffee concentrate 5×20ml | B0GQXYPFSX | 89 | 219 | 59% |
| Bagsy Malone tote set of 2, Croco Pink | B0D3L77Z46 | 263 | 2999 | 91% |
| Layer'r Wottagirl shower gel 300ml ×2 | B0BHWQFSDK | 370 | 782 | 53% |

The Layer'r PDP price is ₹370.23. It was published as ₹370, which is within the ±₹1 tolerance.

## Rejected after the PDP read
| Product | Reason |
|---|---|
| Shower cap 3-pack | ₹99 posted, ₹127 live (drift) |
| Skechers women's shoes | ₹1,250 posted, ₹10,214 live |
| MILDIV gym towel ×3 | ₹179 posted, ₹378 live |
| Puma Vellfire | currently unavailable |
| LOYKA Diwali hamper | no buy box, no price |
| Afghani anjeer figs | perishable food |
| TRIXY crystal chandelier | ₹399 against a ₹24,999 M.R.P. (98% off) — a price glitch; orders likely get cancelled |

The Samsung 25W adaptor (₹499) showed in the sidebar but was not among the chat's loaded messages, so it was not published.

## Gates
- Title ₹ equals price, and price is below MRP.
- Images are hi-res from `m.media-amazon.com`.
- Descriptions are ≥900 chars and original. The gate caught 3 thin descriptions, which were expanded before the push.
- Each deal has 4 howTo steps.
- Affiliate: Amazon `?tag=ashoksachdev-21`.
- `tg-multi-seen.json` now holds 1840 entries. Script: `apps/api/scripts/push-tg-0924c.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10642, EXPIRED 259, max id 10989, PENDING_REVIEW 0.
- **Null price/image:** 226 rows, all EXPIRED (the delisted junk). 0 LIVE rows are affected.
- **Posts:** 325 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-21=1, 09-22=3, 09-23=2, 09-24=1 so far. The 18:09 IST CONTENT-SEO run must add 1–2.
- **Broadcast cursor:** 10982 against a DB max of 10989. That is this batch of 7; the external cron drains 5 per run, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.
