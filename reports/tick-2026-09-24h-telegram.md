# TELEGRAM-DEAL-MONITOR tick — 2026-09-24h (~15:35 UTC / 21:05 IST)

**Published: 1 deal LIVE** through `/admin/deals/bulk`. The response was `count:1` with the row `created:true`, and it read back as LIVE (id 11052).
IndexNow: **HTTP 200 for 4 URLs** (1 slug + 3 hub paths).

## Funnel
- **Sidebar read of all 13 groups:** 4 fresh posts since tick 0924g: Dealdost (Rasayanam), SB Loots (Lifelong walking pad), Dealzone (TRESemme) and CoolzTricks ("Loot 862"). The other rows were old, non-deal, or our own channel.
- **Resolved:**
  - `fkrt.cc/h4dWuxU` goes to a Flipkart `/hlc/…/pr?sid=hlc` collection page, not a single product.
  - `link.amazon/B0a3rALYt` goes to B07F2QCLP2.
  - `amzn.to/4xNnlbd` goes to `amazon.in/ax/claim`, a loot/claim page.
  - `fktr.in/nFxozuQ` goes to Flipkart pid TRDHHY3P8NFN6U3J at `/p/itmb74051f2d57b6`.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Lifelong walking pad treadmill, 3 HP, 2-level manual incline | Flipkart | TRDHHY3P8NFN6U3J | 7999 | 35999 | 78% |

- **Walking pad:** the post read "@7999 + Bank Offer". The two earlier walkpads were rejected as card-only drift, so this one was checked against the Playwright tab: ld+json price is 7999 and InStock, and the page shows MRP 35,999 at 78% off. ₹7,999 is the plain price, and the bank offer comes on top of it. The description says so.

## Rejected
| Product | Reason |
|---|---|
| Rasayanam Ashwagandha @349 (Dealdost) | Collection page (`/hlc/…/pr`), not a single product |
| TRESemme 580 ml B07F2QCLP2 (Dealzone) | Duplicate: already LIVE (id 1098) |
| CoolzTricks "Loot 862" | Amazon `/ax/claim` loot page, not a product |

## Gates
- Title ₹ equals price, and price is below MRP.
- Image comes from `rukmini1.flixcart.com` at 1500px.
- The description is original and ≥900 chars, with 4 howTo steps.
- Affiliate: `/p/itm…?pid=…&affid=djhackraj`.
- `tg-multi-seen.json` now holds 1913 entries. Script: `apps/api/scripts/push-tg-0924h.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10705, max id 11052, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** re-read the file. lastId is 11047 against a max of 11052, a gap of 5 (the tail of the IFS 0924f batch plus this deal). The external cron is draining it, since it moved 11027 → 11047 since the last tick.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
