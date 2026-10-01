# DESIDIME-INGEST — 2026-10-01 (12:57 IST)

**31 cards → 10 junk/rewards dropped → 16 resolved → 6 already in DB → 10 fresh → 3 pushed LIVE (count 3, created 3/3). IndexNow HTTP 200 for 6 urls.**

## Pushed

| ID | Deal | PDP price | MRP | Off | Rating |
|---|---|---|---|---|---|
| B00CEQEGPI | Logitech MK270r wireless keyboard + mouse | ₹1,195 | ₹2,495 | 52% | 4.1 (20,201) |
| B0DJMG47F2 | FRONTECH 10W USB speaker SPK-0008 | ₹554 | ₹1,100 | 50% | 3.8 (366) |
| SMPG4YZ3QBKEKMZZ | Mamaearth Onion Shampoo (Flipkart) | ₹667 | ₹1,549 | 57% | 4.2 (1,97,255) |

Amazon verified in the logged-in tab (#corePrice, #availability, add-to-cart). Flipkart verified in a Playwright tab (ld+json, page text). The prod page for the Logitech deal returns 200.

## Rejected

- Price drift vs card: Wonderchef Galaxy cooktop (₹7,110 card → ₹7,899 PDP), Bajaj Contempo Neo 25L geyser (₹7,085 → ₹7,872, 1 rating), SanDisk 520 SSD 500GB (₹9,319 → ₹9,860, unrated), Haier 588DPW5 deep freezer (₹31,679 → ₹34,429).
- Under 8 ratings: FRONTECH Bluetooth speaker SW-0249 (₹999 matches, but only 2 ratings).
- Stage-1 price drift: Maybelline Fit Me kit (Flipkart), iFFalcon U75 55" (Flipkart).
- Junk: 4 Amazon Pay/rewards promos, Bajaj UPI cashback, Pepperfry sale hub, others.

## CEO audit

Clean, see `sitemon-2026-10-01m.md`: 7/7 endpoints 200, PENDING 0, LIVE nulls 0, posts/day OK, no coverless/seo-less posts, cursor self-healing, 0 unpushed.
