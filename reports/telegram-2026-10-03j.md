# TELEGRAM-DEAL-MONITOR — 2026-10-03j (~10:00 IST)

**The sidebar read found 5 new single-product posts since 08:55. 2 deals went LIVE (`count:2`, both created, ids 12,419–12,420). 1 existing LIVE deal was re-priced. IndexNow returned HTTP 200 for 6 URLs.**

## Pushed (LIVE)

| Deal | Source | Price | M.R.P. | Verification |
|---|---|---|---|---|
| Aloe vera gel 400 g with vitamin E (Amazon, B0DJQS834N) | Dealdost, `amzn.to/3TfGRis` (their tag `7383-21`) | ₹149 | ₹399 | Logged-in Amazon tab: In stock, add-to-cart present, 4.3★ from 647 reviews |
| DIGISMART 2000 W induction cooktop (Flipkart, ICTGYQYZGU3HNYXK) | SB Loots, `fktr.in/0I89j38` (an EarnKaro wrapper, stripped) | ₹1,499 | ₹5,990 | Flipkart tab ld+json: InStock, 4.1★ from 6,637 ratings. The ₹1,424 figure needs offers, so the price used is ₹1,499. |

- **Affiliate links:** Amazon uses `?tag=ashoksachdev-21`. Flipkart uses `/digismart-2000-w-induction-cooktop-push-button/p/itm3dae05ea2a9f6?pid=…&affid=djhackraj`.
- **Live check:** both prod pages return 200.
- **Payload builder:** `scripts/push-tg-1003j.mjs`.

## Re-priced (dedup hit on a LIVE row)

**Lakme 9to5 Hya Matte cushion foundation (B0GGBPN5VP), id 9,672.** CoolzTricks reposted it at ₹314. The product page confirms ₹314 against an M.R.P. of ₹999, in stock. The row was updated with `prisma.update`:

- Price: ₹384 → ₹314
- Discount: 62% → 69%
- The title and description ₹ figures were updated to match.

The slug is unchanged, and the slug was included in the IndexNow ping.

## Rejected

| Post | Reason |
|---|---|
| Pigeon gas lighter ₹56 (B07FPXXY5R, Dealzone) | Rated 3.1★, below the 3.5 cutoff |
| Premium Anjeer 1 kg (Dealdost) | Food |

## Freshness

- **IndexNow:** 3 slugs plus 3 hub URLs (6 URLs), HTTP 200.
- **Sitemap:** ISR (30 min) will pick up the new deals.
- **llms.txt:** dynamic, so it already lists them.
- **Seen file:** now 2,578 entries.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,941 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 360; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 2 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,420 / 12,420. Both new deals have been broadcast. |
| Unpushed commits | 0 before this report |

No rot found.
