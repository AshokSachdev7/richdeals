# TELEGRAM-DEAL-MONITOR — 2026-10-04q (11:59 IST)

**3 pushed** (all Myntra, via InRDeals).
- Bulk returned `count 3`, all `created:true`.
- IndexNow returned **HTTP 200** (6 urls).
- The jeans page returns 200 on prod.

## New posts in the sidebar

| Group | Post | Decision |
|---|---|---|
| SB Loots 11:55 | "Stylish outfit" with 3 separate `myntr.it` links (T-shirt @493, jeans @577, sneakers @659) | **Pushed all 3.** Each link is a single product. |
| ONLINE SHOPPING DEALS 11:53 | Maybelline lip balm @100 | Reject: low-ticket FMCG/cosmetic |
| CoolzTricks 11:35 | Myntra HRX "upto 84%", 4+ links | Reject: category links |
| Dealzone 11:34 | CASIO watches "upto 50%" | Reject: category link |

## Pushed

| Product | Myntra id | Price | M.R.P. | Rating |
|---|---|---|---|---|
| HIGHLANDER relaxed-fit drop-shoulder cotton T-shirt | 41032446 | ₹493 | ₹1,899 | 4.3 (8,833) |
| HERE&NOW mid-rise stretchable jeans | 40301734 | ₹577 | ₹1,299 | 3.8 (97) |
| HRX textured slip-on sneakers | 39380474 | ₹659 | ₹3,299 | 4.1 (84) |

How each one was checked:
- **Link:** `myntr.it` → linkredirect → `myntra.com/<id>`.
- **Price:** the Myntra product page was fetched with curl. The ld+json `offers.price` matched the post price and showed InStock.
- **Sizes:** the page data showed the same discounted price in every size. The jeans are sold out in size 34 and the sneakers in size 7. The copy says so.
- **Affiliate link:** `inr.deals/track?id=inr678975705&…url=https://www.myntra.com/<id>`, which follows the Myntra rule.
- **Copy:** original. The T-shirt's listing says "Round Neck" in its name but "Polo Collar" in its attributes, so the copy names neither.

The seen list now holds 2,682 links (+9).

## CEO audit

- live 12,040 (+3), pending 0, null price 0, null image 0
- Broadcast cursor 12516 vs DB max 12519. The gap is exactly this batch, and the external cron picks it up on its next run.
- posts 364, coverless 0, 2 posts so far today (IST). The blog cron covers the rest of the day.
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
