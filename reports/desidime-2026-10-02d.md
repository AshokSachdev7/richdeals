# DESIDIME-INGEST — 2026-10-02 (06:44 IST)

**31 cards → 17 junk/off-host dropped → 10 resolved → 2 already in DB → 8 fresh → 6 skipped by stage 1 → 2 checked on the Amazon PDP → 0 pushed. No bulk push, so no IndexNow ping was needed.**

## Rejected

| Product | ID | Reason |
|---|---|---|
| USA TwinCharm Matte Duo lip colour | B0FKZC971R | Price matched (₹285 / ₹799, in stock, has add-to-cart), but the product has 0 ratings (rule: reject 0-7 ratings) |
| Pure Source clay diya, 4 pcs | B0GZNL1ZXP | PDP price ₹47 vs card ₹48; 1 rating (5.0). Rejected on the 0-7 ratings rule |
| Google Fitbit Air (FK) | SBNHR38GGZKBSRAS | Price drift, flagged by stage 1 |
| LG 1.42T AC / Acer Aspire 14 (FK) | — | Price drift, flagged by stage 1 (repeat) |
| Self-squeeze mop (Digihaat) | 802c72a26d04 | No ld+json |
| Disano peanut butter (JioMart) | 44b712e3a942 | Food, and no ld+json |
| Baby cleansing wipes (BigBasket) | 64c1fac25c6f | Health/personal-care, and no ld+json |
| Stage-1 drops (17) | — | BHIM/Hubble app promos, Pepperfry sale hub, a Zebronics FK `/a/p/b` landing page, and others |

## CEO audit (06:44 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,801 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,279 / 12,279 |
| Posts | 355; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each; **10-02: 0 at 06:44** |
| Unpushed commits | 0 before this report |
| Local API (:4000) | Down. Claude Code stopped it at ~06:10 because system memory was low; it was not restarted. Prod is unaffected. |

## Watch

- The CONTENT-SEO 06:09 slot did not publish a post. If 10-02 is still at 0 posts at the 06:51 sitemon, publish a post inline.
