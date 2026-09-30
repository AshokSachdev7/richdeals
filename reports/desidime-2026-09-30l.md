# DesiDime ingest tick — 2026-09-30l (20:43 IST)

## Stage 1
34 cards discovered, 17 resolved to a product, 8 already in the DB, **9 fresh candidates**. The script also dropped 4 non-products: a Yogabar popclub promo, two Flipkart "win a phone" live-commerce pages and an Amazon rewards ad.

## Verification (PDP is truth)
| Product | Store | DesiDime price | PDP price / M.R.P. | Rating | Verdict |
|---|---|---|---|---|---|
| HP 320C USB wired headset B0GQ4KHKB3 | Amazon | ₹1,307 | ₹1,375 / ₹3,800, In stock, add-to-cart present | 3.9 (38) | **push at ₹1,375** |
| SanDisk Extreme 2TB microSDXC B0DP55SWBW | Amazon | ₹24,999 | ₹24,999 / ₹36,600, In stock | 4.5 (22,179) | **push** |
| Pigeon 60 cm chimney B0GSG3D654 | Amazon | ₹3,521 | ₹3,899 | 2.5 (6) | reject (rating, <8 ratings) |
| Belkin MagSafe 2-in-1 pad B0CN6LM2DQ | Amazon | ₹2,359 | ₹2,359 | 3.4 (81) | reject (only 2 left, rating ≤3.5) |
| ASUS Vivobook S16 COMHHHBZD7A5VNH7 | Flipkart | ₹65,445 (card) | ₹74,990 / ₹1,47,990, InStock | 4.6 (113) | **push at ₹74,990** |
| Infinix HOT 60i 5G MOBHERZEBTBE6KDK | Flipkart | ₹14,999 (card) | ₹17,499 / ₹24,999, InStock | 4.3 (1,588) | **push at ₹17,499** |
| Acer Aspire 14 Core 5 210H COMHHPF4D9FMHKXH | Flipkart | ₹54,045 (card) | ₹64,990 / ₹99,999, InStock | 4.4 (83) | **push at ₹64,990** |
| varsha tex floor mat MATGAESAHYSFFHH5 | Flipkart | ₹99 | ₹144 | 3.5 | reject (rating ≤3.5, min order qty) |
| JioBharat 4G phone | Jio | ₹299 | no ld+json | — | reject (unverifiable) |

The script flagged the 3 Flipkart laptops/phones as drift: their DesiDime prices were bank-card-only. They were pushed at the non-card price read from ld+json in the browser tab.

## Push
- `/admin/deals/bulk` **count: 5**, all `created: true`, status live. Affiliate links: Amazon `tag=ashoksachdev-21`, Flipkart `affid=djhackraj`.
- Slugs: hp-320c-usb-wired-headset-black-b0gq4khkb3, sandisk-extreme-2tb-microsdxc-uhs-i-memory-card-b0dp55swbw, asus-vivobook-s16-2026-ryzen-5-220-16gb-512gb-comhhhbzd7a5vnh7, infinix-hot-60i-5g-plum-red-4gb-128gb-mobherzebtbe6kdk, acer-aspire-14-intel-core-5-210h-16gb-512gb-office-2024-comhhpf4d9fmhkxh
- IndexNow: **HTTP 200**, 8 urls. Prod deal page (HP) returns 200.

## CEO audit
| Check | Result |
|---|---|
| Prod endpoints (7) | 7/7 200 |
| LIVE null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Posts per IST day 09-28 / 09-29 / 09-30 | 4 / 4 / 4 |
| Coverless / seo-less posts | 0 / 0 |
| Broadcast cursor vs DB max | 12163 / 12168 (the 5 just pushed; the external cron picks them up) |
| Unpushed commits | 0 |

No rot found.
