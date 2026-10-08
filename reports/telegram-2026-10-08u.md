# Telegram tick 2026-10-08u (20:58 IST)

**1 pushed.** `/admin/deals/bulk` count 1, `created:true`. Live page returns 200. IndexNow **HTTP 200** for 4 URLs.

I read the newest post in each group in one sidebar read.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [haus & kinder blackout door curtains, 7 ft, set of 2, beige](https://richdeals.in/haus-kinder-blackout-door-curtains-7-feet-set-of-2-beige-b0gdqvcvg9) (B0GDQVCVG9, from Dealdost) | ₹699 | ₹2,599 | 73% | 4.2★ (29) |

It was checked on the Amazon product page in the logged-in tab: `#centerCol` price matched the channel's ₹699, `#availability` showed In stock, and add-to-cart was present. The source tag `7383-21` was replaced with `ashoksachdev-21`.

## Rejected

| Group | Post | Reason |
|---|---|---|
| Dealzone | "236" `amzn.to` → JVX men's sweatshirt (B0DDCNQVFZ) | 3.4★ (34 ratings) |
| ONLINE SHOPPING DEALS | ELLE women's flat sandals, ₹340 (B0D8LDNVNV) | Currently unavailable, ₹856 shown, 1 rating |
| CoolzTricks | HRX cabin luggage @999 | Shortlink resolves to a `/s?` search across 6 ASINs, not a single product |
| SB Loots | Zebronics 400W soundbar @6,119 (Flipkart) | Credit-card-only price |
| iPhone rates | Samsung 32" LED @11,700 | Bank-card-only price |
| Rogerkart | Hero bikes | Vehicle bookings |
| Hidden Loot, NonStopDeals, IFS Tips | Masterlink, "surf all pages", Instamart search | Not a single product |
| INDIAN CHEAP DEALS, Loot Deals 24x7 | Handbag, Syska power bank | Already handled in earlier ticks |

All three new ASINs and the HRX search ASIN were added to `tg-multi-seen.json`.

## CEO audit (20:58 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 4 (at the 4/day cap) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,304 |
| Broadcast cursor | 12821 vs DB max 12822. The 1 new row is waiting for the external broadcast cron, which catches up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
