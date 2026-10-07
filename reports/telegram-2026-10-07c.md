# Telegram tick 2026-10-07c (11:01 IST)

Sidebar sweep covered all 13 groups in `data/tg-groups.json` with one `browser_evaluate`. From the newest posts:
- Dealdost (AJIO multi-brand), NonStopDeals (Caprese "all pages"), CoolzTricks and Dealzone (L'Oréal / Dove brand-wide), and IFS Tips (Swiggy Dineout) were category or loot posts.
- SB Loots (Paragon on Myntra) resolved to a `/paragon-formal-shoes` category page.
- INDIAN CHEAP DEALS (handbag) and Loot Deals 24x7 (Syska power bank) were already in the seen list.
- Rogerkart (ASUS combo) was new. ONLINE SHOPPING DEALS history was read for its single-product posts; cosmetics, food and FMCG posts were skipped.

That left 12 resolved ASINs: 4 were already LIVE and 8 were new.

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Havells 1000W Hair Dryer (B0H5L55GJY) | ₹699 | ₹1,295 | 4.2 (3,878) |
| KOTTY Women Fleece Hooded Sweatshirt (B09KXD44D7) | ₹200 | ₹1,999 | 3.9 (12) |

Each price was read from the Amazon PDP with a same-origin fetch in the logged-in tab. It matches the post, and the item is in stock with add-to-cart present.

## Live rows re-verified (repost = re-verify)

| Deal | Was | Now | Action |
|---|---|---|---|
| Halonix 10W B22 LED, pack of 10 (B083KJ4MQ7) | ₹415 | ₹399 (80% off) | `prisma.update` of price/discountPct |
| Bergner TriPro 5L cooker (B0FCRPJT9F) | ₹1,999 | ₹2,799 (30% off) | `prisma.update` of price, title and copy (₹, %, 4.2 stars across 211 reviews) |
| Puma Wish (B0BN6WV1PN), XTRIM wrist support (B0CMCSQNTD) | ₹1,289 / ₹98 | unchanged | none |

## Rejected (6)

| Candidate | Reason |
|---|---|
| ASUS Marshmallow CW200 combo (B0HC7G7SHV) | 3.6 stars from 4 ratings |
| MILTON Euroline kettle (B0CK5JZ1TG) | No buy box |
| Negi beach set (B00N7K37FA) | Price drift: ₹225 on the PDP vs ₹105 in the post |
| Symbol formal shirt (B0F7L2C1HZ) | Price drift: ₹437 vs ₹256 |
| Sturlite extension board (B0HF5DPP1K) | No ratings |
| XTRIM wrist support ₹88 (B0CMCSQWBC) | Near-duplicate of live B0CMCSQNTD |

Added 13 links to the seen list (now 2,795).

## Freshness

- IndexNow: **HTTP 200**, 7 URLs (2 new and 2 re-priced deal slugs, plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | **0 at 11:01 IST.** Third tick in a row flagging this. The 12:09 BLOG tick has to publish 2–3. |
| Coverless posts | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
