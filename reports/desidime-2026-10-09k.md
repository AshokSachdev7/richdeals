# DesiDime tick 2026-10-09k (20:48 IST)

**3 deals pushed** (count 3, all created:true). IndexNow HTTP 200 (6 URLs). Sample deal page on prod returns 200.

Stage 1 found 34 cards. 22 resolved to a single product, 4 were already in the DB, and 18 were fresh. 15 of the 18 were rejected after verification.

## Pushed

| Deal | Price | M.R.P. | Verification | Affiliate |
|---|---|---|---|---|
| Canon EOS R50 V kit with RF-S 14-30mm lens (B0F3X5K2V3) | ₹62,990 | ₹79,995 (21% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.2★ / 67 ratings | Amazon `ashoksachdev-21` |
| adidas men Ultrabounce running shoe, UK 9 core black (B0BN6HM861) | ₹3,267 | ₹5,899 (45% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.2★ / 787 ratings | Amazon |
| Dollar Lehar men vest, pack of 2 (VESGWV8PZDWDHVZZ) | ₹85 | ₹230 (63% off) | Flipkart ld+json in the browser tab: ₹85, InStock, 4.2★ / 41,494 ratings | Flipkart `djhackraj` |

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| FIREFOX Sigma+ 21-gear mountain bike (Amazon) | ₹17,401 | ₹20,263 | Price drift |
| Fujifilm X-M5 with 15-45mm (Amazon) | ₹76,999 | ₹79,999 | Price drift |
| Godrej 223L 2-star fridge (Amazon) | ₹18,740 | ₹22,990 | Price drift |
| Xiaomi 43" FX Pro QLED TV (Amazon) | ₹19,337 | ₹26,999 | Price drift |
| Lifelong Jeepster kids EV car (Amazon) | ₹5,302 | ₹6,199 | Price drift |
| Aquaguard Sure Delight RO purifier (Flipkart) | ₹6,420 | ₹8,834 | Price drift |
| HP K290 wireless keyboard (Flipkart) | ₹183 | ₹549 | Price drift |
| Godrej 223 L fridge (Flipkart) | ₹17,740 | ₹22,990 | Price drift |
| boAt PartyPal 600 (Flipkart) | ₹11,879 | ₹13,999 | Price drift |
| boAt PartyPal 390 Plus (Flipkart) | ₹9,324 | ₹10,999 | Price drift |
| Motorola Edge 70 Fusion (Flipkart) | ₹26,499 | ₹30,999 | Price drift |
| POND's charcoal face wash (Flipkart) | ₹143 | ₹148 | Price drift |
| Aadi men boots (Shopsy) | ₹486 | ₹437 | Price drift (finalPrice changed) |
| Sa rasa printed kurta (Shopsy) | ₹398 | ₹428 | Price drift |
| Aahar matar 500 g (Digihaat) | ₹28 | n/a | Food; no ld+json |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12374,max:12891}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12888. DB max is 12891; the gap is this tick's 3 rows, which the external broadcast cron will pick up on its next run. |
| Unpushed commits | 0 before this commit |

Clean.
