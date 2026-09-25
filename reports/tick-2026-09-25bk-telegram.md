# Telegram tick 2026-09-25bk

**1 deal live** (id 11342, Flipkart). The bulk response returned `count: 1` with the row `created: true`. IndexNow returned **HTTP 200 for 4 URLs** (1 slug + 3).

| Deal | PID | Price | M.R.P. | Source group |
|---|---|---|---|---|
| THE MAN COMPANY anti-dandruff shampoo, 2% salicylic acid, 200 ml | SMPHNQY2RHPUYWTR | ₹289 (50% off) | ₹578 | Dealdost (`fkrt.cc/hncHral`) |

- The price was read in the Playwright tab from the page's ld+json: `offers.price` 289, InStock. The visible block shows 50% off ₹578.
- The ₹274 "Buy at" figure depends on a bank offer, so the push uses ₹289.
- The seller does not accept returns (`MerchantReturnNotPermitted`), and the copy says so.
- The channel's "single pc at 209" is a different variant and was not used.
- The link has the source's `affid=roha…` stripped and is rebuilt as `/p/itm281f146258017?pid=SMPHNQY2RHPUYWTR&affid=djhackraj`. The image is `rukmini1.flixcart.com` 1500×1500 and returns 200.

## Sweep (one sidebar read over the 13 groups)

Skipped:
- SB Loots: the MAONO mic `amazn.lt/sMqT2497` resolves to B09LCL456X, which is already LIVE as id 11328 from IFS tick 0925bj.
- ONLINE SHOPPING DEALS: the Rode NT2-A `link.amazon/B07tkCdL6` resolves to B00915GCOS, which is already LIVE as id 11313.
- CoolzTricks: "Apply ₹550 off coupon" resolves to B08DG2T1W8. The price needs a coupon, and the product is already LIVE as id 11211.
- Dealzone: "Upto 30% off Comet sneakers" on Myntra is a brand listing, not a single product.
- Rogerkart: "fans starts @1199" is a category post.
- Hidden Loot: a Supercoins promo. IFS Tips: CRED Coin Rush. iPhone Rates: a coupon game. Deal Dibba: a join-channel post. OMG: spam.
- Already seen: INDIAN CHEAP DEALS (`link.amazon/B05yvriRF`) and Loot Deals 24x7 (`fkrt.co/l5KOxl`).

`data/tg-multi-seen.json` now has 2,046 entries.

## CEO audit

- DB: 10,995 live deals, 0 pending, 0 with a null price, 0 with a null image; highest deal id 11342.
- Posts: 331; 0 without a cover and 0 without SEO fields. Posts per IST day for 09-17 → 09-25: 3/3/3/2/1/3/2/3/4. No day is 0, and today is at the cap.
- The broadcast cursor is at 11335 against a DB max of 11342. It was 11315 at the last tick, so the external cron is draining the IFS batch. This is not rot.
- Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` and the new shampoo page all return 200.
- There were no unpushed commits before this one.
