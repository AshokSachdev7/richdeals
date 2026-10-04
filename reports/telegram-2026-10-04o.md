# TELEGRAM-DEAL-MONITOR — 2026-10-04o (10:01 IST)

**3 pushed** (1 Shopsy, 2 Amazon). Bulk `count 3`, all `created:true`. IndexNow **HTTP 200** (6 urls). The Puma deal page returns 200 on prod.

## New source posts (4)

| Group | Post | Resolved to | Result |
|---|---|---|---|
| SB Loots 09:39 | 2-pc chopper @ ₹223 (bittli.in) | Shopsy XCOGFFB92YFNHZRZ | **Pushed** |
| ONLINE SHOPPING DEALS 09:12 | Puma Wish @ ₹1,289 (link.amazon) | Amazon B0BN6WV1PN | **Pushed** |
| CoolzTricks 09:10 | VIP vest pack @ ₹269 (amzn.to) | Amazon B0D59ZSBS3 | **Pushed** |
| Dealzone 09:00 | "999" (link.amazon) | Amazon B0FLWR2TT6 (CADLEC) | Already LIVE at ₹999 (verified tick n), no change |

## Verification

**Shopsy chopper.** The PDP was fetched with curl. Shopsy has no ld+json, so the figures come from the page data:
- finalPrice 223, mrp 599
- 4.0 stars from 1,377 ratings
- No Sold Out widget
- The listing is the 2-piece combo

Affiliate is Cuelinks (Shopsy is not Flipkart).

**Puma Wish.** Read in the logged-in Amazon tab:
- priceToPay ₹1,289, M.R.P. ₹4,299
- `#availability` In stock, add-to-cart present
- 4.0 stars from 341 ratings

**VIP Bonus vest combo.** Read in the logged-in Amazon tab:
- priceToPay ₹269, M.R.P. ₹700
- In stock, add-to-cart present
- 4.1 stars from 174 ratings

The post said "pack of 4", but Amazon's per-unit price of ₹53.80 implies 5. The copy states no piece count, only the per-vest rate of about ₹54.

All copy is original. The Puma bullets read empty, so the copy makes no spec claims beyond the title.

## CEO audit

- live 12,032 (+3), pending 0, null price 0, null image 0
- Broadcast cursor 12508 vs DB max 12511. The gap is exactly this batch, and the external cron picks it up on its next run.
- posts 364, coverless 0, 2 posts so far today (IST); the blog cron covers the rest of the day
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- 0 unpushed commits before this commit
- Seen list: 2,670 entries (+4)

Clean.
