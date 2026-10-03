# TELEGRAM-DEAL-MONITOR — 2026-10-03r (~16:40 IST)

**1 new deal pushed LIVE (`count:1`, created). 3 reposted deals were re-checked on the product page and their prices fixed in the DB. IndexNow returned HTTP 200 for 7 URLs.**

## Pushed

| Deal | ASIN | Price / M.R.P. | Product-page check |
|---|---|---|---|
| GOVO GOBUDS 920 earbuds | B09P36YZN7 | ₹709 / ₹6,299 (89% off) | In stock, add-to-cart button present, 3.6★ from 572 reviews |

- The copy was written from the product page's feature bullets.
- The image comes from the m.media-amazon CDN.
- The affiliate link uses `?tag=ashoksachdev-21`.
- The prod page returns HTTP 200.
- Payload builder: `apps/api/scripts/push-tg-1003r.mjs`.

## Reposted deals already LIVE (prices fixed in the DB)

| id | Deal | Old price | New price |
|---|---|---|---|
| 6752 | Philips Ace Saver 9W LED bulb, pack of 6 | ₹333 (89% off) | ₹271 (91% off) |
| 5206 | GOBOULT X120 2.1 soundbar | ₹3,485 (71% off) | ₹2,049 (83% off) |
| 11272 | HRX Helium cabin suitcase | ₹1,399 (86% off) | ₹1,099 (89% off) |

On each row, the price, discountPct and the ₹ and % figures in the title and description were all updated.

## Rejected

| Candidate | Reason |
|---|---|
| LG 27" 4K IPS monitor (B07PGL2WVS) | The ₹50,000 M.R.P. looks bogus (the channel says the regular price is ₹17,013), and only 1 unit is left |
| Spacewood Blaze king bed | 2.0★ from a single review |
| Larah by Borosil dinner set | The product page shows ₹3,236; the channel said ₹1,487 |
| Police aviator sunglasses (Flipkart) | Out of stock, and the price is ₹8,001 |
| Realme 20,000 mAh power bank (Flipkart) | The ld+json price is ₹1,999; the channel said ₹1,809 |
| Bata, Michael Kors and SB seeds posts; Supercoins, Swiggy and iPhone-rate posts | Category page, loot post, food or junk |

The seen file grew by 23 entries to 2,632.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | `/`, `/api/deals` and the new deal page all return 200 |
| LIVE deals / PENDING_REVIEW | 11,977 / 0 |
| Null price / null image | 0 / 0 |
| Posts | 361; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 3 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,455 / 12,456. The Govo deal goes out on the next broadcast run. |
| Unpushed commits | 0 before this report |

No rot found.
