# DESIDIME-INGEST — 2026-10-04k (16:45 IST)

**2 pushed** (both Amazon).
- Bulk returned `count 2`, both `created:true`.
- IndexNow returned **HTTP 200** (5 urls).
- The deal page returns 200 on prod.

## Stage 1

- `/new` and the homepage gave 37 cards.
- 24 were junk or other-store links and were dropped, including the W festive-edit link (an admitad dummy URL) and a Libas `/s?` search page.
- 11 resolved to a product: 3 were already in the DB and 8 were fresh.

## Pushed

| Product | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| TrustBasket Indigo 24-inch plant stand, set of 4 | B081X46PYN | ₹700 | ₹2,299 | 4.2 (14,424) |
| Boldfit 1 L steel bottle, Black | B0FLPX38HF | ₹239 | ₹799 | 3.9 (7,684) |

Checked in the logged-in Amazon tab (`#centerCol`):
- The PDP price equalled the card price.
- `#availability` showed In stock, and the add-to-cart button was present.
- There was no "Only N left" line.

The image is the landing colour's hiRes image (Black-Indigo pack of 4; Black Quest 1 L). The copy is original and uses PDP facts only. The Boldfit copy states that a single-wall bottle does not insulate.

## Rejected

| Product | Reason |
|---|---|
| Instamart: peanut butter mochi, Yogabar shake, LAL Mysore pak, Amul whipping cream | Food (also no ld+json, out of stock or price drift) |
| Digihaat green moong | Food |
| Kids bike safety belt B0HGMY6YVM | Drift: card ₹54 vs PDP ₹549. IFS tick 1004k showed the same drift, so this card price is wrong at both sources. |

## CEO audit

- live 12,065 (+2), pending 0, null price 0, null image 0
- Broadcast cursor 12542 vs DB max 12544. The gap is exactly this batch, and the IFS 1004k batch has already drained.
- posts 365, coverless 0, 3 posts so far today (IST)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
