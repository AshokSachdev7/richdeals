# DESIDIME-INGEST — 2026-10-03e (~08:20 IST)

**Stage 1 found 28 cards. 15 were junk, 12 resolved to a product, 4 were already in the DB and 8 were new. 1 passed verification and went LIVE (`count:1`, created). IndexNow returned HTTP 200 for 4 URLs.**

## Pushed (LIVE, id 12,417)

**Solimo 25 cm die-cast non-stick wok (Amazon, B07P912Y78)**

| Field | Value |
|---|---|
| Price / M.R.P. | ₹585 / ₹1,800 (68% off) |
| Stock | In stock; add-to-cart button present |
| Rating | 3.9★ from 80 reviews |
| Seller | RetailEZ |
| Image | `817wi978nFL` from the m.media-amazon CDN |
| Affiliate link | `?tag=ashoksachdev-21`. Their `desidime01-21` tag was stripped. |
| Prod page | HTTP 200 |

All of this was read on the product page in the logged-in Amazon tab. Payload builder: `scripts/push-dd-1003e.mjs`.

## Rejected

| Candidate | Reason |
|---|---|
| GOVO GoSurround 900 soundbar (B09YV5LC7F) | The product page shows ₹4,999, not the card price of ₹4,185 (drift ₹814). The DesiDime price needs a bank card. |
| GOG "Bounty Train" | The product page ld+json says 0.99, not free. The giveaway is a separate claim banner, not a product price. |
| NSC Vermicelli, Veeba mayo, Kissan ketchup, Saffola oats | Food, and the pages have no ld+json |
| Jiomart Mak chargers | Category page |

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,938 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 360; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 2 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,416 / 12,417. The cron has already sent the IFS batch; the wok goes out on the next run. |
| Unpushed commits | 0 before this report |

No rot found.
