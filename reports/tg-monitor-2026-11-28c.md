# TELEGRAM-DEAL-MONITOR tick: 2026-11-28c (02:44 IST)

**Result:** 0 pushed. The only post that was new since tick 11-28b (01:39) was not a deal (SB Loots), and the only single product in the sidebar was the Loot Deals 24x7 Syska power bank. That post was already in the seen list, and a fresh read of the product page shows it out of stock at ₹1,392, not the ₹799 the channel posted.

## Sidebar read (one `browser_evaluate`, Playwright richDeals profile)

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | Notification-settings promo for the channel | New post, but not a deal |
| Loot Deals 24x7 | Flipkart Syska 10000 mAh power bank, "Rs.799" (`fkrt.co/l5KOxl`) | Already in the seen list. Re-checked (see below): rejected |
| CoolzTricks | Jack & Jones / Spykar clothing (`amzn.to`) | Same post as 11-28b, brand `/s?` searches |
| Dealzone | Arrow blazer (`link.amazon/B0hv9Gwpk`) | Same post as 11-28b, a `/s?` search |
| Rogerkart | Symbol clothing and Lakme beauty | Same post as 11-28b, category pages |
| Dealdost | Mufti Black Friday | Same post as 11-28b, a sale hub |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt | Same post as 11-28b, already rejected |
| Hidden Loot | Swiggy BIGBASH | Same post as 11-28b, a food coupon |
| IFS Tips & Tricks | Instamart item | Same post as 11-28b, quick-commerce grocery |
| OMG LOOTDEALS | Credit card referral | Same post as 11-28b, not a deal |
| INDIAN CHEAP DEALS | LG washing machine sale | Same post as 11-28b, a sale hub |
| NonStopDeals | Caprese handbags (`fkrt.it`) | Same post as 11-28b, a sale hub |
| Deal Dibba | Not rendered, even after scrolling the sidebar | No read. The group has no public username, so the `t.me/s/` fallback does not apply |

Loot Deals 24x7 was only read after scrolling the virtualised chat list, which the 11-28b tick did not do.

## Syska re-check

- **Link:** `fkrt.co/l5KOxl` resolves to `itm4cfc25dfd4dc7`, pid `PWBGGD4THDQZYAY6`. The source's own affiliate parameters were `affid=adminpais`.
- **Database:** no row has this productId, so it was never pushed.
- **Product page:** read through an in-tab fetch in the Flipkart tab, since curl gets a reCAPTCHA. The ld+json Product shows price **₹1,392**, M.R.P. ₹1,799, availability **OutOfStock**.
- **Verdict:** rejected. It is out of stock, and ₹1,392 is far above the posted ₹799. The earlier rejection was right.

## Freshness

- **IndexNow:** not run, because nothing was pushed.
- **Seen list:** unchanged.
- **Audit at 02:44 IST:**
  - Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all returned 200.
  - 0 LIVE deals with a null price, 0 with a null image.
  - 0 PENDING_REVIEW.
  - The newest deal is #17640 (desidime 11-28b), 16 minutes old.
  - 1 post on 11-28 (IST). CONTENT-SEO has 3 more ticks today.
  - 0 unpushed commits before this one.
