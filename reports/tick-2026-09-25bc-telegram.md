# Telegram tick 2026-09-25bc

**2 deals are live** (ids 11312–11313), both from Amazon. The bulk response returned `count: 2` and both rows came back `created: true`. IndexNow returned **HTTP 200 for 5 URLs** (the 2 new slugs plus 3 hub paths).

| Deal | ASIN | Price | M.R.P. | Seller | Source group |
|---|---|---|---|---|---|
| GUESS Square 32mm Champagne Dial women's watch GW0354L2 | B09CTKV2GG | ₹8,246 (53% off) | ₹17,495 | VRP Telematics | Dealzone (`link.amazon/B0cUYgVUe`) |
| Rode NT2-A studio condenser XLR microphone | B00915GCOS | ₹15,913 (64% off) | ₹44,800 | Cocoblu Retail | ONLINE SHOPPING DEALS (`link.amazon/B07tkCdL6`) |

I read both prices on the Amazon product page in the logged-in tab. Both match the channel price exactly, both are in stock, and neither page has a coupon. I took the M.R.P. from the "M.R.P.: ₹X" text in #centerCol. Before posting I checked each deal three ways: the ₹ figure in the title equals the price, the "₹X against" figure in the copy equals the price, and the discount % recalculates correctly. Each deal has exactly 4 howTo steps.

## Sweep (13 groups, one sidebar read)

Skipped:
- **SB Loots** posted the same GUESS watch, also at ₹8,246. Its link, `amzn.lt/kTfa62TO`, fails DNS in both curl and the browser. The product name is the same, so I treated it as a duplicate.
- **CoolzTricks** "Branded Powerbank starts @299" and **Rogerkart** "fans starts @1199" are category posts.
- The **iPhone-rates** group posted a multi-TV loot, which is not a single product.
- **Dealdost** posted a credit-card promo, **Hidden Loot** a Supercoins challenge, **OMG** video spam, and **Deal Dibba** a join-channel post. **IFS Tips** posted an Instamart search tip.
- Already seen: INDIAN CHEAP DEALS and Loot Deals 24x7.

I added everything new to `data/tg-multi-seen.json`, which now has 2,030 entries.

## CEO audit (20:05 IST)

- **Deals:** 10,966 live, 0 pending, 0 with a null price, 0 with a null image. The highest id is 11313.
- **Posts:** 331, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day:**

  | Date | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|---|
  | Posts | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 4 |

  No day is at 0. Today is at the cap of 4.
- **Broadcast cursor:** 11311 against a DB max of 11313. It was 11296 at 19:23, so only this tick's 2 deals are still waiting to broadcast.
- **Prod:** all 7 endpoints and the new Rode page return 200.
- **Git:** there were no unpushed commits before this one.
