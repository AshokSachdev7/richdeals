# DESIDIME-INGEST — 2026-10-03d (06:48 IST)

**Stage 1 (`ingest-desidime.mjs`) discovered 28 cards. 15 were dropped as junk, 12 resolved to a product, 5 of those were already in the DB, and 7 were fresh. All 7 fresh candidates were rejected, so 0 deals were pushed. There was no bulk call and no IndexNow ping, because nothing changed.**

## Candidates

Six of the seven were already rejected in the 10-03c tick and have not changed since. Only the Digihaat item is new.

| Candidate | Store | Price | Result |
|---|---|---|---|
| NSC Coriander Powder 100 g | Digihaat | ₹22 | **Rejected (new):** food, and the page has no ld+json |
| Veeba Eggless Mayonnaise 800 g | Jiomart | ₹75 | **Rejected:** food, and the page has no ld+json |
| Kissan Tomato Ketchup 1.1 kg | Jiomart | ₹100 | **Rejected:** food, and the page has no ld+json |
| Saffola Oats 1 kg + 300 g | Jiomart | ₹185 | **Rejected:** food, and the page has no ld+json |
| Casaliving Porto sofa | Amazon B0FD3QWML7 | ₹14,399 | **Rejected:** the price is an account-specific "Amazon Rewards" price |
| Jiomart Mak chargers & cables | Store1 | ₹49 | **Rejected:** category page |
| Free Kindle eBooks | Amazon B0899KPV4S | ₹0 | **Rejected:** multi-product loot |

## iPhone 17 (Flipkart): checked by hand

Stage 1 dropped this card because `affiliate()` returned null. The link resolves to `flipkart.com/apple-iphone-17-lavender-256-gb/p/itm5c650337c09ee`, which has no `?pid=`, and our Flipkart affiliate format needs one. The drop was correct anyway, for two reasons:

- **The deal had expired.** DesiDime marks the card "Expired".
- **The price needs a bank card.** ₹79,999 is only reached with a ₹5,000 instant discount on a Flipkart Axis or SBI card, so it breaks the card-only price rule.

Rejected; no code change needed.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,934 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 360; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 2 (meets the rule); 10-02: 3 |
| Broadcast cursor vs max deal id | File re-read: 12,413 / 12,413 |
| Unpushed commits | 0 before this report |

No rot found.
