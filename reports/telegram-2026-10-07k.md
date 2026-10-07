# Telegram tick 2026-10-07k (21:58 IST)

I read the sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **Category, loot or promo posts:** SB Loots (Myntra footwear hub), LATEST IPHONE (Prime membership promo), CoolzTricks ("loot scroll down"), Dealdost (SPARX), NonStopDeals (Caprese).
- **Location-locked:** Instamart posts (IFS Tips, Hidden Loot).
- **Already seen:** Rogerkart (HP keyboard), INDIAN CHEAP DEALS (handbag), Loot Deals 24x7 (Syska power bank).

That left 2 new Amazon links. Neither ASIN was in the seen list or the DB.

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, prod 200)
| Deal | Price | MRP | Rating |
|---|---|---|---|
| Allen Solly women cotton round-neck T-shirt, Black (B0F7QCQ5CV), id 12715 | ₹237 | ₹1,099 (78% off) | 3.8 (40) |

The price was read from the Amazon PDP and matches the channel's ₹237. It is in stock with add-to-cart. The PDP has no bullet points, so the copy uses the product-facts table: 100% cotton, classic fit, half sleeve, round neck, made in India. The price was checked for Black, size M.

## Rejected (1)
| Candidate | Reason |
|---|---|
| Brown leather desk mat 90×45 cm (`amzn.to/3VCrGR0` → B0H51JWNN9) | 4 ratings (reject rule: 0–7). The ₹749 price also needs a 20% coupon. |

The seen list is now 2,861 entries.

## Freshness
- IndexNow: **HTTP 200**, 4 URLs (1 deal slug plus 3 hubs).
- Sitemap: ISR, at most 30 minutes stale. llms.txt: rebuilt on every request.

## CEO audit (21:58 IST)
| Check | Result |
|---|---|
| Posts today (IST) | **2.** The rule (2–3 per day) is met. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,202 (12,201 + 1) |
| Broadcast cursor | 12714 vs DB max 12715. Only the new row is above the cursor; the external cron will pick it up. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
