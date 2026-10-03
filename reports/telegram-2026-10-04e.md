# Telegram deal monitor — 2026-10-04e

**0 new deals. 1 live row repriced:** boAt Aavante Bar Prime B300 (B0H4VQX4CC).

The boAt row (id 5065) was already LIVE at ₹7,499. The Rogerkart repost said the price had moved, so I re-read the product page in the logged-in Amazon tab:

- Price: ₹6,999
- M.R.P.: ₹27,990
- Stock: In stock, add-to-cart button present
- Rating: 4.0★ from 12 ratings

I updated the existing row with `prisma.update` and left the slug alone:

- price 6999
- discount 75%
- the ₹ figure in the title, description and how-to steps

IndexNow ping for the slug: **HTTP 200** (4 URLs). The prod page still showed `"price":"7499"` right after the update. That is the ISR cache; it refreshes on the next revalidation.

## Sidebar sweep

| Group | Post | Verdict |
|---|---|---|
| Rogerkart | boAt Bar speaker ₹6,999 | REPRICED existing LIVE row (above) |
| SB Loots | Shopglobal mosquito net ₹182 (Shopsy) | REJECT. The Shopsy page carries two `finalPrice` values (145 and 182) and mixed rating blocks, so I can't tell which price belongs to this product. Low-ticket item |
| LATEST IPHONE RATES | Safari Magnum luggage sets of 2/3 | REJECT. Multiple products in one post; price depends on a SuperCoin discount |
| Dealzone | Nike "buy 2/3 extra off" | skip, multi-product loot post |
| CoolzTricks / Dealdost | photo only | skip |
| ONLINE SHOPPING DEALS, NonStopDeals, IFS Tips | already handled in 04d | skip |

Seen file now has 2,660 entries (not committed).

## CEO audit

- live 12,015, pending 0, null price 0, null image 0
- posts 362, coverless 0, seoless 0
- IST posts/day 09-25 → 10-03: 4,4,4,4,4,4,4,3,4
- broadcast cursor 12494 == DB max 12494
- unpushed commits 0
- prod: 7/7 endpoints return 200

Clean.
