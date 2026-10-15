# DESIDIME tick 2026-10-16b (04:31 IST)

**1 deal pushed (count 1, created). IndexNow HTTP 200 (4 URLs).**

## Candidates

Stage 1 found 12 fresh cards. Each card was checked against the live product page.

| Candidate | Result |
|---|---|
| Dove Intense Repair Shampoo 1L (Amazon, B07H9SV624) | **PUSHED.** Product page: ₹449, M.R.P. ₹999 (55% off), in stock, add-to-cart present |
| Kokila (B0CP5S82ZV) | rejected: product page ₹712, card said ₹697 |
| Acer (B0CLY9HWHN) | rejected: product page ₹5,799, card said ₹5,220 |
| L'Oréal (B0F8R6FHYX) | rejected: no price on the page, coupon step needed |
| Kalyan / MMTC / Muthoot gold coins | rejected: gold price changes daily, no M.R.P. |
| Hero (B0FGY91JB5) | rejected: price only applies with an SBI card |
| Amazon Sample (B0GBYH11T7) at ₹1 | rejected: depends on account eligibility, cannot verify |
| JioMart gel pen, ketchup | rejected: no ld+json, grocery or low-ticket |
| Bosch dryer | rejected: price changed |

## Push

- Slug: `/dove-intense-repair-shampoo-1-litre-b07h9sv624`
- productId was not already in the DB, so this is a new row (`created:true`)
- Affiliate link: `amazon.in/dp/B07H9SV624?tag=ashoksachdev-21`
- `isHot` is set (price ≤ ₹500)

## CEO audit

| Check | Result |
|---|---|
| Posts per day, IST (10-14 / 10-15 / 10-16) | 2 / 3 / 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| Deals with null price / null image | 0 / 0 |
| Pending review | 0 |
| LIVE deals / DB max id | 12,609 / 13126 (newest is 0 min old) |
| Broadcast cursor | 13125 vs max 13126. The new row was 0 min old; the external broadcast cron picks it up on its next run. Not a fault. |
| Unpushed commits | 0 before this report |
