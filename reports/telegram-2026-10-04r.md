# TELEGRAM-DEAL-MONITOR — 2026-10-04r (~13:00 IST)

**1 pushed** (Amazon).
- Bulk returned `count 1`, `created:true`.
- IndexNow returned **HTTP 200** (4 urls).
- The deal page returns 200 on prod.

## Sweep

One `browser_evaluate` over the sidebar: 20 rows across the 13 groups in `data/tg-groups.json`. 3 single-product links were resolved. None were in `tg-multi-seen.json` or the live DB.

## Pushed

| Product | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Clovia women's cotton bikini panties, pack of 3 | B0D9VTMQ9Z | ₹199 | ₹649 | 5.0 (8) |

Source: ONLINE SHOPPING DEALS. `link.amazon/B0h50Zv66` resolved to B0D9VTMQ9Z, and the source's `vivek123034-21` tag was stripped.

Checked in the logged-in Amazon tab:
- `priceToPay` 199 matched the post.
- `#availability` showed "Only 5 left in stock", and the add-to-cart button was present.

The image is the MAIN image (`51NsZEsLZPL`). The copy says the price was checked on the default size and that stock is limited.

## Rejected

| Post | Reason |
|---|---|
| Safari LIFT 2-pc set (Flipkart) | Drift: ld+json ₹2,299 vs post ₹1,950 (SuperCoin-dependent) |
| Safari LIFT 3-pc set (Flipkart) | Drift: ld+json ₹3,599 vs post ₹3,050 |
| SB Loots Adidas/Reebok/Puma, Dealzone and NonStopDeals Bata | Category posts |
| Rogerkart Cello | Coupon loot |
| IFS Tips Swiggy Dineout, Hidden Loot Amazon Business | Not product deals |

## CEO audit

- live 12,051 (+1), pending 0, null price 0, null image 0
- Broadcast cursor 12529 vs DB max 12530. The gap is exactly this deal.
- posts 365, coverless 0, 3 posts so far today (IST)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
