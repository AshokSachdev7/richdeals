# DESIDIME-INGEST — 2026-10-03g (~12:50 IST)

**Stage 1 found 31 cards. 10 were junk or pointed at a category page, 18 resolved to a product, 4 of those were already in the DB, and 14 were new. 0 passed verification, so nothing was pushed and there was no IndexNow ping (no new slugs).**

## Rejected

### Amazon (8 candidates, all read on the product page in the logged-in tab)

| Candidate | Reason |
|---|---|
| CERA Brooklyn wall-mount faucet (B0D5DFWS1N) | ₹9,925 and in stock, but `#centerCol` has no rating block, so it has 0 ratings. The "689 ratings" a regex found belonged to a widget for another product. |
| Krisons Zytel 002 projector (B0GXP7RNMX) | The product page shows ₹10,155, not the card price of ₹7,313 (drift ₹2,842). The lower price needs a coupon. |
| Zebronics full-tower gaming case (B0FPM6QRS4) | 2.6★ from 2 ratings |
| WANBO Mini Pro projector (B0CRF4J7RN) | Only 1 left in stock |
| Vitamin C skincare combo (B0HHXRBJ55) | Currently unavailable, and no add-to-cart button |
| Milton Euroline travel kettle (B0CK5JZ1TG) | The product page shows ₹1,250, not the card price of ₹499. The deal has ended. |
| P9 Bluetooth headphones (B0HLQ8JLNQ) | 0 ratings (new listing) |
| R1-L selfie stick with tripod (B0HLQFQFF4) | 0 ratings (new listing) |

### Other stores

| Candidate | Reason |
|---|---|
| 4 JioMart items (John Players pullover, Kush hangers, Uninox casserole, Karfe cookware set) | The pages have no ld+json, so the price can't be verified |
| JioMart Mak chargers | Category page |
| GOG "Bounty Train" | Rejected last tick: the product's ld+json price is 0.99, not free |

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,953 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 361; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 3 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,432 / 12,432 |
| Unpushed commits | 0 before this report |

**Open item:** IFS tick 10-03g was interrupted when Claude Code killed it for low memory. It was not restarted; the next IFS tick will sweep again.
