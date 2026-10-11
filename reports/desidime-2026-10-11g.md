# DESIDIME tick 2026-10-11g (18:19 IST)

Stage 1 found 32 cards. 21 of them resolved to a merchant URL, 3 were already in the DB, which left 18 fresh candidates. 2 passed verification and were pushed: bulk returned `count: 2`, both rows `created: true`.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Axe Gold Temptation deodorant bodyspray 215 ml (B09264ZY38) | Amazon | ₹98 | ₹385 | 75% | 3.8 (3,206) | `tag=ashoksachdev-21` |
| Orient Electric Ujala Prime 1200mm BEE 1 Star ceiling fan (FANGJWNBDEWGSDHY) | Flipkart | ₹1,749 | ₹3,700 | 53% | 4.0 (950) | `affid=djhackraj` |

How each was verified:
- **Axe:** read on the Amazon PDP in the logged-in tab (`#centerCol`). In stock, add-to-cart present, no coupon.
- **Orient fan:** Flipkart ld+json shows InStock at a price matching the card.

## Rejected (16)

| Reason | Deals |
|---|---|
| Price drift: the card or bank-card price is below the live PDP price | Hitachi AC, Cello bottle, Sony TV, SanDisk Ultra Shift, Rupa vests, Classmate notebook, HP 15, HP Omnipad, Elica chimney, ASUS V440, TP-Link router (card ₹991, PDP ₹1,159) |
| Rated 3.5 or lower | Qubo baby monitor (3.3) |
| No price, no add-to-cart, only 4 ratings | Ubon power bank |
| Only 1 left, rated 3.0 | Acer One 14 |
| No M.R.P.; the only saving is a clip coupon | SanDisk Flair 256GB |
| Health product | Lifelong foot massager |

## IndexNow

HTTP 200 for 5 URLs: the 2 pushed deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,405 |
| Broadcast cursor | 12920. DB max is 12922 because of the 2 deals just pushed; the external broadcast cron picks them up on its next run. |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
