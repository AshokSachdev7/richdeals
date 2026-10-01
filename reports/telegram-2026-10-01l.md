# Telegram tick — 2026-10-01 11:05 IST — 0 pushed, 1 stale row expired

Sidebar read in a single evaluate over 25 rows.

## New since last tick

- ONLINE SHOPPING DEALS — Solimo Belly Puri Dabba set of 3 at ₹199.23. Shortlink `link.amazon/B0fIFt21i` resolved to **B0C8V7CP6R**. PDP shows "Currently unavailable", no add-to-cart, rating 3.0 from 1 review → **REJECT**.
  - The DB already held this ASIN as LIVE row 4180 at ₹352 (created 07-31), even though the product is now unavailable. Set it to **EXPIRED**, so the page stays up with the EXPIRED banner. IndexNow → HTTP 200 (4 URLs).
- CoolzTricks — Jack & Jones 70–82% off at `amzn.to/4z2LBa7`. This is a loot/category post → skip.
- Dealzone — photo-only post with no link text → skip.
- RichDeals is our own channel. SB Loots is a greeting-card promo. Both skipped.
- Already seen: Rogerkart JBL (aPbzVrr), WD 4TB (B07D7352GP), Dealdost Nike loot (4hvtna9).

There were no new deals, so the bulk POST was skipped. The seen list now has 2,471 entries (+3).

## CEO audit

- Deals: LIVE 11,751, EXPIRED 389 after the change, max id 12,228. No LIVE deals with null price or null image.
- Posts: 353 total. 0 without a cover, 0 without SEO fields. IST 10-01 count is 2.
- Prod endpoints: 7/7 return 200.
- Broadcast cursor is at 12,217 vs DB max 12,228. It moved up from 12,207 at the last tick, so the gap is closing on its own. Not rot.
- Unpushed commits: 0.
