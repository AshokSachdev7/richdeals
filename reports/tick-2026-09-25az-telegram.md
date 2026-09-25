# Telegram tick 2026-09-25az

**2 deals live** (ids 11310–11311), both from Amazon. The bulk response returned `count: 2`, with both rows `created: true`. IndexNow returned **HTTP 200 for 5 URLs** (2 slugs + 3).

| Deal | ASIN | Price | M.R.P. | Source group |
|---|---|---|---|---|
| Butterfly Classic stainless steel cookware, 5-piece | B0C7BY52FR | ₹1,352 (62% off) | ₹3,560 | ONLINE SHOPPING DEALS |
| Ocean Plaza glass tumbler 320 ml, set of 6 | B00FC7BPZA | ₹364 (50% off) | ₹725 | ONLINE SHOPPING DEALS |

Both prices were read on the Amazon product page in the logged-in tab and matched the channel price exactly. Both are sold by RetailEZ, with no coupon on the page. M.R.P. was taken from the "M.R.P.: ₹X" text, not the per-unit rate.

## Sweep (13 groups, one sidebar read)

Skipped:
- Dealzone `link.amazon/B0eg949Iv` resolved to B0FPD153TS, which is already LIVE as id 1441.
- SB Loots: the Myntra "Bla Bli Blu perfume up to 83%" link goes to a brand listing sorted by discount, not a single product.
- Dealdost: the Caresmith trimmer price needs a ₹250 coupon. It was already rejected in IFS tick 0925ay.
- CoolzTricks: the LG minibar price needs a coupon plus an SBI credit card.
- Rogerkart: "fans starts @1199" is a category post.
- Hidden Loot: Supercoins promo. OMG: video spam. Deal Dibba: a join-channel post. IFS Tips: Instamart search tip.
- Already seen: INDIAN CHEAP DEALS (`link.amazon/B05yvriRF`), Loot Deals 24x7 (`fkrt.co/l5KOxl`), and the Rangpreet kurta "starts ₹299" post, which is not single-priced.

Everything new was added to `data/tg-multi-seen.json` (2,021 entries).

## CEO audit (19:04 IST)

- DB: 10,964 live deals, 0 pending, 0 with a null price, 0 with a null image; highest deal id 11311.
- Posts: 331; 0 without a cover and 0 without SEO fields. Today (IST) has 4 posts, which is the daily cap.
- The broadcast cursor moved from 11261 to 11281 in the last 20 minutes against a max of 11311, so the external cron is draining it. This is not rot.
- Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and the new Ocean tumbler page all return 200.
- There were no unpushed commits before this one.
