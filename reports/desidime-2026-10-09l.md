# DesiDime tick 2026-10-09l (22:45 IST)

**0 deals pushed.** All 14 fresh candidates failed verification. No IndexNow ping was needed because nothing was pushed.

Stage 1 found 31 cards. 16 resolved to a single product, 2 were already in the DB, and 14 were fresh.

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| Sony WH-CH720N (Amazon) | ₹5,291 | ₹6,989 | Price drift |
| TCL 50" FHD QLED TV (Amazon) | ₹25,990 | ₹33,990 | Price drift |
| FIREFOX Sigma+ 21-gear bike (Amazon, repeat) | ₹17,401 | ₹20,263 | Price drift |
| Muthoot Pappachan 24K Ganesha pendant (Amazon) | ₹29,867 | ₹32,709 | Price drift |
| Godrej 223L 2-star fridge (Amazon, repeat) | ₹18,740 | ₹22,990 | Price drift |
| Xiaomi 43" FX Pro QLED TV (Amazon, repeat) | ₹19,337 | ₹26,999 | Price drift |
| Neostreak cargo jeans (Amazon) | ₹539 | ₹499 | Price drift; only 1 left |
| Lifelong Jeepster kids EV car (Amazon, repeat) | ₹5,302 | ₹6,199 | Price drift |
| Pee Safe night pads sample (Amazon) | ₹1 | n/a | Health/hygiene ₹1 sample |
| Lenovo LOQ i5 laptop (Flipkart) | ₹84,380 | ₹1,09,990 | Price drift (ld+json read in browser tab) |
| Havells Mirak BLDC chimney (Flipkart) | ₹10,701 | ₹15,990 | Price drift |
| Inalsa Nutri Fry air fryer (Flipkart) | ₹2,066 | ₹2,796 | Price drift |
| Godrej 185 L 5-star fridge (Flipkart) | ₹12,996 | ₹17,040 | Price drift |
| Flipkart x Gameium supercoins | n/a | n/a | Promo, not a product |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12374,max:12891}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12891, same as the DB max |
| Unpushed commits | 0 before this commit |
| DB connections | The prod app holds about 17 idle slots, which leaves the local scripts near the 22-slot cap. The audit ran with `connection_limit=1` to stay under it. |

Clean.
