# Telegram tick 2026-10-08l (11:59 IST)

I read the sidebar for all groups in `data/tg-groups.json` with one `browser_evaluate`, then read the last 3 messages of the open Online Shopping Deals chat.

Skipped without a PDP read:
- **Card-only / multi:** iPhone Rates (iQOO Z11, coupon + SBI EMI), Hidden Loot (masterlink), NonStopDeals (Caprese category), Dealdost (IndusInd credit card promo).
- **Location-locked:** IndiaFreeStuff Tips (Swiggy Instamart).
- **Not deals:** own RichDeals channel, OMG LOOTDEALS (spam).
- **Already handled:** Rogerkart (Cockatoo dumbbell, rejected 08k), INDIAN CHEAP DEALS (handbag), Loot Deals 24x7 (Syska).

Shortlinks resolved (source tags stripped):
- `amzn.to/4yF4ksJ` (CoolzTricks) → B08NZG6T79
- `amzn.to/4dqhdyd` (Dealzone) → B0D8TNT77P
- `fktr.in/4Sl7BHV` (SB Loots) → Flipkart FANGTBF8Z2DBZZHR
- `link.amazon/B07CNrvAv` (Online Shopping Deals) → B0CGRHHGBH
- `link.amazon/B0iObXCZR` (Online Shopping Deals) → B0FKTSBCDV

## Pushed: 3 (`/admin/deals/bulk` count 3, all created:true, status live, ids up to 12776)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| GoPro HERO12 Black action camera (B0CGRHHGBH) | ₹22,990 | ₹45,000 | 4.4 (349) |
| ADISA snake print shoulder bag, Off White (B0FKTSBCDV) | ₹419 | ₹2,399 | 4.4 (13) |
| Orient Ujala Prime BLDC 1200mm ceiling fan, Flipkart (FANGTBF8Z2DBZZHR) | ₹2,659 | ₹4,600 | 4.2 (44,139) |

Amazon prices matched the posts on the PDP (in stock, add-to-cart). The ADISA post named the black variant, but the PDP lands on Off White, so the name and image follow the landing colour. The SB Loots fan post had no price, so the Flipkart ld+json price (InStock) is used. Affiliate: Amazon `tag=ashoksachdev-21`, Flipkart `affid=djhackraj`.

## Rejected (2)

| Candidate | Reason |
|---|---|
| Pigeon 1.8L electric kettle (B08NZG6T79), ₹398 | Only 1 left in stock, rated 3.6 |
| Facial ice roller (B0D8TNT77P), ₹27 | Beauty/skin-care item with skin-treatment claims |

Seen list is now 2,895 entries.

## Freshness

- IndexNow: **HTTP 200**, 6 URLs (3 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (11:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,257 (12,254 + 3) |
| Broadcast cursor | 12773 vs DB max 12776: the 3 new rows, external cron picks them up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
