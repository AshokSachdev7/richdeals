# DesiDime tick 2026-10-10e (08:47 IST)

**2 deals pushed live. Bulk endpoint returned `count:2`, both rows `created:true`. IndexNow returned HTTP 200 for 5 URLs. Both deal pages return 200 on prod.**

Stage 1 found 33 cards. 17 resolved to a single product, 2 were already in the DB, and 15 were fresh. Of the 15, 9 were new cards (the first new cards since 00:47 IST).

## Pushed

Both are Amazon deals, checked live on the product page in the logged-in tab.

| Deal | Price | M.R.P. | Off | Rating | Ratings |
|---|---|---|---|---|---|
| Gear Elevate 20L faux-leather laptop backpack, pink | ₹995 | ₹3,999 | 75% | 4.2 | 717 |
| ALISBA women's track suit set, pack of 2, black, XL | ₹262 | ₹1,499 | 83% | 3.9 | 299 |

- Affiliate link: `?tag=ashoksachdev-21`.
- The copy is original. Every ₹ figure in the copy was checked against the price before pushing.

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| OnePlus N6 6/128 (Amazon) | ₹23,249 | ₹24,999 | Price drift |
| AO Smith EWS NEO 5L geyser (Amazon) | ₹3,690 | ₹4,099 | Price drift |
| EDT Luma air fryer oven (Amazon) | ₹8,950 | ₹10,499 | Price drift |
| Elica 60cm BLDC chimney (Amazon) | ₹17,090 | ₹20,590 | Price drift |
| Faber chimney + mixer combo B0B3XV4LPM (Amazon) | ₹4,511 | none | No price and no add-to-cart button; only 8 ratings |
| Faber 3-way chimney B097127T9X (Amazon) | ₹4,871 | none | No price and no add-to-cart button; rated 3.3 |
| La Opala 21-piece dinner set (Instamart) | ₹799 | n/a | Instamart is quick commerce, so the price depends on location; no affiliate route |
| Xiaomi 43" FX Pro (Amazon, repeat) | ₹19,337 | ₹26,999 | Price drift |
| Origami tissues (Amazon, repeat) | ₹99 | ₹99 | Low-ticket FMCG |
| Jockey towels (Flipkart, repeat) | none | n/a | SuperCoins cashback promo, not a price |
| NATIVE M2 Pro RO, BenQ GW2790P, Carrier 1.5 T AC (Flipkart, repeats) | | | Price drift (stage-1 ld+json check) |

## CEO audit

| Check | Result |
|---|---|
| Audit counts | `{posts:1,cov:0,seo:0,np:0,ni:0,pend:0,live:12380,max:12897}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | All 7 return 200 |
| Broadcast cursor | 12895 vs DB max 12897 |
| Unpushed commits | 0 before this commit |

The audit counts are: posts today (IST), posts without a cover, posts without SEO fields, LIVE deals with no price, LIVE deals with no image, PENDING_REVIEW deals, LIVE deals, and the highest deal id in the DB.

- **The cursor is 2 behind the DB max.** These are the 2 deals pushed this tick; the external tg-broadcast cron picks them up on its next run. This is expected, not rot.
- **LIVE deals went from 12,378 to 12,380.**
- **Posts today = 1.** CONTENT-SEO runs next at 12:09 IST.
