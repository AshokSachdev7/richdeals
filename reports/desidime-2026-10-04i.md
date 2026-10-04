# DESIDIME-INGEST — 2026-10-04i

**1 pushed** (Amazon).
- Bulk returned `count 1`, `created:true`.
- IndexNow returned **HTTP 200** (4 urls).
- The deal page returns 200 on prod.

## Stage 1

34 cards were discovered and 10 resolved to a product. 4 were already in the DB and 6 were new. App promos (Cheq, Cred) were dropped, along with 1 Flipkart fan.

## Pushed

| Product | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| UCB Ming 25L laptop backpack, Beige | B0CHS75QYV | ₹659 | ₹2,199 | 4.3 (505) |

Checked in the logged-in Amazon tab:
- `priceToPay` 659 matched the card.
- `#availability` showed In stock, and the add-to-cart button was present.
- There was no "Only N left" line.

The image is the Beige variant's MAIN image (`41uyGASl3uL`). The first hiRes in the page JSON was the Navy variant, so it was not used. The copy is original, and the price is stated for Beige only.

## Rejected

| Product | Reason |
|---|---|
| Tokyo Talkies cargo jeans B0F4913N6S | Only 1 left |
| POPWINGS hoodie B0CM98GJJV | Only 1 left, 4 ratings |
| ZEORGIA USB-C hub B0F4DMHGJC | Drift: PDP ₹4,999 vs card ₹1,564. Only 1 left, no ratings. |
| Eveready 9W bulbs ×4 (Shopsy) | Price drift |
| Colgate Max Fresh combo (Jiomart) | FMCG, and the page has no ld+json |

The first 3 Amazon rejects match the rejects in this morning's IFS tick 1004i.

## Ops note

The first push attempt went to `richdeals.in/api/admin/...` and returned 401. The bulk endpoint is reached through the local API on :4000, as the admin-bulk-contract memory says. Re-pushing there worked. An IndexNow ping was also sent before the page existed (HTTP 200, harmless), and it was sent again after the push.

## CEO audit

- live 12,050 (+1), pending 0, null price 0, null image 0
- Broadcast cursor 12528 vs DB max 12529. The gap is exactly this deal.
- posts 365, coverless 0, 3 posts so far today (IST)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
