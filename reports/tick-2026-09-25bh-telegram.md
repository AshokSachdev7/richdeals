# Telegram tick 2026-09-25bh (22:03 IST)

**0 deals pushed.** There were no slugs to send, so IndexNow was not pinged.

## Sweep (13 groups, one sidebar read)

Only one new post was a single product:

- **SB Loots: Samsung 43" 4K smart monitor at ₹30,999 (`amzn.lt/Tqy0o7aX`)** — skipped because the product could not be identified.
  - `amzn.lt` fails DNS from here. curl returns HTTP 000, the same as in tick 0925bc.
  - An Amazon search for "Samsung 43 inch 4K smart monitor" found no listing at ₹30,999. The closest prices were ₹26,690, ₹34,990 and ₹39,990.
  - Guessing the ASIN would risk pushing the wrong product.

Everything else was skipped:
- Dealdost and IFS Tips: the CRED Coin Rush promo.
- iPhone group: an `afyp.in` "open 4 doors" coupon game.
- CoolzTricks: phone covers "from ₹109", a category post.
- Already handled: Dealzone air fryer (out of stock), Rode NT2-A (live as 11313), and the Rogerkart, Hidden Loot, Deal Dibba, INDIAN CHEAP DEALS and Loot Deals posts.

Everything new was added to `data/tg-multi-seen.json` (2,041 entries).

## CEO audit (checked against the DB)

- **Deals:** 10,968 live, 0 pending, 0 with a null price, 0 with a null image. Highest deal id 11315.
- **Posts:** 331, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day (09-17 → 09-25):** 3, 3, 3, 2, 1, 3, 2, 3, 4. No day is 0, and today is at the cap.
- **Broadcast cursor:** 11315, the same as the DB max. It is caught up.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** there were no unpushed commits before this one.
