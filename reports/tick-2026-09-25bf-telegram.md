# Telegram tick 2026-09-25bf

**2 deals live** (ids 11314–11315), from Myntra and Flipkart. The bulk response returned `count: 2`, with both rows `created: true`. IndexNow returned **HTTP 200 for 5 URLs** (2 slugs + 3).

| Deal | Id | Price | M.R.P. | Source group | Affiliate |
|---|---|---|---|---|---|
| Steve & Anderson black automatic 2-fold umbrella | Myntra 34688887 | ₹152 (49% off) | ₹299 | SB Loots | InRDeals |
| OSCAR Big Shot deodorant 150 ml, pack of 4 | Flipkart DEOGPWBN8RYCEG6E | ₹298 (70% off) | ₹996 | Dealdost | `/p/itm38122210f1403?pid=…&affid=djhackraj` |

How each was checked:
- **Myntra umbrella:** read with curl from the page's `discountedPrice` and `mrp` fields (₹152 and ₹299), `available:true`. The image is from `assets.myntassets.com` at 1080×1440.
- **Flipkart deo:** read in the browser tab from ld+json (`price` 298, InStock). The M.R.P. of ₹996 is the strike-through price on the page. The ₹283 "Buy at" figure needs a payment offer, and the copy says so. The image is a `rukmini1` 1500×1500.
- The source tags were stripped: Myntra `affiliate_id=obK9vtW9hC`, and Flipkart `affid=rohanpouri` plus the `ENKR` parameters.

## Sweep (13 groups, one sidebar read)

Skipped:
- Dealzone: the Lifelong PuroGlass air fryer ₹3,316 (`link.amazon/B0bxSzSeG` → B0GD1RSJTC) shows "Currently unavailable" on the product page.
- CoolzTricks: the Mango loofah soap at ₹90 needs a 10% coupon, and it is a low-ticket FMCG item.
- iPhone group: three `afyp.in` links with no product details.
- ONLINE SHOPPING DEALS: the Rode NT2-A is already live as 11313.
- Rogerkart "fans from ₹1,199" is a category post. Hidden Loot is a Supercoins promo. Deal Dibba is a join-channel post. IFS Tips is an Instamart search tip. OMG is spam.
- Already seen: INDIAN CHEAP DEALS handbag and Loot Deals Syska.

Everything new was added to `data/tg-multi-seen.json` (2,038 entries).

## CEO audit (21:04 IST)

- **DB:** 10,968 live deals, 0 pending, 0 with a null price, 0 with a null image. Highest deal id 11315.
- **Posts:** 331, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day (09-17 → 09-25):** 3, 3, 3, 2, 1, 3, 2, 3, 4. No day is 0, and today is at the cap.
- **Broadcast cursor:** 11313 against a DB max of 11315. The 2-deal gap is this batch; the external cron will send it on its next run.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and the new umbrella page all return 200.
- **Git:** there were no unpushed commits before this one.
