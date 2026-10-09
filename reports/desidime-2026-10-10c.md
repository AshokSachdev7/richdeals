# DesiDime tick 2026-10-10c (04:46 IST)

**0 deals pushed, so no IndexNow ping was needed.**

Stage 1 found 33 cards. 23 resolved to a single product, 4 were already in the DB, and 19 were fresh.

- 18 of the 19 were already rejected in ticks 10-10a and 10-10b. They were re-checked live this tick and still fail.
- The 1 new card (NATIVE M2 Pro RO) has drifted in price.

## Rejected (live re-check this tick)

| Item | Card price | Live price | Reason |
|---|---|---|---|
| NATIVE by Urban Company M2 Pro RO (Flipkart, **new**) | ₹11,879 | ₹17,499 | Price drift |
| Godrej 540L fridge (Amazon) | ₹53,132 | ₹65,990 | Price drift; 3 ratings |
| SanDisk 2TB portable SSD (Amazon) | ₹22,999 | ₹27,999 | Price drift |
| Doctor slippers (Amazon) | ₹419 | ₹441 | Price drift |
| Redmi Pad 2 Pro (Amazon) | ₹22,749 | ₹26,999 | Price drift |
| Fossil FS5991 (Amazon) | ₹7,054 | ₹7,837 | Price drift |
| Haier 10 kg washer (Amazon) | ₹26,740 | none | No price, no add-to-cart; 2 ratings |
| Samsung ViewFinity S8 32" (Amazon) | ₹29,249 | ₹31,999 | Price drift |
| Graco Lite Rider (Amazon) | ₹4,080 | none | No price, no add-to-cart |
| Havells Epic Storm fan (Amazon) | ₹2,881 | ₹3,590 | Price drift; no ratings |
| Xiaomi 43" FX Pro (Amazon) | ₹19,337 | ₹26,999 | Price drift |
| Origami tissues (Amazon) | ₹99 | ₹99 | Low-ticket FMCG |
| Gear 17L bag (Flipkart) | ₹214 | ₹400 | Price drift |
| Jockey towels (Flipkart) | ₹0 card | ₹479 | SuperCoins cashback promo, not a price |
| BenQ GW2790P, Carrier 1.5 T AC, Lloyd 2 T AC, Godrej 185L, Lenovo LOQ (Flipkart) | | | Price drift (stage-1 ld+json check) |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:0,cov:0,seo:0,np:0,ni:0,pend:0,live:12378,max:12895}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12895, same as the DB max |
| Unpushed commits | 0 before this commit |

**Posts today = 0.** The IST day is only 4h46m old. The CONTENT-SEO cron's first run is at 06:09 IST.

**3 roster crons are still missing:** telegram-deal-monitor, deal-ingest IFS and AI-OVERVIEW. The owner can say "restore all crons" to bring them back.

**DesiDime feed has gone stale overnight.** The same drifting cards have repeated for 3 ticks in a row, so yield should recover when daytime posting starts.
